import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const Firebase = firebase.initializeApp(config);

export default Firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
