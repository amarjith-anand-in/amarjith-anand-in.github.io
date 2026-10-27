import { icon } from '../icons.js';
import { XP_CONFIG } from '../services/gamificationService.js';

export function openBadgesModal(container, state) {
  const { gamification } = state;
  const { xp, level, streak, longestStreak, badges, unlockedBadgeCount, totalBadges } = gamification;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#151515] border border-neutral-800 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <!-- Header -->
        <div class="p-5 border-b border-neutral-800 flex items-start justify-between gap-4 bg-[#121212] rounded-t-lg">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-lg bg-amber-950/70 border border-amber-800/80 text-amber-400">
              ${icon('trophy', 'w-6 h-6')}
            </div>
            <div>
              <div class="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <span>Gamification & Milestone System</span>
              </div>
              <h2 class="text-xl font-bold text-white tracking-tight">
                Study Achievements & Ranks
              </h2>
            </div>
          </div>
          <button
            id="close-badges-modal"
            class="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            ${icon('x', 'w-5 h-5')}
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          <!-- Level & XP Hero Widget -->
          <div class="p-5 bg-[#0B0B0B] border border-neutral-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white text-black">
                  LEVEL ${level.level}
                </span>
                <span class="text-base font-bold text-white">${level.title}</span>
              </div>
              <p class="text-xs text-neutral-400 font-mono">
                Total Score: <span class="text-amber-400 font-bold">${xp.toLocaleString()} XP</span>
                ${
                  level.remainingXpToNext > 0
                    ? `&bull; ${level.remainingXpToNext} XP to Level ${level.level + 1}`
                    : '&bull; Max Rank Achieved!'
                }
              </p>
            </div>

            <!-- Streak Stats -->
            <div class="flex items-center gap-4 bg-[#151515] p-3 rounded border border-neutral-800 w-full sm:w-auto justify-around sm:justify-start">
              <div class="text-center">
                <span class="text-xs font-mono text-neutral-400 uppercase block">Current Streak</span>
                <div class="flex items-center justify-center gap-1 text-base font-bold text-orange-400 font-mono">
                  ${icon('flame', 'w-4 h-4 fill-orange-400/20')}
                  <span>${streak} Days</span>
                </div>
              </div>
              <div class="h-8 w-px bg-neutral-800"></div>
              <div class="text-center">
                <span class="text-xs font-mono text-neutral-400 uppercase block">Best Streak</span>
                <div class="flex items-center justify-center gap-1 text-base font-bold text-white font-mono">
                  ${icon('zap', 'w-4 h-4 text-neutral-300')}
                  <span>${longestStreak} Days</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Level Progress Bar -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-neutral-400">Progression to Next Rank</span>
              <span class="text-white font-bold">${level.progressPercent}%</span>
            </div>
            <div class="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden border border-neutral-800">
              <div
                class="bg-gradient-to-r from-amber-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style="width: ${level.progressPercent}%"
              ></div>
            </div>
          </div>

          <!-- Badges Showcase Grid -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                ${icon('award', 'w-3.5 h-3.5 text-neutral-300')}
                <span>Milestone Badges (${unlockedBadgeCount}/${totalBadges} Unlocked)</span>
              </h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${badges
                .map((badge) => {
                  return `
                  <div class="p-3.5 rounded-lg border transition-all ${
                    badge.isUnlocked
                      ? 'bg-neutral-900/90 border-amber-800/80 shadow-sm'
                      : 'bg-[#0B0B0B]/60 border-neutral-800/50 opacity-40'
                  }">
                    <div class="flex items-start gap-3">
                      <div class="p-2 rounded-md shrink-0 ${
                        badge.isUnlocked
                          ? 'bg-amber-950/80 text-amber-400 border border-amber-700/60'
                          : 'bg-neutral-800 text-neutral-500'
                      }">
                        ${icon(badge.icon, 'w-5 h-5')}
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <h4 class="text-xs font-bold ${
                            badge.isUnlocked ? 'text-white' : 'text-neutral-400'
                          }">
                            ${badge.title}
                          </h4>
                          ${
                            badge.isUnlocked
                              ? `<span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">UNLOCKED</span>`
                              : `<span class="px-1.5 py-0.2 rounded text-[9px] font-mono text-neutral-500 bg-neutral-900">LOCKED</span>`
                          }
                        </div>
                        <p class="text-[11px] text-neutral-400 mt-1 leading-snug">
                          ${badge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>

          <!-- XP Points Rules Guide -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-lg space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              ${icon('zap', 'w-3.5 h-3.5 text-amber-400')}
              <span>XP Scoring Rules & Bonuses</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
              <div class="p-2 bg-[#121212] border border-neutral-800/80 rounded flex justify-between">
                <span>Theory Topic Done</span>
                <span class="text-emerald-400 font-bold">+50 XP</span>
              </div>
              <div class="p-2 bg-[#121212] border border-neutral-800/80 rounded flex justify-between">
                <span>Early Bird Theory Bonus</span>
                <span class="text-amber-400 font-bold">+25 XP</span>
              </div>
              <div class="p-2 bg-[#121212] border border-neutral-800/80 rounded flex justify-between">
                <span>Lab Topic Done</span>
                <span class="text-cyan-400 font-bold">+40 XP</span>
              </div>
              <div class="p-2 bg-[#121212] border border-neutral-800/80 rounded flex justify-between">
                <span>Early Bird Lab Bonus</span>
                <span class="text-amber-400 font-bold">+20 XP</span>
              </div>
              <div class="p-2 bg-[#121212] border border-neutral-800/80 rounded flex justify-between">
                <span>Time-Block Done</span>
                <span class="text-neutral-200 font-bold">+15 XP</span>
              </div>
              <div class="p-2 bg-[#121212] border border-neutral-800/80 rounded flex justify-between">
                <span>Flawless Day (8+ Blocks)</span>
                <span class="text-yellow-400 font-bold">+30 XP</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-neutral-800 bg-[#121212] flex items-center justify-end rounded-b-lg">
          <button
            id="close-badges-modal-btn"
            class="px-4 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  const closeModal = () => {
    container.innerHTML = '';
  };

  const closeBtn = container.querySelector('#close-badges-modal');
  const closeBtnBottom = container.querySelector('#close-badges-modal-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtnBottom) closeBtnBottom.addEventListener('click', closeModal);
}
