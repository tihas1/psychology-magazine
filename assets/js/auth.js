// assets/js/auth.js

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
