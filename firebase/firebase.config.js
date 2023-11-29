import "firebase/auth"
import '@firebase/firestore'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const clientCreds = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:  process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };


  const app=  initializeApp(clientCreds);
   const auth = getAuth(app);
   var db = getFirestore(app)

export {app,auth, db}

