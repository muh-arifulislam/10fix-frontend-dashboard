// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9YoGQOKC0ebY17EO0MhLj9esVpTF9SyU",
  authDomain: "fix-5b6bc.firebaseapp.com",
  projectId: "fix-5b6bc",
  storageBucket: "fix-5b6bc.appspot.com",
  messagingSenderId: "1082966375137",
  appId: "1:1082966375137:web:edbfa073d0e9ea517615a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
