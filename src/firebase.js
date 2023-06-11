// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQD4u_hodB4Cr2Hoj3vyadZAsCbGFCA8k",
  authDomain: "podcast-app-62726.firebaseapp.com",
  projectId: "podcast-app-62726",
  storageBucket: "podcast-app-62726.appspot.com",
  messagingSenderId: "420951612183",
  appId: "1:420951612183:web:767721bf815ced01737552",
  measurementId: "G-2M6QVMSQZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };