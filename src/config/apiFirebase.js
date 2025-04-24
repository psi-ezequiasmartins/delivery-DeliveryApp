/**
* src/config/apiFirebase.js
*/

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyC0v2LQ4ZSidxrUECbk9mIkPBXEBtpcpaw",
//   authDomain: "psi-crm-ca846.firebaseapp.com",
//   databaseURL: "https://psi-crm-ca846-default-rtdb.firebaseio.com",
//   projectId: "psi-crm-ca846",
//   storageBucket: "psi-crm-ca846.appspot.com",
//   messagingSenderId: "862930671910",
//   appId: "1:862930671910:web:e0ff5160f50d67a974c9e7"
// };

export const firebase_app = initializeApp(firebaseConfig);


