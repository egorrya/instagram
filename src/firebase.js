import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCad2c9_gc5PqjBeFUKH0A0voQ3sabRdV4",
  authDomain: "instagram-c4e5c.firebaseapp.com",
  databaseURL: "https://instagram-c4e5c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instagram-c4e5c",
  storageBucket: "instagram-c4e5c.appspot.com",
  messagingSenderId: "116655675894",
  appId: "1:116655675894:web:44bd5273af2d5cabac4fd7",
  measurementId: "G-SS6QTP1N0P"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}