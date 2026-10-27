import { icon } from '../icons.js';
import {
  PRE_LAB_SCHEDULE,
  LAB_SPRINT_SCHEDULE,
  THEORY_ONLY_SCHEDULE,
} from '../utils/defaultSchedules.js';
import { getTodayKolkata } from '../utils/dateUtils.js';

let activeSheetTab = 'theory'; // 'theory' | 'lab' | 'exams' | 'schedule' | 'completions'
let excelSearchQuery = '';
let uploadStatusMsg = '';
let uploadErrorMsg = '';

export function renderExcelView(container, state, actions) {
  const {
    theoryTopics,
    labTopics,
    examDates,
    toggles,
    dailyCompletions,
  } = state;

  const todayStr = getTodayKolkata();

  // Filter rows based on search
  const filteredTheory = (theoryTopics || []).filter((t) => {
    if (!excelSearchQuery) return true;
    const q = excelSearchQuery.toLowerCase();
    return (
      (t.name || '').toLowerCase().includes(q) ||
      (t.subject || '').toLowerCase().includes(q) ||
      (t.pyqReference || '').toLowerCase().includes(q)
    );
  });

  const filteredLab = (labTopics || []).filter((l) => {
    if (!excelSearchQuery) return true;
    const q = excelSearchQuery.toLowerCase();
    return (
      (l.name || '').toLowerCase().includes(q) ||
      (l.lab || '').toLowerCase().includes(q) ||
      (l.experimentNumber || '').toLowerCase().includes(q)
    );
  });

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- 1. Header Card with Excel Import & Export Quick Actions -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              ${icon('fileSpreadsheet', 'w-4 h-4 text-emerald-400')}
              <span>Excel Spreadsheet Data Engine</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Excel Workbook & Table Editor
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Export and import your entire MCA exam plan as Microsoft Excel (<code class="text-neutral-300 font-mono">.xlsx</code>) files.
              You can edit rows directly in this spreadsheet grid or in Excel and sync seamlessly.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <!-- Hidden File Input for Excel Import -->
            <input
              type="file"
              id="excel-file-input"
              accept=".xlsx, .xls, .csv"
              class="hidden"
            />
            <button
              id="excel-import-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer"
              title="Import .xlsx file to populate schedule and topics"
            >
              ${icon('upload', 'w-3.5 h-3.5 text-emerald-400')}
              <span>Import .xlsx</span>
            </button>

            <button
              id="excel-export-btn"
              class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer shadow-xs"
              title="Download entire workbook as .xlsx spreadsheet"
            >
              ${icon('download', 'w-3.5 h-3.5 text-black')}
              <span>Export .xlsx</span>
            </button>
          </div>
        </div>

        <!-- Success or Error Alerts -->
        ${
          uploadStatusMsg
            ? `
          <div class="mt-4 p-3 bg-neutral-900 border border-emerald-500/50 rounded flex items-center gap-2 text-xs font-mono text-emerald-300">
            ${icon('checkCircle2', 'w-4 h-4 text-emerald-400 shrink-0')}
            <span>${uploadStatusMsg}</span>
          </div>
        `
            : ''
        }

        ${
          uploadErrorMsg
            ? `
          <div class="mt-4 p-3 bg-neutral-900 border border-red-500/50 rounded flex items-center gap-2 text-xs font-mono text-red-300">
            ${icon('alertTriangle', 'w-4 h-4 text-red-400 shrink-0')}
            <span>${uploadErrorMsg}</span>
          </div>
        `
            : ''
        }
      </div>

      <!-- 2. Sheet Tabs & Search Toolbar -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <!-- Excel Sheet Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              data-sheet="theory"
              class="sheet-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSheetTab === 'theory'
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }"
            >
              ${icon('bookOpen', 'w-3 h-3')}
              <span>TheoryTopics (${(theoryTopics || []).length})</span>
            </button>

            <button
              data-sheet="lab"
              class="sheet-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSheetTab === 'lab'
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }"
            >
              ${icon('flaskConical', 'w-3 h-3')}
              <span>LabTopics (${(labTopics || []).length})</span>
            </button>

            <button
              data-sheet="exams"
              class="sheet-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSheetTab === 'exams'
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }"
            >
              ${icon('calendar', 'w-3 h-3')}
              <span>ExamSettings</span>
            </button>

            <button
              data-sheet="schedule"
              class="sheet-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSheetTab === 'schedule'
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }"
            >
              ${icon('clock', 'w-3 h-3')}
              <span>DailySchedule</span>
            </button>

            <button
              data-sheet="completions"
              class="sheet-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSheetTab === 'completions'
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }"
            >
              ${icon('checkCircle', 'w-3 h-3')}
              <span>TaskCompletions</span>
            </button>
          </div>

          <!-- Add Row & Search Filter -->
          <div class="flex items-center gap-2">
            ${
              activeSheetTab === 'theory' || activeSheetTab === 'lab'
                ? `
              <button
                id="excel-add-row-btn"
                class="flex items-center gap-1 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
              >
                ${icon('plus', 'w-3 h-3')}
                <span>Add Row</span>
              </button>
            `
                : ''
            }
            <input
              type="text"
              id="excel-search-input"
              value="${excelSearchQuery}"
              placeholder="Search table..."
              class="bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 font-mono w-36 sm:w-48"
            />
          </div>
        </div>

        <!-- 3. Dynamic Data Table Grid -->
        <div class="overflow-x-auto rounded border border-neutral-800 bg-[#0B0B0B]">
          ${
            activeSheetTab === 'theory'
              ? renderTheoryTable(filteredTopicsToRender(filteredTheory))
              : activeSheetTab === 'lab'
              ? renderLabTable(filteredTopicsToRender(filteredLab))
              : activeSheetTab === 'exams'
              ? renderExamsTable(examDates, toggles)
              : activeSheetTab === 'schedule'
              ? renderScheduleTable()
              : renderCompletionsTable(dailyCompletions)
          }
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelectorAll('.sheet-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSheetTab = btn.getAttribute('data-sheet');
      renderExcelView(container, state, actions);
    });
  });

  const searchInput = container.querySelector('#excel-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      excelSearchQuery = e.target.value;
      renderExcelView(container, state, actions);
    });
  }

  // Add row
  container.querySelector('#excel-add-row-btn')?.addEventListener('click', () => {
    if (activeSheetTab === 'theory') {
      actions.openAddTheoryModal(null, todayStr);
    } else if (activeSheetTab === 'lab') {
      actions.openAddLabModal(null);
    }
  });

  // Export to Excel button
  container.querySelector('#excel-export-btn')?.addEventListener('click', () => {
    actions.exportToExcel();
  });

  // Import from Excel file input trigger
  const fileInput = container.querySelector('#excel-file-input');
  container.querySelector('#excel-import-btn')?.addEventListener('click', () => {
    fileInput?.click();
  });

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        uploadStatusMsg = 'Reading and importing Excel spreadsheet...';
        uploadErrorMsg = '';
        renderExcelView(container, state, actions);

        const res = await actions.importFromExcelFile(file);
        uploadStatusMsg = `Successfully imported ${res.countTheory} theory topic(s) and ${res.countLab} lab program(s) from "${file.name}"!`;
        setTimeout(() => {
          uploadStatusMsg = '';
        }, 5000);
      } catch (err) {
        uploadErrorMsg = `Failed to import Excel file: ${err.message || 'Invalid format'}`;
      }
      renderExcelView(container, state, actions);
    });
  }

  // Delete row buttons inside table
  container.querySelectorAll('.excel-delete-theory-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      actions.showConfirmDialog({
        title: 'Delete Theory Row?',
        message: 'Are you sure you want to delete this topic from the spreadsheet?',
        confirmLabel: 'Delete Row',
        isDestructive: true,
        onConfirm: () => {
          actions.deleteTheoryTopic(id);
        },
      });
    });
  });

  container.querySelectorAll('.excel-delete-lab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      actions.showConfirmDialog({
        title: 'Delete Lab Row?',
        message: 'Are you sure you want to delete this program from the spreadsheet?',
        confirmLabel: 'Delete Row',
        isDestructive: true,
        onConfirm: () => {
          actions.deleteLabTopic(id);
        },
      });
    });
  });

  // Edit status / values directly
  container.querySelectorAll('.excel-status-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      if (type === 'theory') {
        const t = (theoryTopics || []).find((item) => item.id === id);
        if (t) {
          const nextStatus = t.status === 'Done' ? 'Not Started' : 'Done';
          actions.updateTheoryTopic(id, { status: nextStatus });
        }
      } else if (type === 'lab') {
        const l = (labTopics || []).find((item) => item.id === id);
        if (l) {
          const nextStatus = l.status === 'Done' ? 'Not Started' : 'Done';
          actions.updateLabTopic(id, { status: nextStatus });
        }
      }
    });
  });
}

