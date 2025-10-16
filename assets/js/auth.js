// --- assets/js/auth.js ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBdpseoX9t3uEB_nPzRTjdkJRqExCUvyQQ",
  authDomain: "crafted-content-92d88.firebaseapp.com",
  projectId: "crafted-content-92d88",
  storageBucket: "crafted-content-92d88.firebasestorage.app",
  messagingSenderId: "603925222453",
  appId: "1:603925222453:web:886a9dc56817fee4128d7c",
  measurementId: "G-3Q1RFWSB4W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- DOM logic ---
document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userEmailDisplay = document.getElementById("userEmailDisplay");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toggleAuthMode = document.getElementById("toggleAuthMode");
  let isLoginMode = true;

  // ✅ Open modal
  loginBtn?.addEventListener("click", () => {
    loginModal.classList.add("open");
  });

  // ✅ Close modal on outside click
  loginModal?.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("open");
  });

  // ✅ Toggle between login & register
  toggleAuthMode?.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      toggleAuthMode.innerText = "Don't have an account? Register";
    } else {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      toggleAuthMode.innerText = "Already registered? Login";
    }
  });

  // ✅ Login
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        loginModal.classList.remove("open");
      })
      .catch(err => alert(err.message));
  });

  // ✅ Register
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        loginModal.classList.remove("open");
      })
      .catch(err => alert(err.message));
  });

  // ✅ Logout
  logoutBtn?.addEventListener("click", () => signOut(auth));

  // ✅ Auth state listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmailDisplay.innerText = `Hi, ${user.email}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      userEmailDisplay.style.display = "inline-block";
    } else {
      userEmailDisplay.innerText = "";
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      userEmailDisplay.style.display = "none";
    }
  });
});

