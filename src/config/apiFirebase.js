/**
* src/config/apiFirebase.js
*/

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
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


