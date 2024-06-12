import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDPyvB7EwVpGA62waK9_QSr4lUbTifSZxM",
  authDomain: "food-920e6.firebaseapp.com",
  databaseURL: "https://food-920e6-default-rtdb.firebaseio.com",
  projectId: "food-920e6",
  storageBucket: "food-920e6.appspot.com",
  messagingSenderId: "1033140159534",
  appId: "1:1033140159534:web:724d5157b67c26955b0bbf",
  measurementId: "G-0E7560NTZ5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { db, storage, database };
