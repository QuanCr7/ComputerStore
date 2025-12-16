// /js/user/update-account.js
document.addEventListener('DOMContentLoaded', async function () {

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    const formElement = document.getElementById('settingsForm');

    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        showToast('Bạn cần đăng nhập để chỉnh sửa thông tin!', 'error');
        setTimeout(() => window.location.href = '/', 1500);
        return;
    }

    await loadCurrentUserProfile();

    formElement.addEventListener('submit', handleFormSubmit);

    // Xem trước ảnh khi chọn file
    const imageUpload = document.getElementById('imageUpload');
    const avatarPreview = document.getElementById('avatarPreview');

    imageUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Dung lượng ảnh tối đa 5MB!');
                imageUpload.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function (ev) {
                avatarPreview.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

async function loadCurrentUserProfile() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    const formElement = document.getElementById('settingsForm');

    try {
        if (!getAccessToken()) {
            const refreshed = await checkLoginStatus();
            if (!refreshed) throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        }

        const response = await fetch(`${API_BASE_URL}/account/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
            const user = data.data;

            // Điền dữ liệu vào form
            document.getElementById('fullName').value = user.fullName || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('address').value = user.address || '';

            if (user.dateOfBirth) {
                document.getElementById('dateOfBirth').value = user.dateOfBirth.split('T')[0]; // YYYY-MM-DD
            }

            // Avatar
            const avatarPreview = document.getElementById('avatarPreview');
            if (user.imageUrl) {
                avatarPreview.src = `${API_BASE_URL}/images/user/${user.imageUrl}`;
            } else {
                avatarPreview.src = '/images/user/default-avatar.jpg';
            }

            // Hiển thị form
            formElement.style.display = 'block';
            loadingElement.style.display = 'none';
        } else {
            throw new Error(data.message || 'Không thể tải thông tin người dùng');
        }
    } catch (err) {
        loadingElement.style.display = 'none';
        showToast(err.message || 'Có lỗi xảy ra khi tải thông tin', 'error');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');

    loadingElement.style.display = 'flex';
    errorElement.style.display = 'none';

    try {
        if (!getAccessToken()) {
            const refreshed = await checkLoginStatus();
            if (!refreshed) throw new Error('Phiên đăng nhập hết hạn');
        }

        // Thu thập dữ liệu form
        const formData = new FormData();
        formData.append('fullName', document.getElementById('fullName').value.trim());
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('phone', document.getElementById('phone').value.trim());
        formData.append('address', document.getElementById('address').value.trim());

        const dateOfBirth = document.getElementById('dateOfBirth').value;
        if (dateOfBirth) {
            formData.append('dateOfBirth', dateOfBirth);
        }

        const imageFile = document.getElementById('imageUpload').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const currentUserResponse = await fetch(`${API_BASE_URL}/account/profile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${getAccessToken()}` },
            credentials: 'include'
        });
        const currentUserData = await currentUserResponse.json();
        const userId = currentUserData.data.userId;

        const response = await fetch(`${API_BASE_URL}/account/editUser/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();

        if (response.ok && result.code === 200) {
            showToast('Cập nhật thông tin thành công', 'success');
            setTimeout(() => { window.location.href = '/me'; }, 1500);
        } else {
            throw new Error(result.message || 'Cập nhật thất bại');
        }
    } catch (err) {
        showToast('Có lỗi xảy ra khi cập nhật thông tin!', 'error');
    } finally {
        loadingElement.style.display = 'none';
    }
}

function showError(message) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'none';
    showToast(message, 'error');
}