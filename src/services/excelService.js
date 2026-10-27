import * as XLSX from 'xlsx';
import {
  PRE_LAB_SCHEDULE,
  LAB_SPRINT_SCHEDULE,
  THEORY_ONLY_SCHEDULE,
} from '../utils/defaultSchedules.js';
import { getTodayKolkata } from '../utils/dateUtils.js';

/**
 * Exports complete study tracker data into a well-formatted .xlsx workbook
 */
export function exportToExcel(state, filename = null) {
  const todayStr = getTodayKolkata();
  const actualFilename = filename || `mca_study_tracker_${todayStr}.xlsx`;
  const wb = XLSX.utils.book_new();

  // 1. TheoryTopics Sheet
  const theoryHeaders = [
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
  ];

  const theoryRows = (state.theoryTopics || []).map((t, idx) => [
    t.id || `theory-${idx + 1}`,
    t.name || '',
    t.subject || 'Data Science and Machine Learning',
    t.moduleUnit || '',
    t.pyqReference || '',
    t.priority || 'Medium',
    t.taskType || 'Learn',
    t.estimatedDuration || '',
    t.status || 'Not Started',
    t.targetDate || '',
    t.notes || '',
    t.order ?? idx,
    t.createdAt || '',
    t.completedAt || '',
  ]);

  const wsTheory = XLSX.utils.aoa_to_sheet([theoryHeaders, ...theoryRows]);
  wsTheory['!cols'] = [
    { wch: 15 },
    { wch: 35 },
    { wch: 35 },
    { wch: 15 },
    { wch: 25 },
    { wch: 12 },
    { wch: 18 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 35 },
    { wch: 8 },
    { wch: 22 },
    { wch: 22 },
  ];
  XLSX.utils.book_append_sheet(wb, wsTheory, 'TheoryTopics');

  // 2. LabTopics Sheet
  const labHeaders = [
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
  ];

  const labRows = (state.labTopics || []).map((l, idx) => [
    l.id || `lab-${idx + 1}`,
    l.lab || 'Mobile Application Development (MAD) Lab',
    l.name || '',
    l.experimentNumber || '',
    l.toolOrLanguage || '',
    l.priority || 'Medium',
    l.prepType || 'Write Code',
    l.estimatedDuration || '',
    l.status || 'Not Started',
    l.notes || '',
    l.order ?? idx,
    l.createdAt || '',
    l.completedAt || '',
  ]);

  const wsLab = XLSX.utils.aoa_to_sheet([labHeaders, ...labRows]);
  wsLab['!cols'] = [
    { wch: 15 },
    { wch: 35 },
    { wch: 35 },
    { wch: 16 },
    { wch: 22 },
    { wch: 12 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
    { wch: 35 },
    { wch: 8 },
    { wch: 22 },
    { wch: 22 },
  ];
  XLSX.utils.book_append_sheet(wb, wsLab, 'LabTopics');

  // 3. DailySchedule (Active and default reference timetables)
  const schedHeaders = [
    'ID',
    'Phase Presets',
    'Time Range',
    'Start Time',
    'End Time',
    'Activity Description',
    'Category',
  ];

  const schedRows = [];
  PRE_LAB_SCHEDULE.forEach((s) => {
    schedRows.push([s.id, 'Phase 1: Pre-Lab', s.timeRange, s.startTime, s.endTime, s.activity, s.category]);
  });
  LAB_SPRINT_SCHEDULE.forEach((s) => {
    schedRows.push([s.id, '2-Day Lab Sprint', s.timeRange, s.startTime, s.endTime, s.activity, s.category]);
  });
  THEORY_ONLY_SCHEDULE.forEach((s) => {
    schedRows.push([s.id, 'Phase 2: Theory-Only', s.timeRange, s.startTime, s.endTime, s.activity, s.category]);
  });

  const wsSched = XLSX.utils.aoa_to_sheet([schedHeaders, ...schedRows]);
  wsSched['!cols'] = [
    { wch: 14 },
    { wch: 22 },
    { wch: 20 },
    { wch: 12 },
    { wch: 12 },
    { wch: 50 },
    { wch: 14 },
  ];
  XLSX.utils.book_append_sheet(wb, wsSched, 'DailySchedule');

  // 4. TaskCompletions Sheet
  const compHeaders = ['Date (YYYY-MM-DD)', 'Completed Schedule IDs (JSON)', 'Last Updated'];
  const compRows = Object.values(state.dailyCompletions || {}).map((c) => [
    c.date,
    JSON.stringify(c.completedScheduleIds || []),
    c.lastUpdated || '',
  ]);

  const wsComp = XLSX.utils.aoa_to_sheet([compHeaders, ...compRows]);
  wsComp['!cols'] = [{ wch: 18 }, { wch: 45 }, { wch: 24 }];
  XLSX.utils.book_append_sheet(wb, wsComp, 'TaskCompletions');

  // 5. Settings Sheet
  const settingsHeaders = ['Setting Key', 'Value', 'Description'];
  const examDates = state.examDates || {};
  const toggles = state.toggles || {};

  const settingsRows = [
    ['ToggleA_LabDatesAnnounced', String(toggles.labDatesAnnounced), 'Phase Toggle A: Lab dates announced'],
    ['ToggleB_LabExamsCompleted', String(toggles.labExamsCompleted), 'Phase Toggle B: Lab exams completed (Theory-only)'],
    ['StudyLeaveStart', examDates.studyLeaveStart || '2026-10-29', 'Commencement of study leave'],
    ['Theory_DataScience_Date', examDates.theoryExams?.dataScience?.date || '2026-11-23', 'Data Science & ML Theory Exam Date'],
    ['Theory_DataScience_Completed', String(examDates.theoryExams?.dataScience?.isCompleted), 'DS Theory Exam Completed'],
    ['Theory_DAA_Date', examDates.theoryExams?.daa?.date || '2026-11-26', 'DAA Theory Exam Date'],
    ['Theory_DAA_Completed', String(examDates.theoryExams?.daa?.isCompleted), 'DAA Theory Exam Completed'],
    ['Theory_OR_Date', examDates.theoryExams?.operationsResearch?.date || '2026-11-30', 'Operations Research Theory Exam Date'],
    ['Theory_OR_Completed', String(examDates.theoryExams?.operationsResearch?.isCompleted), 'OR Theory Exam Completed'],
    ['Theory_DeepLearning_Date', examDates.theoryExams?.deepLearning?.date || '2026-12-03', 'Deep Learning Theory Exam Date'],
    ['Theory_DeepLearning_Completed', String(examDates.theoryExams?.deepLearning?.isCompleted), 'Deep Learning Theory Exam Completed'],
    ['Lab_MAD_Date', examDates.labExams?.madLab?.date || '', 'MAD Lab Practical Exam Date'],
    ['Lab_MAD_Completed', String(examDates.labExams?.madLab?.isCompleted), 'MAD Lab Exam Completed'],
    ['Lab_DS_Date', examDates.labExams?.dsLab?.date || '', 'Data Science Lab Practical Exam Date'],
    ['Lab_DS_Completed', String(examDates.labExams?.dsLab?.isCompleted), 'DS Lab Exam Completed'],
    ['ExportedAt', new Date().toISOString(), 'Export timestamp'],
  ];

  const wsSettings = XLSX.utils.aoa_to_sheet([settingsHeaders, ...settingsRows]);
  wsSettings['!cols'] = [{ wch: 30 }, { wch: 25 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsSettings, 'Settings');

  // Trigger browser download
  XLSX.writeFile(wb, actualFilename);
}

/**
 * Imports an .xlsx or .xls file and parses all sheets into state updates
 */
export async function importFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const result = {};

        // 1. Parse TheoryTopics
        if (wb.SheetNames.includes('TheoryTopics')) {
          const ws = wb.Sheets['TheoryTopics'];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          if (rows.length > 1) {
            const dataRows = rows.slice(1);
            result.theoryTopics = dataRows
              .filter((r) => r && r[1]) // must have name
              .map((r, idx) => ({
                id: r[0] || `theory-${Date.now()}-${idx}`,
                name: String(r[1] || 'Untitled Topic').trim(),
                subject: r[2] || 'Data Science and Machine Learning',
                moduleUnit: r[3] || undefined,
                pyqReference: r[4] || undefined,
                priority: r[5] || 'Medium',
                taskType: r[6] || 'Learn',
                estimatedDuration: r[7] || undefined,
                status: r[8] || 'Not Started',
                targetDate: r[9] ? String(r[9]).trim() : '',
                notes: r[10] || undefined,
                order: Number(r[11]) || idx,
                createdAt: r[12] || new Date().toISOString(),
                completedAt: r[13] || undefined,
              }));
          }
        }

        // 2. Parse LabTopics
        if (wb.SheetNames.includes('LabTopics')) {
          const ws = wb.Sheets['LabTopics'];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          if (rows.length > 1) {
            const dataRows = rows.slice(1);
            result.labTopics = dataRows
              .filter((r) => r && r[2]) // must have name
              .map((r, idx) => ({
                id: r[0] || `lab-${Date.now()}-${idx}`,
                lab: r[1] || 'Mobile Application Development (MAD) Lab',
                name: String(r[2] || 'Untitled Program').trim(),
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
          }
        }

        // 3. Parse Settings
        if (wb.SheetNames.includes('Settings')) {
          const ws = wb.Sheets['Settings'];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          if (rows.length > 1) {
            const settingsMap = {};
            rows.slice(1).forEach((r) => {
              if (r && r[0]) {
                settingsMap[r[0]] = r[1] !== undefined ? String(r[1]) : '';
              }
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
          }
        }

        // 4. Parse TaskCompletions
        if (wb.SheetNames.includes('TaskCompletions')) {
          const ws = wb.Sheets['TaskCompletions'];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          if (rows.length > 1) {
            const completions = {};
            rows.slice(1).forEach((r) => {
              const date = r[0];
              if (date) {
                let ids = [];
                try {
                  ids = JSON.parse(r[1] || '[]');
                } catch {
                  ids = r[1] ? String(r[1]).split(',') : [];
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

        resolve(result);
      } catch (err) {
        console.error('Failed to parse Excel workbook:', err);
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
