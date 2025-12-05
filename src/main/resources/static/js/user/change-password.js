// /js/user/change-password.js
document.addEventListener('DOMContentLoaded', async function () {
    const API_BASE_URL = 'http://localhost:8080';

    // Kiểm tra đăng nhập
    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để đổi mật khẩu!');
        window.location.href = '/login';
        return;
    }

    const form = document.getElementById('changePasswordForm');
    const loading = document.getElementById('loading');
    const errorEl = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successEl = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Reset thông báo
        errorEl.style.display = 'none';
        successEl.style.display = 'none';
        loading.style.display = 'flex';

        try {
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
                successText.textContent = 'Đổi mật khẩu thành công!';
                successEl.style.display = 'flex';
                form.reset();
            } else {
                throw new Error(result.message || 'Đổi mật khẩu thất bại');
            }
        } catch (err) {
            errorText.textContent = err.message;
            errorEl.style.display = 'flex';
        } finally {
            loading.style.display = 'none';
        }
    });

    // Kiểm tra 2 mật khẩu khớp nhau ngay khi gõ
    function checkPasswordMatch() {
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        const message = document.getElementById('passwordMatchMessage');

        if (confirmPass === '') {
            message.style.display = 'none';
            return;
        }

        if (newPass === confirmPass) {
            message.style.display = 'none';
            document.getElementById('confirmPassword').setCustomValidity('');
        } else {
            message.style.display = 'block';
            document.getElementById('confirmPassword').setCustomValidity('Mật khẩu mới không khớp');
        }
    }

    document.getElementById('newPassword').addEventListener('input', checkPasswordMatch);
});