// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOURAUTDOMAIN.firebaseapp.com",
  projectId: "lifelogs-a22e2",
  storageBucket: "lifelogs-a22e2.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:852532101850:web:XXXXXXXXXXXXXXXXXX"
};


const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const imgdb = getStorage(app);
