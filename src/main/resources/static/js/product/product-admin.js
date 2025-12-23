let currentProduct = null;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showToast('Không tìm thấy ID sản phẩm', 'error');
        setTimeout(() => history.back(), 2000);
        return;
    }

    document.getElementById('productIdDisplay').textContent = productId;
    loadProductDetail(productId);
});

function loadProductDetail(id) {
    fetch(`/p/searchId/${id}`)
        .then(r => r.ok ? r.json() : Promise.reject('Không tìm thấy sản phẩm'))
        .then(res => {
            currentProduct = res.data;
            renderProductDetail(currentProduct);
            document.getElementById('loadingScreen').style.display = 'none';
        })
        .catch(err => {
            showToast(err.message || 'Lỗi tải sản phẩm', 'error');
        });
}

function renderProductDetail(p) {
    const container = document.getElementById('product-detail-container');
    const price = Number(p.price);
    const discount = Number(p.discount || 0);
    const finalPrice = discount > 0 ? Math.round(price * (1 - discount/100)) : price;

    const imagesHtml = p.images?.length > 0
        ? `<img src="/images/product/${p.images[0]}" class="main-image" alt="${p.name}">
           <div class="thumbnails">
             ${p.images.map((img, i) => `<img src="/images/product/${img}" 
                  class="${i===0?'active':''}" onclick="changeMainImage(this)">`).join('')}
           </div>`
        : `<img src="https://placehold.co/600x600/eee/999?text=No+Image" class="main-image" alt="No image">`;

    const specsHtml = (p.attributes || [])
        .map(attr => `
            <tr>
                <td>${formatKey(attr.key)}</td>
                <td>${attr.value || '—'}</td>
            </tr>
        `).join('') || '<tr><td colspan="2">Không có thông số</td></tr>';

    container.innerHTML = `
        <div class="product-detail-header">
            <h1>${p.name}</h1>
            <p>Thương hiệu: <strong>${p.brand}</strong> | Danh mục: <strong>${p.category}</strong></p>
        </div>
        <div class="product-detail-body">
            <div class="product-grid">
                <div class="product-images">
                    ${imagesHtml}
                </div>
                <div class="product-info-section">
                    <div class="info-block price-block">
                        <h3>Giá bán</h3>
                        ${discount > 0 ? `
                            <div style="font-size:1.5rem;color:#dc3545;font-weight:700;">
                                ${finalPrice.toLocaleString('vi-VN')}đ
                            </div>
                            <del style="color:#999;">${price.toLocaleString('vi-VN')}đ</del>
                            <span style="background:#dc3545;color:white;padding:4px 8px;border-radius:4px;margin-left:10px;">
                                -${discount}%
                            </span>
                        ` : `<div style="font-size:2rem;font-weight:700;color:#28a745;">
                                ${price.toLocaleString('vi-VN')}đ
                              </div>`}
                        <p>Tồn kho: <strong>${p.stockQuantity}</strong> sản phẩm</p>
                        <p>Bảo hành: <strong>${p.warranty} tháng</strong></p>
                    </div>

                    <div class="info-block">
                        <h3>Mô tả sản phẩm</h3>
                        <p style="line-height:1.8;color:#444;">${p.description || 'Chưa có mô tả'}</p>
                    </div>

                    <div class="info-block">
                        <h3>Thông số kỹ thuật</h3>
                        <table class="specs-table">${specsHtml}</table>
                    </div>

                    <div class="action-bar">
                        <a href="/update-product?id=${p.productId}" class="btn btn-primary btn-large">
                            <i class="fas fa-edit"></i> Chỉnh sửa sản phẩm
                        </a>
                        <button onclick="history.back()" class="btn btn-secondary btn-large">
                            <i class="fas fa-arrow-left"></i> Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function changeMainImage(thumb) {
    const main = thumb.closest('.product-images').querySelector('.main-image');
    main.src = thumb.src;
    thumb.closest('.thumbnails').querySelectorAll('img').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function formatKey(key) {
    const map = {
        'cpu': 'CPU', 'gpu': 'Card đồ họa', 'series': 'Series', 'socket': 'Socket',
        'ram_hỗ_trợ': 'RAM hỗ trợ', 'cache': 'Cache', 'tốc_độ_xử_lý': 'Tốc độ xử lý'
    };
    return map[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    const msg = document.getElementById('toastMessage');
    msg.textContent = message;
    toast.className = `notification-toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function closeToast() {
    document.getElementById('notificationToast').classList.remove('show');
}