function filteredTopicsToRender(arr) {
  return arr || [];
}

function renderTheoryTable(topics) {
  if (topics.length === 0) {
    return `<div class="p-8 text-center text-xs text-neutral-400 font-mono">No Theory Topics in sheet. Click "+ Add Row" or "Import .xlsx" to load data.</div>`;
  }

  return `
    <table class="w-full text-left border-collapse text-xs font-mono">
      <thead>
        <tr class="bg-[#151515] border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
          <th class="p-2.5 w-12 text-center">#</th>
          <th class="p-2.5">Topic Name</th>
          <th class="p-2.5">Subject</th>
          <th class="p-2.5">PYQ Ref</th>
          <th class="p-2.5">Priority</th>
          <th class="p-2.5">Task Type</th>
          <th class="p-2.5">Target Date</th>
          <th class="p-2.5">Status</th>
          <th class="p-2.5 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-900">
        ${topics
          .map((t, idx) => {
            const isDone = t.status === 'Done';
            return `
            <tr class="hover:bg-neutral-900/50 transition-colors">
              <td class="p-2.5 text-center text-neutral-600">${idx + 1}</td>
              <td class="p-2.5 text-white font-medium ${isDone ? 'line-through text-neutral-500' : ''}">
                ${t.name}
              </td>
              <td class="p-2.5 text-neutral-300 truncate max-w-xs">${t.subject}</td>
              <td class="p-2.5 text-neutral-400">${t.pyqReference || '—'}</td>
              <td class="p-2.5">
                <span class="px-1.5 py-0.5 rounded text-[9px] uppercase border ${
                  t.priority === 'High'
                    ? 'bg-neutral-900 text-white border-neutral-600 font-bold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }">
                  ${t.priority}
                </span>
              </td>
              <td class="p-2.5 text-neutral-300">${t.taskType}</td>
              <td class="p-2.5 text-neutral-400">${t.targetDate || '—'}</td>
              <td class="p-2.5">
                <button
                  data-id="${t.id}"
                  data-type="theory"
                  class="excel-status-toggle px-2 py-0.5 rounded text-[10px] uppercase border transition-colors cursor-pointer ${
                    isDone
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }"
                >
                  ${t.status}
                </button>
              </td>
              <td class="p-2.5 text-right">
                <button
                  data-id="${t.id}"
                  class="excel-delete-theory-btn text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer"
                  title="Delete row"
                >
                  ${icon('trash2', 'w-3.5 h-3.5')}
                </button>
              </td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
  `;
}

function renderLabTable(topics) {
  if (topics.length === 0) {
    return `<div class="p-8 text-center text-xs text-neutral-400 font-mono">No Lab Topics in sheet. Click "+ Add Row" or "Import .xlsx" to load data.</div>`;
  }

  return `
    <table class="w-full text-left border-collapse text-xs font-mono">
      <thead>
        <tr class="bg-[#151515] border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
          <th class="p-2.5 w-12 text-center">#</th>
          <th class="p-2.5">Lab</th>
          <th class="p-2.5">Program Name</th>
          <th class="p-2.5">Exp #</th>
          <th class="p-2.5">Tool / Lang</th>
          <th class="p-2.5">Priority</th>
          <th class="p-2.5">Prep Stage</th>
          <th class="p-2.5">Status</th>
          <th class="p-2.5 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-900">
        ${topics
          .map((l, idx) => {
            const isDone = l.status === 'Done';
            return `
            <tr class="hover:bg-neutral-900/50 transition-colors">
              <td class="p-2.5 text-center text-neutral-600">${idx + 1}</td>
              <td class="p-2.5 text-neutral-300 whitespace-nowrap">${l.lab.includes('MAD') ? 'MAD Lab' : 'DS Lab'}</td>
              <td class="p-2.5 text-white font-medium ${isDone ? 'line-through text-neutral-500' : ''}">
                ${l.name}
              </td>
              <td class="p-2.5 text-neutral-400">${l.experimentNumber || '—'}</td>
              <td class="p-2.5 text-neutral-400">${l.toolOrLanguage || '—'}</td>
              <td class="p-2.5">
                <span class="px-1.5 py-0.5 rounded text-[9px] uppercase border ${
                  l.priority === 'High'
                    ? 'bg-neutral-900 text-white border-neutral-600 font-bold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }">
                  ${l.priority}
                </span>
              </td>
              <td class="p-2.5 text-neutral-300">${l.prepType}</td>
              <td class="p-2.5">
                <button
                  data-id="${l.id}"
                  data-type="lab"
                  class="excel-status-toggle px-2 py-0.5 rounded text-[10px] uppercase border transition-colors cursor-pointer ${
                    isDone
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }"
                >
                  ${l.status}
                </button>
              </td>
              <td class="p-2.5 text-right">
                <button
                  data-id="${l.id}"
                  class="excel-delete-lab-btn text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer"
                  title="Delete row"
                >
                  ${icon('trash2', 'w-3.5 h-3.5')}
                </button>
              </td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
  `;
}

function renderExamsTable(examDates = {}, toggles = {}) {
  const rows = [
    { label: 'Study Leave Start Date', key: 'StudyLeaveStart', value: examDates.studyLeaveStart || '2026-10-29', type: 'Date' },
    { label: 'Data Science & ML Theory Exam', key: 'Theory_DataScience', value: examDates.theoryExams?.dataScience?.date || '2026-11-23', type: 'Exam' },
    { label: 'DAA Theory Exam', key: 'Theory_DAA', value: examDates.theoryExams?.daa?.date || '2026-11-26', type: 'Exam' },
    { label: 'Operations Research Theory Exam', key: 'Theory_OR', value: examDates.theoryExams?.operationsResearch?.date || '2026-11-30', type: 'Exam' },
    { label: 'Deep Learning Theory Exam', key: 'Theory_DeepLearning', value: examDates.theoryExams?.deepLearning?.date || '2026-12-03', type: 'Exam' },
    { label: 'MAD Lab Practical Exam', key: 'Lab_MAD', value: examDates.labExams?.madLab?.date || 'Pending', type: 'Practical' },
    { label: 'Data Science Lab Practical Exam', key: 'Lab_DS', value: examDates.labExams?.dsLab?.date || 'Pending', type: 'Practical' },
    { label: 'Toggle A (Lab Dates Announced)', key: 'ToggleA', value: toggles.labDatesAnnounced ? 'TRUE (Active)' : 'FALSE', type: 'Boolean' },
    { label: 'Toggle B (Lab Exams Completed)', key: 'ToggleB', value: toggles.labExamsCompleted ? 'TRUE (Theory-Only)' : 'FALSE', type: 'Boolean' },
  ];

  return `
    <table class="w-full text-left border-collapse text-xs font-mono">
      <thead>
        <tr class="bg-[#151515] border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
          <th class="p-2.5 w-12 text-center">#</th>
          <th class="p-2.5">Exam Parameter / Setting</th>
          <th class="p-2.5">Key</th>
          <th class="p-2.5">Type</th>
          <th class="p-2.5">Value in Workbook</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-900">
        ${rows
          .map(
            (r, idx) => `
          <tr class="hover:bg-neutral-900/50 transition-colors">
            <td class="p-2.5 text-center text-neutral-600">${idx + 1}</td>
            <td class="p-2.5 text-white font-medium">${r.label}</td>
            <td class="p-2.5 text-neutral-400">${r.key}</td>
            <td class="p-2.5 text-neutral-500">${r.type}</td>
            <td class="p-2.5 text-emerald-400 font-semibold">${r.value}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;
}

function renderScheduleTable() {
  return `
    <table class="w-full text-left border-collapse text-xs font-mono">
      <thead>
        <tr class="bg-[#151515] border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
          <th class="p-2.5 w-12 text-center">#</th>
          <th class="p-2.5">Phase Preset</th>
          <th class="p-2.5">Time Range</th>
          <th class="p-2.5">Category</th>
          <th class="p-2.5">Activity Description</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-900">
        ${PRE_LAB_SCHEDULE.map(
          (s, idx) => `
          <tr class="hover:bg-neutral-900/50 transition-colors">
            <td class="p-2.5 text-center text-neutral-600">${idx + 1}</td>
            <td class="p-2.5 text-neutral-400">Phase 1: Pre-Lab</td>
            <td class="p-2.5 text-white font-medium whitespace-nowrap">${s.timeRange}</td>
            <td class="p-2.5">
              <span class="px-1.5 py-0.5 rounded text-[9px] uppercase border bg-neutral-950 text-neutral-300 border-neutral-800">
                ${s.category}
              </span>
            </td>
            <td class="p-2.5 text-neutral-300">${s.activity}</td>
          </tr>
        `
        ).join('')}
      </tbody>
    </table>
  `;
}

function renderCompletionsTable(completions = {}) {
  const dates = Object.keys(completions || {});
  if (dates.length === 0) {
    return `<div class="p-8 text-center text-xs text-neutral-400 font-mono">No daily timetable checkmark logs recorded yet.</div>`;
  }

  return `
    <table class="w-full text-left border-collapse text-xs font-mono">
      <thead>
        <tr class="bg-[#151515] border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
          <th class="p-2.5 w-12 text-center">#</th>
          <th class="p-2.5">Date (YYYY-MM-DD)</th>
          <th class="p-2.5">Blocks Completed</th>
          <th class="p-2.5">Completed Schedule IDs</th>
          <th class="p-2.5">Last Updated</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-900">
        ${dates
          .map((d, idx) => {
            const item = completions[d];
            const ids = item?.completedScheduleIds || [];
            return `
            <tr class="hover:bg-neutral-900/50 transition-colors">
              <td class="p-2.5 text-center text-neutral-600">${idx + 1}</td>
              <td class="p-2.5 text-white font-semibold">${d}</td>
              <td class="p-2.5 text-emerald-400 font-medium">${ids.length} blocks</td>
              <td class="p-2.5 text-neutral-400 text-[10px] max-w-xs truncate">${JSON.stringify(ids)}</td>
              <td class="p-2.5 text-neutral-500">${item?.lastUpdated ? new Date(item.lastUpdated).toLocaleString() : '—'}</td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
  `;
}
