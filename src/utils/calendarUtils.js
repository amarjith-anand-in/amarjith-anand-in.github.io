/**
 * Calendar Utilities for MCA Study Tracker
 * Generates month grids, evaluates prep windows, exams, and daily activities for each date
 */

import {
  getTodayKolkata,
  getCalendarDaysDiff,
  resolveActivePhase,
} from './dateUtils.js';

/**
 * Builds the month calendar matrix (array of weeks, each containing 7 day objects)
 * Uses Monday as first day of week (standard academic planner format)
 */
export function getMonthDaysMatrix(year, monthIndex) {
  const firstDay = new Date(Date.UTC(year, monthIndex, 1));
  const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0));
  const totalDays = lastDay.getUTCDate();

  // Day of week for 1st of month: 0=Sun, 1=Mon, ..., 6=Sat
  // Convert so Monday is 0, Sunday is 6
  let firstDayOfWeek = firstDay.getUTCDay() - 1;
  if (firstDayOfWeek === -1) firstDayOfWeek = 6;

  const days = [];

  // Previous month trailing days
  const prevMonthLastDay = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevYear = monthIndex === 0 ? year - 1 : year;
    const mStr = String(prevMonth + 1).padStart(2, '0');
    const dStr = String(dayNum).padStart(2, '0');
    days.push({
      dateStr: `${prevYear}-${mStr}-${dStr}`,
      dayNumber: dayNum,
      isCurrentMonth: false,
      year: prevYear,
      monthIndex: prevMonth,
    });
  }

  // Current month days
  const curMStr = String(monthIndex + 1).padStart(2, '0');
  for (let d = 1; d <= totalDays; d++) {
    const dStr = String(d).padStart(2, '0');
    days.push({
      dateStr: `${year}-${curMStr}-${dStr}`,
      dayNumber: d,
      isCurrentMonth: true,
      year,
      monthIndex,
    });
  }

  // Next month leading days to complete full grid (multiples of 7)
  const remaining = (7 - (days.length % 7)) % 7;
  const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
  const nextYear = monthIndex === 11 ? year + 1 : year;
  const nextMStr = String(nextMonth + 1).padStart(2, '0');
  for (let d = 1; d <= remaining; d++) {
    const dStr = String(d).padStart(2, '0');
    days.push({
      dateStr: `${nextYear}-${nextMStr}-${dStr}`,
      dayNumber: d,
      isCurrentMonth: false,
      year: nextYear,
      monthIndex: nextMonth,
    });
  }

  // Chunk into 7-day weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

/**
 * Resolves all events, prep windows, and activities for a given dateStr
 */
