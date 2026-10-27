import { icon } from '../icons.js';
import {
  PRE_LAB_SCHEDULE,
  LAB_SPRINT_SCHEDULE,
  THEORY_ONLY_SCHEDULE,
} from '../utils/defaultSchedules.js';
import { getTodayKolkata } from '../utils/dateUtils.js';

let activeTimetablePresetTab = 'pre-lab';
let saveSuccessMsg = '';

export function renderSettingsView(container, state, actions) {
  const {
    examDates,
    user,
    syncState,
    theoryTopics,
    labTopics,
    dailyCompletions,
  } = state;

  const todayStr = getTodayKolkata();

  const currentPresetSchedule =
    activeTimetablePresetTab === 'pre-lab'
      ? PRE_LAB_SCHEDULE
      : activeTimetablePresetTab === 'lab-sprint'
      ? LAB_SPRINT_SCHEDULE
      : THEORY_ONLY_SCHEDULE;

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- 1. Header -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
        <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
          ${icon('settings', 'w-3.5 h-3.5 text-neutral-300')}
          <span>Configuration & Cloud Sync</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Application Settings
        </h1>
        <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          Manage Google Sheets persistence, configurable exam dates, phase transitions, and daily schedule presets.
        </p>
      </div>

      <!-- 2. Google Sheets Backend Integration Card -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div class="flex items-center gap-2.5">
            ${icon('database', 'w-4 h-4 text-white')}
            <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
              Google Sheets Backend
            </h2>
          </div>
          <a
            href="${syncState.spreadsheetUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>Open Sheet</span>
            ${icon('externalLink', 'w-3.5 h-3.5')}
          </a>
        </div>

        <!-- Sync Status Banner -->
        <div class="p-3.5 bg-[#0B0B0B] border border-neutral-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div class="flex items-center gap-2.5">
            ${
              syncState.syncStatus === 'syncing'
                ? icon('refreshCw', 'w-4 h-4 animate-spin text-white')
                : syncState.syncStatus === 'error'
                ? icon('alertCircle', 'w-4 h-4 text-neutral-300')
                : syncState.isConnected
                ? icon('checkCircle2', 'w-4 h-4 text-white')
                : icon('info', 'w-4 h-4 text-neutral-500')
            }
            <div>
              <span class="text-neutral-400">Connection Status: </span>
              <span class="text-white font-medium">
                ${
                  syncState.syncStatus === 'syncing'
                    ? 'Saving changes to Google Sheets...'
                    : syncState.syncStatus === 'error'
                    ? 'Connection Error'
                    : syncState.isConnected
                    ? `Connected (${user?.email || 'Signed in'})`
                    : 'Local Storage (Sign in to sync)'
                }
              </span>
              ${
                syncState.lastSyncedAt
                  ? `<span class="text-neutral-500 ml-2">(Last synced at ${syncState.lastSyncedAt})</span>`
                  : ''
              }
            </div>
          </div>

          <div class="flex items-center gap-2">
            ${
              user
                ? `
              <button
                id="settings-sync-now-btn"
                ${syncState.syncStatus === 'syncing' ? 'disabled' : ''}
                class="px-3 py-1.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                ${icon(
                  'refreshCw',
                  `w-3.5 h-3.5 ${syncState.syncStatus === 'syncing' ? 'animate-spin' : ''}`
                )}
                <span>Sync Now</span>
              </button>
              <button
                id="settings-sign-out-btn"
                class="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 rounded cursor-pointer"
                title="Sign out"
              >
                ${icon('logOut', 'w-3.5 h-3.5')}
              </button>
            `
                : `
              <button id="settings-google-signin-btn" class="gsi-material-button">
                <div class="gsi-material-button-state"></div>
                <div class="gsi-material-button-content-wrapper">
                  <div class="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="display: block;">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span class="gsi-material-button-contents">Sign in with Google</span>
                </div>
              </button>
            `
            }
          </div>
        </div>

        ${
          syncState.errorMessage
            ? `<div class="p-3 bg-neutral-900 border border-neutral-700 rounded text-xs text-neutral-200 font-mono">
                Error: ${syncState.errorMessage}
              </div>`
            : ''
        }

        <!-- Spreadsheet Link Form -->
        <form id="settings-sheet-form" class="space-y-2">
          <label class="block text-xs font-mono uppercase text-neutral-400">
            Connected Spreadsheet ID or URL
          </label>
          <div class="flex gap-2">
            <input
              type="text"
              id="settings-sheet-input"
              value="${syncState.spreadsheetId}"
              placeholder="Google Spreadsheet ID or URL"
              class="flex-1 bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
            />
            <button
              type="submit"
              class="px-4 py-2 text-xs font-mono uppercase font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              Update ID
            </button>
          </div>
          ${
            saveSuccessMsg
              ? `<p class="text-xs font-mono text-neutral-300">${saveSuccessMsg}</p>`
              : ''
          }
          <p class="text-[11px] text-neutral-500">
            Default Workbook ID: <code class="text-neutral-400 font-mono">1x_nnfVAKcBEwqlX8VK5KHNQQzs5y45KB64JvPGqW47A</code>.
            Organized into <code class="text-neutral-400 font-mono">Settings</code>, <code class="text-neutral-400 font-mono">TheoryTopics</code>, <code class="text-neutral-400 font-mono">LabTopics</code>, and <code class="text-neutral-400 font-mono">TaskCompletions</code>.
          </p>
        </form>
      </div>

      <!-- 3. Configurable Exam Dates -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${icon('calendar', 'w-4 h-4 text-white')}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Semester Examination Dates
          </h2>
        </div>

        <!-- Study Leave Start -->
        <div class="max-w-md">
          <label class="block text-xs font-mono uppercase text-neutral-400 mb-1">
            Study Leave Commencement
          </label>
          <input
            type="date"
            id="settings-studyleave-date"
            value="${examDates.studyLeaveStart}"
            class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
          />
        </div>

        <!-- Theory Exam Dates -->
        <div class="pt-2">
          <span class="text-xs font-mono uppercase text-neutral-500 block mb-2">
            Theory Exams (Configurable):
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Data Science and Machine Learning
              </label>
              <input
                type="date"
                id="settings-date-ds-theory"
                value="${examDates.theoryExams.dataScience.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Design and Analysis of Algorithms (DAA)
              </label>
              <input
                type="date"
                id="settings-date-daa"
                value="${examDates.theoryExams.daa.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Operations Research (OR)
              </label>
              <input
                type="date"
                id="settings-date-or"
                value="${examDates.theoryExams.operationsResearch.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Deep Learning
              </label>
              <input
                type="date"
                id="settings-date-dl"
                value="${examDates.theoryExams.deepLearning.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Lab Practical Dates -->
        <div class="pt-2">
          <span class="text-xs font-mono uppercase text-neutral-500 block mb-2">
            Lab Practical Exams (Editable):
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Mobile Application Development (MAD) Lab
              </label>
              <input
                type="date"
                id="settings-date-mad-lab"
                value="${examDates.labExams.madLab.date || ''}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Data Science Lab
              </label>
              <input
                type="date"
                id="settings-date-ds-lab"
                value="${examDates.labExams.dsLab.date || ''}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Timetable Presets Reference Viewer -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${icon('clock', 'w-4 h-4 text-white')}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Daily Timetable Reference
          </h2>
        </div>

        <div class="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <button
            data-preset="pre-lab"
            class="preset-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
              activeTimetablePresetTab === 'pre-lab'
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800'
            }"
          >
            Phase 1: Pre-Lab (Mixed)
          </button>
          <button
            data-preset="lab-sprint"
            class="preset-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
              activeTimetablePresetTab === 'lab-sprint'
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800'
            }"
          >
            2-Day Lab Sprint
          </button>
          <button
            data-preset="theory-only"
            class="preset-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
              activeTimetablePresetTab === 'theory-only'
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800'
            }"
          >
            Phase 2: Theory-Only
          </button>
        </div>

        <!-- Selected Timetable Display -->
        <div class="space-y-1.5">
          ${currentPresetSchedule
            .map(
              (item) => `
            <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 min-w-0">
                <span class="font-mono text-neutral-400 shrink-0 w-28 sm:w-32">
                  ${item.timeRange}
                </span>
                <span class="text-neutral-200 font-medium truncate">
                  ${item.activity}
                </span>
              </div>
              <span class="text-[10px] font-mono uppercase text-neutral-500 shrink-0">
                ${item.category}
              </span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- 5. Data Management & Excel Tools -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${icon('sliders', 'w-4 h-4 text-white')}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Data Tools & Excel (.xlsx) Operations
          </h2>
        </div>

        <!-- Excel Section Banner -->
        <div class="p-3.5 bg-[#0B0B0B] border border-emerald-900/40 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div class="flex items-center gap-2.5">
            ${icon('fileSpreadsheet', 'w-5 h-5 text-emerald-400 shrink-0')}
            <div>
              <span class="text-emerald-400 font-semibold block uppercase text-[11px]">
                Excel Spreadsheet Mode
              </span>
              <span class="text-neutral-400 text-xs">
                Download or upload your complete syllabus as an .xlsx workbook with Theory, Lab, Schedule, and Exam tabs.
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <input type="file" id="settings-excel-file-input" accept=".xlsx, .xls, .csv" class="hidden" />
            <button
              id="settings-import-excel-btn"
              class="px-3 py-1.5 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              ${icon('upload', 'w-3.5 h-3.5 text-emerald-400')}
              <span>Import .xlsx</span>
            </button>
            <button
              id="settings-export-excel-btn"
              class="px-3.5 py-1.5 text-xs font-mono font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              ${icon('download', 'w-3.5 h-3.5 text-black')}
              <span>Download .xlsx</span>
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            id="settings-reset-checks-btn"
            class="w-full sm:w-auto px-4 py-2 text-xs font-mono uppercase font-medium text-neutral-300 hover:text-white bg-[#0B0B0B] border border-neutral-800 hover:border-neutral-700 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            ${icon('rotateCcw', 'w-3.5 h-3.5')}
            <span>Reset Today's Checkmarks</span>
          </button>

          <button
            id="settings-export-json-btn"
            class="w-full sm:w-auto px-4 py-2 text-xs font-mono uppercase font-medium text-white bg-[#0B0B0B] border border-neutral-800 hover:border-neutral-700 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            ${icon('download', 'w-3.5 h-3.5')}
            <span>Export JSON Backup</span>
          </button>
        </div>
      </div>
    </div>

  `;

  // Attach Event Handlers
  container.querySelector('#settings-sync-now-btn')?.addEventListener('click', () => {
    actions.syncWithSheets();
  });

  container.querySelector('#settings-sign-out-btn')?.addEventListener('click', () => {
    actions.signOutUser();
  });

  container.querySelector('#settings-google-signin-btn')?.addEventListener('click', () => {
    actions.signInWithGoogle();
  });

  // Update Sheet Form
  container.querySelector('#settings-sheet-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = container.querySelector('#settings-sheet-input')?.value || '';
    actions.setCustomSpreadsheetId(val);
    saveSuccessMsg = 'Spreadsheet ID updated. Click "Sync Now" to connect.';
    renderSettingsView(container, state, actions);
    setTimeout(() => {
      saveSuccessMsg = '';
    }, 4000);
  });

  // Date changes
  container.querySelector('#settings-studyleave-date')?.addEventListener('change', (e) => {
    actions.setExamDates({ studyLeaveStart: e.target.value });
  });

  container.querySelector('#settings-date-ds-theory')?.addEventListener('change', (e) => {
    actions.setExamDates({
      theoryExams: {
        ...examDates.theoryExams,
        dataScience: { ...examDates.theoryExams.dataScience, date: e.target.value },
      },
    });
  });

  container.querySelector('#settings-date-daa')?.addEventListener('change', (e) => {
    actions.setExamDates({
      theoryExams: {
        ...examDates.theoryExams,
        daa: { ...examDates.theoryExams.daa, date: e.target.value },
      },
    });
  });

  container.querySelector('#settings-date-or')?.addEventListener('change', (e) => {
    actions.setExamDates({
      theoryExams: {
        ...examDates.theoryExams,
        operationsResearch: { ...examDates.theoryExams.operationsResearch, date: e.target.value },
      },
    });
  });

  container.querySelector('#settings-date-dl')?.addEventListener('change', (e) => {
    actions.setExamDates({
      theoryExams: {
        ...examDates.theoryExams,
        deepLearning: { ...examDates.theoryExams.deepLearning, date: e.target.value },
      },
    });
  });

  container.querySelector('#settings-date-mad-lab')?.addEventListener('change', (e) => {
    actions.updateLabExam('madLab', e.target.value);
  });

  container.querySelector('#settings-date-ds-lab')?.addEventListener('change', (e) => {
    actions.updateLabExam('dsLab', e.target.value);
  });

  // Preset tabs
  container.querySelectorAll('.preset-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTimetablePresetTab = btn.getAttribute('data-preset');
      renderSettingsView(container, state, actions);
    });
  });

  // Reset checks
  container.querySelector('#settings-reset-checks-btn')?.addEventListener('click', () => {
    actions.showConfirmDialog({
      title: "Reset Today's Checkmarks?",
      message:
        "This will clear all daily timetable checkmarks for today without deleting any topics or exam dates.",
      confirmLabel: 'Reset',
      isDestructive: true,
      onConfirm: () => {
        actions.resetDaySchedule(todayStr);
      },
    });
  });

  // Excel .xlsx Operations
  const excelFileInput = container.querySelector('#settings-excel-file-input');
  container.querySelector('#settings-import-excel-btn')?.addEventListener('click', () => {
    excelFileInput?.click();
  });

  excelFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file && actions.importFromExcelFile) {
      await actions.importFromExcelFile(file);
    }
  });

  container.querySelector('#settings-export-excel-btn')?.addEventListener('click', () => {
    if (actions.exportToExcel) {
      actions.exportToExcel();
    }
  });

  // Export JSON
  container.querySelector('#settings-export-json-btn')?.addEventListener('click', () => {
    const backup = {
      exportTimestamp: new Date().toISOString(),
      examDates,
      theoryTopics,
      labTopics,
      dailyCompletions,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mca_study_backup_${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}
