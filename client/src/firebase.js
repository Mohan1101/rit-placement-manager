import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcxdYV421FxHA-qd3DjI34wYZESEaa_rw",
  authDomain: "rit-placement-manager.firebaseapp.com",
  projectId: "rit-placement-manager",
  storageBucket: "rit-placement-manager.appspot.com",
  messagingSenderId: "616480747730",
  appId: "1:616480747730:web:6a41dece2e4167ca95fd0b",
  measurementId: "G-90833RL9W0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { firebaseApp, db, storage };



