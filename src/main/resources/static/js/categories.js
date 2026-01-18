document.addEventListener('DOMContentLoaded', function() {
    loadCategories();

    // Xử lý menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
});

function loadCategories() {
    fetch('/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải danh sách thể loại');
            }
            return response.json();
        })
        .then(data => {
            const categories = data.data || [];
            renderCategories(categories);
        })
        .catch(error => {
            console.error('Lỗi khi tải danh mục:', error);
        });
}

function renderCategories(categories) {
    const dropdown = document.querySelector('.categories-container');
    dropdown.innerHTML = '';

    if (categories.length === 0) {
        dropdown.innerHTML = '<div class="category-item">Không có thể loại nào</div>';
        return;
    }

    const itemsPerColumn = Math.ceil(categories.length / 3);
    const columns = [[], [], []];

    categories.forEach((category, index) => {
        const columnIndex = Math.floor(index / itemsPerColumn);
        const categoryName = typeof category === 'object' ? category.name : category;
        const categoryId = typeof category === 'object' ? category.categoryId : null;

        columns[columnIndex].push({name: categoryName, id: categoryId});
    });

    columns.forEach(columnCategories => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'category-column';

        columnCategories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';

            const categoryLink = document.createElement('a');
            const encodedCategory = encodeURIComponent(category.name).replace(/%20/g, '+');
            categoryLink.href = `/search?category=${encodedCategory}`;
            categoryLink.className = 'category-link';
            categoryLink.textContent = category.name;

            // Thêm sự kiện click để xử lý
            categoryLink.addEventListener('click', function(e) {
                e.preventDefault();
                filterByCategory(category.name, category.id);
            });

            categoryItem.appendChild(categoryLink);
            columnDiv.appendChild(categoryItem);
        });

        dropdown.appendChild(columnDiv);
    });
}

function filterByCategory(categoryName, categoryId) {
    console.log(`Lọc sản phẩm theo thể loại: ${categoryName} (ID: ${categoryId})`);

    // SỬA: Sử dụng cùng encoding với form (thay %20 bằng +)
    const encodedCategory = encodeURIComponent(categoryName).replace(/%20/g, '+');
    const searchUrl = `/search?category=${encodedCategory}`;

    window.location.href = searchUrl;
}