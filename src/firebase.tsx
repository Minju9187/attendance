// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC87iurAwxYDtW8xXiFXQk3sgiLTjkwfGI",
  authDomain: "check-project-b7db5.firebaseapp.com",
  projectId: "check-project-b7db5",
  storageBucket: "check-project-b7db5.appspot.com",
  messagingSenderId: "444247498539",
  appId: "1:444247498539:web:78a82f4beb4e46d575ef6e",
  measurementId: "G-DVKCZVE9E4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
