import { app, analytics } from './firebase-config.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };

// Lightweight cross-page cache for user profile document (optional, but speeds up navigation)
const USER_DATA_KEY = 'beal_offshore_user_data';

export function cacheUserData(userData) {
  try {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch {
    // ignore
  }
}

export function getCachedUserData() {
  try {
    const raw = sessionStorage.getItem(USER_DATA_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCachedUserData() {
  try {
    sessionStorage.removeItem(USER_DATA_KEY);
  } catch {
    // ignore
  }
}

// Back-compat for pages/scripts that expect globals
if (typeof window !== 'undefined') {
  window.auth = auth;
  window.db = db;
}


