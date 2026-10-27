import { icon } from '../icons.js';
import { getCurrentTimeKolkata } from '../utils/dateUtils.js';

let clockInterval = null;

export function renderNavbar(container, state, onNavigate, onSync, onExportExcel, onOpenBadges) {
  const { activeTab, activePhase, syncState, gamification } = state;
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
      <span class="inline-flex items-center gap-1.5 animate-pulse text-white">
        ${icon('refreshCw', 'w-3.5 h-3.5 animate-spin text-white')}
        <span class="hidden sm:inline">Syncing...</span>
      </span>`;
  } else if (syncState.syncStatus === 'error') {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-neutral-300">
        ${icon('alertCircle', 'w-3.5 h-3.5 text-neutral-300')}
        <span class="hidden sm:inline">Sync Issue</span>
      </span>`;
  } else if (syncState.isConnected) {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-white">
        ${icon('checkCircle2', 'w-3.5 h-3.5 text-white')}
        <span class="hidden sm:inline">Sheets Synced</span>
      </span>`;
  } else {
    syncPillHtml = `
      <span class="inline-flex items-center gap-1.5 text-neutral-400">
        ${icon('refreshCw', 'w-3.5 h-3.5 text-neutral-500')}
        <span class="hidden sm:inline">Connect Sheets</span>
      </span>`;
  }

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
                MCA STUDY TRACKER
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

          <!-- Right: Streak & XP Badge, Clock, Quick Excel Export & Sheets Sync -->
          <div class="flex items-center gap-2 shrink-0">
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
            <div class="hidden lg:flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-900/60 px-2 py-1 rounded border border-neutral-800">
              ${icon('clock', 'w-3.5 h-3.5 text-neutral-400')}
              <span id="live-ist-clock">${currentTime} IST</span>
            </div>

            <!-- Sheets Sync Pill / Button -->
            <button
              id="nav-sync-btn"
              title="${
                syncState.syncStatus === 'error'
                  ? syncState.errorMessage || 'Click to retry sync'
                  : syncState.isConnected
                  ? `Synced to Google Sheets (${syncState.lastSyncedAt || 'Ready'})`
                  : 'Click to connect Google Sheets backend'
              }"
              class="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${
                syncState.syncStatus === 'syncing'
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-700'
                  : syncState.syncStatus === 'error'
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-neutral-500'
                  : syncState.isConnected
                  ? 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }"
            >
              ${syncPillHtml}
            </button>
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

  const syncBtn = container.querySelector('#nav-sync-btn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => onSync());
  }

  const quickExcelBtn = container.querySelector('#nav-quick-excel-btn');
  if (quickExcelBtn) {
    quickExcelBtn.addEventListener('click', () => onExportExcel && onExportExcel());
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
