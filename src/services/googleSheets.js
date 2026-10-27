export const DEFAULT_SPREADSHEET_ID = '1x_nnfVAKcBEwqlX8VK5KHNQQzs5y45KB64JvPGqW47A';
export const DEFAULT_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/edit`;

export function extractSpreadsheetId(input) {
  if (!input) return DEFAULT_SPREADSHEET_ID;
  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return input.trim();
}

const REQUIRED_TABS = [
  'Settings',
  'TheoryTopics',
  'LabTopics',
  'TaskCompletions',
  'DailySchedule',
];

/**
 * Fetch spreadsheet metadata to check access and sheet names.
 */
export async function fetchSpreadsheetMetadata(spreadsheetId, accessToken) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    let parsedErr = '';
    try {
      const errObj = JSON.parse(errorText);
      parsedErr = errObj.error?.message || errorText;
    } catch {
      parsedErr = errorText;
    }
    if (res.status === 401) {
      throw new Error('Authentication expired. Please sign in with Google again.');
    }
    if (res.status === 403) {
      throw new Error(`Permission denied: Your Google account does not have write access to this sheet (${parsedErr}).`);
    }
    if (res.status === 404) {
      throw new Error(`Spreadsheet not found (ID: ${spreadsheetId}). Please verify the sheet link.`);
    }
    throw new Error(`Google Sheets API Error (${res.status}): ${parsedErr}`);
  }

  return await res.json();
}

/**
 * Ensures required tabs exist with header rows.
 */
export async function initializeWorkbookTabs(spreadsheetId, accessToken, existingTitles) {
  const missingTabs = REQUIRED_TABS.filter((t) => !existingTitles.includes(t));

  if (missingTabs.length > 0) {
    const requests = missingTabs.map((title) => ({
      addSheet: {
        properties: { title },
      },
    }));

    const addRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      }
    );

    if (!addRes.ok) {
      console.warn('Failed to add some tabs, continuing:', await addRes.text());
    }
  }

  const headerData = [
    {
      range: 'Settings!A1:B1',
      values: [['Key', 'Value']],
    },
    {
      range: 'TheoryTopics!A1:N1',
      values: [
        [
          'ID',
          'Name',
          'Subject',
          'Module/Unit',
          'PYQ Reference',
          'Priority',
          'Task Type',
          'Estimated Duration',
          'Status',
          'Target Date',
          'Notes',
          'Order',
          'Created At',
          'Completed At',
        ],
      ],
    },
    {
      range: 'LabTopics!A1:M1',
      values: [
        [
          'ID',
          'Lab Name',
          'Topic/Program Name',
          'Experiment No',
          'Tool/Language',
          'Priority',
          'Prep Type',
          'Estimated Duration',
          'Status',
          'Notes',
          'Order',
          'Created At',
          'Completed At',
        ],
      ],
    },
    {
      range: 'TaskCompletions!A1:C1',
      values: [['Date (YYYY-MM-DD)', 'Completed Schedule IDs (JSON)', 'Last Updated']],
    },
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'RAW',
        data: headerData,
      }),
    }
  );
}

/**
 * Read data from Google Sheets workbook
 */
export async function readWorkbookData(spreadsheetId, accessToken) {
  const metadata = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const titles = metadata.sheets.map((s) => s.properties.title);

  const hasAnyTab = REQUIRED_TABS.some((t) => titles.includes(t));
  if (!hasAnyTab) {
    await initializeWorkbookTabs(spreadsheetId, accessToken, titles);
    return {};
  }

  const ranges = [
    'Settings!A2:B20',
    'TheoryTopics!A2:N500',
    'LabTopics!A2:M500',
    'TaskCompletions!A2:C500',
  ].filter((r) => titles.includes(r.split('!')[0]));

  if (ranges.length === 0) return {};

  const queryParams = ranges.map((r) => `ranges=${encodeURIComponent(r)}`).join('&');
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to read data from Google Sheets (${res.status})`);
  }

  const batchData = await res.json();
  const valueRanges = batchData.valueRanges || [];
  const result = {};

  for (const vr of valueRanges) {
    const tabName = vr.range.split('!')[0].replace(/'/g, '');
    const rows = vr.values || [];

    if (tabName === 'Settings') {
      const settingsMap = {};
      rows.forEach((r) => {
        if (r[0]) settingsMap[r[0]] = r[1] ?? '';
      });

      result.toggles = {
        labDatesAnnounced: settingsMap['ToggleA_LabDatesAnnounced'] === 'true',
        labExamsCompleted: settingsMap['ToggleB_LabExamsCompleted'] === 'true',
      };

      result.examDates = {
        studyLeaveStart: settingsMap['StudyLeaveStart'] || '2026-10-29',
        theoryExams: {
          dataScience: {
            name: 'Data Science and Machine Learning',
            code: 'DS-ML',
            date: settingsMap['Theory_DataScience_Date'] || '2026-11-23',
            isConfirmed: true,
            isCompleted: settingsMap['Theory_DataScience_Completed'] === 'true',
          },
          daa: {
            name: 'Design and Analysis of Algorithms (DAA)',
            code: 'DAA',
            date: settingsMap['Theory_DAA_Date'] || '2026-11-26',
            isConfirmed: true,
            isCompleted: settingsMap['Theory_DAA_Completed'] === 'true',
          },
          operationsResearch: {
            name: 'Operations Research (OR)',
            code: 'OR',
            date: settingsMap['Theory_OR_Date'] || '2026-11-30',
            isConfirmed: true,
            isCompleted: settingsMap['Theory_OR_Completed'] === 'true',
          },
          deepLearning: {
            name: 'Deep Learning',
            code: 'DL',
            date: settingsMap['Theory_DeepLearning_Date'] || '2026-12-03',
            isConfirmed: true,
            isCompleted: settingsMap['Theory_DeepLearning_Completed'] === 'true',
          },
        },
        labExams: {
          madLab: {
            name: 'Mobile Application Development (MAD) Lab',
            code: 'MAD-LAB',
            date: settingsMap['Lab_MAD_Date'] || '',
            isConfirmed: Boolean(settingsMap['Lab_MAD_Date']),
            isCompleted: settingsMap['Lab_MAD_Completed'] === 'true',
          },
          dsLab: {
            name: 'Data Science Lab',
            code: 'DS-LAB',
            date: settingsMap['Lab_DS_Date'] || '',
            isConfirmed: Boolean(settingsMap['Lab_DS_Date']),
            isCompleted: settingsMap['Lab_DS_Completed'] === 'true',
          },
        },
      };
    } else if (tabName === 'TheoryTopics') {
      const theoryTopics = rows.map((r, idx) => ({
        id: r[0] || `theory-${idx + 1}`,
        name: r[1] || 'Untitled Topic',
        subject: r[2] || 'Data Science and Machine Learning',
        moduleUnit: r[3] || undefined,
        pyqReference: r[4] || undefined,
        priority: r[5] || 'Medium',
        taskType: r[6] || 'Learn',
        estimatedDuration: r[7] || undefined,
        status: r[8] || 'Not Started',
        targetDate: r[9] || '',
        notes: r[10] || undefined,
        order: Number(r[11]) || idx,
        createdAt: r[12] || new Date().toISOString(),
        completedAt: r[13] || undefined,
      }));
      result.theoryTopics = theoryTopics;
    } else if (tabName === 'LabTopics') {
      const labTopics = rows.map((r, idx) => ({
        id: r[0] || `lab-${idx + 1}`,
        lab: r[1] || 'Mobile Application Development (MAD) Lab',
        name: r[2] || 'Untitled Program',
        experimentNumber: r[3] || undefined,
        toolOrLanguage: r[4] || undefined,
        priority: r[5] || 'Medium',
        prepType: r[6] || 'Write Code',
        estimatedDuration: r[7] || undefined,
        status: r[8] || 'Not Started',
        notes: r[9] || undefined,
        order: Number(r[10]) || idx,
        createdAt: r[11] || new Date().toISOString(),
        completedAt: r[12] || undefined,
      }));
      result.labTopics = labTopics;
    } else if (tabName === 'TaskCompletions') {
      const completions = {};
      rows.forEach((r) => {
        const date = r[0];
        if (date) {
          let ids = [];
          try {
            ids = JSON.parse(r[1] || '[]');
          } catch {
            ids = r[1] ? r[1].split(',') : [];
          }
          completions[date] = {
            date,
            completedScheduleIds: ids,
            lastUpdated: r[2] || new Date().toISOString(),
          };
        }
      });
      result.dailyCompletions = completions;
    }
  }

  return result;
}

