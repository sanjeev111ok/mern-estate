// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e2e0e.firebaseapp.com",
  projectId: "mern-estate-e2e0e",
  storageBucket: "mern-estate-e2e0e.firebasestorage.app",
  messagingSenderId: "514265742464",
  appId: "1:514265742464:web:0fc4d55bd30d01ad47fa65",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
