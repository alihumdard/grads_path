(function () {
  const menuBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      if (menuIcon) {
        menuIcon.classList.toggle("fa-bars");
        menuIcon.classList.toggle("fa-xmark");
      }
    });
    document.addEventListener("click", function (e) {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        if (menuIcon) {
          menuIcon.classList.add("fa-bars");
          menuIcon.classList.remove("fa-xmark");
        }
      }
    });
  }

  // Login / Signup modals
  const loginModal = document.getElementById("login-modal");
  const signupModal = document.getElementById("signup-modal");

  function openLogin() {
    if (signupModal) signupModal.classList.add("hidden");
    if (loginModal) loginModal.classList.remove("hidden");
  }
  function openSignup() {
    if (loginModal) loginModal.classList.add("hidden");
    if (signupModal) signupModal.classList.remove("hidden");
  }
  function closeLogin() {
    if (loginModal) loginModal.classList.add("hidden");
  }
  function closeSignup() {
    if (signupModal) signupModal.classList.add("hidden");
  }

  ["btn-login", "btn-login-mob"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("click", openLogin);
  });
  ["btn-signup", "btn-signup-mob"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("click", openSignup);
  });
  var footerSignup = document.getElementById("footer-signup");
  var footerLogin = document.getElementById("footer-login");
  if (footerSignup) footerSignup.addEventListener("click", function (e) { e.preventDefault(); openSignup(); });
  if (footerLogin) footerLogin.addEventListener("click", function (e) { e.preventDefault(); openLogin(); });

  // Open login/signup modal when landing with hash (e.g. from footer on other pages)
  function checkHashModal() {
    var hash = (window.location.hash || "").toLowerCase();
    if (hash === "#signup" && signupModal) { signupModal.classList.remove("hidden"); if (loginModal) loginModal.classList.add("hidden"); }
    else if (hash === "#login" && loginModal) { loginModal.classList.remove("hidden"); if (signupModal) signupModal.classList.add("hidden"); }
  }
  if (window.location.hash) checkHashModal();
  window.addEventListener("hashchange", checkHashModal);

  var loginClose = document.getElementById("login-close");
  var signupClose = document.getElementById("signup-close");
  if (loginClose) loginClose.addEventListener("click", closeLogin);
  if (signupClose) signupClose.addEventListener("click", closeSignup);

  var loginToSignup = document.getElementById("login-to-signup");
  var signupToLogin = document.getElementById("signup-to-login");
  if (loginToSignup) loginToSignup.addEventListener("click", openSignup);
  if (signupToLogin) signupToLogin.addEventListener("click", openLogin);

  if (loginModal) {
    loginModal.addEventListener("click", function (e) {
      if (e.target === loginModal) closeLogin();
    });
  }
  if (signupModal) {
    signupModal.addEventListener("click", function (e) {
      if (e.target === signupModal) closeSignup();
    });
  }

  // Password toggle (eyeball): show/hide password in Login and Signup
  document.querySelectorAll(".password-toggle").forEach(function (btn) {
    var targetId = btn.getAttribute("data-target");
    if (!targetId) return;
    var input = document.getElementById(targetId);
    var icon = btn.querySelector(".toggle-icon");
    if (!input || !icon) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      icon.classList.toggle("fa-eye-slash", isPassword);
      icon.classList.toggle("fa-eye", !isPassword);
    });
  });

  // Signup Program level / Role button selection; remember choice for next time
  document.querySelectorAll(".signup-level").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".signup-level").forEach(function (b) {
        b.classList.remove("border-[var(--primary)]", "text-[var(--primary)]", "bg-[var(--primary)]/10");
        b.classList.add("border-[var(--border)]", "text-[var(--text-muted)]");
      });
      btn.classList.add("border-[var(--primary)]", "text-[var(--primary)]", "bg-[var(--primary)]/10");
      btn.classList.remove("border-[var(--border)]", "text-[var(--text-muted)]");
      var val = btn.getAttribute("data-value");
      if (val)
        try {
          localStorage.setItem("gradspaths_signup_level", val);
        } catch (e) {}
    });
  });
  document.querySelectorAll(".signup-role").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".signup-role").forEach(function (b) {
        b.classList.remove("selected");
      });
      btn.classList.add("selected");
      var val = btn.getAttribute("data-value");
      if (val)
        try {
          localStorage.setItem("gradspaths_signup_role", val);
        } catch (e) {}
      var stepsEl = document.getElementById("signup-steps");
      var subtitleEl = document.getElementById("signup-subtitle");
      if (stepsEl && subtitleEl) {
        if (val === "Mentor") {
          stepsEl.classList.remove("hidden");
          stepsEl.setAttribute("aria-hidden", "false");
          subtitleEl.textContent = "Begin helping students achieve their dreams.";
        } else {
          stepsEl.classList.add("hidden");
          stepsEl.setAttribute("aria-hidden", "true");
          subtitleEl.textContent = "Tell us who you are so we can verify your school and keep this community secure.";
        }
      }
    });
  });

  // Contact Us: show form only when signed in, else show sign-in prompt
  function updateContactSection() {
    var signedIn = localStorage.getItem("gradpaths_signed_in") === "1";
    var signinRequired = document.getElementById("contact-signin-required");
    var formWrapper = document.getElementById("contact-form-wrapper");
    if (signinRequired && formWrapper) {
      if (signedIn) {
        signinRequired.classList.add("hidden");
        formWrapper.classList.remove("hidden");
      } else {
        signinRequired.classList.remove("hidden");
        formWrapper.classList.add("hidden");
      }
    }
  }
  window.gradpathsUpdateContactSection = updateContactSection;
  updateContactSection();

  var contactOpenLogin = document.getElementById("contact-open-login");
  var contactOpenSignup = document.getElementById("contact-open-signup");
  if (contactOpenLogin) contactOpenLogin.addEventListener("click", openLogin);
  if (contactOpenSignup)
    contactOpenSignup.addEventListener("click", openSignup);

  // See Feedback and Reviews: require sign-in; if not signed in, open login modal instead of navigating
  var btnSeeFeedback = document.getElementById("btn-see-feedback");
  if (btnSeeFeedback) {
    btnSeeFeedback.addEventListener("click", function (e) {
      if (localStorage.getItem("gradpaths_signed_in") !== "1") {
        e.preventDefault();
        openLogin();
      }
    });
  }
})();
