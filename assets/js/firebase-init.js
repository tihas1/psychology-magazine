// assets/js/firebase-init.js

// Import Firebase (will work with CDN script)
const firebaseConfig = {
  apiKey: "AIzaSyBdpseoX9t3uEB_nPzRTjdkJRqExCUvyQQ",
  authDomain: "crafted-content-92d88.firebaseapp.com",
  projectId: "crafted-content-92d88",
  storageBucket: "crafted-content-92d88.firebasestorage.app",
  messagingSenderId: "603925222453",
  appId: "1:603925222453:web:886a9dc56817fee4128d7c",
  measurementId: "G-3Q1RFWSB4W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
