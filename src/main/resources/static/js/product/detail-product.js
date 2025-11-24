let currentProduct = null;
let currentCommentPage = 1;
let hasMoreComments = true;
let isLoadingComments = false;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Không tìm thấy ID sản phẩm');
        return;
    }

    loadProductDetail(productId);

    document.getElementById('addBtn').addEventListener('click', function () {
        if (!currentProduct) {
            showError('Không thể thêm sản phẩm vào giỏ hàng');
            return;
        }

        shoppingCart.addToCart({
            id: currentProduct.productId,
            title: currentProduct.name,
            price: currentProduct.finalPrice,
            image: currentProduct.image
        });
    });

});

// Click thumbnail đổi ảnh chính
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('thumbnail')) {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = e.target.src;

        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
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
            if (!result.data) throw new Error('Dữ liệu trống');
            loading.style.display = 'none';

            currentProduct = result.data;

            // Tính giá sau giảm và gán thêm thuộc tính cần thiết cho giỏ hàng
            const price = Number(currentProduct.price);
            const discount = currentProduct.discount || 0;
            currentProduct.finalPrice = discount > 0 ? price * (1 - discount / 100) : price;
            currentProduct.displayPrice = discount > 0 ? currentProduct.finalPrice : price;

            // Chuẩn bị URL ảnh đầu tiên (với cache busting)
            if (currentProduct.images && currentProduct.images.length > 0) {
                const ts = Date.now();
                currentProduct.image = `/images/product/${currentProduct.images[0]}?t=${ts}`;
            } else {
                // Dùng placeholder đẹp, không bị 404 nữa
                currentProduct.image = 'https://placehold.co/200x280/4a6cf7/ffffff/png?text=Không+có+ảnh&font=roboto';
            }
            currentProduct.title = currentProduct.name;
            renderProductDetail(currentProduct);
            detail.style.display = 'block';
        })
        .catch(err => {
            loading.style.display = 'none';
            error.textContent = err.message;
            error.style.display = 'block';
            console.error(err);
        });
}

// HIỂN THỊ CHI TIẾT
function renderProductDetail(product) {
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productSubtitle').textContent = product.description?.split('.')[0] + '.' || '';
    document.getElementById('productBrand').textContent = product.brand || 'Chưa xác định';
    document.getElementById('warranty').textContent = product.warranty || 0;
    document.getElementById('productDescription').textContent = product.description || 'Không có mô tả';

    // Giá & giảm giá
    const price = Number(product.price);
    const discountPrice = product.discount > 0 ? price * (1 - product.discount / 100) : price;
    const priceEl = document.getElementById('productPrice');

    if (product.discount > 0) {
        priceEl.innerHTML = `
            <span class="original-price">${price.toLocaleString('vi-VN')}đ</span>
            ${discountPrice.toLocaleString('vi-VN')}đ
        `;
        document.getElementById('discountBadge').textContent = `-${product.discount}%`;
        document.getElementById('discountBadge').style.display = 'block';
        document.getElementById('discountText').textContent = `Tiết kiệm ${(price - discountPrice).toLocaleString('vi-VN')}đ`;
        document.getElementById('discountText').style.display = 'block';
    } else {
        priceEl.textContent = `${price.toLocaleString('vi-VN')}đ`;
    }

    // Ngày thêm
    document.getElementById('createDate').textContent = new Date(product.createDate).toLocaleDateString('vi-VN');

    // Ảnh sản phẩm
    const mainImg = document.getElementById('mainImage');
    const thumbs = document.getElementById('thumbnails');
    thumbs.innerHTML = '';
    const ts = Date.now();

    if (product.images?.length > 0) {
        mainImg.src = `/images/product/${product.images[0]}?t=${ts}`;
        product.images.forEach((img, i) => {
            const thumb = document.createElement('img');
            thumb.className = 'thumbnail' + (i === 0 ? ' active' : '');
            thumb.src = `/images/product/${img}?t=${ts}`;
            thumbs.appendChild(thumb);
        });
    } else {
        mainImg.src = 'https://via.placeholder.com/500?text=No+Image';
    }

    // Thông số kỹ thuật
    renderSpecifications(product.attributes || []);

    initComments(product.productId);
}

// THÔNG SỐ KỸ THUẬT
function renderSpecifications(attributes) {
    const grid = document.getElementById('specsGrid');
    grid.innerHTML = '';

    if (!attributes || attributes.length === 0) {
        grid.innerHTML = '<div class="spec-item">Không có thông số kỹ thuật</div>';
        return;
    }

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

    const highlight = ['series', 'thế_hệ', 'số_nhân_xử_lý', 'số_luồng_của_cpu', 'tốc_độ_xử_lý', 'cache'];

    attributes.forEach(attr => {
        const info = specLabels[attr.key] || { label: attr.key.replace(/_/g, ' ').trim(), icon: 'fas fa-cog' };
        const item = document.createElement('div');
        item.className = 'spec-item' + (highlight.includes(attr.key) ? ' highlight-spec' : '');
        item.innerHTML = `
            <div class="spec-label"><i class="${info.icon}"></i> ${info.label}</div>
            <div class="spec-value">${attr.value}</div>
        `;
        grid.appendChild(item);
    });
}

