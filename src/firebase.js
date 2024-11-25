// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwV4ZN8s8Q40CleosCime2z4nLjxOEP3k",
  authDomain: "note-keeper-c10f7.firebaseapp.com",
  projectId: "note-keeper-c10f7",
  storageBucket: "note-keeper-c10f7.firebasestorage.app",
  messagingSenderId: "762934992047",
  appId: "1:762934992047:web:e4bf9c641d54038be8885a",
  measurementId: "G-YHNBV852ND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);