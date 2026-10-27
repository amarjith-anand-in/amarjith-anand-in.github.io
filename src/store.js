import {
  PRE_LAB_SCHEDULE,
  LAB_SPRINT_SCHEDULE,
  THEORY_ONLY_SCHEDULE,
} from './utils/defaultSchedules.js';
import {
  getTodayKolkata,
  getTomorrowKolkata,
  resolveActivePhase,
} from './utils/dateUtils.js';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from './services/firebaseAuth.js';
import {
  DEFAULT_SPREADSHEET_ID,
  DEFAULT_SPREADSHEET_URL,
  readWorkbookData,
  writeWorkbookData,
  extractSpreadsheetId,
} from './services/googleSheets.js';
import { exportToExcel, importFromExcel } from './services/excelService.js';
import { calculateGamification } from './services/gamificationService.js';
import { showToast } from './utils/toast.js';

const LOCAL_STORAGE_KEY = 'mca_study_planner_state_v1';


export const INITIAL_EXAM_DATES = {
  studyLeaveStart: '2026-10-29',
  theoryExams: {
    dataScience: {
      name: 'Data Science and Machine Learning',
      code: 'DS-ML',
      date: '2026-11-23',
      isConfirmed: true,
      isCompleted: false,
    },
    daa: {
      name: 'Design and Analysis of Algorithms (DAA)',
      code: 'DAA',
      date: '2026-11-26',
      isConfirmed: true,
      isCompleted: false,
    },
    operationsResearch: {
      name: 'Operations Research (OR)',
      code: 'OR',
      date: '2026-11-30',
      isConfirmed: true,
      isCompleted: false,
    },
    deepLearning: {
      name: 'Deep Learning',
      code: 'DL',
      date: '2026-12-03',
      isConfirmed: true,
      isCompleted: false,
    },
  },
  labExams: {
    madLab: {
      name: 'Mobile Application Development (MAD) Lab',
      code: 'MAD-LAB',
      date: '',
      isConfirmed: false,
      isCompleted: false,
    },
    dsLab: {
      name: 'Data Science Lab',
      code: 'DS-LAB',
      date: '',
      isConfirmed: false,
      isCompleted: false,
    },
  },
};

export const INITIAL_TOGGLES = {
  labDatesAnnounced: false,
  labExamsCompleted: false,
};

class StudyStore {
  constructor() {
    this.state = {
      activeTab: 'dashboard',
      selectedDate: getTodayKolkata(),
      examDates: JSON.parse(JSON.stringify(INITIAL_EXAM_DATES)),
      toggles: JSON.parse(JSON.stringify(INITIAL_TOGGLES)),
      theoryTopics: [],
      labTopics: [],
      dailyCompletions: {},
      user: null,
      syncState: {
        isConnected: false,
        spreadsheetId: DEFAULT_SPREADSHEET_ID,
        spreadsheetUrl: DEFAULT_SPREADSHEET_URL,
        syncStatus: 'idle',
      },
      confirmDialog: {
        isOpen: false,
        title: '',
        message: '',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        isDestructive: false,
        onConfirm: () => {},
        onCancel: () => {},
      },
    };

    this.listeners = new Set();
    this.autoSyncTimeout = null;
    this.isLoaded = false;

    this.init();
  }

