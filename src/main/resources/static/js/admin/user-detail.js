document.addEventListener('DOMContentLoaded', () => {
    const userId = document.getElementById('userId')?.value;

    if (!userId) {
        alert('Không tìm thấy ID người dùng');
        return;
    }

    loadUserDetail(userId);
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

    document.getElementById('dateOfBirth').textContent =
        user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Chưa cập nhật';

    document.getElementById('joinDate').textContent =
        user.dateCreate ? formatDate(user.dateCreate) : 'N/A';

    const avatar = document.getElementById('userAvatar');
    avatar.src = user.image
        ? `/images/user/${user.image}`
        : '/images/user/default.jpg';
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN');
}
