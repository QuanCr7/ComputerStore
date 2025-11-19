let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Không tìm thấy ID sản phẩm');
        return;
    }

    loadProductDetail(productId);

    document.getElementById('addBtn').addEventListener('click', function() {
        if (currentProduct) {
            shoppingCart.addToCart(currentProduct);
            showToast('Đã thêm vào giỏ hàng!');
        } else {
            showError('Không thể thêm sản phẩm vào giỏ hàng');
        }
    });

    // Xử lý thumbnail click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('thumbnail')) {
            const mainImage = document.getElementById('mainImage');
            mainImage.src = e.target.src;

            // Cập nhật active class
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });

    // Xử lý form comment
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Cảm ơn bạn đã gửi đánh giá!');
        this.reset();
    });
});

function loadProductDetail(productId) {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productDetailElement = document.getElementById('product-detail');

    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    productDetailElement.style.display = 'none';

    fetch(`/p/searchId/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không tìm thấy sản phẩm');
            }
            return response.json();
        })
        .then(data => {
            loadingElement.style.display = 'none';
            if (data.data) {
                currentProduct = data.data;
                renderProductDetail(data.data);
                productDetailElement.style.display = 'block';
            } else {
                throw new Error('Không có dữ liệu sản phẩm');
            }
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
            console.error('Lỗi khi tải chi tiết sản phẩm:', error);
        });
}

function renderProductDetail(product) {
    // Hiển thị thông tin cơ bản
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productSubtitle').textContent = product.description ? product.description.split('.')[0] + '.' : '';
    document.getElementById('productBrand').textContent = product.brand || 'Intel';
    // document.getElementById('stockQuantity').textContent = product.stockQuantity || 0;
    document.getElementById('warranty').textContent = product.warranty || 0;
    document.getElementById('productDescription').textContent = product.description || 'Không có mô tả';

    // Định dạng giá
    const originalPrice = product.price;
    const discountPrice = product.discount > 0 ?
        originalPrice * (1 - product.discount / 100) : originalPrice;

    const priceElement = document.getElementById('productPrice');
    if (product.discount > 0) {
        priceElement.innerHTML = `
            <span class="original-price">${originalPrice.toLocaleString('vi-VN')}đ</span>
            ${discountPrice.toLocaleString('vi-VN')}đ
        `;
        document.getElementById('discountBadge').textContent = `-${product.discount}%`;
        document.getElementById('discountBadge').style.display = 'block';
        document.getElementById('discountText').textContent = `Tiết kiệm ${(originalPrice - discountPrice).toLocaleString('vi-VN')}đ (${product.discount}%)`;
        document.getElementById('discountText').style.display = 'block';
    } else {
        priceElement.textContent = `${originalPrice.toLocaleString('vi-VN')}đ`;
    }

    // Hiển thị stock badge
    // if (product.stockQuantity > 0) {
    //     document.getElementById('stockBadge').textContent = 'Còn hàng';
    //     document.getElementById('stockBadge').style.display = 'block';
    // } else {
    //     document.getElementById('stockBadge').textContent = 'Hết hàng';
    //     document.getElementById('stockBadge').style.display = 'block';
    //     document.getElementById('stockBadge').style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    // }

    // Định dạng ngày
    const createDate = new Date(product.createDate);
    document.getElementById('createDate').textContent = createDate.toLocaleDateString('vi-VN');

    // Hiển thị ảnh
    const mainImage = document.getElementById('mainImage');
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = '';

    if (product.images && product.images.length > 0) {
        const timestamp = new Date().getTime();
        mainImage.src = `/images/product/${product.images[0]}?t=${timestamp}`;
        mainImage.alt = product.name;

        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.src = `/images/product/${image}?t=${timestamp}`;
            thumbnail.alt = `${product.name} - Ảnh ${index + 1}`;
            thumbnailsContainer.appendChild(thumbnail);
        });
    } else {
        mainImage.src = 'https://via.placeholder.com/400x400/4a6cf7/ffffff?text=Không+có+ảnh';
    }

    // Hiển thị thông số kỹ thuật
    renderSpecifications(product.attributes);
}

function renderSpecifications(attributes) {
    const specsGrid = document.getElementById('specsGrid');
    specsGrid.innerHTML = '';

    if (!attributes || attributes.length === 0) {
        specsGrid.innerHTML = '<div class="spec-item">Không có thông số kỹ thuật</div>';
        return;
    }

    // Mapping từ key sang tên hiển thị đẹp
    const specLabels = {
        'series': { label: 'Series', icon: 'fas fa-microchip' },
        'thế_hệ': { label: 'Thế hệ', icon: 'fas fa-layer-group' },
        'cpu': { label: 'CPU', icon: 'fas fa-microchip' },
        'ra_mắt': { label: 'Ra mắt', icon: 'fas fa-calendar-star' },
        'số_nhân_xử_lý': { label: 'Số nhân xử lý', icon: 'fas fa-microchip' },
        'số_luồng_của_cpu': { label: 'Số luồng CPU', icon: 'fas fa-bolt' },
        'tốc_độ_xử_lý': { label: 'Tốc độ xử lý', icon: 'fas fa-tachometer-alt' },
        'tiêu_thụ_điện_năng': { label: 'Tiêu thụ điện năng', icon: 'fas fa-bolt' },
        'nhiệt_độ_tối_đa': { label: 'Nhiệt độ tối đa', icon: 'fas fa-thermometer-full' },
        'cache': { label: 'Cache', icon: 'fas fa-memory' },
        'socket': { label: 'Socket', icon: 'fas fa-plug' },
        'ram_hỗ_trợ': { label: 'RAM hỗ trợ', icon: 'fas fa-memory' },
        'đồ_họa_tích_hợp': { label: 'Đồ họa tích hợp', icon: 'fas fa-desktop' },
        'phiên_bản_pci_express': { label: 'Phiên bản PCI Express', icon: 'fas fa-expand-arrows-alt' }
    };

    // Các spec quan trọng cần highlight (gộp cả hiệu năng)
    const highlightSpecs = ['series', 'thế_hệ', 'số_nhân_xử_lý', 'số_luồng_của_cpu', 'tốc_độ_xử_lý', 'cache'];

    attributes.forEach(attr => {
        const specInfo = specLabels[attr.key] || { label: attr.key.replace(/_/g, ' '), icon: 'fas fa-cog' };

        const specItem = document.createElement('div');
        specItem.className = 'spec-item' + (highlightSpecs.includes(attr.key) ? ' highlight-spec' : '');

        specItem.innerHTML = `
            <div class="spec-label">
                <i class="${specInfo.icon}"></i>
                ${specInfo.label}
            </div>
            <div class="spec-value">${attr.value}</div>
        `;

        specsGrid.appendChild(specItem);
    });
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Thêm CSS animation cho toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);