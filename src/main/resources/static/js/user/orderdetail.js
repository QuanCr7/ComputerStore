// /js/user/orderdetail.js
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let orderId = urlParams.get('id');

    const isLoggedIn = await checkLoginStatus();
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');

    if (!isLoggedIn) {
        showToast('Bạn cần đăng nhập để xem chi tiết đơn hàng!', 'error');
        setTimeout(() => window.location.href = '/auth/login', 1500);
        return;
    }

    if (!orderId || isNaN(orderId) || orderId === 'undefined') {
        showToast('Không tìm thấy mã đơn hàng!', 'error');
        if (errorElement && errorTextElement) {
            errorElement.style.display = 'flex';
            errorTextElement.textContent = 'Không tìm thấy mã đơn hàng!';
        }
        return;
    }

    loadOrderDetail(orderId);

    const printInvoice = document.getElementById('printInvoice');
    const reorderBtn = document.getElementById('reorder');

    if (printInvoice) {
        printInvoice.addEventListener('click', () => {
            window.print();
        });
    }

    if (reorderBtn) {
        reorderBtn.addEventListener('click', () => {
            reorder(orderId);
        });
    }
});

async function loadOrderDetail(orderId) {
    const API_BASE_URL = 'http://localhost:8080';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    const orderContent = document.getElementById('orderContent');

    try {
        if (!getAccessToken()) {
            const refreshed = await checkLoginStatus();
            if (!refreshed) {
                showToast('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!', 'error');
                return;
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

        if (response.ok && data.code === 200) {
            const order = data.data;
            displayOrderDetail(order);
            if (orderContent) orderContent.style.display = 'block';
            if (loadingElement) loadingElement.style.display = 'none';
        } else {
            throw new Error(data.message || 'Không thể lấy chi tiết đơn hàng');
        }
    } catch (error) {
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement && errorTextElement) {
            errorElement.style.display = 'flex';
            errorTextElement.textContent = error.message;
        }
        showToast(error.message || 'Có lỗi xảy ra khi tải chi tiết đơn hàng', 'error');
    }
}

function displayOrderDetail(order) {
    const API_BASE_URL = 'http://localhost:8080';

    // Cập nhật thông tin đơn hàng
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderIdDisplay').textContent = `${order.id}`;
    document.getElementById('orderDate').textContent = formatDate(order.orderDate);

    const statusElement = document.getElementById('orderStatus');
    if (statusElement) {
        statusElement.textContent = getStatusText(order.status);
        statusElement.className = `order-status status-${order.status.toLowerCase()}`;
        statusElement.innerHTML = `<i class="fas fa-check-circle"></i> ${getStatusText(order.status)}`;
    }

    document.getElementById('name').textContent = order.name || 'N/A';
    document.getElementById('phone').textContent = order.phone || 'N/A';
    document.getElementById('shippingAddress').textContent = order.shippingAddress || 'N/A';

    // Hiển thị sản phẩm
    const orderItems = document.getElementById('orderItems');
    if (orderItems) {
        orderItems.innerHTML = '';
        order.orderDetails.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';

            const imageUrl = item.image
                ? `${API_BASE_URL}/images/product/${item.image}`
                : 'https://via.placeholder.com/80x100';

            itemElement.innerHTML = `
                <img src="${imageUrl}" alt="${item.product || 'Sản phẩm'}" class="item-image">
                <div class="item-details">
                    <h3 class="item-title">${item.product || 'Không có tên'}</h3>
                    <p class="item-price">${formatPrice(item.price)}</p>
                    <p class="item-quantity">Số lượng: ${item.quantity}</p>
                    <p class="item-info">Thương hiệu: ${item.brand || 'N/A'} | Danh mục: ${item.category || 'N/A'}</p>
                </div>
            `;
            orderItems.appendChild(itemElement);
        });
    }

    // Tính toán tổng tiền
    const subtotal = order.orderDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20000;
    const discount = subtotal > 100000 ? 10000 : 0;
    const total = subtotal + shipping - discount;

    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('discount').textContent = `-${formatPrice(discount)}`;
    document.getElementById('total').textContent = formatPrice(total);

    // Xử lý nút hủy đơn hàng
    const cancelButton = document.getElementById('cancelOrder');
    if (cancelButton) {
        // Kiểm tra và hiển thị nút hủy dựa trên trạng thái
        if (order.status === 'PENDING' || order.status === 'PROCESSING') {
            cancelButton.style.display = 'inline-flex';

            // Xóa event listener cũ để tránh gắn nhiều lần
            cancelButton.replaceWith(cancelButton.cloneNode(true));
            const newCancelButton = document.getElementById('cancelOrder');

            // Gắn event listener mới
            newCancelButton.addEventListener('click', async function () {
                const urlParams = new URLSearchParams(window.location.search);
                const currentOrderId = urlParams.get('id');

                if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?\nHành động này không thể hoàn tác.')) {
                    return;
                }

                try {
                    const response = await fetch(`${API_BASE_URL}/order/cancel/${currentOrderId}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${getAccessToken()}`,
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    });

                    const data = await response.json();

                    if (response.ok && data.code === 200) {
                        showToast('Đơn hàng đã được hủy thành công!', 'success');

                        // Cập nhật giao diện
                        const statusElement = document.getElementById('orderStatus');
                        if (statusElement) {
                            statusElement.textContent = 'Đã hủy';
                            statusElement.className = 'order-status status-cancelled';
                            statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Đã hủy';
                        }

                        // Ẩn nút hủy
                        newCancelButton.style.display = 'none';
                    } else {
                        showToast(data.message || 'Không thể hủy đơn hàng', 'error');
                    }
                } catch (error) {
                    showToast('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại!', 'error');
                }
            });
        } else {
            cancelButton.style.display = 'none';
        }
    }
}

function getStatusText(status) {
    const statusMap = {
        'PENDING': 'Đang chờ xử lý',
        'PROCESSING': 'Đang xử lý',
        'SHIPPED': 'Đang vận chuyển',
        'COMPLETED': 'Hoàn thành',
        'CANCELLED': 'Đã hủy'
    };
    return statusMap[status] || 'Không xác định';
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
            showToast('Đã thêm các sản phẩm vào giỏ hàng!', 'success');
            setTimeout(() => {
                window.location.href = '/pay';
            }, 1500);
        } else {
            showToast(data.message || 'Không thể đặt lại đơn hàng', 'error');
        }
    } catch (error) {
        showToast('Lỗi khi đặt lại đơn hàng: ' + error.message, 'error');
    }
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
}

function formatPrice(price) {
    try {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    } catch {
        return price;
    }
}