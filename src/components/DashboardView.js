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
    todayCustomTasks = [],
    gamification,
    user,
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
      <!-- 0. Guest Mode Banner if not signed in -->
      ${
        !user
          ? `
        <div class="p-3.5 bg-gradient-to-r from-neutral-900 to-[#181818] border border-neutral-700/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              ${icon('sparkles', 'w-4 h-4 text-amber-300')}
            </div>
            <div>
              <span class="font-bold text-white">Firestore Cloud Sync Available:</span>
              <span class="text-neutral-300 ml-1">Sign in or register to sync your study schedule and streaks across all your devices.</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button
              id="dash-guest-login-btn"
              class="px-3 py-1.5 rounded-md bg-white hover:bg-neutral-200 text-black font-semibold text-xs font-mono transition-colors cursor-pointer"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      `
          : ''
      }

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
              id="dash-hero-add-task-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer shadow-sm"
              title="Add a custom study task to your schedule"
            >
              ${icon('plus', 'w-3.5 h-3.5')}
              <span>+ Add Task</span>
            </button>
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
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer"
            >
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
              class="px-3 py-1.5 text-xs font-mono font-semibold bg-white text-black hover:bg-neutral-200 rounded transition-colors shrink-0 cursor-pointer"
            >
              Open Lab Planner &rarr;
            </button>
          </div>
        `
            : ''
        }
      </div>

      <!-- 2. Gamification Highlight Banner -->
      ${
        gamification
          ? `
        <div class="bg-gradient-to-r from-[#171717] via-[#141414] to-[#191919] border border-neutral-800 rounded-lg p-4 sm:p-5 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3 sm:gap-4">
              <!-- Streak Flame Badge -->
              <div class="w-12 h-12 rounded-xl bg-orange-950/40 border border-orange-700/60 flex items-center justify-center shrink-0 shadow-inner">
                ${icon('flame', 'w-6 h-6 text-orange-400 fill-orange-400/20')}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-lg sm:text-xl font-bold font-mono text-white">
                    ${gamification.streak} Day Study Streak!
                  </span>
                  ${
                    gamification.streakRecordBroken
                      ? `<span class="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">NEW RECORD</span>`
                      : ''
                  }
                </div>
                <p class="text-xs text-neutral-400 mt-0.5">
                  Record: <span class="text-neutral-200 font-mono">${gamification.longestStreak} days</span> &bull;
                  Level ${gamification.level.level}: <span class="text-amber-300 font-medium">${gamification.level.title}</span>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- XP Summary -->
              <div class="bg-[#0C0C0C] border border-neutral-800 px-3 py-2 rounded-lg text-right">
                <div class="text-[10px] font-mono text-neutral-500 uppercase">Total XP Points</div>
                <div class="text-base sm:text-lg font-bold font-mono text-amber-300">
                  ${gamification.xp} XP
                </div>
              </div>

              <!-- Badges Link -->
              <button
                id="dash-view-badges-btn"
                class="px-3.5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono font-medium text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                ${icon('trophy', 'w-4 h-4 text-amber-400')}
                <span>Badges (${gamification.unlockedBadges.length}/${gamification.totalBadgesCount})</span>
              </button>
            </div>
          </div>

          <!-- Level Progress Bar -->
          <div class="mt-3.5 pt-3 border-t border-neutral-800/80">
            <div class="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
              <span>Level ${gamification.level.level} Progress</span>
              ${
                gamification.nextLevel
                  ? `<span>${gamification.xpIntoLevel} / ${gamification.xpForCurrentLevel} XP to ${gamification.nextLevel.title}</span>`
                  : `<span>Max Level Achieved!</span>`
              }
            </div>
            <div class="w-full bg-[#0C0C0C] h-2 rounded-full overflow-hidden border border-neutral-800">
              <div
                class="bg-gradient-to-r from-amber-400 to-orange-400 h-full transition-all duration-500 rounded-full"
                style="width: ${gamification.levelProgressPercent}%"
              ></div>
            </div>
          </div>
        </div>
      `
          : ''
      }

      <!-- 3. Progress Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- Daily Schedule Progress -->
        <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">Today's Tasks</span>
            ${icon('checkSquare', 'w-3.5 h-3.5')}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${dailyScheduleProgress.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${dailyScheduleProgress.completed}/${dailyScheduleProgress.total} tasks
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

      <!-- 4. Main Two Column Layout: Today's Tasks & Timetable + Exam Timeline -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left 2 Columns: User's Daily Study Schedule & Tasks -->
        <div class="lg:col-span-2 bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 mb-4 gap-3">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                  Today's Study Plan & Tasks
                </h2>
                <span class="text-xs font-mono text-amber-300 font-medium">
                  (${todayCustomTasks.length} planned)
                </span>
              </div>
              <p class="text-xs text-neutral-400 mt-0.5">
                No rigid presets — complete tasks to earn XP and build your study streak.
              </p>
            </div>

            <!-- Task Actions -->
            <div class="flex items-center gap-2 flex-wrap">
              <button
                id="dash-add-task-btn"
                class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer shadow-sm"
              >
                ${icon('plus', 'w-3.5 h-3.5')}
                <span>+ Add Task</span>
              </button>

              <button
                id="dash-seed-schedule-btn"
                title="Populate recommended balanced study blocks for today"
                class="flex items-center gap-1 text-[11px] font-mono text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
              >
                ${icon('zap', 'w-3 h-3 text-amber-400')}
                <span class="hidden sm:inline">Load Template</span>
              </button>

              ${
                todayCustomTasks.length > 0
                  ? `
                <button
                  id="dash-clear-day-tasks-btn"
                  title="Clear all tasks for this day"
                  class="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-rose-300 bg-neutral-900 border border-neutral-800 hover:border-rose-800 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                >
                  ${icon('trash2', 'w-3 h-3')}
                </button>
              `
                  : ''
              }
            </div>
          </div>

          <!-- Custom Tasks List -->
          ${
            todayCustomTasks.length === 0
              ? `
            <div class="py-12 px-4 text-center rounded-lg border border-dashed border-neutral-800 bg-[#0C0C0C]">
              <div class="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-400 mb-3">
                ${icon('calendar', 'w-6 h-6 text-neutral-300')}
              </div>
              <h3 class="text-sm font-semibold text-white mb-1">
                No study tasks planned for today yet
              </h3>
              <p class="text-xs text-neutral-400 max-w-md mx-auto mb-5 leading-relaxed">
                Add your own study sessions, practical problems, or revision topics. You can also populate our recommended MCA study timetable with one click.
              </p>
              <div class="flex items-center justify-center gap-3 flex-wrap">
                <button
                  id="dash-empty-add-task-btn"
                  class="px-4 py-2 text-xs font-mono font-semibold bg-white text-black hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  ${icon('plus', 'w-3.5 h-3.5')}
                  <span>Create Custom Task</span>
                </button>
                <button
                  id="dash-empty-seed-btn"
                  class="px-4 py-2 text-xs font-mono font-medium bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  ${icon('zap', 'w-3.5 h-3.5 text-amber-400')}
                  <span>Load Recommended Timetable</span>
                </button>
              </div>
            </div>
          `
              : `
            <div class="space-y-2">
              ${todayCustomTasks
                .map((task) => {
                  const isDone = Boolean(task.isCompleted);
                  return `
                  <div
                    class="custom-task-card group flex items-start sm:items-center justify-between p-3.5 rounded-lg border transition-all ${
                      isDone
                        ? 'bg-[#0B0B0B]/60 border-neutral-800/60 opacity-65'
                        : 'bg-[#0B0B0B] border-neutral-800 hover:border-neutral-700'
                    }"
                  >
                    <div class="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                      <!-- Completion Checkbox -->
                      <button
                        data-task-id="${task.id}"
                        class="custom-task-toggle-btn mt-0.5 sm:mt-0 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Toggle completed (+40 XP)"
                      >
                        ${
                          isDone
                            ? icon('checkSquare', 'w-5 h-5 text-emerald-400')
                            : icon('square', 'w-5 h-5 text-neutral-500')
                        }
                      </button>

                      <div class="min-w-0 flex-1">
                        <!-- Badges row -->
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-[11px] font-mono text-neutral-400 font-semibold">
                            ${task.timeSlot || 'Flexible'}
                          </span>
                          <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                            task.category === 'theory'
                              ? 'bg-blue-950/40 text-blue-300 border-blue-800/60'
                              : task.category === 'lab'
                              ? 'bg-purple-950/40 text-purple-300 border-purple-800/60'
                              : task.category === 'pyq'
                              ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                          }">
                            ${task.category || 'theory'}
                          </span>
                          <span class="text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            task.priority === 'High'
                              ? 'bg-rose-950/40 text-rose-300 border-rose-800/60 font-bold'
                              : task.priority === 'Medium'
                              ? 'bg-neutral-900 text-amber-300 border-neutral-700'
                              : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                          }">
                            ${task.priority || 'Medium'}
                          </span>
                        </div>

                        <!-- Task Title & Subject -->
                        <p class="text-xs sm:text-sm font-sans mt-1 ${
                          isDone ? 'line-through text-neutral-500' : 'text-white font-medium'
                        }">
                          ${task.title}
                        </p>

                        <div class="flex items-center gap-2 text-[11px] font-mono text-neutral-500 mt-0.5">
                          <span>${task.subject || 'General'}</span>
                          ${task.notes ? `<span>&bull; ${task.notes}</span>` : ''}
                        </div>
                      </div>
                    </div>

                    <!-- Right Task Actions -->
                    <div class="flex items-center gap-1.5 shrink-0 ml-2">
                      <button
                        data-edit-task-id="${task.id}"
                        class="custom-task-edit-btn p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors cursor-pointer"
                        title="Edit task"
                      >
                        ${icon('edit', 'w-3.5 h-3.5')}
                      </button>
                      <button
                        data-delete-task-id="${task.id}"
                        class="custom-task-delete-btn p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                        title="Delete task"
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

          <!-- Collapsible Reference Timetable Section -->
          <div class="mt-6 pt-4 border-t border-neutral-800/80">
            <details class="group">
              <summary class="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 cursor-pointer select-none hover:text-neutral-200">
                <span class="flex items-center gap-2">
                  ${icon('clock', 'w-3.5 h-3.5 text-neutral-400')}
                  <span>Phase Reference Timetable (${activePhase.badgeLabel})</span>
                </span>
                <span class="group-open:rotate-180 transition-transform">
                  ${icon('chevronDown', 'w-3.5 h-3.5')}
                </span>
              </summary>
              <div class="mt-3 space-y-1.5 text-xs font-mono text-neutral-300">
                ${activeSchedule
                  .map((item) => {
                    return `
                    <div class="p-2 bg-[#0B0B0B] border border-neutral-800/60 rounded flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="text-neutral-400 font-semibold">${item.timeRange}</span>
                        <span class="text-neutral-300">${item.activity}</span>
                      </div>
                      <span class="text-[9px] uppercase px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        ${item.category}
                      </span>
                    </div>
                  `;
                  })
                  .join('')}
              </div>
            </details>
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

            <div class="space-y-2.5">
              <!-- Theory Exams List -->
              ${Object.entries(examDates.theoryExams)
                .map(([key, exam]) => {
                  const countdown = formatExamCountdown(exam.date);
                  return `
                  <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded flex items-center justify-between gap-2">
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-mono font-bold text-white">${exam.code}</span>
                        <span class="text-[10px] font-mono text-neutral-400">${formatDateCompact(
                          exam.date
                        )}</span>
                      </div>
                      <p class="text-[11px] text-neutral-400 truncate max-w-[170px]">${exam.name}</p>
                    </div>
                    <span class="text-[11px] font-mono font-medium ${
                      countdown.isPast
                        ? 'text-neutral-500'
                        : countdown.isToday
                        ? 'text-amber-400 font-bold animate-pulse'
                        : countdown.days <= 7
                        ? 'text-neutral-200 font-semibold'
                        : 'text-neutral-400'
                    }">
                      ${countdown.label}
                    </span>
                  </div>
                `;
                })
                .join('')}

              <!-- Lab Exams List -->
              ${Object.entries(examDates.labExams)
                .map(([key, lab]) => {
                  const countdown = formatExamCountdown(lab.date);
                  return `
                  <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded flex items-center justify-between gap-2">
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-mono font-bold text-white">${lab.code}</span>
                        ${
                          lab.date
                            ? `<span class="text-[10px] font-mono text-neutral-400">${formatDateCompact(
                                lab.date
                              )}</span>`
                            : '<span class="text-[10px] font-mono text-neutral-500 italic">Date TBA</span>'
                        }
                      </div>
                      <p class="text-[11px] text-neutral-400 truncate max-w-[170px]">${lab.name}</p>
                    </div>
                    <span class="text-[11px] font-mono ${
                      lab.isCompleted
                        ? 'text-emerald-400 font-semibold'
                        : lab.date
                        ? 'text-neutral-300'
                        : 'text-neutral-500'
                    }">
                      ${lab.isCompleted ? 'Done' : lab.date ? countdown.label : 'Pending'}
                    </span>
                  </div>
                `;
                })
                .join('')}
            </div>

            <!-- Calendar Shortcut -->
            <button
              id="dash-open-calendar-btn"
              class="w-full mt-3 py-2 px-3 text-xs font-mono font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              ${icon('calendar', 'w-3.5 h-3.5 text-neutral-300')}
              <span>Open Full Academic Calendar &rarr;</span>
            </button>
          </div>

          <!-- Tomorrow Topics Preview Card -->
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
            <div class="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3">
              <h2 class="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                Tomorrow's Targets
              </h2>
              <span class="text-[10px] font-mono text-neutral-400">
                ${formatDateCompact(tomorrowStr)}
              </span>
            </div>

            ${
              tomorrowTopics.length === 0
                ? `
              <div class="text-center py-4 text-xs text-neutral-500 font-mono">
                No topics set for tomorrow yet.
                <button
                  id="dash-add-tomorrow-empty-btn"
                  class="block mx-auto mt-2 text-white underline hover:text-neutral-300 cursor-pointer font-sans"
                >
                  + Add Tomorrow Topic
                </button>
              </div>
            `
                : `
              <div class="space-y-2">
                ${tomorrowTopics
                  .map(
                    (t) => `
                  <div
                    data-theory-id="${t.id}"
                    class="dash-tomorrow-topic-item p-2.5 bg-[#0B0B0B] border border-neutral-800 hover:border-neutral-700 rounded flex items-center justify-between gap-2 cursor-pointer transition-colors"
                  >
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-mono text-neutral-400">
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
  container.querySelector('#dash-guest-login-btn')?.addEventListener('click', () => {
    actions.openAuthModal('login');
  });

  const handleOpenAddTask = () => {
    actions.openAddTaskModal(null, selectedDate);
  };
  container.querySelector('#dash-hero-add-task-btn')?.addEventListener('click', handleOpenAddTask);
  container.querySelector('#dash-add-task-btn')?.addEventListener('click', handleOpenAddTask);
  container.querySelector('#dash-empty-add-task-btn')?.addEventListener('click', handleOpenAddTask);

  const handleSeedSchedule = () => {
    actions.seedRecommendedSchedule(selectedDate);
  };
  container.querySelector('#dash-seed-schedule-btn')?.addEventListener('click', handleSeedSchedule);
  container.querySelector('#dash-empty-seed-btn')?.addEventListener('click', handleSeedSchedule);

  container.querySelector('#dash-clear-day-tasks-btn')?.addEventListener('click', () => {
    actions.showConfirmDialog({
      title: "Clear Today's Tasks?",
      message: "Are you sure you want to remove all tasks planned for today?",
      confirmLabel: 'Clear Tasks',
      isDestructive: true,
      onConfirm: () => {
        actions.clearDayTasks(selectedDate);
      },
    });
  });

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

  // Card navigations
  container.querySelector('#card-nav-theory')?.addEventListener('click', () => actions.setActiveTab('theory'));
  container.querySelector('#card-nav-mad')?.addEventListener('click', () => {
    actions.setActiveTab('lab');
  });
  container.querySelector('#card-nav-ds')?.addEventListener('click', () => {
    actions.setActiveTab('lab');
  });

  // Custom task checkboxes
  container.querySelectorAll('.custom-task-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const taskId = btn.getAttribute('data-task-id');
      if (taskId) actions.toggleCustomTask(taskId);
    });
  });

  // Custom task edit
  container.querySelectorAll('.custom-task-edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const taskId = btn.getAttribute('data-edit-task-id');
      const task = todayCustomTasks.find((t) => t.id === taskId);
      if (task) actions.openAddTaskModal(task, selectedDate);
    });
  });

  // Custom task delete
  container.querySelectorAll('.custom-task-delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const taskId = btn.getAttribute('data-delete-task-id');
      const task = todayCustomTasks.find((t) => t.id === taskId);
      if (task) {
        actions.showConfirmDialog({
          title: 'Delete Task',
          message: `Delete "${task.title}"?`,
          confirmLabel: 'Delete',
          isDestructive: true,
          onConfirm: () => actions.deleteCustomTask(taskId),
        });
      }
    });
  });

  // Calendar and Badges navigation
  container.querySelector('#dash-open-calendar-btn')?.addEventListener('click', () => {
    actions.setActiveTab('calendar');
  });

  container.querySelector('#dash-view-badges-btn')?.addEventListener('click', () => {
    actions.openBadgesModal();
  });

  // Tomorrow topics toggle
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