export function resolveDateDetails(dateStr, state) {
  const {
    examDates = {},
    toggles = {},
    theoryTopics = [],
    labTopics = [],
    dailyCompletions = {},
  } = state;

  const todayStr = getTodayKolkata();
  const isToday = dateStr === todayStr;

  // 1. Check for Theory Exams on this date
  const theoryExamsOnDate = [];
  if (examDates.theoryExams) {
    for (const [key, exam] of Object.entries(examDates.theoryExams)) {
      if (exam && exam.date === dateStr) {
        theoryExamsOnDate.push({ ...exam, key, type: 'theory' });
      }
    }
  }

  // 2. Check for Lab Exams on this date
  const labExamsOnDate = [];
  if (examDates.labExams) {
    for (const [key, exam] of Object.entries(examDates.labExams)) {
      if (exam && exam.date === dateStr) {
        labExamsOnDate.push({ ...exam, key, type: 'lab' });
      }
    }
  }

  // 3. Resolve Schedule Window for this date
  let prepWindow = null;
  const studyLeaveStart = examDates.studyLeaveStart || '2026-10-29';

  if (theoryExamsOnDate.length > 0) {
    prepWindow = {
      type: 'exam-theory',
      label: 'Theory Exam Day',
      description: `${theoryExamsOnDate.map((e) => e.code).join(', ')} Final Examination`,
      colorClass: 'bg-rose-950/80 text-rose-300 border-rose-800',
      pillClass: 'bg-rose-900/90 text-rose-200 border-rose-700',
      bgDayHighlight: 'bg-rose-950/20 border-rose-800/60',
    };
  } else if (labExamsOnDate.length > 0) {
    prepWindow = {
      type: 'exam-lab',
      label: 'Lab Exam Day',
      description: `${labExamsOnDate.map((e) => e.code).join(', ')} Lab Practical & Viva Exam`,
      colorClass: 'bg-purple-950/80 text-purple-300 border-purple-800',
      pillClass: 'bg-purple-900/90 text-purple-200 border-purple-700',
      bgDayHighlight: 'bg-purple-950/20 border-purple-800/60',
    };
  } else {
    // Check if in 2-Day Lab Sprint window
    let inLabSprint = false;
    let sprintLabName = '';

    if (toggles.labDatesAnnounced && examDates.labExams) {
      for (const [key, exam] of Object.entries(examDates.labExams)) {
        if (exam && exam.date && !exam.isCompleted) {
          const diff = getCalendarDaysDiff(dateStr, exam.date);
          if (diff > 0 && diff <= 2) {
            inLabSprint = true;
            sprintLabName = exam.name;
            break;
          }
        }
      }
    }

    if (inLabSprint) {
      prepWindow = {
        type: 'prep-sprint',
        label: 'Lab Sprint Window',
        description: `Dedicated 2-Day full practical sprint for ${sprintLabName}`,
        colorClass: 'bg-amber-950/60 text-amber-300 border-amber-800/80',
        pillClass: 'bg-amber-900/60 text-amber-200 border-amber-700',
        bgDayHighlight: 'bg-amber-950/15 border-amber-800/40',
      };
    } else if (toggles.labExamsCompleted) {
      prepWindow = {
        type: 'prep-theory',
        label: 'Theory-Only Intensive',
        description: 'Post-Lab Phase 2: Full daily focus on Theory PYQs, notes, and recall',
        colorClass: 'bg-blue-950/60 text-blue-300 border-blue-800/80',
        pillClass: 'bg-blue-900/60 text-blue-200 border-blue-700',
        bgDayHighlight: 'bg-blue-950/15 border-blue-800/40',
      };
    } else if (dateStr >= studyLeaveStart) {
      prepWindow = {
        type: 'prep-prelab',
        label: 'Pre-Lab Balanced Prep',
        description: 'Phase 1: Balanced daily schedule (Theory mornings + Lab afternoons)',
        colorClass: 'bg-neutral-900 text-neutral-300 border-neutral-700',
        pillClass: 'bg-neutral-800 text-neutral-300 border-neutral-700',
        bgDayHighlight: 'bg-neutral-900/40 border-neutral-800',
      };
    } else {
      prepWindow = {
        type: 'pre-leave',
        label: 'Pre-Study Leave',
        description: 'Semester classes and early study planning period',
        colorClass: 'bg-neutral-950 text-neutral-500 border-neutral-800',
        pillClass: 'bg-neutral-950 text-neutral-500 border-neutral-800',
        bgDayHighlight: '',
      };
    }
  }

  // 4. Theory Topics scheduled for this date
  const theoryTopicsOnDate = theoryTopics.filter((t) => t.targetDate === dateStr);
  const theoryDoneCount = theoryTopicsOnDate.filter((t) => t.status === 'Done').length;

  // 5. Lab Topics scheduled for this date
  const labTopicsOnDate = labTopics.filter((l) => l.targetDate === dateStr);
  const labDoneCount = labTopicsOnDate.filter((l) => l.status === 'Done').length;

  // 6. Custom tasks on this date
  const customTasksOnDate = (state.customTasks || []).filter((t) => t.date === dateStr);
  const customTasksDoneCount = customTasksOnDate.filter((t) => t.isCompleted).length;

  // 7. Daily schedule completed items
  const dayRecord = dailyCompletions[dateStr];
  const completedScheduleIds = dayRecord?.completedScheduleIds || [];
  const scheduleCompletedCount = completedScheduleIds.length;

  return {
    dateStr,
    isToday,
    theoryExams: theoryExamsOnDate,
    labExams: labExamsOnDate,
    prepWindow,
    theoryTopics: theoryTopicsOnDate,
    theoryDoneCount,
    labTopics: labTopicsOnDate,
    labDoneCount,
    customTasks: customTasksOnDate,
    customTasksDoneCount,
    scheduleCompletedCount,
    isFlawless: scheduleCompletedCount >= 8 || (customTasksOnDate.length > 0 && customTasksDoneCount === customTasksOnDate.length),
    hasActivity:
      scheduleCompletedCount > 0 ||
      customTasksOnDate.length > 0 ||
      theoryDoneCount > 0 ||
      labDoneCount > 0 ||
      theoryTopicsOnDate.length > 0 ||
      labTopicsOnDate.length > 0,
  };
}
