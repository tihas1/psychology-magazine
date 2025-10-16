// assets/js/firebase-init.js

const firebaseConfig = {
  apiKey: "AIzaSyBdpseoX9t3uEB_nPzRTjdkJRqExCUvyQQ",
  authDomain: "crafted-content-92d88.firebaseapp.com",
  projectId: "crafted-content-92d88",
  storageBucket: "crafted-content-92d88.appspot.com", // ✅ fixed domain
  messagingSenderId: "603925222453",
  appId: "1:603925222453:web:886a9dc56817fee4128d7c",
  measurementId: "G-3Q1RFWSB4W"
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
