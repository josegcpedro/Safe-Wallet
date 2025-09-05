import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqbQLvqpO7X9eyNiWN3hBqNfGtfRSlbLc",
  authDomain: "safe-wallet-df860.firebaseapp.com",
  projectId: "safe-wallet-df860",
  storageBucket: "safe-wallet-df860.firebasestorage.app",
  messagingSenderId: "578663747730",
  appId: "1:578663747730:web:e6d1596f038bdeea30564b"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const FIREBASE_AUTH = !getApps().length
  ? initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) })
  : initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });

export const FIREBASE_DB = getFirestore(app);