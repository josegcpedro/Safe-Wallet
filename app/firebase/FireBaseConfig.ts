import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBqbQLvqpO7X9eyNiWN3hBqNfGtfRSlbLc",
  authDomain: "safe-wallet-df860.firebaseapp.com",
  projectId: "safe-wallet-df860",
  storageBucket: "safe-wallet-df860.firebasestorage.app",
  messagingSenderId: "578663747730",
  appId: "1:578663747730:web:e6d1596f038bdeea30564b"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)