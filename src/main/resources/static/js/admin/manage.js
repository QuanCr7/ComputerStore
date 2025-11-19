let currentPage = 1;
let currentProductToDelete = null;
let currentAccountToDelete = null;

// Gọi khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý chuyển tab
    const tabs = document.querySelectorAll('.admin-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Xóa active class từ tất cả các tab và nội dung
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Thêm active class vào tab được click
            this.classList.add('active');

            // Hiển thị nội dung tab tương ứng
            document.getElementById(`${tabId}-tab`).classList.add('active');

            // Tải dữ liệu tương ứng với tab
            if (tabId === 'users') {
                fetchAccounts(1);
            } else if (tabId === 'orders') {
                fetchOrders(1);
            } else if (tabId === 'products') {
                fetchProducts(1);
            }
        });
    });

    // Xử lý modal xóa
    const deleteModal = document.getElementById('deleteModal');
    const closeModal = document.getElementById('closeModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    closeModal.addEventListener('click', () => {
        deleteModal.classList.remove('active');
    });

    cancelDelete.addEventListener('click', () => {
        deleteModal.classList.remove('active');
    });

    confirmDelete.addEventListener('click', () => {
        if (currentProductToDelete) {
            performDeleteProduct(currentProductToDelete.id);
        }
        if (currentAccountToDelete) {
            performDeleteAccount(currentAccountToDelete.id);
        }
        deleteModal.classList.remove('active');
    });

    // Đóng modal khi click bên ngoài
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.classList.remove('active');
        }
    });

    // Tải dữ liệu sách
    fetchProducts();
});

function fetchAccounts(page = 1){
    currentPage = page;

    const accountsTableBody = document.getElementById('accounts-table-body');
    const paginationElement = document.getElementById('pagination-accounts');

    accountsTableBody.innerHTML = '<tr><td colspan="9" class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu...</td></tr>';
    if (paginationElement) {
        paginationElement.innerHTML = '';
    }

    // Sửa endpoint và xử lý response đúng cấu trúc
    fetch(`/account?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu tài khoản')
            }
            return response.json();
        })
        .then(data => {
            if (data.data?.users?.length > 0) {
                renderAccounts(data.data.users);
                renderAccountsPagination(data.data.currentPage, data.data.totalPages);
            } else {
                accountsTableBody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px; color: #6c757d;">Không có tài khoản nào</td></tr>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu account:', error);
            accountsTableBody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 40px; color: #dc3545;">
                    <i class="fas fa-exclamation-triangle"></i> ${error.message}
                </td></tr>`;
        });
}

function renderAccounts(users){
    const accountsTableBody = document.getElementById('accounts-table-body');
    accountsTableBody.innerHTML = '';

    users.forEach(account => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${account.userId}</td>
            <td>${account.username}</td>
            <td>${account.fullName}</td>
            <td>${account.email}</td>
            <td>${account.phone || 'N/A'}</td>
            <td>${account.address || 'N/A'}</td>
            <td>${formatDate(account.dateCreate)}</td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="viewAccountDetail(${account.id})" title="Xem chi tiết">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn delete" onclick="showDeleteAccountConfirmation(${account.id}, '${account.username.replace(/'/g, "\\'")}')" title="Xóa tài khoản">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        accountsTableBody.appendChild(row);
    });
}

// Hàm xem chi tiết tài khoản
function viewAccountDetail(accountId) {
    window.location.href = `/detail-user?id=${accountId}`;
}

function renderAccountsPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination-accounts');
    if (!paginationElement) return;

    paginationElement.innerHTML = '';

    // Tạo nút Previous
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        prevButton.onclick = function () {
            fetchAccounts(currentPage - 1);
        };
        paginationElement.appendChild(prevButton);
    }

    // Hiển thị các trang gần currentPage
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Nút trang đầu tiên
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.onclick = function () {
            fetchAccounts(1);
        };
        paginationElement.appendChild(firstPageButton);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '10px';
            paginationElement.appendChild(ellipsis);
        }
    }

    // Các trang chính
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = function () {
            fetchAccounts(i);
        };
        paginationElement.appendChild(pageButton);
    }

    // Nút trang cuối cùng
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
            fetchAccounts(totalPages);
        };
        paginationElement.appendChild(lastPageButton);
    }

    // Tạo nút Next
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.onclick = function () {
            fetchAccounts(currentPage + 1);
        };
        paginationElement.appendChild(nextButton);
    }
}

