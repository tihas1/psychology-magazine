// assets/js/auth.js
// ✅ Firebase Authentication Handlers
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log('Logged in:', result.user.email))
      .catch(err => console.error('Login error:', err));
  });
}


if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => console.log('Logged out'))
      .catch(err => console.error('Logout error:', err));
  });
}

// Show login popup
document.getElementById("loginBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        if (err.code === "auth/user-not-found") {
          if (confirm("User not found. Create account?")) {
            auth.createUserWithEmailAndPassword(email, password)
              .then(() => alert("Account created! Logged in."))
              .catch(alert);
          }
        } else {
          alert(err.message);
        }
      });
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  auth.signOut();
});

// Listen auth status change
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("loginButtonContainer").style.display = "none";
    document.getElementById("logoutButtonContainer").style.display = "block";
  } else {
    document.getElementById("loginButtonContainer").style.display = "block";
    document.getElementById("logoutButtonContainer").style.display = "none";
  }
});


