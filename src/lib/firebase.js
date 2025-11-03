// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyTvj15tUEjf_hkHM79gDCacfhwigEj0c",
  authDomain: "fam-clothmaker.firebaseapp.com",
  projectId: "fam-clothmaker",
  storageBucket: "fam-clothmaker.firebasestorage.app",
  messagingSenderId: "871137436069",
  appId: "1:871137436069:web:5cddbe5ad4cee494be484c",
  measurementId: "G-V5N78VB6HR"
};

// Initialize Firebase
let app;
let analytics;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { app, analytics };

