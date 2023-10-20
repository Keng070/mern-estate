// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-16bfd.firebaseapp.com",
  projectId: "mern-estate-16bfd",
  storageBucket: "mern-estate-16bfd.appspot.com",
  messagingSenderId: "128185402360",
  appId: "1:128185402360:web:f9e595fd61d0a548608c0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);