let currentProduct = null;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Không tìm thấy ID sản phẩm');
        return;
    }

    loadProductDetail(productId);
});

// Đổi ảnh khi click thumbnail
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('thumbnail')) {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = e.target.src;

        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
    }
});

// LOAD CHI TIẾT SẢN PHẨM
function loadProductDetail(productId) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const detail = document.getElementById('product-detail');

    loading.style.display = 'block';
    error.style.display = 'none';
    detail.style.display = 'none';

    fetch(`/p/searchId/${productId}`)
        .then(res => {
            if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
            return res.json();
        })
        .then(result => {
            if (!result.data) throw new Error('Dữ liệu sản phẩm trống');

            currentProduct = result.data;
            renderProductDetail(currentProduct);

            loading.style.display = 'none';
            detail.style.display = 'block';
        })
        .catch(err => {
            loading.style.display = 'none';
            error.textContent = 'Lỗi: ' + err.message;
            error.style.display = 'block';
            console.error('Lỗi tải sản phẩm:', err);
        });
}

// HIỂN THỊ CHI TIẾT SẢN PHẨM
function renderProductDetail(product) {
    document.getElementById('productName').textContent = product.name || 'Chưa đặt tên';
    document.getElementById('productSubtitle').textContent =
        product.description?.split('.')[0] ? product.description.split('.')[0] + '.' : 'Không có mô tả ngắn';

    document.getElementById('productBrand').textContent = product.brand || 'Chưa xác định';
    document.getElementById('warranty').textContent = product.warranty || 0;
    document.getElementById('productDescription').textContent = product.description || 'Không có mô tả chi tiết';

    // Tính và hiển thị giá sau giảm
    const price = Number(product.price);
    const discount = Number(product.discount || 0);
    const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;
    const priceEl = document.getElementById('productPrice');

    if (discount > 0) {
        priceEl.innerHTML = `
            <span class="original-price">${price.toLocaleString('vi-VN')}đ</span>
            <span class="final-price">${Math.round(finalPrice).toLocaleString('vi-VN')}đ</span>
        `;
        document.getElementById('discountBadge').textContent = `-${discount}%`;
        document.getElementById('discountBadge').style.display = 'block';
        document.getElementById('discountText').textContent = `Tiết kiệm ${(price - finalPrice).toLocaleString('vi-VN')}đ`;
        document.getElementById('discountText').style.display = 'block';
    } else {
        priceEl.innerHTML = `<span class="final-price">${price.toLocaleString('vi-VN')}đ</span>`;
        document.getElementById('discountBadge').style.display = 'none';
        document.getElementById('discountText').style.display = 'none';
    }

    // Ngày thêm sản phẩm
    document.getElementById('createDate').textContent =
        new Date(product.createDate).toLocaleDateString('vi-VN');

    // Xử lý ảnh
    const mainImg = document.getElementById('mainImage');
    const thumbsContainer = document.getElementById('thumbnails');
    thumbsContainer.innerHTML = '';
    const ts = Date.now();

    if (product.images && product.images.length > 0) {
        mainImg.src = `/images/product/${product.images[0]}?t=${ts}`;
        mainImg.alt = product.name;

        product.images.forEach((img, i) => {
            const thumb = document.createElement('img');
            thumb.className = 'thumbnail' + (i === 0 ? ' active' : '');
            thumb.src = `/images/product/${img}?t=${ts}`;
            thumb.alt = `Ảnh ${i + 1}`;
            thumbsContainer.appendChild(thumb);
        });
    } else {
        mainImg.src = 'https://placehold.co/600x800/eee/999/png?text=Chưa+có+ảnh&font=roboto';
        mainImg.alt = 'Không có ảnh sản phẩm';
    }

    // Hiển thị thông số kỹ thuật
    renderSpecifications(product.attributes || []);
}

// HIỂN THỊ THÔNG SỐ KỸ THUẬT
function renderSpecifications(attributes) {
    const grid = document.getElementById('specsGrid');
    grid.innerHTML = '';

    if (!attributes || attributes.length === 0) {
        grid.innerHTML = '<div class="spec-item">Không có thông số kỹ thuật nào.</div>';
        return;
    }

    const labels = {
        'series': 'Series',
        'thế_hệ': 'Thế hệ CPU',
        'cpu': 'CPU',
        'số_nhân_xử_lý': 'Số nhân',
        'số_luồng_của_cpu': 'Số luồng',
        'tốc_độ_xử_lý': 'Tốc độ xử lý',
        'cache': 'Cache',
        'socket': 'Socket',
        'ram_hỗ_trợ': 'RAM hỗ trợ',
        'đồ_họa_tích_hợp': 'Đồ họa tích hợp'
    };

    attributes.forEach(attr => {
        const label = labels[attr.key] || attr.key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        const item = document.createElement('div');
        item.className = 'spec-item';
        item.innerHTML = `
            <div class="spec-label">${label}</div>
            <div class="spec-value">${attr.value || '—'}</div>
        `;
        grid.appendChild(item);
    });
}

// HIỂN THỊ LỖI
function showError(msg) {
    const el = document.getElementById('error');
    el.textContent = msg;
    el.style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}