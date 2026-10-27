/**
 * Gamification Service for MCA Study Tracker
 * Handles XP scoring, Streak calculation, Level progression, and Milestones/Badges
 */

import { getTodayKolkata, getCalendarDaysDiff, addDaysToDateStr } from '../utils/dateUtils.js';

export const XP_CONFIG = {
  THEORY_TOPIC_DONE: 50,
  THEORY_EARLY_BONUS: 25,
  LAB_TOPIC_DONE: 40,
  LAB_EARLY_BONUS: 20,
  SCHEDULE_ITEM_DONE: 15,
  FULL_DAY_SCHEDULE_BONUS: 30,
};

export const LEVELS = [
  { level: 1, minXp: 0, title: 'Novice Scholar', icon: 'bookOpen' },
  { level: 2, minXp: 150, title: 'Study Initiate', icon: 'sparkles' },
  { level: 3, minXp: 350, title: 'Apprentice Analyst', icon: 'target' },
  { level: 4, minXp: 650, title: 'Diligent Student', icon: 'flame' },
  { level: 5, minXp: 1050, title: 'Lab Specialist', icon: 'flaskConical' },
  { level: 6, minXp: 1600, title: 'Theory Virtuoso', icon: 'medal' },
  { level: 7, minXp: 2300, title: 'Master of Algorithms', icon: 'zap' },
  { level: 8, minXp: 3200, title: 'Data Champion', icon: 'award' },
  { level: 9, minXp: 4300, title: 'Grand Academic', icon: 'shield' },
  { level: 10, minXp: 5600, title: 'MCA Exam Conqueror', icon: 'trophy' },
];

export const BADGE_DEFINITIONS = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first study task, schedule block, or topic',
    icon: 'sparkles',
    category: 'starter',
  },
  {
    id: 'streak_3',
    title: 'Spark of Habit',
    description: 'Maintain a 3-day active study streak',
    icon: 'flame',
    category: 'streak',
  },
  {
    id: 'streak_7',
    title: '7-Day Titan',
    description: 'Maintain an uninterrupted 7-day study streak',
    icon: 'flame',
    category: 'streak',
  },
  {
    id: 'streak_14',
    title: 'Fortnight Warrior',
    description: 'Maintain a 14-day study streak across exam prep',
    icon: 'zap',
    category: 'streak',
  },
  {
    id: 'early_bird',
    title: 'Ahead of Schedule',
    description: 'Complete a topic before or on its target deadline for bonus points',
    icon: 'target',
    category: 'speed',
  },
  {
    id: 'theory_scholar',
    title: 'Theory Virtuoso',
    description: 'Complete 10 or more theory topics',
    icon: 'bookOpen',
    category: 'mastery',
  },
  {
    id: 'subject_master',
    title: 'Subject Champion',
    description: 'Complete all topics in at least one theory subject syllabus',
    icon: 'medal',
    category: 'mastery',
  },
  {
    id: 'lab_prodigy',
    title: 'Lab Prodigy',
    description: 'Complete 5 or more practical lab exercises or viva items',
    icon: 'flaskConical',
    category: 'mastery',
  },
  {
    id: 'flawless_day',
    title: 'Flawless Day',
    description: 'Complete 100% of all scheduled time blocks in a single day',
    icon: 'star',
    category: 'discipline',
  },
  {
    id: 'centurion',
    title: '1,000 XP Centurion',
    description: 'Accumulate 1,000 total study experience points',
    icon: 'award',
    category: 'xp',
  },
  {
    id: 'exam_ready',
    title: 'Exam Conqueror',
    description: 'Mark an official exam as completed or reach 80% total progress',
    icon: 'trophy',
    category: 'milestone',
  },
];

/**
 * Computes consecutive days study streak from completed tasks and topics
 */
