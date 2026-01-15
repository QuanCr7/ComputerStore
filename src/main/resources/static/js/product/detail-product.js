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

function loadProductDetail(productId) {
    const loading = document.getElementById('loading');
    const detail = document.getElementById('product-detail');

    loading.style.display = 'block';
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

            const price = Number(currentProduct.price);
            const discount = currentProduct.discount || 0;
            currentProduct.finalPrice = discount > 0 ? price * (1 - discount / 100) : price;
            currentProduct.displayPrice = discount > 0 ? currentProduct.finalPrice : price;

            if (currentProduct.images && currentProduct.images.length > 0) {
                const ts = Date.now();
                currentProduct.image = `/images/product/${currentProduct.images[0]}?t=${ts}`;
            } else {
                currentProduct.image = 'https://placehold.co/200x280/4a6cf7/ffffff/png?text=Không+có+ảnh&font=roboto';
            }
            currentProduct.title = currentProduct.name;
            renderProductDetail(currentProduct);
            detail.style.display = 'block';
        })
        .catch(err => {
            loading.style.display = 'none';
        });
}

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

function renderSpecifications(attributes) {
    const grid = document.getElementById('specsGrid');
    grid.innerHTML = '';

    if (!attributes || attributes.length === 0) {
        grid.innerHTML = '<div class="spec-item">Không có thông số kỹ thuật</div>';
        return;
    }

    const specLabels = {
        // CPU
        series: { label: 'Series', icon: 'fas fa-microchip' },
        thế_hệ: { label: 'Thế hệ', icon: 'fas fa-layer-group' },
        cpu: { label: 'CPU', icon: 'fas fa-microprocessor' },
        ra_mắt: { label: 'Ra mắt', icon: 'fas fa-calendar-alt' },
        số_nhân_xử_lý: { label: 'Số nhân xử lý', icon: 'fas fa-cubes' },
        số_luồng_của_cpu: { label: 'Số luồng CPU', icon: 'fas fa-code-branch' },
        tốc_độ_xử_lý: { label: 'Tốc độ xử lý', icon: 'fas fa-tachometer-alt' },
        tiêu_thụ_điện_năng: { label: 'Tiêu thụ điện năng', icon: 'fas fa-bolt' },
        nhiệt_độ_tối_đa: { label: 'Nhiệt độ tối đa', icon: 'fas fa-thermometer-full' },
        cache: { label: 'Cache', icon: 'fas fa-memory' },
        socket: { label: 'Socket', icon: 'fas fa-plug' },
        ram_hỗ_trợ: { label: 'RAM hỗ trợ', icon: 'fas fa-memory' },
        đồ_họa_tích_hợp: { label: 'Đồ họa tích hợp', icon: 'fas fa-desktop' },
        phiên_bản_pci_express: { label: 'Phiên bản PCI Express', icon: 'fas fa-expand-arrows-alt' },

        // GPU
        gpu: { label: 'GPU', icon: 'fas fa-gpu' },
        bộ_nhớ: { label: 'Bộ nhớ', icon: 'fas fa-memory' },
        part_number: { label: 'Part-number', icon: 'fas fa-barcode' },
        gpu_clock: { label: 'GPU Clock', icon: 'fas fa-tachometer-alt' },
        giao_tiếp_pci: { label: 'Giao tiếp PCI', icon: 'fas fa-exchange-alt' },
        số_lượng_đơn_vị_xử_lý: { label: 'Đơn vị xử lý', icon: 'fas fa-cogs' },
        cổng_kết_nối: { label: 'Cổng kết nối', icon: 'fas fa-plug-circle-plus' },
        tản_nhiệt: { label: 'Tản nhiệt', icon: 'fas fa-fan' },
        đèn_led: { label: 'Đèn LED', icon: 'fas fa-lightbulb' },
        đầu_cấp_nguồn: { label: 'Đầu cấp nguồn', icon: 'fas fa-plug' },
        nguồn_đề_xuất: { label: 'Nguồn đề xuất', icon: 'fas fa-bolt' },
        kích_thước: { label: 'Kích thước', icon: 'fas fa-ruler-combined' },

        // Mainboard
        chipset: { label: 'Chipset', icon: 'fas fa-microchip' },
        seriesmainboard: { label: 'Series Mainboard', icon: 'fas fa-microchip' },
        khe_ram_tối_đa: { label: 'Khe RAM tối đa', icon: 'fas fa-memory' },
        kiểu_ram_hỗ_trợ: { label: 'Kiểu RAM hỗ trợ', icon: 'fas fa-memory' },
        hỗ_trợ_bộ_nhớ_tối_đa: { label: 'Bộ nhớ tối đa', icon: 'fas fa-hdd' },
        bus_ram_hỗ_trợ: { label: 'Bus RAM hỗ trợ', icon: 'fas fa-tachometer-alt' },
        lưu_trữ: { label: 'Lưu trữ', icon: 'fas fa-hdd' },
        kiểu_khe_m2_hỗ_trợ: { label: 'Khe M.2 hỗ trợ', icon: 'fas fa-sd-card' },
        cổng_xuất_hình: { label: 'Cổng xuất hình', icon: 'fas fa-tv' },
        khe_pci: { label: 'Khe PCI', icon: 'fas fa-expand-arrows-alt' },
        số_cổng_usb: { label: 'Cổng USB', icon: 'fas fa-usb' },
        lan: { label: 'LAN', icon: 'fas fa-network-wired' },
        kết_nối_không_dây: { label: 'Kết nối không dây', icon: 'fas fa-wifi' },
        âm_thanh: { label: 'Âm thanh', icon: 'fas fa-volume-up' },

        // RAM
        màu_sắc: { label: 'Màu sắc', icon: 'fas fa-palette' },
        dung_lượng: { label: 'Dung lượng', icon: 'fas fa-hdd' },
        bus: { label: 'Bus', icon: 'fas fa-tachometer-alt' },
        timing: { label: 'Timing', icon: 'fas fa-stopwatch' },
        voltage: { label: 'Voltage', icon: 'fas fa-bolt' },

        // SSD
        kiểu_ổ_cứng: { label: 'Kiểu ổ cứng', icon: 'fas fa-hdd' },
        màu_sắc_của_ổ_cứng: { label: 'Màu sắc', icon: 'fas fa-palette' },
        kết_nối: { label: 'Kết nối', icon: 'fas fa-plug' },
        bộ_nhớ_nand: { label: 'Bộ nhớ NAND', icon: 'fas fa-microchip' },
        tốc_độ_đọc: { label: 'Tốc độ đọc', icon: 'fas fa-arrow-down' },
        tốc_độ_ghi: { label: 'Tốc độ ghi', icon: 'fas fa-arrow-up' },

        // Case
        chất_liệu: { label: 'Chất liệu', icon: 'fas fa-cube' },
        chất_liệu_nắp_hông: { label: 'Chất liệu nắp hông', icon: 'fas fa-window-maximize' },
        loại_case: { label: 'Loại case', icon: 'fas fa-box' },
        hỗ_trợ_mainboard: { label: 'Hỗ trợ mainboard', icon: 'fas fa-microchip' },
        số_lượng_ổ_đĩa_hỗ_trợ: { label: 'Ổ đĩa hỗ trợ', icon: 'fas fa-hdd' },
        kích_thước_radiator_tối_đa: { label: 'Radiator tối đa', icon: 'fas fa-fan' },
        số_slot_pci: { label: 'Số slot PCI', icon: 'fas fa-expand-arrows-alt' },

        // Tản nhiệt
        dạng_tản_nhiệt: { label: 'Dạng tản nhiệt', icon: 'fas fa-fan' },
        kích_thước_quạt_mm: { label: 'Kích thước quạt', icon: 'fas fa-ruler' },
        socket_được_hỗ_trợ: { label: 'Socket hỗ trợ', icon: 'fas fa-plug' },
        chất_liệu_tản_nhiệt: { label: 'Chất liệu', icon: 'fas fa-cube' },
        kích_thước_radiator_cm: { label: 'Kích thước Radiator', icon: 'fas fa-ruler-combined' },
        số_vòng_quay_của_bơm_rpm: { label: 'Tốc độ bơm', icon: 'fas fa-water' },
        số_vòng_quay_của_quạt_rpm: { label: 'Tốc độ quạt', icon: 'fas fa-fan' },
        lưu_lượng_không_khí_cfm: { label: 'Lưu lượng khí', icon: 'fas fa-wind' },
        độ_ồn_dba: { label: 'Độ ồn', icon: 'fas fa-volume-down' },
        khối_lượng_kg: { label: 'Khối lượng', icon: 'fas fa-weight' },

        // Nguồn
        công_suất_tối_đa: { label: 'Công suất', icon: 'fas fa-bolt' },
        hiệu_suất: { label: 'Hiệu suất', icon: 'fas fa-certificate' },
        số_cổng_cắm: { label: 'Cổng cắm', icon: 'fas fa-plug' },
        quạt_làm_mát: { label: 'Quạt làm mát', icon: 'fas fa-fan' },
        nguồn_đầu_vào: { label: 'Nguồn đầu vào', icon: 'fas fa-plug-circle-bolt' }
    };

    attributes.forEach(attr => {
        const key = attr.key.trim();
        const info = specLabels[key] || {
            label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            icon: 'fas fa-cog'
        };

        const item = document.createElement('div');
        item.className = 'spec-item';
        item.innerHTML = `
            <div class="spec-label">
                <i class="${info.icon}"></i> ${info.label}
            </div>
            <div class="spec-value">${escapeHtml(attr.value)}</div>
        `;
        grid.appendChild(item);
    });
}

