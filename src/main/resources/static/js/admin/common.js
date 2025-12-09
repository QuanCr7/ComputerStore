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

// Notification (chỉ 1 lần duy nhất)
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

// Phân trang chung (đẹp như bản mới)
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

// Modal chung
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    const modal = document.getElementById('deleteModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelDelete');
    const confirmBtn = document.getElementById('confirmDelete');

    if (closeBtn) closeBtn.onclick = () => modal?.classList.remove('active');
    if (cancelBtn) cancelBtn.onclick = () => modal?.classList.remove('active');
    if (modal) modal.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };

    // Quan trọng: gán sự kiện xác nhận xóa ở đây 1 lần duy nhất
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            if (currentDeleteId !== null) {
                window.performDelete(currentDeleteId); // hàm này sẽ do từng trang định nghĩa
                currentDeleteId = null;
            }
            modal?.classList.remove('active');
        };
    }
});