export function calculateStudyStreak(state) {
  const { dailyCompletions = {}, theoryTopics = [], labTopics = [] } = state;
  const todayStr = getTodayKolkata();

  const activeDates = new Set();

  // 1. Daily schedule completions
  for (const [date, record] of Object.entries(dailyCompletions)) {
    if (record && Array.isArray(record.completedScheduleIds) && record.completedScheduleIds.length > 0) {
      activeDates.add(date);
    }
  }

  // 2. Theory topics completed
  for (const topic of theoryTopics) {
    if (topic.status === 'Done') {
      if (topic.completedAt) {
        activeDates.add(topic.completedAt.slice(0, 10));
      } else if (topic.targetDate) {
        activeDates.add(topic.targetDate);
      }
    }
  }

  // 3. Lab topics completed
  for (const lab of labTopics) {
    if (lab.status === 'Done') {
      if (lab.completedAt) {
        activeDates.add(lab.completedAt.slice(0, 10));
      } else if (lab.targetDate) {
        activeDates.add(lab.targetDate);
      }
    }
  }

  if (activeDates.size === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      activeToday: false,
      activeDates: [],
    };
  }

  const sortedDates = Array.from(activeDates).sort();
  const activeToday = activeDates.has(todayStr);

  // Compute current streak:
  // If active today, count backwards from today.
  // If not active today, check if yesterday was active (grace period). If yes, count backwards from yesterday.
  let currentStreak = 0;
  let checkDate = activeToday ? todayStr : addDaysToDateStr(todayStr, -1);

  while (activeDates.has(checkDate)) {
    currentStreak++;
    checkDate = addDaysToDateStr(checkDate, -1);
  }

  // Calculate longest streak in history
  let longestStreak = 0;
  let runningStreak = 0;
  let prevDate = null;

  for (const date of sortedDates) {
    if (!prevDate) {
      runningStreak = 1;
    } else {
      const diff = getCalendarDaysDiff(prevDate, date);
      if (diff === 1) {
        runningStreak++;
      } else if (diff > 1) {
        runningStreak = 1;
      }
    }
    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
    prevDate = date;
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    activeToday,
    activeDates: sortedDates,
  };
}

/**
 * Calculates XP points, Level, and Badges earned
 */
