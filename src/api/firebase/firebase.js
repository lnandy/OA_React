// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtWT4nA5n8qzfLKl4z7KSbJhy19ICBzvU",
  authDomain: "oabackend-d4420.firebaseapp.com",
  projectId: "oabackend-d4420",
  storageBucket: "oabackend-d4420.appspot.com",
  messagingSenderId: "489346091703",
  appId: "1:489346091703:web:cb72281705408837be1b32",
  measurementId: "G-DBT40WZ3XJ"
};

// Initialize Firebase
// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword };