document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('Không tìm thấy ID sản phẩm');
        window.location.href = '/';
        return;
    }

    document.getElementById('productId').value = productId;

    // Load dữ liệu
    loadProductData(productId);
    loadCategories();
    loadBrands();

    // Preview ảnh mới
    document.getElementById('images').addEventListener('change', previewImages);
    document.getElementById('updateProductForm').addEventListener('submit', function (e) {
        e.preventDefault();
        updateProduct();
    });
});

const specificForms = {
    // ------------------- CPU -------------------
    cpu: `
        <div class="form-group">
            <label for="series">Series</label>
            <input type="text" id="series" name="series" placeholder="VD: Core i5">
        </div>
        <div class="form-group">
            <label for="thế_hệ">Thế hệ</label>
            <input type="text" id="thế_hệ" name="thế_hệ" placeholder="VD: Intel Core thế hệ thứ 12">
        </div>
        <div class="form-group">
            <label for="cpu">CPU *</label>
            <input type="text" id="cpu" name="cpu" required placeholder="VD: Intel® Core™ i5-12400F">
        </div>
        <div class="form-group">
            <label for="ra_mắt">Ra mắt</label>
            <input type="text" id="ra_mắt" name="ra_mắt" placeholder="VD: Quý 1, 2022">
        </div>
        <div class="form-group">
            <label for="số_nhân_xử_lý">Số nhân xử lý</label>
            <input type="number" id="số_nhân_xử_lý" name="số_nhân_xử_lý" min="1">
        </div>
        <div class="form-group">
            <label for="số_luồng_của_cpu">Số luồng của CPU</label>
            <input type="number" id="số_luồng_của_cpu" name="số_luồng_của_cpu" min="1">
        </div>
        <div class="form-group">
            <label for="tốc_độ_xử_lý">Tốc độ xử lý</label>
            <textarea id="tốc_độ_xử_lý" name="tốc_độ_xử_lý" placeholder="VD: Tần số Turbo tối đa 4.4 GHz..."></textarea>
        </div>
        <div class="form-group">
            <label for="tiêu_thụ_điện_năng">Tiêu thụ điện năng</label>
            <input type="text" id="tiêu_thụ_điện_năng" name="tiêu_thụ_điện_năng" placeholder="VD: 65W">
        </div>
        <div class="form-group">
            <label for="nhiệt_độ_tối_đa">Nhiệt độ tối đa</label>
            <input type="text" id="nhiệt_độ_tối_đa" name="nhiệt_độ_tối_đa" placeholder="VD: 100°C">
        </div>
        <div class="form-group">
            <label for="cache">Cache</label>
            <input type="text" id="cache" name="cache" placeholder="VD: 18MB">
        </div>
        <div class="form-group">
            <label for="socket">Socket</label>
            <input type="text" id="socket" name="socket" placeholder="VD: 1700">
        </div>
        <div class="form-group">
            <label for="ram_hỗ_trợ">RAM hỗ trợ</label>
            <textarea id="ram_hỗ_trợ" name="ram_hỗ_trợ" placeholder="VD: Hỗ trợ tối đa: 128 GB..."></textarea>
        </div>
        <div class="form-group">
            <label for="đồ_họa_tích_hợp">Đồ Họa tích hợp</label>
            <input type="text" id="đồ_họa_tích_hợp" name="đồ_họa_tích_hợp" placeholder="VD: PCIe® 5.0 & PCIe® 4.0">
        </div>
        <div class="form-group">
            <label for="phiên_bản_pci_express">Phiên bản PCI Express</label>
            <input type="text" id="phiên_bản_pci_express" name="phiên_bản_pci_express" placeholder="VD: PCIe® 5.0 & PCIe® 4.0">
        </div>
    `,

    // ------------------- GPU -------------------
    gpu: `
        <div class="form-group">
            <label for="gpu">GPU *</label>
            <input type="text" id="gpu" name="gpu" required placeholder="VD: GeForce RTX 5090">
        </div>
        <div class="form-group">
            <label for="bộ_nhớ">Bộ nhớ</label>
            <input type="text" id="bộ_nhớ" name="bộ_nhớ" placeholder="VD: 32GB GDDR7 (28 Gbps / 512-bit)">
        </div>
        <div class="form-group">
            <label for="series">Series</label>
            <input type="text" id="series" name="series" placeholder="VD: Vanguard">
        </div>
        <div class="form-group">
            <label for="part_number">Part-number</label>
            <input type="text" id="part_number" name="part_number" required placeholder="VD: N507T3-16D7X-176068W">
        </div>
        <div class="form-group">
            <label for="gpu_clock">GPU Clock</label>
            <textarea id="gpu_clock" name="gpu_clock" placeholder="VD: Extreme Performance: 2527 MHz..."></textarea>
        </div>
        <div class="form-group">
            <label for="giao_tiếp_pci">Giao tiếp PCI</label>
            <input type="text" id="giao_tiếp_pci" name="giao_tiếp_pci" placeholder="VD: PCI-E 5.0">
        </div>
        <div class="form-group">
            <label for="số_lượng_đơn_vị_xử_lý">Số lượng đơn vị xử lý</label>
            <input type="text" id="số_lượng_đơn_vị_xử_lý" name="số_lượng_đơn_vị_xử_lý" placeholder="VD: 21760 CUDA cores">
        </div>
        <div class="form-group">
            <label for="cổng_kết_nối">Cổng kết nối</label>
            <input type="text" id="cổng_kết_nối" name="cổng_kết_nối" placeholder="VD: 1 x HDMI 2.1b, 3 x DisplayPort 2.1b">
        </div>
        <div class="form-group">
            <label for="tản_nhiệt">Tản nhiệt</label>
            <input type="text" id="tản_nhiệt" name="tản_nhiệt" placeholder="VD: Tản nhiệt 3 quạt">
        </div>
        <div class="form-group">
            <label for="đèn_led">Đèn LED</label>
            <input type="text" id="đèn_led" name="đèn_led" placeholder="VD: RGB">
        </div>
        <div class="form-group">
            <label for="đầu_cấp_nguồn">Đầu cấp nguồn</label>
            <input type="text" id="đầu_cấp_nguồn" name="đầu_cấp_nguồn" placeholder="VD: 1 x 16-pin">
        </div>
        <div class="form-group">
            <label for="nguồn_đề_xuất">Nguồn đề xuất</label>
            <input type="text" id="nguồn_đề_xuất" name="nguồn_đề_xuất" placeholder="VD: 1000W">
        </div>
        <div class="form-group">
            <label for="kích_thước">Kích thước</label>
            <input type="text" id="kích_thước" name="kích_thước" placeholder="VD: 357 x 151 x 76 mm">
        </div>
    `,

    // ------------------- Mainboard -------------------
    mainboard: `
        <div class="form-group">
            <label for="chipset">Chipset</label>
            <input type="text" id="chipset" name="chipset" placeholder="VD: B840">
        </div>
        <div class="form-group">
            <label for="seriesmainboard">Socket</label>
            <input type="text" id="seriesmainboard" name="series_mainboard" placeholder="VD: PRO">
        </div>
        <div class="form-group">
            <label for="socket">Socket</label>
            <input type="text" id="socket" name="socket" placeholder="VD: AM5">
        </div>
        <div class="form-group">
            <label for="kích_thước">Kích thước</label>
            <input type="text" id="kích_thước" name="kích_thước" placeholder="VD: Micro-ATX">
        </div>
        <div class="form-group">
            <label for="khe_ram_tối_đa">Khe RAM tối đa</label>
            <input type="number" id="khe_ram_tối_đa" name="khe_ram_tối_đa" min="1">
        </div>
        <div class="form-group">
            <label for="kiểu_ram_hỗ_trợ">Kiểu RAM hỗ trợ</label>
            <input type="text" id="kiểu_ram_hỗ_trợ" name="kiểu_ram_hỗ_trợ" placeholder="VD: DDR5">
        </div>
        <div class="form-group">
            <label for="hỗ_trợ_bộ_nhớ_tối_đa">Hỗ trợ bộ nhớ tối đa</label>
            <input type="text" id="hỗ_trợ_bộ_nhớ_tối_đa" name="hỗ_trợ_bộ_nhớ_tối_đa" placeholder="VD: 256GB">
        </div>
        <div class="form-group">
            <label for="bus_ram_hỗ_trợ">Bus RAM hỗ trợ</label>
            <input type="text" id="bus_ram_hỗ_trợ" name="bus_ram_hỗ_trợ" placeholder="VD: 8000(O.C), 5600...">
        </div>
        <div class="form-group">
            <label for="lưu_trữ">Lưu trữ</label>
            <input type="text" id="lưu_trữ" name="lưu_trữ" placeholder="VD: 4 x SATA 3 6Gb/s, 2 x M.2 NVMe">
        </div>
        <div class="form-group">
            <label for="kiểu_khe_m2_hỗ_trợ">Kiểu khe M.2 hỗ trợ</label>
            <input type="text" id="kiểu_khe_m2_hỗ_trợ" name="kiểu_khe_m2_hỗ_trợ" placeholder="VD: M.2 SATA/NVMe">
        </div>
        <div class="form-group">
            <label for="cổng_xuất_hình">Cổng xuất hình</label>
            <input type="text" id="cổng_xuất_hình" name="cổng_xuất_hình" placeholder="VD: 1 x HDMI">
        </div>
        <div class="form-group">
            <label for="khe_pci">Khe PCI</label>
            <input type="text" id="khe_pci" name="khe_pci" placeholder="VD: 1 x PCI-E x16; 1x PCI-E x1">
        </div>
        <div class="form-group">
            <label for="đèn_led">Đèn LED</label>
            <input type="text" id="đèn_led" name="đèn_led" placeholder="VD: RGB">
        </div>
        <div class="form-group">
            <label for="số_cổng_usb">Số cổng USB</label>
            <textarea id="số_cổng_usb" name="số_cổng_usb" placeholder="VD: 1 x USB Type C (Tối đa 2)..."></textarea>
        </div>
        <div class="form-group">
            <label for="lan">LAN</label>
            <input type="text" id="lan" name="lan" placeholder="VD: 1 x LAN 2.5Gb/s">
        </div>
        <div class="form-group">
            <label for="kết_nối_không_dây">Kết nối không dây</label>
            <input type="text" id="kết_nối_không_dây" name="kết_nối_không_dây" placeholder="VD: Wi-Fi 6E (802.11ax)">
        </div>
        <div class="form-group">
            <label for="âm_thanh">Âm thanh</label>
            <input type="text" id="âm_thanh" name="âm_thanh" placeholder="VD: Realtek® ALC897...">
        </div>
    `,

    // ------------------- RAM -------------------
    ram: `
        <div class="form-group">
            <label for="part_number">Part-number</label>
            <input type="text" id="part_number" name="part_number" placeholder="VD: SP016GXLWU60FFSF">
        </div>
        <div class="form-group">
            <label for="màu_sắc">Màu sắc</label>
            <input type="text" id="màu_sắc" name="màu_sắc" placeholder="VD: Đen">
        </div>
        <div class="form-group">
            <label for="đèn_led">Đèn LED</label>
            <input type="text" id="đèn_led" name="đèn_led" placeholder="VD: RGB">
        </div>
        <div class="form-group">
            <label for="dung_lượng">Dung lượng</label>
            <input type="text" id="dung_lượng" name="dung_lượng" placeholder="VD: 1 x 16GB">
        </div>
        <div class="form-group">
            <label for="thế_hệ">Thế hệ</label>
            <input type="text" id="thế_hệ" name="thế_hệ" placeholder="VD: DDR5">
        </div>
        <div class="form-group">
            <label for="bus">Bus</label>
            <input type="text" id="bus" name="bus" placeholder="VD: 6000MHz">
        </div>
        <div class="form-group">
            <label for="timing">Timing</label>
            <input type="text" id="timing" name="timing" placeholder="VD: 36">
        </div>
        <div class="form-group">
            <label for="voltage">Voltage</label>
            <input type="text" id="voltage" name="voltage" placeholder="VD: 1.35V">
        </div>
    `,

    // ------------------- SSD -------------------
    ssd: `
        <div class="form-group">
            <label for="kiểu_ổ_cứng">Kiểu ổ cứng</label>
            <input type="text" id="kiểu_ổ_cứng" name="kiểu_ổ_cứng" placeholder="VD: SSD">
        </div>
        <div class="form-group">
            <label for="màu_sắc_của_ổ_cứng">Màu sắc</label>
            <input type="text" id="màu_sắc_của_ổ_cứng" name="màu_sắc_của_ổ_cứng" placeholder="VD: Đen">
        </div>
        <div class="form-group">
            <label for="dung_lượng">Dung lượng</label>
            <input type="text" id="dung_lượng" name="dung_lượng" placeholder="VD: 256GB">
        </div>
        <div class="form-group">
            <label for="kết_nối">Kết nối</label>
            <input type="text" id="kết_nối" name="kết_nối" placeholder="VD: SATA">
        </div>
        <div class="form-group">
            <label for="bộ_nhớ_nand">Bộ nhớ NAND</label>
            <input type="text" id="bộ_nhớ_nand" name="bộ_nhớ_nand" placeholder="VD: 3D-NAND">
        </div>
        <div class="form-group">
            <label for="kích_thước">Kích thước</label>
            <input type="text" id="kích_thước" name="kích_thước" placeholder="VD: 2.5">
        </div>
        <div class="form-group">
            <label for="tốc_độ_đọc">Tốc độ đọc</label>
            <input type="text" id="tốc_độ_đọc" name="tốc_độ_đọc" placeholder="VD: 520MB/s">
        </div>
        <div class="form-group">
            <label for="tốc_độ_ghi">Tốc độ ghi</label>
            <input type="text" id="tốc_độ_ghi" name="tốc_độ_ghi" placeholder="VD: 450MB/s">
        </div>
    `,

    // ------------------- Case -------------------
    case: `
        <div class="form-group">
            <label for="chất_liệu">Chất liệu</label>
            <input type="text" id="chất_liệu" name="chất_liệu" placeholder="VD: Thép">
        </div>
        <div class="form-group">
            <label for="chất_liệu_nắp_hông">Chất liệu nắp hông</label>
            <input type="text" id="chất_liệu_nắp_hông" name="chất_liệu_nắp_hông" placeholder="VD: Kính cường lực">
        </div>
        <div class="form-group">
            <label for="màu_sắc">Chất liệu nắp hông</label>
            <input type="text" id="màu_sắc" name="màu_sắc" placeholder="VD: Kính cường lực">
        </div>
        <div class="form-group">
            <label for="kích_thước">Kích thước</label>
            <input type="text" id="kích_thước" name="kích_thước" placeholder="VD: 370 x 186 x 295mm">
        </div>
        <div class="form-group">
            <label for="loại_case">Loại case</label>
            <input type="text" id="loại_case" name="loại_case" placeholder="VD: Mini Tower">
        </div>
        <div class="form-group">
            <label for="hỗ_trợ_mainboard">Hỗ trợ mainboard</label>
            <input type="text" id="hỗ_trợ_mainboard" name="hỗ_trợ_mainboard" placeholder="VD: Mini-ITX, Micro-ATX">
        </div>
        <div class="form-group">
            <label for="số_lượng_ổ_đĩa_hỗ_trợ">Số lượng ổ đĩa hỗ trợ</label>
            <input type="text" id="số_lượng_ổ_đĩa_hỗ_trợ" name="số_lượng_ổ_đĩa_hỗ_trợ" placeholder="VD: 1 x 3.5", 3 x 2.5"">
        </div>
        <div class="form-group">
            <label for="cổng_kết_nối">Cổng kết nối</label>
            <input type="text" id="cổng_kết_nối" name="cổng_kết_nối" placeholder="VD: 1 x USB 3.2, 1 x USB Type C">
        </div>
        <div class="form-group">
            <label for="kích_thước_radiator_tối_đa">Kích thước radiator tối đa</label>
            <input type="text" id="kích_thước_radiator_tối_đa" name="kích_thước_radiator_tối_đa" placeholder="VD: 240 mm">
        </div>
        <div class="form-group">
            <label for="loại_quạt_hỗ_trợ_phía_trên">Loại quạt hỗ trợ phía trên</label>
            <input type="text" id="loại_quạt_hỗ_trợ_phía_trên" name="loại_quạt_hỗ_trợ_phía_trên" placeholder="VD: 2 x 120 mm, 2 x 140 mm">
        </div>
        <div class="form-group">
            <label for="loại_quạt_hỗ_trợ_phía_sau">Loại quạt hỗ trợ phía sau</label>
            <input type="text" id="loại_quạt_hỗ_trợ_phía_sau" name="loại_quạt_hỗ_trợ_phía_sau" placeholder="VD: 1 x 120 mm, 1 x 92 mm">
        </div>
        <div class="form-group">
            <label for="loại_quạt_hỗ_trợ_bên_dưới">Loại quạt hỗ trợ bên dưới</label>
            <input type="text" id="loại_quạt_hỗ_trợ_bên_dưới" name="loại_quạt_hỗ_trợ_bên_dưới" placeholder="VD: 2 x 120 mm, 2 x 140 mm">
        </div>
        <div class="form-group">
            <label for="số_slot_pci">Số slot PCI</label>
            <input type="number" id="số_slot_pci" name="số_slot_pci" min="0">
        </div>
    `,

    // ------------------- Tản nhiệt -------------------
    heatsink: `
        <div class="form-group">
            <label for="dạng_tản_nhiệt">Dạng tản nhiệt</label>
            <input type="text" id="dạng_tản_nhiệt" name="dạng_tản_nhiệt" placeholder="VD: Tản nước">
        </div>
        <div class="form-group">
            <label for="kích_thước_quạt_mm">Kích thước quạt (mm)</label>
            <input type="text" id="kích_thước_quạt_mm" name="kích_thước_quạt_mm" placeholder="VD: 2 x 120 mm">
        </div>
        <div class="form-group">
            <label for="socket_được_hỗ_trợ">Socket được hỗ trợ</label>
            <textarea id="socket_được_hỗ_trợ" name="socket_được_hỗ_trợ" placeholder="VD: Intel LGA 1851, AMD AM5..."></textarea>
        </div>
        <div class="form-group">
            <label for="đèn_led">Đèn LED</label>
            <input type="text" id="đèn_led" name="đèn_led" placeholder="VD: ARGB">
        </div>
        <div class="form-group">
            <label for="chất_liệu_tản_nhiệt">Chất liệu tản nhiệt</label>
            <input type="text" id="chất_liệu_tản_nhiệt" name="chất_liệu_tản_nhiệt" placeholder="VD: Nhôm, Đồng">
        </div>
        <div class="form-group">
            <label for="màu_sắc">Màu sắc</label>
            <input type="text" id="màu_sắc" name="màu_sắc" placeholder="VD: Đen">
        </div>
        <div class="form-group">
            <label for="kích_thước_radiator_cm">Kích thước Radiator (cm)</label>
            <input type="text" id="kích_thước_radiator_cm" name="kích_thước_radiator_cm" placeholder="VD: 276 × 120 × 27mm">
        </div>
        <div class="form-group">
            <label for="số_vòng_quay_của_bơm_rpm">Số vòng quay của bơm (RPM)</label>
            <input type="text" id="số_vòng_quay_của_bơm_rpm" name="số_vòng_quay_của_bơm_rpm" placeholder="VD: 2900 vòng/phút ±10%">
        </div>
        <div class="form-group">
            <label for="số_vòng_quay_của_quạt_rpm">Số vòng quay của quạt (RPM)</label>
            <input type="text" id="số_vòng_quay_của_quạt_rpm" name="số_vòng_quay_của_quạt_rpm" placeholder="VD: 300 ～2000">
        </div>
        <div class="form-group">
            <label for="lưu_lượng_không_khí_cfm">Lưu lượng không khí (CFM)</label>
            <input type="text" id="lưu_lượng_không_khí_cfm" name="lưu_lượng_không_khí_cfm" placeholder="VD: 58CFM">
        </div>
        <div class="form-group">
            <label for="độ_ồn_dba">Độ ồn (dBA)</label>
            <input type="text" id="độ_ồn_dba" name="độ_ồn_dba" placeholder="VD: 27.2dB(A)">
        </div>
        <div class="form-group">
            <label for="khối_lượng_kg">Khối lượng (kg)</label>
            <input type="text" id="khối_lượng_kg" name="khối_lượng_kg" placeholder="VD: 2.2 kg">
        </div>
    `,

    // ------------------- Nguồn -------------------
    psu: `
        <div class="form-group">
            <label for="part_number">Part-number</label>
            <input type="text" id="part_number" name="part_number" placeholder="VD: MPE8506ACAGBEU1252000470">
        </div>
        <div class="form-group">
            <label for="series">Series</label>
            <input type="text" id="series" name="series" placeholder="VD: MWE Gold">
        </div>
        <div class="form-group">
            <label for="màu_sắc">Màu sắc</label>
            <input type="text" id="màu_sắc" name="màu_sắc" placeholder="VD: Đen">
        </div>
        <div class="form-group">
            <label for="công_suất_tối_đa">Công suất tối đa</label>
            <input type="text" id="công_suất_tối_đa" name="công_suất_tối_đa" placeholder="VD: 850W">
        </div>
        <div class="form-group">
            <label for="hiệu_suất">Hiệu suất</label>
            <input type="text" id="hiệu_suất" name="hiệu_suất" placeholder="VD: 80 Plus Gold">
        </div>
        <div class="form-group">
            <label for="số_cổng_cắm">Số cổng cắm</label>
            <textarea id="số_cổng_cắm" name="số_cổng_cắm" placeholder="VD: 1 x 24-pin Main, 1 x 8-pin (4+4) EPS..."></textarea>
        </div>
        <div class="form-group">
            <label for="quạt_làm_mát">Quạt làm mát</label>
            <input type="text" id="quạt_làm_mát" name="quạt_làm_mát" placeholder="VD: 1 x 120 mm">
        </div>
        <div class="form-group">
            <label for="nguồn_đầu_vào">Nguồn đầu vào</label>
            <input type="text" id="nguồn_đầu_vào" name="nguồn_đầu_vào" placeholder="VD: 100 - 240VAC">
        </div>
    `
};


