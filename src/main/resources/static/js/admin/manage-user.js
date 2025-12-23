let currentPage = 1;

let currentFilters = {
    name: '',
    email: '',
    phone: '',
    id: '',
    page: 1
};

let userToDelete = null;


document.addEventListener('DOMContentLoaded', () => {
    applyFiltersFromUrl();

    document.getElementById('confirmDelete')?.addEventListener('click', () => {
        if (userToDelete) deleteUser(userToDelete);
    });

    document.getElementById('cancelDelete')?.addEventListener('click', closeDeleteModal);
    document.getElementById('closeModal')?.addEventListener('click', closeDeleteModal);
});


function fetchUsers(page = 1) {
    currentPage = page;
    currentFilters.page = page;

    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = `<tr><td colspan="7" class="loading">Đang tải...</td></tr>`;

    const params = new URLSearchParams();
    params.append('page', page);

    if (currentFilters.name) params.append('name', currentFilters.name);
    if (currentFilters.email) params.append('email', currentFilters.email);
    if (currentFilters.phone) params.append('phone', currentFilters.phone);
    if (currentFilters.id) params.append('id', currentFilters.id);

    fetch(`/account/search?${params.toString()}`)
        .then(r => r.json())
        .then(res => {
            const data = res.data;
            renderUsers(data.users || []);
            renderPagination(data.currentPage, data.totalPages);
        })
        .catch(() => {
            tbody.innerHTML =
                `<tr><td colspan="7" class="text-danger text-center">Lỗi tải dữ liệu</td></tr>`;
        });
}


function applyFilters(page = 1) {
    currentFilters = {
        name: document.getElementById('filter-username').value.trim(),
        email: document.getElementById('filter-email').value.trim(),
        phone: document.getElementById('filter-phone').value.trim(),
        id: document.getElementById('filter-id').value,
        page
    };

    currentPage = page;
    updateUserUrl();
    fetchUsers(page);
}

function resetFilters() {
    document.getElementById('filter-username').value = '';
    document.getElementById('filter-email').value = '';
    document.getElementById('filter-phone').value = '';
    document.getElementById('filter-id').value = '';

    currentFilters = {
        name: '',
        email: '',
        phone: '',
        id: '',
        page: 1
    };

    currentPage = 1;
    updateUserUrl();
    fetchUsers(1);
}

/* ================= RENDER TABLE ================= */
function renderUsers(list) {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    if (!list.length) {
        tbody.innerHTML =
            `<tr><td colspan="7" style="text-align:center;">Không có dữ liệu</td></tr>`;
        return;
    }

    list.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="center">${u.userId}</td>
            <td>${u.username}</td>
            <td>${u.fullName || ''}</td>
            <td>${u.email}</td>
            <td class="center">${u.phone || 'N/A'}</td>
            <td class="center">${formatDate(u.dateCreate)}</td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="location.href='/u/detail?id=${u.userId}'"><i class="fas fa-eye"></i></button>
                <button class="action-btn delete"
                        onclick="confirmDeleteUser(${u.userId}, '${escapeJs(u.username)}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination-users');
    pagination.innerHTML = '';

    if (totalPages < 1) return;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'pagination-buttons';

    /* ===== PREVIOUS ===== */
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.title = 'Trang trước';
        prevBtn.onclick = () => applyFilters(currentPage - 1);
        buttonsDiv.appendChild(prevBtn);
    }

    /* ===== PAGE NUMBERS ===== */
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Trang đầu
    if (startPage > 1) {
        buttonsDiv.appendChild(createPageBtn(1));

        if (startPage > 2) {
            buttonsDiv.appendChild(createDots());
        }
    }

    // Các trang giữa
    for (let i = startPage; i <= endPage; i++) {
        const btn = createPageBtn(i);
        if (i === currentPage) btn.classList.add('active');
        buttonsDiv.appendChild(btn);
    }

    // Trang cuối
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            buttonsDiv.appendChild(createDots());
        }
        buttonsDiv.appendChild(createPageBtn(totalPages));
    }

    /* ===== NEXT ===== */
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.title = 'Trang sau';
        nextBtn.onclick = () => applyFilters(currentPage + 1);
        buttonsDiv.appendChild(nextBtn);
    }

    pagination.appendChild(buttonsDiv);
}

function createPageBtn(page) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn';
    btn.textContent = page;
    btn.onclick = () => applyFilters(page);
    return btn;
}

function createDots() {
    const dots = document.createElement('span');
    dots.className = 'pagination-ellipsis';
    dots.textContent = '...';
    return dots;
}

/* ================= DELETE ================= */
function confirmDeleteUser(id, name) {
    userToDelete = id;
    document.getElementById('userName').textContent = name;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    userToDelete = null;
    document.getElementById('deleteModal').classList.remove('active');
}

function deleteUser(id) {
    fetch(`/account/deleteUser/${id}`, { method: 'DELETE' })
        .then(r => {
            if (!r.ok) throw new Error('Xóa thất bại');
            return r.json();
        })
        .then(() => {
            showNotification('Xóa người dùng thành công!', 'success');
            fetchUsers(currentPage);
            closeDeleteModal();
        })
        .catch(err => showNotification(err.message, 'error'));
}

function applyFiltersFromUrl() {
    const params = new URLSearchParams(location.search);

    currentFilters = {
        name: params.get('name') || '',
        email: params.get('email') || '',
        phone: params.get('phone') || '',
        id: params.get('id') || '',
        page: parseInt(params.get('page')) || 1
    };

    currentPage = currentFilters.page;

    // set input
    document.getElementById('filter-username').value = currentFilters.name;
    document.getElementById('filter-email').value = currentFilters.email;
    document.getElementById('filter-phone').value = currentFilters.phone;
    document.getElementById('filter-id').value = currentFilters.id;

    fetchUsers(currentPage);
}

function updateUserUrl() {
    const params = new URLSearchParams();

    if (currentFilters.name) params.set('name', currentFilters.name);
    if (currentFilters.email) params.set('email', currentFilters.email);
    if (currentFilters.phone) params.set('phone', currentFilters.phone);
    if (currentFilters.id) params.set('id', currentFilters.id);
    if (currentFilters.page > 1) params.set('page', currentFilters.page);

    const newUrl = params.toString()
        ? `/manage/u?${params.toString()}`
        : '/manage/u';

    history.replaceState(null, '', newUrl);
}


function escapeJs(text) {
    return text.replace(/'/g, "\\'");
}
