import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBTNZComhLG3yXn52Z41iQJR2x0B3FV8Us",
  authDomain: "study-tracker-b70c8.firebaseapp.com",
  projectId: "study-tracker-b70c8",
  storageBucket: "study-tracker-b70c8.firebasestorage.app",
  messagingSenderId: "12217451803",
  appId: "1:12217451803:web:4e91edcc37ab74bf06ffbe",
  measurementId: "G-Q5CDVFEV30",
};

// Initialize or reuse app
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