// Map tên danh mục → key
function getCategoryKey(name) {
    const map = {
        'CPU': 'cpu',
        'Card đồ hoạ': 'gpu',
        'Mainboard': 'mainboard',
        'Ram': 'ram',
        'Ổ cứng': 'ssd',
        'Case': 'case',
        'Tản nhiệt PC': 'heatsink',
        'Nguồn máy tính': 'psu'
    };
    return map[name.trim()] || null;
}

// =============== LOAD DỮ LIỆU ===============
let currentProduct = null;
let categories = [];
let brands = [];

function loadProductData(id) {
    fetch(`/p/searchId/${id}`)
        .then(r => r.ok ? r.json() : Promise.reject('Không tải được sản phẩm'))
        .then(res => {
            currentProduct = res.data;
            fillForm(currentProduct);
            renderCurrentImages(currentProduct.images || []);
            showSpecificFormForCurrentCategory();
        })
        .catch(err => {
            alert(err);
            window.location.href = '/';
        });
}

function loadCategories() {
    fetch('/categories')
        .then(r => r.json())
        .then(res => {
            categories = (res.data || []).map(c => ({ id: c.categoryId, name: c.name }));
            renderCategories();
        });
}

function loadBrands() {
    fetch('/brands')
        .then(r => r.json())
        .then(res => {
            brands = (res.data || []).map(b => ({ id: b.brandId, name: b.name }));
            renderBrands();
        });
}

