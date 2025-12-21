// /js/admin/users.js
let currentPage = 1;
let userToDelete = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(1);

    document.getElementById('confirmDelete')?.addEventListener('click', () => {
        if (userToDelete) deleteUser(userToDelete);
    });
});

function searchUsers() {
    const kw = document.getElementById('searchUser')?.value.trim() || '';
    fetchUsers(1, kw);
}

function fetchUsers(page = 1, keyword = '') {
    currentPage = page;
    const tbody = document.getElementById('users-table-body');

    tbody.innerHTML = `<tr><td colspan="7" class="loading">Đang tải...</td></tr>`;

    const url = keyword ? `/account/search?keyword=${keyword}&page=${page}` : `/account?page=${page}`;

    fetch(url)
        .then(r => r.json())
        .then(res => {
            const users = res.data?.users || [];
            renderUsers(users);
            renderPagination(res.data.currentPage, res.data.totalPages, fetchUsers, keyword);
        })
        .catch(() => {
            tbody.innerHTML = `<tr><td colspan="7" style="color:red;text-align:center;">Lỗi tải dữ liệu</td></tr>`;
        });
}

function renderUsers(list) {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    list.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="center">${u.userId}</td>
            <td>${u.username}</td>
            <td>${u.fullName || ''}</td>
            <td>${u.email}</td>
            <td class="center">${u.phone || 'N/A'}</td>
            <td>${formatDate(u.dateCreate)}</td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="location.href='/u/detail?id=${u.userId}'"><i class="fas fa-eye"></i></button>
                <button class="action-btn delete" onclick="confirmDeleteUser(${u.userId}, '${u.username}')".replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function confirmDeleteUser(id, name) {
    document.getElementById('userName').textContent = name;
    userToDelete = id;
    document.getElementById('deleteModal').classList.add('active');
}

function deleteUser(id) {
    fetch(`/account/delete/${id}`, { method: 'DELETE' })
        .then(r => {
            if (!r.ok) throw new Error('Xóa thất bại');
            return r.json();
        })
        .then(() => {
            showNotification('Xóa người dùng thành công!', 'success');
            fetchUsers(currentPage);
            document.getElementById('deleteModal').classList.remove('active');
        })
        .catch(err => showNotification(err.message, 'error'));
}