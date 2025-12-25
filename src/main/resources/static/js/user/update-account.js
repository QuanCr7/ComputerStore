// /js/user/update-account.js
document.addEventListener('DOMContentLoaded', async function () {

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const formElement = document.getElementById('settingsForm');

    // 1️⃣ Kiểm tra đăng nhập
    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        showToast('Bạn cần đăng nhập để chỉnh sửa thông tin!', 'error');
        setTimeout(() => window.location.href = '/', 1500);
        return;
    }

    // 2️⃣ Load profile
    await loadCurrentUserProfile();

    // 3️⃣ Submit form
    formElement.addEventListener('submit', handleFormSubmit);

    // 4️⃣ Preview ảnh
    const imageUpload = document.getElementById('imageUpload');
    const avatarPreview = document.getElementById('avatarPreview');

    imageUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showToast('Dung lượng ảnh tối đa 5MB!', 'error');
            imageUpload.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = ev => avatarPreview.src = ev.target.result;
        reader.readAsDataURL(file);
    });
});

async function loadCurrentUserProfile() {
    const loadingElement = document.getElementById('loading');
    const formElement = document.getElementById('settingsForm');

    try {
        const response = await fetch(`${API_BASE_URL}/account/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            },
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok || result.code !== 200) {
            throw new Error(result.message || 'Không thể tải thông tin người dùng');
        }

        const user = result.data;

        document.getElementById('fullName').value = user.fullName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('address').value = user.address || '';

        if (user.dateOfBirth) {
            document.getElementById('dateOfBirth').value =
                user.dateOfBirth.split('T')[0];
        }

        const avatarPreview = document.getElementById('avatarPreview');
        avatarPreview.src = user.image
            ? `/images/user/${user.image}`
            : '/images/user/default-avatar.jpg';

        loadingElement.style.display = 'none';
        formElement.style.display = 'block';

    } catch (err) {
        loadingElement.style.display = 'none';
        showToast(err.message || 'Lỗi tải thông tin', 'error');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'flex';

    try {
        const formData = new FormData();
        formData.append('fullName', document.getElementById('fullName').value.trim());
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('phone', document.getElementById('phone').value.trim());
        formData.append('address', document.getElementById('address').value.trim());

        const dateOfBirth = document.getElementById('dateOfBirth').value;
        if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);

        const imageFile = document.getElementById('imageUpload').files[0];
        if (imageFile) formData.append('image', imageFile);

        const response = await fetch(`${API_BASE_URL}/account/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok || result.code !== 200) {
            throw new Error(result.message || 'Cập nhật thất bại');
        }

        showToast('Cập nhật thông tin thành công', 'success');
        setTimeout(() => window.location.href = '/me', 1500);

    } catch (err) {
        showToast(err.message || 'Có lỗi xảy ra khi cập nhật', 'error');
    } finally {
        loadingElement.style.display = 'none';
    }
}