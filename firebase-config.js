// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk8K22XfrsAQAX7WarxSq_BnwO1YQLDSc",
  authDomain: "twenty-third-forth-ee57c.firebaseapp.com",
  projectId: "twenty-third-forth-ee57c",
  storageBucket: "twenty-third-forth-ee57c.firebasestorage.app",
  messagingSenderId: "47210898997",
  appId: "1:47210898997:web:d25c23eee45a7660cef37c",
  measurementId: "G-ESYD665GWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default firebaseConfig;
export { app, analytics };