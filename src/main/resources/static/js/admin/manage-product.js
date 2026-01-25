// /js/admin/manage-product.js
let currentPage = 1;
let currentFilters = {
    name: '',
    category: '',
    brand: '',
    page: 1
};

const categoryImageMap = {
    1: 'cpu.jpg', 2: 'card.jpg', 3: 'mainboard.jpg', 4: 'ram.jpg',
    5: 'ocung.jpg', 6: 'case.jpg', 7: 'tannhiet.jpg', 8: 'nguonmaytinh.png'
};

let categoryList = [];
let brandList = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCategoriesForAdmin();
    loadBrandsForAdmin();
    applyFiltersFromUrl();

    document.getElementById('adminSearchName')?.addEventListener('keyup', e => {
        if (e.key === 'Enter') adminApplyFilters();
    });

    document.getElementById('closeModal')?.addEventListener('click', () => {
        closeDeleteModal();
    });

    document.getElementById('cancelDelete')?.addEventListener('click', () => {
        closeDeleteModal();
    });

    document.getElementById('deleteModal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('deleteModal')) {
            closeDeleteModal();
        }
    });
});

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    window.currentDeleteId = null;
}

function loadCategoriesForAdmin() {
    const container = document.getElementById('adminCategoryOptions');
    container.innerHTML = '<div class="loading-mini">Đang tải danh mục...</div>';

    fetch('/categories')
        .then(r => r.json())
        .then(res => {
            container.innerHTML = '';
            categoryList = res.data || [];

            categoryList.forEach(cat => {
                const imgFile = categoryImageMap[cat.categoryId] || 'computer.jpg';
                const div = document.createElement('div');
                div.className = 'option';
                div.dataset.value = cat.name;
                div.dataset.id = cat.categoryId;
                div.innerHTML = `
                    <img src="/images/category/${imgFile}" alt="${cat.name}" onerror="this.src='/images/category/computer.jpg'">
                    <span class="name">${cat.name}</span>
                `;
                div.onclick = () => selectAdminCategory(cat.name);
                container.appendChild(div);
            });

            setTimeout(() => {
                const params = new URLSearchParams(location.search);
                const category = params.get('category');
                if (category) {
                    const option = [...document.querySelectorAll('#adminCategoryOptions .option')]
                        .find(el => el.dataset.value === category);
                    if (option) selectAdminCategory(category);
                }
            }, 100);
        })
        .catch(() => {
            container.innerHTML = '<div class="loading-mini text-danger">Lỗi tải danh mục</div>';
        });
}

function loadBrandsForAdmin() {
    const container = document.getElementById('adminBrandOptions');
    container.innerHTML = '<div class="loading-mini">Đang tải thương hiệu...</div>';

    fetch('/brands')
        .then(r => r.json())
        .then(res => {
            container.innerHTML = '';
            brandList = res.data || [];

            brandList.forEach(brand => {
                const imgUrl = brand.image ? `/images/brand/${brand.image}` : '/images/brand-default.jpg';
                const div = document.createElement('div');
                div.className = 'option';
                div.dataset.value = brand.name;
                div.dataset.id = brand.brandId;
                div.innerHTML = `
                    <img src="${imgUrl}" alt="${brand.name}" onerror="this.src='/images/brand-default.jpg'">
                    <span class="name">${brand.name}</span>
                `;
                div.onclick = () => selectAdminBrand(brand.name);
                container.appendChild(div);
            });

            setTimeout(() => {
                const params = new URLSearchParams(location.search);
                const brand = params.get('brand');
                if (brand) {
                    const option = [...document.querySelectorAll('#adminBrandOptions .option')]
                        .find(el => el.dataset.value === brand);
                    if (option) selectAdminBrand(brand);
                }
            }, 100);
        })
        .catch(() => {
            container.innerHTML = '<div class="loading-mini text-danger">Lỗi tải thương hiệu</div>';
        });
}

function selectAdminCategory(name) {
    const select = document.getElementById('adminCategorySelect');
    const display = select.querySelector('.selected-option span');
    display.textContent = name;
    display.classList.remove('placeholder');
    display.classList.add('value');
    select.classList.remove('open');
    currentFilters.category = name;
}

