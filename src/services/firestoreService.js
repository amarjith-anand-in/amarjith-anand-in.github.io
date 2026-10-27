import { db } from '../firebase.js';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

/**
 * Fetch user document from Firestore
 */
export async function fetchUserTrackerData(uid) {
  if (!uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching Firestore user data:', error);
    return null;
  }
}

/**
 * Save / Merge entire study tracker state into Firestore
 */
export async function saveUserTrackerData(uid, data) {
  if (!uid) return;
  try {
    const userDocRef = doc(db, 'users', uid);
    // sanitize data before saving
    const cleanData = {
      examDates: data.examDates || {},
      toggles: data.toggles || {},
      customTasks: data.customTasks || [],
      theoryTopics: data.theoryTopics || [],
      labTopics: data.labTopics || [],
      dailyCompletions: data.dailyCompletions || {},
      gamification: data.gamification || {},
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userDocRef, cleanData, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving Firestore user data:', error);
    throw error;
  }
}

/**
 * Real-time listener for user tracker data
 */
export function subscribeToUserTrackerData(uid, onUpdate, onError) {
  if (!uid) return () => {};
  const userDocRef = doc(db, 'users', uid);
  return onSnapshot(
    userDocRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data());
      } else {
        // Document doesn't exist yet, pass empty or null
        onUpdate(null);
      }
    },
    (err) => {
      console.warn('Firestore subscription error:', err);
      if (onError) onError(err);
    }
  );
}
