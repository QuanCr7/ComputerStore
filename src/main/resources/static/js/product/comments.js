// /js/book/comments.js
document.addEventListener('DOMContentLoaded', async function () {
    const API_BASE_URL = 'http://localhost:8080';
    let currentPage = 1;
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) {
        showCommentError('Không tìm thấy ID sách');
        return;
    }

    // Lấy tiêu đề sách từ thông tin sách đã tải
    const bookTitle = await getBookTitle(bookId);
    if (!bookTitle) {
        showCommentError('Không thể lấy thông tin sách');
        return;
    }

    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = await checkLoginStatus();

    // Tải danh sách bình luận
    loadComments(bookTitle, currentPage);

    // Xử lý form gửi bình luận
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            if (!isLoggedIn) {
                showCommentError('Bạn cần đăng nhập để gửi bình luận!');
                return;
            }
            await submitComment(bookId, bookTitle);
        });
    }

    // Gán sự kiện cho nút phân trang
    document.getElementById('commentPagination').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const page = parseInt(event.target.textContent) || (event.target.innerHTML === '&laquo;' ? currentPage - 1 : currentPage + 1);
            loadComments(bookTitle, page);
        }
    });
});

async function getBookTitle(bookId) {
    try {
        const response = await fetch(`http://localhost:8080/book/searchId/${bookId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (response.ok && data.code === 200 && data.data) {
            return data.data.title.replace(/\s+/g, '-'); // Chuyển tiêu đề thành định dạng URL-friendly
        }
        return null;
    } catch (error) {
        console.error('Lỗi khi lấy tiêu đề sách:', error);
        return null;
    }
}

async function loadComments(bookTitle, page, updateUrlFlag = true) {
    const API_BASE_URL = 'http://localhost:8080';
    const loadingComments = document.querySelector('.loading-comments');
    const commentsList = document.getElementById('commentsList');
    const commentPagination = document.getElementById('commentPagination');
    const commentCount = document.getElementById('commentCount');

    try {
        if (loadingComments) loadingComments.style.display = 'block';
        if (commentsList) commentsList.innerHTML = '';
        if (commentPagination) commentPagination.innerHTML = '';

        const response = await fetch(`${API_BASE_URL}/comment/book/${bookTitle}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            credentials: 'include',
        });

        const data = await response.json();
        console.log('comments.js: Comments response:', JSON.stringify(data, null, 2));

        if (response.ok && data.code === 200) {
            if (updateUrlFlag) {
                updateUrl({ page: page !== 1 ? page : undefined });
            }
            displayComments(data.data);
            renderCommentPagination(data.data.currentPage, data.data.totalPages);
            commentCount.textContent = `(${data.data.totalElements})`;
            if (commentsList) commentsList.style.display = 'block';
            if (loadingComments) loadingComments.style.display = 'none';
        } else {
            throw new Error(data.message || 'Không thể tải bình luận');
        }
    } catch (error) {
        console.error('comments.js: Lỗi:', error);
        if (loadingComments) loadingComments.style.display = 'none';
        showCommentError(error.message);
        if (commentsList) {
            commentsList.innerHTML = '<p style="text-align: center; padding: 20px; color: #6c757d;">Không có bình luận nào</p>';
        }
    }
}

function displayComments(pageData) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    if (pageData.comments.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center; padding: 20px; color: #6c757d;">Không có bình luận nào</p>';
        return;
    }

    pageData.comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <div class="comment-header">
                <span class="comment-user">User ID: ${comment.userId}</span>
                <span class="comment-date">${formatDate(comment.createdAt)}</span>
            </div>
            <div class="comment-content">${comment.comment}</div>
            ${isCurrentUser(comment.userId) ? `<button class="btn btn-delete-comment" data-id="${comment.commentId}">Xóa</button>` : ''}
        `;
        commentsList.appendChild(commentItem);
    });

    // Gán sự kiện xóa bình luận
    document.querySelectorAll('.btn-delete-comment').forEach(button => {
        button.addEventListener('click', async function () {
            const commentId = this.getAttribute('data-id');
            if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
                await deleteComment(commentId, pageData);
            }
        });
    });
}

function renderCommentPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('commentPagination');
    paginationElement.innerHTML = '';

    // Tạo nút Previous
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        paginationElement.appendChild(prevButton);
    }

    // Hiển thị các trang gần currentPage
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Nút trang đầu tiên
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
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
        paginationElement.appendChild(lastPageButton);
    }

    // Tạo nút Next
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        paginationElement.appendChild(nextButton);
    }
}

async function submitComment(bookId, bookTitle) {
    const API_BASE_URL = 'http://localhost:8080';
    const commentContent = document.getElementById('commentContent').value.trim();
    const loadingComments = document.querySelector('.loading-comments');

    if (!commentContent) {
        showCommentError('Vui lòng nhập nội dung bình luận');
        return;
    }

    try {
        if (loadingComments) loadingComments.style.display = 'block';

        const response = await fetch(`${API_BASE_URL}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                comment: commentContent,
                bookId: bookId,
            }),
        });

        const data = await response.json();
        console.log('comments.js: Submit comment response:', JSON.stringify(data, null, 2));

        if (response.ok && data.code === 200) {
            document.getElementById('commentForm').reset();
            loadComments(bookTitle, 1); // Tải lại danh sách bình luận từ trang 1
        } else {
            throw new Error(data.message || 'Không thể gửi bình luận');
        }
    } catch (error) {
        console.error('comments.js: Lỗi khi gửi bình luận:', error);
        showCommentError(error.message);
    } finally {
        if (loadingComments) loadingComments.style.display = 'none';
    }
}

async function deleteComment(commentId, pageData) {
    const API_BASE_URL = 'http://localhost:8080';
    const loadingComments = document.querySelector('.loading-comments');

    try {
        if (loadingComments) loadingComments.style.display = 'block';

        const response = await fetch(`${API_BASE_URL}/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            credentials: 'include',
        });

        const data = await response.json();
        console.log('comments.js: Delete comment response:', JSON.stringify(data, null, 2));

        if (response.ok && data.code === 200) {
            loadComments(pageData.comments[0].bookTitle, pageData.currentPage); // Tải lại danh sách bình luận
        } else {
            throw new Error(data.message || 'Không thể xóa bình luận');
        }
    } catch (error) {
        console.error('comments.js: Lỗi khi xóa bình luận:', error);
        showCommentError(error.message);
    } finally {
        if (loadingComments) loadingComments.style.display = 'none';
    }
}

function isCurrentUser(userId) {
    const userDetails = JSON.parse(localStorage.getItem('userDetails')); // Giả định userDetails chứa thông tin người dùng
    return userDetails && userDetails.id === userId;
}

function showCommentError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        alert(message);
    }
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { dateStyle: 'medium' });
}

function updateUrl(params) {
    const url = new URL(window.location.href);
    ['page'].forEach(param => url.searchParams.delete(param));
    if (params.page && params.page !== 1) {
        url.searchParams.set('page', params.page);
    }
    window.history.pushState({}, '', url.toString());
}