function loadComments(productId, page = 1, append = false) {
    if (isLoadingComments || !hasMoreComments) return;
    isLoadingComments = true;

    const list = document.getElementById('commentsList');
    const btn = document.getElementById('loadMoreBtn');
    const pagination = document.getElementById('commentPagination');

    if (!append) {
        list.innerHTML = '<div class="loading-comments"><i class="fas fa-spinner fa-spin"></i> Đang tải đánh giá...</div>';
    } else {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
        btn.disabled = true;
    }

    fetch(`/comment/p/${productId}?page=${page}`)
        .then(res => {
            if (!res.ok) throw new Error('Không thể tải đánh giá');
            return res.json();
        })
        .then(result => {
            if (result.code !== 200) throw new Error(result.message || 'Lỗi server');
            const data = result.data;
            const comments = data.comments || [];

            document.getElementById('commentCount').textContent = `(${data.totalElements})`;

            if (comments.length === 0 && page === 1) {
                list.innerHTML = `
                    <div class="no-comments">
                        <i class="fas fa-comment-slash" style="font-size:48px;color:#ccc;margin-bottom:16px;"></i>
                        <p>Chưa có đánh giá nào.</p>
                    </div>`;
                pagination.style.display = 'none';
                isLoadingComments = false;
                return;
            }

            const fragment = document.createDocumentFragment();

            comments.forEach(c => {
                const d = new Date(c.createdAt);
                const dateStr = d.toLocaleDateString('vi-VN') + ' lúc ' + d.toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'});
                const div = document.createElement('div');
                div.className = 'comment-item';
                div.innerHTML = `
                    <div class="comment-avatar"><div class="avatar-placeholder"><i class="fas fa-user"></i></div></div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <strong class="comment-author">Khách hàng #${c.userId.username}</strong>
                            <span class="comment-date">${dateStr}</span>
                        </div>
                        <div class="comment-text">${escapeHtml(c.comment)}</div>
                    </div>
                `;
                fragment.appendChild(div);
            });

            if (append) {
                list.appendChild(fragment);
            } else {
                list.innerHTML = '';
                list.appendChild(fragment);
            }

            if (page >= data.totalPages) {
                hasMoreComments = false;
                pagination.style.display = 'none';
            } else {
                hasMoreComments = true;
                pagination.style.display = 'block';
                btn.innerHTML = '<i class="fas fa-arrow-down"></i> Xem thêm đánh giá';
                btn.disabled = false;
            }

            isLoadingComments = false;
        })
        .catch(err => {
            console.error(err);
            if (!append) {
                list.innerHTML = `<div class="error">Lỗi: ${err.message}</div>`;
            }
            pagination.style.display = 'none';
            isLoadingComments = false;
        });
}

function initComments(productId) {
    currentCommentPage = 1;
    hasMoreComments = true;
    loadComments(productId, 1, false);

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            loadComments(productId, ++currentCommentPage, true);
        };
    }
}

document.getElementById('commentForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const content = this.querySelector('#commentContent').value.trim();
    if (!content) {
        showToast('Vui lòng nhập nội dung!');
        return;
    }
    if (!currentProduct) return;

    fetch('/comment/addComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            productId: currentProduct.productId,
            comment: content
        })
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) throw new Error('Vui lòng đăng nhập!');
                if (res.status === 403) throw new Error('Không có quyền!');
                return res.json().then(err => { throw new Error(err.message) });
            }
            return res.json();
        })
        .then(result => {
            if (result.code === 200) {
                showToast('Gửi đánh giá thành công!');
                this.reset();
                currentCommentPage = 1;
                hasMoreComments = true;
                loadComments(currentProduct.productId, 1, false);
            }
        })
        .catch(err => showToast(err.message || 'Gửi thất bại'));
});

// ==================== UTILS ====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(msg) {
    const el = document.getElementById('error');
    el.textContent = msg;
    el.style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    Object.assign(toast.style, {
        position:'fixed', top:'20px', right:'20px', background:'#10b981',
        color:'white', padding:'16px 24px', borderRadius:'8px', zIndex:'9999',
        boxShadow:'0 4px 12px rgba(0,0,0,0.2)', animation:'slideIn 0.4s'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Toast animation
if (!document.getElementById('toast-anim')) {
    const style = document.createElement('style');
    style.id = 'toast-anim';
    style.textContent = `
        @keyframes slideIn { from {transform:translateX(100%);opacity:0} to {transform:translateX(0);opacity:1} }
    `;
    document.head.appendChild(style);
}