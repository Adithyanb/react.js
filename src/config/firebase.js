import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3M-Z-Eekpo2L0OF77uAmW09Akz9-qDCM",
  authDomain: "datahive-9033c.firebaseapp.com",
  projectId: "datahive-9033c",
  storageBucket: "datahive-9033c.firebasestorage.app",
  messagingSenderId: "1025548735169",
  appId: "1:1025548735169:web:18adab1488249f1d1e7a40",
  measurementId: "G-JCFGLDZK6B"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Collection references for easier access
export const COLLECTIONS = {
  TEACHERS: 'teachers',
  STUDENTS: 'students',
  USERS: 'users'
};