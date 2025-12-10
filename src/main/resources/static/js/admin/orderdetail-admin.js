// /js/user/orderdetail-admin.js
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let orderId = urlParams.get('id');

    const isLoggedIn = await checkLoginStatus();
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');

    if (!isLoggedIn) {
        console.log('order-detail-product.js: Chưa đăng nhập, hiển thị lỗi');
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement && errorTextElement) {
            errorElement.style.display = 'flex';
            errorTextElement.textContent = 'Bạn cần đăng nhập để xem chi tiết đơn hàng!';
            showError('Bạn cần đăng nhập để xem chi tiết đơn hàng!');
        } else {
            alert('Bạn cần đăng nhập để xem chi tiết đơn hàng!');
        }
        return;
    }

    if (!orderId || isNaN(orderId) || orderId === 'undefined') {
        console.error('order-detail-product.js: Không tìm thấy orderId hợp lệ trong URL');
        if (errorElement && errorTextElement) {
            errorElement.style.display = 'flex';
            errorTextElement.textContent = 'Không tìm thấy mã đơn hàng!';
            showError('Không tìm thấy mã đơn hàng!');
        }
        return;
    }

    loadOrderDetail(orderId);

    document.getElementById('printInvoice').addEventListener('click', () => {
        window.print();
    });

    document.getElementById('reorder').addEventListener('click', () => {
        reorder(orderId);
    });
});