export function calculateGamification(state) {
  const {
    theoryTopics = [],
    labTopics = [],
    dailyCompletions = {},
    examDates = {},
    theoryProgress = { completed: 0, total: 0 },
    madLabProgress = { completed: 0, total: 0 },
    dsLabProgress = { completed: 0, total: 0 },
  } = state;

  let theoryXp = 0;
  let theoryEarlyBonusXp = 0;
  let labXp = 0;
  let labEarlyBonusXp = 0;
  let scheduleXp = 0;
  let flawlessDayBonusXp = 0;

  let earlyTheoryCount = 0;
  let earlyLabCount = 0;
  let flawlessDayCount = 0;

  // Theory Topics
  for (const t of theoryTopics) {
    if (t.status === 'Done') {
      theoryXp += XP_CONFIG.THEORY_TOPIC_DONE;
      // Bonus if completed on or before target date
      if (t.targetDate && t.completedAt) {
        const compDate = t.completedAt.slice(0, 10);
        if (compDate <= t.targetDate) {
          theoryEarlyBonusXp += XP_CONFIG.THEORY_EARLY_BONUS;
          earlyTheoryCount++;
        }
      } else if (t.targetDate) {
        // If completed with target date set
        theoryEarlyBonusXp += XP_CONFIG.THEORY_EARLY_BONUS;
        earlyTheoryCount++;
      }
    }
  }

  // Lab Topics
  for (const l of labTopics) {
    if (l.status === 'Done') {
      labXp += XP_CONFIG.LAB_TOPIC_DONE;
      if (l.targetDate && l.completedAt) {
        const compDate = l.completedAt.slice(0, 10);
        if (compDate <= l.targetDate) {
          labEarlyBonusXp += XP_CONFIG.LAB_EARLY_BONUS;
          earlyLabCount++;
        }
      } else if (l.targetDate) {
        labEarlyBonusXp += XP_CONFIG.LAB_EARLY_BONUS;
        earlyLabCount++;
      }
    }
  }

  // Daily Schedule items
  let totalScheduleItemsDone = 0;
  for (const [date, record] of Object.entries(dailyCompletions)) {
    if (record && Array.isArray(record.completedScheduleIds)) {
      const count = record.completedScheduleIds.length;
      totalScheduleItemsDone += count;
      scheduleXp += count * XP_CONFIG.SCHEDULE_ITEM_DONE;

      // Check flawless day: completed >= 8 schedule items on that day
      if (count >= 8) {
        flawlessDayBonusXp += XP_CONFIG.FULL_DAY_SCHEDULE_BONUS;
        flawlessDayCount++;
      }
    }
  }

  const totalXp =
    theoryXp +
    theoryEarlyBonusXp +
    labXp +
    labEarlyBonusXp +
    scheduleXp +
    flawlessDayBonusXp;

  // Resolve Level
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || null;
      break;
    }
  }

  let levelProgressPercent = 100;
  let xpIntoLevel = 0;
  let xpForCurrentLevel = 0;

  if (nextLevel) {
    const range = nextLevel.minXp - currentLevel.minXp;
    xpIntoLevel = totalXp - currentLevel.minXp;
    xpForCurrentLevel = range;
    levelProgressPercent = Math.min(100, Math.round((xpIntoLevel / range) * 100));
  }

  // Calculate Streak
  const streakData = calculateStudyStreak(state);

  // Evaluate Subject completion for subject_master badge
  const subjectGroups = {};
  for (const t of theoryTopics) {
    const s = t.subject || 'Other';
    if (!subjectGroups[s]) subjectGroups[s] = { total: 0, done: 0 };
    subjectGroups[s].total++;
    if (t.status === 'Done') subjectGroups[s].done++;
  }
  const hasCompletedAnySubject = Object.values(subjectGroups).some(
    (g) => g.total >= 3 && g.done === g.total
  );

  // Check official exam completed
  const hasCompletedExam =
    Object.values(examDates.theoryExams || {}).some((e) => e.isCompleted) ||
    Object.values(examDates.labExams || {}).some((e) => e.isCompleted);

  const completedTheoryCount = theoryTopics.filter((t) => t.status === 'Done').length;
  const completedLabCount = labTopics.filter((l) => l.status === 'Done').length;

  // Evaluate Badges
  const badges = BADGE_DEFINITIONS.map((b) => {
    let isUnlocked = false;

    switch (b.id) {
      case 'first_step':
        isUnlocked = totalXp > 0 || completedTheoryCount > 0 || completedLabCount > 0;
        break;
      case 'streak_3':
        isUnlocked = streakData.longestStreak >= 3;
        break;
      case 'streak_7':
        isUnlocked = streakData.longestStreak >= 7;
        break;
      case 'streak_14':
        isUnlocked = streakData.longestStreak >= 14;
        break;
      case 'early_bird':
        isUnlocked = earlyTheoryCount > 0 || earlyLabCount > 0;
        break;
      case 'theory_scholar':
        isUnlocked = completedTheoryCount >= 10;
        break;
      case 'subject_master':
        isUnlocked = hasCompletedAnySubject;
        break;
      case 'lab_prodigy':
        isUnlocked = completedLabCount >= 5;
        break;
      case 'flawless_day':
        isUnlocked = flawlessDayCount > 0;
        break;
      case 'centurion':
        isUnlocked = totalXp >= 1000;
        break;
      case 'exam_ready':
        isUnlocked = hasCompletedExam || (theoryProgress.percentage >= 80 && (madLabProgress.percentage >= 80 || dsLabProgress.percentage >= 80));
        break;
      default:
        isUnlocked = false;
    }

    return {
      ...b,
      isUnlocked,
    };
  });

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return {
    xp: totalXp,
    breakdown: {
      theoryXp,
      theoryEarlyBonusXp,
      labXp,
      labEarlyBonusXp,
      scheduleXp,
      flawlessDayBonusXp,
      earlyBonusesAwarded: earlyTheoryCount + earlyLabCount,
      totalScheduleItemsDone,
    },
    level: {
      ...currentLevel,
      xpIntoLevel,
      xpForCurrentLevel,
      nextLevelMinXp: nextLevel ? nextLevel.minXp : null,
      progressPercent: levelProgressPercent,
      remainingXpToNext: nextLevel ? Math.max(0, nextLevel.minXp - totalXp) : 0,
    },
    streak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    activeToday: streakData.activeToday,
    activeDates: streakData.activeDates,
    badges,
    unlockedBadgeCount: unlockedCount,
    totalBadges: badges.length,
  };
}
