/**
* src/config/apiFirebase.js
*/

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBVZPJtP2wBvuOXEHYGETlysuE_8kwYLs4",
  authDomain: "psi-deliverybairro.firebaseapp.com",
  databaseURL: "https://psi-deliverybairro-default-rtdb.firebaseio.com",
  projectId: "psi-deliverybairro",
  storageBucket: "psi-deliverybairro.firebasestorage.app",
  messagingSenderId: "234983243246",
  appId: "1:234983243246:web:eb96adf25d986a6292a2ff",
  measurementId: "G-68L43T7X7W"
};

export const firebase_app = initializeApp(firebaseConfig);
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID
