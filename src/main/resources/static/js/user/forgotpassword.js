document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'http://localhost:8080';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const successElement = document.getElementById('success');

    // Xử lý form yêu cầu đặt lại mật khẩu
    document.getElementById('requestResetForm')?.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();

        if (!email) {
            showError('Vui lòng nhập email');
            return;
        }

        try {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            successElement.style.display = 'none';

            const response = await fetch(`${API_BASE_URL}/auth/forgot-password?email=${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();
            console.log('forgot-password-request.js: Forgot password response:', JSON.stringify(data, null, 2));

            if (response.ok && data.code === 200) {
                showSuccess('Đã gửi email hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.');
                document.getElementById('requestResetForm').reset();
            } else {
                throw new Error(data.message || 'Không thể gửi yêu cầu đặt lại mật khẩu');
            }
        } catch (error) {
            console.error('forgot-password-request.js: Lỗi:', error);
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