
        document.addEventListener('DOMContentLoaded', function() {
            const themeOptions = document.querySelectorAll('.theme-option');
            const body = document.body;

            // Theme switching 
            function setTheme(themeName) {
                body.setAttribute('data-theme', themeName);
                
                themeOptions.forEach(opt => {
                    opt.classList.remove('active');
                    if (opt.dataset.theme === themeName) {
                        opt.classList.add('active');
                    }
                });
            }

            // Add theme switching
            themeOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    setTheme(this.dataset.theme);
                });
            });

            // FORM TOGGLING 
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const forgotForm = document.getElementById('forgotForm');
            const toggleBtn = document.getElementById('toggleForm');
            const toggleText = document.getElementById('toggleText');
            const showForgot = document.getElementById('showForgot');
            const backToLogin = document.getElementById('backToLogin');
            const backLoginContainer = document.querySelector('.back-login');

            function showLogin() {
                // Hide all forms first
                loginForm.classList.add('active');
                registerForm.classList.remove('active');
                forgotForm.classList.remove('active');
                toggleText.textContent = "Don't have an account?";
                toggleBtn.textContent = "Register";
                backLoginContainer.classList.remove('active');
            }

            function showRegister() {
                // Hide all forms first
                registerForm.classList.add('active');
                loginForm.classList.remove('active');
                forgotForm.classList.remove('active');
                toggleText.textContent = "Already have an account?";
                toggleBtn.textContent = "Sign In";
                backLoginContainer.classList.remove('active');
            }

            function showForgotForm() {
                // Hide all forms first
                forgotForm.classList.add('active');
                loginForm.classList.remove('active');
                registerForm.classList.remove('active');
                backLoginContainer.classList.add('active');
                toggleText.textContent = "Remember your password?";
                toggleBtn.textContent = "Sign In";
            }

            toggleBtn.addEventListener('click', function() {
                if (loginForm.classList.contains('active') || forgotForm.classList.contains('active')) {
                    showRegister();
                } else {
                    showLogin();
                }
            });

            showForgot.addEventListener('click', showForgotForm);
            backToLogin.addEventListener('click', showLogin);

            // Password toggle
            document.querySelectorAll('.password-toggle').forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const passwordInput = document.getElementById(targetId);
                    const icon = this.querySelector('i');
                    
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    } else {
                        passwordInput.type = 'password';
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                });
            });

            // Prevent form submission
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                });
            });

            // Initialize with peach theme
            setTheme('peach');
        });
 