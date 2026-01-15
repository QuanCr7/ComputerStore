document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resetPasswordForm");
    const error = document.getElementById("error");
    const success = document.getElementById("success");

    // Lấy token từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
        showToast("Token không hợp lệ hoặc đã hết hạn", "error");
        return;
    }

    const tokenInput = document.getElementById("token");
    if (tokenInput) {
        tokenInput.value = token;
    }

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const newPassword = document.getElementById("newPassword")?.value;
            const confirmPassword = document.getElementById("confirmPassword")?.value;

            if (!newPassword || !confirmPassword) {
                showToast("Vui lòng nhập đầy đủ thông tin mật khẩu", "error");
                return;
            }

            if (newPassword.length < 6) {
                showToast("Mật khẩu phải có ít nhất 6 ký tự", "error");
                return;
            }

            if (newPassword !== confirmPassword) {
                showToast("Mật khẩu nhập lại không khớp", "error");
                return;
            }

            try {
                const params = new URLSearchParams();
                params.append("token", token);
                params.append("newPassword", newPassword);

                const response = await fetch("/auth/reset-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: params.toString()
                });

                const result = await response.json();

                if (!response.ok || result.success === false) {
                    showToast(result.message || "Đặt lại mật khẩu thất bại", "error");
                    return;
                }

                showToast("Đặt lại mật khẩu thành công! Đang chuyển về đăng nhập...", "success");

                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1500);

            } catch (err) {
                showToast("Lỗi kết nối máy chủ. Vui lòng thử lại sau", "error");
            }
        });
    }

    // Thêm validation real-time
    const confirmPasswordInput = document.getElementById("confirmPassword");
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("blur", function() {
            const newPass = document.getElementById("newPassword")?.value;
            const confirmPass = this.value;

            if (confirmPass && newPass && newPass !== confirmPass) {
                showToast("Mật khẩu nhập lại không khớp", "error");
            }
        });
    }

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (!input) return;

            input.type = input.type === 'password' ? 'text' : 'password';

            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

});