  init() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.examDates) this.state.examDates = parsed.examDates;
        if (parsed.toggles) this.state.toggles = parsed.toggles;
        if (Array.isArray(parsed.theoryTopics)) this.state.theoryTopics = parsed.theoryTopics;
        if (Array.isArray(parsed.labTopics)) this.state.labTopics = parsed.labTopics;
        if (parsed.dailyCompletions) this.state.dailyCompletions = parsed.dailyCompletions;
        if (parsed.spreadsheetId) {
          this.state.syncState.spreadsheetId = parsed.spreadsheetId;
          this.state.syncState.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${parsed.spreadsheetId}/edit`;
        }
      }
    } catch (e) {
      console.warn('Failed to parse local storage cache:', e);
    } finally {
      this.isLoaded = true;
    }

    // Init Firebase Auth
    initAuth(
      (currentUser, token) => {
        this.state.user = currentUser;
        this.state.syncState.isConnected = true;
        this.state.syncState.userEmail = currentUser.email || undefined;
        this.notify();
      },
      () => {
        this.state.user = null;
        this.state.syncState.isConnected = false;
        this.state.syncState.userEmail = undefined;
        this.notify();
      }
    );
  }

  saveToLocalStorage() {
    if (!this.isLoaded) return;
    try {
      const payload = {
        examDates: this.state.examDates,
        toggles: this.state.toggles,
        theoryTopics: this.state.theoryTopics,
        labTopics: this.state.labTopics,
        dailyCompletions: this.state.dailyCompletions,
        spreadsheetId: this.state.syncState.spreadsheetId,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveToLocalStorage();
    for (const listener of this.listeners) {
      listener(this.getState());
    }
  }

  getState() {
    const { state } = this;
    const activePhase = resolveActivePhase(state.toggles, state.examDates, state.selectedDate);
    const activeSchedule =
      activePhase.phase === 'theory-only'
        ? THEORY_ONLY_SCHEDULE
        : activePhase.phase === 'lab-sprint'
        ? LAB_SPRINT_SCHEDULE
        : PRE_LAB_SCHEDULE;

    const todayRecord = state.dailyCompletions[state.selectedDate]?.completedScheduleIds || [];
    const scheduleCompleted = todayRecord.filter((id) => activeSchedule.some((s) => s.id === id)).length;
    const scheduleTotal = activeSchedule.length;
    const dailyScheduleProgress = {
      completed: scheduleCompleted,
      total: scheduleTotal,
      percentage: scheduleTotal > 0 ? Math.round((scheduleCompleted / scheduleTotal) * 100) : 0,
    };

    const theoryCompleted = state.theoryTopics.filter((t) => t.status === 'Done').length;
    const theoryTotal = state.theoryTopics.length;
    const theoryProgress = {
      completed: theoryCompleted,
      total: theoryTotal,
      percentage: theoryTotal > 0 ? Math.round((theoryCompleted / theoryTotal) * 100) : 0,
    };

    const madTopics = state.labTopics.filter((l) => l.lab === 'Mobile Application Development (MAD) Lab');
    const madCompleted = madTopics.filter((l) => l.status === 'Done').length;
    const madTotal = madTopics.length;
    const madLabProgress = {
      completed: madCompleted,
      total: madTotal,
      percentage: madTotal > 0 ? Math.round((madCompleted / madTotal) * 100) : 0,
    };

    const dsTopics = state.labTopics.filter((l) => l.lab === 'Data Science Lab');
    const dsCompleted = dsTopics.filter((l) => l.status === 'Done').length;
    const dsTotal = dsTopics.length;
    const dsLabProgress = {
      completed: dsCompleted,
      total: dsTotal,
      percentage: dsTotal > 0 ? Math.round((dsCompleted / dsTotal) * 100) : 0,
    };

    const gamification = calculateGamification({
      ...state,
      dailyScheduleProgress,
      theoryProgress,
      madLabProgress,
      dsLabProgress,
    });

    return {
      ...state,
      activePhase,
      activeSchedule,
      dailyScheduleProgress,
      theoryProgress,
      madLabProgress,
      dsLabProgress,
      gamification,
    };
  }

  setActiveTab(tab) {
    this.state.activeTab = tab;
    this.notify();
  }

  setSelectedDate(date) {
    this.state.selectedDate = date;
    this.notify();
  }

  setToggles(updates) {
    this.state.toggles = { ...this.state.toggles, ...updates };
    this.triggerAutoSync();
    this.notify();
  }

  setExamDates(updates) {
    this.state.examDates = { ...this.state.examDates, ...updates };
    this.triggerAutoSync();
    this.notify();
  }

  updateLabExam(labKey, date, isCompleted) {
    const targetLab = this.state.examDates.labExams[labKey];
    this.state.examDates.labExams[labKey] = {
      ...targetLab,
      date,
      isConfirmed: Boolean(date),
      isCompleted: isCompleted !== undefined ? isCompleted : targetLab.isCompleted,
    };
    this.triggerAutoSync();
    this.notify();
  }

  markLabExamCompleted(labKey, completed) {
    const targetLab = this.state.examDates.labExams[labKey];
    this.state.examDates.labExams[labKey] = {
      ...targetLab,
      isCompleted: completed,
    };
    this.triggerAutoSync();
    this.notify();
  }

  toggleScheduleItem(date, itemId) {
    const existing = this.state.dailyCompletions[date]?.completedScheduleIds || [];
    const isAdding = !existing.includes(itemId);
    const updatedIds = isAdding
      ? [...existing, itemId]
      : existing.filter((id) => id !== itemId);

    this.state.dailyCompletions[date] = {
      date,
      completedScheduleIds: updatedIds,
      lastUpdated: new Date().toISOString(),
    };

    if (isAdding) {
      showToast('<span class="font-bold text-amber-400 font-mono">+15 XP</span> Daily task block completed! 🔥', 'xp');
    }

    this.triggerAutoSync();
    this.notify();
  }

  resetDaySchedule(date) {
    this.state.dailyCompletions[date] = {
      date,
      completedScheduleIds: [],
      lastUpdated: new Date().toISOString(),
    };
    this.triggerAutoSync();
    this.notify();
  }

  addTheoryTopic(topic) {
    const newTopic = {
      ...topic,
      id: `theory-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      order: this.state.theoryTopics.length,
    };
    this.state.theoryTopics.push(newTopic);
    this.triggerAutoSync();
    this.notify();
  }

  updateTheoryTopic(id, updates) {
    let newlyDone = false;
    let isEarly = false;
    this.state.theoryTopics = this.state.theoryTopics.map((t) => {
      if (t.id === id) {
        const isDone = updates.status === 'Done';
        if (isDone && t.status !== 'Done') {
          newlyDone = true;
          if (t.targetDate) {
            const todayStr = getTodayKolkata();
            if (todayStr <= t.targetDate) isEarly = true;
          }
        }
        return {
          ...t,
          ...updates,
          completedAt: isDone ? t.completedAt || new Date().toISOString() : undefined,
        };
      }
      return t;
    });

    if (newlyDone) {
      if (isEarly) {
        showToast('<span class="font-bold text-emerald-400 font-mono">+75 XP!</span> Theory topic completed with <span class="text-amber-300 font-semibold">+25 Early Bonus 🎯</span>', 'bonus');
      } else {
        showToast('<span class="font-bold text-emerald-400 font-mono">+50 XP</span> Theory topic completed! 📚', 'xp');
      }
    }

    this.triggerAutoSync();
    this.notify();
  }

  deleteTheoryTopic(id) {
    this.state.theoryTopics = this.state.theoryTopics.filter((t) => t.id !== id);
    this.triggerAutoSync();
    this.notify();
  }

  reorderTheoryTopics(topics) {
    this.state.theoryTopics = topics.map((t, idx) => ({ ...t, order: idx }));
    this.triggerAutoSync();
    this.notify();
  }

  carryUnfinishedTheoryTopics(fromDate, toDate) {
    let count = 0;
    this.state.theoryTopics = this.state.theoryTopics.map((t) => {
      if (t.targetDate === fromDate && t.status !== 'Done') {
        count++;
        return { ...t, targetDate: toDate };
      }
      return t;
    });
    if (count > 0) {
      this.triggerAutoSync();
      this.notify();
    }
    return count;
  }

  addLabTopic(topic) {
    const newTopic = {
      ...topic,
      id: `lab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      order: this.state.labTopics.length,
    };
    this.state.labTopics.push(newTopic);
    this.triggerAutoSync();
    this.notify();
  }

  updateLabTopic(id, updates) {
    let newlyDone = false;
    let isEarly = false;
    this.state.labTopics = this.state.labTopics.map((l) => {
      if (l.id === id) {
        const isDone = updates.status === 'Done';
        if (isDone && l.status !== 'Done') {
          newlyDone = true;
          if (l.targetDate) {
            const todayStr = getTodayKolkata();
            if (todayStr <= l.targetDate) isEarly = true;
          }
        }
        return {
          ...l,
          ...updates,
          completedAt: isDone ? l.completedAt || new Date().toISOString() : undefined,
        };
      }
      return l;
    });

    if (newlyDone) {
      if (isEarly) {
        showToast('<span class="font-bold text-cyan-400 font-mono">+60 XP!</span> Lab exercise completed with <span class="text-amber-300 font-semibold">+20 Early Bonus 🎯</span>', 'bonus');
      } else {
        showToast('<span class="font-bold text-cyan-400 font-mono">+40 XP</span> Lab exercise completed! 🔬', 'xp');
      }
    }

    this.triggerAutoSync();
    this.notify();
  }

  deleteLabTopic(id) {
    this.state.labTopics = this.state.labTopics.filter((l) => l.id !== id);
    this.triggerAutoSync();
    this.notify();
  }

  reorderLabTopics(topics) {
    this.state.labTopics = topics.map((l, idx) => ({ ...l, order: idx }));
    this.triggerAutoSync();
    this.notify();
  }

  setCustomSpreadsheetId(idOrUrl) {
    const cleanId = extractSpreadsheetId(idOrUrl);
    this.state.syncState.spreadsheetId = cleanId;
    this.state.syncState.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/edit`;
    this.state.syncState.syncStatus = 'idle';
    this.state.syncState.errorMessage = undefined;
    this.notify();
  }

  async triggerAutoSync() {
    const token = await getAccessToken();
    if (!token) return;

    if (this.autoSyncTimeout) {
      clearTimeout(this.autoSyncTimeout);
    }

    this.autoSyncTimeout = setTimeout(async () => {
      this.state.syncState.syncStatus = 'syncing';
      this.state.syncState.errorMessage = undefined;
      this.notify();

      try {
        await writeWorkbookData(this.state.syncState.spreadsheetId, token, {
          examDates: this.state.examDates,
          toggles: this.state.toggles,
          theoryTopics: this.state.theoryTopics,
          labTopics: this.state.labTopics,
          dailyCompletions: this.state.dailyCompletions,
        });
        this.state.syncState.syncStatus = 'success';
        this.state.syncState.lastSyncedAt = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
        this.state.syncState.errorMessage = undefined;
      } catch (err) {
        console.error('Auto-sync failed:', err);
        this.state.syncState.syncStatus = 'error';
        this.state.syncState.errorMessage = err.message || 'Sync failed';
      }
      this.notify();
    }, 1500);
  }

  async syncWithSheets() {
    let token = await getAccessToken();
    if (!token) {
      try {
        const result = await googleSignIn();
        if (result) {
          token = result.accessToken;
          this.state.user = result.user;
          this.state.syncState.isConnected = true;
          this.state.syncState.userEmail = result.user.email || undefined;
          this.notify();
        } else {
          return;
        }
      } catch (err) {
        this.state.syncState.syncStatus = 'error';
        this.state.syncState.errorMessage = err.message || 'Sign-in failed';
        this.notify();
        return;
      }
    }

    if (!token) return;

    this.state.syncState.syncStatus = 'syncing';
    this.state.syncState.errorMessage = undefined;
    this.notify();

    try {
      const remote = await readWorkbookData(this.state.syncState.spreadsheetId, token);

      if (remote.examDates) this.state.examDates = remote.examDates;
      if (remote.toggles) this.state.toggles = remote.toggles;
      if (remote.theoryTopics && remote.theoryTopics.length > 0) {
        this.state.theoryTopics = remote.theoryTopics;
      }
      if (remote.labTopics && remote.labTopics.length > 0) {
        this.state.labTopics = remote.labTopics;
      }
      if (remote.dailyCompletions && Object.keys(remote.dailyCompletions).length > 0) {
        this.state.dailyCompletions = remote.dailyCompletions;
      }

      if (!remote.theoryTopics && !remote.examDates) {
        await writeWorkbookData(this.state.syncState.spreadsheetId, token, {
          examDates: this.state.examDates,
          toggles: this.state.toggles,
          theoryTopics: this.state.theoryTopics,
          labTopics: this.state.labTopics,
          dailyCompletions: this.state.dailyCompletions,
        });
      }

      this.state.syncState.syncStatus = 'success';
      this.state.syncState.lastSyncedAt = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.state.syncState.errorMessage = undefined;
    } catch (err) {
      console.error('Sync failed:', err);
      this.state.syncState.syncStatus = 'error';
      this.state.syncState.errorMessage = err.message || 'Failed to connect to Google Sheets';
    }
    this.notify();
  }

  async signInWithGoogle() {
    try {
      const res = await googleSignIn();
      if (res) {
        this.state.user = res.user;
        this.state.syncState.isConnected = true;
        this.state.syncState.userEmail = res.user.email || undefined;
        this.notify();
        setTimeout(() => this.syncWithSheets(), 100);
      }
    } catch (err) {
      this.state.syncState.syncStatus = 'error';
      this.state.syncState.errorMessage = err.message || 'Sign in failed';
      this.notify();
    }
  }

  async signOutUser() {
    await logout();
    this.state.user = null;
    this.state.syncState.isConnected = false;
    this.state.syncState.userEmail = undefined;
    this.state.syncState.syncStatus = 'idle';
    this.notify();
  }

  exportToExcel(filename = null) {
    exportToExcel(this.getState(), filename);
  }

  async importFromExcelFile(file) {
    try {
      const parsed = await importFromExcel(file);
      if (parsed.theoryTopics) this.state.theoryTopics = parsed.theoryTopics;
      if (parsed.labTopics) this.state.labTopics = parsed.labTopics;
      if (parsed.examDates) this.state.examDates = parsed.examDates;
      if (parsed.toggles) this.state.toggles = parsed.toggles;
      if (parsed.dailyCompletions) this.state.dailyCompletions = parsed.dailyCompletions;

      this.triggerAutoSync();
      this.notify();
      return { success: true, countTheory: (parsed.theoryTopics || []).length, countLab: (parsed.labTopics || []).length };
    } catch (err) {
      console.error('Import error:', err);
      throw err;
    }
  }

  showConfirmDialog(config) {
    this.state.confirmDialog = {
      isOpen: true,
      title: config.title,
      message: config.message,
      confirmLabel: config.confirmLabel || 'Confirm',
      cancelLabel: config.cancelLabel || 'Cancel',
      isDestructive: Boolean(config.isDestructive),
      onConfirm: () => {
        config.onConfirm();
        this.closeConfirmDialog();
      },
      onCancel: () => this.closeConfirmDialog(),
    };
    this.notify();
  }

  closeConfirmDialog() {
    this.state.confirmDialog.isOpen = false;
    this.notify();
  }
}

export const store = new StudyStore();

