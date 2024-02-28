
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC5tRhESvg4-CywEY7F7NnxS7d6eRT8xAI",
  authDomain: "soen390-1fbbd.firebaseapp.com",
  projectId: "soen390-1fbbd",
  storageBucket: "soen390-1fbbd.appspot.com",
  messagingSenderId: "98548332464",
  appId: "1:98548332464:web:8cb7921cf4034f590d0875",
  measurementId: "G-F68RYMN7L6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

