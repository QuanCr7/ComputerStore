document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resetPasswordForm");
    const error = document.getElementById("error");
    const success = document.getElementById("success");

    // Lấy token từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
        error.innerText = "❌ Token không hợp lệ hoặc đã hết hạn";
        error.style.display = "block";
        return;
    }

    document.getElementById("token").value = token;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        error.style.display = "none";
        success.style.display = "none";

        // ✅ Validate mật khẩu trùng nhau
        if (newPassword !== confirmPassword) {
            error.innerText = "❌ Mật khẩu nhập lại không khớp";
            error.style.display = "block";
            return;
        }

        if (newPassword.length < 6) {
            error.innerText = "❌ Mật khẩu phải có ít nhất 6 ký tự";
            error.style.display = "block";
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
                error.innerText = result.message || "❌ Đặt lại mật khẩu thất bại";
                error.style.display = "block";
                return;
            }

            success.innerText = "✅ Đặt lại mật khẩu thành công! Đang chuyển về đăng nhập...";
            success.style.display = "block";

            setTimeout(() => {
                window.location.href = "/auth/login";
            }, 3000);

        } catch (err) {
            error.innerText = "❌ Lỗi kết nối máy chủ";
            error.style.display = "block";
            console.error(err);
        }
    });
});
