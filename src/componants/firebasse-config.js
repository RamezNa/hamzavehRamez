import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCCXVqWjM_ApwPTFK-n6W2q3NKpe0TwR90",
  authDomain: "hamzeveh.firebaseapp.com",
  projectId: "hamzeveh",
  storageBucket: "hamzeveh.appspot.com",
  messagingSenderId: "616331334951",
  appId: "1:616331334951:web:e022b5bd90521a0e614502"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)