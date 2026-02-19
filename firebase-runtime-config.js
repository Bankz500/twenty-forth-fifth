// Expose Firebase config at runtime for non-module scripts (e.g. classic scripts like live-chat-widget.js).
// Values are injected by Vite from env vars at build/dev time (Vercel sets these in Project Settings → Environment Variables).
//
// Required env vars:
// - VITE_FIREBASE_API_KEY
// - VITE_FIREBASE_AUTH_DOMAIN
// - VITE_FIREBASE_PROJECT_ID
// - VITE_FIREBASE_STORAGE_BUCKET
// - VITE_FIREBASE_MESSAGING_SENDER_ID
// - VITE_FIREBASE_APP_ID
// - VITE_FIREBASE_MEASUREMENT_ID (optional)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Make available to classic scripts.
if (typeof window !== "undefined") {
  window.__FIREBASE_CONFIG__ = firebaseConfig;
}

export default firebaseConfig;
