// assets/js/firebase-init.js

  const firebaseConfig = {
    apiKey: "AIzaSyBls6k8ysIhu1qd4vZNQf6K0HOpDiaSjnY",
    authDomain: "crafted-content-v2.firebaseapp.com",
    projectId: "crafted-content-v2",
    storageBucket: "crafted-content-v2.appspot.com", // ✅ fixed domain
    messagingSenderId: "615216884591",
    appId: "1:615216884591:web:d684eda117adc86106d69a",
    measurementId: "G-VTWJWSVEB2"
  };
// Initialize Firebase safely
(function() {
  if (typeof firebase === "undefined") {
    console.error("Firebase SDK not loaded — check that firebase-app.js and firebase-auth.js are included before this file.");
    return;
  }

  try {
    // Prevent re-initialization
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      console.log("✅ Firebase initialized");
    }

    // Expose Auth and Firestore globally
    window.auth = firebase.auth();
    window.db = firebase.firestore();

    // Optional: enable persistence for offline use
    window.db.enablePersistence?.().catch(err => {
      console.warn("⚠️ Firestore persistence not available:", err.code);
    });
  } catch (err) {
    console.error("❌ Firebase init error:", err);
  }
})();

