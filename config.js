import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDn3Fntcz3mdjpTw9xRd3nPNzzySCJHa3I",
  authDomain: "flowers-shop-website.firebaseapp.com",
  projectId: "flowers-shop-website",
  storageBucket: "flowers-shop-website.firebasestorage.app",
  messagingSenderId: "465200262604",
  appId: "1:465200262604:web:6af21e840b5254ededc169"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);