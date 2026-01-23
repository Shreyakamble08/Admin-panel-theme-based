// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");
const toggleFormBtn = document.getElementById("toggleForm");
const backToLoginBtn = document.getElementById("backToLogin");
const showForgotBtn = document.getElementById("showForgot");
const toggleText = document.getElementById("toggleText");
const backLoginSection = document.querySelector(".back-login");
const passwordToggles = document.querySelectorAll(".password-toggle");

// Form state management
let currentForm = "login";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  if (typeof initTheme === "function") {
    initTheme();
  }

  // Set initial form
  showForm("login");

  // Add event listeners
  initEventListeners();

  // Add some dynamic shapes to background
  createBackgroundShapes();
});

// Initialize event listeners
function initEventListeners() {
  // Form toggle
  toggleFormBtn.addEventListener("click", () => {
    if (currentForm === "login") {
      showForm("register");
    } else {
      showForm("login");
    }
  });

  // Back to login
  backToLoginBtn.addEventListener("click", () => {
    showForm("login");
  });

  // Show forgot password
  showForgotBtn.addEventListener("click", () => {
    showForm("forgot");
  });

  // Password toggles
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const targetId = e.currentTarget.dataset.target;
      togglePasswordVisibility(targetId, e.currentTarget);
    });
  });

  // Form submissions
  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);
  forgotForm.addEventListener("submit", handleForgotPassword);
}

// Show specific form
function showForm(formName) {
  // Hide all forms
  document.querySelectorAll(".form").forEach((form) => {
    form.classList.remove("active");
  });

  // Show target form
  document.getElementById(`${formName}Form`).classList.add("active");

  // Update UI based on form
  updateFormUI(formName);

  // Update current form state
  currentForm = formName;
}

// Update form UI elements
function updateFormUI(formName) {
  switch (formName) {
    case "login":
      toggleText.textContent = "Don't have an account?";
      toggleFormBtn.textContent = "Register";
      backLoginSection.classList.remove("active");
      break;

    case "register":
      toggleText.textContent = "Already have an account?";
      toggleFormBtn.textContent = "Login";
      backLoginSection.classList.add("active");
      break;

    case "forgot":
      toggleText.textContent = "Remember your password?";
      toggleFormBtn.textContent = "Login";
      backLoginSection.classList.add("active");
      break;
  }
}

// Toggle password visibility
function togglePasswordVisibility(inputId, toggleBtn) {
  const input = document.getElementById(inputId);
  const icon = toggleBtn.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// Form submission handlers
function handleLogin(e) {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const email =
    formData.get("email") ||
    loginForm.querySelector('input[type="email"]').value;
  const password =
    formData.get("password") || document.getElementById("loginPassword").value;

  // Basic validation
  if (!email || !password) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  // Simulate API call
  showNotification("Logging in...", "loading");

  setTimeout(() => {
    // Mock successful login
    showNotification(
      "Login successful! Redirecting to dashboard...",
      "success",
    );

    // In a real app, you would redirect to dashboard
    console.log("Login attempt:", { email, password });

    // Simulate redirect
    setTimeout(() => {
      window.location.href = "/dashboard.html";
    }, 1500);
  }, 1000);
}

function handleRegister(e) {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const name =
    formData.get("name") ||
    registerForm.querySelector('input[type="text"]').value;
  const email =
    formData.get("email") ||
    registerForm.querySelector('input[type="email"]').value;
  const phone =
    formData.get("phone") ||
    registerForm.querySelector('input[type="tel"]').value;
  const password =
    formData.get("password") ||
    document.getElementById("registerPassword").value;

  // Basic validation
  if (!name || !email || !phone || !password) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (password.length < 6) {
    showNotification("Password must be at least 6 characters", "error");
    return;
  }

  // Simulate API call
  showNotification("Creating account...", "loading");

  setTimeout(() => {
    // Mock successful registration
    showNotification("Account created successfully!", "success");

    // Auto-switch to login form
    setTimeout(() => {
      showForm("login");
    }, 1500);

    console.log("Registration attempt:", { name, email, phone, password });
  }, 1000);
}

function handleForgotPassword(e) {
  e.preventDefault();

  const formData = new FormData(forgotForm);
  const email =
    formData.get("email") ||
    forgotForm.querySelector('input[type="email"]').value;

  if (!email) {
    showNotification("Please enter your email address", "error");
    return;
  }

  // Simulate API call
  showNotification("Sending reset link...", "loading");

  setTimeout(() => {
    // Mock successful reset request
    showNotification("Reset link sent to your email", "success");

    // Auto-switch to login form
    setTimeout(() => {
      showForm("login");
    }, 1500);

    console.log("Password reset request for:", email);
  }, 1000);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Add icon based on type
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "❌";
  if (type === "loading") icon = "⏳";

  notification.innerHTML = `
    <span class="notification-icon">${icon}</span>
    <span class="notification-text">${message}</span>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1000;
    border-left: 4px solid var(--${type === "error" ? "primary" : type === "success" ? "success" : "primary"});
    animation: slideIn 0.3s ease;
    max-width: 350px;
    font-size: 0.95rem;
  `;

  // Add keyframe animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Auto-remove notification
  setTimeout(
    () => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    },
    type === "loading" ? 2000 : 3000,
  );
}

// Create dynamic background shapes
function createBackgroundShapes() {
  const bgShapes = document.querySelector(".bg-shapes");

  // Create additional shapes
  for (let i = 1; i <= 4; i++) {
    const shape = document.createElement("div");
    shape.className = `shape-${i}`;
    bgShapes.appendChild(shape);
  }

  // Add animation to shapes
  const shapes = document.querySelectorAll(
    ".shape-1, .shape-2, .shape-3, .shape-4",
  );
  shapes.forEach((shape, index) => {
    // Random positioning
    const left = 5 + Math.random() * 90;
    const top = 5 + Math.random() * 90;

    shape.style.left = `${left}%`;
    shape.style.top = `${top}%`;

    // Random size
    const size = 60 + Math.random() * 120;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    // Random animation
    const duration = 20 + Math.random() * 20;
    const delay = Math.random() * 5;

    shape.style.animation = `
      float ${duration}s ease-in-out ${delay}s infinite alternate
    `;
  });
}

// Add float animation
const floatAnimation = document.createElement("style");
floatAnimation.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(10px, -15px) rotate(5deg); }
    50% { transform: translate(-5px, -10px) rotate(-3deg); }
    75% { transform: translate(-10px, 5px) rotate(2deg); }
  }
`;
document.head.appendChild(floatAnimation);

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    showForm,
    togglePasswordVisibility,
    handleLogin,
    handleRegister,
    handleForgotPassword,
  };
}
