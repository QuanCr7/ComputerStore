// /js/admin/statistics.js
document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'http://localhost:8080/order/all';

    let allOrders = []; // Lưu toàn bộ đơn hàng từ API
    let revenueChart = null;
    let statusChart = null;

    // Định dạng tiền tệ Việt Nam
    const formatVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount || 0);
    };

    // Định dạng ngày Việt Nam
    const formatDateVN = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('vi-VN');
    };

    // Lọc đơn hàng theo khoảng thời gian
    function filterOrdersByDate(startDate, endDate) {
        if (!startDate || !endDate) return allOrders;

        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Đến cuối ngày

        return allOrders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= start && orderDate <= end;
        });
    }

    // Tính toán thống kê từ danh sách đơn hàng đã lọc
    function calculateStats(orders) {
        const completedOrders = orders.filter(o =>
            o.status === 'COMPLETED' || o.status === 'SUCCESS'
        );

        const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalOrdersCount = orders.length;
        const completedCount = completedOrders.length;
        const avgOrderValue = completedCount > 0 ? totalRevenue / completedCount : 0;

        return { totalRevenue, totalOrdersCount, completedCount, avgOrderValue };
    }

    // Cập nhật các thẻ tổng quan
    function updateOverview(stats, periodText) {
        document.getElementById('totalRevenue').textContent = formatVND(stats.totalRevenue);
        document.getElementById('completedOrders').textContent = stats.completedCount;
        document.getElementById('averageOrder').textContent = formatVND(stats.avgOrderValue);
        document.getElementById('totalOrders').textContent = stats.totalOrdersCount;

        document.getElementById('revenuePeriod').textContent = periodText;
        document.getElementById('ordersPeriod').textContent = periodText;
        document.getElementById('totalOrdersPeriod').textContent = periodText;
    }

    // Vẽ biểu đồ doanh thu theo ngày
    function drawRevenueChart(orders) {
        const revenueByDate = {};

        orders.forEach(order => {
            if (['COMPLETED','SUCCESS'].includes(order.status)) {
                const date = order.orderDate.split('T')[0];
                const day = formatDateVN(date);
                revenueByDate[day] = (revenueByDate[day] || 0) + order.totalAmount;
            }
        });

        const labels = Object.keys(revenueByDate).sort();
        const data = labels.map(day => revenueByDate[day]);

        if (revenueChart) revenueChart.destroy();

        const ctx = document.getElementById('revenueChart').getContext('2d');
        revenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Doanh thu (₫)',
                    data: data,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#2980b9'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Vẽ biểu đồ trạng thái đơn hàng
    function drawStatusChart(orders) {
        const statusCount = {};
        orders.forEach(o => {
            const status = o.status || 'UNKNOWN';
            statusCount[status] = (statusCount[status] || 0) + 1;
        });

        const labels = Object.keys(statusCount);
        const data = Object.values(statusCount);
        const colors = ['#f39c12', '#00bc8c', '#e74c3c', '#3498db', '#9b59b6'];

        if (statusChart) statusChart.destroy();

        const ctx = document.getElementById('orderStatusChart').getContext('2d');
        statusChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(s => {
                    const map = { PENDING: 'Chờ xử lý', COMPLETED: 'Hoàn thành', CANCELLED: 'Đã hủy' };
                    return map[s] || s;
                }),
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }

    // Cập nhật bảng Top 10 sản phẩm bán chạy
    function updateTopProducts(orders) {
        const productMap = {};

        orders.forEach(order => {
            if (!['COMPLETED', 'SUCCESS'].includes(order.status)) return;

            order.orderDetails.forEach(item => {
                const key = item.product;
                if (!productMap[key]) {
                    productMap[key] = {
                        name: item.product,
                        quantity: 0,
                        revenue: 0,
                        image: item.image
                    };
                }
                productMap[key].quantity += item.quantity;
                productMap[key].revenue += item.price * item.quantity;
            });
        });

        const top10 = Object.values(productMap)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        const tbody = document.getElementById('topProductsTable');
        tbody.innerHTML = '';

        top10.forEach((p, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.quantity}</td>
                <td>${formatVND(p.revenue)}</td>
                <td>${p.name}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Load dữ liệu và hiển thị (mặc định 30 ngày gần nhất)
    function loadStatistics(startDate = null, endDate = null) {
        fetch(API_URL)
            .then(res => {
                if (!res.ok) throw new Error('Không thể kết nối đến server');
                return res.json();
            })
            .then(result => {
                allOrders = result.data.orders || [];

                // Nếu không truyền ngày → lấy 30 ngày gần nhất
                if (!startDate || !endDate) {
                    const today = new Date();
                    const past = new Date();
                    past.setDate(today.getDate() - 30);

                    startDate = past.toISOString().split('T')[0];
                    endDate = today.toISOString().split('T')[0];

                    document.getElementById('startDate').value = startDate;
                    document.getElementById('endDate').value = endDate;
                }

                const filteredOrders = filterOrdersByDate(startDate, endDate);
                const stats = calculateStats(filteredOrders);
                const periodText = `${formatDateVN(startDate)} → ${formatDateVN(endDate)}`;

                updateOverview(stats, periodText);
                drawRevenueChart(filteredOrders);
                drawStatusChart(filteredOrders);
                updateTopProducts(filteredOrders);
            })
            .catch(err => {
                showNotification('Lỗi tải dữ liệu: ' + err.message, 'error');
            });
    }

    // Nút Áp dụng lọc
    document.getElementById('filterBtn').addEventListener('click', () => {
        const start = document.getElementById('startDate').value;
        const end = document.getElementById('endDate').value;

        if (!start || !end) {
            showNotification('Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc!', 'warning');
            return;
        }

        if (new Date(start) > new Date(end)) {
            showNotification('Ngày bắt đầu không được lớn hơn ngày kết thúc!', 'warning');
            return;
        }

        loadStatistics(start, end);
    });

    // Nút Reset → 30 ngày gần nhất
    document.getElementById('resetBtn').addEventListener('click', () => {
        loadStatistics(); // Sẽ tự lấy 30 ngày gần nhất
    });

    // Khởi chạy lần đầu khi load trang
    loadStatistics();
});

// Hàm thông báo (nếu bạn đã có trong common.js thì bỏ qua)
function showNotification(message, type = 'success') {
    const noti = document.getElementById('notification');
    const msg = document.getElementById('notification-message');
    msg.textContent = message;
    noti.className = `notification show ${type}`;
    setTimeout(() => noti.classList.remove('show'), 4000);
}