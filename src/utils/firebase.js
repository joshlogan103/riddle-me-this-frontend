// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Import getAnalytics only if you need it
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADGHpiCzXnWXwtWhv4Bk5krdos2q7D-vc",
  authDomain: "riddle-me-this-9ecde.firebaseapp.com",
  projectId: "riddle-me-this-9ecde",
  storageBucket: "riddle-me-this-9ecde.appspot.com",
  messagingSenderId: "104971831793",
  appId: "1:104971831793:web:6897a8030d88ef86119c50",
  measurementId: "G-Z95FJG7XZ2"
};

const app = initializeApp(firebaseConfig);
// Initialize analytics only if you need it
// const analytics = getAnalytics(app);

const storage = getStorage(app);

export { storage };
