let currentPage = 1;

// Mapping category ID đến tên file ảnh
const categoryImageMap = {
    1: 'cpu.jpg',
    2: 'card.jpg',
    3: 'mainboard.jpg',
    4: 'ram.jpg',
    5: 'ocung.jpg',
    6: 'case.jpg',
    7: 'tannhiet.jpg',
    8: 'nguonmaytinh.png'
};

// Tên file thay thế nếu không tìm thấy ảnh gốc
const fallbackImages = [
    'cpu.jpg', 'card.jpg', 'mainboard.jpg', 'ram.jpg',
    'ocung.jpg', 'case.jpg', 'tannhiet.jpg', 'nguonmaytinh.png',
    'computer.jpg'
];

// Gọi khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadCategoriesForSearch();

    // Kiểm tra và khôi phục trạng thái từ sessionStorage nếu URL trống
    if (window.location.search === '' && sessionStorage.getItem('lastSearchState')) {
        try {
            const lastState = JSON.parse(sessionStorage.getItem('lastSearchState'));

            if (lastState && typeof lastState === 'object') {
                updateUrl(lastState);
                loadFromUrl();
                return;
            }
        } catch (e) {
            console.error('Lỗi khi parse lastSearchState:', e);
            sessionStorage.removeItem('lastSearchState');
        }
    }

    // Nếu không có trạng thái lưu trong sessionStorage hoặc URL không trống
    if (window.location.search !== '') {
        loadFromUrl();
    } else {
        fetchProducts();
    }

    // Xử lý submit form tìm kiếm
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleSearch(1);
    });

    // Xử lý nút đặt lại
    document.getElementById('resetSearch').addEventListener('click', function() {
        document.getElementById('searchForm').reset();
        window.history.pushState({}, '', window.location.pathname);
        sessionStorage.removeItem('lastSearchState');
        fetchProducts(1);
    });

    // Xử lý khi người dùng dùng nút back/forward
    window.addEventListener('popstate', function() {
        loadFromUrl();
    });
});

// Hàm tải danh sách thể loại cho dropdown
function loadCategoriesForSearch() {
    const container = document.getElementById('categoryGrid');
    container.innerHTML = '<div class="loading-categories"><i class="fas fa-spinner fa-spin"></i> Đang tải danh mục...</div>';

    fetch('/categories')
        .then(res => {
            if (!res.ok) throw new Error('Không tải được danh mục');
            return res.json();
        })
        .then(result => {
            if (result.data && result.data.length > 0) {
                container.innerHTML = ''; // Xóa loading

                result.data.forEach(cat => {
                    const div = document.createElement('div');
                    div.className = 'category-card';

                    const imageFile = getImageForCategory(cat);
                    const timestamp = new Date().getTime();
                    const imageUrl = `/images/category/${imageFile}?t=${timestamp}`;

                    div.innerHTML = `
                        <input type="radio" name="category" id="cat-${cat.categoryId}" value="${cat.categoryId}">
                        <label for="cat-${cat.categoryId}">
                            <img src="${imageUrl}" 
                                 alt="${cat.name}" 
                                 class="category-image"
                                 onerror="handleCategoryImageError(this, '${cat.name}', '${imageFile}')">
                            <div class="category-name">${cat.name}</div>
                        </label>
                    `;

                    container.appendChild(div);
                });

                // Khôi phục lựa chọn từ URL
                const urlParams = new URLSearchParams(window.location.search);
                const categoryName = urlParams.get('category');
                if (categoryName) {
                    const categoryId = getCategoryIdByName(categoryName);
                    if (categoryId) {
                        const radio = container.querySelector(`input[value="${categoryId}"]`);
                        if (radio) radio.checked = true;
                    }
                }
            } else {
                container.innerHTML = '<div style="color:#e74c3c; text-align:center;">Không có danh mục nào</div>';
            }
        })
        .catch(err => {
            console.error('Lỗi tải danh mục:', err);
            container.innerHTML = '<div style="color:#e74c3c; text-align:center;">Lỗi tải danh mục</div>';
        });
}

