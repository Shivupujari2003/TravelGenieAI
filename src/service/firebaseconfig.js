// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANRVwt6h230RWnbNYhtRn4UE3K7GsyGhY",
  authDomain: "ai-trip-planner-ba410.firebaseapp.com",
  projectId: "ai-trip-planner-ba410",
  storageBucket: "ai-trip-planner-ba410.appspot.com",
  messagingSenderId: "773397812038",
  appId: "1:773397812038:web:13670df4656b083f1e0b47",
  measurementId: "G-2PGCL8EBQM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);