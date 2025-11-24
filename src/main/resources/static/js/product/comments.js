// /js/product/comments.js
let currentProductId = null;
let currentPage = 1;
const COMMENTS_PER_PAGE = 15;

document.addEventListener('DOMContentLoaded', function () {
    // Lấy productId từ URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    currentProductId = urlParams.get('id');

    if (!currentProductId) {
        console.error('Không tìm thấy productId trong URL');
        document.getElementById('commentsList').innerHTML = '<p class="text-center text-muted">Không tải được bình luận.</p>';
        return;
    }

    // Ẩn form nếu chưa đăng nhập
    checkAndToggleCommentForm();

    // Load trang 1
    loadComments(currentPage);
});

// Kiểm tra đăng nhập → ẩn/hiện form comment
async function checkAndToggleCommentForm() {
    const commentForm = document.getElementById('commentForm');
    const commentContainer = document.querySelector('.comment-form-container');

    try {
        const isLoggedIn = typeof checkLoginStatus === 'function' && await checkLoginStatus();

        if (!isLoggedIn) {
            commentContainer.innerHTML = `
                <div class="text-center p-4 bg-light rounded">
                    <i class="fas fa-lock fa-2x text-muted mb-3"></i>
                    <p class="text-muted">Bạn cần <a href="/login" class="text-primary fw-bold">đăng nhập</a> để viết đánh giá</p>
                </div>
            `;
        } else {
            // Gắn sự kiện submit
            commentForm.addEventListener('submit', handleCommentSubmit);
        }
    } catch (err) {
        commentContainer.innerHTML = `<p class="text-danger">Lỗi kiểm tra đăng nhập</p>`;
    }
}

// Load comment theo trang
async function loadComments(page = 1) {
    const commentsList = document.getElementById('commentsList');
    const pagination = document.getElementById('commentPagination');
    const commentCount = document.getElementById('commentCount');

    commentsList.innerHTML = '<div class="loading-comments"><i class="fas fa-spinner fa-spin"></i> Đang tải đánh giá...</div>';

    try {
        const response = await fetch(`/comment/p/${currentProductId}?page=${page}`);
        const result = await response.json();

        if (result.code !== 200 || !result.data) {
            throw new Error(result.message || 'Lỗi tải bình luận');
        }

        const data = result.data;
        currentPage = data.currentPage;

        // Cập nhật số lượng comment
        commentCount.textContent = `(${data.totalElements})`;

        // Hiển thị danh sách
        if (data.totalElements === 0) {
            commentsList.innerHTML = '<p class="text-center text-muted py-5">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>';
            pagination.innerHTML = '';
            return;
        }

        commentsList.innerHTML = '';
        data.comments.forEach(cmt => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment-item';
            commentEl.innerHTML = `
                <div class="comment-avatar">
                    <i class="fas fa-user-circle fa-3x text-primary"></i>
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <strong class="comment-author">Khách hàng #${cmt.userId}</strong>
                        <span class="comment-date">${formatDate(cmt.createdAt)}</span>
                    </div>
                    <p class="comment-text">${escapeHtml(cmt.comment)}</p>
                </div>
            `;
            commentsList.appendChild(commentEl);
        });

        // Render phân trang
        renderPagination(data.currentPage, data.totalPages);

    } catch (error) {
        console.error('Lỗi load comment:', error);
        commentsList.innerHTML = `<p class="text-danger text-center">Không thể tải bình luận: ${error.message}</p>`;
        pagination.innerHTML = '';
    }
}

// Xử lý gửi comment
async function handleCommentSubmit(e) {
    e.preventDefault();

    const textarea = document.getElementById('commentContent');
    const content = textarea.value.trim();
    const submitBtn = document.getElementById('submitComment');

    if (!content) {
        showToast('Vui lòng nhập nội dung đánh giá!', 'error');
        return;
    }

    if (content.length < 10) {
        showToast('Đánh giá ít nhất 10 ký tự', 'error');
        return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

    try {
        const token = getAccessToken();
        const response = await fetch('/comment/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                productId: parseInt(currentProductId),
                comment: content
            })
        });

        const result = await response.json();

        if (response.ok && result.code === 200) {
            showToast('Gửi đánh giá thành công!');
            textarea.value = '';
            loadComments(1); // Reload trang 1 để thấy comment mới
        } else {
            showToast(result.message || 'Gửi thất bại, vui lòng thử lại', 'error');
        }
    } catch (error) {
        console.error('Lỗi gửi comment:', error);
        showToast('Lỗi kết nối, vui lòng thử lại', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi đánh giá';
    }
}

// Render phân trang
function renderPagination(current, total) {
    const pagination = document.getElementById('commentPagination');
    if (total <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '<div class="pagination">';

    // Nút Prev
    if (current > 1) {
        html += `<button onclick="loadComments(${current - 1})" class="page-btn"><i class="fas fa-chevron-left"></i></button>`;
    }

    // Trang gần đó
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
        html += `<button onclick="loadComments(${i})" class="page-btn ${i === current ? 'active' : ''}">${i}</button>`;
    }

    // Nút Next
    if (current < total) {
        html += `<button onclick="loadComments(${current + 1})" class="page-btn"><i class="fas fa-chevron-right"></i></button>`;
    }

    html += '</div>';
    pagination.innerHTML = html;
}

function formatDate(dateString) {
    if (!dateString) return 'Vừa xong';

    // Xử lý trường hợp "2025-11-22T00:00:00" → thêm giây nếu thiếu
    let fixed = dateString;
    if (fixed.length === 19 && fixed.endsWith('00:00')) {
        fixed += ':00'; // thành 2025-11-22T00:00:00
    }

    const date = new Date(fixed.replace(' ', 'T')); // hỗ trợ cả dấu cách
    if (isNaN(date.getTime())) {
        return 'Không rõ thời gian';
    }

    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toast notification (tái sử dụng từ detail-product.js hoặc thêm riêng)
function showToast(message, type = 'success') {
    // Nếu đã có hàm showToast thì dùng lại, không thì tạo mới
    if (typeof window.showToast === 'function') {
        window.showToast(message);
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white; padding: 16px 24px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.4s ease;
        font-weight: 500; display: flex; align-items: center; gap: 10px;
    `;
    toast.innerHTML = type === 'error'
        ? `<i class="fas fa-times-circle"></i> ${message}`
        : `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// CSS cho toast và pagination (thêm vào file CSS hoặc <style> trong HTML)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    .comment-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #eee; }
    .comment-item:last-child { border-bottom: none; }
    .comment-avatar i { color: #3b82f6; }
    .comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.95rem; }
    .comment-author { color: #1f2937; font-weight: 600; }
    .comment-date { color: #9ca3af; font-size: 0.85rem; }
    .comment-text { margin: 0; line-height: 1.6; color: #374151; }
    .pagination { display: flex; justify-content: center; gap: 8px; margin: 20px 0; }
    .page-btn { padding: 8px 12px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 6px; }
    .page-btn:hover { background: #f3f4f6; }
    .page-btn.active { background: #3b82f6; color: white; border-color: #3b82f6; }
`;
document.head.appendChild(style);