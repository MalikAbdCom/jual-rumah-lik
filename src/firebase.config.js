// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import db
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDKxeuwFoxHqdLWwZjP5WYXjFSZoTqsCs",
  authDomain: "jual-baju-lik.firebaseapp.com",
  projectId: "jual-baju-lik",
  storageBucket: "jual-baju-lik.appspot.com",
  messagingSenderId: "10976883395",
  appId: "1:10976883395:web:9de57fe7b95c6047752876",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the database for components to use.
export { db };
