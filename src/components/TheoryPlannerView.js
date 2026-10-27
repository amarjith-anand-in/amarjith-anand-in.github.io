import { icon } from '../icons.js';
import {
  formatDateCompact,
  getTodayKolkata,
  getTomorrowKolkata,
} from '../utils/dateUtils.js';

const SUBJECTS = [
  'All',
  'Data Science and Machine Learning',
  'Design and Analysis of Algorithms (DAA)',
  'Operations Research (OR)',
  'Deep Learning',
];

// Module-level filter states
let theoryFilterState = {
  subject: 'All',
  priority: 'All',
  status: 'All',
  dateScope: 'tomorrow',
};

export function renderTheoryPlannerView(container, state, actions) {
  const { theoryTopics, theoryProgress } = state;
  const todayStr = getTodayKolkata();
  const tomorrowStr = getTomorrowKolkata();

  // Filter topics
  const filteredTopics = theoryTopics
    .filter((t) => {
      if (theoryFilterState.subject !== 'All' && t.subject !== theoryFilterState.subject) return false;
      if (theoryFilterState.priority !== 'All' && t.priority !== theoryFilterState.priority) return false;
      if (theoryFilterState.status !== 'All' && t.status !== theoryFilterState.status) return false;
      if (theoryFilterState.dateScope === 'tomorrow' && t.targetDate !== tomorrowStr) return false;
      if (theoryFilterState.dateScope === 'today' && t.targetDate !== todayStr) return false;
      return true;
    })
    .sort((a, b) => a.order - b.order);

  const unfinishedPastTopics = theoryTopics.filter(
    (t) => t.targetDate <= todayStr && t.status !== 'Done'
  );

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- 1. Header Card with Stats & Night Planning launcher -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${icon('bookOpen', 'w-3.5 h-3.5 text-neutral-300')}
              <span>Theory Exam Preparation</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Theory Planner & PYQ Strategy
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Organize note preparation, active recall, and previous-year question analysis for
              MCA semester theory exams.
            </p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button
              id="theory-excel-export-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/80 hover:bg-emerald-900/60 rounded transition-colors cursor-pointer"
              title="Download Theory Topics as Excel spreadsheet"
            >
              ${icon('fileSpreadsheet', 'w-3.5 h-3.5 text-emerald-400')}
              <span>Excel Export</span>
            </button>
            <button
              id="theory-night-pyq-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer"
            >
              ${icon('sparkles', 'w-3.5 h-3.5 text-neutral-300')}
              <span>10:00 PM PYQ Review</span>
            </button>
            <button
              id="theory-add-topic-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              ${icon('plus', 'w-3.5 h-3.5')}
              <span>+ Add Topic</span>
            </button>
          </div>
        </div>


        <!-- Progress bar -->
        <div class="mt-5 pt-4 border-t border-neutral-800">
          <div class="flex items-center justify-between text-xs font-mono mb-2">
            <span class="text-neutral-400">OVERALL THEORY COMPLETION</span>
            <span class="text-white font-bold">
              ${theoryProgress.completed} of ${theoryProgress.total} completed (
              ${theoryProgress.percentage}%)
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-2 rounded-full overflow-hidden border border-neutral-800">
            <div
              class="bg-white h-full transition-all duration-300"
              style="width: ${theoryProgress.percentage}%"
            ></div>
          </div>
        </div>

        <!-- Carry Forward Unfinished Banner if applicable -->
        ${
          unfinishedPastTopics.length > 0
            ? `
          <div class="mt-4 p-3 bg-[#0B0B0B] border border-neutral-800 rounded flex items-center justify-between gap-3">
            <div class="text-xs text-neutral-300 font-mono">
              You have <span class="text-white font-bold">${unfinishedPastTopics.length}</span> incomplete topic(s) from today or earlier.
            </div>
            <button
              id="theory-carry-forward-btn"
              class="flex items-center gap-1 text-xs font-mono px-3 py-1 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <span>Carry to Tomorrow</span>
              ${icon('arrowRight', 'w-3 h-3')}
            </button>
          </div>
        `
            : ''
        }
      </div>

      <!-- 2. Filters & View Controls -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4 space-y-3">
        <!-- Date Scope Pills -->
        <div class="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
          <span class="text-xs font-mono text-neutral-500 uppercase mr-1">View:</span>
          <button
            data-scope="tomorrow"
            class="scope-btn px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
              theoryFilterState.dateScope === 'tomorrow'
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
            }"
          >
            Tomorrow's Topics (${tomorrowStr})
          </button>
          <button
            data-scope="today"
            class="scope-btn px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
              theoryFilterState.dateScope === 'today'
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
            }"
          >
            Today's Topics (${todayStr})
          </button>
          <button
            data-scope="all"
            class="scope-btn px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
              theoryFilterState.dateScope === 'all'
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
            }"
          >
            All Saved Dates
          </button>
        </div>

        <!-- Subject & Status Filters -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <!-- Subject Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Subject Filter
            </label>
            <select
              id="theory-filter-subject"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              ${SUBJECTS.map(
                (s) =>
                  `<option value="${s}" ${theoryFilterState.subject === s ? 'selected' : ''}>${s}</option>`
              ).join('')}
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Priority Filter
            </label>
            <select
              id="theory-filter-priority"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="All" ${theoryFilterState.priority === 'All' ? 'selected' : ''}>All Priorities</option>
              <option value="High" ${theoryFilterState.priority === 'High' ? 'selected' : ''}>High Priority</option>
              <option value="Medium" ${theoryFilterState.priority === 'Medium' ? 'selected' : ''}>Medium Priority</option>
              <option value="Low" ${theoryFilterState.priority === 'Low' ? 'selected' : ''}>Low Priority</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Status Filter
            </label>
            <select
              id="theory-filter-status"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="All" ${theoryFilterState.status === 'All' ? 'selected' : ''}>All Statuses</option>
              <option value="Not Started" ${theoryFilterState.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
              <option value="In Progress" ${theoryFilterState.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Done" ${theoryFilterState.status === 'Done' ? 'selected' : ''}>Done</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Topics Checklist -->
      <div class="space-y-3">
        ${
          filteredTopics.length === 0
            ? `
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-10 text-center">
            ${icon('bookOpen', 'w-8 h-8 text-neutral-600 mx-auto mb-3')}
            <h3 class="text-sm font-semibold text-white mb-1">No Theory Topics Found</h3>
            <p class="text-xs text-neutral-400 mb-4 max-w-sm mx-auto">
              ${
                theoryFilterState.dateScope === 'tomorrow'
                  ? `No topics scheduled for tomorrow (${tomorrowStr}). Use the button below to add high-yield questions.`
                  : 'No topics match your current filter selection.'
              }
            </p>
            <button
              id="theory-empty-add-btn"
              class="px-4 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              + Add Tomorrow's Topic
            </button>
          </div>
        `
            : filteredTopics
                .map((topic, index) => {
                  const isDone = topic.status === 'Done';
                  const isTomorrow = topic.targetDate === tomorrowStr;

                  return `
            <div
              class="bg-[#151515] border rounded-lg p-4 transition-all ${
                isDone
                  ? 'border-neutral-800/60 opacity-60'
                  : 'border-neutral-800 hover:border-neutral-700'
              }"
            >
              <div class="flex items-start justify-between gap-3">
                <!-- Left: Checkbox & Content -->
                <div class="flex items-start gap-3 min-w-0">
                  <button
                    data-toggle-id="${topic.id}"
                    class="topic-toggle-btn mt-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
                      <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                        topic.priority === 'High'
                          ? 'bg-neutral-900 text-white border-neutral-600 font-bold'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                      }">
                        ${topic.priority}
                      </span>

                      <span class="text-[10px] font-mono text-neutral-300 font-medium bg-neutral-900 px-2 py-0.2 rounded border border-neutral-800">
                        ${topic.subject}
                      </span>

                      <span class="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.2 rounded border border-neutral-800">
                        ${topic.taskType}
                      </span>

                      ${
                        topic.moduleUnit
                          ? `<span class="text-[10px] font-mono text-neutral-400">[${topic.moduleUnit}]</span>`
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

                    <!-- Topic Name -->
                    <h3 class="text-sm sm:text-base font-semibold ${
                      isDone ? 'line-through text-neutral-500' : 'text-white'
                    }">
                      ${topic.name}
                    </h3>

                    <!-- PYQ Reference -->
                    ${
                      topic.pyqReference
                        ? `<div class="text-xs font-mono text-neutral-300 bg-[#0B0B0B] inline-block px-2 py-0.5 rounded border border-neutral-800">
                            PYQ: ${topic.pyqReference}
                          </div>`
                        : ''
                    }

                    <!-- Notes -->
                    ${
                      topic.notes
                        ? `<p class="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">
                            ${topic.notes}
                          </p>`
                        : ''
                    }

                    <!-- Planned Date -->
                    <div class="text-[10px] font-mono text-neutral-500 pt-1">
                      Planned Date: ${formatDateCompact(topic.targetDate)} ${
                    isTomorrow ? '(Tomorrow)' : topic.targetDate === todayStr ? '(Today)' : ''
                  }
                    </div>
                  </div>
                </div>

                <!-- Right: Actions (Move, Edit, Delete) -->
                <div class="flex items-center gap-1 shrink-0">
                  <div class="hidden sm:flex items-center">
                    <button
                      data-move-up="${index}"
                      ${index === 0 ? 'disabled' : ''}
                      class="topic-move-up p-1.5 text-neutral-500 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      ${icon('arrowUpDown', 'w-3.5 h-3.5')}
                    </button>
                  </div>

                  <button
                    data-edit-id="${topic.id}"
                    class="topic-edit-btn p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                    title="Edit topic"
                  >
                    ${icon('edit2', 'w-3.5 h-3.5')}
                  </button>

                  <button
                    data-delete-id="${topic.id}"
                    data-topic-name="${encodeURIComponent(topic.name)}"
                    class="topic-delete-btn p-1.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    title="Delete topic"
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

  container.querySelector('#theory-excel-export-btn')?.addEventListener('click', () => {
    actions.exportToExcel();
  });

  // Attach Event Handlers
  container.querySelector('#theory-excel-export-btn')?.addEventListener('click', () => {
    actions.exportToExcel?.();
  });

  container.querySelector('#theory-night-pyq-btn')?.addEventListener('click', () => {
    actions.openNightPYQModal();
  });

  const handleAdd = () => {
    actions.openAddTheoryModal(null, tomorrowStr);
  };
  container.querySelector('#theory-add-topic-btn')?.addEventListener('click', handleAdd);
  container.querySelector('#theory-empty-add-btn')?.addEventListener('click', handleAdd);

  // Carry forward
  container.querySelector('#theory-carry-forward-btn')?.addEventListener('click', () => {
    if (unfinishedPastTopics.length === 0) return;
    actions.showConfirmDialog({
      title: 'Carry Forward Unfinished Topics?',
      message: `Move ${unfinishedPastTopics.length} incomplete topic(s) to tomorrow's plan (${tomorrowStr})?`,
      confirmLabel: 'Carry Forward',
      onConfirm: () => {
        actions.carryUnfinishedTheoryTopics(todayStr, tomorrowStr);
      },
    });
  });

  // Scope buttons
  container.querySelectorAll('.scope-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      theoryFilterState.dateScope = btn.getAttribute('data-scope');
      renderTheoryPlannerView(container, state, actions);
    });
  });

  // Filter dropdowns
  container.querySelector('#theory-filter-subject')?.addEventListener('change', (e) => {
    theoryFilterState.subject = e.target.value;
    renderTheoryPlannerView(container, state, actions);
  });
  container.querySelector('#theory-filter-priority')?.addEventListener('change', (e) => {
    theoryFilterState.priority = e.target.value;
    renderTheoryPlannerView(container, state, actions);
  });
  container.querySelector('#theory-filter-status')?.addEventListener('change', (e) => {
    theoryFilterState.status = e.target.value;
    renderTheoryPlannerView(container, state, actions);
  });

  // Topic checkbox toggle
  container.querySelectorAll('.topic-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-toggle-id');
      const topic = theoryTopics.find((t) => t.id === id);
      if (topic) {
        actions.updateTheoryTopic(id, {
          status: topic.status === 'Done' ? 'Not Started' : 'Done',
        });
      }
    });
  });

  // Topic Edit
  container.querySelectorAll('.topic-edit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-edit-id');
      const topic = theoryTopics.find((t) => t.id === id);
      if (topic) {
        actions.openAddTheoryModal(topic, topic.targetDate);
      }
    });
  });

  // Topic Delete with confirm
  container.querySelectorAll('.topic-delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-id');
      const name = decodeURIComponent(btn.getAttribute('data-topic-name') || '');
      actions.showConfirmDialog({
        title: 'Delete Theory Topic?',
        message: `Are you sure you want to permanently delete "${name}"?`,
        confirmLabel: 'Delete',
        isDestructive: true,
        onConfirm: () => {
          actions.deleteTheoryTopic(id);
        },
      });
    });
  });

  // Topic Move
  container.querySelectorAll('.topic-move-up').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(btn.getAttribute('data-move-up'));
      if (idx > 0 && idx < filteredTopics.length) {
        const reordered = [...filteredTopics];
        const temp = reordered[idx];
        reordered[idx] = reordered[idx - 1];
        reordered[idx - 1] = temp;
        actions.reorderTheoryTopics(reordered);
      }
    });
  });
}