// Hàm định dạng ngày
function formatDate(dateString) {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    } catch (e) {
        return dateString;
    }
}

// Hiển thị modal xác nhận xóa account
function showDeleteAccountConfirmation(accountId, accountUsername) {
    document.getElementById('productId').textContent = accountId;
    document.getElementById('productTitle').textContent = accountUsername;
    currentAccountToDelete = { id: accountId, username: accountUsername };
    currentProductToDelete = null;

    const deleteModal = document.getElementById('deleteModal');
    deleteModal.classList.add('active');
}

// Thực hiện xóa account
function performDeleteAccount(accountId) {
    fetch(`/account/delete/${accountId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Xóa tài khoản không thành công');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Xóa tài khoản thành công', 'success');
            fetchAccounts(currentPage);
        })
        .catch(error => {
            showNotification(error.message, 'error');
            console.error('Lỗi khi xóa tài khoản:', error);
        });
}

// Hàm lấy danh sách sách từ API
function fetchProducts(page = 1) {
    currentPage = page;

    const productsTableBody = document.getElementById('products-table-body');
    const paginationElement = document.getElementById('pagination');

    // Hiển thị trạng thái loading
    productsTableBody.innerHTML = '<tr><td colspan="6" class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu...</td></tr>';
    if (paginationElement) {
        paginationElement.innerHTML = '';
    }

    // Gọi API để lấy dữ liệu
    fetch(`/home?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu');
            }
            return response.json();
        })
        .then(data => {
            if (data.data?.products?.length > 0) {
                renderProducts(data.data.products);
                renderPagination(data.data.currentPage, data.data.totalPages);
            } else {
                productsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #6c757d;">Không có sách nào</td></tr>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
            productsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: #dc3545;">
                    <i class="fas fa-exclamation-triangle"></i> ${error.message}
                </td></tr>`;
        });
}

// Hàm hiển thị danh sách sách
function renderProducts(products) {
    const productsTableBody = document.getElementById('products-table-body');
    productsTableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.name}</td>
                <td>${product.stockQuantity}</td>
                <td>${product.warranty}</td>
                <td>${product.categories?.map(c => c.name).join(', ') || product.category || 'N/A'}</td>
                <td>${product.price.toLocaleString('vi-VN')}₫</td>
                <td class="action-buttons">
                    <button class="action-btn view" onclick="viewProductDetail(${product.id})" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editProduct(${product.id})" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="showDeleteConfirmation(${product.id}, '${product.name.replace(/'/g, "\\'")}')" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        productsTableBody.appendChild(row);
    });
}

// Hàm tạo phân trang
function renderPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination');
    if (!paginationElement) return;

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

    // Hiển thị các trang gần currentPage
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Nút trang đầu tiên
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

    // Các trang chính
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

    // Nút trang cuối cùng
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

    // Tạo nút Next
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.onclick = function () {
            fetchProducts(currentPage + 1);
        };
        paginationElement.appendChild(nextButton);
    }
}

// Hiển thị modal xác nhận xóa sách
function showDeleteConfirmation(productId, productTitle) {
    document.getElementById('productId').textContent = productId;
    document.getElementById('productTitle').textContent = productTitle;
    currentProductToDelete = { id: productId, title: productTitle };
    currentAccountToDelete = null;

    const deleteModal = document.getElementById('deleteModal');
    deleteModal.classList.add('active');
}

// Thực hiện xóa sách
function performDeleteProduct(productId) {
    fetch(`/product/delete/${productId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Xóa sách không thành công');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Xóa sách thành công', 'success');
            fetchProducts(currentPage);
        })
        .catch(error => {
            showNotification(error.message, 'error');
            console.error('Lỗi khi xóa sách:', error);
        });
}

// Hàm chứa đường dẫn xem chi tiết sách
function viewProductDetail(productId) {
    window.location.href = `/product-detail?id=${productId}`;
}

// Hàm chứa đường dẫn sửa sách
function editProduct(productId) {
    window.location.href = `/update?id=${productId}`;
}

// Trong file /js/admin/manage.js

