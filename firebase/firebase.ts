import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw6ihIybBs7_6ERanEhWfnxIoK1-nPTJI",
  authDomain: "vura-frontend.firebaseapp.com",
  projectId: "vura-frontend",
  storageBucket: "vura-frontend.firebasestorage.app",
  messagingSenderId: "672017012382",
  appId: "1:672017012382:web:127c7a21b219d43e7a0d8f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;