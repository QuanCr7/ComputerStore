// /js/user/change-password.js
document.addEventListener('DOMContentLoaded', async function () {
    const API_BASE_URL = 'http://localhost:8080';

    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        showToast('Bạn cần đăng nhập để đổi mật khẩu!', 'error');
        setTimeout(() => window.location.href = '/auth/login', 1500);
        return;
    }

    const form = document.getElementById('changePasswordForm');
    const loading = document.getElementById('loading');
    const errorEl = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successEl = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (!input) return;

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });


    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            showToast('Mật khẩu mới không trùng khớp!', 'error');
            return;
        }

        loading.style.display = 'flex';

        try {
            if (!getAccessToken()) {
                const refreshed = await checkLoginStatus();
                if (!refreshed) {
                    throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                }
            }

            const response = await fetch(`${API_BASE_URL}/account/change-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                    confirmPassword
                }),
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok && result.code === 200) {
                showToast('Đổi mật khẩu thành công!', 'success');
                setTimeout(() => window.location.href = '/me', 1500);
            } else {
                throw new Error(result.message || 'Đổi mật khẩu thất bại');
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            loading.style.display = 'none';
        }
    });

    function checkPasswordMatch() {
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        const message = document.getElementById('passwordMatchMessage');

        if (confirmPass === '') {
            if (message) message.style.display = 'none';
            return;
        }

        if (newPass === confirmPass) {
            if (message) message.style.display = 'none';
            document.getElementById('confirmPassword').setCustomValidity('');
        } else {
            if (message) message.style.display = 'block';
            document.getElementById('confirmPassword').setCustomValidity('');
        }
    }

    document.getElementById('confirmPassword').addEventListener('blur', function() {
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = this.value;

        if (confirmPass && newPass !== confirmPass) {
            showToast('Mật khẩu mới không trùng khớp!', 'error');
        }
    });

    document.getElementById('newPassword').addEventListener('input', checkPasswordMatch);
    document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
});