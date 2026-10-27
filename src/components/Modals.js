import { icon } from '../icons.js';
import { getTomorrowKolkata } from '../utils/dateUtils.js';

const THEORY_SUBJECTS = [
  'Data Science and Machine Learning',
  'Design and Analysis of Algorithms (DAA)',
  'Operations Research (OR)',
  'Deep Learning',
];

const THEORY_TASK_TYPES = [
  'Learn',
  'Prepare Notes',
  'Practise Questions',
  'Revise',
  'Mock Test',
];

const LAB_NAMES = [
  'Mobile Application Development (MAD) Lab',
  'Data Science Lab',
];

const LAB_PREP_TYPES = [
  'Read',
  'Write Code',
  'Execute',
  'Debug',
  'Explain Output',
  'Viva',
];

export function renderConfirmModal(modalContainer, state, actions) {
  const { confirmDialog } = state;
  if (!confirmDialog.isOpen) {
    modalContainer.innerHTML = '';
    return;
  }

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        class="relative w-full max-w-md bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl"
      >
        <button
          id="confirm-modal-close"
          aria-label="Close dialog"
          class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          ${icon('x', 'w-5 h-5')}
        </button>

        <div class="flex items-start gap-3 mb-4">
          <div
            class="p-2 rounded-md ${
              confirmDialog.isDestructive
                ? 'bg-neutral-900 border border-neutral-700 text-neutral-200'
                : 'bg-neutral-900 border border-neutral-800 text-white'
            }"
          >
            ${icon('alertTriangle', 'w-5 h-5')}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white tracking-tight">
              ${confirmDialog.title}
            </h3>
          </div>
        </div>

        <p class="text-sm text-neutral-300 leading-relaxed mb-6">
          ${confirmDialog.message}
        </p>

        <div class="flex items-center justify-end gap-3">
          <button
            id="confirm-modal-cancel-btn"
            class="px-4 py-2 text-xs uppercase tracking-wider font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded transition-colors cursor-pointer"
          >
            ${confirmDialog.cancelLabel || 'Cancel'}
          </button>
          <button
            id="confirm-modal-confirm-btn"
            class="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer ${
              confirmDialog.isDestructive
                ? 'bg-neutral-200 text-black hover:bg-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }"
          >
            ${confirmDialog.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  `;

  modalContainer.querySelector('#confirm-modal-close')?.addEventListener('click', () => {
    actions.closeConfirmDialog();
  });
  modalContainer.querySelector('#confirm-modal-cancel-btn')?.addEventListener('click', () => {
    actions.closeConfirmDialog();
  });
  modalContainer.querySelector('#confirm-modal-confirm-btn')?.addEventListener('click', () => {
    confirmDialog.onConfirm();
  });
}

/**
 * Add / Edit Theory Topic Modal
 */
export function openTheoryModal(modalContainer, topic = null, defaultDate = null, actions) {
  let name = topic?.name || '';
  let subject = topic?.subject || 'Data Science and Machine Learning';
  let moduleUnit = topic?.moduleUnit || '';
  let pyqReference = topic?.pyqReference || '';
  let priority = topic?.priority || 'High';
  let taskType = topic?.taskType || 'Prepare Notes';
  let estimatedDuration = topic?.estimatedDuration || '45m';
  let targetDate = topic?.targetDate || defaultDate || getTomorrowKolkata();
  let status = topic?.status || 'Not Started';
  let notes = topic?.notes || '';
  let error = '';

  const render = () => {
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
        <div class="relative w-full max-w-lg bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl my-8">
          <button
            id="modal-theory-close"
            aria-label="Close"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ${icon('x', 'w-5 h-5')}
          </button>

          <div class="flex items-center gap-2 mb-5">
            ${icon('bookOpen', 'w-5 h-5 text-neutral-300')}
            <h3 class="text-base font-semibold uppercase tracking-wider text-white">
              ${topic ? 'Edit Theory Topic' : 'Add Theory Topic for Tomorrow'}
            </h3>
          </div>

          <form id="modal-theory-form" class="space-y-4">
            ${
              error
                ? `<div class="p-2.5 bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded">
                    ${error}
                  </div>`
                : ''
            }

            <!-- Topic Name -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Topic Name *
              </label>
              <input
                type="text"
                id="modal-theory-name"
                value="${name}"
                placeholder="e.g., Dynamic Programming Matrix Chain Multiplication"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-sans"
              />
            </div>

            <!-- Subject -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Subject
              </label>
              <select
                id="modal-theory-subject"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              >
                ${THEORY_SUBJECTS.map(
                  (s) => `<option value="${s}" ${subject === s ? 'selected' : ''}>${s}</option>`
                ).join('')}
              </select>
            </div>

            <!-- Module & PYQ Reference -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Module / Unit (Optional)
                </label>
                <input
                  type="text"
                  id="modal-theory-module"
                  value="${moduleUnit}"
                  placeholder="e.g. Unit 3"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  PYQ Reference / Repeated Count
                </label>
                <input
                  type="text"
                  id="modal-theory-pyq"
                  value="${pyqReference}"
                  placeholder="e.g. 2023 Dec (3x repeated)"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <!-- Priority & Task Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Priority
                </label>
                <div class="grid grid-cols-3 gap-1.5">
                  ${['High', 'Medium', 'Low']
                    .map(
                      (p) => `
                    <button
                      type="button"
                      data-prio="${p}"
                      class="modal-prio-btn py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${
                        priority === p
                          ? 'bg-white text-black border-white'
                          : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }"
                    >
                      ${p}
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Task Type
                </label>
                <select
                  id="modal-theory-tasktype"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                >
                  ${THEORY_TASK_TYPES.map(
                    (t) => `<option value="${t}" ${taskType === t ? 'selected' : ''}>${t}</option>`
                  ).join('')}
                </select>
              </div>
            </div>

            <!-- Planned Date & Estimated Duration -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Planned Date (Target)
                </label>
                <input
                  type="date"
                  id="modal-theory-date"
                  value="${targetDate}"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 font-mono"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Est. Duration
                </label>
                <input
                  type="text"
                  id="modal-theory-duration"
                  value="${estimatedDuration}"
                  placeholder="e.g. 45m or 1.5h"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <!-- Status (if editing) -->
            ${
              topic
                ? `
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Status
                </label>
                <div class="grid grid-cols-3 gap-2">
                  ${['Not Started', 'In Progress', 'Done']
                    .map(
                      (s) => `
                    <button
                      type="button"
                      data-status="${s}"
                      class="modal-status-btn py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                        status === s
                          ? 'bg-white text-black font-semibold border-white'
                          : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }"
                    >
                      ${s}
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Notes -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Study Notes / Key Formulas (Optional)
              </label>
              <textarea
                id="modal-theory-notes"
                rows="2"
                placeholder="Important formulas, page references, or specific questions..."
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              >${notes}</textarea>
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                id="modal-theory-cancel-btn"
                class="px-4 py-2 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded hover:border-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
              >
                ${topic ? 'Save Changes' : 'Add Topic'}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelector('#modal-theory-close')?.addEventListener('click', close);
    modalContainer.querySelector('#modal-theory-cancel-btn')?.addEventListener('click', close);

    // Priority buttons
    modalContainer.querySelectorAll('.modal-prio-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        priority = btn.getAttribute('data-prio');
        render();
      });
    });

    // Status buttons
    modalContainer.querySelectorAll('.modal-status-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        status = btn.getAttribute('data-status');
        render();
      });
    });

    // Form submit
    modalContainer.querySelector('#modal-theory-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = modalContainer.querySelector('#modal-theory-name')?.value.trim();
      if (!nameVal) {
        error = 'Topic name is required';
        render();
        return;
      }

      const payload = {
        name: nameVal,
        subject: modalContainer.querySelector('#modal-theory-subject')?.value || subject,
        moduleUnit: modalContainer.querySelector('#modal-theory-module')?.value.trim() || undefined,
        pyqReference: modalContainer.querySelector('#modal-theory-pyq')?.value.trim() || undefined,
        priority,
        taskType: modalContainer.querySelector('#modal-theory-tasktype')?.value || taskType,
        estimatedDuration: modalContainer.querySelector('#modal-theory-duration')?.value.trim() || undefined,
        targetDate: modalContainer.querySelector('#modal-theory-date')?.value || targetDate,
        status,
        notes: modalContainer.querySelector('#modal-theory-notes')?.value.trim() || undefined,
      };

      if (topic) {
        actions.updateTheoryTopic(topic.id, payload);
      } else {
        actions.addTheoryTopic(payload);
      }
      close();
    });
  };

  render();
}

