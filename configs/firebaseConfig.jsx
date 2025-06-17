// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "ai-short-video-generator-a2d6e.firebaseapp.com",
//   projectId: "ai-short-video-generator-a2d6e",
//   storageBucket: "ai-short-video-generator-a2d6e.firebasestorage.app",
//   messagingSenderId: "669625698867",
//   appId: "1:669625698867:web:bfd018b03d685907857146",
//   measurementId: "G-EG3DKB3BMZ"
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kwikreels.firebaseapp.com",
  projectId: "kwikreels",
  storageBucket: "kwikreels.firebasestorage.app",
  messagingSenderId: "865726475887",
  appId: "1:865726475887:web:cf896956655b6c0cef279a",
  measurementId: "G-QZDBJFNYP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app); 