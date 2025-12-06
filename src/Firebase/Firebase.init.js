// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKlOmgX43eBBKAoOJCnZKKo_c75Yq5Xbk",
  authDomain: "smart-home-28254.firebaseapp.com",
  projectId: "smart-home-28254",
  storageBucket: "smart-home-28254.firebasestorage.app",
  messagingSenderId: "871336065664",
  appId: "1:871336065664:web:74d8e29ff3ca924c920465"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);