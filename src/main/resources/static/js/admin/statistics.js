// /js/admin/statistics.js
document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = '/order/all';

    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
        showNotification('Bạn cần đăng nhập để truy cập trang này', 'error');
        window.location.href = '/login';
        return;
    }

    let allOrders = [];
    let revenueChart = null;
    let statusChart = null;

    const formatVND = amount =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(amount || 0);

    const formatDateVN = dateStr =>
        new Date(dateStr).toLocaleDateString('vi-VN');

    function filterOrdersByDate(startDate, endDate) {
        if (!startDate || !endDate) return allOrders;

        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        return allOrders.filter(o => {
            const d = new Date(o.orderDate);
            return d >= start && d <= end;
        });
    }

    function calculateStats(orders) {
        const completed = orders.filter(o =>
            ['COMPLETED', 'SUCCESS'].includes(o.status)
        );

        const totalRevenue = completed.reduce((s, o) => s + o.totalAmount, 0);

        return {
            totalRevenue,
            totalOrdersCount: orders.length,
            completedCount: completed.length,
            avgOrderValue: completed.length
                ? totalRevenue / completed.length
                : 0
        };
    }

    function updateOverview(stats, periodText) {
        document.getElementById('totalRevenue').textContent = formatVND(stats.totalRevenue);
        document.getElementById('completedOrders').textContent = stats.completedCount;
        document.getElementById('averageOrder').textContent = formatVND(stats.avgOrderValue);
        document.getElementById('totalOrders').textContent = stats.totalOrdersCount;

        document.getElementById('revenuePeriod').textContent = periodText;
        document.getElementById('ordersPeriod').textContent = periodText;
        document.getElementById('totalOrdersPeriod').textContent = periodText;
    }

    function drawRevenueChart(orders) {
        const revenueByDate = {};

        orders.forEach(o => {
            if (!['COMPLETED', 'SUCCESS'].includes(o.status)) return;
            const day = formatDateVN(o.orderDate.split('T')[0]);
            revenueByDate[day] = (revenueByDate[day] || 0) + o.totalAmount;
        });

        if (revenueChart) revenueChart.destroy();

        revenueChart = new Chart(
            document.getElementById('revenueChart'),
            {
                type: 'line',
                data: {
                    labels: Object.keys(revenueByDate),
                    datasets: [{
                        label: 'Doanh thu (₫)',
                        data: Object.values(revenueByDate),
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52,152,219,.1)',
                        tension: .4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            }
        );
    }

    function drawStatusChart(orders) {
        const map = {};

        orders.forEach(o => {
            map[o.status] = (map[o.status] || 0) + 1;
        });

        if (statusChart) statusChart.destroy();

        statusChart = new Chart(
            document.getElementById('orderStatusChart'),
            {
                type: 'doughnut',
                data: {
                    labels: Object.keys(map).map(getStatusText),
                    datasets: [{
                        data: Object.values(map),
                        backgroundColor: [
                            '#3498db','#e74c3c','#00bc8c',
                            '#f39c12','#9b59b6'
                        ]
                    }]
                }
            }
        );
    }

    function updateTopProducts(orders) {
        const productMap = {};

        orders.forEach(o => {
            if (!['COMPLETED', 'SUCCESS'].includes(o.status)) return;

            o.orderDetails.forEach(i => {
                if (!productMap[i.product]) {
                    productMap[i.product] = {
                        name: i.product,
                        quantity: 0,
                        revenue: 0
                    };
                }
                productMap[i.product].quantity += i.quantity;
                productMap[i.product].revenue += i.price * i.quantity;
            });
        });

        const tbody = document.getElementById('topProductsTable');
        tbody.innerHTML = '';

        Object.values(productMap)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10)
            .forEach((p, i) => {
                tbody.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${p.name}</td>
                        <td>${p.quantity}</td>
                        <td>${formatVND(p.revenue)}</td>
                        <td>${p.name}</td>
                    </tr>`;
            });
    }

    function loadStatistics(startDate = null, endDate = null) {
        fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        })
            .then(r => {
                if (r.status === 401) {
                    window.location.href = '/login';
                    throw new Error('Unauthorized');
                }
                if (!r.ok) throw new Error('Không tải được dữ liệu');
                return r.json();
            })
            .then(res => {
                allOrders = res.data?.orders || [];

                if (!startDate || !endDate) {
                    const now = new Date();
                    const past = new Date();
                    past.setDate(now.getDate() - 30);

                    startDate = past.toISOString().split('T')[0];
                    endDate = now.toISOString().split('T')[0];

                    document.getElementById('startDate').value = startDate;
                    document.getElementById('endDate').value = endDate;
                }

                const filtered = filterOrdersByDate(startDate, endDate);
                const stats = calculateStats(filtered);
                const period = `${formatDateVN(startDate)} → ${formatDateVN(endDate)}`;

                updateOverview(stats, period);
                drawRevenueChart(filtered);
                drawStatusChart(filtered);
                updateTopProducts(filtered);
            })
            .catch(e => showNotification(e.message, 'error'));
    }

    document.getElementById('filterBtn').onclick = () => {
        const s = startDate.value;
        const e = endDate.value;

        if (!s || !e) return showNotification('Chọn đủ ngày', 'warning');
        if (new Date(s) > new Date(e))
            return showNotification('Ngày không hợp lệ', 'warning');

        loadStatistics(s, e);
    };

    document.getElementById('resetBtn').onclick = () => loadStatistics();

    loadStatistics();
});

function getStatusText(status) {
    return {
        PENDING: 'Chờ xử lý',
        PROCESSING: 'Đang xử lý',
        SHIPPING: 'Đang vận chuyển',
        COMPLETED: 'Hoàn thành',
        CANCELLED: 'Đã hủy'
    }[status] || status;
}

function showNotification(message, type = 'success') {
    const noti = document.getElementById('notification');
    const msg = document.getElementById('notification-message');
    msg.textContent = message;
    noti.className = `notification show ${type}`;
    setTimeout(() => noti.classList.remove('show'), 4000);
}
