// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { deflate } from "zlib";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp4kAdcttqzJ3YBdyLQ6vdXOuggYA7vwU",
  authDomain: "for-everything-3b5fb.firebaseapp.com",
  projectId: "for-everything-3b5fb",
  storageBucket: "for-everything-3b5fb.appspot.com",
  messagingSenderId: "932145826173",
  appId: "1:932145826173:web:494e55fd1b87674b366414",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