async function loadOrderDetail(orderId) {
    const API_BASE_URL = 'http://localhost:8080';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    const orderContent = document.getElementById('orderContent');

    try {
        if (!getAccessToken()) {
            console.log('loadOrderDetail: Không có accessToken, thử làm mới token');
            const refreshed = await checkLoginStatus();
            if (!refreshed) {
                throw new Error('Bạn cần đăng nhập để xem chi tiết đơn hàng!');
            }
        }

        if (loadingElement) loadingElement.style.display = 'flex';
        if (errorElement) errorElement.style.display = 'none';
        if (orderContent) orderContent.style.display = 'none';

        const response = await fetch(`${API_BASE_URL}/order/detail/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();
        console.log('order-detail-product.js: Order detail response:', JSON.stringify(data, null, 2));

        if (response.ok && data.code === 200) {
            const order = data.data;
            displayOrderDetail(order);
            if (orderContent) orderContent.style.display = 'block';
            if (loadingElement) loadingElement.style.display = 'none';
        } else {
            throw new Error(data.message || 'Không thể lấy chi tiết đơn hàng');
        }
    } catch (error) {
        console.error('order-detail-product.js: Lỗi:', error);
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement && errorTextElement) {
            errorElement.style.display = 'flex';
            errorTextElement.textContent = error.message;
            showError(error.message);
        }
    }
}

function displayOrderDetail(order) {
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderIdDisplay').textContent = `#${order.id}`;
    document.getElementById('orderDate').textContent = formatDate(order.orderDate);

    const statusDisplay = document.getElementById('orderStatusDisplay');
    const statusActions = document.getElementById('statusActions');
    const statusSelect = document.getElementById('statusSelect');

    // Cập nhật trạng thái hiện tại
    const currentStatus = order.status;
    statusDisplay.textContent = getStatusText(currentStatus);
    statusDisplay.className = `order-status status-${currentStatus.toLowerCase()}`;
    statusDisplay.innerHTML = `<i class="fas fa-circle"></i> ${getStatusText(currentStatus)}`;

    const isAdmin = window.location.pathname.includes('/manage/');

    // === CHỈ HIỂN THỊ PHẦN CẬP NHẬT NẾU:
    // - Là Admin
    // - Và trạng thái KHÔNG PHẢI là CANCELLED hoặc COMPLETED
    if (isAdmin && !['CANCELLED', 'COMPLETED'].includes(currentStatus)) {
        statusActions.style.display = 'flex';
        statusSelect.value = currentStatus;
    } else {
        statusActions.style.display = 'none'; // Ẩn hoàn toàn nếu đã hủy hoặc hoàn thành
    }

    // Xử lý nút cập nhật (chỉ gắn sự kiện nếu đang hiển thị)
    const updateBtn = document.getElementById('updateStatusBtn');
    if (updateBtn && isAdmin && !['CANCELLED', 'COMPLETED'].includes(currentStatus)) {
        // Xóa listener cũ nếu có (tránh attach nhiều lần)
        updateBtn.replaceWith(updateBtn.cloneNode(true));
        const newUpdateBtn = document.getElementById('updateStatusBtn');

        newUpdateBtn.addEventListener('click', async () => {
            const newStatus = statusSelect.value;

            if (newStatus === currentStatus) {
                showNotification('Trạng thái không thay đổi', 'warning');
                return;
            }

            if (!confirm(`Chuyển trạng thái thành "${getStatusText(newStatus)}"?`)) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/order/status/${order.id}?status=${newStatus}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${getAccessToken()}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok && data.code === 200) {
                    // Cập nhật lại giao diện
                    statusDisplay.textContent = getStatusText(newStatus);
                    statusDisplay.className = `order-status status-${newStatus.toLowerCase()}`;
                    statusDisplay.innerHTML = `<i class="fas fa-circle"></i> ${getStatusText(newStatus)}`;

                    showNotification('Cập nhật trạng thái thành công!', 'success');

                    // === TỰ ĐỘNG ẨN PHẦN CẬP NHẬT NẾU CHUYỂN SANG CANCELLED HOẶC COMPLETED ===
                    if (newStatus === 'CANCELLED' || newStatus === 'COMPLETED') {
                        statusActions.style.display = 'none';
                    }
                } else {
                    alert(data.message || 'Cập nhật thất bại');
                }
            } catch (err) {
                console.error(err);
                alert('Lỗi kết nối khi cập nhật trạng thái');
            }
        });
    }

    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = '';
    order.orderDetails.forEach(item => {
        const imageUrl = item.image
            ? `http://localhost:8080/images/product/${item.image}`
            : 'https://via.placeholder.com/80x100';

        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <img src="${imageUrl}" alt="${item.product}" class="item-image">
            <div class="item-details">
                <h3 class="item-title">${item.product}</h3>
                <p class="item-price">${formatPrice(item.price)}</p>
                <p class="item-quantity">Số lượng: ${item.quantity}</p>
                <p class="item-info">Thương hiệu: ${item.brand} | Danh mục: ${item.category}</p>
            </div>
        `;
        orderItems.appendChild(itemElement);
    });

    // Tính tiền (có thể lấy từ backend tốt hơn)
    const subtotal = order.totalAmount || order.orderDetails.reduce((s, i) => s + i.price * i.quantity, 0);
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(30000);
    document.getElementById('discount').textContent = '-0 ₫';
    document.getElementById('total').textContent = formatPrice(subtotal + 30000);

    // Nút hủy đơn (chỉ user)
    const cancelButton = document.getElementById('cancelOrder');
    if (!isAdmin && (currentStatus === 'PENDING' || currentStatus === 'PROCESSING')) {
        if (cancelButton) cancelButton.style.display = 'inline-flex';
    } else if (cancelButton) {
        cancelButton.style.display = 'none';
    }
}

function getStatusText(status) {
    switch (status) {
        case 'PENDING': return 'Đang chờ xử lý';
        case 'PROCESSING': return 'Đang xử lý';
        case 'SHIPPED': return 'Đang vận chuyển';
        case 'COMPLETED': return 'Hoàn thành';
        case 'CANCELLED': return 'Đã hủy';
        default: return 'Không xác định';
    }
}

async function reorder(orderId) {
    const API_BASE_URL = 'http://localhost:8080';
    try {
        const response = await fetch(`${API_BASE_URL}/order/detail/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();
        console.log('order-detail-product.js: Reorder response:', JSON.stringify(data, null, 2));

        if (response.ok && data.code === 200) {
            const order = data.data;
            const cartItems = order.orderDetails.map(detail => ({
                id: detail.id,
                title: detail.product,
                price: detail.price,
                quantity: detail.quantity,
                image: detail.imageUrl ? `${API_BASE_URL}/images/product/${detail.imageUrl}` : 'https://via.placeholder.com/80x100'
            }));

            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert('Đã thêm các sản phẩm vào giỏ hàng!');
            window.location.href = '/pay';
        } else {
            showError(data.message || 'Không thể đặt lại đơn hàng');
        }
    } catch (error) {
        console.error('order-detail-product.js: Lỗi khi đặt lại đơn hàng:', error);
        showError('Lỗi khi đặt lại đơn hàng: ' + error.message);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}