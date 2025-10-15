// assets/js/auth.js
// Depends on firebase-init.js that sets window.auth and window.db

(function () {
  // helpers
  function el(id){ return document.getElementById(id); }
  function show(elm){ if(elm) elm.style.display = ''; }
  function hide(elm){ if(elm) elm.style.display = 'none'; }
  function text(elm, txt){ if(elm) elm.textContent = txt; }

  // modal elements will be injected into DOM by include (see next step)
  const modal = el('fc-auth-modal');
  const loginTabBtn = el('fc-tab-login');
  const registerTabBtn = el('fc-tab-register');
  const loginForm = el('fc-login-form');
  const registerForm = el('fc-register-form');
  const loginEmail = el('fc-login-email');
  const loginPass = el('fc-login-pass');
  const registerEmail = el('fc-register-email');
  const registerPass = el('fc-register-pass');
  const authMsg = el('fc-auth-msg');

  const loginBtnHeader = el('loginBtn');   // header/sidebar login btn
  const logoutBtnHeader = el('logoutBtn'); // header/sidebar logout btn
  const userLabel = el('userLabel');       // element to show "Hi, email"

  // Show the modal
  function openAuthModal() {
    if (!modal) return;
    modal.classList.add('open');
    // default to login tab
    activateTab('login');
  }

  // Close modal
  function closeAuthModal() {
    if (!modal) return;
    modal.classList.remove('open');
  }

  // Activate tab: 'login' or 'register'
  function activateTab(tab) {
    if (!loginTabBtn || !registerTabBtn) return;
    if (tab === 'login') {
      loginTabBtn.classList.add('active');
      registerTabBtn.classList.remove('active');
      show(loginForm); hide(registerForm);
      text(authMsg, '');
    } else {
      registerTabBtn.classList.add('active');
      loginTabBtn.classList.remove('active');
      show(registerForm); hide(loginForm);
      text(authMsg, '');
    }
  }

  // Wire header login button
  if (loginBtnHeader) {
    loginBtnHeader.addEventListener('click', function(e){
      e.preventDefault();
      openAuthModal();
    });
  }

  // Wire logout click
  if (logoutBtnHeader) {
    logoutBtnHeader.addEventListener('click', function(e){
      e.preventDefault();
      if (!window.auth) return alert("Auth not ready");
      window.auth.signOut().catch(err => console.error(err));
    });
  }

  // Tab buttons
  if (loginTabBtn) loginTabBtn.addEventListener('click', ()=>activateTab('login'));
  if (registerTabBtn) registerTabBtn.addEventListener('click', ()=>activateTab('register'));

  // Form submits
  if (loginForm) loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    if (!window.auth) return alert("Auth not ready");
    const email = loginEmail.value.trim();
    const pass = loginPass.value;
    window.auth.signInWithEmailAndPassword(email, pass)
      .then(() => {
        text(authMsg, 'Signed in successfully');
        closeAuthModal();
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          text(authMsg, 'User not found — try Register tab');
        } else {
          text(authMsg, err.message || 'Login error');
        }
      });
  });

  if (registerForm) registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    if (!window.auth) return alert("Auth not ready");
    const email = registerEmail.value.trim();
    const pass = registerPass.value;
    window.auth.createUserWithEmailAndPassword(email, pass)
      .then(() => {
        text(authMsg, 'Account created and signed in');
        closeAuthModal();
      })
      .catch(err => {
        text(authMsg, err.message || 'Registration error');
      });
  });

  // Close modal when clicking outside or on close button
  document.addEventListener('click', function(e){
    if (!modal) return;
    if (e.target.matches('#fc-auth-modal') || e.target.matches('.fc-auth-close')) {
      closeAuthModal();
    }
  });

  // Auth state change: update UI
  if (window.auth) {
    window.auth.onAuthStateChanged(function(user){
      if (user) {
        // show user label and logout
        if (userLabel) text(userLabel, `Hi, ${user.email}`);
        if (loginBtnHeader) hide(loginBtnHeader);
        if (logoutBtnHeader) show(logoutBtnHeader);
      } else {
        if (userLabel) text(userLabel, '');
        if (loginBtnHeader) show(loginBtnHeader);
        if (logoutBtnHeader) hide(logoutBtnHeader);
      }
    });
  } else {
    // if auth not ready yet, retry after small delay
    let tries = 0;
    const tryAuthReady = setInterval(() => {
      if (window.auth && window.auth.onAuthStateChanged) {
        clearInterval(tryAuthReady);
        window.auth.onAuthStateChanged(function(user){
          if (user) {
            if (userLabel) text(userLabel, `Hi, ${user.email}`);
            if (loginBtnHeader) hide(loginBtnHeader);
            if (logoutBtnHeader) show(logoutBtnHeader);
          } else {
            if (userLabel) text(userLabel, '');
            if (loginBtnHeader) show(loginBtnHeader);
            if (logoutBtnHeader) hide(logoutBtnHeader);
          }
        });
      }
      tries++;
      if (tries > 20) clearInterval(tryAuthReady);
    }, 300);
  }

})();
