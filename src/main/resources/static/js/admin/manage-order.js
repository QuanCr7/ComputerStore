// orders.js
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders(1);

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.onchange = () => fetchOrders(1);
    }

    const searchInput = document.getElementById('searchOrder');
    if (searchInput) {
        searchInput.addEventListener('keyup', e => {
            if (e.key === 'Enter') searchOrders();
        });
    }
});

function searchOrders() {
    const keyword = document.getElementById('searchOrder')?.value.trim() || '';
    fetchOrders(1, keyword);
}

function fetchOrders(page = 1, keyword = '') {
    currentPage = page;
    const tbody = document.getElementById('orders-table-body');
    const pagination = document.getElementById('pagination-orders');

    tbody.innerHTML = `<tr><td colspan="7" class="loading">Đang tải...</td></tr>`;
    if (pagination) pagination.innerHTML = '';

    let url = `/order/all`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Không tải được đơn hàng');
            return res.json();
        })
        .then(data => {
            if (data.data?.orders?.length > 0) {
                renderOrders(data.data.orders);
                renderPagination(data.data.currentPage, data.data.totalPages, fetchOrders);
            } else {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:#6c757d;">Không có đơn hàng nào</td></tr>`;
            }
        })
        .catch(err => {
            tbody.innerHTML = `<tr><td colspan="7" style="color:#dc3545;text-align:center;">Lỗi: ${err.message}</td></tr>`;
        });
}

function renderOrders(orders) {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';

    orders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${o.id}</td>
            <td>${formatDate(o.orderDate)}</td>
            <td>${o.shippingAddress || 'N/A'}</td>
            <td>${o.phone || 'N/A'}</td>
            <td>${formatPrice(o.totalAmount)}</td>
            <td><span class="status ${o.status.toLowerCase()}">${getStatusText(o.status)}</span></td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="viewOrder(${o.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getStatusText(status) {
    const map = {
        PENDING: 'Chờ xử lý',
        PROCESSING: 'Đang xử lý',
        SHIPPING: 'Đang vận chuyển',
        COMPLETED: 'Hoàn thành',
        CANCELLED: 'Đã hủy'
    };
    return map[status] || status;
}

function viewOrder(id) {
    location.href = `/manage/o/detail?id=${id}`;
}