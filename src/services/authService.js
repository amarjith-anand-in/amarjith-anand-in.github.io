import {
  auth,
  googleProvider,
} from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

/**
 * Register a new user with Email and Password
 */
export async function registerWithEmail(email, password, displayName = '') {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName.trim()) {
    try {
      await updateProfile(userCredential.user, { displayName: displayName.trim() });
    } catch (e) {
      console.warn('Could not set displayName on auth profile:', e);
    }
  }
  return userCredential.user;
}

/**
 * Sign in existing user with Email and Password
 */
export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return userCredential.user;
}

/**
 * Sign in or sign up with Google popup
 */
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Send password reset email
 */
export async function sendResetEmail(email) {
  return await sendPasswordResetEmail(auth, email.trim());
}

/**
 * Sign out current user
 */
export async function logoutUser() {
  return await signOut(auth);
}

/**
 * Listen to auth changes
 */
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
