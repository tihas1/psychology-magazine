// --- AUTH.JS ---

// Ensure Firebase Auth is loaded
if (!window.auth) {
  console.error("Firebase Auth not initialized. Check firebase-init.js");
}

// DOM References
document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userEmailDisplay = document.getElementById("userEmailDisplay");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toggleAuthMode = document.getElementById("toggleAuthMode");
  let isLoginMode = true;

  // ✅ Open Modal
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      loginModal.classList.add("open");
    });
  }

  // ✅ Close on background click
  loginModal?.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("open");
  });

  // ✅ Toggle Login/Register UI
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
    auth.signInWithEmailAndPassword(email, password)
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
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        loginModal.classList.remove("open");
      })
      .catch(err => alert(err.message));
  });

  // ✅ Logout
  logoutBtn?.addEventListener("click", () => {
    auth.signOut();
  });

  // ✅ Detect login state & update UI
  auth?.onAuthStateChanged(user => {
    if (user) {
      // Logged in
      userEmailDisplay.innerText = `Hi, ${user.email}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      userEmailDisplay.style.display = "inline-block";
    } else {
      // Logged out
      userEmailDisplay.innerText = "";
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      userEmailDisplay.style.display = "none";
    }
  });
});
