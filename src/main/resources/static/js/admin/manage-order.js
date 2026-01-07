// /js/admin/manage-order.js
let currentPage = 1;
let selectedStatus = 'ALL';

let currentFilters = {
    keyword: '',
    status: 'ALL',
    page: 1
};

document.addEventListener('DOMContentLoaded', async () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const adminContent = document.getElementById('adminContent');

    const isLoggedIn = await checkLoginStatus();

    if (!isLoggedIn) {
        if (loadingScreen) loadingScreen.style.display = 'none';
        alert('Bạn cần đăng nhập để truy cập trang quản trị');
        window.location.href = '/login';
        return;
    }

    // Đã đăng nhập → cho hiển thị admin
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (adminContent) adminContent.style.display = 'flex';

    initCustomSelect();
    applyFiltersFromUrl();

    document.getElementById('orderKeyword')?.addEventListener('keyup', e => {
        if (e.key === 'Enter') applyFilters(1);
    });
});

function initCustomSelect() {
    document.addEventListener('click', e => {
        document.querySelectorAll('.custom-select').forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });

    document.querySelectorAll('.custom-select').forEach(select => {
        const selected = select.querySelector('.selected-option');
        const options = select.querySelectorAll('.option');

        selected.onclick = () => {
            select.classList.toggle('open');
        };

        options.forEach(option => {
            option.onclick = () => {
                selectedStatus = option.dataset.value;
                select.querySelector('.placeholder').textContent = option.textContent;
                select.classList.remove('open');
            };
        });
    });
}

function applyFilters(page = 1) {
    currentFilters = {
        keyword: document.getElementById('orderKeyword')?.value.trim() || '',
        status: selectedStatus,
        page
    };

    currentPage = page;
    updateUrl();
    fetchOrders();
}

function resetFilters() {
    document.getElementById('orderKeyword').value = '';
    selectedStatus = 'ALL';

    document.querySelector('#orderStatusSelect .placeholder')
        .textContent = 'Tất cả trạng thái';

    applyFilters(1);
}

function updateUrl() {
    const params = new URLSearchParams();

    if (currentFilters.keyword)
        params.set('keyword', currentFilters.keyword);

    if (currentFilters.status && currentFilters.status !== 'ALL')
        params.set('status', currentFilters.status);

    if (currentFilters.page > 1)
        params.set('page', currentFilters.page);

    const query = params.toString();

    const newUrl = query ? `/manage/o?${query}` : `/manage/o`;

    history.replaceState(null, '', newUrl);
}

function applyFiltersFromUrl() {
    const params = new URLSearchParams(location.search);

    currentFilters.keyword = params.get('keyword') || '';
    currentFilters.status = params.get('status') || 'ALL';
    currentFilters.page = parseInt(params.get('page')) || 1;

    document.getElementById('orderKeyword').value = currentFilters.keyword;
    selectedStatus = currentFilters.status;

    document.querySelector('#orderStatusSelect .placeholder')
        .textContent = getStatusText(selectedStatus) || 'Tất cả trạng thái';

    fetchOrders();
}

function fetchOrders() {
    const tbody = document.getElementById('orders-table-body');
    const pagination = document.getElementById('pagination-orders');

    tbody.innerHTML = `<tr><td colspan="7" class="loading">Đang tải dữ liệu đơn hàng...</td></tr>`;
    pagination.innerHTML = '';

    const params = new URLSearchParams(currentFilters);

    fetch(`/order/search?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }
    }).then(r => {
            if (!r.ok) throw new Error('Không tải được đơn hàng');
            return r.json();
        })
        .then(res => {
            const data = res.data;
            if (data?.orders?.length) {
                renderOrders(data.orders);
                renderPagination(data.currentPage, data.totalPages);
            } else {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="center text-muted py-4">
                            Không có đơn hàng nào
                        </td>
                    </tr>`;
            }
        })
        .catch(err => {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="center text-danger py-4">
                        ${err.message}
                    </td>
                </tr>`;
        });
}

function renderOrders(orders) {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';

    orders.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="center">${o.id}</td>
            <td class="center">${o.phone || 'N/A'}</td>
            <td class="center">${formatPrice(o.totalAmount)}</td>
            <td class="center">${o.shippingAddress || 'N/A'}</td>
            <td class="center">${formatDate(o.orderDate)}</td>
            <td class="center">
                <span class="status ${o.status.toLowerCase()}">
                    ${getStatusText(o.status)}
                </span>
            </td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="viewOrder(${o.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>`;
        tbody.appendChild(tr);
    });
}

function renderPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination-orders');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

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
        const firstBtn = document.createElement('button');
        firstBtn.className = 'pagination-btn';
        firstBtn.textContent = '1';
        firstBtn.onclick = () => applyFilters(1);
        buttonsDiv.appendChild(firstBtn);

        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.className = 'pagination-ellipsis';
            dots.textContent = '...';
            buttonsDiv.appendChild(dots);
        }
    }

    // Các trang giữa
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.onclick = () => applyFilters(i);
        buttonsDiv.appendChild(btn);
    }

    // Trang cuối
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.className = 'pagination-ellipsis';
            dots.textContent = '...';
            buttonsDiv.appendChild(dots);
        }

        const lastBtn = document.createElement('button');
        lastBtn.className = 'pagination-btn';
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => applyFilters(totalPages);
        buttonsDiv.appendChild(lastBtn);
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

function viewOrder(id) {
    location.href = `/manage/o/detail?id=${id}`;
}

function getStatusText(status) {
    return {
        ALL: 'Tất cả trạng thái',
        PENDING: 'Chờ xử lý',
        PROCESSING: 'Đang xử lý',
        SHIPPING: 'Đang vận chuyển',
        COMPLETED: 'Hoàn thành',
        CANCELLED: 'Đã hủy'
    }[status] || status;
}
