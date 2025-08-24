// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "next-imo.firebaseapp.com",
  projectId: "next-imo",
  storageBucket: "next-imo.firebasestorage.app",
  messagingSenderId: "795260296487",
  appId: "1:795260296487:web:ea19e584152152fb45dd02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);