// /js/user/auth.js
const API_BASE_URL = 'http://localhost:8080';
let accessToken = null;

async function checkLoginStatus() {
    const username = localStorage.getItem('username');

    if (username) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok && data.data?.accessToken) {
                accessToken = data.data.accessToken;
                updateHeaderAfterLogin(username);
                return true;
            } else {
                showError(data.message || 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
                clearAuthData();
                resetHeaderAfterLogout();
                return false;
            }
        } catch (error) {
            showError('Lỗi kết nối khi làm mới phiên đăng nhập, vui lòng thử lại');
            clearAuthData();
            resetHeaderAfterLogout();
            return false;
        }
    } else {
        resetHeaderAfterLogout();
        return false;
    }
}

function updateHeaderAfterLogin(username) {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) {
        return false;
    }
    authSection.innerHTML = `
        <div class="user-dropdown">
            <button class="user-btn">
                <i class="fas fa-user-circle"></i>
                ${username}
                <i class="fas fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="/me"><i class="fas fa-user"></i> Trang cá nhân</a>
                <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
            </div>
        </div>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        return true;
    } else {
        console.error('auth.js: updateHeaderAfterLogin: Không tìm thấy logoutBtn sau khi cập nhật DOM');
        return false;
    }
}

function resetHeaderAfterLogout() {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) {
        console.error('auth.js: resetHeaderAfterLogout: Không tìm thấy .auth-section');
        return false;
    }
    authSection.innerHTML = `
        <a href="/auth/login" class="auth-btn login-btn"><i class="fas fa-sign-in-alt"></i> Đăng nhập</a>
        <a href="/auth/register" class="auth-btn register-btn"><i class="fas fa-user-plus"></i> Đăng ký</a>
    `;
    return true;
}

function clearAuthData() {
    accessToken = null;
    localStorage.removeItem('username');
    localStorage.removeItem('userData');
}

async function logout() {
    if (!accessToken) {
        clearAuthData();
        resetHeaderAfterLogout();
        window.location.href = '/auth/login';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

    } catch (error) {
        console.error('auth.js: Lỗi khi đăng xuất:', error);
    } finally {
        clearAuthData();
        resetHeaderAfterLogout();
        window.location.href = '/auth/login';
    }
}

function setAccessToken(token) {
    accessToken = token;
}

function getAccessToken() {
    return accessToken;
}

function showError(message) {
    let errorElement = document.getElementById('errorMessage');
    let errorTextElement = document.querySelector('.error-text');

    if (!errorElement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 15px; 
            background-color: #dc3545; color: white; border-radius: 4px; 
            z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
        return;
    }

    if (errorTextElement) {
        errorTextElement.textContent = message;
    }
    errorElement.style.display = 'flex';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    let successElement = document.getElementById('successMessage');
    let successTextElement = document.querySelector('.success-text');

    if (!successElement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 15px; 
            background-color: #28a745; color: white; border-radius: 4px; 
            z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
        return;
    }

    if (successTextElement) {
        successTextElement.textContent = message;
    }
    successElement.style.display = 'block';
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

async function fetchCurrentUser() {
    if (!getAccessToken()) return null;

    try {
        const response = await fetch(`${API_BASE_URL}/account/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to fetch user');

        const result = await response.json();
        if (result.code === 200 && result.data) {
            const user = result.data;
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                fullName: user.fullName || user.username,
                role: user.role,
                userId: user.userId
            }));
            return user;
        }
    } catch (err) {
        console.warn('Không lấy được thông tin user:', err);
        localStorage.removeItem('currentUser');
    }
    return null;
}

function getCurrentUser() {
    const cached = localStorage.getItem('currentUser');
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch {
            return { username: localStorage.getItem('username') };
        }
    }
    return { username: localStorage.getItem('username') };
}

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('.nav-list')?.classList.toggle('active');
        });
    }

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath &&
            !currentPath.startsWith('/auth/') &&
            (currentPath === '/' && linkPath === '/') ||
            (currentPath.startsWith(linkPath) && linkPath !== '/' && !linkPath.startsWith('/auth/'))) {
            link.classList.add('active');
        }
    });
});