// =============== HIỂN THỊ ===============
function fillForm(product) {
    document.getElementById('name').value = product.name || '';
    document.getElementById('price').value = product.price || '';
    document.getElementById('stockQuantity').value = product.stockQuantity || 1;
    document.getElementById('warranty').value = product.warranty || 12;
    document.getElementById('discount').value = product.discount || 0;
    document.getElementById('description').value = product.description || '';
}

function renderCurrentImages(images) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '<div class="current-images-title">Ảnh hiện tại:</div>';
    if (images.length === 0) {
        preview.innerHTML += '<p>Chưa có ảnh</p>';
        return;
    }
    images.forEach(img => {
        const div = document.createElement('div');
        div.className = 'current-image';
        div.innerHTML = `<img src="/images/product/${img}" alt="Current">`;
        preview.appendChild(div);
    });
}

function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';

    categories.forEach(cat => {
        const key = getCategoryKey(cat.name);
        if (!key || !specificForms[key]) return;

        const div = document.createElement('div');
        div.className = 'category-item';

        div.innerHTML = `
            <input type="radio" id="cat_${cat.id}" name="categories" value="${cat.id}">
            <label for="cat_${cat.id}">${cat.name}</label>
        `;

        // Khi chọn danh mục → hiển thị form chi tiết
        div.querySelector('input').addEventListener('change', function () {
            if (this.checked) {
                showSpecificForm(key);
                validateCategories();
            }
        });

        container.appendChild(div);
    });

    // Nếu đang sửa sản phẩm → tự động chọn danh mục cũ
    if (currentProduct && currentProduct.categories && currentProduct.categories.length > 0) {
        const oldCatId = currentProduct.categories[0].categoryId;
        const radio = container.querySelector(`input[value="${oldCatId}"]`);
        if (radio) {
            radio.checked = true;
            const key = getCategoryKey(currentProduct.categories[0].name);
            if (key) showSpecificForm(key);
        }
    }
}

