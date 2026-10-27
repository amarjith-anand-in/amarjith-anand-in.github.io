import { icon } from '../icons.js';
import {
  formatDateFull,
  formatDateCompact,
  getTodayKolkata,
  addDaysToDateStr,
} from '../utils/dateUtils.js';
import { getMonthDaysMatrix, resolveDateDetails } from '../utils/calendarUtils.js';

let currentYear = 2026;
let currentMonthIndex = 10; // 0-indexed: 10 = November 2026 (Exam month)
let selectedDayForModal = null;

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function renderCalendarView(container, state, actions) {
  const { selectedDate, gamification } = state;
  const todayStr = getTodayKolkata();

  // If user selected a date in another month and we haven't touched nav, sync
  if (!selectedDayForModal && selectedDate) {
    const [selY, selM] = selectedDate.split('-').map(Number);
    if (!isNaN(selY) && !isNaN(selM) && (currentYear !== selY || currentMonthIndex !== selM - 1)) {
      currentYear = selY;
      currentMonthIndex = selM - 1;
    }
  }

  const weeks = getMonthDaysMatrix(currentYear, currentMonthIndex);

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- Top Calendar Banner & Navigation Controls -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${icon('calendar', 'w-3.5 h-3.5 text-neutral-300')}
              <span>Academic Exam & Prep Schedule Matrix</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>${MONTH_NAMES[currentMonthIndex]} ${currentYear}</span>
              ${
                currentMonthIndex === 10 && currentYear === 2026
                  ? `<span class="px-2 py-0.5 text-xs font-mono font-medium bg-rose-950/80 text-rose-300 border border-rose-800 rounded">Exam Month</span>`
                  : ''
              }
            </h1>
            <p class="text-xs text-neutral-400 mt-1 max-w-2xl">
              Visual roadmap mapping all theory & lab exams alongside dynamic preparation windows and daily planned activities. Click any day to view or edit tasks.
            </p>
          </div>

          <!-- Controls: Month Navigation & Quick Jump -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Quick Jumps -->
            <div class="flex items-center gap-1 bg-[#0B0B0B] p-1 border border-neutral-800 rounded">
              <button
                id="cal-jump-oct"
                class="px-2 py-1 text-[11px] font-mono rounded cursor-pointer transition-colors ${
                  currentMonthIndex === 9 && currentYear === 2026
                    ? 'bg-neutral-800 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }"
              >
                Oct '26 (Start)
              </button>
              <button
                id="cal-jump-nov"
                class="px-2 py-1 text-[11px] font-mono rounded cursor-pointer transition-colors ${
                  currentMonthIndex === 10 && currentYear === 2026
                    ? 'bg-neutral-800 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }"
              >
                Nov '26 (Exams)
              </button>
              <button
                id="cal-jump-dec"
                class="px-2 py-1 text-[11px] font-mono rounded cursor-pointer transition-colors ${
                  currentMonthIndex === 11 && currentYear === 2026
                    ? 'bg-neutral-800 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }"
              >
                Dec '26 (Finals)
              </button>
            </div>

            <!-- Month Prev / Today / Next -->
            <div class="flex items-center gap-1">
              <button
                id="cal-prev-month-btn"
                class="p-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded text-neutral-300 hover:text-white cursor-pointer transition-colors"
                title="Previous Month"
              >
                ${icon('chevronLeft', 'w-4 h-4')}
              </button>
              <button
                id="cal-today-btn"
                class="px-3 py-1.5 text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded text-white cursor-pointer transition-colors"
              >
                Today
              </button>
              <button
                id="cal-next-month-btn"
                class="p-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded text-neutral-300 hover:text-white cursor-pointer transition-colors"
                title="Next Month"
              >
                ${icon('chevronRight', 'w-4 h-4')}
              </button>
            </div>
          </div>
        </div>

        <!-- Legend Ribbon -->
        <div class="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span class="text-neutral-500 uppercase tracking-wider text-[10px] mr-1">Legend:</span>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800 text-rose-300">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span> Theory Exam
          </span>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-950/70 border border-purple-800 text-purple-300">
            <span class="w-2 h-2 rounded-full bg-purple-500"></span> Lab Exam
          </span>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/80 text-amber-300">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span> 2-Day Lab Sprint
          </span>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/80 text-blue-300">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span> Theory Intensive (Phase 2)
          </span>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300">
            <span class="w-2 h-2 rounded-full bg-neutral-400"></span> Balanced Pre-Lab (Phase 1)
          </span>
        </div>
      </div>

      <!-- Calendar Grid Table -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg overflow-hidden shadow-lg">
        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 border-b border-neutral-800 bg-[#121212] text-center">
          ${WEEK_DAYS.map(
            (day) => `
            <div class="py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
              ${day}
            </div>
          `
          ).join('')}
        </div>

        <!-- Days Grid -->
        <div class="divide-y divide-neutral-800/60">
          ${weeks
            .map((week) => {
              return `
              <div class="grid grid-cols-7 divide-x divide-neutral-800/60 min-h-[105px] sm:min-h-[125px]">
                ${week
                  .map((day) => {
                    const details = resolveDateDetails(day.dateStr, state);
                    const isSelected = day.dateStr === state.selectedDate;

                    let bgTint = day.isCurrentMonth ? 'bg-[#151515]' : 'bg-[#0E0E0E]/80 opacity-60';
                    if (details.prepWindow && details.prepWindow.bgDayHighlight && day.isCurrentMonth) {
                      bgTint = details.prepWindow.bgDayHighlight;
                    }

                    return `
                      <div
                        data-date="${day.dateStr}"
                        class="calendar-day-cell relative p-1.5 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all hover:bg-neutral-800/60 ${bgTint} ${
                      isSelected
                        ? 'ring-2 ring-white z-10'
                        : details.isToday
                        ? 'ring-1 ring-neutral-400'
                        : ''
                    }"
                      >
                        <!-- Top Row: Day Number + Badges -->
                        <div class="flex items-center justify-between gap-1 mb-1">
                          <span class="text-xs sm:text-sm font-mono font-bold ${
                            details.isToday
                              ? 'inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-black'
                              : day.isCurrentMonth
                              ? 'text-white'
                              : 'text-neutral-500'
                          }">
                            ${day.dayNumber}
                          </span>

                          <div class="flex items-center gap-1">
                            ${
                              details.isToday
                                ? `<span class="hidden sm:inline-block px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-white/20 text-white uppercase">Today</span>`
                                : ''
                            }
                            ${
                              details.isFlawless
                                ? `<span title="Flawless Day completed!">${icon('star', 'w-3 h-3 text-amber-400 fill-amber-400')}</span>`
                                : ''
                            }
                          </div>
                        </div>

                        <!-- Middle Content: Exam and Schedule Window Indicators -->
                        <div class="space-y-1 my-auto overflow-hidden">
                          <!-- Theory Exams -->
                          ${details.theoryExams
                            .map(
                              (exam) => `
                            <div class="p-1 rounded text-[10px] sm:text-[11px] font-mono font-semibold bg-rose-950/90 text-rose-200 border border-rose-700 truncate shadow-sm flex items-center gap-1">
                              ${icon('fileSpreadsheet', 'w-3 h-3 text-rose-400 shrink-0')}
                              <span class="truncate">EXAM: ${exam.code}</span>
                            </div>
                          `
                            )
                            .join('')}

                          <!-- Lab Exams -->
                          ${details.labExams
                            .map(
                              (exam) => `
                            <div class="p-1 rounded text-[10px] sm:text-[11px] font-mono font-semibold bg-purple-950/90 text-purple-200 border border-purple-700 truncate shadow-sm flex items-center gap-1">
                              ${icon('flaskConical', 'w-3 h-3 text-purple-400 shrink-0')}
                              <span class="truncate">LAB: ${exam.code}</span>
                            </div>
                          `
                            )
                            .join('')}

                          <!-- Prep Window Indicator if not an exam day -->
                          ${
                            details.theoryExams.length === 0 &&
                            details.labExams.length === 0 &&
                            details.prepWindow &&
                            details.prepWindow.type !== 'pre-leave' &&
                            day.isCurrentMonth
                              ? `
                            <div class="text-[9px] sm:text-[10px] font-mono px-1 py-0.5 rounded truncate border ${details.prepWindow.pillClass}">
                              ${details.prepWindow.label}
                            </div>
                          `
                              : ''
                          }

                          <!-- Planned Topics Pill -->
                          ${
                            details.theoryTopics.length > 0 || details.labTopics.length > 0
                              ? `
                            <div class="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-neutral-300">
                              <span class="w-1.5 h-1.5 rounded-full ${
                                details.theoryDoneCount + details.labDoneCount ===
                                details.theoryTopics.length + details.labTopics.length
                                  ? 'bg-emerald-400'
                                  : 'bg-amber-400'
                              }"></span>
                              <span class="truncate">
                                ${details.theoryTopics.length + details.labTopics.length} Tasks
                                (${details.theoryDoneCount + details.labDoneCount} done)
                              </span>
                            </div>
                          `
                              : ''
                          }
                        </div>

                        <!-- Bottom Progress Dots -->
                        <div class="pt-1 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                          ${
                            details.scheduleCompletedCount > 0
                              ? `<span class="text-emerald-400 font-semibold">${details.scheduleCompletedCount} blocks</span>`
                              : `<span></span>`
                          }
                          <span class="text-neutral-600 hidden sm:inline">&rsaquo;</span>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Interactive Day Details Drawer / Modal Anchor -->
      <div id="calendar-day-modal-container"></div>
    </div>
  `;

  // Attach Month navigation handlers
  const prevBtn = container.querySelector('#cal-prev-month-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentMonthIndex === 0) {
        currentMonthIndex = 11;
        currentYear--;
      } else {
        currentMonthIndex--;
      }
      renderCalendarView(container, state, actions);
    });
  }

  const nextBtn = container.querySelector('#cal-next-month-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentMonthIndex === 11) {
        currentMonthIndex = 0;
        currentYear++;
      } else {
        currentMonthIndex++;
      }
      renderCalendarView(container, state, actions);
    });
  }

  const todayBtn = container.querySelector('#cal-today-btn');
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      const [tY, tM] = todayStr.split('-').map(Number);
      currentYear = tY;
      currentMonthIndex = tM - 1;
      actions.setSelectedDate(todayStr);
      renderCalendarView(container, state, actions);
      openCalendarDayModal(todayStr, state, actions);
    });
  }

  const jumpOct = container.querySelector('#cal-jump-oct');
  if (jumpOct) {
    jumpOct.addEventListener('click', () => {
      currentYear = 2026;
      currentMonthIndex = 9;
      renderCalendarView(container, state, actions);
    });
  }

  const jumpNov = container.querySelector('#cal-jump-nov');
  if (jumpNov) {
    jumpNov.addEventListener('click', () => {
      currentYear = 2026;
      currentMonthIndex = 10;
      renderCalendarView(container, state, actions);
    });
  }

  const jumpDec = container.querySelector('#cal-jump-dec');
  if (jumpDec) {
    jumpDec.addEventListener('click', () => {
      currentYear = 2026;
      currentMonthIndex = 11;
      renderCalendarView(container, state, actions);
    });
  }

  // Day Cell click listener
  container.querySelectorAll('.calendar-day-cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      const date = cell.getAttribute('data-date');
      if (date) {
        actions.setSelectedDate(date);
        openCalendarDayModal(date, state, actions);
      }
    });
  });

  // Re-open active modal if user toggled something inside modal
  if (selectedDayForModal) {
    openCalendarDayModal(selectedDayForModal, state, actions);
  }
}

/**
 * Opens Day Summary Modal showing all activities, exams, scheduled topics, and daily timetable
 */
export function openCalendarDayModal(dateStr, state, actions) {
  selectedDayForModal = dateStr;
  const modalContainer = document.getElementById('calendar-day-modal-container');
  if (!modalContainer) return;

  const details = resolveDateDetails(dateStr, state);
  const { activeSchedule, dailyCompletions } = state;
  const todayStr = getTodayKolkata();
  const completedIds = dailyCompletions[dateStr]?.completedScheduleIds || [];

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#151515] border border-neutral-800 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="p-5 border-b border-neutral-800 flex items-start justify-between gap-4 bg-[#121212] rounded-t-lg">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
              ${icon('calendar', 'w-3.5 h-3.5 text-neutral-300')}
              <span>${formatDateFull(dateStr)}</span>
              ${
                dateStr === todayStr
                  ? `<span class="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">TODAY</span>`
                  : ''
              }
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Day Overview & Activities</span>
            </h2>
          </div>
          <button
            id="close-cal-day-modal"
            class="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            ${icon('x', 'w-5 h-5')}
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          <!-- 1. Active Prep Phase Window on this Date -->
          ${
            details.prepWindow
              ? `
            <div class="p-4 rounded-lg border ${details.prepWindow.colorClass}">
              <div class="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                ${icon('zap', 'w-3.5 h-3.5')}
                <span>${details.prepWindow.label}</span>
              </div>
              <p class="text-xs leading-relaxed opacity-90">
                ${details.prepWindow.description}
              </p>
            </div>
          `
              : ''
          }

          <!-- 2. Exams on this date -->
          ${
            details.theoryExams.length > 0 || details.labExams.length > 0
              ? `
            <div class="space-y-2">
              <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                ${icon('award', 'w-3.5 h-3.5 text-amber-400')}
                <span>Examinations Scheduled Today</span>
              </h3>
              ${details.theoryExams
                .map(
                  (exam) => `
                <div class="p-3 bg-rose-950/40 border border-rose-800/80 rounded-md flex items-center justify-between gap-3">
                  <div>
                    <span class="text-xs font-mono font-bold text-rose-300 uppercase block">${exam.code} Theory Examination</span>
                    <span class="text-xs text-neutral-300">${exam.name}</span>
                  </div>
                  <span class="px-2 py-0.5 text-[11px] font-mono rounded bg-rose-900 text-rose-100 font-bold">
                    Official Exam
                  </span>
                </div>
              `
                )
                .join('')}
              ${details.labExams
                .map(
                  (exam) => `
                <div class="p-3 bg-purple-950/40 border border-purple-800/80 rounded-md flex items-center justify-between gap-3">
                  <div>
                    <span class="text-xs font-mono font-bold text-purple-300 uppercase block">${exam.code} Lab Examination</span>
                    <span class="text-xs text-neutral-300">${exam.name}</span>
                  </div>
                  <span class="px-2 py-0.5 text-[11px] font-mono rounded bg-purple-900 text-purple-100 font-bold">
                    Lab Practical & Viva
                  </span>
                </div>
              `
                )
                .join('')}
            </div>
          `
              : ''
          }

          <!-- 3. Theory Topics Scheduled for this Date -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                ${icon('bookOpen', 'w-3.5 h-3.5 text-neutral-300')}
                <span>Theory Topics Due (${details.theoryTopics.length})</span>
              </h3>
              <button
                id="cal-modal-add-theory"
                class="text-xs font-mono text-neutral-300 hover:text-white underline cursor-pointer"
              >
                + Add Topic
              </button>
            </div>

            ${
              details.theoryTopics.length === 0
                ? `<div class="p-3 bg-[#0B0B0B] border border-neutral-800/80 rounded text-xs text-neutral-500 font-mono">No theory topics scheduled for this date.</div>`
                : `
              <div class="space-y-2">
                ${details.theoryTopics
                  .map((topic) => {
                    const isDone = topic.status === 'Done';
                    return `
                    <div class="p-3 bg-[#0B0B0B] border border-neutral-800 rounded-md flex items-center justify-between gap-3">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <button
                          data-theory-id="${topic.id}"
                          data-next-status="${isDone ? 'Pending' : 'Done'}"
                          class="cal-toggle-theory-btn text-neutral-400 hover:text-white cursor-pointer shrink-0"
                          title="Toggle Completion (+50 XP)"
                        >
                          ${
                            isDone
                              ? icon('checkSquare', 'w-4 h-4 text-emerald-400')
                              : icon('square', 'w-4 h-4')
                          }
                        </button>
                        <div class="min-w-0">
                          <p class="text-xs font-medium text-white truncate ${
                            isDone ? 'line-through text-neutral-500' : ''
                          }">
                            ${topic.title}
                          </p>
                          <p class="text-[11px] font-mono text-neutral-500">
                            ${topic.subject} &bull; ${topic.priority} Priority &bull; ${
                      topic.estimatedHours || 1
                    }h
                          </p>
                        </div>
                      </div>
                      ${
                        isDone
                          ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800">Done (+XP)</span>`
                          : `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">Pending</span>`
                      }
                    </div>
                  `;
                  })
                  .join('')}
              </div>
            `
            }
          </div>

          <!-- 4. Lab Topics Scheduled for this Date -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                ${icon('flaskConical', 'w-3.5 h-3.5 text-neutral-300')}
                <span>Lab Topics Due (${details.labTopics.length})</span>
              </h3>
              <button
                id="cal-modal-add-lab"
                class="text-xs font-mono text-neutral-300 hover:text-white underline cursor-pointer"
              >
                + Add Lab Task
              </button>
            </div>

            ${
              details.labTopics.length === 0
                ? `<div class="p-3 bg-[#0B0B0B] border border-neutral-800/80 rounded text-xs text-neutral-500 font-mono">No lab topics scheduled for this date.</div>`
                : `
              <div class="space-y-2">
                ${details.labTopics
                  .map((lab) => {
                    const isDone = lab.status === 'Done';
                    return `
                    <div class="p-3 bg-[#0B0B0B] border border-neutral-800 rounded-md flex items-center justify-between gap-3">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <button
                          data-lab-id="${lab.id}"
                          data-next-status="${isDone ? 'Pending' : 'Done'}"
                          class="cal-toggle-lab-btn text-neutral-400 hover:text-white cursor-pointer shrink-0"
                          title="Toggle Completion (+40 XP)"
                        >
                          ${
                            isDone
                              ? icon('checkSquare', 'w-4 h-4 text-emerald-400')
                              : icon('square', 'w-4 h-4')
                          }
                        </button>
                        <div class="min-w-0">
                          <p class="text-xs font-medium text-white truncate ${
                            isDone ? 'line-through text-neutral-500' : ''
                          }">
                            ${lab.title}
                          </p>
                          <p class="text-[11px] font-mono text-neutral-500">
                            ${lab.lab} &bull; ${lab.priority} Priority
                          </p>
                        </div>
                      </div>
                      ${
                        isDone
                          ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800">Done (+XP)</span>`
                          : `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">Pending</span>`
                      }
                    </div>
                  `;
                  })
                  .join('')}
              </div>
            `
            }
          </div>

          <!-- 5. Daily Time-Block Timetable Checklist -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                ${icon('clock', 'w-3.5 h-3.5 text-neutral-300')}
                <span>Planned Time-Blocks (${completedIds.length}/${activeSchedule.length} Done)</span>
              </h3>
              <span class="text-xs font-mono text-amber-400">+15 XP per block</span>
            </div>

            <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              ${activeSchedule
                .map((item) => {
                  const isChecked = completedIds.includes(item.id);
                  return `
                  <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <button
                        data-schedule-id="${item.id}"
                        class="cal-toggle-schedule-btn text-neutral-400 hover:text-white cursor-pointer shrink-0"
                      >
                        ${
                          isChecked
                            ? icon('checkSquare', 'w-4 h-4 text-emerald-400')
                            : icon('square', 'w-4 h-4')
                        }
                      </button>
                      <div class="min-w-0">
                        <span class="font-mono text-[11px] text-neutral-400 font-semibold mr-1.5">${
                          item.timeRange
                        }</span>
                        <span class="${isChecked ? 'line-through text-neutral-500' : 'text-neutral-200'}">${
                    item.activity
                  }</span>
                      </div>
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="p-4 border-t border-neutral-800 bg-[#121212] flex items-center justify-between gap-3 rounded-b-lg">
          <button
            id="cal-jump-dashboard-btn"
            class="px-3 py-2 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            ${icon('layoutDashboard', 'w-3.5 h-3.5 text-neutral-300')}
            <span>Open in Dashboard</span>
          </button>

          <button
            id="close-cal-day-modal-btn"
            class="px-4 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach modal listeners
  const closeBtn = modalContainer.querySelector('#close-cal-day-modal');
  const closeBtnBottom = modalContainer.querySelector('#close-cal-day-modal-btn');

  const closeModal = () => {
    selectedDayForModal = null;
    modalContainer.innerHTML = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtnBottom) closeBtnBottom.addEventListener('click', closeModal);

  // Jump to Dashboard with this date active
  const jumpDashBtn = modalContainer.querySelector('#cal-jump-dashboard-btn');
  if (jumpDashBtn) {
    jumpDashBtn.addEventListener('click', () => {
      actions.setSelectedDate(dateStr);
      actions.setActiveTab('dashboard');
      closeModal();
    });
  }

  // Add theory topic for this date
  const addTheoryBtn = modalContainer.querySelector('#cal-modal-add-theory');
  if (addTheoryBtn) {
    addTheoryBtn.addEventListener('click', () => {
      actions.openAddTheoryModal(null, dateStr);
    });
  }

  // Add lab topic for this date
  const addLabBtn = modalContainer.querySelector('#cal-modal-add-lab');
  if (addLabBtn) {
    addLabBtn.addEventListener('click', () => {
      actions.openAddLabModal(null);
    });
  }

  // Toggle theory topic checkboxes
  modalContainer.querySelectorAll('.cal-toggle-theory-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-theory-id');
      const nextStatus = btn.getAttribute('data-next-status');
      if (id && nextStatus) {
        actions.updateTheoryTopic(id, { status: nextStatus });
      }
    });
  });

  // Toggle lab topic checkboxes
  modalContainer.querySelectorAll('.cal-toggle-lab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-lab-id');
      const nextStatus = btn.getAttribute('data-next-status');
      if (id && nextStatus) {
        actions.updateLabTopic(id, { status: nextStatus });
      }
    });
  });

  // Toggle schedule item checkboxes
  modalContainer.querySelectorAll('.cal-toggle-schedule-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-schedule-id');
      if (itemId) {
        actions.toggleScheduleItem(dateStr, itemId);
      }
    });
  });
}
