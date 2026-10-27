export const TIMEZONE = 'Asia/Kolkata';

/**
 * Returns today's date in YYYY-MM-DD format according to Asia/Kolkata.
 */
export function getTodayKolkata() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date());
}

/**
 * Returns tomorrow's date in YYYY-MM-DD format in Asia/Kolkata.
 */
export function getTomorrowKolkata() {
  const todayStr = getTodayKolkata();
  return addDaysToDateStr(todayStr, 1);
}

/**
 * Adds n days to a YYYY-MM-DD string.
 */
export function addDaysToDateStr(dateStr, days) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Calculates calendar days difference: targetDate - baseDate
 */
export function getCalendarDaysDiff(baseDateStr, targetDateStr) {
  if (!baseDateStr || !targetDateStr) return NaN;
  const [y1, m1, d1] = baseDateStr.split('-').map(Number);
  const [y2, m2, d2] = targetDateStr.split('-').map(Number);
  
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utc2 - utc1) / msPerDay);
}

/**
 * Formats a YYYY-MM-DD string into user-friendly text like:
 * "Monday, 26 October 2026"
 */
export function formatDateFull(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Formats a YYYY-MM-DD string into compact text like:
 * "Mon, 26 Oct"
 */
export function formatDateCompact(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Formats current time in Asia/Kolkata
 */
export function getCurrentTimeKolkata() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());
}

/**
 * Checks if current time in Asia/Kolkata falls within a HH:MM (24h) range
 */
export function isCurrentScheduleItem(startTime, endTime) {
  try {
    const kolkataTimeStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());

    const [curH, curM] = kolkataTimeStr.split(':').map(Number);
    const curMinutes = curH * 60 + curM;

    const [startH, startM] = startTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;

    const [endH, endM] = endTime.split(':').map(Number);
    const endMinutes = endH * 60 + endM;

    if (endMinutes < startMinutes) {
      // Overnight (e.g. 22:30 to 24:00 or 06:00)
      return curMinutes >= startMinutes || curMinutes < endMinutes;
    }
    return curMinutes >= startMinutes && curMinutes < endMinutes;
  } catch {
    return false;
  }
}

/**
 * Determines whether right now in Asia/Kolkata is the 10:00–10:30 PM PYQ planning window
 */
export function isNightPYQWindow() {
  try {
    const kolkataTimeStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
    const [h, m] = kolkataTimeStr.split(':').map(Number);
    const mins = h * 60 + m;
    return mins >= 22 * 60 && mins <= 22 * 60 + 35; // 22:00 to 22:35
  } catch {
    return false;
  }
}

/**
 * Resolves active phase
 */
export function resolveActivePhase(toggles, examDates, todayStr = getTodayKolkata()) {
  if (toggles.labExamsCompleted) {
    return {
      phase: 'theory-only',
      badgeLabel: 'Phase 2: Theory-Only',
      headline: 'Post-Lab Theory Intensive',
      description: 'Lab exams are complete. Full daily timetable is dedicated to Theory Note Preparation and Mastery.',
      priorityReason: 'User enabled "Lab Exams Completed" toggle.',
    };
  }

  if (toggles.labDatesAnnounced) {
    const candidates = [];

    const madExam = examDates.labExams?.madLab;
    if (madExam && madExam.date && !madExam.isCompleted) {
      const diff = getCalendarDaysDiff(todayStr, madExam.date);
      if (diff >= 0 && diff <= 2) {
        candidates.push({
          labKey: 'mad',
          name: 'Mobile Application Development (MAD) Lab',
          date: madExam.date,
          diff,
        });
      }
    }

    const dsExam = examDates.labExams?.dsLab;
    if (dsExam && dsExam.date && !dsExam.isCompleted) {
      const diff = getCalendarDaysDiff(todayStr, dsExam.date);
      if (diff >= 0 && diff <= 2) {
        candidates.push({
          labKey: 'ds',
          name: 'Data Science Lab',
          date: dsExam.date,
          diff,
        });
      }
    }

    if (candidates.length > 0) {
      candidates.sort((a, b) => a.diff - b.diff);
      const chosen = candidates[0];

      let reason = '';
      if (chosen.diff === 0) {
        reason = `${chosen.name} exam is TODAY! Full day focus on final revision and viva.`;
      } else if (chosen.diff === 1) {
        reason = `${chosen.name} exam is TOMORROW (${formatDateCompact(chosen.date)}). Priority 2-day sprint active.`;
      } else {
        reason = `${chosen.name} exam is in 2 days (${formatDateCompact(chosen.date)}). 2-day full lab prep timetable activated.`;
      }

      if (candidates.length > 1) {
        const other = candidates[1];
        reason += ` Nearer exam (${chosen.labKey.toUpperCase()}) prioritized over ${other.labKey.toUpperCase()} (${other.diff} days away).`;
      }

      return {
        phase: 'lab-sprint',
        badgeLabel: 'Phase: Lab Sprint',
        headline: `2-Day Sprint — ${chosen.name}`,
        description: `Dedicated full-day lab preparation schedule for ${chosen.name}.`,
        activeLabTarget: chosen.labKey,
        activeLabName: chosen.name,
        priorityReason: reason,
        isExamTomorrow: chosen.diff === 1,
        daysToSprintExam: chosen.diff,
      };
    }
  }

  return {
    phase: 'pre-lab',
    badgeLabel: 'Phase 1: Pre-Lab',
    headline: 'Pre-Lab Balanced Timetable',
    description: 'Balanced daily preparation combining morning Theory PYQs & notes with afternoon/evening Lab practice.',
    priorityReason: toggles.labDatesAnnounced
      ? 'Lab dates announced, but current date is outside the 2-day pre-exam sprint window.'
      : 'Lab dates unconfirmed. Following standard pre-lab timetable.',
  };
}

/**
 * Format countdown text
 */
export function formatExamCountdown(examDateStr, todayStr = getTodayKolkata()) {
  if (!examDateStr) {
    return {
      text: 'Date unconfirmed',
      days: NaN,
      isUrgent: false,
      isToday: false,
      isTomorrow: false,
      isPassed: false,
    };
  }

  const diff = getCalendarDaysDiff(todayStr, examDateStr);

  if (diff < 0) {
    return {
      text: `${Math.abs(diff)} day${Math.abs(diff) === 1 ? '' : 's'} ago`,
      days: diff,
      isUrgent: false,
      isToday: false,
      isTomorrow: false,
      isPassed: true,
    };
  }

  if (diff === 0) {
    return {
      text: 'TODAY',
      days: 0,
      isUrgent: true,
      isToday: true,
      isTomorrow: false,
      isPassed: false,
    };
  }

  if (diff === 1) {
    return {
      text: 'TOMORROW',
      days: 1,
      isUrgent: true,
      isToday: false,
      isTomorrow: true,
      isPassed: false,
    };
  }

  return {
    text: `In ${diff} days`,
    days: diff,
    isUrgent: diff <= 5,
    isToday: false,
    isTomorrow: false,
    isPassed: false,
  };
}
