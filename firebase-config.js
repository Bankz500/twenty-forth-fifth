// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

function missingEnvKeys() {
  const required = [
    ["VITE_FIREBASE_API_KEY", firebaseConfig.apiKey],
    ["VITE_FIREBASE_AUTH_DOMAIN", firebaseConfig.authDomain],
    ["VITE_FIREBASE_PROJECT_ID", firebaseConfig.projectId],
    ["VITE_FIREBASE_STORAGE_BUCKET", firebaseConfig.storageBucket],
    ["VITE_FIREBASE_MESSAGING_SENDER_ID", firebaseConfig.messagingSenderId],
    ["VITE_FIREBASE_APP_ID", firebaseConfig.appId],
  ];
  return required
    .filter(([, v]) => typeof v !== "string" || v.trim() === "")
    .map(([k]) => k);
}

const missing = missingEnvKeys();

// Initialize Firebase (only when config is present)
let app = null;
let analytics = null;

if (missing.length) {
  // Avoid confusing Firebase errors like "API key not valid" by failing early with a clear message.
  // Fix: set env vars locally in `.env.local` and in Vercel Project Settings → Environment Variables, then restart dev server.
  console.error(
    `[Firebase] Missing env vars: ${missing.join(", ")}. ` +
    `Set them and restart the dev server (Vite reads VITE_* only at startup).`
  );
} else {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("[Firebase] initializeApp failed:", e);
  }

  // Analytics is optional; also don't crash the app if analytics config fetch fails.
  // (This error is often the first symptom when API key/env vars are wrong.)
  try {
    const hasMeasurementId =
      typeof firebaseConfig.measurementId === "string" &&
      firebaseConfig.measurementId.trim() !== "";
    if (app && typeof window !== "undefined" && hasMeasurementId) {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    console.warn("[Firebase] Analytics init failed (safe to ignore in dev):", e);
    analytics = null;
  }
}

export default firebaseConfig;
export { app, analytics };