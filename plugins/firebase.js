import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCUbKSppZprSG9DEF_E4hHAfFnG-69fiE",
  authDomain: "motionexport-83ed7.firebaseapp.com",
  projectId: "motionexport-83ed7",
  storageBucket: "motionexport-83ed7.firebasestorage.app",
  messagingSenderId: "77941982903",
  appId: "1:77941982903:web:587b893a5be2a7360c2f32",
  measurementId: "G-VJMQMSR5H3"
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