function selectAdminBrand(name) {
    const select = document.getElementById('adminBrandSelect');
    const display = select.querySelector('.selected-option span');
    display.textContent = name;
    display.classList.remove('placeholder');
    display.classList.add('value');
    select.classList.remove('open');
    currentFilters.brand = name;
}

function adminApplyFilters(page = 1) {
    const name = document.getElementById('adminSearchName').value.trim();
    currentFilters = { ...currentFilters, name, page };
    currentPage = page;
    updateAdminUrl();
    fetchFilteredProducts();
}

function adminResetFilters() {
    document.getElementById('adminSearchName').value = '';

    const catSpan = document.querySelector('#adminCategorySelect .selected-option span');
    catSpan.textContent = 'Tất cả danh mục';
    catSpan.classList.add('placeholder');
    catSpan.classList.remove('value');

    const brandSpan = document.querySelector('#adminBrandSelect .selected-option span');
    brandSpan.textContent = 'Tất cả thương hiệu';
    brandSpan.classList.add('placeholder');
    brandSpan.classList.remove('value');

    currentFilters = { name: '', category: '', brand: '', page: 1 };
    currentPage = 1;
    updateAdminUrl();
    fetchFilteredProducts();
}

function updateAdminUrl() {
    const params = new URLSearchParams();
    if (currentFilters.name) params.set('name', currentFilters.name);
    if (currentFilters.category) params.set('category', currentFilters.category);
    if (currentFilters.brand) params.set('brand', currentFilters.brand);
    if (currentFilters.page > 1) params.set('page', currentFilters.page);

    const newUrl = params.toString() ? `/manage/p?${params}` : '/manage/p';
    history.replaceState(null, '', newUrl);
}

function applyFiltersFromUrl() {
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';
    const category = params.get('category') || '';
    const brand = params.get('brand') || '';
    const page = parseInt(params.get('page')) || 1;

    document.getElementById('adminSearchName').value = name;
    currentFilters = { name, category, brand, page };
    currentPage = page;

    fetchFilteredProducts();
}

function fetchFilteredProducts() {
    const { name = '', category = '', brand = '', page = 1 } = currentFilters;
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu ...</td></tr>`;

    const params = new URLSearchParams();
    params.append('page', page);
    if (name) params.append('name', name);
    if (category) params.append('category', category);
    if (brand) params.append('brand', brand);

    fetch(`/p/search?${params.toString()}`)
        .then(r => {
            if (!r.ok) throw new Error('Không thể tải dữ liệu');
            return r.json();
        })
        .then(res => {
            renderProducts(res.data?.products || []);
            renderPagination(
                res.data?.currentPage || 1,
                res.data?.totalPages || 1,
                res.data?.totalProducts || 0
            );
        })
        .catch((error) => {
            console.error('Lỗi fetch products:', error);
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4">Lỗi tải dữ liệu: ${error.message}</td></tr>`;
            showToast('Không thể tải danh sách sản phẩm', 'error');
        });
}

