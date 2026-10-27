import { icon } from '../icons.js';
import { getCurrentTimeKolkata } from '../utils/dateUtils.js';

let clockInterval = null;

export function renderNavbar(
  container,
  state,
  onNavigate,
  onOpenAuth,
  onExportExcel,
  onOpenBadges,
  onAddTask,
  onSignOut
) {
  const { activeTab, activePhase, syncState, gamification, user } = state;
  const currentTime = getCurrentTimeKolkata();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'layoutDashboard' },
    { id: 'calendar', label: 'Calendar', iconName: 'calendar' },
    { id: 'theory', label: 'Theory Planner', iconName: 'bookOpen' },
    { id: 'lab', label: 'Lab Planner', iconName: 'flaskConical' },
    { id: 'excel', label: 'Excel Sheet', iconName: 'fileSpreadsheet' },
    { id: 'settings', label: 'Settings', iconName: 'settings' },
  ];

  let syncPillHtml = '';
  if (syncState.syncStatus === 'syncing') {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-white animate-pulse">
        ${icon('refreshCw', 'w-3 h-3 animate-spin text-amber-300')}
        <span class="hidden sm:inline text-xs font-mono">Syncing...</span>
      </span>`;
  } else if (syncState.syncStatus === 'error') {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-rose-300">
        ${icon('alertCircle', 'w-3 h-3 text-rose-400')}
        <span class="hidden sm:inline text-xs font-mono">Sync Issue</span>
      </span>`;
  } else if (syncState.isConnected) {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-emerald-400">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="hidden sm:inline text-xs font-mono">Firestore</span>
      </span>`;
  } else {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-neutral-300">
        ${icon('user', 'w-3.5 h-3.5 text-neutral-400')}
        <span class="text-xs font-mono font-medium">Sign In</span>
      </span>`;
  }

  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || '';

  container.innerHTML = `
    <!-- Top Header -->
    <header class="sticky top-0 z-40 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-neutral-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-3">
          <!-- Left: Branding & Phase Badge -->
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <div class="flex items-center gap-2 cursor-pointer" id="nav-brand-btn">
              <div class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
              <span class="font-bold text-sm tracking-wider uppercase text-white font-mono">
                STUDY TRACKER
              </span>
            </div>

            <!-- Active Phase Pill -->
            <div class="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${
              activePhase.phase === 'lab-sprint'
                ? 'bg-neutral-900 text-white border-neutral-600'
                : activePhase.phase === 'theory-only'
                ? 'bg-neutral-900 text-neutral-200 border-neutral-700'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800'
            }">
              ${activePhase.badgeLabel}
            </div>
          </div>

          <!-- Center: Desktop Navigation Tabs -->
          <nav class="hidden md:flex items-center space-x-1">
            ${navItems
              .map((item) => {
                const isActive = activeTab === item.id;
                return `
                  <button
                    data-tab="${item.id}"
                    class="nav-tab-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }"
                  >
                    ${icon(item.iconName, 'w-3.5 h-3.5')}
                    <span>${item.label}</span>
                  </button>
                `;
              })
              .join('')}
          </nav>

          <!-- Right: Action Buttons, Badges, Auth & Sync -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Quick Add Task Button -->
            <button
              id="nav-quick-add-task-btn"
              title="Add a custom study task to your schedule"
              class="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer shadow-sm"
            >
              ${icon('plus', 'w-3.5 h-3.5')}
              <span class="hidden sm:inline">Add Task</span>
            </button>

            <!-- Gamification Streak & XP Badge -->
            ${
              gamification
                ? `
              <button
                id="nav-gamification-btn"
                title="Study Streak: ${gamification.streak} days (Record: ${gamification.longestStreak} days) &bull; Level ${gamification.level.level}: ${gamification.level.title}. Click to view achievements!"
                class="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium bg-gradient-to-r from-neutral-900 to-[#191919] hover:from-neutral-800 hover:to-neutral-700 border border-neutral-700/80 text-white transition-all cursor-pointer shadow-sm"
              >
                <span class="text-orange-400 flex items-center gap-1 font-bold">
                  ${icon('flame', 'w-3.5 h-3.5 fill-orange-400/20')}
                  <span>${gamification.streak}d</span>
                </span>
                <span class="text-neutral-600 hidden sm:inline">&bull;</span>
                <span class="text-amber-300 font-bold hidden sm:inline">
                  ${gamification.xp} XP
                </span>
                <span class="hidden xl:inline text-[9px] font-sans px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Lvl ${gamification.level.level}
                </span>
              </button>
            `
                : ''
            }

            <!-- Quick Excel Export button -->
            <button
              id="nav-quick-excel-btn"
              title="Download entire plan as Excel (.xlsx)"
              class="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-300 transition-colors cursor-pointer"
            >
              ${icon('fileSpreadsheet', 'w-3.5 h-3.5 text-emerald-400')}
              <span class="hidden lg:inline">.xlsx</span>
            </button>

            <!-- Live Asia/Kolkata Clock -->
            <div class="hidden 2xl:flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-900/60 px-2 py-1 rounded border border-neutral-800">
              ${icon('clock', 'w-3.5 h-3.5 text-neutral-400')}
              <span id="live-ist-clock">${currentTime} IST</span>
            </div>

            <!-- Firestore Auth / Sync Pill Button -->
            <div class="relative inline-block text-left" id="nav-auth-wrapper">
              <button
                id="nav-auth-btn"
                title="${
                  user
                    ? `Signed in as ${user.email} (Firestore Synced)`
                    : 'Sign In or Register to sync study schedule to Firestore'
                }"
                class="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${
                  user
                    ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-neutral-500'
                    : 'bg-neutral-900/90 text-white border-neutral-700 hover:bg-neutral-800'
                }"
              >
                ${syncPillHtml}
                ${
                  userDisplayName
                    ? `<span class="hidden sm:inline text-neutral-200 truncate max-w-[90px]">${userDisplayName}</span>`
                    : ''
                }
              </button>

              <!-- Dropdown for signed-in user -->
              ${
                user
                  ? `
                <div
                  id="nav-user-dropdown"
                  class="hidden absolute right-0 mt-1.5 w-56 rounded-lg bg-[#141414] border border-neutral-800 shadow-xl py-1 text-xs font-mono z-50 animate-in fade-in duration-100"
                >
                  <div class="px-3 py-2 border-b border-neutral-800">
                    <div class="text-neutral-400 text-[10px] uppercase">Logged in as</div>
                    <div class="text-white font-semibold truncate">${user.email}</div>
                    <div class="text-emerald-400 text-[10px] mt-0.5 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Firestore Cloud Synced
                    </div>
                  </div>
                  <button
                    id="nav-dropdown-settings"
                    class="w-full text-left px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center gap-2 cursor-pointer"
                  >
                    ${icon('settings', 'w-3.5 h-3.5')}
                    <span>Account & Settings</span>
                  </button>
                  <button
                    id="nav-dropdown-signout"
                    class="w-full text-left px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer border-t border-neutral-800"
                  >
                    ${icon('logOut', 'w-3.5 h-3.5')}
                    <span>Sign Out</span>
                  </button>
                </div>
              `
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E] border-t border-neutral-800/90 pb-safe">
      <div class="grid grid-cols-6 h-16">
        ${navItems
          .map((item) => {
            const isActive = activeTab === item.id;
            return `
              <button
                data-tab="${item.id}"
                class="mobile-nav-btn flex flex-col items-center justify-center gap-0.5 py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }"
              >
                <div class="p-1 rounded-md transition-colors ${
                  isActive ? 'bg-neutral-800 text-white' : ''
                }">
                  ${icon(item.iconName, 'w-4 h-4')}
                </div>
                <span class="text-[8.5px] uppercase font-mono tracking-tighter truncate max-w-[54px]">
                  ${item.label.split(' ')[0]}
                </span>
              </button>
            `;
          })
          .join('')}
      </div>
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.nav-tab-btn, .mobile-nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) onNavigate(tab);
    });
  });

  const gamificationBtn = container.querySelector('#nav-gamification-btn');
  if (gamificationBtn) {
    gamificationBtn.addEventListener('click', () => onOpenBadges && onOpenBadges());
  }

  const brandBtn = container.querySelector('#nav-brand-btn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => onNavigate('dashboard'));
  }

  const quickAddTaskBtn = container.querySelector('#nav-quick-add-task-btn');
  if (quickAddTaskBtn) {
    quickAddTaskBtn.addEventListener('click', () => onAddTask && onAddTask());
  }

  const quickExcelBtn = container.querySelector('#nav-quick-excel-btn');
  if (quickExcelBtn) {
    quickExcelBtn.addEventListener('click', () => onExportExcel && onExportExcel());
  }

  const authBtn = container.querySelector('#nav-auth-btn');
  const userDropdown = container.querySelector('#nav-user-dropdown');

  if (authBtn) {
    authBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (user) {
        if (userDropdown) {
          userDropdown.classList.toggle('hidden');
        }
      } else {
        onOpenAuth && onOpenAuth();
      }
    });
  }

  // Close dropdown on outside click
  if (userDropdown) {
    document.addEventListener('click', () => {
      if (!userDropdown.classList.contains('hidden')) {
        userDropdown.classList.add('hidden');
      }
    });
  }

  const dropdownSettings = container.querySelector('#nav-dropdown-settings');
  if (dropdownSettings) {
    dropdownSettings.addEventListener('click', () => {
      onNavigate('settings');
      userDropdown?.classList.add('hidden');
    });
  }

  const dropdownSignOut = container.querySelector('#nav-dropdown-signout');
  if (dropdownSignOut) {
    dropdownSignOut.addEventListener('click', () => {
      onSignOut && onSignOut();
      userDropdown?.classList.add('hidden');
    });
  }

  // Clock tick
  if (clockInterval) clearInterval(clockInterval);
  clockInterval = setInterval(() => {
    const clockEl = container.querySelector('#live-ist-clock');
    if (clockEl) {
      clockEl.textContent = `${getCurrentTimeKolkata()} IST`;
    }
  }, 10000);
}
