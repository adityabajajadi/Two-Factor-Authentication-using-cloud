import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyjbcxZ8NbaeftUYsJ-gHhDIWAMFY09sM",
  authDomain: "loginpage-a439e.firebaseapp.com",
  projectId: "loginpage-a439e",
  storageBucket: "loginpage-a439e.appspot.com",
  messagingSenderId: "134480198733",
  appId: "1:134480198733:web:07a6a988e8988e5ccc3004",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const storage = getStorage(app); // Export storage
export const firestore = getFirestore(app); // Export firestore

// Optionally, you can export app if needed
export { app };

