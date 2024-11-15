// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDeqknodM29zSEK_Sqjo2sc-sSdGwO-ve4",
//   authDomain: "exclusive-80371.firebaseapp.com",
//   projectId: "exclusive-80371",
//   storageBucket: "exclusive-80371.firebasestorage.app",
//   messagingSenderId: "156701839917",
//   appId: "1:156701839917:web:59e8f52950ddfa14ab5ea4",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