// Hàm lấy danh sách đơn hàng từ API
function fetchOrders(page = 1) {
    currentPage = page;

    const ordersTableBody = document.getElementById('orders-table-body');
    const paginationElement = document.getElementById('pagination-orders');

    // Hiển thị trạng thái loading
    ordersTableBody.innerHTML = '<tr><td colspan="8" class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu...</td></tr>';
    if (paginationElement) {
        paginationElement.innerHTML = '';
    }

    // Gọi API để lấy dữ liệu đơn hàng
    fetch(`/order/all?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu đơn hàng');
            }
            return response.json();
        })
        .then(data => {
            if (data.data?.orders?.length > 0) {
                renderOrders(data.data.orders);
                renderOrdersPagination(data.data.currentPage, data.data.totalPages);
            } else {
                ordersTableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #6c757d;">Không có đơn hàng nào</td></tr>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu đơn hàng:', error);
            ordersTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: #dc3545;">
                    <i class="fas fa-exclamation-triangle"></i> ${error.message}
                </td></tr>`;
        });
}

// Hàm hiển thị danh sách đơn hàng
function renderOrders(orders) {
    const ordersTableBody = document.getElementById('orders-table-body');
    ordersTableBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${formatDate(order.orderDate)}</td>
            <td>${order.shippingAddress || 'N/A'}</td>
            <td>${order.email || 'N/A'}</td>
            <td>${order.phone || 'N/A'}</td>
            <td>${formatPrice(order.totalAmount)}</td>
            <td><span class="status ${order.status.toLowerCase()}">${order.status}</span></td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="viewOrderDetail(${order.id})" title="Xem chi tiết">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

// Hàm hiển thị phân trang cho đơn hàng
function renderOrdersPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination-orders');
    if (!paginationElement) return;

    paginationElement.innerHTML = '';

    // Tạo nút Previous
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        prevButton.onclick = function () {
            fetchOrders(currentPage - 1);
        };
        paginationElement.appendChild(prevButton);
    }

    // Hiển thị các trang gần currentPage
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Nút trang đầu tiên
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.onclick = function () {
            fetchOrders(1);
        };
        paginationElement.appendChild(firstPageButton);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '10px';
            paginationElement.appendChild(ellipsis);
        }
    }

    // Các trang chính
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = function () {
            fetchOrders(i);
        };
        paginationElement.appendChild(pageButton);
    }

    // Nút trang cuối cùng
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
            fetchOrders(totalPages);
        };
        paginationElement.appendChild(lastPageButton);
    }

    // Tạo nút Next
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.onclick = function () {
            fetchOrders(currentPage + 1);
        };
        paginationElement.appendChild(nextButton);
    }
}

// Hàm xem chi tiết đơn hàng
function viewOrderDetail(orderId) {
    window.location.href = `/order/detail?id=${orderId}`;
}

// Hàm hiển thị modal xác nhận hủy đơn hàng
function showDeleteOrderConfirmation(orderId, orderCode) {
    document.getElementById('productId').textContent = orderId;
    document.getElementById('productTitle').textContent = `Đơn hàng #${orderCode}`;
    currentOrderToDelete = { id: orderId, code: orderCode };
    currentProductToDelete = null;
    currentAccountToDelete = null;

    const deleteModal = document.getElementById('deleteModal');
    deleteModal.classList.add('active');
}

// Thực hiện hủy đơn hàng
function performDeleteOrder(orderId) {
    fetch(`/order/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hủy đơn hàng không thành công');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Hủy đơn hàng thành công', 'success');
            fetchOrders(currentPage);
        })
        .catch(error => {
            showNotification(error.message, 'error');
            console.error('Lỗi khi hủy đơn hàng:', error);
        });
}

// Hàm format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Hàm định dạng ngày
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { dateStyle: 'medium' });
    } catch (e) {
        return dateString;
    }
}

// Hàm hiển thị thông báo
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');

    // Đặt nội dung và kiểu thông báo
    messageElement.textContent = message;
    notification.className = 'notification';

    // Thêm lớp tương ứng với loại thông báo
    if (type === 'success') {
        notification.classList.add('success');
    } else if (type === 'error') {
        notification.classList.add('error');
    } else if (type === 'warning') {
        notification.classList.add('warning');
    }

    // Hiển thị thông báo
    notification.classList.add('show');

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');

        // Xóa lớp hide sau khi hoàn thành animation
        setTimeout(() => {
            notification.classList.remove('hide');
        }, 300);
    }, 3000);
}