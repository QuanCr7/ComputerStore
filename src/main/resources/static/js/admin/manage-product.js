// /js/admin/manage-product.js
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(1);

    // Tìm kiếm bằng Enter
    document.getElementById('searchInput')?.addEventListener('keyup', e => {
        if (e.key === 'Enter') searchProducts();
    });
});

function searchProducts() {
    const kw = document.getElementById('searchInput')?.value.trim() || '';
    fetchProducts(1, kw);
}

function fetchProducts(page = 1, keyword = '') {
    currentPage = page;
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Đang tải...</td></tr>`;

    const url = keyword
        ? `/home/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
        : `/home?page=${page}`;

    fetch(url)
        .then(r => r.json())
        .then(res => {
            renderProducts(res.data?.products || []);
            renderPagination(res.data?.currentPage || 1, res.data?.totalPages || 1, fetchProducts, keyword);
        })
        .catch(() => {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4">Lỗi tải dữ liệu</td></tr>`;
        });
}

function renderProducts(products) {
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = '';

    products.forEach(p => {
        const price = Number(p.price);
        const disc = Number(p.discount || 0);
        const final = disc > 0 ? Math.round(price * (1 - disc/100)) : price;

        const priceHTML = disc > 0
            ? `<div style="color:#d70018;font-weight:600;">${final.toLocaleString('vi-VN')}₫</div>`
            : `${price.toLocaleString('vi-VN')}₫`;

        const catName = categoriesMap[p.category] || 'Chưa có';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="center">${p.productId}</td>
            <td>${p.name}</td>
            <td class="center">${p.stockQuantity}</td>
            <td class="center">${catName}</td>
            <td class="center">${priceHTML}</td>
            <td class="action-buttons">
                <button class="action-btn view"   title="Xem"   onclick="location.href='/p/detail?id=${p.productId}'"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit"   title="Sửa"   onclick="location.href='/update-product?id=${p.productId}'"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" title="Xóa"   onclick="confirmDeleteProduct(${p.productId}, '${p.name.replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hàm gọi modal (dùng chung currentDeleteId)
function confirmDeleteProduct(id, name) {
    document.getElementById('productTitle').textContent = name;
    currentDeleteId = id;
    document.getElementById('deleteModal').classList.add('active');
}

// Hàm thực hiện xóa – common.js sẽ gọi hàm này
window.performDelete = function(id) {
    fetch(`/deleteProduct/${id}`, { method: 'DELETE' })
        .then(r => {
            if (!r.ok) throw new Error('Xóa thất bại');
            return r.json();
        })
        .then(() => {
            showNotification('Xóa sản phẩm thành công!', 'success');
            fetchProducts(currentPage);
        })
        .catch(err => showNotification(err.message || 'Lỗi xóa', 'error'));
};