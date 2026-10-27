import { icon } from '../icons.js';
import {
  formatDateFull,
  formatDateCompact,
  formatExamCountdown,
  getTodayKolkata,
  getTomorrowKolkata,
  isCurrentScheduleItem,
} from '../utils/dateUtils.js';

export function renderDashboardView(container, state, actions) {
  const {
    activePhase,
    activeSchedule,
    selectedDate,
    toggles,
    examDates,
    dailyCompletions,
    dailyScheduleProgress,
    theoryProgress,
    madLabProgress,
    dsLabProgress,
    theoryTopics,
    labTopics,
  } = state;

  const todayStr = getTodayKolkata();
  const tomorrowStr = getTomorrowKolkata();

  const completedIds = dailyCompletions[selectedDate]?.completedScheduleIds || [];
  const tomorrowTopics = theoryTopics.filter((t) => t.targetDate === tomorrowStr);

  const sprintLabTopics =
    activePhase.phase === 'lab-sprint' && activePhase.activeLabName
      ? labTopics
          .filter((l) => l.lab === activePhase.activeLabName && l.status !== 'Done')
          .sort((a, b) => (a.priority === 'High' ? -1 : 1))
      : [];

  container.innerHTML = `
    <div class="space-y-6 pb-20">
      <!-- 1. Header Hero Card -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${icon('calendar', 'w-3.5 h-3.5 text-neutral-300')}
              <span>${formatDateFull(selectedDate)}</span>
              ${
                selectedDate === todayStr
                  ? `<span class="bg-neutral-800 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">TODAY</span>`
                  : ''
              }
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ${activePhase.headline}
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              ${activePhase.description}
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              id="dash-night-pyq-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer"
              title="10:00–10:30 PM Night PYQ Analysis Mode"
            >
              ${icon('sparkles', 'w-3.5 h-3.5 text-neutral-300')}
              <span>Night PYQ Mode</span>
            </button>
            <button
              id="dash-add-tomorrow-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              ${icon('plus', 'w-3.5 h-3.5')}
              <span>+ Tomorrow Topic</span>
            </button>
          </div>
        </div>

        <!-- Urgent Exam Tomorrow Alert if active -->
        ${
          activePhase.isExamTomorrow
            ? `
          <div class="mt-4 p-3.5 bg-neutral-900 border-l-4 border-white border border-neutral-800 rounded flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              ${icon('flame', 'w-5 h-5 text-white animate-pulse')}
              <div>
                <span class="text-xs font-mono font-bold tracking-wider text-white uppercase block">
                  EXAM TOMORROW
                </span>
                <span class="text-xs text-neutral-300">
                  ${activePhase.activeLabName} examination is tomorrow. Finish high-priority programs and final self-test.
                </span>
              </div>
            </div>
            <button
              id="dash-review-lab-btn"
              class="text-xs font-mono underline text-white hover:text-neutral-300 whitespace-nowrap cursor-pointer"
            >
              Review Lab Topics &rarr;
            </button>
          </div>
          `
            : ''
        }

        <!-- Priority Reason Explanation -->
        ${
          activePhase.priorityReason && !activePhase.isExamTomorrow
            ? `
          <div class="mt-4 px-3 py-2 bg-[#0B0B0B] border border-neutral-800/80 rounded text-xs font-mono text-neutral-400 flex items-center gap-2">
            ${icon('zap', 'w-3.5 h-3.5 text-neutral-300 shrink-0')}
            <span>${activePhase.priorityReason}</span>
          </div>
          `
            : ''
        }
      </div>

      <!-- 2. Phase Control Toggles Panel -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div>
            <h2 class="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Exam Phase Controllers
            </h2>
            <p class="text-[11px] text-neutral-500 mt-0.5">
              Two independent toggle switches adapt the daily study schedule automatically.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Toggle A: Lab Exam Dates Announced -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-md">
            <div class="flex items-center justify-between gap-3 mb-2">
              <div>
                <span class="text-xs font-mono uppercase font-semibold text-white block">
                  Toggle A: Lab Dates Announced
                </span>
                <span class="text-[11px] text-neutral-400">
                  ${
                    toggles.labDatesAnnounced
                      ? 'Dates confirmed. 2-day sprint schedules active when window opens.'
                      : 'Dates unconfirmed. Following standard pre-lab timetable.'
                  }
                </span>
              </div>
              <button
                type="button"
                id="toggle-a-switch"
                class="w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  toggles.labDatesAnnounced ? 'bg-white' : 'bg-neutral-800'
                }"
              >
                <div class="bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  toggles.labDatesAnnounced ? 'translate-x-6' : 'translate-x-0'
                }"></div>
              </button>
            </div>

            ${
              toggles.labDatesAnnounced
                ? `
              <div class="mt-3 pt-3 border-t border-neutral-800 space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                      MAD Lab Exam Date
                    </label>
                    <input
                      type="date"
                      id="input-mad-date"
                      value="${examDates.labExams.madLab.date || ''}"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
                    />
                    <div class="text-[10px] font-mono text-neutral-500 mt-1">
                      ${
                        examDates.labExams.madLab.date
                          ? formatExamCountdown(examDates.labExams.madLab.date, selectedDate).text
                          : 'Enter date'
                      }
                    </div>
                  </div>

                  <div>
                    <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                      Data Science Lab Exam Date
                    </label>
                    <input
                      type="date"
                      id="input-ds-date"
                      value="${examDates.labExams.dsLab.date || ''}"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
                    />
                    <div class="text-[10px] font-mono text-neutral-500 mt-1">
                      ${
                        examDates.labExams.dsLab.date
                          ? formatExamCountdown(examDates.labExams.dsLab.date, selectedDate).text
                          : 'Enter date'
                      }
                    </div>
                  </div>
                </div>
              </div>
            `
                : ''
            }
          </div>

          <!-- Toggle B: Lab Exams Completed -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-md">
            <div class="flex items-center justify-between gap-3 mb-2">
              <div>
                <span class="text-xs font-mono uppercase font-semibold text-white block">
                  Toggle B: Lab Exams Completed
                </span>
                <span class="text-[11px] text-neutral-400">
                  ${
                    toggles.labExamsCompleted
                      ? 'All labs finished. Full-day Theory-Only timetable active.'
                      : 'Labs pending. Lab preparation blocks included in schedule.'
                  }
                </span>
              </div>
              <button
                type="button"
                id="toggle-b-switch"
                class="w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  toggles.labExamsCompleted ? 'bg-white' : 'bg-neutral-800'
                }"
              >
                <div class="bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  toggles.labExamsCompleted ? 'translate-x-6' : 'translate-x-0'
                }"></div>
              </button>
            </div>

            <!-- Individual Lab Exam Completion Controls -->
            <div class="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
              <span class="text-[11px] font-mono text-neutral-500 uppercase">
                Individual Status:
              </span>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-neutral-300">
                  <input
                    type="checkbox"
                    id="checkbox-mad-completed"
                    ${examDates.labExams.madLab.isCompleted ? 'checked' : ''}
                    class="accent-white rounded cursor-pointer"
                  />
                  <span>MAD Lab Done</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-neutral-300">
                  <input
                    type="checkbox"
                    id="checkbox-ds-completed"
                    ${examDates.labExams.dsLab.isCompleted ? 'checked' : ''}
                    class="accent-white rounded cursor-pointer"
                  />
                  <span>DS Lab Done</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Four Progress Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- Daily Schedule Progress -->
        <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">Daily Schedule</span>
            ${icon('clock', 'w-3.5 h-3.5')}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${dailyScheduleProgress.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${dailyScheduleProgress.completed}/${dailyScheduleProgress.total} blocks
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${
              dailyScheduleProgress.percentage
            }%"></div>
          </div>
        </div>

        <!-- Theory Topics Progress -->
        <div
          id="card-nav-theory"
          class="bg-[#151515] border border-neutral-800 rounded-lg p-4 cursor-pointer hover:border-neutral-700 transition-colors"
        >
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">Theory Topics</span>
            ${icon('bookOpen', 'w-3.5 h-3.5')}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${theoryProgress.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${theoryProgress.completed}/${theoryProgress.total} done
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${
              theoryProgress.percentage
            }%"></div>
          </div>
        </div>

        <!-- MAD Lab Progress -->
        <div
          id="card-nav-mad"
          class="bg-[#151515] border border-neutral-800 rounded-lg p-4 cursor-pointer hover:border-neutral-700 transition-colors"
        >
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">MAD Lab</span>
            ${icon('flaskConical', 'w-3.5 h-3.5')}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${madLabProgress.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${madLabProgress.completed}/${madLabProgress.total} done
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${
              madLabProgress.percentage
            }%"></div>
          </div>
        </div>

        <!-- Data Science Lab Progress -->
        <div
          id="card-nav-ds"
          class="bg-[#151515] border border-neutral-800 rounded-lg p-4 cursor-pointer hover:border-neutral-700 transition-colors"
        >
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">DS Lab</span>
            ${icon('flaskConical', 'w-3.5 h-3.5')}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${dsLabProgress.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${dsLabProgress.completed}/${dsLabProgress.total} done
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${
              dsLabProgress.percentage
            }%"></div>
          </div>
        </div>
      </div>

      <!-- 4. Main Two Column Layout: Today's Timetable + Exam Timeline -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left 2 Columns: Today's Timetable Checklist -->
        <div class="lg:col-span-2 bg-[#151515] border border-neutral-800 rounded-lg p-5">
          <div class="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <div class="flex items-center gap-2">
              <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                Today's Timetable
              </h2>
              <span class="text-xs font-mono text-neutral-400">
                (${activePhase.badgeLabel})
              </span>
            </div>

            <button
              id="dash-reset-schedule-btn"
              class="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded transition-colors cursor-pointer"
              title="Reset checkmarks for today"
            >
              ${icon('rotateCcw', 'w-3 h-3')}
              <span class="hidden sm:inline">Reset Checkmarks</span>
            </button>
          </div>

          <!-- Schedule List -->
          <div class="space-y-2">
            ${activeSchedule
              .map((item) => {
                const isDone = completedIds.includes(item.id);
                const isCurrent = isCurrentScheduleItem(item.startTime, item.endTime);

                return `
                  <div
                    data-schedule-id="${item.id}"
                    class="schedule-row-item group flex items-center justify-between p-3 rounded border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-[#0B0B0B]/60 border-neutral-800/60 opacity-60'
                        : isCurrent
                        ? 'bg-[#0B0B0B] border-neutral-500 shadow-xs'
                        : 'bg-[#0B0B0B] border-neutral-800/80 hover:border-neutral-700'
                    }"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="text-neutral-400 group-hover:text-white transition-colors">
                        ${
                          isDone
                            ? icon('checkSquare', 'w-4 h-4 text-white')
                            : icon('square', 'w-4 h-4 text-neutral-600')
                        }
                      </div>

                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-mono text-neutral-400 tracking-tight">
                            ${item.timeRange}
                          </span>
                          ${
                            isCurrent
                              ? `<span class="bg-white text-black font-mono text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">NOW</span>`
                              : ''
                          }
                          <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                            item.category === 'theory'
                              ? 'bg-neutral-900 text-neutral-300 border-neutral-700'
                              : item.category === 'lab'
                              ? 'bg-neutral-900 text-neutral-200 border-neutral-600 font-semibold'
                              : item.category === 'review'
                              ? 'bg-neutral-900 text-white border-neutral-500'
                              : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                          }">
                            ${item.category}
                          </span>
                        </div>
                        <p class="text-xs sm:text-sm font-sans mt-0.5 truncate ${
                          isDone ? 'line-through text-neutral-500' : 'text-neutral-200 font-medium'
                        }">
                          ${item.activity}
                        </p>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>

        <!-- Right 1 Column: Upcoming Exam Dates & In-Sprint Topics -->
        <div class="space-y-6">
          <!-- Upcoming Exam Schedule -->
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
            <h2 class="text-xs font-mono uppercase tracking-wider font-semibold text-white mb-3 flex items-center justify-between">
              <span>Exam Schedule</span>
              <span class="text-[10px] text-neutral-500">Semester 2026</span>
            </h2>

            <!-- Study Leave Start -->
            <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded mb-3 flex items-center justify-between">
              <div>
                <span class="text-[11px] font-mono text-neutral-400 block">Study Leave Begins</span>
                <span class="text-xs text-white font-medium">
                  ${formatDateCompact(examDates.studyLeaveStart)}
                </span>
              </div>
              <span class="text-xs font-mono text-neutral-300">
                ${formatExamCountdown(examDates.studyLeaveStart, selectedDate).text}
              </span>
            </div>

            <!-- Theory Exams -->
            <div class="space-y-2 mb-4">
              <span class="text-[10px] font-mono uppercase text-neutral-500 block">Theory Exams:</span>
              ${Object.entries(examDates.theoryExams)
                .map(([key, exam]) => {
                  const countdown = formatExamCountdown(exam.date, selectedDate);
                  return `
                    <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between">
                      <div class="min-w-0 pr-2">
                        <span class="text-xs text-neutral-200 font-medium block truncate">
                          ${exam.name}
                        </span>
                        <span class="text-[10px] font-mono text-neutral-500">
                          ${formatDateCompact(exam.date)}
                        </span>
                      </div>
                      <span class="text-[11px] font-mono shrink-0 px-2 py-0.5 rounded border ${
                        countdown.isUrgent
                          ? 'bg-neutral-900 text-white border-neutral-600'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                      }">
                        ${countdown.text}
                      </span>
                    </div>
                  `;
                })
                .join('')}
            </div>

            <!-- Lab Practical Exams -->
            <div class="space-y-2">
              <span class="text-[10px] font-mono uppercase text-neutral-500 block">Lab Practical Exams:</span>
              ${Object.entries(examDates.labExams)
                .map(([key, exam]) => {
                  const isAnnounced = toggles.labDatesAnnounced && exam.date;
                  const countdown = isAnnounced
                    ? formatExamCountdown(exam.date, selectedDate)
                    : null;
                  return `
                    <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between">
                      <div class="min-w-0 pr-2">
                        <div class="flex items-center gap-1.5">
                          <span class="text-xs text-neutral-200 font-medium truncate">
                            ${exam.name}
                          </span>
                          ${
                            exam.isCompleted
                              ? `<span class="text-[9px] font-mono uppercase bg-neutral-800 text-neutral-300 px-1 py-0.2 rounded">Done</span>`
                              : ''
                          }
                        </div>
                        <span class="text-[10px] font-mono text-neutral-500">
                          ${isAnnounced ? formatDateCompact(exam.date) : 'Date unconfirmed'}
                        </span>
                      </div>
                      <span class="text-[11px] font-mono text-neutral-400">
                        ${countdown ? countdown.text : 'Pending'}
                      </span>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>

          <!-- If in Lab Sprint: Surfaced Incomplete Lab Topics -->
          ${
            activePhase.phase === 'lab-sprint'
              ? `
            <div class="bg-[#151515] border border-neutral-700 rounded-lg p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xs font-mono uppercase tracking-wider font-semibold text-white flex items-center gap-1.5">
                  ${icon('flaskConical', 'w-3.5 h-3.5 text-white')}
                  <span>Sprint Priority Programs</span>
                </h3>
                <button
                  id="dash-add-sprint-lab-btn"
                  class="text-[11px] font-mono text-neutral-300 hover:text-white cursor-pointer"
                >
                  + Add
                </button>
              </div>

              ${
                sprintLabTopics.length === 0
                  ? `<div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded text-center text-xs text-neutral-400">
                      All recorded topics for ${activePhase.activeLabName} are marked Done!
                    </div>`
                  : `
                  <div class="space-y-2">
                    ${sprintLabTopics
                      .slice(0, 5)
                      .map(
                        (l) => `
                      <div
                        data-lab-id="${l.id}"
                        class="dash-sprint-lab-item p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded hover:border-neutral-700 cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5 mb-0.5">
                            ${
                              l.experimentNumber
                                ? `<span class="text-[9px] font-mono text-neutral-400">[${l.experimentNumber}]</span>`
                                : ''
                            }
                            <span class="text-[9px] font-mono uppercase px-1 py-0.2 rounded border ${
                              l.priority === 'High'
                                ? 'bg-neutral-900 text-white border-neutral-600 font-bold'
                                : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                            }">
                              ${l.priority}
                            </span>
                            <span class="text-[9px] font-mono text-neutral-500 uppercase">
                              ${l.prepType}
                            </span>
                          </div>
                          <p class="text-xs text-neutral-200 truncate font-medium">
                            ${l.name}
                          </p>
                        </div>
                        <div class="text-neutral-600 shrink-0">
                          ${icon('square', 'w-4 h-4 text-neutral-600')}
                        </div>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                `
              }
            </div>
          `
              : ''
          }

          <!-- Tomorrow's Theory Plan Preview -->
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                Tomorrow's Theory Plan
              </h3>
              <button
                id="dash-view-all-theory-btn"
                class="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                ${icon('chevronRight', 'w-3 h-3')}
              </button>
            </div>

            ${
              tomorrowTopics.length === 0
                ? `
              <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded text-center">
                <p class="text-xs text-neutral-400 mb-2">
                  No theory topics planned for tomorrow (${tomorrowStr}) yet.
                </p>
                <button
                  id="dash-add-tomorrow-empty-btn"
                  class="text-xs font-mono text-white underline hover:text-neutral-300 cursor-pointer"
                >
                  + Add Tomorrow's Topics
                </button>
              </div>
            `
                : `
              <div class="space-y-2">
                ${tomorrowTopics
                  .slice(0, 4)
                  .map(
                    (t) => `
                  <div
                    data-theory-id="${t.id}"
                    class="dash-tomorrow-topic-item p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded hover:border-neutral-700 cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="text-[9px] font-mono uppercase px-1 py-0.2 rounded border ${
                          t.priority === 'High'
                            ? 'bg-neutral-900 text-white border-neutral-600'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                        }">
                          ${t.priority}
                        </span>
                        <span class="text-[9px] font-mono text-neutral-500 truncate">
                          ${t.subject.split(' ')[0]}
                        </span>
                      </div>
                      <p class="text-xs truncate ${
                        t.status === 'Done' ? 'line-through text-neutral-500' : 'text-neutral-200'
                      }">
                        ${t.name}
                      </p>
                    </div>
                    <div class="shrink-0">
                      ${
                        t.status === 'Done'
                          ? icon('checkSquare', 'w-4 h-4 text-white')
                          : icon('square', 'w-4 h-4 text-neutral-600')
                      }
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
            }
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#dash-night-pyq-btn')?.addEventListener('click', () => {
    actions.openNightPYQModal();
  });

  const handleAddTomorrow = () => {
    actions.openAddTheoryModal(null, tomorrowStr);
  };
  container.querySelector('#dash-add-tomorrow-btn')?.addEventListener('click', handleAddTomorrow);
  container.querySelector('#dash-add-tomorrow-empty-btn')?.addEventListener('click', handleAddTomorrow);

  container.querySelector('#dash-review-lab-btn')?.addEventListener('click', () => {
    actions.setActiveTab('lab');
  });

  container.querySelector('#dash-view-all-theory-btn')?.addEventListener('click', () => {
    actions.setActiveTab('theory');
  });

  // Card navigations
  container.querySelector('#card-nav-theory')?.addEventListener('click', () => actions.setActiveTab('theory'));
  container.querySelector('#card-nav-mad')?.addEventListener('click', () => {
    actions.setActiveTab('lab');
  });
  container.querySelector('#card-nav-ds')?.addEventListener('click', () => {
    actions.setActiveTab('lab');
  });

  // Toggle A Switch
  container.querySelector('#toggle-a-switch')?.addEventListener('click', () => {
    actions.setToggles({ labDatesAnnounced: !toggles.labDatesAnnounced });
  });

  // Date inputs for MAD and DS
  const madInput = container.querySelector('#input-mad-date');
  if (madInput) {
    madInput.addEventListener('change', (e) => {
      actions.updateLabExam('madLab', e.target.value);
    });
  }

  const dsInput = container.querySelector('#input-ds-date');
  if (dsInput) {
    dsInput.addEventListener('change', (e) => {
      actions.updateLabExam('dsLab', e.target.value);
    });
  }

  // Toggle B Switch with confirmation
  container.querySelector('#toggle-b-switch')?.addEventListener('click', () => {
    if (!toggles.labExamsCompleted) {
      actions.showConfirmDialog({
        title: 'Activate Post-Lab Theory-Only Phase?',
        message:
          'Switching "Lab Exams Completed" ON will permanently adjust your active daily timetable to full-day Theory Note Preparation and Revision. You can revert this later if needed.',
        confirmLabel: 'Activate Theory-Only',
        onConfirm: () => {
          actions.setToggles({ labExamsCompleted: true });
        },
      });
    } else {
      actions.setToggles({ labExamsCompleted: false });
    }
  });

  // Lab completion checkboxes
  container.querySelector('#checkbox-mad-completed')?.addEventListener('change', (e) => {
    actions.markLabExamCompleted('madLab', e.target.checked);
  });

  container.querySelector('#checkbox-ds-completed')?.addEventListener('change', (e) => {
    actions.markLabExamCompleted('dsLab', e.target.checked);
  });

  // Reset Schedule Checkmarks
  container.querySelector('#dash-reset-schedule-btn')?.addEventListener('click', () => {
    actions.showConfirmDialog({
      title: "Reset Today's Timetable Checkmarks?",
      message:
        "This will reset all checkmarks on today's daily schedule blocks so you can start fresh. Your saved theory and lab topic records will remain intact.",
      confirmLabel: 'Reset Schedule',
      isDestructive: true,
      onConfirm: () => {
        actions.resetDaySchedule(selectedDate);
      },
    });
  });

  // Schedule row click to toggle
  container.querySelectorAll('.schedule-row-item').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-schedule-id');
      if (id) actions.toggleScheduleItem(selectedDate, id);
    });
  });

  // Sprint lab items toggle
  container.querySelectorAll('.dash-sprint-lab-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-lab-id');
      if (id) {
        const topic = labTopics.find((l) => l.id === id);
        if (topic) {
          actions.updateLabTopic(id, {
            status: topic.status === 'Done' ? 'Not Started' : 'Done',
          });
        }
      }
    });
  });

  container.querySelector('#dash-add-sprint-lab-btn')?.addEventListener('click', () => {
    actions.openAddLabModal(null, activePhase.activeLabName || undefined);
  });

  // Tomorrow topic items toggle
  container.querySelectorAll('.dash-tomorrow-topic-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-theory-id');
      if (id) {
        const topic = theoryTopics.find((t) => t.id === id);
        if (topic) {
          actions.updateTheoryTopic(id, {
            status: topic.status === 'Done' ? 'Not Started' : 'Done',
          });
        }
      }
    });
  });
}
