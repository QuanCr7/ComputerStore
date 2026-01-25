let currentPage = 1;

document.addEventListener('DOMContentLoaded', function () {
    if (typeof checkLoginStatus === 'function') {
        checkLoginStatus();
    }

    if (window.location.search !== '') {
        loadFromUrl();
    } else {
        fetchProducts();
    }

    window.addEventListener('popstate', loadFromUrl);
});

function fetchProducts(page = 1, updateUrlFlag = true) {
    currentPage = page;

    if (updateUrlFlag) {
        updateUrl({page: page !== 1 ? page : undefined});
    }

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productsGrid = document.getElementById('productsGrid');
    const paginationElement = document.getElementById('pagination');

    loadingElement.style.display = 'flex';
    errorElement.style.display = 'none';
    productsGrid.innerHTML = '';
    paginationElement.innerHTML = '';

    fetch(`/home?page=${page}`)
        .then(handleResponse)
        .then(data => {
            loadingElement.style.display = 'none';
            if (data.data?.products?.length > 0) {
                renderProducts(data.data.products);
                renderPagination(data.data.currentPage, data.data.totalPages);
            } else {
                productsGrid.innerHTML = '<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6c757d;">Không có product nào</div>';
            }
        })
        .catch(error => handleError(error, loadingElement, errorElement));
}

function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const postDate = new Date(product.post_date);
        const formattedDate = postDate.toLocaleDateString('vi-VN');

        let imageUrl = '/images/product/noimage.jpg';

        // Kiểm tra nếu có ảnh
        if (product.images && product.images.length > 0) {
            // Thêm timestamp để tránh cache
            const timestamp = new Date().getTime();
            imageUrl = `/images/product/${product.images[0]}?t=${timestamp}`;
        } else if (product.image_url) {
            imageUrl = product.image_url;
        }

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${imageUrl}" alt="${product.name}" class="product-image" 
                     onerror="this.src='/images/product/noimage.jpg'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                
                <div class="product-price-display">
                    ${product.discount > 0 ? `
                        <div class="price-with-discount">
                            <span class="final-price">${formatPrice(product.price * (1 - product.discount / 100))}đ</span>
                            <span class="discount-badge">-${product.discount}%</span>
                        </div>
                        <div class="original-price-striked">${formatPrice(product.price)}đ</div>
                    ` : `
                        <div class="final-price no-discount">${formatPrice(product.price)}đ</div>
                    `}
                </div>
        
                <div class="product-actions">
                    <button class="action-btn view-btn" onclick="viewProductDetail(${product.productId})">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                    <button class="action-btn add-btn" 
                            onclick="shoppingCart.addToCart({
                                id: ${product.productId},
                                title: '${product.name.replace(/'/g, "\\'")}',
                                price: ${product.price * (1 - product.discount / 100)},
                                image: '${imageUrl}'
                            })">
                        <i class="fas fa-cart-plus"></i> Thêm
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

function renderPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    // Tạo nút Previous
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        prevButton.onclick = function () {
            fetchProducts(currentPage - 1);
        };
        paginationElement.appendChild(prevButton);
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.onclick = function () {
            fetchProducts(1);
        };
        paginationElement.appendChild(firstPageButton);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '10px';
            paginationElement.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = function () {
            fetchProducts(i);
        };
        paginationElement.appendChild(pageButton);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '10px';
            paginationElement.appendChild(ellipsis);
        }

        const lastPageButton = document.createElement('button');
        lastPageButton.textContent = totalPages;
        lastPageButton.onclick = function () {
            fetchProducts(totalPages);
        };
        paginationElement.appendChild(lastPageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.onclick = function () {
            fetchProducts(currentPage + 1);
        };
        paginationElement.appendChild(nextButton);
    }
}

function viewProductDetail(productId) {
    window.location.href = `/detail?id=${productId}`;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px';
    notification.style.borderRadius = '4px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    notification.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 2.7s';

    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else {
        notification.style.backgroundColor = '#dc3545';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function updateUrl(params) {
    const url = new URL(window.location.href);

    ['page'].forEach(param => {
        url.searchParams.delete(param);
    });

    if (params.page && params.page !== 1) {
        url.searchParams.set('page', params.page);
    }

    window.history.pushState({}, '', url.toString());
}

function loadFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 1;

    fetchProducts(page, false);
}

function handleResponse(response) {
    if (!response.ok) throw new Error('Không thể tải dữ liệu');
    return response.json();
}

function formatPrice(price) {
    return Math.round(price).toLocaleString('vi-VN');
}

function handleError(error, loadingElement, errorElement) {
    console.error('Lỗi khi tải dữ liệu:', error);
    loadingElement.style.display = 'none';
    errorElement.querySelector('.error-message').textContent = error.message;
    errorElement.style.display = 'flex';
}