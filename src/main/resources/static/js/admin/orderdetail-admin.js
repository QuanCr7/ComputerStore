// /js/user/orderdetail-admin.js
document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');

    const isLoggedIn = await checkLoginStatus();

    if (!isLoggedIn) {
        if (loadingElement) loadingElement.style.display = 'none';
        showErrorUI('Bạn cần đăng nhập để xem chi tiết đơn hàng!');
        return;
    }

    if (!orderId || isNaN(orderId)) {
        showErrorUI('Không tìm thấy mã đơn hàng!');
        return;
    }

    loadOrderDetail(orderId);
});

/* ================= LOAD ORDER ================= */
async function loadOrderDetail(orderId) {
    const API_BASE_URL = 'http://localhost:8080';

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    const orderContent = document.getElementById('orderContent');

    try {
        if (loadingElement) loadingElement.style.display = 'flex';
        if (errorElement) errorElement.style.display = 'none';
        if (orderContent) orderContent.style.display = 'none';

        const response = await fetch(`${API_BASE_URL}/order/detail/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok && result.code === 200) {
            displayOrderDetail(result.data);
            if (orderContent) orderContent.style.display = 'block';
        } else {
            throw new Error(result.message || 'Không thể tải đơn hàng');
        }
    } catch (err) {
        showErrorUI(err.message);
    } finally {
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

function displayOrderDetail(order) {
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderIdDisplay').textContent = `${order.id}`;
    document.getElementById('orderDate').textContent = formatDate(order.orderDate);

    /* ===== USER ID (CLICKABLE) ===== */
    const userIdEl = document.getElementById('userId');
    userIdEl.textContent = order.userId;
    userIdEl.onclick = () => {
        window.location.href = `/u/detail?id=${order.userId}`;
    };

    document.getElementById('name').textContent = order.name || 'Không có';
    document.getElementById('phone').textContent = order.phone || 'Không có';
    document.getElementById('shippingAddress').textContent = order.shippingAddress || 'Không có';

    renderOrderStatus(order);

    renderOrderItems(order.orderDetails);

    renderSummary(order);

    handleCancelButton(order);
}

function renderOrderStatus(order) {
    const statusDisplay = document.getElementById('orderStatusDisplay');
    const statusActions = document.getElementById('statusActions');
    const statusSelect = document.getElementById('statusSelect');
    const updateBtn = document.getElementById('updateStatusBtn');

    if (!statusDisplay) return;

    const currentStatus = order.status;
    const isAdmin = window.location.pathname.includes('/manage/');

    statusDisplay.className = `order-status status-${currentStatus.toLowerCase()}`;
    statusDisplay.innerHTML = `<i class="fas fa-circle"></i> ${getStatusText(currentStatus)}`;

    if (!statusActions || !statusSelect || !updateBtn) {
        return;
    }

    if (isAdmin && !['CANCELLED', 'COMPLETED'].includes(currentStatus)) {
        statusActions.style.display = 'flex';
        statusSelect.value = currentStatus;

        const statusFlow = ['PENDING', 'PROCESSING', 'SHIPPING', 'COMPLETED'];
        const currentIndex = statusFlow.indexOf(currentStatus);

        [...statusSelect.options].forEach(option => {
            option.disabled = false;

            const optionIndex = statusFlow.indexOf(option.value);

            if (optionIndex !== -1 && optionIndex < currentIndex) {
                option.disabled = true;
            }
        });
    } else {
        statusActions.style.display = 'none';
        return;
    }


    updateBtn.replaceWith(updateBtn.cloneNode(true));
    const newBtn = document.getElementById('updateStatusBtn');

    if (!newBtn) return;

    newBtn.onclick = async () => {
        const newStatus = statusSelect.value;
        if (newStatus === currentStatus) return;

        try {
            const res = await fetch(
                `http://localhost:8080/order/status/${order.id}?status=${newStatus}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${getAccessToken()}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await res.json();
            if (res.ok && data.code === 200) {
                statusDisplay.className = `order-status status-${newStatus.toLowerCase()}`;
                statusDisplay.innerHTML = `<i class="fas fa-circle"></i> ${getStatusText(newStatus)}`;
                showNotification('Cập nhật thành công', 'success');

                if (['CANCELLED', 'COMPLETED'].includes(newStatus)) {
                    statusActions.style.display = 'none';
                }
            }
        } catch {
            alert('Lỗi kết nối');
        }
    };
}

function renderOrderItems(items) {
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = '';

    items.forEach(item => {
        const image = item.image
            ? `http://localhost:8080/images/product/${item.image}`
            : 'https://via.placeholder.com/80x100';

        orderItems.innerHTML += `
            <div class="order-item">
                <img src="${image}" class="item-image">
                <div class="item-details">
                    <div class="item-title">${item.product}</div>
                    <div class="item-price">${formatPrice(item.price)}</div>
                    <div class="item-quantity">Số lượng: ${item.quantity}</div>
                    <div class="item-info">Thương hiệu: ${item.brand} | Danh mục: ${item.category}</div>
                </div>
            </div>
        `;
    });
}

function renderSummary(order) {
    const subtotal = order.totalAmount;
    document.getElementById('subtotal').textContent = formatPrice(subtotal - 10000);
    document.getElementById('shipping').textContent = formatPrice(10000);
    document.getElementById('total').textContent = formatPrice(subtotal);
}

function handleCancelButton(order) {
    const cancelBtn = document.getElementById('cancelOrder');

    if (!cancelBtn) return;

    const isAdmin = window.location.pathname.includes('/manage/');

    if (!isAdmin && ['PENDING', 'PROCESSING'].includes(order.status)) {
        cancelBtn.style.display = 'inline-flex';
    } else {
        cancelBtn.style.display = 'none';
    }
}

function getStatusText(status) {
    return {
        PENDING: 'Đang chờ xử lý',
        PROCESSING: 'Đang xử lý',
        SHIPPING: 'Đang vận chuyển',
        COMPLETED: 'Hoàn thành',
        CANCELLED: 'Đã hủy'
    }[status] || 'Không xác định';
}

function formatDate(date) {
    return new Date(date).toLocaleString('vi-VN', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function showErrorUI(message) {
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    if (errorElement && errorTextElement) {
        errorElement.style.display = 'flex';
        errorTextElement.textContent = message;
    } else {
        alert(message);
    }
}