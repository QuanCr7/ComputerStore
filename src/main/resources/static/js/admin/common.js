// /js/admin/common.js
let categoriesMap = {};
let currentDeleteId = null;

// Format
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try { return new Date(dateString).toLocaleDateString('vi-VN'); }
    catch { return dateString; }
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Notification
function showNotification(msg, type = 'success') {
    const n = document.getElementById('notification');
    const m = document.getElementById('notification-message');
    if (!n || !m) return;
    m.textContent = msg;
    n.className = `notification ${type} show`;
    setTimeout(() => n.classList.remove('show'), 3200);
}

// Load danh mục
function loadCategories() {
    fetch('/categories')
        .then(r => r.json())
        .then(res => {
            res.data?.forEach(c => {
                if (c.categoryId) categoriesMap[c.categoryId] = c.name;
            });
        })
        .catch(() => {});
}

function updateAdminHeader() {
    const usernameEl = document.getElementById('admin-username');
    const logoutBtn = document.getElementById('admin-logout-btn');

    if (!usernameEl) return;

    const user = getCurrentUser(); // từ auth.js

    if (user && user.username) {
        usernameEl.textContent = user.username;

        // Gán sự kiện logout cho cả 2 nút (sidebar + topbar)
        const logoutLinks = document.querySelectorAll('#admin-logout-btn, .sidebar-menu a.logout');
        logoutLinks.forEach(link => {
            link.onclick = (e) => {
                e.preventDefault();
                logout(); // hàm từ auth.js
            };
        });
    } else {
        // Không có user → chuyển về login
        usernameEl.textContent = 'Khách';
    }
}

// Phân trang
function renderPagination(currentPage, totalPages, fetchFunction, keyword = '') {
    const container = document.getElementById('pagination') || document.querySelector('.pagination');
    if (!container) return;
    container.innerHTML = '';

    const createBtn = (text, page, active = false) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        if (active) btn.classList.add('active');
        btn.onclick = () => fetchFunction(page, keyword);
        container.appendChild(btn);
    };

    if (currentPage > 1) createBtn('<<', currentPage - 1);

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
        createBtn('1', 1);
        if (start > 2) container.innerHTML += '<span>...</span>';
    }

    for (let i = start; i <= end; i++) {
        createBtn(i, i, i === currentPage);
    }

    if (end < totalPages) {
        if (end < totalPages - 1) container.innerHTML += '<span>...</span>';
        createBtn(totalPages, totalPages);
    }

    if (currentPage < totalPages) createBtn('>>', currentPage + 1);
}

// Modal xóa
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    const loadingScreen = document.getElementById('loadingScreen');
    const adminContent = document.getElementById('adminContent');

    (async () => {
        try {
            const isLoggedIn = await checkLoginStatus();
            if (!isLoggedIn) throw new Error('Not logged in');

            const user = await fetchCurrentUser();
            if (!user || user.role !== 'ADMIN') throw new Error('Not admin');

            const loadingScreen = document.getElementById('loadingScreen');
            const adminContent = document.getElementById('adminContent');

            if (loadingScreen) loadingScreen.remove();

            if (adminContent) {
                adminContent.style.display = 'block'; // hoặc 'flex' nếu dùng flexbox
            }
            document.body.classList.add('authenticated');

            // Hiển thị tên admin
            const usernameEl = document.getElementById('admin-username');
            if (usernameEl) {
                usernameEl.textContent = user.fullName || user.username || 'Admin';
            }

        } catch (err) {
            console.error('Admin auth failed:', err);
            document.body.innerHTML = '';
            showNotification('Truy cập bị từ chối!', 'error');
            setTimeout(() => window.location.replace('/auth/login'), 800);
        }
    })();

    // Modal xóa (giữ nguyên)
    const modal = document.getElementById('deleteModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelDelete');
    const confirmBtn = document.getElementById('confirmDelete');

    if (closeBtn) closeBtn.onclick = () => modal?.classList.remove('active');
    if (cancelBtn) cancelBtn.onclick = () => modal?.classList.remove('active');
    if (modal) modal.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };

    if (confirmBtn) {
        confirmBtn.onclick = () => {
            if (currentDeleteId !== null) {
                window.performDelete(currentDeleteId);
                currentDeleteId = null;
            }
            modal?.classList.remove('active');
        };
    }
});