function loadComments(productId, page = 1, append = false) {
    if (isLoadingComments || !hasMoreComments) return;
    isLoadingComments = true;

    const list = document.getElementById('commentsList');
    const btn = document.getElementById('loadMoreBtn');

    if (!append) {
        list.innerHTML = '<div class="loading-comments">Đang tải đánh giá...</div>';
    }

    fetch(`/comment/p/${productId}?page=${page}`)
        .then(res => res.ok ? res.json() : Promise.reject('Không tải được bình luận'))
        .then(result => {
            if (result.code !== 200) throw new Error(result.message);

            const data = result.data;
            document.getElementById('commentCount').textContent = `(${data.totalElements})`;

            const comments = data.comments || [];
            const fragment = document.createDocumentFragment();

            comments.forEach(c => {
                const date = new Date(c.createdAt);
                const dateStr = date.toLocaleDateString('vi-VN') + ' lúc ' +
                    date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'});

                const div = document.createElement('div');
                div.className = 'comment-item';
                div.dataset.commentId = c.commentId;

                const currentUser = getCurrentUser();
                const isOwner = currentUser && (currentUser.id === c.userId);
                const isAdmin = currentUser && currentUser.role === 'ADMIN';

                const deleteBtn = (isOwner || isAdmin) ? `
                    <button class="btn-delete-comment" title="Xóa bình luận" onclick="deleteComment(${c.commentId}, this)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                ` : '';

                div.innerHTML = `
                    <div class="comment-avatar">
                        <div class="avatar-placeholder">${(c.username?.[0] || 'K').toUpperCase()}</div>
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <div class="comment-author">${escapeHtml(c.username || 'Khách')}</div>
                            <div class="comment-date">${dateStr}</div>
                        </div>
                        <div class="comment-text">${escapeHtml(c.comment)}</div>
                    </div>
                    <div class="comment-actions">${deleteBtn}</div>
                `;
                fragment.appendChild(div);
            });

            if (append) list.appendChild(fragment);
            else list.innerHTML = '', list.appendChild(fragment);

            hasMoreComments = page < data.totalPages;
            document.getElementById('commentPagination').style.display = hasMoreComments ? 'block' : 'none';
            if (hasMoreComments) btn.textContent = 'Xem thêm đánh giá';

            isLoadingComments = false;
        })
        .catch(err => {
            list.innerHTML = `<div class="error">Lỗi: ${err}</div>`;
            isLoadingComments = false;
        });
}

