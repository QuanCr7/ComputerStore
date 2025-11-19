document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'http://localhost:8080';
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const successElement = document.getElementById('success');

    // Kiểm tra xem token có tồn tại không
    if (!token) {
        showError('Không tìm thấy token đặt lại mật khẩu');
        return;
    }

    // Xử lý form đặt lại mật khẩu mới
    document.getElementById('resetPasswordForm')?.addEventListener('submit', async function (event) {
        event.preventDefault();
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!newPassword || !confirmPassword) {
            showError('Vui lòng nhập đầy đủ mật khẩu');
            return;
        }

        if (newPassword !== confirmPassword) {
            showError('Mật khẩu xác nhận không khớp');
            return;
        }

        try {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            successElement.style.display = 'none';

            const response = await fetch(`${API_BASE_URL}/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();
            console.log('reset-password.js: Reset password response:', JSON.stringify(data, null, 2));

            if (response.ok && data.code === 200 && data.data === true) {
                showSuccess('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } else {
                throw new Error(data.message || 'Không thể đặt lại mật khẩu');
            }
        } catch (error) {
            console.error('reset-password.js: Lỗi:', error);
            showError(error.message);
        } finally {
            loadingElement.style.display = 'none';
        }
    });

    function showError(message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        successElement.style.display = 'none';
    }

    function showSuccess(message) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        errorElement.style.display = 'none';
    }
});