// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLrRJxsMGakNFd9wLFL55wK5uBf32l1DY",
  authDomain: "eiot-project-sem5.firebaseapp.com",
  databaseURL: "https://eiot-project-sem5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eiot-project-sem5",
  storageBucket: "eiot-project-sem5.appspot.com",
  messagingSenderId: "648772150104",
  appId: "1:648772150104:web:3050678a3ce644c7133b2d",
  measurementId: "G-DYYE241VWT"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_REALTIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase