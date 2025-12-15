document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requestResetForm");
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const success = document.getElementById("success");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();

        loading.style.display = "block";
        error.style.display = "none";
        success.style.display = "none";

        try {
            const formData = new FormData();
            formData.append("username", username);

            const response = await fetch("/auth/forgot-password", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            loading.style.display = "none";

            if (!response.ok || result.success === false) {
                error.innerText = result.message || "Có lỗi xảy ra";
                error.style.display = "block";
                return;
            }

            success.innerText =
                "Đã gửi email đặt lại mật khẩu";
            success.style.display = "block";
            form.reset();

        } catch (err) {
            loading.style.display = "none";
            error.innerText = "❌ Không thể kết nối máy chủ";
            error.style.display = "block";
            console.error(err);
        }
    });
});
