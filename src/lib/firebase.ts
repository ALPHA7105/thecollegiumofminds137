import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  arrayUnion, 
  arrayRemove, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  deleteDoc,
  runTransaction
} from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0707635795",
  appId: "1:75803873804:web:99b038d37b88932a92d429",
  apiKey: "AIzaSyA8Du-4KH2EpKVf7tmyooGgskv_MnjlFwQ",
  authDomain: "gen-lang-client-0707635795.firebaseapp.com",
  databaseId: "ai-studio-thecollegiumofmi-626fb95a-eb28-4e68-ae3f-7db91987bcbb",
  storageBucket: "gen-lang-client-0707635795.firebasestorage.app",
  messagingSenderId: "75803873804"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app, firebaseConfig.databaseId);

export { 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  arrayUnion, 
  arrayRemove, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  deleteDoc,
  runTransaction
};
