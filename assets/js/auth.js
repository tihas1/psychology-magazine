// --- assets/js/auth.js ---
// Works with firebase v8 loaded in default.html

document.addEventListener("DOMContentLoaded", () => {
  if (typeof firebase === "undefined" || !firebase.auth) {
    console.error("❌ Firebase not loaded. Check firebase-init.js and default.html script order.");
    return;
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userEmailDisplay = document.getElementById("userEmailDisplay");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toggleAuthMode = document.getElementById("toggleAuthMode");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  let isLoginMode = true;

  // --- Modal open/close ---
  loginBtn?.addEventListener("click", () => loginModal.classList.add("open"));
  loginModal?.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("open");
  });

  // --- Toggle between login & register ---
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

  // --- Show password toggles ---
  const showLoginPassword = document.getElementById("showLoginPassword");
  const showRegisterPassword = document.getElementById("showRegisterPassword");

  showLoginPassword?.addEventListener("change", (e) => {
    const pass = loginForm.querySelector('input[name="password"]');
    pass.type = e.target.checked ? "text" : "password";
  });

  showRegisterPassword?.addEventListener("change", (e) => {
    const pass = registerForm.querySelector('input[name="password"]');
    pass.type = e.target.checked ? "text" : "password";
  });

  // --- Login ---
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => loginModal.classList.remove("open"))
      .catch(err => alert(err.message));
  });

  // --- Register ---
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayName = e.target.displayName.value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        const user = userCred.user;
        user.updateProfile({ displayName });

        // ✅ Create Firestore user record
        return db.collection("users").doc(user.uid).set({
          displayName,
          email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => loginModal.classList.remove("open"))
      .catch(err => alert(err.message));
  });

  // --- Forgot password ---
  forgotPasswordLink?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = prompt("Enter your email for password reset:");
    if (email) {
      auth.sendPasswordResetEmail(email)
        .then(() => alert("Password reset email sent!"))
        .catch(err => alert(err.message));
    }
  });

  // --- Logout ---
  logoutBtn?.addEventListener("click", () => auth.signOut());

  // --- Auth state listener ---
  auth.onAuthStateChanged((user) => {
    if (user) {
      const name = user.displayName || user.email.split("@")[0];
      userEmailDisplay.innerText = `Hi, ${name}`;
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
