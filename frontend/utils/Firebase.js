import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-c55c6.firebaseapp.com",
  projectId: "loginonecart-c55c6",
  storageBucket: "loginonecart-c55c6.firebasestorage.app",
  messagingSenderId: "160762051706",
  appId: "1:160762051706:web:c17612c5fbbe1384634fc3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
