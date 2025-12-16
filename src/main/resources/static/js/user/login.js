// /js/user/login.js
document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    checkLoginStatus().then(isLoggedIn => {
        if (isLoggedIn) {
            showToast('Bạn đã đăng nhập', 'success');
            setTimeout(() => window.location.href = '/', 1000);
        }
    })

    // Toggle password
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                showToast('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu', 'error');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password }),
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok && data.code === 200) {
                    showToast('Đăng nhập thành công', 'success');
                    setAccessToken(data.data.accessToken);
                    localStorage.setItem('username', username);
                    updateHeaderAfterLogin(username);
                    setTimeout(() => window.location.href = '/', 1500);
                } else {
                    showToast('Tên đăng nhập hoặc mật khẩu không chính xác!', 'error');
                }
            } catch (error) {
                showError('Đã có lỗi xảy ra khi đăng nhập: ' + error.message);
            }
        });
    }
});