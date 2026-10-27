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
  subscribeToAuth,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
} from './services/authService.js';
import {
  fetchUserTrackerData,
  saveUserTrackerData,
  subscribeToUserTrackerData,
} from './services/firestoreService.js';
import { exportToExcel, importFromExcel } from './services/excelService.js';
import { calculateGamification } from './services/gamificationService.js';
import { showToast } from './utils/toast.js';

const LOCAL_STORAGE_KEY = 'mca_study_planner_state_v2';

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
      customTasks: [],
      theoryTopics: [],
      labTopics: [],
      dailyCompletions: {},
      user: null,
      firestoreSync: {
        isConnected: false,
        syncStatus: 'idle', // 'idle' | 'syncing' | 'synced' | 'error'
        lastSyncedAt: null,
        errorMessage: null,
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
    this.firestoreDebounceTimeout = null;
    this.firestoreUnsubscribe = null;
    this.isLoaded = false;

    this.init();
  }

  init() {
    // 1. Restore from localStorage for instantaneous offline rendering
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.examDates) this.state.examDates = parsed.examDates;
        if (parsed.toggles) this.state.toggles = parsed.toggles;
        if (Array.isArray(parsed.customTasks)) this.state.customTasks = parsed.customTasks;
        if (Array.isArray(parsed.theoryTopics)) this.state.theoryTopics = parsed.theoryTopics;
        if (Array.isArray(parsed.labTopics)) this.state.labTopics = parsed.labTopics;
        if (parsed.dailyCompletions) this.state.dailyCompletions = parsed.dailyCompletions;
      }
    } catch (e) {
      console.warn('Failed to parse local storage cache:', e);
    } finally {
      this.isLoaded = true;
    }

    // 2. Subscribe to Firebase Authentication
    subscribeToAuth(async (currentUser) => {
      if (currentUser) {
        this.state.user = currentUser;
        this.state.firestoreSync.isConnected = true;
        this.state.firestoreSync.userEmail = currentUser.email || currentUser.displayName || 'User';

        // Detach prior firestore listener if any
        if (this.firestoreUnsubscribe) {
          this.firestoreUnsubscribe();
          this.firestoreUnsubscribe = null;
        }

        // Attach real-time listener to Firestore
        this.firestoreUnsubscribe = subscribeToUserTrackerData(
          currentUser.uid,
          (remoteData) => {
            if (remoteData) {
              if (remoteData.examDates) this.state.examDates = remoteData.examDates;
              if (remoteData.toggles) this.state.toggles = remoteData.toggles;
              if (Array.isArray(remoteData.customTasks)) this.state.customTasks = remoteData.customTasks;
              if (Array.isArray(remoteData.theoryTopics)) this.state.theoryTopics = remoteData.theoryTopics;
              if (Array.isArray(remoteData.labTopics)) this.state.labTopics = remoteData.labTopics;
              if (remoteData.dailyCompletions) this.state.dailyCompletions = remoteData.dailyCompletions;

              this.state.firestoreSync.syncStatus = 'synced';
              this.state.firestoreSync.lastSyncedAt = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });
              this.state.firestoreSync.errorMessage = null;
              this.notify();
            } else {
              // Remote doc does not exist yet -> push initial local state
              this.saveToFirestore();
            }
          },
          (err) => {
            console.warn('Firestore sync warning:', err);
            this.state.firestoreSync.syncStatus = 'error';
            this.state.firestoreSync.errorMessage = err.message || 'Firestore sync issue';
            this.notify();
          }
        );

        this.notify();
      } else {
        if (this.firestoreUnsubscribe) {
          this.firestoreUnsubscribe();
          this.firestoreUnsubscribe = null;
        }
        this.state.user = null;
        this.state.firestoreSync.isConnected = false;
        this.state.firestoreSync.syncStatus = 'idle';
        this.state.firestoreSync.errorMessage = null;
        this.notify();
      }
    });
  }

  saveToLocalStorage() {
    if (!this.isLoaded) return;
    try {
      const payload = {
        examDates: this.state.examDates,
        toggles: this.state.toggles,
        customTasks: this.state.customTasks,
        theoryTopics: this.state.theoryTopics,
        labTopics: this.state.labTopics,
        dailyCompletions: this.state.dailyCompletions,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  async saveToFirestore() {
    if (!this.state.user?.uid) return;
    this.state.firestoreSync.syncStatus = 'syncing';
    this.notify();

    try {
      await saveUserTrackerData(this.state.user.uid, {
        examDates: this.state.examDates,
        toggles: this.state.toggles,
        customTasks: this.state.customTasks,
        theoryTopics: this.state.theoryTopics,
        labTopics: this.state.labTopics,
        dailyCompletions: this.state.dailyCompletions,
      });

      this.state.firestoreSync.syncStatus = 'synced';
      this.state.firestoreSync.lastSyncedAt = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.state.firestoreSync.errorMessage = null;
    } catch (err) {
      console.error('Failed saving to Firestore:', err);
      this.state.firestoreSync.syncStatus = 'error';
      this.state.firestoreSync.errorMessage = err.message || 'Sync error';
    }
    this.notify();
  }

  triggerAutoSync() {
    this.saveToLocalStorage();

    if (!this.state.user?.uid) return;

    if (this.firestoreDebounceTimeout) {
      clearTimeout(this.firestoreDebounceTimeout);
    }

    this.firestoreDebounceTimeout = setTimeout(() => {
      this.saveToFirestore();
    }, 700);
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

    // Active preset schedule (used for reference / templates)
    const activeSchedule =
      activePhase.phase === 'theory-only'
        ? THEORY_ONLY_SCHEDULE
        : activePhase.phase === 'lab-sprint'
        ? LAB_SPRINT_SCHEDULE
        : PRE_LAB_SCHEDULE;

    // Filter user tasks for the currently selected date
    const todayCustomTasks = (state.customTasks || []).filter(
      (task) => task.date === state.selectedDate
    );

    const completedScheduleIds = state.dailyCompletions[state.selectedDate]?.completedScheduleIds || [];
    const completedCustomTasksCount = todayCustomTasks.filter((t) => t.isCompleted).length;

    // Total tasks for selected day: custom tasks take primary priority
    const totalDayTasks = todayCustomTasks.length;
    const completedDayTasks = completedCustomTasksCount;

    const dailyScheduleProgress = {
      completed: completedDayTasks,
      total: totalDayTasks,
      percentage: totalDayTasks > 0 ? Math.round((completedDayTasks / totalDayTasks) * 100) : 0,
      completedScheduleIds,
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
      todayCustomTasks,
      dailyScheduleProgress,
      theoryProgress,
      madLabProgress,
      dsLabProgress,
      gamification,
      syncState: {
        isConnected: state.firestoreSync.isConnected,
        syncStatus: state.firestoreSync.syncStatus,
        lastSyncedAt: state.firestoreSync.lastSyncedAt,
        errorMessage: state.firestoreSync.errorMessage,
        userEmail: state.firestoreSync.userEmail,
      },
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

  // --- Dynamic Custom Task Methods ---

  addCustomTask(task) {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: task.title,
      subject: task.subject || 'General Study',
      date: task.date || this.state.selectedDate,
      timeSlot: task.timeSlot || 'Flexible / All Day',
      category: task.category || 'theory',
      priority: task.priority || 'Medium',
      isCompleted: Boolean(task.isCompleted),
      notes: task.notes || '',
      createdAt: new Date().toISOString(),
    };
    this.state.customTasks.push(newTask);
    showToast(`Task "<b>${newTask.title}</b>" added to schedule!`, 'success');
    this.triggerAutoSync();
    this.notify();
  }

  updateCustomTask(id, updates) {
    let newlyDone = false;
    let isEarly = false;

    this.state.customTasks = this.state.customTasks.map((task) => {
      if (task.id === id) {
        const isDone = updates.isCompleted !== undefined ? updates.isCompleted : task.isCompleted;
        if (isDone && !task.isCompleted) {
          newlyDone = true;
          const todayStr = getTodayKolkata();
          if (task.date && todayStr <= task.date) isEarly = true;
        }
        return {
          ...task,
          ...updates,
          completedAt: isDone ? task.completedAt || new Date().toISOString() : undefined,
        };
      }
      return task;
    });

    if (newlyDone) {
      if (isEarly) {
        showToast(
          '<span class="font-bold text-amber-400 font-mono">+60 XP!</span> Task completed with <span class="text-amber-300 font-semibold">+20 Early Bonus 🎯</span>',
          'bonus'
        );
      } else {
        showToast('<span class="font-bold text-emerald-400 font-mono">+40 XP</span> Task completed! 🔥', 'xp');
      }
    }

    this.triggerAutoSync();
    this.notify();
  }

  toggleCustomTask(id) {
    const task = this.state.customTasks.find((t) => t.id === id);
    if (!task) return;
    this.updateCustomTask(id, { isCompleted: !task.isCompleted });
  }

  deleteCustomTask(id) {
    const task = this.state.customTasks.find((t) => t.id === id);
    this.state.customTasks = this.state.customTasks.filter((t) => t.id !== id);
    if (task) {
      showToast(`Task "<b>${task.title}</b>" deleted.`, 'info');
    }
    this.triggerAutoSync();
    this.notify();
  }

  /**
   * Seed a set of recommended timetable tasks for a specific date
   * so users aren't faced with an empty screen if they want a starting plan
   */
  seedRecommendedSchedule(targetDate = null) {
    const date = targetDate || this.state.selectedDate;
    const defaultBlocks = [
      {
        title: 'Morning Routine & Mindset',
        timeSlot: '06:00–07:00 AM',
        category: 'break',
        priority: 'Low',
        subject: 'General Study / Practice',
      },
      {
        title: 'Deep Focus: Theory & PYQ Analysis',
        timeSlot: '07:00–09:00 AM',
        category: 'theory',
        priority: 'High',
        subject: 'Data Science and Machine Learning',
      },
      {
        title: 'Breakfast & Energy Break',
        timeSlot: '09:00–10:00 AM',
        category: 'break',
        priority: 'Low',
        subject: 'General Study / Practice',
      },
      {
        title: 'Algorithms & Problem Solving Session',
        timeSlot: '10:00 AM–12:00 PM',
        category: 'theory',
        priority: 'High',
        subject: 'Design and Analysis of Algorithms (DAA)',
      },
      {
        title: 'Lunch & Power Nap',
        timeSlot: '12:00–01:30 PM',
        category: 'break',
        priority: 'Low',
        subject: 'General Study / Practice',
      },
      {
        title: 'Lab Practical & Program Execution',
        timeSlot: '01:30–03:30 PM',
        category: 'lab',
        priority: 'High',
        subject: 'Mobile Application Development (MAD) Lab',
      },
      {
        title: 'Active Recall & Topic Revision',
        timeSlot: '04:00–06:00 PM',
        category: 'revision',
        priority: 'Medium',
        subject: 'Operations Research (OR)',
      },
      {
        title: 'Night PYQ Analysis & Next-Day Planning',
        timeSlot: '09:30–10:30 PM',
        category: 'pyq',
        priority: 'High',
        subject: 'Deep Learning',
      },
    ];

    const newTasks = defaultBlocks.map((b) => ({
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: b.title,
      subject: b.subject,
      date,
      timeSlot: b.timeSlot,
      category: b.category,
      priority: b.priority,
      isCompleted: false,
      notes: 'Generated from recommended MCA study timetable template',
      createdAt: new Date().toISOString(),
    }));

    this.state.customTasks.push(...newTasks);
    showToast(`Seeded ${newTasks.length} study tasks for <b>${date}</b>!`, 'success');
    this.triggerAutoSync();
    this.notify();
  }

  clearDayTasks(targetDate = null) {
    const date = targetDate || this.state.selectedDate;
    const initialCount = this.state.customTasks.length;
    this.state.customTasks = this.state.customTasks.filter((t) => t.date !== date);
    const removedCount = initialCount - this.state.customTasks.length;
    showToast(`Cleared ${removedCount} tasks for ${date}.`, 'info');
    this.triggerAutoSync();
    this.notify();
  }

  // --- Legacy Presets & Completions Compatibility ---

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
      showToast('<span class="font-bold text-amber-400 font-mono">+15 XP</span> Schedule block completed! 🔥', 'xp');
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

  // --- Theory & Lab Topic Trackers ---

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
        showToast(
          '<span class="font-bold text-emerald-400 font-mono">+75 XP!</span> Theory topic completed with <span class="text-amber-300 font-semibold">+25 Early Bonus 🎯</span>',
          'bonus'
        );
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
        showToast(
          '<span class="font-bold text-cyan-400 font-mono">+60 XP!</span> Lab exercise completed with <span class="text-amber-300 font-semibold">+20 Early Bonus 🎯</span>',
          'bonus'
        );
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

  // --- Auth Actions ---

  async register(email, password, displayName) {
    return await registerWithEmail(email, password, displayName);
  }

  async login(email, password) {
    return await loginWithEmail(email, password);
  }

  async signInWithGoogle() {
    return await loginWithGoogle();
  }

  async signOutUser() {
    await logoutUser();
    this.state.user = null;
    this.state.firestoreSync.isConnected = false;
    this.state.firestoreSync.syncStatus = 'idle';
    showToast('Signed out successfully.', 'info');
    this.notify();
  }

  // --- Excel Import / Export ---

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
      return {
        success: true,
        countTheory: (parsed.theoryTopics || []).length,
        countLab: (parsed.labTopics || []).length,
      };
    } catch (err) {
      console.error('Import error:', err);
      throw err;
    }
  }

  // --- Confirm Dialog ---

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