function renderBrands() {
    const container = document.getElementById('brandContainer');
    container.innerHTML = '';

    brands.forEach((brand, i) => {
        const div = document.createElement('div');
        div.className = 'brand-item';
        div.innerHTML = `
            <input type="radio" id="brand_${brand.id}" name="brand" value="${brand.id}" ${i === 0 ? 'checked' : ''}>
            <label for="brand_${brand.id}">${brand.name}</label>
        `;
        div.addEventListener('click', () => {
            document.querySelectorAll('.brand-item').forEach(b => b.classList.remove('selected'));
            div.classList.add('selected');
        });
        if (i === 0) div.classList.add('selected');
        container.appendChild(div);
    });

    // Nếu có dữ liệu cũ → chọn đúng brand
    if (currentProduct && currentProduct.brandId) {
        const radio = document.querySelector(`input[value="${currentProduct.brandId}"]`);
        if (radio) {
            radio.checked = true;
            radio.parentElement.classList.add('selected');
        }
    }
}

// Hiển thị form chi tiết khi chọn danh mục
function showSpecificForm(key) {
    const container = document.getElementById('specificFields');
    container.innerHTML = specificForms[key] || '<p>Không có thông số riêng cho danh mục này</p>';

    // Điền dữ liệu cũ nếu có
    if (currentProduct && currentProduct.attributes) {
        currentProduct.attributes.forEach(attr => {
            const input = container.querySelector(`[name="${attr.key}"]`);
            if (input) input.value = attr.value;
        });
    }
}

