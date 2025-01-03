import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADh6ipi1j2_IqILgGiJHyPHuhphYlDYh4",
  authDomain: "face-authentication-314ab.firebaseapp.com",
  projectId: "face-authentication-314ab",
  storageBucket: "face-authentication-314ab.appspot.com",
  messagingSenderId: "133862236362",
  appId: "1:133862236362:web:4a895babc5a85ebe851433",
  measurementId: "G-S0GFYQJP40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const storage = getStorage(app); // Export storage
export const firestore = getFirestore(app); // Export firestore

// Optionally, you can export app if needed
export { app };

