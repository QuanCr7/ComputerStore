document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requestResetForm");
    const loading = document.getElementById("loading");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById("username");
            if (!usernameInput) return;

            const username = usernameInput.value.trim();

            if (!username) {
                showToast("Vui lòng nhập email hoặc username", "error");
                return;
            }

            if (username.includes('@')) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(username)) {
                    showToast("Email không hợp lệ", "error");
                    return;
                }
            }

            if (loading) loading.style.display = "block";

            try {
                const formData = new FormData();
                formData.append("username", username);

                const response = await fetch("/auth/forgot-password", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (!response.ok || result.success === false) {
                    throw new Error(result.message || "Có lỗi xảy ra khi gửi yêu cầu");
                }

                showToast("Đã gửi email đặt lại mật khẩu thành công!", "success");
                form.reset();

            } catch (err) {
                showToast(err.message || "Không thể kết nối máy chủ. Vui lòng thử lại sau", "error");
            } finally {
                if (loading) loading.style.display = "none";
            }
        });
    }
});