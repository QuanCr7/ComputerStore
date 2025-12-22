// manage-order.js
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders(1);

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', () => fetchOrders(1));
    }

    const searchInput = document.getElementById('searchOrder');
    if (searchInput) {
        searchInput.addEventListener('keyup', e => {
            if (e.key === 'Enter') fetchOrders(1);
        });
    }
});

function fetchOrders(page = 1) {
    currentPage = page;

    const tbody = document.getElementById('orders-table-body');
    const pagination = document.getElementById('pagination-orders');

    const keyword = document.getElementById('searchOrder')?.value.trim() || '';
    const status = document.getElementById('statusFilter')?.value || 'ALL';

    tbody.innerHTML = `<tr><td colspan="7" class="loading">Đang tải...</td></tr>`;
    if (pagination) pagination.innerHTML = '';

    const params = new URLSearchParams({
        page,
        keyword,
        status
    });

    fetch(`/order/search?${params.toString()}`)
        .then(res => {
            if (!res.ok) throw new Error('Không tải được đơn hàng');
            return res.json();
        })
        .then(res => {
            const data = res.data;
            if (data?.orders?.length > 0) {
                renderOrders(data.orders);
                renderPagination(data.currentPage, data.totalPages);
            } else {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align:center;padding:40px;color:#6c757d;">
                            Không có đơn hàng nào
                        </td>
                    </tr>`;
            }
        })
        .catch(err => {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="color:#dc3545;text-align:center;">
                        Lỗi: ${err.message}
                    </td>
                </tr>`;
        });
}

function renderOrders(orders) {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';

    orders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="center">#${o.id}</td>
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
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderPagination(current, total) {
    const pagination = document.getElementById('pagination-orders');
    pagination.innerHTML = '';

    for (let i = 1; i <= total; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === current ? 'active' : '';
        btn.onclick = () => fetchOrders(i);
        pagination.appendChild(btn);
    }
}

function viewOrder(id) {
    location.href = `/manage/o/detail?id=${id}`;
}

function getStatusText(status) {
    return {
        PENDING: 'Chờ xử lý',
        PROCESSING: 'Đang xử lý',
        SHIPPING: 'Đang vận chuyển',
        COMPLETED: 'Hoàn thành',
        CANCELLED: 'Đã hủy'
    }[status] || status;
}
