// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjHQ2MDZhCwRGCIOBGNwwnUxTX6FHXCOc",
  authDomain: "react-firebase-8555e.firebaseapp.com",
  projectId: "react-firebase-8555e",
  storageBucket: "react-firebase-8555e.firebasestorage.app",
  messagingSenderId: "979535264280",
  appId: "1:979535264280:web:940bd1b3554e9b3de6616d",
  measurementId: "G-9R90H6FNWY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const google = new GoogleAuthProvider(provider);
