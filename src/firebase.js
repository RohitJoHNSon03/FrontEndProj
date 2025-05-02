// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwk8t7VjuD-whpFxWdoYK5iU4vy-QM86M",
  authDomain: "foodordering-defac.firebaseapp.com",
  projectId: "foodordering-defac",
  storageBucket: "foodordering-defac.firebasestorage.app",
  messagingSenderId: "1004822491978",
  appId: "1:1004822491978:web:a51365c924601c95cec7b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };