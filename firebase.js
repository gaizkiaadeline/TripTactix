// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYdEMQtFulPImqYdepulrDtbpvS2Mu7fQ",
  authDomain: "triptactix-d1b6b.firebaseapp.com",
  projectId: "triptactix-d1b6b",
  storageBucket: "triptactix-d1b6b.appspot.com",
  messagingSenderId: "692261252927",
  appId: "1:692261252927:web:7197468050d6d271f92d8a",
  measurementId: "G-JW7L1YNBM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics, firestore;
if (typeof window !== 'undefined') {
  // Initialize Firebase Analytics only on the client side
  analytics = getAnalytics(app);
  firestore = getFirestore(app);
}
export { firestore };