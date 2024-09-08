import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFGiZkS6wCHsFJkqdkkuFhxOG7B6z6DwY",
  authDomain: "job-board-42d60.firebaseapp.com",
  projectId: "job-board-42d60",
  storageBucket: "job-board-42d60.appspot.com",
  messagingSenderId: "287268234686",
  appId: "1:287268234686:web:bedd6bb20a6179d9dc05ef",
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
