// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNwhr1WbJjNIk5u8EosmTh31XDVflMkbE",
  authDomain: "bookstore-9043d.firebaseapp.com",
  projectId: "bookstore-9043d",
  storageBucket: "bookstore-9043d.firebasestorage.app",
  messagingSenderId: "446033843865",
  appId: "1:446033843865:web:856d6b1871a696a0364a08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)