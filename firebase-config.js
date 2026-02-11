// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb9sVH4fMb-a5mQgcDjAfYT9RZHTb3sKE",
  authDomain: "twenty-third-forth.firebaseapp.com",
  projectId: "twenty-third-forth",
  storageBucket: "twenty-third-forth.firebasestorage.app",
  messagingSenderId: "835548579831",
  appId: "1:835548579831:web:5259f071b50341af28d0f2",
  measurementId: "G-KEMCE9679Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default firebaseConfig;
export { app, analytics };