// Hàm xóa comment
async function deleteComment(commentId, button) {
    if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

    try {
        const res = await fetch(`/comment/deleteComment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'include'
        });

        const data = await res.json();
        if (res.ok && data.code === 200) {
            button.closest('.comment-item').style.animation = 'fadeOut 0.4s ease';
            setTimeout(() => {
                button.closest('.comment-item').remove();
                showToast('Đã xóa bình luận!','success');
                const count = parseInt(document.getElementById('commentCount').textContent.match(/\d+/)?.[0] || '0');
                document.getElementById('commentCount').textContent = `(${count - 1})`;
            }, 400);
        } else {
            showToast('Bạn không thể xóa bình luận này!','error');
        }
    } catch (err) {
        showToast('Bạn không thể xóa bình luận này!','error');
    }
}

if (!document.getElementById('fade-anim')) {
    const style = document.createElement('style');
    style.id = 'fade-anim';
    style.textContent = `@keyframes fadeOut { from {opacity:1;transform:translateY(0)} to {opacity:0;transform:translateY(-20px)} }`;
    document.head.appendChild(style);
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

document.getElementById('commentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const content = this.querySelector('#commentContent').value.trim();
    if (!content || !currentProduct) return;

    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        showToast('Vui lòng đăng nhập để bình luận!','error');
        return;
    }

    fetch('/comment/addComment', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`,
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            productId: currentProduct.productId,
            comment: content
        })
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 403 || res.status === 401) {
                    throw new Error('Bạn không có quyền hoặc chưa đăng nhập!');
                }
                return res.json().then(err => { throw new Error(err.message || 'Lỗi server'); });
            }
            return res.json();
        })
        .then(result => {
            if (result.code === 200) {
                showToast('Gửi đánh giá thành công!');
                this.reset();
                currentCommentPage = 1;
                loadComments(currentProduct.productId, 1, false);
            }
        })
        .catch(err => showToast(err.message));
});

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