import { app, analytics } from './firebase-config.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export { analytics };

// Debug: confirm which Firebase project this page is connected to.
// (This helps diagnose "Missing or insufficient permissions" caused by deploying rules to the wrong project.)
try {
  if (typeof window !== 'undefined') {
    console.log('[Firebase] projectId:', app?.options?.projectId);
  }
} catch {
  // ignore
}

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
  if (auth) window.auth = auth;
  if (db) window.db = db;
}


