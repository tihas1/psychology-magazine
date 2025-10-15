// assets/js/firebase-init.js
// Paste your firebaseConfig object here (keeps it safe in frontend)
const firebaseConfig = {
  apiKey: "AIzaSyBdpseoX9t3uEB_nPzRTjdkJRqExCUvyQQ",
  authDomain: "crafted-content-92d88.firebaseapp.com",
  projectId: "crafted-content-92d88",
  storageBucket: "crafted-content-92d88.firebasestorage.app",
  messagingSenderId: "603925222453",
  appId: "1:603925222453:web:886a9dc56817fee4128d7c",
  measurementId: "G-3Q1RFWSB4W"
};

// initialize (works with the namespaced CDN)
if (typeof firebase !== "undefined" && typeof firebase.initializeApp === "function") {
  try {
    // Avoid double-init
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    // Prefer the namespaced API if available
    if (firebase.auth) {
      window.auth = firebase.auth();
    }
    if (firebase.firestore) {
      window.db = firebase.firestore();
    }
  } catch (err) {
    console.error("Firebase init error:", err);
  }
} else {
  console.error("Firebase SDK not loaded. Make sure firebase-app.js, firebase-auth.js are included.");
}