function renderProducts(products) {
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = '';

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-5 text-muted">Không tìm thấy sản phẩm nào</td></tr>`;
        return;
    }

    products.forEach(p => {
        const price = Number(p.price);
        const disc = Number(p.discount || 0);
        const final = disc > 0 ? Math.round(price * (1 - disc/100)) : price;

        const priceHTML = disc > 0
            ? `<div style="color:#d70018;font-weight:600;">${final.toLocaleString('vi-VN')}₫</div>
               <div style="text-decoration:line-through;color:#666;font-size:0.9em;">${price.toLocaleString('vi-VN')}₫</div>`
            : `<div style="font-weight:600;">${price.toLocaleString('vi-VN')}₫</div>`;

        const catName = p.categoryName || p.category || 'Không có danh mục';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="center">${p.productId}</td>
            <td>
                <div style="font-weight:500;">${p.name}</div>
                ${p.code ? `<div style="font-size:0.85em;color:#666;">Mã: ${p.code}</div>` : ''}
            </td>
            <td class="center ${p.stockQuantity < 10 ? 'text-danger fw-bold' : ''}">
                ${p.stockQuantity}
                ${p.stockQuantity < 10 ? '<i class="fas fa-exclamation-triangle ms-1"></i>' : ''}
            </td>
            <td class="center">${catName}</td>
            <td class="center">${priceHTML}</td>
            <td class="action-buttons">
                <button class="action-btn view" title="Xem" onclick="viewProduct(${p.productId})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Sửa" onclick="editProduct(${p.productId})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Xóa" onclick="confirmDeleteProduct(${p.productId}, '${escapeHtml(p.name)}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewProduct(id) {
    window.location.href = `/p/detail?id=${id}`;
}

function editProduct(id) {
    window.location.href = `/update-product?id=${id}`;
}

function renderPagination(currentPage, totalPages, totalProducts = 0) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'pagination-buttons';

    // Nút Previous
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.title = 'Trang trước';
        prevBtn.onclick = () => {
            adminApplyFilters(currentPage - 1);
        };
        buttonsDiv.appendChild(prevBtn);
    }

    // Các nút số trang
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Nút trang đầu tiên
    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'pagination-btn';
        firstBtn.textContent = '1';
        firstBtn.onclick = () => adminApplyFilters(1);
        buttonsDiv.appendChild(firstBtn);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            buttonsDiv.appendChild(ellipsis);
        }
    }

    // Các nút trang
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.onclick = () => adminApplyFilters(i);
        buttonsDiv.appendChild(pageBtn);
    }

    // Nút trang cuối cùng
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            buttonsDiv.appendChild(ellipsis);
        }

        const lastBtn = document.createElement('button');
        lastBtn.className = 'pagination-btn';
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => adminApplyFilters(totalPages);
        buttonsDiv.appendChild(lastBtn);
    }

    // Nút Next
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.title = 'Trang sau';
        nextBtn.onclick = () => {
            adminApplyFilters(currentPage + 1);
        };
        buttonsDiv.appendChild(nextBtn);
    }

    pagination.appendChild(buttonsDiv);
}

function confirmDeleteProduct(id, name) {
    document.getElementById('productTitle').textContent = name;
    window.currentDeleteId = id;
    document.getElementById('deleteModal').classList.add('active');

    document.getElementById('confirmDelete').onclick = function() {
        if (window.currentDeleteId) {
            performDelete(window.currentDeleteId);
        }
        closeDeleteModal();
    };
}

function performDelete(id) {
    fetch(`/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }
    })
        .then(async r => {
            if (!r.ok) {
                if (r.status === 401 || r.status === 403) {
                    throw new Error('Bạn không có quyền xoá sản phẩm');
                }
                const err = await r.json().catch(() => ({ message: 'Xóa thất bại' }));
                throw new Error(err.message);
            }
            return r.json();
        })
        .then(() => {
            showToast('Xóa sản phẩm thành công!', 'success');
            fetchFilteredProducts();
        })
        .catch(err => {
            console.error(err);
            showToast(err.message, 'error');
        });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    const msgEl = document.getElementById('toastMessage');
    const icon = toast.querySelector('.toast-icon i');

    msgEl.textContent = message;

    if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    } else {
        icon.className = 'fas fa-check-circle';
    }

    toast.className = 'notification-toast';
    void toast.offsetWidth;

    toast.classList.add('show', type);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function closeToast() {
    document.getElementById('notificationToast').classList.remove('show');
}

// Thêm hàm xử lý dropdown cho các option
document.querySelectorAll('.custom-select .option').forEach(option => {
    option.addEventListener('click', function() {
        const value = this.dataset.value;
        const display = this.closest('.custom-select').querySelector('.selected-option span');
        display.textContent = value;
        display.classList.remove('placeholder');
        display.classList.add('value');

        const selectId = this.closest('.custom-select').id;
        if (selectId === 'adminCategorySelect') {
            currentFilters.category = value;
        } else if (selectId === 'adminBrandSelect') {
            currentFilters.brand = value;
        }
    });
});

// Xử lý click ngoài để đóng dropdown
document.addEventListener('click', e => {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        } else if (e.target.closest('.selected-option')) {
            select.classList.toggle('open');
        }
    });
});

// Thêm phím tắt ESC để đóng modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('deleteModal').classList.contains('active')) {
        closeDeleteModal();
    }
});