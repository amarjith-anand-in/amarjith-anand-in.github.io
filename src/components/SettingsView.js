import { icon } from '../icons.js';
import {
  PRE_LAB_SCHEDULE,
  LAB_SPRINT_SCHEDULE,
  THEORY_ONLY_SCHEDULE,
} from '../utils/defaultSchedules.js';
import { getTodayKolkata } from '../utils/dateUtils.js';

let activeTimetablePresetTab = 'pre-lab';
let taskFilterSubject = 'all';

export function renderSettingsView(container, state, actions) {
  const {
    examDates,
    user,
    syncState,
    theoryTopics,
    labTopics,
    customTasks = [],
    dailyCompletions,
  } = state;

  const todayStr = getTodayKolkata();

  const currentPresetSchedule =
    activeTimetablePresetTab === 'pre-lab'
      ? PRE_LAB_SCHEDULE
      : activeTimetablePresetTab === 'lab-sprint'
      ? LAB_SPRINT_SCHEDULE
      : THEORY_ONLY_SCHEDULE;

  const filteredTasks =
    taskFilterSubject === 'all'
      ? customTasks
      : customTasks.filter((t) => t.subject === taskFilterSubject);

  const uniqueSubjects = Array.from(new Set(customTasks.map((t) => t.subject).filter(Boolean)));

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- 1. Header -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 shadow-sm">
        <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
          ${icon('settings', 'w-3.5 h-3.5 text-neutral-300')}
          <span>Configuration & Cloud Data</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Settings & Task Manager
        </h1>
        <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          Manage your Firebase Firestore account, custom study tasks, exam schedule, and Excel data backup.
        </p>
      </div>

      <!-- 2. Firebase Firestore Cloud Backend & Account Card -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div class="flex items-center gap-2.5">
            ${icon('database', 'w-4 h-4 text-amber-400')}
            <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
              Firebase Firestore Backend & Authentication
            </h2>
          </div>
          <span class="text-[11px] font-mono text-neutral-400">
            Project: <span class="text-neutral-200">study-tracker-b70c8</span>
          </span>
        </div>

        <!-- Auth & Sync Status Banner -->
        <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
          <div class="flex items-start sm:items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0">
              ${
                user
                  ? icon('checkCircle2', 'w-4 h-4 text-emerald-400')
                  : icon('user', 'w-4 h-4 text-neutral-400')
              }
            </div>
            <div>
              <div class="text-white font-medium flex items-center gap-2">
                <span>${user ? `Signed in: ${user.email}` : 'Running in Local Offline Mode'}</span>
                ${
                  user
                    ? `<span class="px-1.5 py-0.2 rounded text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800">CLOUD SYNCED</span>`
                    : `<span class="px-1.5 py-0.2 rounded text-[9px] bg-neutral-900 text-neutral-400 border border-neutral-700">GUEST</span>`
                }
              </div>
              <p class="text-[11px] text-neutral-400 mt-0.5">
                ${
                  user
                    ? `Changes sync automatically to Firestore. ${syncState.lastSyncedAt ? `Last saved at ${syncState.lastSyncedAt}` : ''}`
                    : 'Sign in to access your custom tasks, streak, and syllabus from any phone or computer.'
                }
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            ${
              user
                ? `
              <button
                id="settings-firestore-save-btn"
                class="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                ${icon('uploadCloud', 'w-3.5 h-3.5')}
                <span>Force Cloud Save</span>
              </button>
              <button
                id="settings-signout-btn"
                class="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                ${icon('logOut', 'w-3.5 h-3.5')}
                <span>Sign Out</span>
              </button>
            `
                : `
              <button
                id="settings-auth-open-btn"
                class="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                ${icon('user', 'w-3.5 h-3.5')}
                <span>Sign In or Register</span>
              </button>
            `
            }
          </div>
        </div>
      </div>

      <!-- 3. Manage Tasks & Custom Schedule Section -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 gap-3">
          <div>
            <div class="flex items-center gap-2.5">
              ${icon('calendar', 'w-4 h-4 text-white')}
              <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                Manage Custom Study Tasks (${customTasks.length})
              </h2>
            </div>
            <p class="text-xs text-neutral-400 mt-0.5">
              Customize, reorder, or clear tasks for any study day.
            </p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button
              id="settings-add-task-btn"
              class="px-3.5 py-1.5 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              ${icon('plus', 'w-3.5 h-3.5')}
              <span>+ Add Task</span>
            </button>
            <button
              id="settings-seed-today-btn"
              class="px-3 py-1.5 text-xs font-mono font-medium text-neutral-200 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer flex items-center gap-1.5"
            >
              ${icon('zap', 'w-3 h-3 text-amber-400')}
              <span>Seed Template Schedule</span>
            </button>
            ${
              customTasks.length > 0
                ? `
              <button
                id="settings-clear-all-tasks-btn"
                class="px-2.5 py-1.5 text-xs font-mono text-neutral-400 hover:text-rose-300 bg-neutral-900 border border-neutral-800 hover:border-rose-800 rounded transition-colors cursor-pointer"
                title="Clear all custom tasks"
              >
                ${icon('trash2', 'w-3.5 h-3.5')}
              </button>
            `
                : ''
            }
          </div>
        </div>

        <!-- Filter bar -->
        ${
          uniqueSubjects.length > 0
            ? `
          <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            <span class="text-neutral-500 shrink-0">Filter Subject:</span>
            <button
              data-subject="all"
              class="settings-filter-subj-btn px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                taskFilterSubject === 'all'
                  ? 'bg-neutral-800 text-white border-neutral-600 font-semibold'
                  : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:text-white'
              }"
            >
              All (${customTasks.length})
            </button>
            ${uniqueSubjects
              .map(
                (subj) => `
              <button
                data-subject="${subj}"
                class="settings-filter-subj-btn px-2.5 py-1 rounded border transition-colors cursor-pointer truncate max-w-[150px] ${
                  taskFilterSubject === subj
                    ? 'bg-neutral-800 text-white border-neutral-600 font-semibold'
                    : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:text-white'
                }"
              >
                ${subj.split(' ')[0]}
              </button>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }

        <!-- Task Table / List -->
        ${
          filteredTasks.length === 0
            ? `
          <div class="p-8 text-center bg-[#0B0B0B] border border-dashed border-neutral-800 rounded-lg text-neutral-400 text-xs">
            No study tasks created yet. Click "+ Add Task" or "Seed Template Schedule" to start planning!
          </div>
        `
            : `
          <div class="space-y-2 max-h-96 overflow-y-auto pr-1">
            ${filteredTasks
              .map((task) => {
                const isDone = Boolean(task.isCompleted);
                return `
                <div class="p-3 bg-[#0B0B0B] border border-neutral-800 hover:border-neutral-700 rounded-lg flex items-center justify-between gap-3 text-xs">
                  <div class="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      data-task-id="${task.id}"
                      class="settings-task-toggle-btn text-neutral-400 hover:text-white cursor-pointer shrink-0"
                    >
                      ${
                        isDone
                          ? icon('checkSquare', 'w-4 h-4 text-emerald-400')
                          : icon('square', 'w-4 h-4')
                      }
                    </button>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-mono text-neutral-400 font-semibold text-[11px]">${task.date}</span>
                        <span class="text-neutral-500 font-mono text-[10px]">&bull; ${task.timeSlot}</span>
                        <span class="px-1.5 py-0.2 rounded text-[9px] font-mono border ${
                          task.priority === 'High'
                            ? 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                        }">
                          ${task.priority}
                        </span>
                      </div>
                      <p class="font-medium text-white truncate mt-0.5 ${isDone ? 'line-through text-neutral-500' : ''}">
                        ${task.title}
                      </p>
                      <span class="text-[10px] text-neutral-500 font-mono">${task.subject}</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 shrink-0">
                    <button
                      data-edit-id="${task.id}"
                      class="settings-task-edit-btn p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Edit Task"
                    >
                      ${icon('edit', 'w-3.5 h-3.5')}
                    </button>
                    <button
                      data-delete-id="${task.id}"
                      class="settings-task-delete-btn p-1.5 text-neutral-500 hover:text-rose-400 rounded hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete Task"
                    >
                      ${icon('trash2', 'w-3.5 h-3.5')}
                    </button>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        `
        }
      </div>

      <!-- 4. Academic Exam Schedule Configurator -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${icon('calendar', 'w-4 h-4 text-white')}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Semester Exam Dates
          </h2>
        </div>

        <!-- Study Leave Start Date -->
        <div>
          <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
            Study Leave Start Date
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
            Theory Exams:
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
            Lab Practical Exams:
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

      <!-- 5. Timetable Presets Reference Viewer -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${icon('clock', 'w-4 h-4 text-white')}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Daily Timetable Reference Templates
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
              <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 shrink-0">
                ${item.category}
              </span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- 6. Excel & JSON Data Management Card -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${icon('fileSpreadsheet', 'w-4 h-4 text-emerald-400')}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Excel & Local Data Backup
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Excel Export -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-lg space-y-2">
            <div class="flex items-center gap-2 text-white font-medium text-xs">
              ${icon('download', 'w-4 h-4 text-emerald-400')}
              <span>Download Excel (.xlsx)</span>
            </div>
            <p class="text-[11px] text-neutral-400">
              Export all theory syllabus, lab programs, custom tasks, and exam dates into a formatted multi-sheet Excel workbook.
            </p>
            <button
              id="settings-export-excel-btn"
              class="w-full mt-2 py-2 px-3 text-xs font-mono font-medium text-black bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              ${icon('fileSpreadsheet', 'w-3.5 h-3.5')}
              <span>Export Full Excel Plan</span>
            </button>
          </div>

          <!-- Excel Import -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-lg space-y-2">
            <div class="flex items-center gap-2 text-white font-medium text-xs">
              ${icon('upload', 'w-4 h-4 text-cyan-400')}
              <span>Import Excel (.xlsx)</span>
            </div>
            <p class="text-[11px] text-neutral-400">
              Upload your syllabus or revised task schedule from a valid .xlsx file.
            </p>
            <input type="file" id="settings-excel-file-input" accept=".xlsx,.xls" class="hidden" />
            <button
              id="settings-import-excel-btn"
              class="w-full mt-2 py-2 px-3 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              ${icon('upload', 'w-3.5 h-3.5')}
              <span>Upload Excel File</span>
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
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
  container.querySelector('#settings-auth-open-btn')?.addEventListener('click', () => {
    actions.openAuthModal('login');
  });

  container.querySelector('#settings-firestore-save-btn')?.addEventListener('click', () => {
    actions.saveToFirestore();
  });

  container.querySelector('#settings-signout-btn')?.addEventListener('click', () => {
    actions.signOutUser();
  });

  // Add Task
  container.querySelector('#settings-add-task-btn')?.addEventListener('click', () => {
    actions.openAddTaskModal(null, todayStr);
  });

  container.querySelector('#settings-seed-today-btn')?.addEventListener('click', () => {
    actions.seedRecommendedSchedule(todayStr);
  });

  container.querySelector('#settings-clear-all-tasks-btn')?.addEventListener('click', () => {
    actions.showConfirmDialog({
      title: 'Clear All Custom Tasks?',
      message: 'This will remove all custom study tasks from all dates. Your theory and lab syllabus topics will remain safe.',
      confirmLabel: 'Clear All Tasks',
      isDestructive: true,
      onConfirm: () => {
        actions.clearDayTasks(null); // clears all
      },
    });
  });

  // Filter subject buttons
  container.querySelectorAll('.settings-filter-subj-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      taskFilterSubject = btn.getAttribute('data-subject') || 'all';
      renderSettingsView(container, state, actions);
    });
  });

  // Task item checkboxes
  container.querySelectorAll('.settings-task-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-task-id');
      if (id) actions.toggleCustomTask(id);
    });
  });

  // Task item edit
  container.querySelectorAll('.settings-task-edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-id');
      const task = customTasks.find((t) => t.id === id);
      if (task) actions.openAddTaskModal(task, task.date);
    });
  });

  // Task item delete
  container.querySelectorAll('.settings-task-delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-delete-id');
      const task = customTasks.find((t) => t.id === id);
      if (task) {
        actions.showConfirmDialog({
          title: 'Delete Task',
          message: `Are you sure you want to delete "${task.title}"?`,
          confirmLabel: 'Delete',
          isDestructive: true,
          onConfirm: () => actions.deleteCustomTask(id),
        });
      }
    });
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
      customTasks,
      dailyCompletions,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study_tracker_backup_${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}