// Hàm lấy ảnh cho category
function getImageForCategory(category) {
    const categoryId = category.categoryId;

    // Ưu tiên 1: Mapping theo ID
    if (categoryImageMap[categoryId]) {
        return categoryImageMap[categoryId];
    }

    // Ưu tiên 2: Field image từ database (nếu có dữ liệu)
    if (category.image && category.image !== 'null' && category.image.trim() !== '') {
        return category.image;
    }

    // Ưu tiên 3: Dựa trên tên category
    const nameBasedImage = getImageByName(category.name);
    if (nameBasedImage) {
        return nameBasedImage;
    }

    // Fallback: Ảnh mặc định
    return fallbackImages[categoryId % fallbackImages.length] || 'computer.jpg';
}

// Hàm lấy ảnh dựa trên tên category
function getImageByName(categoryName) {
    const name = categoryName.toLowerCase();

    if (name.includes('cpu') || name.includes('processor')) return 'cpu.jpg';
    if (name.includes('card') || name.includes('gpu') || name.includes('đồ họa')) return 'gpu.jpg';
    if (name.includes('main') || name.includes('board')) return 'mainboard.jpg';
    if (name.includes('ram') || name.includes('memory')) return 'ram.jpg';
    if (name.includes('ổ cứng') || name.includes('hdd') || name.includes('ssd')) return 'hdd.jpg';
    if (name.includes('case') || name.includes('vỏ')) return 'case.jpg';
    if (name.includes('tản') || name.includes('cooler')) return 'cooler.jpg';
    if (name.includes('nguồn') || name.includes('psu')) return 'psu.jpg';

    return null;
}

// Hàm xử lý lỗi ảnh category
function handleCategoryImageError(img, categoryName, imageFile) {
    console.warn(`Không thể tải ảnh cho category: ${categoryName}`, {
        attemptedFile: imageFile,
        attemptedUrl: img.src
    });

    // Thử các ảnh fallback khác
    const fallbackImage = getFallbackImage(categoryName);
    const timestamp = new Date().getTime();
    const fallbackUrl = `/images/category/${fallbackImage}?t=${timestamp}`;

    console.log(`Thử fallback image: ${fallbackImage}`);
    img.src = fallbackUrl;
}

// Hàm lấy ảnh fallback
function getFallbackImage(categoryName) {
    // Thử theo tên
    const nameBased = getImageByName(categoryName);
    if (nameBased) return nameBased;

    // Fallback cuối cùng
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
}

// Hàm lấy category ID từ tên
function getCategoryIdByName(categoryName) {
    const categoryLabels = document.querySelectorAll('.category-name');
    for (let label of categoryLabels) {
        if (label.textContent.trim() === categoryName) {
            const radioId = label.closest('label').getAttribute('for');
            return radioId.replace('cat-', '');
        }
    }
    return null;
}

// Hàm xử lý tìm kiếm
function handleSearch(page = 1, updateUrlFlag = true) {
    const name = document.getElementById('searchName').value.trim();
    const selectedCategory = document.querySelector('input[name="category"]:checked');

    // Lấy tên category thay vì ID
    const categoryName = selectedCategory ?
        document.querySelector(`label[for="cat-${selectedCategory.value}"] .category-name`).textContent.trim() : '';

    // Lưu trạng thái tìm kiếm vào sessionStorage
    const searchState = {
        page,
        name: name || undefined,
        category: categoryName || undefined
    };
    sessionStorage.setItem('lastSearchState', JSON.stringify(searchState));

    // Cập nhật URL - SỬA: KHÔNG encode ở đây, để updateUrl xử lý
    if (updateUrlFlag) {
        updateUrl({
            name: name || undefined,
            category: categoryName || undefined, // KHÔNG encode ở đây
            page: page !== 1 ? page : undefined
        });
    }

    // Chuẩn bị tham số gửi lên API - SỬA: KHÔNG encode categoryName
    const apiParams = new URLSearchParams();
    apiParams.append('page', page);
    if (name) apiParams.append('name', name);
    if (categoryName) apiParams.append('category', categoryName); // Gửi trực tiếp, không encode

    // UI loading
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productsGrid = document.getElementById('productsGrid');
    const paginationElement = document.getElementById('pagination');

    loadingElement.style.display = 'flex';
    errorElement.style.display = 'none';
    productsGrid.innerHTML = '';
    paginationElement.innerHTML = '';

    fetch(`/p/search?${apiParams.toString()}`)
        .then(response => {
            if (!response.ok) throw new Error('Không thể tải dữ liệu sản phẩm');
            return response.json();
        })
        .then(data => {
            loadingElement.style.display = 'none';
            console.log('Dữ liệu nhận được:', data);
            if (data.data?.products?.length > 0) {
                renderProducts(data.data.products);
                renderPagination(data.data.currentPage, data.data.totalPages);
            } else {
                productsGrid.innerHTML = `
                    <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px; color: #6c757d; font-size: 1.1rem;">
                        Không tìm thấy sản phẩm nào phù hợp
                    </div>`;
            }
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            errorElement.querySelector('.error-message').textContent = error.message || 'Đã có lỗi xảy ra';
            errorElement.style.display = 'flex';
            console.error('Lỗi tìm kiếm:', error);
        });
}

