import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDnheniIwPvOA71QnS1GVUrCzPhkt-YLZ4",
  authDomain: "rit-placement.firebaseapp.com",
  projectId: "rit-placement",
  storageBucket: "rit-placement.appspot.com",
  messagingSenderId: "569363473554",
  appId: "1:569363473554:web:4afec3c36da065b591724b",
  measurementId: "G-76HMNQS3CR"
}; 

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { firebaseApp, db, storage };



