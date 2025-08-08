// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLSi92qnqb9quOl7MMJtEijWH74SvlFxA",
  authDomain: "ecommerce-shopease.firebaseapp.com",
  projectId: "ecommerce-shopease",
  storageBucket: "ecommerce-shopease.firebasestorage.app",
  messagingSenderId: "264259173326",
  appId: "1:264259173326:web:47bad78379890f89ef499f",
  measurementId: "G-R5E9HBMM50",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
