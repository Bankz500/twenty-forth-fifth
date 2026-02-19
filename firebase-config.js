// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3x-CZApUgkWHCjlwvFtOQhYQeY6lDwpI",
  authDomain: "twenty-forth-fifth.firebaseapp.com",
  projectId: "twenty-forth-fifth",
  storageBucket: "twenty-forth-fifth.firebasestorage.app",
  messagingSenderId: "228269383587",
  appId: "1:228269383587:web:0d6f063f221f388cd2c416",
  measurementId: "G-3X9DT5MBV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default firebaseConfig;
export { app, analytics };