/**
 * Write updated data back to Google Sheets workbook.
 */
export async function writeWorkbookData(spreadsheetId, accessToken, payload) {
  const metadata = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const existingTitles = metadata.sheets.map((s) => s.properties.title);
  await initializeWorkbookTabs(spreadsheetId, accessToken, existingTitles);

  const clearPromises = [
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Settings!A2:B50:clear`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/TheoryTopics!A2:N500:clear`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/LabTopics!A2:M500:clear`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/TaskCompletions!A2:C500:clear`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ];
  await Promise.all(clearPromises);

  const settingsRows = [
    ['ToggleA_LabDatesAnnounced', String(payload.toggles.labDatesAnnounced)],
    ['ToggleB_LabExamsCompleted', String(payload.toggles.labExamsCompleted)],
    ['StudyLeaveStart', payload.examDates.studyLeaveStart || '2026-10-29'],
    ['Theory_DataScience_Date', payload.examDates.theoryExams.dataScience.date],
    ['Theory_DataScience_Completed', String(payload.examDates.theoryExams.dataScience.isCompleted)],
    ['Theory_DAA_Date', payload.examDates.theoryExams.daa.date],
    ['Theory_DAA_Completed', String(payload.examDates.theoryExams.daa.isCompleted)],
    ['Theory_OR_Date', payload.examDates.theoryExams.operationsResearch.date],
    ['Theory_OR_Completed', String(payload.examDates.theoryExams.operationsResearch.isCompleted)],
    ['Theory_DeepLearning_Date', payload.examDates.theoryExams.deepLearning.date],
    ['Theory_DeepLearning_Completed', String(payload.examDates.theoryExams.deepLearning.isCompleted)],
    ['Lab_MAD_Date', payload.examDates.labExams.madLab.date || ''],
    ['Lab_MAD_Completed', String(payload.examDates.labExams.madLab.isCompleted)],
    ['Lab_DS_Date', payload.examDates.labExams.dsLab.date || ''],
    ['Lab_DS_Completed', String(payload.examDates.labExams.dsLab.isCompleted)],
    ['LastSyncTimestamp', new Date().toISOString()],
  ];

  const theoryRows = (payload.theoryTopics || []).map((t, idx) => [
    t.id,
    t.name,
    t.subject,
    t.moduleUnit || '',
    t.pyqReference || '',
    t.priority,
    t.taskType,
    t.estimatedDuration || '',
    t.status,
    t.targetDate || '',
    t.notes || '',
    String(t.order ?? idx),
    t.createdAt || new Date().toISOString(),
    t.completedAt || '',
  ]);

  const labRows = (payload.labTopics || []).map((l, idx) => [
    l.id,
    l.lab,
    l.name,
    l.experimentNumber || '',
    l.toolOrLanguage || '',
    l.priority,
    l.prepType,
    l.estimatedDuration || '',
    l.status,
    l.notes || '',
    String(l.order ?? idx),
    l.createdAt || new Date().toISOString(),
    l.completedAt || '',
  ]);

  const completionRows = Object.values(payload.dailyCompletions || {}).map((c) => [
    c.date,
    JSON.stringify(c.completedScheduleIds),
    c.lastUpdated,
  ]);

  const valueUpdates = [
    {
      range: 'Settings!A2:B' + (settingsRows.length + 1),
      values: settingsRows,
    },
  ];

  if (theoryRows.length > 0) {
    valueUpdates.push({
      range: 'TheoryTopics!A2:N' + (theoryRows.length + 1),
      values: theoryRows,
    });
  }

  if (labRows.length > 0) {
    valueUpdates.push({
      range: 'LabTopics!A2:M' + (labRows.length + 1),
      values: labRows,
    });
  }

  if (completionRows.length > 0) {
    valueUpdates.push({
      range: 'TaskCompletions!A2:C' + (completionRows.length + 1),
      values: completionRows,
    });
  }

  const updateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'RAW',
        data: valueUpdates,
      }),
    }
  );

  if (!updateRes.ok) {
    const errText = await updateRes.text();
    throw new Error(`Failed to save to Google Sheets: ${errText}`);
  }
}
