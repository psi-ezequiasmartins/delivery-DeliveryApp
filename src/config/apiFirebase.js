/**
* src/config/apiFirebase.js
*/

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC0v2LQ4ZSidxrUECbk9mIkPBXEBtpcpaw",
  authDomain: "psi-crm-ca846.firebaseapp.com",
  databaseURL: "https://psi-crm-ca846-default-rtdb.firebaseio.com",
  projectId: "psi-crm-ca846",
  storageBucket: "psi-crm-ca846.appspot.com",
  messagingSenderId: "862930671910",
  appId: "1:862930671910:web:e0ff5160f50d67a974c9e7"
};

export const firebase_app = initializeApp(firebaseConfig);
  // apiKey: "AIzaSyBVZPJtP2wBvuOXEHYGETlysuE_8kwYLs4",
  // authDomain: "psi-deliverybairro.firebaseapp.com",
  // databaseURL: "https://psi-deliverybairro-default-rtdb.firebaseio.com",
  // projectId: "psi-deliverybairro",
  // storageBucket: "psi-deliverybairro.firebasestorage.app",
  // messagingSenderId: "234983243246",
  // appId: "1:234983243246:web:eb96adf25d986a6292a2ff",
  // measurementId: "G-68L43T7X7W"


  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID
