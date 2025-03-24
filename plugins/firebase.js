import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtEixy13dqLWwGj0tybEEp8o6wLLC7sZA",
  authDomain: "consignment-48602.firebaseapp.com",
  projectId: "consignment-48602",
  storageBucket: "consignment-48602.firebasestorage.app",
  messagingSenderId: "15764251617",
  appId: "1:15764251617:web:da5a4db33b80eb82f6a8a0",
  measurementId: "G-H8NBNRLYVL"
};

export default defineNuxtPlugin((nuxtApp) => {
  // Ensure Firebase is initialized only once
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      firebase: app,
      firestore: db,
      auth: auth,
    },
  };
});