// Hàm lấy danh sách sách từ API
function fetchProducts(page = 1, updateUrlFlag = true) {
    currentPage = page;

    if (updateUrlFlag) {
        updateUrl({
            page: page !== 1 ? page : undefined
        });
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu sách');
            }
            return response.json();
        })
        .then(data => {
            loadingElement.style.display = 'none';

            if (data.data && data.data.products && data.data.products.length > 0) {
                renderProducts(data.data.products);
                renderPagination(data.data.currentPage, data.data.totalPages);
            } else {
                productsGrid.innerHTML = '<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6c757d;">Không có sách nào</div>';
            }
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            errorElement.querySelector('.error-message').textContent = error.message;
            errorElement.style.display = 'flex';
            console.error('Lỗi khi tải dữ liệu:', error);
        });
}

// Hàm hiển thị danh sách dưới dạng grid
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    // Hàm định dạng giá đẹp
    function formatPrice(price) {
        return Math.round(price).toLocaleString('vi-VN');
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        let imageUrl = '/images/product/noimage.jpg';
        if (product.images && product.images.length > 0) {
            const timestamp = new Date().getTime();
            imageUrl = `/images/product/${product.images[0]}?t=${timestamp}`;
        }

        // Tính giá sau giảm
        const finalPrice = product.discount > 0
            ? product.price * (1 - product.discount / 100)
            : product.price;

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${imageUrl}" alt="${product.name}" class="product-image"
                     onerror="this.src='/images/product/noimage.jpg'">
            </div>

            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>

                <!-- PHẦN GIÁ SIÊU ĐẸP NHƯ TRANG HOME -->
                <div class="product-price-display">
                    ${product.discount > 0 ? `
                        <div class="price-with-discount">
                            <span class="final-price">${formatPrice(finalPrice)}đ</span>
                            <span class="discount-badge">-${product.discount}%</span>
                        </div>
                        <div class="original-price-striked">${formatPrice(product.price)}đ</div>
                    ` : `
                        <div class="final-price no-discount">${formatPrice(product.price)}đ</div>
                    `}
                </div>

                <div class="product-categories">
                    ${product.categories?.map(c => `<span class="product-category">${c.name}</span>`).join('') || ''}
                </div>

                <!-- NÚT LUÔN Ở DƯỚI CÙNG -->
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

// Hàm tạo phân trang
function renderPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        prevButton.onclick = function() {
            if (isSearching()) {
                handleSearch(currentPage - 1);
            } else {
                fetchProducts(currentPage - 1);
            }
        };
        paginationElement.appendChild(prevButton);
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.onclick = function() {
            if (isSearching()) {
                handleSearch(1);
            } else {
                fetchProducts(1);
            }
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
        pageButton.onclick = function() {
            if (isSearching()) {
                handleSearch(i);
            } else {
                fetchProducts(i);
            }
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
        lastPageButton.onclick = function() {
            if (isSearching()) {
                handleSearch(totalPages);
            } else {
                fetchProducts(totalPages);
            }
        };
        paginationElement.appendChild(lastPageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.onclick = function() {
            if (isSearching()) {
                handleSearch(currentPage + 1);
            } else {
                fetchProducts(currentPage + 1);
            }
        };
        paginationElement.appendChild(nextButton);
    }
}

// Thêm hàm kiểm tra
function isSearching() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('name') || urlParams.has('category');
}

// Hàm xem chi tiết sách
function viewProductDetail(productId) {
    window.location.href = `/detail?id=${productId}`;
}

function handleSearchFromCategory(page, categoryName) {
    // Lưu trạng thái tìm kiếm vào sessionStorage
    const searchState = {
        page,
        category: categoryName || undefined
    };
    sessionStorage.setItem('lastSearchState', JSON.stringify(searchState));

    // Chuẩn bị tham số gửi lên API
    const apiParams = new URLSearchParams();
    apiParams.append('page', page);
    if (categoryName) apiParams.append('category', categoryName);

    // UI loading
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productsGrid = document.getElementById('productsGrid');
    const paginationElement = document.getElementById('pagination');

    loadingElement.style.display = 'flex';
    errorElement.style.display = 'none';
    productsGrid.innerHTML = '';
    paginationElement.innerHTML = '';

    // Gọi API tìm kiếm
    fetch(`/p/search?${apiParams.toString()}`)
        .then(response => {
            if (!response.ok) throw new Error('Không thể tải dữ liệu sản phẩm');
            return response.json();
        })
        .then(data => {
            loadingElement.style.display = 'none';
            console.log('Dữ liệu nhận được từ category header:', data);
            if (data.data?.products?.length > 0) {
                renderProducts(data.data.products);
                renderPagination(data.data.currentPage, data.data.totalPages);
            } else {
                productsGrid.innerHTML = `
                    <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px; color: #6c757d; font-size: 1.1rem;">
                        Không tìm thấy sản phẩm nào phù hợp với danh mục "${categoryName}"
                    </div>`;
            }
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            errorElement.querySelector('.error-message').textContent = error.message || 'Đã có lỗi xảy ra';
            errorElement.style.display = 'flex';
            console.error('Lỗi tìm kiếm từ category header:', error);
        });
}

// Hàm cập nhật URL
function updateUrl(params) {
    const url = new URL(window.location.href);

    // Xóa hết các param cũ
    ['name', 'category', 'page'].forEach(p => url.searchParams.delete(p));

    // Thêm param mới - URLSearchParams sẽ tự động encode
    if (params.name) url.searchParams.set('name', params.name);
    if (params.category) url.searchParams.set('category', params.category); // Để URLSearchParams tự encode
    if (params.page && params.page !== 1) url.searchParams.set('page', params.page);

    window.history.pushState({}, '', url.toString());
}

// Hàm tải dữ liệu từ URL
function loadFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    // Nếu URL trống nhưng có sessionStorage, dùng sessionStorage
    if (window.location.search === '' && sessionStorage.getItem('lastSearchState')) {
        const lastState = JSON.parse(sessionStorage.getItem('lastSearchState'));
        updateUrl(lastState);
        return handleSearch(lastState.page || 1, false);
    }

    const page = urlParams.get('page') || 1;
    const name = urlParams.get('name');
    let category = urlParams.get('category');

    // SỬA: Decode category parameter (thay + thành space)
    if (category) {
        category = decodeURIComponent(category.replace(/\+/g, ' '));
    }

    console.log('URL Parameters:', { page, name, category });

    // Áp dụng các giá trị từ URL vào form
    if (name) document.getElementById('searchName').value = name;

    // Chọn radio button category dựa trên tên (đã decode)
    if (category) {
        const categoryId = getCategoryIdByName(category);
        if (categoryId) {
            const radio = document.querySelector(`input[name="category"][value="${categoryId}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`Đã chọn category: ${category} (ID: ${categoryId})`);
            }
        }
    }

    // QUAN TRỌNG: Tự động thực hiện tìm kiếm khi có category từ header
    if (category) {
        console.log('Tự động tìm kiếm từ category header');
        // Sử dụng category đã decode để tìm kiếm
        handleSearchFromCategory(page, category);
    } else if (name) {
        // Nếu chỉ có name, thực hiện tìm kiếm bình thường
        handleSearch(page, false);
    } else {
        // Không có gì, tải sản phẩm mặc định
        fetchProducts(page, false);
    }
}

// Thêm CSS cho animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);