import { icon } from '../icons.js';
import {
  formatDateCompact,
  formatExamCountdown,
  getTodayKolkata,
} from '../utils/dateUtils.js';

const PREP_TYPES = [
  'All',
  'Write Code',
  'Execute',
  'Debug',
  'Explain Output',
  'Viva',
  'Read',
];

let labFilterState = {
  activeLabTab: 'Mobile Application Development (MAD) Lab',
  prepType: 'All',
  priority: 'All',
  status: 'All',
};

export function renderLabPlannerView(container, state, actions) {
  const {
    labTopics,
    madLabProgress,
    dsLabProgress,
    examDates,
    toggles,
  } = state;

  const todayStr = getTodayKolkata();
  const isMAD = labFilterState.activeLabTab === 'Mobile Application Development (MAD) Lab';
  const currentExam = isMAD ? examDates.labExams.madLab : examDates.labExams.dsLab;
  const labKey = isMAD ? 'madLab' : 'dsLab';

  const labFilteredTopics = labTopics
    .filter((l) => l.lab === labFilterState.activeLabTab)
    .filter((l) => (labFilterState.prepType === 'All' ? true : l.prepType === labFilterState.prepType))
    .filter((l) => (labFilterState.priority === 'All' ? true : l.priority === labFilterState.priority))
    .filter((l) => (labFilterState.status === 'All' ? true : l.status === labFilterState.status))
    .sort((a, b) => a.order - b.order);

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- 1. Header Card with Per-Lab Switcher and Completion Stats -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${icon('flaskConical', 'w-3.5 h-3.5 text-neutral-300')}
              <span>Lab Practical & Viva Preparation</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Lab Exam Planner
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Track coding, compilation, execution, debugging, and viva readiness for MCA practicals.
            </p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button
              id="lab-excel-export-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/80 hover:bg-emerald-900/60 rounded transition-colors cursor-pointer"
              title="Download Lab Programs as Excel spreadsheet"
            >
              ${icon('fileSpreadsheet', 'w-3.5 h-3.5 text-emerald-400')}
              <span>Excel Export</span>
            </button>
            <button
              id="lab-add-program-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors self-start md:self-auto cursor-pointer"
            >
              ${icon('plus', 'w-3.5 h-3.5')}
              <span>+ Add Lab Program</span>
            </button>
          </div>
        </div>


        <!-- Lab Switcher Tabs -->
        <div class="mt-5 grid grid-cols-2 gap-3">
          <button
            id="tab-btn-mad"
            class="p-3 rounded border text-left transition-all cursor-pointer ${
              isMAD
                ? 'bg-neutral-900 border-white text-white shadow-xs'
                : 'bg-[#0B0B0B] border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold uppercase tracking-wider">
                MAD Lab
              </span>
              <span class="text-xs font-mono text-neutral-300">
                ${madLabProgress.percentage}%
              </span>
            </div>
            <div class="text-[11px] text-neutral-400 mb-2 truncate">
              Mobile Application Development
            </div>
            <div class="w-full bg-[#151515] h-1.5 rounded-full overflow-hidden border border-neutral-800">
              <div
                class="bg-white h-full transition-all duration-300"
                style="width: ${madLabProgress.percentage}%"
              ></div>
            </div>
          </button>

          <button
            id="tab-btn-ds"
            class="p-3 rounded border text-left transition-all cursor-pointer ${
              !isMAD
                ? 'bg-neutral-900 border-white text-white shadow-xs'
                : 'bg-[#0B0B0B] border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold uppercase tracking-wider">
                Data Science Lab
              </span>
              <span class="text-xs font-mono text-neutral-300">
                ${dsLabProgress.percentage}%
              </span>
            </div>
            <div class="text-[11px] text-neutral-400 mb-2 truncate">
              Python / NumPy / Pandas / ML Models
            </div>
            <div class="w-full bg-[#151515] h-1.5 rounded-full overflow-hidden border border-neutral-800">
              <div
                class="bg-white h-full transition-all duration-300"
                style="width: ${dsLabProgress.percentage}%"
              ></div>
            </div>
          </button>
        </div>

        <!-- Selected Lab Exam Status Bar -->
        <div class="mt-4 p-3 bg-[#0B0B0B] border border-neutral-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div class="flex items-center gap-3">
            ${icon('calendar', 'w-4 h-4 text-neutral-400')}
            <div>
              <span class="text-neutral-400">Exam Date: </span>
              ${
                toggles.labDatesAnnounced && currentExam.date
                  ? `<span class="text-white font-semibold">
                      ${formatDateCompact(currentExam.date)} (${
                      formatExamCountdown(currentExam.date, todayStr).text
                    })
                    </span>`
                  : `<span class="text-neutral-500">Unconfirmed (Turn Toggle A ON in Dashboard to set)</span>`
              }
            </div>
          </div>

          <label class="flex items-center gap-2 cursor-pointer text-neutral-300">
            <input
              type="checkbox"
              id="lab-mark-completed-checkbox"
              ${currentExam.isCompleted ? 'checked' : ''}
              class="accent-white rounded cursor-pointer"
            />
            <span>Mark ${isMAD ? 'MAD' : 'DS'} Practical Exam Completed</span>
          </label>
        </div>
      </div>

      <!-- 2. Filters -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Prep Type Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Preparation Stage
            </label>
            <select
              id="lab-filter-prep"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
            >
              ${PREP_TYPES.map(
                (pt) =>
                  `<option value="${pt}" ${labFilterState.prepType === pt ? 'selected' : ''}>${
                    pt === 'All' ? 'All Preparation Stages' : pt
                  }</option>`
              ).join('')}
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Priority Filter
            </label>
            <select
              id="lab-filter-priority"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
            >
              <option value="All" ${labFilterState.priority === 'All' ? 'selected' : ''}>All Priorities</option>
              <option value="High" ${labFilterState.priority === 'High' ? 'selected' : ''}>High Priority</option>
              <option value="Medium" ${labFilterState.priority === 'Medium' ? 'selected' : ''}>Medium Priority</option>
              <option value="Low" ${labFilterState.priority === 'Low' ? 'selected' : ''}>Low Priority</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Status Filter
            </label>
            <select
              id="lab-filter-status"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
            >
              <option value="All" ${labFilterState.status === 'All' ? 'selected' : ''}>All Statuses</option>
              <option value="Not Started" ${labFilterState.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
              <option value="In Progress" ${labFilterState.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Done" ${labFilterState.status === 'Done' ? 'selected' : ''}>Done</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Lab Topics Checklist -->
      <div class="space-y-3">
        ${
          labFilteredTopics.length === 0
            ? `
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-10 text-center">
            ${icon('flaskConical', 'w-8 h-8 text-neutral-600 mx-auto mb-3')}
            <h3 class="text-sm font-semibold text-white mb-1">
              No Programs Found for ${isMAD ? 'MAD Lab' : 'Data Science Lab'}
            </h3>
            <p class="text-xs text-neutral-400 mb-4 max-w-sm mx-auto">
              Add your lab syllabus programs, experiment numbers, and viva points to track progress.
            </p>
            <button
              id="lab-empty-add-btn"
              class="px-4 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              + Add First Program
            </button>
          </div>
        `
            : labFilteredTopics
                .map((topic, index) => {
                  const isDone = topic.status === 'Done';

                  return `
            <div
              class="bg-[#151515] border rounded-lg p-4 transition-all ${
                isDone
                  ? 'border-neutral-800/60 opacity-60'
                  : 'border-neutral-800 hover:border-neutral-700'
              }"
            >
              <div class="flex items-start justify-between gap-3">
                <!-- Left: Checkbox & Info -->
                <div class="flex items-start gap-3 min-w-0">
                  <button
                    data-toggle-id="${topic.id}"
                    class="lab-toggle-btn mt-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ${
                      isDone
                        ? icon('checkSquare', 'w-5 h-5 text-white')
                        : icon('square', 'w-5 h-5 text-neutral-600')
                    }
                  </button>

                  <div class="min-w-0 space-y-1">
                    <!-- Meta Tags -->
                    <div class="flex items-center gap-2 flex-wrap">
                      ${
                        topic.experimentNumber
                          ? `<span class="text-[10px] font-mono font-bold text-white bg-neutral-900 border border-neutral-700 px-1.5 py-0.2 rounded">
                              ${topic.experimentNumber}
                            </span>`
                          : ''
                      }

                      <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                        topic.priority === 'High'
                          ? 'bg-neutral-900 text-white border-neutral-600 font-bold'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                      }">
                        ${topic.priority}
                      </span>

                      <span class="text-[10px] font-mono text-neutral-300 bg-neutral-900 px-2 py-0.2 rounded border border-neutral-800 uppercase">
                        Stage: ${topic.prepType}
                      </span>

                      ${
                        topic.toolOrLanguage
                          ? `<span class="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.2 rounded border border-neutral-800">
                              ${topic.toolOrLanguage}
                            </span>`
                          : ''
                      }

                      ${
                        topic.estimatedDuration
                          ? `<span class="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                              ${icon('clock', 'w-3 h-3')}
                              ${topic.estimatedDuration}
                            </span>`
                          : ''
                      }
                    </div>

                    <!-- Program Title -->
                    <h3 class="text-sm sm:text-base font-semibold ${
                      isDone ? 'line-through text-neutral-500' : 'text-white'
                    }">
                      ${topic.name}
                    </h3>

                    <!-- Notes / Viva points -->
                    ${
                      topic.notes
                        ? `<p class="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">
                            ${topic.notes}
                          </p>`
                        : ''
                    }
                  </div>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-1 shrink-0">
                  <div class="hidden sm:flex items-center">
                    <button
                      data-move-up="${index}"
                      ${index === 0 ? 'disabled' : ''}
                      class="lab-move-up p-1.5 text-neutral-500 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      ${icon('arrowUpDown', 'w-3.5 h-3.5')}
                    </button>
                  </div>

                  <button
                    data-edit-id="${topic.id}"
                    class="lab-edit-btn p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                    title="Edit program"
                  >
                    ${icon('edit2', 'w-3.5 h-3.5')}
                  </button>

                  <button
                    data-delete-id="${topic.id}"
                    data-topic-name="${encodeURIComponent(topic.name)}"
                    class="lab-delete-btn p-1.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    title="Delete program"
                  >
                    ${icon('trash2', 'w-3.5 h-3.5')}
                  </button>
                </div>
              </div>
            </div>
          `;
                })
                .join('')
        }
      </div>
    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#lab-excel-export-btn')?.addEventListener('click', () => {
    actions.exportToExcel();
  });

  const handleAdd = () => {
    actions.openAddLabModal(null, labFilterState.activeLabTab);
  };
  container.querySelector('#lab-add-program-btn')?.addEventListener('click', handleAdd);
  container.querySelector('#lab-empty-add-btn')?.addEventListener('click', handleAdd);


  // Tab switchers
  container.querySelector('#tab-btn-mad')?.addEventListener('click', () => {
    labFilterState.activeLabTab = 'Mobile Application Development (MAD) Lab';
    renderLabPlannerView(container, state, actions);
  });
  container.querySelector('#tab-btn-ds')?.addEventListener('click', () => {
    labFilterState.activeLabTab = 'Data Science Lab';
    renderLabPlannerView(container, state, actions);
  });

  // Checkbox mark completed
  container.querySelector('#lab-mark-completed-checkbox')?.addEventListener('change', (e) => {
    actions.markLabExamCompleted(labKey, e.target.checked);
  });

  // Filters
  container.querySelector('#lab-filter-prep')?.addEventListener('change', (e) => {
    labFilterState.prepType = e.target.value;
    renderLabPlannerView(container, state, actions);
  });
  container.querySelector('#lab-filter-priority')?.addEventListener('change', (e) => {
    labFilterState.priority = e.target.value;
    renderLabPlannerView(container, state, actions);
  });
  container.querySelector('#lab-filter-status')?.addEventListener('change', (e) => {
    labFilterState.status = e.target.value;
    renderLabPlannerView(container, state, actions);
  });

  // Topic Checkbox Toggle
  container.querySelectorAll('.lab-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-toggle-id');
      const topic = labTopics.find((l) => l.id === id);
      if (topic) {
        actions.updateLabTopic(id, {
          status: topic.status === 'Done' ? 'Not Started' : 'Done',
        });
      }
    });
  });

  // Topic Edit
  container.querySelectorAll('.lab-edit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-edit-id');
      const topic = labTopics.find((l) => l.id === id);
      if (topic) {
        actions.openAddLabModal(topic, topic.lab);
      }
    });
  });

  // Topic Delete with confirm
  container.querySelectorAll('.lab-delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-id');
      const name = decodeURIComponent(btn.getAttribute('data-topic-name') || '');
      actions.showConfirmDialog({
        title: 'Delete Lab Program?',
        message: `Are you sure you want to delete "${name}" from ${isMAD ? 'MAD Lab' : 'DS Lab'}?`,
        confirmLabel: 'Delete',
        isDestructive: true,
        onConfirm: () => {
          actions.deleteLabTopic(id);
        },
      });
    });
  });

  // Topic Move
  container.querySelectorAll('.lab-move-up').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(btn.getAttribute('data-move-up'));
      if (idx > 0 && idx < labFilteredTopics.length) {
        const reordered = [...labFilteredTopics];
        const temp = reordered[idx];
        reordered[idx] = reordered[idx - 1];
        reordered[idx - 1] = temp;
        actions.reorderLabTopics(reordered);
      }
    });
  });
}
