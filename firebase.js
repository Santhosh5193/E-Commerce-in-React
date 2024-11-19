// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBus5pc3ZHX89VtaEIGfAXSnAQuNKU_b9I",
  authDomain: "exclusive-e-commerce-web-b4f89.firebaseapp.com",
  projectId: "exclusive-e-commerce-web-b4f89",
  storageBucket: "exclusive-e-commerce-web-b4f89.firebasestorage.app",
  messagingSenderId: "1020024106321",
  appId: "1:1020024106321:web:2f6aa15c7b66533f857770",
  measurementId: "G-PSLMCDFSHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