/**
 * Add / Edit Lab Program Modal
 */
export function openLabModal(modalContainer, topic = null, defaultLab = 'Mobile Application Development (MAD) Lab', actions) {
  let lab = topic?.lab || defaultLab;
  let name = topic?.name || '';
  let experimentNumber = topic?.experimentNumber || '';
  let toolOrLanguage =
    topic?.toolOrLanguage || (lab.includes('MAD') ? 'Kotlin / Android Studio' : 'Python / Pandas');
  let priority = topic?.priority || 'High';
  let prepType = topic?.prepType || 'Write Code';
  let estimatedDuration = topic?.estimatedDuration || '45m';
  let status = topic?.status || 'Not Started';
  let notes = topic?.notes || '';
  let error = '';

  const render = () => {
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
        <div class="relative w-full max-w-lg bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl my-8">
          <button
            id="modal-lab-close"
            aria-label="Close"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ${icon('x', 'w-5 h-5')}
          </button>

          <div class="flex items-center gap-2 mb-5">
            ${icon('flaskConical', 'w-5 h-5 text-neutral-300')}
            <h3 class="text-base font-semibold uppercase tracking-wider text-white">
              ${topic ? 'Edit Lab Program / Topic' : 'Add Lab Program / Topic'}
            </h3>
          </div>

          <form id="modal-lab-form" class="space-y-4">
            ${
              error
                ? `<div class="p-2.5 bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded">
                    ${error}
                  </div>`
                : ''
            }

            <!-- Lab Selection -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Target Lab *
              </label>
              <div class="grid grid-cols-2 gap-2">
                ${LAB_NAMES.map(
                  (l) => `
                  <button
                    type="button"
                    data-lab="${l}"
                    class="modal-lab-btn p-2.5 text-xs text-left font-mono rounded border transition-colors cursor-pointer ${
                      lab === l
                        ? 'bg-white text-black font-semibold border-white'
                        : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }"
                  >
                    ${l.includes('MAD') ? 'MAD Lab' : 'Data Science Lab'}
                  </button>
                `
                ).join('')}
              </div>
            </div>

            <!-- Program Name -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Topic or Program Name *
              </label>
              <input
                type="text"
                id="modal-lab-name"
                value="${name}"
                placeholder="${
                  lab.includes('MAD')
                    ? 'e.g. SQLite CRUD Database App with RecyclerView'
                    : 'e.g. Linear Regression on House Prices with MSE'
                }"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <!-- Experiment Number & Tool / Language -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Experiment # (Optional)
                </label>
                <input
                  type="text"
                  id="modal-lab-expnum"
                  value="${experimentNumber}"
                  placeholder="e.g. Exp 05 or Prog 3"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Tool / Language
                </label>
                <input
                  type="text"
                  id="modal-lab-tool"
                  value="${toolOrLanguage}"
                  placeholder="e.g. Android Studio / Python"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <!-- Priority & Prep Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Priority
                </label>
                <div class="grid grid-cols-3 gap-1.5">
                  ${['High', 'Medium', 'Low']
                    .map(
                      (p) => `
                    <button
                      type="button"
                      data-prio="${p}"
                      class="modal-prio-btn py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${
                        priority === p
                          ? 'bg-white text-black border-white'
                          : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }"
                    >
                      ${p}
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Prep Type
                </label>
                <select
                  id="modal-lab-preptype"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                >
                  ${LAB_PREP_TYPES.map(
                    (pt) => `<option value="${pt}" ${prepType === pt ? 'selected' : ''}>${pt}</option>`
                  ).join('')}
                </select>
              </div>
            </div>

            <!-- Est. Duration -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Estimated Duration
              </label>
              <input
                type="text"
                id="modal-lab-duration"
                value="${estimatedDuration}"
                placeholder="e.g. 45m, 1h"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <!-- Status (if editing) -->
            ${
              topic
                ? `
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Status
                </label>
                <div class="grid grid-cols-3 gap-2">
                  ${['Not Started', 'In Progress', 'Done']
                    .map(
                      (s) => `
                    <button
                      type="button"
                      data-status="${s}"
                      class="modal-status-btn py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                        status === s
                          ? 'bg-white text-black font-semibold border-white'
                          : 'bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }"
                    >
                      ${s}
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Notes -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Lab Record Notes / Viva Points
              </label>
              <textarea
                id="modal-lab-notes"
                rows="2"
                placeholder="Key viva questions, edge cases, error fixes or expected output..."
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              >${notes}</textarea>
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                id="modal-lab-cancel-btn"
                class="px-4 py-2 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded hover:border-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
              >
                ${topic ? 'Save Changes' : 'Add Lab Program'}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelector('#modal-lab-close')?.addEventListener('click', close);
    modalContainer.querySelector('#modal-lab-cancel-btn')?.addEventListener('click', close);

    // Lab select buttons
    modalContainer.querySelectorAll('.modal-lab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        lab = btn.getAttribute('data-lab');
        if (!toolOrLanguage || toolOrLanguage.includes('Kotlin') || toolOrLanguage.includes('Python')) {
          toolOrLanguage = lab.includes('MAD') ? 'Kotlin / Android Studio' : 'Python / Pandas';
        }
        render();
      });
    });

    // Priority buttons
    modalContainer.querySelectorAll('.modal-prio-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        priority = btn.getAttribute('data-prio');
        render();
      });
    });

    // Status buttons
    modalContainer.querySelectorAll('.modal-status-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        status = btn.getAttribute('data-status');
        render();
      });
    });

    // Form submit
    modalContainer.querySelector('#modal-lab-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = modalContainer.querySelector('#modal-lab-name')?.value.trim();
      if (!nameVal) {
        error = 'Topic or program name is required';
        render();
        return;
      }

      const payload = {
        lab,
        name: nameVal,
        experimentNumber: modalContainer.querySelector('#modal-lab-expnum')?.value.trim() || undefined,
        toolOrLanguage: modalContainer.querySelector('#modal-lab-tool')?.value.trim() || undefined,
        priority,
        prepType: modalContainer.querySelector('#modal-lab-preptype')?.value || prepType,
        estimatedDuration: modalContainer.querySelector('#modal-lab-duration')?.value.trim() || undefined,
        status,
        notes: modalContainer.querySelector('#modal-lab-notes')?.value.trim() || undefined,
      };

      if (topic) {
        actions.updateLabTopic(topic.id, payload);
      } else {
        actions.addLabTopic(payload);
      }
      close();
    });
  };

  render();
}

/**
 * 10:00 PM Night PYQ Analysis Modal
 */
export function openNightPYQModal(modalContainer, actions) {
  const tomorrowStr = getTomorrowKolkata();
  let selectedSubject = 'Data Science and Machine Learning';
  let draftTopics = [
    {
      name: '',
      pyqRef: 'Repeated PYQ (2+ times)',
      priority: 'High',
      taskType: 'Prepare Notes',
    },
  ];

  const render = () => {
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs overflow-y-auto">
        <div class="relative w-full max-w-2xl bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl my-8">
          <button
            id="modal-night-close"
            aria-label="Close"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ${icon('x', 'w-5 h-5')}
          </button>

          <div class="flex items-center gap-2 mb-2">
            ${icon('moon', 'w-5 h-5 text-white')}
            <h3 class="text-base font-semibold uppercase tracking-wider text-white">
              10:00–10:30 PM Night PYQ Analysis Mode
            </h3>
          </div>
          <p class="text-xs text-neutral-400 mb-6 leading-relaxed">
            Inspect university previous-year question papers for tomorrow's target subject.
            List the highest-yield recurring questions and prepare tomorrow's note-making plan.
          </p>

          <div class="space-y-4">
            <!-- Target Subject Selector -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Target Subject for Tomorrow (${tomorrowStr})
              </label>
              <select
                id="modal-night-subject"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 font-sans"
              >
                ${THEORY_SUBJECTS.map(
                  (s) => `<option value="${s}" ${selectedSubject === s ? 'selected' : ''}>${s}</option>`
                ).join('')}
              </select>
            </div>

            <!-- Draft Topic Rows -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-wider font-mono text-neutral-400">
                  Identified PYQ Topics
                </span>
                <button
                  type="button"
                  id="modal-night-add-row"
                  class="flex items-center gap-1 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  ${icon('plus', 'w-3.5 h-3.5')}
                  <span>Add Row</span>
                </button>
              </div>

              ${draftTopics
                .map(
                  (draft, idx) => `
                <div class="p-3 bg-[#0B0B0B] border border-neutral-800/80 rounded space-y-2.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[11px] font-mono text-neutral-500 uppercase">
                      Topic #${idx + 1}
                    </span>
                    ${
                      draftTopics.length > 1
                        ? `
                      <button
                        type="button"
                        data-remove-row="${idx}"
                        class="modal-night-remove-row text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer"
                        title="Remove row"
                      >
                        ${icon('trash2', 'w-3.5 h-3.5')}
                      </button>
                    `
                        : ''
                    }
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      data-draft-name="${idx}"
                      value="${draft.name}"
                      placeholder="Topic / Question name"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                    <input
                      type="text"
                      data-draft-pyq="${idx}"
                      value="${draft.pyqRef}"
                      placeholder="PYQ reference e.g., 2023 Dec 7-mark"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] font-mono text-neutral-500 uppercase mr-1">
                        Priority:
                      </span>
                      ${['High', 'Medium', 'Low']
                        .map(
                          (p) => `
                        <button
                          type="button"
                          data-row-prio="${idx}"
                          data-val="${p}"
                          class="modal-draft-prio-btn text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                            draft.priority === p
                              ? 'bg-white text-black font-semibold border-white'
                              : 'bg-[#151515] text-neutral-400 border-neutral-800'
                          }"
                        >
                          ${p}
                        </button>
                      `
                        )
                        .join('')}
                    </div>

                    <select
                      data-row-task="${idx}"
                      class="modal-draft-task-select bg-[#151515] border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-500 font-mono"
                    >
                      <option value="Prepare Notes" ${draft.taskType === 'Prepare Notes' ? 'selected' : ''}>Prepare Notes</option>
                      <option value="Learn" ${draft.taskType === 'Learn' ? 'selected' : ''}>Learn</option>
                      <option value="Practise Questions" ${draft.taskType === 'Practise Questions' ? 'selected' : ''}>Practise Questions</option>
                      <option value="Revise" ${draft.taskType === 'Revise' ? 'selected' : ''}>Revise</option>
                      <option value="Mock Test" ${draft.taskType === 'Mock Test' ? 'selected' : ''}>Mock Test</option>
                    </select>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-neutral-800">
              <button
                type="button"
                id="modal-night-add-row-bottom"
                class="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
              >
                + Add another question
              </button>
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  id="modal-night-cancel-btn"
                  class="px-4 py-2 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="modal-night-commit-btn"
                  class="flex items-center gap-2 px-5 py-2 text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                >
                  <span>Commit to Tomorrow's Plan</span>
                  ${icon('arrowRight', 'w-3.5 h-3.5')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelector('#modal-night-close')?.addEventListener('click', close);
    modalContainer.querySelector('#modal-night-cancel-btn')?.addEventListener('click', close);

    modalContainer.querySelector('#modal-night-subject')?.addEventListener('change', (e) => {
      selectedSubject = e.target.value;
    });

    // Inputs sync
    modalContainer.querySelectorAll('input[data-draft-name]').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = Number(input.getAttribute('data-draft-name'));
        draftTopics[idx].name = e.target.value;
      });
    });

    modalContainer.querySelectorAll('input[data-draft-pyq]').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = Number(input.getAttribute('data-draft-pyq'));
        draftTopics[idx].pyqRef = e.target.value;
      });
    });

    modalContainer.querySelectorAll('.modal-draft-prio-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-row-prio'));
        draftTopics[idx].priority = btn.getAttribute('data-val');
        render();
      });
    });

    modalContainer.querySelectorAll('.modal-draft-task-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const idx = Number(sel.getAttribute('data-row-task'));
        draftTopics[idx].taskType = e.target.value;
      });
    });

    // Add row
    const addRow = () => {
      draftTopics.push({
        name: '',
        pyqRef: '',
        priority: 'High',
        taskType: 'Prepare Notes',
      });
      render();
    };
    modalContainer.querySelector('#modal-night-add-row')?.addEventListener('click', addRow);
    modalContainer.querySelector('#modal-night-add-row-bottom')?.addEventListener('click', addRow);

    // Remove row
    modalContainer.querySelectorAll('.modal-night-remove-row').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove-row'));
        draftTopics = draftTopics.filter((_, i) => i !== idx);
        render();
      });
    });

    // Commit
    modalContainer.querySelector('#modal-night-commit-btn')?.addEventListener('click', () => {
      const valid = draftTopics.filter((t) => t.name.trim().length > 0);
      if (valid.length === 0) {
        close();
        return;
      }

      valid.forEach((t) => {
        actions.addTheoryTopic({
          name: t.name.trim(),
          subject: selectedSubject,
          pyqReference: t.pyqRef.trim() || undefined,
          priority: t.priority,
          taskType: t.taskType,
          targetDate: tomorrowStr,
          status: 'Not Started',
          estimatedDuration: '45m',
        });
      });

      close();
      actions.setActiveTab('theory');
    });
  };

  render();
}
