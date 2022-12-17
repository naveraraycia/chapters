// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrLr_teLX3MB4FpkOykSiJCN9iHVj1Vhw",
  authDomain: "chapters-bc1e4.firebaseapp.com",
  projectId: "chapters-bc1e4",
  storageBucket: "chapters-bc1e4.appspot.com",
  messagingSenderId: "1000192755018",
  appId: "1:1000192755018:web:caf39a481e1239700bedb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const db = getFirestore()