function showSpecificFormForCurrentCategory() {
    if (!currentProduct || !currentProduct.categories || currentProduct.categories.length === 0) return;

    const catName = currentProduct.categories[0].name;
    const key = getCategoryKey(catName);
    if (key) {
        // Check checkbox tương ứng
        const checkbox = document.querySelector(`input[value="${currentProduct.categories[0].categoryId}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.parentElement.classList.add('selected');
        }
        showSpecificForm(key);
    }
}

// =============== PREVIEW ẢNH MỚI ===============
function previewImages(e) {
    const files = e.target.files;
    const preview = document.getElementById('imagePreview');
    const currentTitle = preview.querySelector('.current-images-title');
    if (currentTitle) currentTitle.remove();

    if (files.length > 0) {
        preview.innerHTML += '<div class="new-images-title">Ảnh mới sẽ thay thế:</div>';
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => {
                const div = document.createElement('div');
                div.className = 'new-image';
                div.innerHTML = `<img src="${ev.target.result}" alt="New">`;
                preview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    }
}

// =============== VALIDATE ===============
function validateCategories() {
    const checked = document.querySelector('input[name="categories"]:checked');
    const err = document.getElementById('categoryError');
    if (!checked) {
        err.textContent = 'Vui lòng chọn 1 danh mục';
        return false;
    }
    err.textContent = '';
    return true;
}

function validateBrand() {
    const checked = document.querySelector('input[name="brand"]:checked');
    const err = document.getElementById('brandError');
    if (!checked) {
        err.textContent = 'Vui lòng chọn nhãn hàng';
        return false;
    }
    err.textContent = '';
    return true;
}

// =============== CẬP NHẬT ===============
function updateProduct() {
    if (!validateCategories() || !validateBrand()) return;

    const formData = new FormData();
    const id = document.getElementById('productId').value;

    formData.append('name', document.getElementById('name').value.trim());
    formData.append('price', document.getElementById('price').value);
    formData.append('stockQuantity', document.getElementById('stockQuantity').value);
    formData.append('warranty', document.getElementById('warranty').value);
    formData.append('discount', document.getElementById('discount').value);
    formData.append('description', document.getElementById('description').value);

    // Danh mục (chỉ hỗ trợ 1 như hiện tại)
    const catChecked = document.querySelector('input[name="categories"]:checked');
    formData.append('categoryId', catChecked.value);

    // Nhãn hàng
    const brandChecked = document.querySelector('input[name="brand"]:checked');
    formData.append('brandId', brandChecked.value);

    // Thuộc tính động
    const attributes = [];
    document.querySelectorAll('#specificFields input, #specificFields textarea').forEach(el => {
        if (el.value.trim()) {
            attributes.push({key: el.name, value: el.value.trim()});
        }
    });
    attributes.forEach((a, i) => {
        formData.append(`attributes[${i}].key`, a.key);
        formData.append(`attributes[${i}].value`, a.value);
    });

    // Ảnh mới (nếu có)
    const newImages = document.getElementById('images').files;
    for (let file of newImages) {
        formData.append('images', file);
    }

    fetch(`/product/update/${id}`, {
        method: 'PUT',
        body: formData
    })
        .then(r => r.ok ? r.json() : r.json().then(err => Promise.reject(err.message || 'Cập nhật thất bại')))
        .then(() => {
            alert('Cập nhật sản phẩm thành công!');
            window.history.back();
        })
        .catch(err => {
            alert('Lỗi: ' + err);
        });
}