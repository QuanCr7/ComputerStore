function showToast(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    const msgEl = document.getElementById('toastMessage');
    const icon = toast.querySelector('.toast-icon i');

    msgEl.textContent = message;
    icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';

    toast.className = 'notification-toast';
    void toast.offsetWidth;
    toast.classList.add('show', type);

    setTimeout(() => toast.classList.remove('show'), 5000);
}

function closeToast() {
    document.getElementById('notificationToast').classList.remove('show');
}