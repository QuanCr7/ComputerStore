// /js/user/pay.js
let checkoutCart = [];

document.addEventListener('DOMContentLoaded', async function() {
    // Kiểm tra auth.js đã tải chưa
    if (typeof checkLoginStatus === 'undefined' || typeof getAccessToken === 'undefined') {
        showToast('Lỗi hệ thống: Không thể tải thư viện xác thực', 'error');
        return;
    }

    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = await checkLoginStatus();
    const infoSourceSelect = document.getElementById('infoSource');

    // Nếu chưa đăng nhập, ẩn tùy chọn "Sử dụng thông tin tài khoản"
    if (!isLoggedIn) {
        if (infoSourceSelect) {
            infoSourceSelect.innerHTML = `
                <option value="manual">Nhập thông tin mới</option>
            `;
        }
    }

    // Đồng bộ giỏ hàng từ sessionStorage và localStorage
    checkoutCart = JSON.parse(sessionStorage.getItem('checkoutCart')) || JSON.parse(localStorage.getItem('cart')) || [];
    if (checkoutCart.length === 0) {
        showToast('Giỏ hàng của bạn đang trống', 'error');
        setTimeout(() => window.location.href = '/', 2000);
        return;
    }

    // Lưu giỏ hàng vào sessionStorage để đảm bảo không mất khi reload
    sessionStorage.setItem('checkoutCart', JSON.stringify(checkoutCart));

    // Hiển thị sách từ giỏ hàng
    renderCartItems(checkoutCart);
    calculateTotal(checkoutCart);

    // Các trường nhập liệu
    const fields = {
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        address: document.getElementById('address')
    };

    // Xử lý dropdown nguồn thông tin
    if (infoSourceSelect) {
        infoSourceSelect.addEventListener('change', async function() {
            const value = this.value;

            // Khóa hoặc mở khóa các trường
            const disableFields = value === 'account';
            Object.values(fields).forEach(field => {
                if (field) field.disabled = disableFields;
            });

            if (value === 'account' && isLoggedIn) {
                try {
                    const response = await fetch('http://localhost:8080/account/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${getAccessToken()}`,
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    });

                    const data = await response.json();

                    if (response.ok && data.code === 200) {
                        const profile = data.data;

                        if (fields.name) fields.name.value = profile.fullName || profile.name || '';
                        if (fields.phone) fields.phone.value = profile.phone || '';
                        if (fields.address) fields.address.value = profile.address || '';
                    } else {
                        showToast(data.message || 'Không thể lấy thông tin tài khoản', 'error');
                        infoSourceSelect.value = 'manual';
                        Object.values(fields).forEach(field => {
                            if (field) field.disabled = false;
                        });
                    }
                } catch (error) {
                    showToast('Lỗi khi lấy thông tin tài khoản: ' + error.message, 'error');
                    infoSourceSelect.value = 'manual';
                    Object.values(fields).forEach(field => {
                        if (field) field.disabled = false;
                    });
                }
            } else {
                // Xóa các trường để người dùng nhập mới
                Object.values(fields).forEach(field => {
                    if (field) field.value = '';
                });
            }
        });
    }

    // Gán sự kiện cho nút thanh toán
    const completeOrderBtn = document.getElementById('completeOrderBtn');
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener('click', completeOrder);
    }
});

function renderCartItems(cartItems) {
    const productItemsContainer = document.getElementById('productItemsContainer');
    if (!productItemsContainer) return;

    productItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-price">${formatPrice(item.price)}</p>
                <div class="product-quantity">
                    <span>Số lượng: ${item.quantity}</span>
                </div>
            </div>
        `;
        productItemsContainer.appendChild(productItem);
    });
}

function calculateTotal(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20000;
    const discount = subtotal > 100000 ? 10000 : 0;
    const total = subtotal + shipping - discount;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (discountEl) discountEl.textContent = `-${formatPrice(discount)}`;
    if (totalEl) totalEl.textContent = formatPrice(total);
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

async function completeOrder(e) {
    e.preventDefault();

    // Kiểm tra đăng nhập
    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        showToast('Bạn cần đăng nhập để đặt hàng', 'error');
        return;
    }

    // Basic form validation
    const fields = {
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        address: document.getElementById('address')
    };

    // Kiểm tra các trường bắt buộc
    const missingFields = [];
    if (!fields.name || !fields.name.value.trim()) missingFields.push('họ tên');
    if (!fields.phone || !fields.phone.value.trim()) missingFields.push('số điện thoại');
    if (!fields.address || !fields.address.value.trim()) missingFields.push('địa chỉ');

    if (missingFields.length > 0) {
        showToast(`Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}`, 'error');
        return;
    }

    if (checkoutCart.length === 0) {
        showToast('Giỏ hàng của bạn đang trống', 'error');
        return;
    }

    // Tạo đối tượng đơn hàng
    const order = {
        shippingAddress: fields.address.value.trim(),
        name: fields.name.value.trim(),
        phone: fields.phone.value.trim(),
        totalAmount: calculateOrderTotal(checkoutCart),
        orderDate: new Date().toISOString(),
        orderDetails: checkoutCart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }))
    };

    // Hiển thị loading
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'flex';

    // Gửi đơn hàng đến server
    try {
        const response = await fetch('http://localhost:8080/order/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
            credentials: 'include',
            body: JSON.stringify(order)
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
            showToast('Đơn hàng của bạn đã được đặt thành công!', 'success');

            // Xóa giỏ hàng sau khi đặt hàng thành công
            localStorage.removeItem('cart');
            sessionStorage.removeItem('checkoutCart');

            // Chuyển hướng về trang chủ sau 2 giây
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            throw new Error(data.message || 'Không thể đặt đơn hàng');
        }
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

function calculateOrderTotal(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20000;
    const discount = subtotal > 100000 ? 10000 : 0;
    return subtotal + shipping - discount;
}