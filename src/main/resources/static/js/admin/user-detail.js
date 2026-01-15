document.addEventListener('DOMContentLoaded', async () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const adminContent = document.getElementById('adminContent');
    const userIdInput = document.getElementById('userId');

    const isLoggedIn = await checkLoginStatus();

    if (!isLoggedIn) {
        if (loadingScreen) loadingScreen.style.display = 'none';
        alert('Bạn cần đăng nhập để truy cập trang quản trị');
        window.location.href = '/auth/login';
        return;
    }

    if (loadingScreen) loadingScreen.style.display = 'none';
    if (adminContent) adminContent.style.display = 'flex';

    if (!userIdInput || !userIdInput.value) {
        alert('Không tìm thấy ID người dùng');
        return;
    }

    loadUserDetail(userIdInput.value);
});


async function loadUserDetail(userId) {
    try {
        const response = await fetch(`/account/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });

        const res = await response.json();

        if (response.ok && res.code === 200) {
            displayUser(res.data);
        } else {
            throw new Error(res.message || 'Không lấy được thông tin user');
        }
    } catch (e) {
        alert(e.message);
    }
}

function displayUser(user) {
    document.getElementById('username').textContent = user.username || 'N/A';
    document.getElementById('fullName').textContent = user.fullName || 'Chưa cập nhật';
    document.getElementById('email').textContent = user.email || 'Chưa cập nhật';
    document.getElementById('phone').textContent = user.phone || 'Chưa cập nhật';
    document.getElementById('address').textContent = user.address || 'Chưa cập nhật';

    document.getElementById('userRole').textContent =
        user.role || 'USER';

    document.getElementById('dateOfBirth').textContent =
        user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Chưa cập nhật';

    document.getElementById('dateCreate').textContent =
        user.dateCreate ? formatDate(user.dateCreate) : 'N/A';

    const avatar = document.getElementById('userAvatar');
    avatar.src = user.image
        ? `/images/user/${user.image}` : '/images/user/default.jpg';
}

async function deleteUser() {
    const userId = document.getElementById('userId').value;
    if (!userId) return;

    if (!confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) return;

    try {
        const response = await fetch(`/account/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.message || 'Xóa nguời dùng thất bại');
        }

        showNotification('Xóa nguời dùng thành công!', 'success');

        setTimeout(() => {
            window.location.href = '/manage/u';
        }, 1000);

    } catch (err) {
        showNotification(err.message, 'error');
    }
}


function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN');
}
