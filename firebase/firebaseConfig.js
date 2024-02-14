// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzO0Yv1A2GGbWx4l0-ubFPcL-R8j8YQio",
  authDomain: "butler-2dba3.firebaseapp.com",
  projectId: "butler-2dba3",
  storageBucket: "butler-2dba3.appspot.com",
  messagingSenderId: "603074246161",
  appId: "1:603074246161:web:b23eb2f67c42a16339a3b0",
  measurementId: "G-Z6MQ9FTF7W"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();