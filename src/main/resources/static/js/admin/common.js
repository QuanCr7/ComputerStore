// /js/admin/common.js
let categoriesMap = {};
let currentDeleteId = null;

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

            // Gắn sự kiện logout cho admin
            const adminLogoutBtn = document.getElementById('admin-logout-btn');
            if (adminLogoutBtn) {
                adminLogoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
            }


        } catch (err) {
            console.error('Admin auth failed:', err);
            document.body.innerHTML = '';
            showNotification('Truy cập bị từ chối!', 'error');
            setTimeout(() => window.location.replace('/auth/login'), 800);
        }
    })();

    // Modal xóa
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