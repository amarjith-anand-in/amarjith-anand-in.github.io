import { icon } from '../icons.js';
import { getTodayKolkata } from '../utils/dateUtils.js';

const DEFAULT_SUBJECTS = [
  'Data Science and Machine Learning',
  'Design and Analysis of Algorithms (DAA)',
  'Operations Research (OR)',
  'Deep Learning',
  'Mobile Application Development (MAD) Lab',
  'Data Science Lab',
  'General Study / Practice',
];

const TIME_SLOT_PRESETS = [
  '06:00–07:00 AM (Morning Routine)',
  '07:00–09:00 AM (Deep Study / PYQs)',
  '10:00 AM–12:00 PM (Theory Core)',
  '01:30–03:00 PM (Lab / Code Practice)',
  '03:30–05:30 PM (Algorithms / Math)',
  '06:30–08:30 PM (Second Study Block)',
  '09:30–10:30 PM (Night PYQ & Review)',
  'Flexible / All Day',
];

export function openTaskModal(container, task = null, defaultDate = null, actions) {
  const isEditing = Boolean(task && task.id);
  const initialDate = task?.date || defaultDate || getTodayKolkata();
  const initialSubject = task?.subject || DEFAULT_SUBJECTS[0];
  const initialTimeSlot = task?.timeSlot || TIME_SLOT_PRESETS[1];
  const initialCategory = task?.category || 'theory';
  const initialPriority = task?.priority || 'High';
  const initialTitle = task?.title || '';
  const initialNotes = task?.notes || '';

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        class="relative w-full max-w-lg bg-[#141414] border border-neutral-800 rounded-xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button
          id="task-modal-close"
          aria-label="Close dialog"
          class="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          ${icon('x', 'w-5 h-5')}
        </button>

        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
            ${icon(isEditing ? 'edit' : 'plus', 'w-5 h-5 text-amber-300')}
          </div>
          <div>
            <h2 class="text-lg font-bold text-white tracking-tight">
              ${isEditing ? 'Edit Study Task' : 'Add Custom Study Task'}
            </h2>
            <p class="text-xs text-neutral-400 mt-0.5">
              Customize your study schedule without rigid presets. Earn XP on completion!
            </p>
          </div>
        </div>

        <form id="task-modal-form" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
              Task Title <span class="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="task-input-title"
              required
              value="${escapeHtml(initialTitle)}"
              placeholder="e.g. Master Dynamic Programming or Complete MAD Lab Ex 3"
              class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
            />
          </div>

          <!-- Subject -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider">
                Subject / Topic Domain
              </label>
              <button
                type="button"
                id="task-custom-subject-btn"
                class="text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                + Custom Subject
              </button>
            </div>
            <select
              id="task-select-subject"
              class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              ${DEFAULT_SUBJECTS.map(
                (subj) => `
                <option value="${escapeHtml(subj)}" ${subj === initialSubject ? 'selected' : ''}>
                  ${escapeHtml(subj)}
                </option>
              `
              ).join('')}
              ${
                !DEFAULT_SUBJECTS.includes(initialSubject)
                  ? `<option value="${escapeHtml(initialSubject)}" selected>${escapeHtml(initialSubject)}</option>`
                  : ''
              }
            </select>
            <input
              type="text"
              id="task-input-custom-subject"
              placeholder="Or type custom subject name..."
              class="hidden mt-2 w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <!-- Grid: Date & Time Slot -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                Target Date
              </label>
              <input
                type="date"
                id="task-input-date"
                required
                value="${initialDate}"
                class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
              />
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                Time Slot
              </label>
              <select
                id="task-select-timeslot"
                class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                ${TIME_SLOT_PRESETS.map(
                  (slot) => `
                  <option value="${escapeHtml(slot)}" ${slot === initialTimeSlot ? 'selected' : ''}>
                    ${escapeHtml(slot)}
                  </option>
                `
                ).join('')}
                ${
                  !TIME_SLOT_PRESETS.includes(initialTimeSlot)
                    ? `<option value="${escapeHtml(initialTimeSlot)}" selected>${escapeHtml(initialTimeSlot)}</option>`
                    : ''
                }
              </select>
            </div>
          </div>

          <!-- Grid: Category & Priority -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                Task Category
              </label>
              <select
                id="task-select-category"
                class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="theory" ${initialCategory === 'theory' ? 'selected' : ''}>Theory Study</option>
                <option value="lab" ${initialCategory === 'lab' ? 'selected' : ''}>Lab Practical / Coding</option>
                <option value="pyq" ${initialCategory === 'pyq' ? 'selected' : ''}>Previous Year Questions (PYQs)</option>
                <option value="revision" ${initialCategory === 'revision' ? 'selected' : ''}>Revision & Active Recall</option>
                <option value="mock" ${initialCategory === 'mock' ? 'selected' : ''}>Mock Exam / Self Test</option>
                <option value="break" ${initialCategory === 'break' ? 'selected' : ''}>Break / Physical Routine</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                id="task-select-priority"
                class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="High" ${initialPriority === 'High' ? 'selected' : ''}>🔴 High Priority</option>
                <option value="Medium" ${initialPriority === 'Medium' ? 'selected' : ''}>🟡 Medium Priority</option>
                <option value="Low" ${initialPriority === 'Low' ? 'selected' : ''}>🟢 Low Priority</option>
              </select>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
              Notes / Textbook Reference / Checklist (Optional)
            </label>
            <textarea
              id="task-input-notes"
              rows="2"
              placeholder="e.g. Focus on Question 3 & 4 from 2024 paper; review time complexity proofs"
              class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
            >${escapeHtml(initialNotes)}</textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-2 border-t border-neutral-800">
            ${
              isEditing
                ? `
              <button
                type="button"
                id="task-delete-btn"
                class="px-3 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                ${icon('trash2', 'w-3.5 h-3.5')}
                <span>Delete</span>
              </button>
            `
                : '<div></div>'
            }

            <div class="flex items-center gap-2">
              <button
                type="button"
                id="task-cancel-btn"
                class="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                ${icon('checkCircle2', 'w-3.5 h-3.5')}
                <span>${isEditing ? 'Save Changes' : 'Create Task'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelector('#task-modal-close')?.addEventListener('click', () => {
    container.innerHTML = '';
  });

  container.querySelector('#task-cancel-btn')?.addEventListener('click', () => {
    container.innerHTML = '';
  });

  const customSubjectBtn = container.querySelector('#task-custom-subject-btn');
  const customSubjectInput = container.querySelector('#task-input-custom-subject');
  const subjectSelect = container.querySelector('#task-select-subject');

  customSubjectBtn?.addEventListener('click', () => {
    if (customSubjectInput.classList.contains('hidden')) {
      customSubjectInput.classList.remove('hidden');
      customSubjectInput.focus();
      customSubjectBtn.textContent = 'Use Preset List';
    } else {
      customSubjectInput.classList.add('hidden');
      customSubjectBtn.textContent = '+ Custom Subject';
    }
  });

  if (isEditing) {
    container.querySelector('#task-delete-btn')?.addEventListener('click', () => {
      actions.showConfirmDialog({
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"?`,
        confirmLabel: 'Delete',
        isDestructive: true,
        onConfirm: () => {
          actions.deleteCustomTask(task.id);
          container.innerHTML = '';
        },
      });
    });
  }

  container.querySelector('#task-modal-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = container.querySelector('#task-input-title')?.value.trim();
    if (!title) return;

    let subject = subjectSelect?.value || DEFAULT_SUBJECTS[0];
    if (customSubjectInput && !customSubjectInput.classList.contains('hidden') && customSubjectInput.value.trim()) {
      subject = customSubjectInput.value.trim();
    }

    const date = container.querySelector('#task-input-date')?.value;
    const timeSlot = container.querySelector('#task-select-timeslot')?.value;
    const category = container.querySelector('#task-select-category')?.value;
    const priority = container.querySelector('#task-select-priority')?.value;
    const notes = container.querySelector('#task-input-notes')?.value.trim();

    if (isEditing) {
      actions.updateCustomTask(task.id, {
        title,
        subject,
        date,
        timeSlot,
        category,
        priority,
        notes,
      });
    } else {
      actions.addCustomTask({
        title,
        subject,
        date,
        timeSlot,
        category,
        priority,
        notes,
      });
    }

    container.innerHTML = '';
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
