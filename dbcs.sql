use dbcs;

INSERT INTO brands (name, image) VALUES
('Intel', 'intel.png'),
('NVIDIA', 'nvidia.png'),
('ASUS', 'asus.png'),
('Kingston', 'kingston.png'),
('Samsung', 'samsung.png'),
('Kioxia', 'kioxia.png'),
('MSI', 'msi.png'),
('AMD','amd.jpg'),
('Zotac','zotac.png'),
('AORUS','aorus.png'),
('Gigabyte','gigabyte.png'),
('ASRock','asrock.jpg'),
('BIOSTAR','biostar.png'),
('CORSAIR','corsair.png'),
('GSKILL','gskill.png'),
('ADATA','adata.png'),
('Crucial','crucial.png'),
('WD','wd.png'),
('Cooler','cooler.png'),
('Be Quiet!','bequiet.png'),
('NZXT','nzxt.png'),
('Seasonic','seasonic.png'),
('DeepCool','deepcool.png'),
('Lian Li','lianli.png'),
('Other','orther.jpg');

INSERT INTO categories (name, image) VALUES
('CPU', 'cpu.jpg'),
('Card đồ họa', 'card.jpg'),
('Mainboard', 'mainboard.jpg'),
('Ram', 'ram.jpg'),
('Ổ cứng', 'ocung.jpg'),
('Case', 'case.jpg'),
('Tản nhiệt PC', 'tannhiet.jpg'),
('Nguồn máy tính', 'nguonmaytinh.png');

INSERT INTO users (username, password, role, full_name, image, email, phone, address, date_of_birth, date_create) VALUES
('admin', '$2a$10$OcwT6NHGWnd8Tu3dxQW3Q.m5oW6hGHJ7sZYp7dZo5d8Kxl37n1U/y', 'ADMIN', 'Admin', 'default.jpg', 'admin@gmail.com', '0901234567', 'Nghe An', '1990-01-15', '2025-11-27'),
('admin2', '$2a$10$OcwT6NHGWnd8Tu3dxQW3Q.m5oW6hGHJ7sZYp7dZo5d8Kxl37n1U/y','ADMIN', 'Admin Second', 'default.jpg', 'admin2@gmail.com','0901111111', 'Ha Noi', '1992-03-10', '2025-11-27'),
('quancr', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.', 'CUSTOMER', 'Bien Quan', 'ronaldo.jpg', 'bienanhquan7@gmail.com', '0336684254', 'Viet Nam', '2002-01-02', '2025-11-27'),
('ronaldo', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.', 'CUSTOMER', 'Cristiano Ronaldo', 'ronaldo.jpg', 'ronaldo@gmail.com', '0965427504', 'Protugal', '1985-02-05', '2025-11-27'),
('user1', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Nguyen Van A', 'default.jpg', 'user01@gmail.com','0902000001', 'Ha Noi', '1998-05-12', '2025-11-27'),
('user2', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Tran Thi B', 'default.jpg', 'user02@gmail.com','0902000002', 'Hai Phong', '1999-07-20', '2025-11-28'),
('user3', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Le Van C', 'default.jpg', 'user03@gmail.com','0902000003', 'Da Nang', '2000-09-15', '2025-11-29'),
('user4', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Pham Thi D', 'default.jpg', 'user04@gmail.com','0902000004', 'Hue', '1997-11-22', '2025-12-01'),
('user5', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Hoang Van E', 'default.jpg', 'user05@gmail.com','0902000005', 'Quang Nam', '1996-04-08', '2025-12-01'),
('user6', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Do Thi F', 'default.jpg', 'user06@gmail.com','0902000006', 'Can Tho', '2001-01-30', '2025-12-03'),
('user7', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Vu Van G', 'default.jpg', 'user07@gmail.com','0902000007', 'Vung Tau', '1995-06-18', '2025-12-09'),
('user8', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Bui Thi H', 'default.jpg', 'user08@gmail.com','0902000008', 'Dong Nai', '1994-12-25', '2025-12-10'),
('user9', '$2a$10$PbmoJYTNMLfxiMFIp4.xFulY.hALgpqTkTAYayZByboZ7sigXDg1.','CUSTOMER', 'Dang Van I', 'default.jpg', 'user09@gmail.com','0902000009', 'Binh Duong', '2002-02-14', '2025-12-11');

-- CPU (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('Intel Core i5-12400F', 3490000, 'CPU Intel Core i5 thế hệ 12, 6 nhân 12 luồng', 50, 36, 5, '2024-01-15', 1, 1),
('Intel Core i7-12700K', 7990000, 'CPU Intel Core i7 thế hệ 12, 12 nhân 20 luồng', 30, 36, 8, '2024-01-15', 1, 1),
('Intel Core i9-14900K', 12990000, 'CPU Intel Core i9 thế hệ 14, 24 nhân 32 luồng', 20, 36, 10, '2024-02-01', 1, 1),
('AMD Ryzen 5 5600X', 4290000, 'CPU AMD Ryzen 5, 6 nhân 12 luồng', 45, 36, 7, '2024-01-20', 1, 8),
('AMD Ryzen 7 7800X3D', 10490000, 'CPU AMD Ryzen 7 với công nghệ 3D V-Cache', 25, 36, 5, '2024-02-10', 1, 8),
('Intel Core i3-12100F', 2490000, 'CPU Intel Core i3 thế hệ 12, 4 nhân 8 luồng', 60, 36, 3, '2024-01-10', 1, 1),
('AMD Ryzen 9 7950X', 14990000, 'CPU AMD Ryzen 9, 16 nhân 32 luồng', 15, 36, 12, '2024-02-05', 1, 8),
('Intel Core i5-13400F', 4490000, 'CPU Intel Core i5 thế hệ 13, 10 nhân 16 luồng', 40, 36, 6, '2024-01-25', 1, 1),
('AMD Ryzen 5 7600X', 5990000, 'CPU AMD Ryzen 5 thế hệ 7000, 6 nhân 12 luồng', 35, 36, 8, '2024-02-08', 1, 8),
('Intel Core i7-13700K', 9990000, 'CPU Intel Core i7 thế hệ 13, 16 nhân 24 luồng', 25, 36, 9, '2024-02-03', 1, 1),
('AMD Ryzen 7 5800X3D', 8990000, 'CPU AMD Ryzen 7 với công nghệ 3D V-Cache', 20, 36, 7, '2024-01-30', 1, 8),
('Intel Core i9-13900K', 13990000, 'CPU Intel Core i9 thế hệ 13, 24 nhân 32 luồng', 18, 36, 11, '2024-02-01', 1, 1),
('AMD Ryzen 9 7900X', 11990000, 'CPU AMD Ryzen 9, 12 nhân 24 luồng', 22, 36, 10, '2024-02-12', 1, 8),
('Intel Pentium Gold G7400', 1890000, 'CPU Intel Pentium, 2 nhân 4 luồng', 70, 36, 2, '2024-01-05', 1, 1),
('AMD Ryzen 3 4100', 1990000, 'CPU AMD Ryzen 3, 4 nhân 8 luồng', 55, 36, 4, '2024-01-12', 1, 8);

INSERT INTO product_image (product_id, images) VALUES
(1, 'cpu1.jpg'),
(2, 'i7.jpg'),
(3, 'i9.jpg'),
(4, 'amd5.jpg'),
(5, 'amd7.jpg'),
(6, 'i3.jpg'),
(7, 'amd9.jpg'),
(8, 'i5.jpg'),
(9, 'amd5.jpg'),
(10, 'i7.jpg'),
(11, 'amd7.jpg'),
(12, 'i9.jpg'),
(13, 'amd9.jpg'),
(14, 'igold.jpg'),
(15, 'amd3.jpg');

-- Card đồ họa (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('NVIDIA GeForce RTX 4090', 42990000, 'Card đồ họa NVIDIA RTX 4090 24GB GDDR6X', 10, 36, 15, '2024-02-01', 2, 2),
('ASUS ROG Strix RTX 4080', 32990000, 'Card đồ họa ASUS RTX 4080 16GB GDDR6X', 12, 36, 12, '2024-02-05', 2, 3),
('MSI GeForce RTX 4070 Ti', 24990000, 'Card đồ họa MSI RTX 4070 Ti 12GB GDDR6X', 15, 36, 10, '2024-01-20', 2, 7),
('Gigabyte RTX 4060 Ti', 14990000, 'Card đồ họa Gigabyte RTX 4060 Ti 8GB GDDR6', 20, 36, 8, '2024-01-25', 2, 11),
('AMD Radeon RX 7900 XTX', 27990000, 'Card đồ họa AMD Radeon RX 7900 XTX 24GB GDDR6', 8, 36, 14, '2024-02-10', 2, 8),
('NVIDIA GeForce RTX 3080', 21990000, 'Card đồ họa NVIDIA RTX 3080 10GB GDDR6X', 5, 24, 20, '2024-01-15', 2, 2),
('ASUS TUF RTX 4070', 18990000, 'Card đồ họa ASUS TUF RTX 4070 12GB GDDR6X', 18, 36, 9, '2024-02-08', 2, 3),
('MSI Radeon RX 7800 XT', 16990000, 'Card đồ họa MSI RX 7800 XT 16GB GDDR6', 14, 36, 11, '2024-02-12', 2, 7),
('Gigabyte RTX 3050', 5990000, 'Card đồ họa Gigabyte RTX 3050 8GB GDDR6', 25, 24, 5, '2024-01-10', 2, 11),
('AMD Radeon RX 7600', 7990000, 'Card đồ họa AMD Radeon RX 7600 8GB GDDR6', 22, 36, 7, '2024-01-30', 2, 8),
('NVIDIA GeForce GTX 1660 Super', 5490000, 'Card đồ họa NVIDIA GTX 1660 Super 6GB GDDR6', 30, 24, 15, '2024-01-05', 2, 2),
('ASUS Dual RTX 4060', 10990000, 'Card đồ họa ASUS Dual RTX 4060 8GB GDDR6', 16, 36, 8, '2024-02-15', 2, 3),
('MSI RTX 3060 Ti', 12990000, 'Card đồ họa MSI RTX 3060 Ti 8GB GDDR6', 12, 24, 18, '2024-01-18', 2, 7),
('AMD Radeon RX 6700 XT', 11990000, 'Card đồ họa AMD Radeon RX 6700 XT 12GB GDDR6', 9, 36, 13, '2024-01-22', 2, 8),
('Zotac RTX 4070 Super', 22990000, 'Card đồ họa Zotac RTX 4070 Super 12GB GDDR6X', 11, 36, 10, '2024-02-20', 2, 9);

INSERT INTO product_image (product_id, images) VALUES
(16, 'nvidia4090.jpg'),
(17, 'asus4080.jpg'),
(18, 'msi4070.jpg'),
(19, 'gg4060.jpg'),
(20, 'amd7900.jpg'),
(21, 'nvidia3080.jpg'),
(22, 'asus4070.png'),
(23, 'msi7800.jpg'),
(24, 'gg3050.jpg'),
(25, 'amd7600.jpg'),
(26, 'nvidia1660.jpg'),
(27, 'asus4060.jpg'),
(28, 'msi3060.jpg'),
(29, 'amd6700.jpg'),
(30, 'zotac4070.jpg');

-- Mainboard (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('ASUS ROG Strix Z790-E', 8990000, 'Mainboard ASUS Z790 cho Intel thế hệ 13/14', 25, 36, 10, '2024-02-01', 3, 3),
('MSI MAG B760M Mortar', 4290000, 'Mainboard MSI B760 Micro-ATX cho Intel', 35, 36, 8, '2024-01-20', 3, 7),
('Gigabyte B650 Aorus Elite', 5490000, 'Mainboard Gigabyte B650 cho AMD Ryzen 7000', 30, 36, 9, '2024-01-25', 3, 10),
('ASUS TUF Gaming B550-Plus', 3490000, 'Mainboard ASUS B550 cho AMD Ryzen 5000', 40, 36, 7, '2024-01-15', 3, 3),
('MSI PRO Z790-A', 5990000, 'Mainboard MSI Z790 ATX cho Intel', 28, 36, 11, '2024-02-05', 3, 7),
('ASRock B660M Pro RS', 2890000, 'Mainboard ASRock B660 Micro-ATX cho Intel', 45, 36, 5, '2024-01-10', 3, 12),
('Gigabyte X670E Aorus Master', 11990000, 'Mainboard Gigabyte X670E cho AMD Ryzen 7000', 15, 36, 15, '2024-02-10', 3, 10),
('ASUS Prime H610M-K', 1990000, 'Mainboard ASUS H610 Micro-ATX cho Intel', 50, 24, 3, '2024-01-05', 3, 3),
('MSI MPG B550 Gaming Plus', 3790000, 'Mainboard MSI B550 ATX cho AMD Ryzen 5000', 32, 36, 8, '2024-01-18', 3, 7),
('ASRock A520M-HVS', 1790000, 'Mainboard ASRock A520 Micro-ATX cho AMD', 55, 24, 4, '2024-01-08', 3, 12),
('Gigabyte Z690 UD', 4990000, 'Mainboard Gigabyte Z690 cho Intel thế hệ 12/13', 26, 36, 12, '2024-01-30', 3, 11),
('ASUS ROG Crosshair X670E Hero', 14990000, 'Mainboard ASUS X670E cho AMD Ryzen 7000', 12, 36, 18, '2024-02-12', 3, 3),
('MSI MAG B550M Bazooka', 3290000, 'Mainboard MSI B550M Micro-ATX cho AMD', 38, 36, 6, '2024-01-22', 3, 7),
('Biostar B450MH', 1590000, 'Mainboard Biostar B450 Micro-ATX cho AMD', 60, 24, 10, '2024-01-03', 3, 13),
('ASUS ProArt Z790-Creator', 12990000, 'Mainboard ASUS Z790 cho sáng tạo nội dung', 18, 36, 14, '2024-02-15', 3, 3);

INSERT INTO product_image (product_id, images) VALUES
(31, 'asusz790.png'),
(32, 'msib760m.jpg'),
(33, 'ggb650m.jpg'),
(34, 'asusb550mplus.jpg'),
(35, 'msiz790.jpg'),
(36, 'asrockb660m.jpg'),
(37, 'aorusx670e.jpg'),
(38, 'asush610mk.jpg'),
(39, 'msib550.jpg'),
(40, 'asrocka520m.jpg'),
(41, 'gigabytez690.jpg'),
(42, 'asusx670e.jpg'),
(43, 'msib550m.jpg'),
(44, 'biostarb450mh.jpg'),
(45, 'asusz790.jpg');

-- RAM (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('Kingston Fury Beast DDR5 32GB (2x16GB) 6000MHz', 2990000, 'RAM Kingston Fury Beast DDR5 32GB 6000MHz', 50, 60, 10, '2024-02-01', 4, 4),
('Corsair Vengeance RGB Pro DDR4 32GB (2x16GB) 3600MHz', 2490000, 'RAM Corsair Vengeance RGB Pro DDR4 32GB', 45, 60, 8, '2024-01-20', 4, 14),
('G.Skill Trident Z5 RGB DDR5 64GB (2x32GB) 6400MHz', 5990000, 'RAM G.Skill Trident Z5 RGB DDR5 64GB', 30, 60, 15, '2024-02-05', 4, 15),
('Samsung DDR5 16GB 4800MHz', 1290000, 'RAM Samsung DDR5 16GB 4800MHz', 60, 60, 5, '2024-01-10', 4, 5),
('Kingston Fury Renegade DDR4 16GB (1x16GB) 3200MHz', 890000, 'RAM Kingston Fury Renegade DDR4 16GB', 55, 60, 7, '2024-01-15', 4, 4),
('Corsair Dominator Platinum RGB DDR5 32GB (2x16GB) 6200MHz', 3990000, 'RAM Corsair Dominator Platinum RGB DDR5', 25, 60, 12, '2024-02-10', 4, 14),
('ADATA XPG Spectrix D50 DDR4 32GB (2x16GB) 3600MHz', 2190000, 'RAM ADATA XPG Spectrix D50 RGB DDR4', 35, 60, 9, '2024-01-25', 4, 16),
('TeamGroup T-Force Delta RGB DDR5 16GB (2x8GB) 6000MHz', 1890000, 'RAM TeamGroup T-Force Delta RGB DDR5 16GB', 40, 60, 6, '2024-01-30', 4, 25),
('Kingston ValueRAM DDR4 8GB 2666MHz', 490000, 'RAM Kingston ValueRAM DDR4 8GB', 70, 36, 3, '2024-01-05', 4, 4),
('G.Skill Ripjaws V DDR4 32GB (2x16GB) 4000MHz', 2690000, 'RAM G.Skill Ripjaws V DDR4 32GB 4000MHz', 28, 60, 11, '2024-01-22', 4, 15),
('Samsung DDR4 32GB (2x16GB) 3200MHz', 1990000, 'RAM Samsung DDR4 32GB 3200MHz', 32, 60, 8, '2024-01-18', 4, 5),
('Crucial Ballistix DDR4 16GB (2x8GB) 3600MHz', 1490000, 'RAM Crucial Ballistix DDR4 16GB', 42, 60, 10, '2024-01-12', 4, 17),
('Kingston Fury Beast RGB DDR5 48GB (2x24GB) 5600MHz', 3490000, 'RAM Kingston Fury Beast RGB DDR5 48GB', 22, 60, 14, '2024-02-08', 4, 4),
('Corsair Vengeance LPX DDR4 64GB (2x32GB) 3200MHz', 4490000, 'RAM Corsair Vengeance LPX DDR4 64GB', 18, 60, 16, '2024-02-12', 4, 14),
('ADATA Premier DDR5 32GB (1x32GB) 4800MHz', 1790000, 'RAM ADATA Premier DDR5 32GB', 38, 60, 7, '2024-01-28', 4, 16);

INSERT INTO product_image (product_id, images) VALUES
(46, 'kingston6000mhz.jpg'),
(47, 'corsair3600mhz.jpg'),
(48, 'gskillz5.png'),
(49, 'samsung4800mhz.jpg'),
(50, 'kingston3200mhz.jpg'),
(51, 'cor5200mhz.png'),
(52, 'adata3600mhz.png'),
(53, 'teamgroup6000mhz.jpg'),
(54, 'kingston2666mhz.jpg'),
(55, 'gskillz4400mhz.jpg'),
(56, 'samsung3200mhz.jpg'),
(57, 'crucial3600mhz.jpg'),
(58, 'kingston5600mhz.jpg'),
(59, 'cor3200mhz.png'),
(60, 'adata4800mhz.jpg');

-- Ổ cứng (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('Samsung 980 Pro 1TB NVMe M.2', 2490000, 'SSD Samsung 980 Pro 1TB PCIe 4.0 NVMe', 40, 60, 15, '2024-02-01', 5, 5),
('Western Digital Blue SN570 1TB NVMe', 1890000, 'SSD WD Blue SN570 1TB PCIe 3.0 NVMe', 50, 60, 10, '2024-01-20', 5, 25),
('Kingston NV2 2TB NVMe M.2', 2990000, 'SSD Kingston NV2 2TB PCIe 4.0 NVMe', 35, 60, 12, '2024-02-05', 5, 4),
('Crucial P3 Plus 1TB NVMe', 1790000, 'SSD Crucial P3 Plus 1TB PCIe 4.0 NVMe', 45, 60, 8, '2024-01-25', 5, 17),
('Samsung 870 EVO 1TB SATA III', 2190000, 'SSD Samsung 870 EVO 1TB SATA III', 30, 60, 18, '2024-01-15', 5, 5),
('Kioxia Exceria G2 1TB NVMe', 1690000, 'SSD Kioxia Exceria G2 1TB PCIe 3.0 NVMe', 42, 60, 9, '2024-01-30', 5, 6),
('WD Black SN850X 2TB NVMe', 4990000, 'SSD WD Black SN850X 2TB PCIe 4.0 NVMe', 25, 60, 20, '2024-02-10', 5, 18),
('Kingston A400 480GB SATA III', 690000, 'SSD Kingston A400 480GB SATA III', 60, 36, 5, '2024-01-10', 5, 4),
('Samsung 970 EVO Plus 500GB NVMe', 1290000, 'SSD Samsung 970 EVO Plus 500GB PCIe 3.0 NVMe', 38, 60, 14, '2024-01-18', 5, 5),
('Crucial MX500 1TB SATA III', 1990000, 'SSD Crucial MX500 1TB SATA III', 33, 60, 11, '2024-01-22', 5, 17),
('Kioxia Exceria Pro 2TB NVMe', 4290000, 'SSD Kioxia Exceria Pro 2TB PCIe 4.0 NVMe', 20, 60, 16, '2024-02-08', 5, 6),
('WD Blue 4TB HDD 5400RPM', 2490000, 'HDD WD Blue 4TB 5400RPM SATA III', 28, 24, 7, '2024-01-28', 5, 18),
('Seagate Barracuda 2TB HDD 7200RPM', 1590000, 'HDD Seagate Barracuda 2TB 7200RPM', 35, 24, 6, '2024-01-12', 5, 25),
('Kingston KC3000 1TB NVMe', 2790000, 'SSD Kingston KC3000 1TB PCIe 4.0 NVMe', 26, 60, 13, '2024-02-12', 5, 4),
('Samsung 990 Pro 2TB NVMe', 5990000, 'SSD Samsung 990 Pro 2TB PCIe 4.0 NVMe', 18, 60, 22, '2024-02-15', 5, 5);

INSERT INTO product_image (product_id, images) VALUES
(61, 'samsung980.jpg'),
(62, 'westernsn570.jpg'),
(63, 'kingston2tb.jpg'),
(64, 'crucial1tb.jpg'),
(65, 'samsung870.jpg'),
(66, 'kioxia1tb.jpg'),
(67, 'wdsn850x.jpg'),
(68, 'kingston400gb.jpg'),
(69, 'samsung970.jpg'),
(70, 'crucialmx500.png'),
(71, 'kioxia2tb.jpg'),
(72, 'wdblue4tb.jpg'),
(73, 'hddbarracuda2tb.jpg'),
(74, 'kingston1tb.jpg'),
(75, 'Samsung990.jpg');

-- Case (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('Corsair 4000D Airflow', 2490000, 'Case Corsair 4000D Airflow Mid-Tower', 30, 24, 10, '2024-02-01', 6, 14),
('NZXT H5 Flow', 1990000, 'Case NZXT H5 Flow Mid-Tower', 35, 24, 8, '2024-01-20', 6, 21),
('Lian Li O11 Dynamic EVO', 4990000, 'Case Lian Li O11 Dynamic EVO Dual Chamber', 20, 36, 15, '2024-02-05', 6, 24),
('Fractal Design Meshify 2', 3490000, 'Case Fractal Design Meshify 2 Mid-Tower', 25, 36, 12, '2024-01-25', 6, 25),
('Cooler Master MasterBox TD500', 2290000, 'Case Cooler Master MasterBox TD500 Mesh', 28, 24, 9, '2024-01-15', 6, 19),
('Phanteks Eclipse P400A', 1890000, 'Case Phanteks Eclipse P400A Digital RGB', 32, 24, 7, '2024-01-10', 6, 25),
('ASUS TUF Gaming GT301', 1790000, 'Case ASUS TUF Gaming GT301 Mid-Tower', 40, 24, 6, '2024-01-30', 6, 3),
('MSI MAG Forge 100R', 1490000, 'Case MSI MAG Forge 100R Mid-Tower', 45, 24, 5, '2024-01-18', 6, 7),
('Deepcool CH560 Digital', 2190000, 'Case Deepcool CH560 Digital Mid-Tower', 26, 24, 11, '2024-01-22', 6, 23),
('Corsair iCUE 5000D RGB', 5990000, 'Case Corsair iCUE 5000D RGB Mid-Tower', 15, 36, 18, '2024-02-10', 6, 14),
('NZXT H7 Flow', 2990000, 'Case NZXT H7 Flow Mid-Tower', 22, 24, 13, '2024-02-08', 6, 21),
('Lian Li Lancool 216', 2290000, 'Case Lian Li Lancool 216 Mid-Tower', 29, 24, 10, '2024-01-28', 6, 24),
('Fractal Design Pop Air RGB', 1990000, 'Case Fractal Design Pop Air RGB Mid-Tower', 34, 24, 8, '2024-01-12', 6, 25),
('Cooler Master HAF 700 EVO', 8990000, 'Case Cooler Master HAF 700 EVO Full-Tower', 10, 36, 20, '2024-02-15', 6, 19),
('Phanteks NV7', 6990000, 'Case Phanteks NV7 Full-Tower', 12, 36, 16, '2024-02-12', 6, 25);

INSERT INTO product_image (product_id, images) VALUES
(76, 'corsair4000d.jpg'),
(77, 'nzxth5flow.jpg'),
(78, 'lianli011.jpg'),
(79, 'meshify2.jpg'),
(80, 'coolertd500.png'),
(81, 'PhanteksEclipseP400A.jpg'),
(82, 'asusgt301.jpg'),
(83, 'msiforge100r.jpg'),
(84, 'deepcoolch560.jpg'),
(85, 'corsair5000d.jpg'),
(86, 'nzxth7flow.jpg'),
(87, 'lianli216.jpg'),
(88, 'fractal.jpg'),
(89, 'cooler700.jpg'),
(90, 'phanteknv7.jpg');

-- Tản nhiệt (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('Corsair iCUE H150i Elite Capellix', 4490000, 'Tản nước AIO 360mm Corsair iCUE H150i', 25, 60, 15, '2024-02-01', 7, 14),
('NZXT Kraken 360 RGB', 4290000, 'Tản nước AIO 360mm NZXT Kraken', 22, 60, 12, '2024-01-20', 7, 21),
('Cooler Master Hyper 212', 890000, 'Tản nhiệt khí Cooler Master Hyper 212', 50, 36, 5, '2024-01-15', 7, 19),
('Deepcool AK620', 1290000, 'Tản nhiệt khí Deepcool AK620 Dual Tower', 35, 60, 8, '2024-01-25', 7, 23),
('Arctic Liquid Freezer II 280', 2990000, 'Tản nước AIO 280mm Arctic Liquid Freezer II', 28, 60, 10, '2024-01-30', 7, 25),
('Noctua NH-D15', 1990000, 'Tản nhiệt khí Noctua NH-D15 Dual Tower', 20, 60, 18, '2024-02-05', 7, 25),
('Lian Li Galahad II Trinity', 3990000, 'Tản nước AIO 360mm Lian Li Galahad II', 18, 60, 14, '2024-02-10', 7, 24),
('Thermalright Peerless Assassin 120', 1190000, 'Tản nhiệt khí Thermalright Peerless Assassin', 40, 60, 6, '2024-01-10', 7, 25),
('MSI MAG CoreLiquid 240R', 1890000, 'Tản nước AIO 240mm MSI MAG CoreLiquid', 30, 60, 9, '2024-01-18', 7, 7),
('Cooler Master MASTERLIQUID ML240L', 1690000, 'Tản nước AIO 240mm Cooler Master', 32, 60, 7, '2024-01-22', 7, 19),
('Deepcool LT720', 3490000, 'Tản nước AIO 360mm Deepcool LT720', 24, 60, 11, '2024-01-28', 7, 23),
('Be Quiet! Dark Rock Pro 4', 2190000, 'Tản nhiệt khí Be Quiet! Dark Rock Pro 4', 26, 60, 13, '2024-02-08', 7, 20),
('ID-Cooling SE-224-XTS', 590000, 'Tản nhiệt khí ID-Cooling SE-224-XTS', 55, 36, 4, '2024-01-05', 7, 25),
('NZXT Kraken 240 RGB', 3290000, 'Tản nước AIO 240mm NZXT Kraken', 29, 60, 16, '2024-02-12', 7, 21),
('Corsair H100i Elite Capellix', 3290000, 'Tản nước AIO 240mm Corsair H100i', 31, 60, 17, '2024-02-15', 7, 14);

INSERT INTO product_image (product_id, images) VALUES
(91, 'corsairh150i.png'),
(92, 'nzxt360.jpg'),
(93, 'cooler212.jpg'),
(94, 'AK620.jpg'),
(95, 'arctic280.jpg'),
(96, 'noctuanhd15.jpg'),
(97, 'lianli360.jpg'),
(98, 'thermalright12.jpg'),
(99, 'msi240R.jpg'),
(100, 'masterliquidml240l.jpg'),
(101, 'deepcoollt720.png'),
(102, 'bequietdrp4.jpg'),
(103, 'XTS224.jpg'),
(104, 'nzxt240.jpg'),
(105, 'corsairh100i.png');

-- Nguồn máy tính (15 sản phẩm)
INSERT INTO products (name, price, description, stock_quantity, warranty, discount, create_date, category_id, brand_id) VALUES
('Corsair RM850x 850W 80 Plus Gold', 3490000, 'Nguồn Corsair RM850x 850W Full Modular', 30, 120, 15, '2024-02-01', 8, 14),
('Seasonic FOCUS GX-850 850W', 3290000, 'Nguồn Seasonic FOCUS GX-850 850W Gold', 28, 120, 12, '2024-01-20', 8, 22),
('Cooler Master MWE Gold 750 V2', 2190000, 'Nguồn Cooler Master MWE Gold 750W', 40, 60, 8, '2024-01-15', 8, 19),
('ASUS ROG Strix 1000W Gold', 4990000, 'Nguồn ASUS ROG Strix 1000W 80 Plus Gold', 20, 120, 18, '2024-02-05', 8, 3),
('MSI MPG A850G 850W', 2990000, 'Nguồn MSI MPG A850G 850W 80 Plus Gold', 32, 120, 10, '2024-01-25', 8, 7),
('EVGA SuperNOVA 750 G6', 2790000, 'Nguồn EVGA SuperNOVA 750W 80 Plus Gold', 35, 120, 9, '2024-01-30', 8, 25),
('Be Quiet! Pure Power 12 M 850W', 3290000, 'Nguồn Be Quiet! Pure Power 12 M 850W', 26, 120, 11, '2024-02-10', 8, 20),
('FSP Hydro G Pro 1000W', 4290000, 'Nguồn FSP Hydro G Pro 1000W 80 Plus Gold', 18, 120, 14, '2024-01-18', 8, 25),
('Thermaltake Toughpower GF1 850W', 2690000, 'Nguồn Thermaltake Toughpower GF1 850W', 38, 120, 7, '2024-01-22', 8, 25),
('Corsair CV650 650W Bronze', 1290000, 'Nguồn Corsair CV650 650W 80 Plus Bronze', 50, 36, 5, '2024-01-10', 8, 14),
('Gigabyte UD850GM 850W', 2490000, 'Nguồn Gigabyte UD850GM 850W 80 Plus Gold', 33, 120, 13, '2024-02-08', 8, 11),
('Seasonic PRIME TX-1000', 6990000, 'Nguồn Seasonic PRIME TX-1000 80 Plus Titanium', 15, 120, 20, '2024-02-12', 8, 22),
('Cooler Master V850 Gold V2', 2990000, 'Nguồn Cooler Master V850 850W 80 Plus Gold', 29, 120, 16, '2024-01-28', 8, 19),
('ASUS TUF Gaming 750W Bronze', 1790000, 'Nguồn ASUS TUF Gaming 750W 80 Plus Bronze', 42, 60, 6, '2024-01-12', 8, 3),
('MSI MAG A650BN 650W', 1190000, 'Nguồn MSI MAG A650BN 650W 80 Plus Bronze', 45, 36, 4, '2024-01-05', 8, 7);

INSERT INTO product_image (product_id, images) VALUES
(106, 'corsair850w.jpg'),
(107, 'seasonicgx850.jpg'),
(108, 'coolermastergold750w.jpg'),
(109, 'asus1000w.png'),
(110, 'msi850w.png'),
(111, 'evga750.jpg'),
(112, 'bequiet850w.jpg'),
(113, 'hydro1000w.jpg'),
(114, 'thermaltakegf1850w.jpg'),
(115, 'corsaircv650.jpg'),
(116, 'GigabyteUD850GM.jpg'),
(117, 'seasonictx1000.jpg'),
(118, 'coolerv850.jpg'),
(119, 'asus750w.jpg'),
(120, 'msi650w.jpg');

-- Thuộc tính cho CPU
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(1, 'series', 'Core i5'),
(1, 'thế_hệ', 'Intel Core thế hệ thứ 12'),
(1, 'cpu', 'Intel® Core™ i5-12400F'),
(1, 'ra_mắt', 'Quý 1, 2022'),
(1, 'số_nhân_xử_lý', '6'),
(1, 'số_luồng_của_cpu', '12'),
(1, 'tốc_độ_xử_lý', 'Tần số cơ bản: 2.5 GHz, Tần số Turbo tối đa: 4.4 GHz'),
(1, 'tiêu_thụ_điện_năng', '65W'),
(1, 'nhiệt_độ_tối_đa', '100°C'),
(1, 'cache', '18MB'),
(1, 'socket', '1700'),
(1, 'ram_hỗ_trợ', 'DDR5 4800 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(1, 'đồ_họa_tích_hợp', 'Không có'),
(1, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');
-- Thuộc tính cho CPU ID 2 (Intel Core i7-12700K)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(2, 'series', 'Core i7'),
(2, 'thế_hệ', 'Intel Core thế hệ thứ 12'),
(2, 'cpu', 'Intel® Core™ i7-12700K'),
(2, 'ra_mắt', 'Quý 4, 2021'),
(2, 'số_nhân_xử_lý', '12'),
(2, 'số_luồng_của_cpu', '20'),
(2, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.6 GHz, Tần số Turbo tối đa: 5.0 GHz'),
(2, 'tiêu_thụ_điện_năng', '125W'),
(2, 'nhiệt_độ_tối_đa', '100°C'),
(2, 'cache', '25MB'),
(2, 'socket', '1700'),
(2, 'ram_hỗ_trợ', 'DDR5 4800 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(2, 'đồ_họa_tích_hợp', 'Intel® UHD Graphics 770'),
(2, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 3 (Intel Core i9-14900K)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(3, 'series', 'Core i9'),
(3, 'thế_hệ', 'Intel Core thế hệ thứ 14'),
(3, 'cpu', 'Intel® Core™ i9-14900K'),
(3, 'ra_mắt', 'Quý 4, 2023'),
(3, 'số_nhân_xử_lý', '24'),
(3, 'số_luồng_của_cpu', '32'),
(3, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.2 GHz, Tần số Turbo tối đa: 6.0 GHz'),
(3, 'tiêu_thụ_điện_năng', '125W'),
(3, 'nhiệt_độ_tối_đa', '100°C'),
(3, 'cache', '36MB'),
(3, 'socket', '1700'),
(3, 'ram_hỗ_trợ', 'DDR5 5600 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 192 GB'),
(3, 'đồ_họa_tích_hợp', 'Intel® UHD Graphics 770'),
(3, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 4 (AMD Ryzen 5 5600X)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(4, 'series', 'Ryzen 5'),
(4, 'thế_hệ', 'AMD Ryzen 5000 Series'),
(4, 'cpu', 'AMD Ryzen™ 5 5600X'),
(4, 'ra_mắt', 'Quý 4, 2020'),
(4, 'số_nhân_xử_lý', '6'),
(4, 'số_luồng_của_cpu', '12'),
(4, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.7 GHz, Tần số Turbo tối đa: 4.6 GHz'),
(4, 'tiêu_thụ_điện_năng', '65W'),
(4, 'nhiệt_độ_tối_đa', '95°C'),
(4, 'cache', '35MB'),
(4, 'socket', 'AM4'),
(4, 'ram_hỗ_trợ', 'DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(4, 'đồ_họa_tích_hợp', 'Không có'),
(4, 'phiên_bản_pci_express', 'PCIe® 4.0');

-- Thuộc tính cho CPU ID 5 (AMD Ryzen 7 7800X3D)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(5, 'series', 'Ryzen 7'),
(5, 'thế_hệ', 'AMD Ryzen 7000 Series'),
(5, 'cpu', 'AMD Ryzen™ 7 7800X3D'),
(5, 'ra_mắt', 'Quý 1, 2023'),
(5, 'số_nhân_xử_lý', '8'),
(5, 'số_luồng_của_cpu', '16'),
(5, 'tốc_độ_xử_lý', 'Tần số cơ bản: 4.2 GHz, Tần số Turbo tối đa: 5.0 GHz'),
(5, 'tiêu_thụ_điện_năng', '120W'),
(5, 'nhiệt_độ_tối_đa', '89°C'),
(5, 'cache', '96MB'),
(5, 'socket', 'AM5'),
(5, 'ram_hỗ_trợ', 'DDR5 5200 MHz, Hỗ trợ tối đa: 128 GB'),
(5, 'đồ_họa_tích_hợp', 'AMD Radeon™ Graphics'),
(5, 'phiên_bản_pci_express', 'PCIe® 5.0');

-- Thuộc tính cho CPU ID 6 (Intel Core i3-12100F)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(6, 'series', 'Core i3'),
(6, 'thế_hệ', 'Intel Core thế hệ thứ 12'),
(6, 'cpu', 'Intel® Core™ i3-12100F'),
(6, 'ra_mắt', 'Quý 1, 2022'),
(6, 'số_nhân_xử_lý', '4'),
(6, 'số_luồng_của_cpu', '8'),
(6, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.3 GHz, Tần số Turbo tối đa: 4.3 GHz'),
(6, 'tiêu_thụ_điện_năng', '58W'),
(6, 'nhiệt_độ_tối_đa', '100°C'),
(6, 'cache', '12MB'),
(6, 'socket', '1700'),
(6, 'ram_hỗ_trợ', 'DDR5 4800 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(6, 'đồ_họa_tích_hợp', 'Không có'),
(6, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 7 (AMD Ryzen 9 7950X)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(7, 'series', 'Ryzen 9'),
(7, 'thế_hệ', 'AMD Ryzen 7000 Series'),
(7, 'cpu', 'AMD Ryzen™ 9 7950X'),
(7, 'ra_mắt', 'Quý 3, 2022'),
(7, 'số_nhân_xử_lý', '16'),
(7, 'số_luồng_của_cpu', '32'),
(7, 'tốc_độ_xử_lý', 'Tần số cơ bản: 4.5 GHz, Tần số Turbo tối đa: 5.7 GHz'),
(7, 'tiêu_thụ_điện_năng', '170W'),
(7, 'nhiệt_độ_tối_đa', '95°C'),
(7, 'cache', '80MB'),
(7, 'socket', 'AM5'),
(7, 'ram_hỗ_trợ', 'DDR5 5200 MHz, Hỗ trợ tối đa: 128 GB'),
(7, 'đồ_họa_tích_hợp', 'AMD Radeon™ Graphics'),
(7, 'phiên_bản_pci_express', 'PCIe® 5.0');

-- Thuộc tính cho CPU ID 8 (Intel Core i5-13400F)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(8, 'series', 'Core i5'),
(8, 'thế_hệ', 'Intel Core thế hệ thứ 13'),
(8, 'cpu', 'Intel® Core™ i5-13400F'),
(8, 'ra_mắt', 'Quý 1, 2023'),
(8, 'số_nhân_xử_lý', '10'),
(8, 'số_luồng_của_cpu', '16'),
(8, 'tốc_độ_xử_lý', 'Tần số cơ bản: 2.5 GHz, Tần số Turbo tối đa: 4.6 GHz'),
(8, 'tiêu_thụ_điện_năng', '65W'),
(8, 'nhiệt_độ_tối_đa', '100°C'),
(8, 'cache', '20MB'),
(8, 'socket', '1700'),
(8, 'ram_hỗ_trợ', 'DDR5 4800 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(8, 'đồ_họa_tích_hợp', 'Không có'),
(8, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 9 (AMD Ryzen 5 7600X)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(9, 'series', 'Ryzen 5'),
(9, 'thế_hệ', 'AMD Ryzen 7000 Series'),
(9, 'cpu', 'AMD Ryzen™ 5 7600X'),
(9, 'ra_mắt', 'Quý 3, 2022'),
(9, 'số_nhân_xử_lý', '6'),
(9, 'số_luồng_của_cpu', '12'),
(9, 'tốc_độ_xử_lý', 'Tần số cơ bản: 4.7 GHz, Tần số Turbo tối đa: 5.3 GHz'),
(9, 'tiêu_thụ_điện_năng', '105W'),
(9, 'nhiệt_độ_tối_đa', '95°C'),
(9, 'cache', '38MB'),
(9, 'socket', 'AM5'),
(9, 'ram_hỗ_trợ', 'DDR5 5200 MHz, Hỗ trợ tối đa: 128 GB'),
(9, 'đồ_họa_tích_hợp', 'AMD Radeon™ Graphics'),
(9, 'phiên_bản_pci_express', 'PCIe® 5.0');

-- Thuộc tính cho CPU ID 10 (Intel Core i7-13700K)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(10, 'series', 'Core i7'),
(10, 'thế_hệ', 'Intel Core thế hệ thứ 13'),
(10, 'cpu', 'Intel® Core™ i7-13700K'),
(10, 'ra_mắt', 'Quý 4, 2022'),
(10, 'số_nhân_xử_lý', '16'),
(10, 'số_luồng_của_cpu', '24'),
(10, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.4 GHz, Tần số Turbo tối đa: 5.4 GHz'),
(10, 'tiêu_thụ_điện_năng', '125W'),
(10, 'nhiệt_độ_tối_đa', '100°C'),
(10, 'cache', '30MB'),
(10, 'socket', '1700'),
(10, 'ram_hỗ_trợ', 'DDR5 5600 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 192 GB'),
(10, 'đồ_họa_tích_hợp', 'Intel® UHD Graphics 770'),
(10, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 11 (AMD Ryzen 7 5800X3D)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(11, 'series', 'Ryzen 7'),
(11, 'thế_hệ', 'AMD Ryzen 5000 Series'),
(11, 'cpu', 'AMD Ryzen™ 7 5800X3D'),
(11, 'ra_mắt', 'Quý 2, 2022'),
(11, 'số_nhân_xử_lý', '8'),
(11, 'số_luồng_của_cpu', '16'),
(11, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.4 GHz, Tần số Turbo tối đa: 4.5 GHz'),
(11, 'tiêu_thụ_điện_năng', '105W'),
(11, 'nhiệt_độ_tối_đa', '90°C'),
(11, 'cache', '96MB'),
(11, 'socket', 'AM4'),
(11, 'ram_hỗ_trợ', 'DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(11, 'đồ_họa_tích_hợp', 'Không có'),
(11, 'phiên_bản_pci_express', 'PCIe® 4.0');

-- Thuộc tính cho CPU ID 12 (Intel Core i9-13900K)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(12, 'series', 'Core i9'),
(12, 'thế_hệ', 'Intel Core thế hệ thứ 13'),
(12, 'cpu', 'Intel® Core™ i9-13900K'),
(12, 'ra_mắt', 'Quý 4, 2022'),
(12, 'số_nhân_xử_lý', '24'),
(12, 'số_luồng_của_cpu', '32'),
(12, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.0 GHz, Tần số Turbo tối đa: 5.8 GHz'),
(12, 'tiêu_thụ_điện_năng', '125W'),
(12, 'nhiệt_độ_tối_đa', '100°C'),
(12, 'cache', '36MB'),
(12, 'socket', '1700'),
(12, 'ram_hỗ_trợ', 'DDR5 5600 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 192 GB'),
(12, 'đồ_họa_tích_hợp', 'Intel® UHD Graphics 770'),
(12, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 13 (AMD Ryzen 9 7900X)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(13, 'series', 'Ryzen 9'),
(13, 'thế_hệ', 'AMD Ryzen 7000 Series'),
(13, 'cpu', 'AMD Ryzen™ 9 7900X'),
(13, 'ra_mắt', 'Quý 3, 2022'),
(13, 'số_nhân_xử_lý', '12'),
(13, 'số_luồng_của_cpu', '24'),
(13, 'tốc_độ_xử_lý', 'Tần số cơ bản: 4.7 GHz, Tần số Turbo tối đa: 5.6 GHz'),
(13, 'tiêu_thụ_điện_năng', '170W'),
(13, 'nhiệt_độ_tối_đa', '95°C'),
(13, 'cache', '76MB'),
(13, 'socket', 'AM5'),
(13, 'ram_hỗ_trợ', 'DDR5 5200 MHz, Hỗ trợ tối đa: 128 GB'),
(13, 'đồ_họa_tích_hợp', 'AMD Radeon™ Graphics'),
(13, 'phiên_bản_pci_express', 'PCIe® 5.0');

-- Thuộc tính cho CPU ID 14 (Intel Pentium Gold G7400)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(14, 'series', 'Pentium Gold'),
(14, 'thế_hệ', 'Intel Pentium thế hệ thứ 12'),
(14, 'cpu', 'Intel® Pentium® Gold G7400'),
(14, 'ra_mắt', 'Quý 1, 2022'),
(14, 'số_nhân_xử_lý', '2'),
(14, 'số_luồng_của_cpu', '4'),
(14, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.7 GHz'),
(14, 'tiêu_thụ_điện_năng', '46W'),
(14, 'nhiệt_độ_tối_đa', '100°C'),
(14, 'cache', '6MB'),
(14, 'socket', '1700'),
(14, 'ram_hỗ_trợ', 'DDR5 4800 MHz, DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(14, 'đồ_họa_tích_hợp', 'Intel® UHD Graphics 710'),
(14, 'phiên_bản_pci_express', 'PCIe® 5.0 & PCIe® 4.0');

-- Thuộc tính cho CPU ID 15 (AMD Ryzen 3 4100)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(15, 'series', 'Ryzen 3'),
(15, 'thế_hệ', 'AMD Ryzen 4000 Series'),
(15, 'cpu', 'AMD Ryzen™ 3 4100'),
(15, 'ra_mắt', 'Quý 2, 2022'),
(15, 'số_nhân_xử_lý', '4'),
(15, 'số_luồng_của_cpu', '8'),
(15, 'tốc_độ_xử_lý', 'Tần số cơ bản: 3.8 GHz, Tần số Turbo tối đa: 4.0 GHz'),
(15, 'tiêu_thụ_điện_năng', '65W'),
(15, 'nhiệt_độ_tối_đa', '95°C'),
(15, 'cache', '6MB'),
(15, 'socket', 'AM4'),
(15, 'ram_hỗ_trợ', 'DDR4 3200 MHz, Hỗ trợ tối đa: 128 GB'),
(15, 'đồ_họa_tích_hợp', 'Không có'),
(15, 'phiên_bản_pci_express', 'PCIe® 3.0');

-- Thuộc tính cho GPU ID 16 (NVIDIA GeForce RTX 4090)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(16, 'gpu', 'GeForce RTX 4090'),
(16, 'bộ_nhớ', '24GB GDDR6X (21 Gbps / 384-bit)'),
(16, 'series', 'Founders Edition'),
(16, 'part_number', 'N4090FE'),
(16, 'gpu_clock', 'Boost Clock: 2520 MHz'),
(16, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(16, 'số_lượng_đơn_vị_xử_lý', '16384 CUDA cores'),
(16, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(16, 'tản_nhiệt', 'Tản nhiệt 3 quạt với vapor chamber'),
(16, 'đèn_led', 'RGB với GeForce RTX logo'),
(16, 'đầu_cấp_nguồn', '1 x 16-pin (12VHPWR)'),
(16, 'nguồn_đề_xuất', '850W'),
(16, 'kích_thước', '304 x 137 x 61 mm');

-- Thuộc tính cho GPU ID 17 (ASUS ROG Strix RTX 4080)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(17, 'gpu', 'GeForce RTX 4080'),
(17, 'bộ_nhớ', '16GB GDDR6X (22.4 Gbps / 256-bit)'),
(17, 'series', 'ROG Strix'),
(17, 'part_number', 'ROG-STRIX-RTX4080-O16G-GAMING'),
(17, 'gpu_clock', 'Game Clock: 2505 MHz, Boost Clock: 2535 MHz'),
(17, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(17, 'số_lượng_đơn_vị_xử_lý', '9728 CUDA cores'),
(17, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 2 x HDMI 2.1'),
(17, 'tản_nhiệt', 'Tản nhiệt 3 quạt Axial-tech'),
(17, 'đèn_led', 'Aura Sync RGB'),
(17, 'đầu_cấp_nguồn', '1 x 16-pin (12VHPWR)'),
(17, 'nguồn_đề_xuất', '850W'),
(17, 'kích_thước', '357 x 149 x 70 mm');

-- Thuộc tính cho GPU ID 18 (MSI GeForce RTX 4070 Ti)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(18, 'gpu', 'GeForce RTX 4070 Ti'),
(18, 'bộ_nhớ', '12GB GDDR6X (21 Gbps / 192-bit)'),
(18, 'series', 'Gaming X Trio'),
(18, 'part_number', 'RTX 4070 Ti GAMING X TRIO 12G'),
(18, 'gpu_clock', 'Game Clock: 2610 MHz, Boost Clock: 2745 MHz'),
(18, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(18, 'số_lượng_đơn_vị_xử_lý', '7680 CUDA cores'),
(18, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(18, 'tản_nhiệt', 'TRI FROZR 3 thermal design'),
(18, 'đèn_led', 'Mystic Light RGB'),
(18, 'đầu_cấp_nguồn', '1 x 16-pin (12VHPWR)'),
(18, 'nguồn_đề_xuất', '750W'),
(18, 'kích_thước', '337 x 140 x 62 mm');

-- Thuộc tính cho GPU ID 19 (Gigabyte RTX 4060 Ti)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(19, 'gpu', 'GeForce RTX 4060 Ti'),
(19, 'bộ_nhớ', '8GB GDDR6 (18 Gbps / 128-bit)'),
(19, 'series', 'Gaming OC'),
(19, 'part_number', 'GV-N406TGAMING OC-8GD'),
(19, 'gpu_clock', 'Boost Clock: 2595 MHz'),
(19, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(19, 'số_lượng_đơn_vị_xử_lý', '4352 CUDA cores'),
(19, 'cổng_kết_nối', '2 x DisplayPort 1.4a, 2 x HDMI 2.1'),
(19, 'tản_nhiệt', 'WINDFORCE cooling system'),
(19, 'đèn_led', 'RGB Fusion 2.0'),
(19, 'đầu_cấp_nguồn', '1 x 8-pin'),
(19, 'nguồn_đề_xuất', '550W'),
(19, 'kích_thước', '282 x 117 x 40 mm');

-- Thuộc tính cho GPU ID 20 (AMD Radeon RX 7900 XTX)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(20, 'gpu', 'Radeon RX 7900 XTX'),
(20, 'bộ_nhớ', '24GB GDDR6 (20 Gbps / 384-bit)'),
(20, 'series', 'Reference Design'),
(20, 'part_number', 'RX7900XTX'),
(20, 'gpu_clock', 'Game Clock: 2300 MHz, Boost Clock: 2500 MHz'),
(20, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(20, 'số_lượng_đơn_vị_xử_lý', '6144 Stream Processors'),
(20, 'cổng_kết_nối', '1 x HDMI 2.1, 2 x DisplayPort 2.1, 1 x USB Type-C'),
(20, 'tản_nhiệt', 'Triple-fan vapor chamber'),
(20, 'đèn_led', 'Radeon logo RGB'),
(20, 'đầu_cấp_nguồn', '2 x 8-pin'),
(20, 'nguồn_đề_xuất', '800W'),
(20, 'kích_thước', '287 x 135 x 51 mm');

-- Thuộc tính cho GPU ID 21 (NVIDIA GeForce RTX 3080)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(21, 'gpu', 'GeForce RTX 3080'),
(21, 'bộ_nhớ', '10GB GDDR6X (19 Gbps / 320-bit)'),
(21, 'series', 'Founders Edition'),
(21, 'part_number', 'N3080FE'),
(21, 'gpu_clock', 'Boost Clock: 1710 MHz'),
(21, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(21, 'số_lượng_đơn_vị_xử_lý', '8704 CUDA cores'),
(21, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(21, 'tản_nhiệt', 'Dual axial-flow fans'),
(21, 'đèn_led', 'GeForce RTX logo'),
(21, 'đầu_cấp_nguồn', '2 x 8-pin'),
(21, 'nguồn_đề_xuất', '750W'),
(21, 'kích_thước', '285 x 112 x 40 mm');

-- Thuộc tính cho GPU ID 22 (ASUS TUF RTX 4070)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(22, 'gpu', 'GeForce RTX 4070'),
(22, 'bộ_nhớ', '12GB GDDR6X (21 Gbps / 192-bit)'),
(22, 'series', 'TUF Gaming'),
(22, 'part_number', 'TUF-RTX4070-12G-GAMING'),
(22, 'gpu_clock', 'Boost Clock: 2550 MHz'),
(22, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(22, 'số_lượng_đơn_vị_xử_lý', '5888 CUDA cores'),
(22, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(22, 'tản_nhiệt', 'Military-grade capacitors, Axial-tech fans'),
(22, 'đèn_led', 'Aura Sync RGB'),
(22, 'đầu_cấp_nguồn', '1 x 16-pin (12VHPWR)'),
(22, 'nguồn_đề_xuất', '650W'),
(22, 'kích_thước', '301 x 143 x 63 mm');

-- Thuộc tính cho GPU ID 23 (MSI Radeon RX 7800 XT)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(23, 'gpu', 'Radeon RX 7800 XT'),
(23, 'bộ_nhớ', '16GB GDDR6 (19.5 Gbps / 256-bit)'),
(23, 'series', 'Gaming'),
(23, 'part_number', 'RX 7800 XT GAMING 16G'),
(23, 'gpu_clock', 'Game Clock: 2124 MHz, Boost Clock: 2430 MHz'),
(23, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(23, 'số_lượng_đơn_vị_xử_lý', '3840 Stream Processors'),
(23, 'cổng_kết_nối', '1 x HDMI 2.1, 3 x DisplayPort 2.1'),
(23, 'tản_nhiệt', 'TORX FAN 5.0'),
(23, 'đèn_led', 'Mystic Light RGB'),
(23, 'đầu_cấp_nguồn', '2 x 8-pin'),
(23, 'nguồn_đề_xuất', '700W'),
(23, 'kích_thước', '323 x 140 x 55 mm');

-- Thuộc tính cho GPU ID 24 (Gigabyte RTX 3050)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(24, 'gpu', 'GeForce RTX 3050'),
(24, 'bộ_nhớ', '8GB GDDR6 (14 Gbps / 128-bit)'),
(24, 'series', 'Gaming OC'),
(24, 'part_number', 'GV-N3050GAMING OC-8GD'),
(24, 'gpu_clock', 'Boost Clock: 1822 MHz'),
(24, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(24, 'số_lượng_đơn_vị_xử_lý', '2560 CUDA cores'),
(24, 'cổng_kết_nối', '2 x DisplayPort 1.4a, 2 x HDMI 2.1'),
(24, 'tản_nhiệt', 'WINDFORCE 2X cooling system'),
(24, 'đèn_led', 'RGB Fusion'),
(24, 'đầu_cấp_nguồn', '1 x 8-pin'),
(24, 'nguồn_đề_xuất', '450W'),
(24, 'kích_thước', '282 x 117 x 40 mm');

-- Thuộc tính cho GPU ID 25 (AMD Radeon RX 7600)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(25, 'gpu', 'Radeon RX 7600'),
(25, 'bộ_nhớ', '8GB GDDR6 (18 Gbps / 128-bit)'),
(25, 'series', 'Reference Design'),
(25, 'part_number', 'RX7600'),
(25, 'gpu_clock', 'Game Clock: 2250 MHz, Boost Clock: 2655 MHz'),
(25, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(25, 'số_lượng_đơn_vị_xử_lý', '2048 Stream Processors'),
(25, 'cổng_kết_nối', '1 x HDMI 2.1, 3 x DisplayPort 2.1'),
(25, 'tản_nhiệt', 'Dual fan design'),
(25, 'đèn_led', 'Radeon logo'),
(25, 'đầu_cấp_nguồn', '1 x 8-pin'),
(25, 'nguồn_đề_xuất', '500W'),
(25, 'kích_thước', '204 x 115 x 40 mm');

-- Thuộc tính cho GPU ID 26 (NVIDIA GeForce GTX 1660 Super)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(26, 'gpu', 'GeForce GTX 1660 Super'),
(26, 'bộ_nhớ', '6GB GDDR6 (14 Gbps / 192-bit)'),
(26, 'series', 'Ventus XS'),
(26, 'part_number', 'GTX 1660 SUPER VENTUS XS OC'),
(26, 'gpu_clock', 'Boost Clock: 1830 MHz'),
(26, 'giao_tiếp_pci', 'PCI-E 3.0 x16'),
(26, 'số_lượng_đơn_vị_xử_lý', '1408 CUDA cores'),
(26, 'cổng_kết_nối', '3 x DisplayPort 1.4, 1 x HDMI 2.0b'),
(26, 'tản_nhiệt', 'Dual fan design'),
(26, 'đèn_led', 'Không có'),
(26, 'đầu_cấp_nguồn', '1 x 8-pin'),
(26, 'nguồn_đề_xuất', '450W'),
(26, 'kích_thước', '247 x 127 x 42 mm');

-- Thuộc tính cho GPU ID 27 (ASUS Dual RTX 4060)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(27, 'gpu', 'GeForce RTX 4060'),
(27, 'bộ_nhớ', '8GB GDDR6 (17 Gbps / 128-bit)'),
(27, 'series', 'Dual'),
(27, 'part_number', 'DUAL-RTX4060-O8G'),
(27, 'gpu_clock', 'Boost Clock: 2505 MHz'),
(27, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(27, 'số_lượng_đơn_vị_xử_lý', '3072 CUDA cores'),
(27, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(27, 'tản_nhiệt', 'Dual Axial-tech fans'),
(27, 'đèn_led', 'Aura Sync RGB'),
(27, 'đầu_cấp_nguồn', '1 x 8-pin'),
(27, 'nguồn_đề_xuất', '550W'),
(27, 'kích_thước', '227 x 123 x 39 mm');

-- Thuộc tính cho GPU ID 28 (MSI RTX 3060 Ti)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(28, 'gpu', 'GeForce RTX 3060 Ti'),
(28, 'bộ_nhớ', '8GB GDDR6 (14 Gbps / 256-bit)'),
(28, 'series', 'Gaming X'),
(28, 'part_number', 'RTX 3060 Ti GAMING X 8G'),
(28, 'gpu_clock', 'Boost Clock: 1770 MHz'),
(28, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(28, 'số_lượng_đơn_vị_xử_lý', '4864 CUDA cores'),
(28, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(28, 'tản_nhiệt', 'TRI FROZR 2 thermal design'),
(28, 'đèn_led', 'Mystic Light RGB'),
(28, 'đầu_cấp_nguồn', '1 x 8-pin + 1 x 6-pin'),
(28, 'nguồn_đề_xuất', '650W'),
(28, 'kích_thước', '323 x 140 x 56 mm');

-- Thuộc tính cho GPU ID 29 (AMD Radeon RX 6700 XT)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(29, 'gpu', 'Radeon RX 6700 XT'),
(29, 'bộ_nhớ', '12GB GDDR6 (16 Gbps / 192-bit)'),
(29, 'series', 'Reference Design'),
(29, 'part_number', 'RX6700XT'),
(29, 'gpu_clock', 'Game Clock: 2424 MHz, Boost Clock: 2581 MHz'),
(29, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(29, 'số_lượng_đơn_vị_xử_lý', '2560 Stream Processors'),
(29, 'cổng_kết_nối', '1 x HDMI 2.1, 3 x DisplayPort 1.4'),
(29, 'tản_nhiệt', 'Dual fan design'),
(29, 'đèn_led', 'Radeon logo'),
(29, 'đầu_cấp_nguồn', '2 x 8-pin'),
(29, 'nguồn_đề_xuất', '650W'),
(29, 'kích_thước', '267 x 120 x 40 mm');

-- Thuộc tính cho GPU ID 30 (Zotac RTX 4070 Super)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(30, 'gpu', 'GeForce RTX 4070 Super'),
(30, 'bộ_nhớ', '12GB GDDR6X (21 Gbps / 192-bit)'),
(30, 'series', 'Trinity OC'),
(30, 'part_number', 'ZT-D40710D-10P'),
(30, 'gpu_clock', 'Boost Clock: 2535 MHz'),
(30, 'giao_tiếp_pci', 'PCI-E 4.0 x16'),
(30, 'số_lượng_đơn_vị_xử_lý', '7168 CUDA cores'),
(30, 'cổng_kết_nối', '3 x DisplayPort 1.4a, 1 x HDMI 2.1'),
(30, 'tản_nhiệt', 'IceStorm 2.0 cooling system'),
(30, 'đèn_led', 'Spectra RGB'),
(30, 'đầu_cấp_nguồn', '1 x 16-pin (12VHPWR)'),
(30, 'nguồn_đề_xuất', '750W'),
(30, 'kích_thước', '307 x 119 x 58 mm');

-- Thuộc tính cho Mainboard ID 31 (ASUS ROG Strix Z790-E)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(31, 'chipset', 'Intel Z790'),
(31, 'seriesmainboard', 'ROG Strix'),
(31, 'socket', 'LGA 1700'),
(31, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(31, 'khe_ram_tối_đa', '4'),
(31, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(31, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(31, 'bus_ram_hỗ_trợ', '7800(O.C)/7600/7400/7200/7000/6800/6600/6400'),
(31, 'lưu_trữ', '5 x M.2, 6 x SATA 6Gb/s'),
(31, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2242/2260/2280/22110 (PCIe 4.0 x4)'),
(31, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(31, 'khe_pci', '1 x PCIe 5.0 x16, 1 x PCIe 4.0 x16, 2 x PCIe 4.0 x1'),
(31, 'đèn_led', 'Aura Sync RGB'),
(31, 'số_cổng_usb', '1 x USB 3.2 Gen 2x2 Type-C, 2 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1, 2 x USB 2.0'),
(31, 'lan', 'Intel 2.5Gb Ethernet'),
(31, 'kết_nối_không_dây', 'Wi-Fi 6E (802.11ax), Bluetooth 5.3'),
(31, 'âm_thanh', 'ROG SupremeFX 7.1 Surround Sound');

-- Thuộc tính cho Mainboard ID 32 (MSI MAG B760M Mortar)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(32, 'chipset', 'Intel B760'),
(32, 'seriesmainboard', 'MAG Mortar'),
(32, 'socket', 'LGA 1700'),
(32, 'kích_thước', 'Micro-ATX (24.4 cm x 24.4 cm)'),
(32, 'khe_ram_tối_đa', '4'),
(32, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(32, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(32, 'bus_ram_hỗ_trợ', '7000(O.C)/6800/6600/6400/6200/6000/5800/5600'),
(32, 'lưu_trữ', '2 x M.2, 4 x SATA 6Gb/s'),
(32, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(32, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(32, 'khe_pci', '1 x PCIe 4.0 x16, 1 x PCIe 3.0 x1'),
(32, 'đèn_led', 'Mystic Light RGB'),
(32, 'số_cổng_usb', '1 x USB 3.2 Gen 2 Type-C, 2 x USB 3.2 Gen 1, 4 x USB 2.0'),
(32, 'lan', 'Realtek 2.5Gb Ethernet'),
(32, 'kết_nối_không_dây', 'Không có'),
(32, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 33 (Gigabyte B650 Aorus Elite)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(33, 'chipset', 'AMD B650'),
(33, 'seriesmainboard', 'Aorus Elite'),
(33, 'socket', 'AM5'),
(33, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(33, 'khe_ram_tối_đa', '4'),
(33, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(33, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(33, 'bus_ram_hỗ_trợ', '6600(O.C)/6400/6200/6000/5800/5600/5400/5200'),
(33, 'lưu_trữ', '3 x M.2, 4 x SATA 6Gb/s'),
(33, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(33, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(33, 'khe_pci', '1 x PCIe 4.0 x16, 1 x PCIe 3.0 x16, 1 x PCIe 3.0 x1'),
(33, 'đèn_led', 'RGB Fusion 2.0'),
(33, 'số_cổng_usb', '1 x USB 3.2 Gen 2 Type-C, 3 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1'),
(33, 'lan', 'Realtek 2.5Gb Ethernet'),
(33, 'kết_nối_không_dây', 'Không có'),
(33, 'âm_thanh', 'Realtek ALC1220-VB 7.1 Channel');

-- Thuộc tính cho Mainboard ID 34 (ASUS TUF Gaming B550-Plus)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(34, 'chipset', 'AMD B550'),
(34, 'seriesmainboard', 'TUF Gaming'),
(34, 'socket', 'AM4'),
(34, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(34, 'khe_ram_tối_đa', '4'),
(34, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(34, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(34, 'bus_ram_hỗ_trợ', '5100(O.C)/4800/4600/4400/4266/4133/4000/3866'),
(34, 'lưu_trữ', '2 x M.2, 6 x SATA 6Gb/s'),
(34, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(34, 'cổng_xuất_hình', '1 x HDMI 2.1'),
(34, 'khe_pci', '1 x PCIe 4.0 x16, 1 x PCIe 3.0 x16, 2 x PCIe 3.0 x1'),
(34, 'đèn_led', 'Aura Sync RGB'),
(34, 'số_cổng_usb', '1 x USB 3.2 Gen 2 Type-C, 1 x USB 3.2 Gen 2, 2 x USB 3.2 Gen 1, 2 x USB 2.0'),
(34, 'lan', 'Realtek 1Gb Ethernet'),
(34, 'kết_nối_không_dây', 'Không có'),
(34, 'âm_thanh', 'Realtek S1200A 7.1 Channel');

-- Thuộc tính cho Mainboard ID 35 (MSI PRO Z790-A)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(35, 'chipset', 'Intel Z790'),
(35, 'seriesmainboard', 'PRO'),
(35, 'socket', 'LGA 1700'),
(35, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(35, 'khe_ram_tối_đa', '4'),
(35, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(35, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(35, 'bus_ram_hỗ_trợ', '7200(O.C)/7000/6800/6600/6400/6200/6000/5800'),
(35, 'lưu_trữ', '4 x M.2, 6 x SATA 6Gb/s'),
(35, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(35, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(35, 'khe_pci', '1 x PCIe 5.0 x16, 2 x PCIe 3.0 x1'),
(35, 'đèn_led', 'Không có'),
(35, 'số_cổng_usb', '1 x USB 3.2 Gen 2 Type-C, 3 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1'),
(35, 'lan', 'Intel 2.5Gb Ethernet'),
(35, 'kết_nối_không_dây', 'Không có'),
(35, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 36 (ASRock B660M Pro RS)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(36, 'chipset', 'Intel B660'),
(36, 'seriesmainboard', 'Pro RS'),
(36, 'socket', 'LGA 1700'),
(36, 'kích_thước', 'Micro-ATX (24.4 cm x 24.4 cm)'),
(36, 'khe_ram_tối_đa', '4'),
(36, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(36, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(36, 'bus_ram_hỗ_trợ', '5000(O.C)/4800/4600/4400/4266/4133/4000/3866'),
(36, 'lưu_trữ', '2 x M.2, 4 x SATA 6Gb/s'),
(36, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(36, 'cổng_xuất_hình', '1 x HDMI 1.4, 1 x DisplayPort 1.4'),
(36, 'khe_pci', '1 x PCIe 4.0 x16, 1 x PCIe 3.0 x1'),
(36, 'đèn_led', 'Không có'),
(36, 'số_cổng_usb', '1 x USB 3.2 Gen 1 Type-C, 2 x USB 3.2 Gen 1, 2 x USB 2.0'),
(36, 'lan', 'Realtek 1Gb Ethernet'),
(36, 'kết_nối_không_dây', 'Không có'),
(36, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 37 (Gigabyte X670E Aorus Master)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(37, 'chipset', 'AMD X670E'),
(37, 'seriesmainboard', 'Aorus Master'),
(37, 'socket', 'AM5'),
(37, 'kích_thước', 'E-ATX (30.5 cm x 26.9 cm)'),
(37, 'khe_ram_tối_đa', '4'),
(37, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(37, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(37, 'bus_ram_hỗ_trợ', '6600(O.C)/6400/6200/6000/5800/5600/5400/5200'),
(37, 'lưu_trữ', '5 x M.2, 6 x SATA 6Gb/s'),
(37, 'kiểu_khe_m2_hỗ_trợ', 'M.2 22110 (PCIe 5.0 x4)'),
(37, 'cổng_xuất_hình', '1 x HDMI 2.1, 2 x DisplayPort 1.4'),
(37, 'khe_pci', '1 x PCIe 5.0 x16, 1 x PCIe 4.0 x16, 1 x PCIe 3.0 x1'),
(37, 'đèn_led', 'RGB Fusion 2.0'),
(37, 'số_cổng_usb', '2 x USB 3.2 Gen 2x2 Type-C, 10 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1'),
(37, 'lan', 'Marvell 10Gb Ethernet + Intel 2.5Gb Ethernet'),
(37, 'kết_nối_không_dây', 'Wi-Fi 6E (802.11ax), Bluetooth 5.3'),
(37, 'âm_thanh', 'Realtek ALC1220-VB + ESS SABRE 9218 DAC');

-- Thuộc tính cho Mainboard ID 38 (ASUS Prime H610M-K)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(38, 'chipset', 'Intel H610'),
(38, 'seriesmainboard', 'Prime'),
(38, 'socket', 'LGA 1700'),
(38, 'kích_thước', 'Micro-ATX (23.0 cm x 18.5 cm)'),
(38, 'khe_ram_tối_đa', '2'),
(38, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(38, 'hỗ_trợ_bộ_nhớ_tối_đa', '64GB'),
(38, 'bus_ram_hỗ_trợ', '3200/3000/2933/2800/2666/2400/2133'),
(38, 'lưu_trữ', '1 x M.2, 4 x SATA 6Gb/s'),
(38, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 3.0 x4)'),
(38, 'cổng_xuất_hình', '1 x HDMI 1.4, 1 x VGA'),
(38, 'khe_pci', '1 x PCIe 4.0 x16, 2 x PCIe 3.0 x1'),
(38, 'đèn_led', 'Không có'),
(38, 'số_cổng_usb', '2 x USB 3.2 Gen 1, 4 x USB 2.0'),
(38, 'lan', 'Realtek 1Gb Ethernet'),
(38, 'kết_nối_không_dây', 'Không có'),
(38, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 39 (MSI MPG B550 Gaming Plus)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(39, 'chipset', 'AMD B550'),
(39, 'seriesmainboard', 'MPG Gaming'),
(39, 'socket', 'AM4'),
(39, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(39, 'khe_ram_tối_đa', '4'),
(39, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(39, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(39, 'bus_ram_hỗ_trợ', '5100(O.C)/4800/4600/4400/4266/4133/4000/3866'),
(39, 'lưu_trữ', '2 x M.2, 6 x SATA 6Gb/s'),
(39, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(39, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(39, 'khe_pci', '1 x PCIe 4.0 x16, 2 x PCIe 3.0 x1'),
(39, 'đèn_led', 'Mystic Light RGB'),
(39, 'số_cổng_usb', '1 x USB 3.2 Gen 2 Type-C, 3 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1'),
(39, 'lan', 'Realtek 2.5Gb Ethernet'),
(39, 'kết_nối_không_dây', 'Không có'),
(39, 'âm_thanh', 'Realtek ALC1200 7.1 Channel');

-- Thuộc tính cho Mainboard ID 40 (ASRock A520M-HVS)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(40, 'chipset', 'AMD A520'),
(40, 'seriesmainboard', 'PRO'),
(40, 'socket', 'AM4'),
(40, 'kích_thước', 'Micro-ATX (23.4 cm x 20.3 cm)'),
(40, 'khe_ram_tối_đa', '2'),
(40, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(40, 'hỗ_trợ_bộ_nhớ_tối_đa', '64GB'),
(40, 'bus_ram_hỗ_trợ', '4733(O.C)/4600/4400/4266/4133/4000/3866/3600'),
(40, 'lưu_trữ', '1 x M.2, 4 x SATA 6Gb/s'),
(40, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 3.0 x4)'),
(40, 'cổng_xuất_hình', '1 x HDMI 1.4, 1 x VGA'),
(40, 'khe_pci', '1 x PCIe 3.0 x16, 1 x PCIe 3.0 x1'),
(40, 'đèn_led', 'Không có'),
(40, 'số_cổng_usb', '4 x USB 3.2 Gen 1, 4 x USB 2.0'),
(40, 'lan', 'Realtek 1Gb Ethernet'),
(40, 'kết_nối_không_dây', 'Không có'),
(40, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 41 (Gigabyte Z690 UD)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(41, 'chipset', 'Intel Z690'),
(41, 'seriesmainboard', 'UD'),
(41, 'socket', 'LGA 1700'),
(41, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(41, 'khe_ram_tối_đa', '4'),
(41, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(41, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(41, 'bus_ram_hỗ_trợ', '5333(O.C)/5133/5000/4800/4600/4400/4266'),
(41, 'lưu_trữ', '3 x M.2, 6 x SATA 6Gb/s'),
(41, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(41, 'cổng_xuất_hình', '1 x HDMI 2.0, 1 x DisplayPort 1.2'),
(41, 'khe_pci', '1 x PCIe 5.0 x16, 1 x PCIe 3.0 x16, 2 x PCIe 3.0 x1'),
(41, 'đèn_led', 'Không có'),
(41, 'số_cổng_usb', '1 x USB 3.2 Gen 2 Type-C, 2 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1'),
(41, 'lan', 'Realtek 2.5Gb Ethernet'),
(41, 'kết_nối_không_dây', 'Không có'),
(41, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 42 (ASUS ROG Crosshair X670E Hero)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(42, 'chipset', 'AMD X670E'),
(42, 'seriesmainboard', 'ROG Crosshair'),
(42, 'socket', 'AM5'),
(42, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(42, 'khe_ram_tối_đa', '4'),
(42, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(42, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(42, 'bus_ram_hỗ_trợ', '6600(O.C)/6400/6200/6000/5800/5600/5400/5200'),
(42, 'lưu_trữ', '5 x M.2, 6 x SATA 6Gb/s'),
(42, 'kiểu_khe_m2_hỗ_trợ', 'M.2 22110 (PCIe 5.0 x4)'),
(42, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(42, 'khe_pci', '2 x PCIe 5.0 x16, 1 x PCIe 4.0 x1'),
(42, 'đèn_led', 'Aura Sync RGB'),
(42, 'số_cổng_usb', '2 x USB 3.2 Gen 2x2 Type-C, 12 x USB 3.2 Gen 2, 4 x USB 2.0'),
(42, 'lan', 'Marvell 10Gb Ethernet'),
(42, 'kết_nối_không_dây', 'Wi-Fi 6E (802.11ax), Bluetooth 5.3'),
(42, 'âm_thanh', 'ROG SupremeFX 7.1 + ESS ES9218 QUAD DAC');

-- Thuộc tính cho Mainboard ID 43 (MSI MAG B550M Bazooka)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(43, 'chipset', 'AMD B550'),
(43, 'seriesmainboard', 'MAG Bazooka'),
(43, 'socket', 'AM4'),
(43, 'kích_thước', 'Micro-ATX (24.4 cm x 24.4 cm)'),
(43, 'khe_ram_tối_đa', '4'),
(43, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(43, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(43, 'bus_ram_hỗ_trợ', '5100(O.C)/4800/4600/4400/4266/4133/4000/3866'),
(43, 'lưu_trữ', '1 x M.2, 4 x SATA 6Gb/s'),
(43, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 4.0 x4)'),
(43, 'cổng_xuất_hình', '1 x HDMI 2.1, 1 x DisplayPort 1.4'),
(43, 'khe_pci', '1 x PCIe 4.0 x16, 1 x PCIe 3.0 x1'),
(43, 'đèn_led', 'Không có'),
(43, 'số_cổng_usb', '2 x USB 3.2 Gen 1, 4 x USB 2.0'),
(43, 'lan', 'Realtek 1Gb Ethernet'),
(43, 'kết_nối_không_dây', 'Không có'),
(43, 'âm_thanh', 'Realtek ALC897 7.1 Channel');

-- Thuộc tính cho Mainboard ID 44 (Biostar B450MH)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(44, 'chipset', 'AMD B450'),
(44, 'seriesmainboard', 'Racing'),
(44, 'socket', 'AM4'),
(44, 'kích_thước', 'Micro-ATX (24.4 cm x 21.0 cm)'),
(44, 'khe_ram_tối_đa', '2'),
(44, 'kiểu_ram_hỗ_trợ', 'DDR4'),
(44, 'hỗ_trợ_bộ_nhớ_tối_đa', '32GB'),
(44, 'bus_ram_hỗ_trợ', '3466/3200/3000/2933/2800/2666/2400/2133'),
(44, 'lưu_trữ', '1 x M.2, 4 x SATA 6Gb/s'),
(44, 'kiểu_khe_m2_hỗ_trợ', 'M.2 2280 (PCIe 3.0 x4)'),
(44, 'cổng_xuất_hình', '1 x HDMI 1.4, 1 x VGA'),
(44, 'khe_pci', '1 x PCIe 3.0 x16, 1 x PCIe 2.0 x1'),
(44, 'đèn_led', 'Không có'),
(44, 'số_cổng_usb', '4 x USB 3.1 Gen 1, 4 x USB 2.0'),
(44, 'lan', 'Realtek 1Gb Ethernet'),
(44, 'kết_nối_không_dây', 'Không có'),
(44, 'âm_thanh', 'Realtek ALC662 5.1 Channel');

-- Thuộc tính cho Mainboard ID 45 (ASUS ProArt Z790-Creator)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(45, 'chipset', 'Intel Z790'),
(45, 'seriesmainboard', 'ProArt'),
(45, 'socket', 'LGA 1700'),
(45, 'kích_thước', 'ATX (30.5 cm x 24.4 cm)'),
(45, 'khe_ram_tối_đa', '4'),
(45, 'kiểu_ram_hỗ_trợ', 'DDR5'),
(45, 'hỗ_trợ_bộ_nhớ_tối_đa', '128GB'),
(45, 'bus_ram_hỗ_trợ', '7800(O.C)/7600/7400/7200/7000/6800/6600/6400'),
(45, 'lưu_trữ', '4 x M.2, 6 x SATA 6Gb/s'),
(45, 'kiểu_khe_m2_hỗ_trợ', 'M.2 22110 (PCIe 4.0 x4)'),
(45, 'cổng_xuất_hình', '2 x Thunderbolt 4 Type-C, 1 x HDMI 2.1'),
(45, 'khe_pci', '1 x PCIe 5.0 x16, 1 x PCIe 4.0 x16, 2 x PCIe 4.0 x1'),
(45, 'đèn_led', 'Aura Sync RGB'),
(45, 'số_cổng_usb', '2 x Thunderbolt 4 Type-C, 8 x USB 3.2 Gen 2, 4 x USB 3.2 Gen 1'),
(45, 'lan', 'Intel 2.5Gb Ethernet + Marvell 10Gb Ethernet'),
(45, 'kết_nối_không_dây', 'Wi-Fi 6E (802.11ax), Bluetooth 5.3'),
(45, 'âm_thanh', 'Realtek ALC1220 7.1 Channel');

-- Thuộc tính cho RAM ID 46 (Kingston Fury Beast DDR5 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(46, 'part_number', 'KF560C40BBK2-32'),
(46, 'màu_sắc', 'Đen'),
(46, 'đèn_led', 'RGB'),
(46, 'dung_lượng', '2 x 16GB'),
(46, 'thế_hệ', 'DDR5'),
(46, 'bus', '6000MHz'),
(46, 'timing', 'CL40-40-40'),
(46, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 47 (Corsair Vengeance RGB Pro DDR4 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(47, 'part_number', 'CMW32GX4M2D3600C18'),
(47, 'màu_sắc', 'Đen'),
(47, 'đèn_led', 'RGB'),
(47, 'dung_lượng', '2 x 16GB'),
(47, 'thế_hệ', 'DDR4'),
(47, 'bus', '3600MHz'),
(47, 'timing', 'CL18-22-22-42'),
(47, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 48 (G.Skill Trident Z5 RGB DDR5 64GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(48, 'part_number', 'F5-6400J3239G32GX2-TZ5RK'),
(48, 'màu_sắc', 'Đen/Đỏ'),
(48, 'đèn_led', 'RGB'),
(48, 'dung_lượng', '2 x 32GB'),
(48, 'thế_hệ', 'DDR5'),
(48, 'bus', '6400MHz'),
(48, 'timing', 'CL32-39-39-102'),
(48, 'voltage', '1.4V');

-- Thuộc tính cho RAM ID 49 (Samsung DDR5 16GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(49, 'part_number', 'M425R2GA3BB0-CQKOD'),
(49, 'màu_sắc', 'Xanh lá'),
(49, 'đèn_led', 'Không có'),
(49, 'dung_lượng', '1 x 16GB'),
(49, 'thế_hệ', 'DDR5'),
(49, 'bus', '4800MHz'),
(49, 'timing', 'CL40-40-40'),
(49, 'voltage', '1.1V');

-- Thuộc tính cho RAM ID 50 (Kingston Fury Renegade DDR4 16GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(50, 'part_number', 'KF432C16RB1/16'),
(50, 'màu_sắc', 'Đen'),
(50, 'đèn_led', 'RGB'),
(50, 'dung_lượng', '1 x 16GB'),
(50, 'thế_hệ', 'DDR4'),
(50, 'bus', '3200MHz'),
(50, 'timing', 'CL16-20-20'),
(50, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 51 (Corsair Dominator Platinum RGB DDR5 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(51, 'part_number', 'CMT32GX5M2X6200C36'),
(51, 'màu_sắc', 'Đen'),
(51, 'đèn_led', 'RGB'),
(51, 'dung_lượng', '2 x 16GB'),
(51, 'thế_hệ', 'DDR5'),
(51, 'bus', '6200MHz'),
(51, 'timing', 'CL36-39-39-76'),
(51, 'voltage', '1.4V');

-- Thuộc tính cho RAM ID 52 (ADATA XPG Spectrix D50 DDR4 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(52, 'part_number', 'AX4U360016G18I-DT50'),
(52, 'màu_sắc', 'Trắng'),
(52, 'đèn_led', 'RGB'),
(52, 'dung_lượng', '2 x 16GB'),
(52, 'thế_hệ', 'DDR4'),
(52, 'bus', '3600MHz'),
(52, 'timing', 'CL18-22-22'),
(52, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 53 (TeamGroup T-Force Delta RGB DDR5 16GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(53, 'part_number', 'FF6D516G6000HC38DDC01'),
(53, 'màu_sắc', 'Trắng'),
(53, 'đèn_led', 'RGB'),
(53, 'dung_lượng', '2 x 8GB'),
(53, 'thế_hệ', 'DDR5'),
(53, 'bus', '6000MHz'),
(53, 'timing', 'CL38-38-38-78'),
(53, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 54 (Kingston ValueRAM DDR4 8GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(54, 'part_number', 'KVR26N19S8/8'),
(54, 'màu_sắc', 'Xanh lá'),
(54, 'đèn_led', 'Không có'),
(54, 'dung_lượng', '1 x 8GB'),
(54, 'thế_hệ', 'DDR4'),
(54, 'bus', '2666MHz'),
(54, 'timing', 'CL19-19-19'),
(54, 'voltage', '1.2V');

-- Thuộc tính cho RAM ID 55 (G.Skill Ripjaws V DDR4 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(55, 'part_number', 'F4-4000C18D-32GVK'),
(55, 'màu_sắc', 'Đen'),
(55, 'đèn_led', 'Không có'),
(55, 'dung_lượng', '2 x 16GB'),
(55, 'thế_hệ', 'DDR4'),
(55, 'bus', '4000MHz'),
(55, 'timing', 'CL18-22-22-42'),
(55, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 56 (Samsung DDR4 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(56, 'part_number', 'M378A4G43AB2-CWE'),
(56, 'màu_sắc', 'Đen'),
(56, 'đèn_led', 'Không có'),
(56, 'dung_lượng', '2 x 16GB'),
(56, 'thế_hệ', 'DDR4'),
(56, 'bus', '3200MHz'),
(56, 'timing', 'CL22-22-22'),
(56, 'voltage', '1.2V');

-- Thuộc tính cho RAM ID 57 (Crucial Ballistix DDR4 16GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(57, 'part_number', 'BL2K8G36C16U4B'),
(57, 'màu_sắc', 'Đen'),
(57, 'đèn_led', 'RGB'),
(57, 'dung_lượng', '2 x 8GB'),
(57, 'thế_hệ', 'DDR4'),
(57, 'bus', '3600MHz'),
(57, 'timing', 'CL16-18-18-38'),
(57, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 58 (Kingston Fury Beast RGB DDR5 48GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(58, 'part_number', 'KF556C40BBAK2-48'),
(58, 'màu_sắc', 'Đen'),
(58, 'đèn_led', 'RGB'),
(58, 'dung_lượng', '2 x 24GB'),
(58, 'thế_hệ', 'DDR5'),
(58, 'bus', '5600MHz'),
(58, 'timing', 'CL40-40-40'),
(58, 'voltage', '1.25V');

-- Thuộc tính cho RAM ID 59 (Corsair Vengeance LPX DDR4 64GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(59, 'part_number', 'CMK64GX4M2E3200C16'),
(59, 'màu_sắc', 'Đen'),
(59, 'đèn_led', 'Không có'),
(59, 'dung_lượng', '2 x 32GB'),
(59, 'thế_hệ', 'DDR4'),
(59, 'bus', '3200MHz'),
(59, 'timing', 'CL16-20-20-38'),
(59, 'voltage', '1.35V');

-- Thuộc tính cho RAM ID 60 (ADATA Premier DDR5 32GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(60, 'part_number', 'AD5U480032G-S'),
(60, 'màu_sắc', 'Xanh lá'),
(60, 'đèn_led', 'Không có'),
(60, 'dung_lượng', '1 x 32GB'),
(60, 'thế_hệ', 'DDR5'),
(60, 'bus', '4800MHz'),
(60, 'timing', 'CL40-40-40'),
(60, 'voltage', '1.1V');

-- Thuộc tính cho SSD ID 61 (Samsung 980 Pro 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(61, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(61, 'màu_sắc_của_ổ_cứng', 'Đen'),
(61, 'dung_lượng', '1TB'),
(61, 'kết_nối', 'PCIe 4.0 x4'),
(61, 'bộ_nhớ_nand', '3D TLC NAND'),
(61, 'kích_thước', 'M.2 2280'),
(61, 'tốc_độ_đọc', '7000 MB/s'),
(61, 'tốc_độ_ghi', '5000 MB/s');

-- Thuộc tính cho SSD ID 62 (Western Digital Blue SN570 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(62, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(62, 'màu_sắc_của_ổ_cứng', 'Xanh dương'),
(62, 'dung_lượng', '1TB'),
(62, 'kết_nối', 'PCIe 3.0 x4'),
(62, 'bộ_nhớ_nand', '3D NAND'),
(62, 'kích_thước', 'M.2 2280'),
(62, 'tốc_độ_đọc', '3500 MB/s'),
(62, 'tốc_độ_ghi', '3000 MB/s');

-- Thuộc tính cho SSD ID 63 (Kingston NV2 2TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(63, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(63, 'màu_sắc_của_ổ_cứng', 'Đen'),
(63, 'dung_lượng', '2TB'),
(63, 'kết_nối', 'PCIe 4.0 x4'),
(63, 'bộ_nhớ_nand', 'QLC NAND'),
(63, 'kích_thước', 'M.2 2280'),
(63, 'tốc_độ_đọc', '3500 MB/s'),
(63, 'tốc_độ_ghi', '2800 MB/s');

-- Thuộc tính cho SSD ID 64 (Crucial P3 Plus 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(64, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(64, 'màu_sắc_của_ổ_cứng', 'Đen'),
(64, 'dung_lượng', '1TB'),
(64, 'kết_nối', 'PCIe 4.0 x4'),
(64, 'bộ_nhớ_nand', 'QLC NAND'),
(64, 'kích_thước', 'M.2 2280'),
(64, 'tốc_độ_đọc', '5000 MB/s'),
(64, 'tốc_độ_ghi', '3600 MB/s');

-- Thuộc tính cho SSD ID 65 (Samsung 870 EVO 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(65, 'kiểu_ổ_cứng', 'SSD SATA III'),
(65, 'màu_sắc_của_ổ_cứng', 'Đen'),
(65, 'dung_lượng', '1TB'),
(65, 'kết_nối', 'SATA 6Gb/s'),
(65, 'bộ_nhớ_nand', '3D TLC NAND'),
(65, 'kích_thước', '2.5 inch'),
(65, 'tốc_độ_đọc', '560 MB/s'),
(65, 'tốc_độ_ghi', '530 MB/s');

-- Thuộc tính cho SSD ID 66 (Kioxia Exceria G2 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(66, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(66, 'màu_sắc_của_ổ_cứng', 'Đen'),
(66, 'dung_lượng', '1TB'),
(66, 'kết_nối', 'PCIe 3.0 x4'),
(66, 'bộ_nhớ_nand', 'BiCS FLASH™ 3D TLC'),
(66, 'kích_thước', 'M.2 2280'),
(66, 'tốc_độ_đọc', '2100 MB/s'),
(66, 'tốc_độ_ghi', '1700 MB/s');

-- Thuộc tính cho SSD ID 67 (WD Black SN850X 2TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(67, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(67, 'màu_sắc_của_ổ_cứng', 'Đen'),
(67, 'dung_lượng', '2TB'),
(67, 'kết_nối', 'PCIe 4.0 x4'),
(67, 'bộ_nhớ_nand', '3D TLC NAND'),
(67, 'kích_thước', 'M.2 2280'),
(67, 'tốc_độ_đọc', '7300 MB/s'),
(67, 'tốc_độ_ghi', '6600 MB/s');

-- Thuộc tính cho SSD ID 68 (Kingston A400 480GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(68, 'kiểu_ổ_cứng', 'SSD SATA III'),
(68, 'màu_sắc_của_ổ_cứng', 'Xám'),
(68, 'dung_lượng', '480GB'),
(68, 'kết_nối', 'SATA 6Gb/s'),
(68, 'bộ_nhớ_nand', '3D TLC NAND'),
(68, 'kích_thước', '2.5 inch'),
(68, 'tốc_độ_đọc', '500 MB/s'),
(68, 'tốc_độ_ghi', '450 MB/s');

-- Thuộc tính cho SSD ID 69 (Samsung 970 EVO Plus 500GB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(69, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(69, 'màu_sắc_của_ổ_cứng', 'Đen'),
(69, 'dung_lượng', '500GB'),
(69, 'kết_nối', 'PCIe 3.0 x4'),
(69, 'bộ_nhớ_nand', '3D TLC NAND'),
(69, 'kích_thước', 'M.2 2280'),
(69, 'tốc_độ_đọc', '3500 MB/s'),
(69, 'tốc_độ_ghi', '3200 MB/s');

-- Thuộc tính cho SSD ID 70 (Crucial MX500 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(70, 'kiểu_ổ_cứng', 'SSD SATA III'),
(70, 'màu_sắc_của_ổ_cứng', 'Xám'),
(70, 'dung_lượng', '1TB'),
(70, 'kết_nối', 'SATA 6Gb/s'),
(70, 'bộ_nhớ_nand', '3D TLC NAND'),
(70, 'kích_thước', '2.5 inch'),
(70, 'tốc_độ_đọc', '560 MB/s'),
(70, 'tốc_độ_ghi', '510 MB/s');

-- Thuộc tính cho SSD ID 71 (Kioxia Exceria Pro 2TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(71, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(71, 'màu_sắc_của_ổ_cứng', 'Đen'),
(71, 'dung_lượng', '2TB'),
(71, 'kết_nối', 'PCIe 4.0 x4'),
(71, 'bộ_nhớ_nand', 'BiCS FLASH™ 3D TLC'),
(71, 'kích_thước', 'M.2 2280'),
(71, 'tốc_độ_đọc', '7400 MB/s'),
(71, 'tốc_độ_ghi', '6400 MB/s');

-- Thuộc tính cho HDD ID 72 (WD Blue 4TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(72, 'kiểu_ổ_cứng', 'HDD'),
(72, 'màu_sắc_của_ổ_cứng', 'Xanh dương'),
(72, 'dung_lượng', '4TB'),
(72, 'kết_nối', 'SATA 6Gb/s'),
(72, 'bộ_nhớ_nand', 'CMR'),
(72, 'kích_thước', '3.5 inch'),
(72, 'tốc_độ_đọc', '180 MB/s'),
(72, 'tốc_độ_ghi', '180 MB/s');

-- Thuộc tính cho HDD ID 73 (Seagate Barracuda 2TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(73, 'kiểu_ổ_cứng', 'HDD'),
(73, 'màu_sắc_của_ổ_cứng', 'Bạc'),
(73, 'dung_lượng', '2TB'),
(73, 'kết_nối', 'SATA 6Gb/s'),
(73, 'bộ_nhớ_nand', 'SMR'),
(73, 'kích_thước', '3.5 inch'),
(73, 'tốc_độ_đọc', '220 MB/s'),
(73, 'tốc_độ_ghi', '220 MB/s');

-- Thuộc tính cho SSD ID 74 (Kingston KC3000 1TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(74, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(74, 'màu_sắc_của_ổ_cứng', 'Đen'),
(74, 'dung_lượng', '1TB'),
(74, 'kết_nối', 'PCIe 4.0 x4'),
(74, 'bộ_nhớ_nand', '3D TLC NAND'),
(74, 'kích_thước', 'M.2 2280'),
(74, 'tốc_độ_đọc', '7000 MB/s'),
(74, 'tốc_độ_ghi', '6000 MB/s');

-- Thuộc tính cho SSD ID 75 (Samsung 990 Pro 2TB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(75, 'kiểu_ổ_cứng', 'SSD NVMe M.2'),
(75, 'màu_sắc_của_ổ_cứng', 'Đen'),
(75, 'dung_lượng', '2TB'),
(75, 'kết_nối', 'PCIe 4.0 x4'),
(75, 'bộ_nhớ_nand', '3D TLC NAND'),
(75, 'kích_thước', 'M.2 2280'),
(75, 'tốc_độ_đọc', '7450 MB/s'),
(75, 'tốc_độ_ghi', '6900 MB/s');

-- Thuộc tính cho Case ID 76 (Corsair 4000D Airflow)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(76, 'chất_liệu', 'Thép, Nhựa ABS'),
(76, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(76, 'màu_sắc', 'Đen'),
(76, 'kích_thước', '453 x 230 x 466 mm'),
(76, 'loại_case', 'Mid Tower'),
(76, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(76, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 2 x 2.5"'),
(76, 'cổng_kết_nối', '1 x USB 3.2 Type-C, 1 x USB 3.0, 1 x 3.5mm Audio'),
(76, 'kích_thước_radiator_tối_đa', '360 mm'),
(76, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 2 x 140 mm'),
(76, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(76, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(76, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 77 (NZXT H5 Flow)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(77, 'chất_liệu', 'Thép, Nhựa ABS'),
(77, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(77, 'màu_sắc', 'Đen'),
(77, 'kích_thước', '446 x 227 x 446 mm'),
(77, 'loại_case', 'Mid Tower'),
(77, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(77, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 3 x 2.5"'),
(77, 'cổng_kết_nối', '2 x USB 3.2 Gen 1, 1 x 3.5mm Audio'),
(77, 'kích_thước_radiator_tối_đa', '280 mm'),
(77, 'loại_quạt_hỗ_trợ_phía_trên', '2 x 120 mm, 2 x 140 mm'),
(77, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(77, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(77, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 78 (Lian Li O11 Dynamic EVO)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(78, 'chất_liệu', 'Nhôm, Thép, Kính'),
(78, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(78, 'màu_sắc', 'Đen'),
(78, 'kích_thước', '465 x 285 x 459 mm'),
(78, 'loại_case', 'Dual Chamber Mid Tower'),
(78, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX'),
(78, 'số_lượng_ổ_đĩa_hỗ_trợ', '3 x 3.5", 4 x 2.5"'),
(78, 'cổng_kết_nối', '2 x USB 3.0, 1 x USB 3.2 Type-C, 1 x 3.5mm Audio'),
(78, 'kích_thước_radiator_tối_đa', '420 mm'),
(78, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 2 x 140 mm'),
(78, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(78, 'loại_quạt_hỗ_trợ_bên_dưới', '3 x 120 mm, 2 x 140 mm'),
(78, 'số_slot_pci', '8');

-- Thuộc tính cho Case ID 79 (Fractal Design Meshify 2)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(79, 'chất_liệu', 'Thép, Nhựa ABS'),
(79, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(79, 'màu_sắc', 'Đen'),
(79, 'kích_thước', '478 x 240 x 529 mm'),
(79, 'loại_case', 'Mid Tower'),
(79, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX'),
(79, 'số_lượng_ổ_đĩa_hỗ_trợ', '3 x 3.5", 4 x 2.5"'),
(79, 'cổng_kết_nối', '2 x USB 3.0, 1 x USB 3.2 Type-C, 1 x 3.5mm Audio'),
(79, 'kích_thước_radiator_tối_đa', '420 mm'),
(79, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 3 x 140 mm'),
(79, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm, 1 x 140 mm'),
(79, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(79, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 80 (Cooler Master MasterBox TD500)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(80, 'chất_liệu', 'Thép, Nhựa ABS'),
(80, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(80, 'màu_sắc', 'Đen'),
(80, 'kích_thước', '468 x 220 x 468 mm'),
(80, 'loại_case', 'Mid Tower'),
(80, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(80, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 3 x 2.5"'),
(80, 'cổng_kết_nối', '2 x USB 3.2 Gen 1, 2 x 3.5mm Audio'),
(80, 'kích_thước_radiator_tối_đa', '360 mm'),
(80, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 2 x 140 mm'),
(80, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(80, 'loại_quạt_hỗ_trợ_bên_dưới', '2 x 120 mm'),
(80, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 81 (Phanteks Eclipse P400A)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(81, 'chất_liệu', 'Thép, Nhựa ABS'),
(81, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(81, 'màu_sắc', 'Đen'),
(81, 'kích_thước', '470 x 210 x 465 mm'),
(81, 'loại_case', 'Mid Tower'),
(81, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(81, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 2 x 2.5"'),
(81, 'cổng_kết_nối', '2 x USB 3.0, 1 x 3.5mm Audio'),
(81, 'kích_thước_radiator_tối_đa', '360 mm'),
(81, 'loại_quạt_hỗ_trợ_phía_trên', '2 x 120 mm, 2 x 140 mm'),
(81, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(81, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(81, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 82 (ASUS TUF Gaming GT301)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(82, 'chất_liệu', 'Thép, Nhựa ABS'),
(82, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(82, 'màu_sắc', 'Đen'),
(82, 'kích_thước', '445 x 220 x 468 mm'),
(82, 'loại_case', 'Mid Tower'),
(82, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(82, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 3 x 2.5"'),
(82, 'cổng_kết_nối', '2 x USB 3.2 Gen 1, 2 x 3.5mm Audio'),
(82, 'kích_thước_radiator_tối_đa', '360 mm'),
(82, 'loại_quạt_hỗ_trợ_phía_trên', '2 x 120 mm, 2 x 140 mm'),
(82, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(82, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(82, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 83 (MSI MAG Forge 100R)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(83, 'chất_liệu', 'Thép, Nhựa ABS'),
(83, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(83, 'màu_sắc', 'Đen'),
(83, 'kích_thước', '430 x 210 x 465 mm'),
(83, 'loại_case', 'Mid Tower'),
(83, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(83, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 3 x 2.5"'),
(83, 'cổng_kết_nối', '2 x USB 3.2 Gen 1, 1 x 3.5mm Audio'),
(83, 'kích_thước_radiator_tối_đa', '240 mm'),
(83, 'loại_quạt_hỗ_trợ_phía_trên', '2 x 120 mm'),
(83, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(83, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(83, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 84 (Deepcool CH560 Digital)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(84, 'chất_liệu', 'Thép, Nhựa ABS'),
(84, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(84, 'màu_sắc', 'Đen'),
(84, 'kích_thước', '458 x 230 x 468 mm'),
(84, 'loại_case', 'Mid Tower'),
(84, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(84, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 4 x 2.5"'),
(84, 'cổng_kết_nối', '2 x USB 3.0, 1 x USB 3.2 Type-C, 1 x 3.5mm Audio'),
(84, 'kích_thước_radiator_tối_đa', '360 mm'),
(84, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 2 x 140 mm'),
(84, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(84, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(84, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 85 (Corsair iCUE 5000D RGB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(85, 'chất_liệu', 'Thép, Nhựa ABS'),
(85, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(85, 'màu_sắc', 'Đen'),
(85, 'kích_thước', '520 x 245 x 520 mm'),
(85, 'loại_case', 'Mid Tower'),
(85, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX'),
(85, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 4 x 2.5"'),
(85, 'cổng_kết_nối', '1 x USB 3.2 Type-C, 2 x USB 3.0, 1 x 3.5mm Audio'),
(85, 'kích_thước_radiator_tối_đa', '360 mm'),
(85, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 3 x 140 mm'),
(85, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm, 1 x 140 mm'),
(85, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(85, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 86 (NZXT H7 Flow)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(86, 'chất_liệu', 'Thép, Nhựa ABS'),
(86, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(86, 'màu_sắc', 'Đen'),
(86, 'kích_thước', '480 x 230 x 505 mm'),
(86, 'loại_case', 'Mid Tower'),
(86, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX'),
(86, 'số_lượng_ổ_đĩa_hỗ_trợ', '3 x 3.5", 4 x 2.5"'),
(86, 'cổng_kết_nối', '1 x USB 3.2 Type-C, 2 x USB 3.2 Gen 1, 1 x 3.5mm Audio'),
(86, 'kích_thước_radiator_tối_đa', '360 mm'),
(86, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 3 x 140 mm'),
(86, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm, 1 x 140 mm'),
(86, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(86, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 87 (Lian Li Lancool 216)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(87, 'chất_liệu', 'Thép, Nhựa ABS'),
(87, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(87, 'màu_sắc', 'Đen'),
(87, 'kích_thước', '480 x 235 x 491 mm'),
(87, 'loại_case', 'Mid Tower'),
(87, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX'),
(87, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 3 x 2.5"'),
(87, 'cổng_kết_nối', '2 x USB 3.0, 1 x USB 3.2 Type-C, 1 x 3.5mm Audio'),
(87, 'kích_thước_radiator_tối_đa', '360 mm'),
(87, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 2 x 140 mm'),
(87, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm, 1 x 140 mm'),
(87, 'loại_quạt_hỗ_trợ_bên_dưới', '2 x 120 mm, 2 x 140 mm'),
(87, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 88 (Fractal Design Pop Air RGB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(88, 'chất_liệu', 'Thép, Nhựa ABS'),
(88, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(88, 'màu_sắc', 'Đen'),
(88, 'kích_thước', '473 x 215 x 454 mm'),
(88, 'loại_case', 'Mid Tower'),
(88, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX'),
(88, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 2 x 2.5"'),
(88, 'cổng_kết_nối', '2 x USB 3.0, 1 x USB 3.2 Type-C, 1 x 3.5mm Audio'),
(88, 'kích_thước_radiator_tối_đa', '360 mm'),
(88, 'loại_quạt_hỗ_trợ_phía_trên', '2 x 120 mm, 2 x 140 mm'),
(88, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm'),
(88, 'loại_quạt_hỗ_trợ_bên_dưới', 'Không hỗ trợ'),
(88, 'số_slot_pci', '7');

-- Thuộc tính cho Case ID 89 (Cooler Master HAF 700 EVO)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(89, 'chất_liệu', 'Thép, Nhựa ABS, Nhôm'),
(89, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(89, 'màu_sắc', 'Đen'),
(89, 'kích_thước', '615 x 285 x 667 mm'),
(89, 'loại_case', 'Full Tower'),
(89, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX, SSI-EEB'),
(89, 'số_lượng_ổ_đĩa_hỗ_trợ', '6 x 3.5", 8 x 2.5"'),
(89, 'cổng_kết_nối', '2 x USB 3.2 Type-C, 4 x USB 3.0, 1 x 3.5mm Audio'),
(89, 'kích_thước_radiator_tối_đa', '480 mm'),
(89, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 3 x 140 mm, 2 x 200 mm'),
(89, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm, 1 x 140 mm'),
(89, 'loại_quạt_hỗ_trợ_bên_dưới', '2 x 120 mm, 2 x 140 mm'),
(89, 'số_slot_pci', '10');

-- Thuộc tính cho Case ID 90 (Phanteks NV7)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(90, 'chất_liệu', 'Nhôm, Thép, Kính'),
(90, 'chất_liệu_nắp_hông', 'Kính cường lực'),
(90, 'màu_sắc', 'Đen'),
(90, 'kích_thước', '520 x 245 x 575 mm'),
(90, 'loại_case', 'Full Tower'),
(90, 'hỗ_trợ_mainboard', 'Mini-ITX, Micro-ATX, ATX, E-ATX'),
(90, 'số_lượng_ổ_đĩa_hỗ_trợ', '2 x 3.5", 6 x 2.5"'),
(90, 'cổng_kết_nối', '2 x USB 3.2 Type-C, 2 x USB 3.0, 1 x 3.5mm Audio'),
(90, 'kích_thước_radiator_tối_đa', '420 mm'),
(90, 'loại_quạt_hỗ_trợ_phía_trên', '3 x 120 mm, 3 x 140 mm'),
(90, 'loại_quạt_hỗ_trợ_phía_sau', '1 x 120 mm, 1 x 140 mm'),
(90, 'loại_quạt_hỗ_trợ_bên_dưới', '3 x 120 mm, 2 x 140 mm'),
(90, 'số_slot_pci', '8');

-- Thuộc tính cho Tản nhiệt ID 91 (Corsair iCUE H150i Elite Capellix)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(91, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(91, 'kích_thước_quạt_mm', '3 x 120 mm'),
(91, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2066; AMD AM5, AM4'),
(91, 'đèn_led', 'RGB Capellix'),
(91, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(91, 'màu_sắc', 'Đen'),
(91, 'kích_thước_radiator_cm', '397 x 120 x 27 mm'),
(91, 'số_vòng_quay_của_bơm_rpm', '2400 ±10%'),
(91, 'số_vòng_quay_của_quạt_rpm', '400 - 2400'),
(91, 'lưu_lượng_không_khí_cfm', '75 CFM'),
(91, 'độ_ồn_dba', '10 - 36 dB(A)'),
(91, 'khối_lượng_kg', '1.5 kg');

-- Thuộc tính cho Tản nhiệt ID 92 (NZXT Kraken 360 RGB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(92, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(92, 'kích_thước_quạt_mm', '3 x 120 mm'),
(92, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011, 2066; AMD AM5, AM4'),
(92, 'đèn_led', 'RGB Infinity Mirror'),
(92, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(92, 'màu_sắc', 'Đen'),
(92, 'kích_thước_radiator_cm', '394 x 120 x 27 mm'),
(92, 'số_vòng_quay_của_bơm_rpm', '800 - 2800'),
(92, 'số_vòng_quay_của_quạt_rpm', '500 - 2000'),
(92, 'lưu_lượng_không_khí_cfm', '73.11 CFM'),
(92, 'độ_ồn_dba', '21 - 36 dB(A)'),
(92, 'khối_lượng_kg', '1.4 kg');

-- Thuộc tính cho Tản nhiệt ID 93 (Cooler Master Hyper 212)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(93, 'dạng_tản_nhiệt', 'Tản nhiệt khí'),
(93, 'kích_thước_quạt_mm', '1 x 120 mm'),
(93, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x; AMD AM5, AM4'),
(93, 'đèn_led', 'Không có'),
(93, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(93, 'màu_sắc', 'Đen'),
(93, 'kích_thước_radiator_cm', 'Không có'),
(93, 'số_vòng_quay_của_bơm_rpm', 'Không có'),
(93, 'số_vòng_quay_của_quạt_rpm', '650 - 2000'),
(93, 'lưu_lượng_không_khí_cfm', '62 CFM'),
(93, 'độ_ồn_dba', '8 - 30 dB(A)'),
(93, 'khối_lượng_kg', '0.6 kg');

-- Thuộc tính cho Tản nhiệt ID 94 (Deepcool AK620)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(94, 'dạng_tản_nhiệt', 'Tản nhiệt khí'),
(94, 'kích_thước_quạt_mm', '2 x 120 mm'),
(94, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011; AMD AM5, AM4'),
(94, 'đèn_led', 'Không có'),
(94, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(94, 'màu_sắc', 'Đen'),
(94, 'kích_thước_radiator_cm', 'Không có'),
(94, 'số_vòng_quay_của_bơm_rpm', 'Không có'),
(94, 'số_vòng_quay_của_quạt_rpm', '500 - 1850'),
(94, 'lưu_lượng_không_khí_cfm', '68.99 CFM'),
(94, 'độ_ồn_dba', '29 dB(A)'),
(94, 'khối_lượng_kg', '1.2 kg');

-- Thuộc tính cho Tản nhiệt ID 95 (Arctic Liquid Freezer II 280)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(95, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(95, 'kích_thước_quạt_mm', '2 x 140 mm'),
(95, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011, 2066; AMD AM5, AM4'),
(95, 'đèn_led', 'Không có'),
(95, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(95, 'màu_sắc', 'Đen'),
(95, 'kích_thước_radiator_cm', '317 x 138 x 38 mm'),
(95, 'số_vòng_quay_của_bơm_rpm', '200 - 2000'),
(95, 'số_vòng_quay_của_quạt_rpm', '200 - 1700'),
(95, 'lưu_lượng_không_khí_cfm', '72.8 CFM'),
(95, 'độ_ồn_dba', '0.3 - 22.5 dB(A)'),
(95, 'khối_lượng_kg', '1.3 kg');

-- Thuộc tính cho Tản nhiệt ID 96 (Noctua NH-D15)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(96, 'dạng_tản_nhiệt', 'Tản nhiệt khí'),
(96, 'kích_thước_quạt_mm', '2 x 140 mm'),
(96, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011, 2066; AMD AM5, AM4'),
(96, 'đèn_led', 'Không có'),
(96, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(96, 'màu_sắc', 'Nâu'),
(96, 'kích_thước_radiator_cm', 'Không có'),
(96, 'số_vòng_quay_của_bơm_rpm', 'Không có'),
(96, 'số_vòng_quay_của_quạt_rpm', '300 - 1500'),
(96, 'lưu_lượng_không_khí_cfm', '140.2 CFM'),
(96, 'độ_ồn_dba', '19.2 - 24.6 dB(A)'),
(96, 'khối_lượng_kg', '1.32 kg');

-- Thuộc tính cho Tản nhiệt ID 97 (Lian Li Galahad II Trinity)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(97, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(97, 'kích_thước_quạt_mm', '3 x 120 mm'),
(97, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x; AMD AM5, AM4'),
(97, 'đèn_led', 'ARGB'),
(97, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(97, 'màu_sắc', 'Trắng'),
(97, 'kích_thước_radiator_cm', '402 x 120 x 27 mm'),
(97, 'số_vòng_quay_của_bơm_rpm', '3100 ±10%'),
(97, 'số_vòng_quay_của_quạt_rpm', '2200 ±10%'),
(97, 'lưu_lượng_không_khí_cfm', '69.17 CFM'),
(97, 'độ_ồn_dba', '31.6 dB(A)'),
(97, 'khối_lượng_kg', '1.6 kg');

-- Thuộc tính cho Tản nhiệt ID 98 (Thermalright Peerless Assassin 120)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(98, 'dạng_tản_nhiệt', 'Tản nhiệt khí'),
(98, 'kích_thước_quạt_mm', '2 x 120 mm'),
(98, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x; AMD AM5, AM4'),
(98, 'đèn_led', 'ARGB'),
(98, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(98, 'màu_sắc', 'Đen'),
(98, 'kích_thước_radiator_cm', 'Không có'),
(98, 'số_vòng_quay_của_bơm_rpm', 'Không có'),
(98, 'số_vòng_quay_của_quạt_rpm', '1550'),
(98, 'lưu_lượng_không_khí_cfm', '66.17 CFM'),
(98, 'độ_ồn_dba', '25.6 dB(A)'),
(98, 'khối_lượng_kg', '0.8 kg');

-- Thuộc tính cho Tản nhiệt ID 99 (MSI MAG CoreLiquid 240R)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(99, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(99, 'kích_thước_quạt_mm', '2 x 120 mm'),
(99, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x; AMD AM5, AM4'),
(99, 'đèn_led', 'ARGB'),
(99, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(99, 'màu_sắc', 'Đen'),
(99, 'kích_thước_radiator_cm', '272 x 120 x 27 mm'),
(99, 'số_vòng_quay_của_bơm_rpm', '4200 ±10%'),
(99, 'số_vòng_quay_của_quạt_rpm', '500 - 2000'),
(99, 'lưu_lượng_không_khí_cfm', '78.73 CFM'),
(99, 'độ_ồn_dba', '14 - 34 dB(A)'),
(99, 'khối_lượng_kg', '1.1 kg');

-- Thuộc tính cho Tản nhiệt ID 100 (Cooler Master MASTERLIQUID ML240L)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(100, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(100, 'kích_thước_quạt_mm', '2 x 120 mm'),
(100, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x; AMD AM5, AM4'),
(100, 'đèn_led', 'ARGB'),
(100, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(100, 'màu_sắc', 'Đen'),
(100, 'kích_thước_radiator_cm', '272 x 120 x 27 mm'),
(100, 'số_vòng_quay_của_bơm_rpm', '2400 ±10%'),
(100, 'số_vòng_quay_của_quạt_rpm', '650 - 2000'),
(100, 'lưu_lượng_không_khí_cfm', '66 CFM'),
(100, 'độ_ồn_dba', '8 - 30 dB(A)'),
(100, 'khối_lượng_kg', '1.0 kg');

-- Thuộc tính cho Tản nhiệt ID 101 (Deepcool LT720)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(101, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(101, 'kích_thước_quạt_mm', '3 x 120 mm'),
(101, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011; AMD AM5, AM4'),
(101, 'đèn_led', 'ARGB'),
(101, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(101, 'màu_sắc', 'Đen'),
(101, 'kích_thước_radiator_cm', '397 x 120 x 27 mm'),
(101, 'số_vòng_quay_của_bơm_rpm', '3100 ±10%'),
(101, 'số_vòng_quay_của_quạt_rpm', '500 - 2250'),
(101, 'lưu_lượng_không_khí_cfm', '85.85 CFM'),
(101, 'độ_ồn_dba', '18.8 - 33.6 dB(A)'),
(101, 'khối_lượng_kg', '1.5 kg');

-- Thuộc tính cho Tản nhiệt ID 102 (Be Quiet! Dark Rock Pro 4)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(102, 'dạng_tản_nhiệt', 'Tản nhiệt khí'),
(102, 'kích_thước_quạt_mm', '2 x 120 mm, 1 x 135 mm'),
(102, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011, 2066; AMD AM5, AM4'),
(102, 'đèn_led', 'Không có'),
(102, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(102, 'màu_sắc', 'Đen'),
(102, 'kích_thước_radiator_cm', 'Không có'),
(102, 'số_vòng_quay_của_bơm_rpm', 'Không có'),
(102, 'số_vòng_quay_của_quạt_rpm', '1500'),
(102, 'lưu_lượng_không_khí_cfm', '73.3 CFM'),
(102, 'độ_ồn_dba', '12.8 - 24.3 dB(A)'),
(102, 'khối_lượng_kg', '1.15 kg');

-- Thuộc tính cho Tản nhiệt ID 103 (ID-Cooling SE-224-XTS)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(103, 'dạng_tản_nhiệt', 'Tản nhiệt khí'),
(103, 'kích_thước_quạt_mm', '1 x 120 mm'),
(103, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x; AMD AM4'),
(103, 'đèn_led', 'ARGB'),
(103, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(103, 'màu_sắc', 'Đen'),
(103, 'kích_thước_radiator_cm', 'Không có'),
(103, 'số_vòng_quay_của_bơm_rpm', 'Không có'),
(103, 'số_vòng_quay_của_quạt_rpm', '300 - 2000'),
(103, 'lưu_lượng_không_khí_cfm', '76.16 CFM'),
(103, 'độ_ồn_dba', '16.3 - 33.5 dB(A)'),
(103, 'khối_lượng_kg', '0.7 kg');

-- Thuộc tính cho Tản nhiệt ID 104 (NZXT Kraken 240 RGB)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(104, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(104, 'kích_thước_quạt_mm', '2 x 120 mm'),
(104, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2011, 2066; AMD AM5, AM4'),
(104, 'đèn_led', 'RGB Infinity Mirror'),
(104, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(104, 'màu_sắc', 'Đen'),
(104, 'kích_thước_radiator_cm', '274 x 120 x 27 mm'),
(104, 'số_vòng_quay_của_bơm_rpm', '800 - 2800'),
(104, 'số_vòng_quay_của_quạt_rpm', '500 - 2000'),
(104, 'lưu_lượng_không_khí_cfm', '73.11 CFM'),
(104, 'độ_ồn_dba', '21 - 36 dB(A)'),
(104, 'khối_lượng_kg', '1.1 kg');

-- Thuộc tính cho Tản nhiệt ID 105 (Corsair H100i Elite Capellix)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(105, 'dạng_tản_nhiệt', 'Tản nước AIO'),
(105, 'kích_thước_quạt_mm', '2 x 120 mm'),
(105, 'socket_được_hỗ_trợ', 'Intel LGA 1700, 1200, 115x, 2066; AMD AM5, AM4'),
(105, 'đèn_led', 'RGB Capellix'),
(105, 'chất_liệu_tản_nhiệt', 'Nhôm, Đồng'),
(105, 'màu_sắc', 'Đen'),
(105, 'kích_thước_radiator_cm', '276 x 120 x 27 mm'),
(105, 'số_vòng_quay_của_bơm_rpm', '2400 ±10%'),
(105, 'số_vòng_quay_của_quạt_rpm', '400 - 2400'),
(105, 'lưu_lượng_không_khí_cfm', '75 CFM'),
(105, 'độ_ồn_dba', '10 - 36 dB(A)'),
(105, 'khối_lượng_kg', '1.2 kg');

-- Thuộc tính cho Nguồn ID 106 (Corsair RM850x 850W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(106, 'part_number', 'CP-9020200-NA'),
(106, 'series', 'RMx Series'),
(106, 'màu_sắc', 'Đen'),
(106, 'công_suất_tối_đa', '850W'),
(106, 'hiệu_suất', '80 Plus Gold'),
(106, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 6 x 8-pin (6+2) PCIe, 12 x SATA, 4 x 4-pin Peripheral'),
(106, 'quạt_làm_mát', '1 x 135 mm ML fan'),
(106, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 107 (Seasonic FOCUS GX-850 850W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(107, 'part_number', 'SSR-850FX'),
(107, 'series', 'FOCUS GX'),
(107, 'màu_sắc', 'Đen'),
(107, 'công_suất_tối_đa', '850W'),
(107, 'hiệu_suất', '80 Plus Gold'),
(107, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 4 x 8-pin (6+2) PCIe, 9 x SATA, 3 x 4-pin Peripheral'),
(107, 'quạt_làm_mát', '1 x 120 mm FDB fan'),
(107, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 108 (Cooler Master MWE Gold 750 V2)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(108, 'part_number', 'MPE-7501-AFAAG-EU'),
(108, 'series', 'MWE Gold'),
(108, 'màu_sắc', 'Đen'),
(108, 'công_suất_tối_đa', '750W'),
(108, 'hiệu_suất', '80 Plus Gold'),
(108, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 4 x 8-pin (6+2) PCIe, 6 x SATA, 3 x 4-pin Peripheral'),
(108, 'quạt_làm_mát', '1 x 120 mm HDB fan'),
(108, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 109 (ASUS ROG Strix 1000W Gold)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(109, 'part_number', 'ROG-STRIX-1000G'),
(109, 'series', 'ROG Strix'),
(109, 'màu_sắc', 'Đen'),
(109, 'công_suất_tối_đa', '1000W'),
(109, 'hiệu_suất', '80 Plus Gold'),
(109, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 6 x 8-pin (6+2) PCIe, 12 x SATA, 4 x 4-pin Peripheral'),
(109, 'quạt_làm_mát', '1 x 135 mm Axial-tech fan'),
(109, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 110 (MSI MPG A850G 850W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(110, 'part_number', 'MPG A850G'),
(110, 'series', 'MPG Series'),
(110, 'màu_sắc', 'Đen'),
(110, 'công_suất_tối_đa', '850W'),
(110, 'hiệu_suất', '80 Plus Gold'),
(110, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 6 x 8-pin (6+2) PCIe, 8 x SATA, 3 x 4-pin Peripheral'),
(110, 'quạt_làm_mát', '1 x 140 mm FDB fan'),
(110, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 111 (EVGA SuperNOVA 750 G6)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(111, 'part_number', '220-G6-0750-X1'),
(111, 'series', 'SuperNOVA G6'),
(111, 'màu_sắc', 'Đen'),
(111, 'công_suất_tối_đa', '750W'),
(111, 'hiệu_suất', '80 Plus Gold'),
(111, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 4 x 8-pin (6+2) PCIe, 9 x SATA, 4 x 4-pin Peripheral'),
(111, 'quạt_làm_mát', '1 x 135 mm FDB fan'),
(111, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 112 (Be Quiet! Pure Power 12 M 850W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(112, 'part_number', 'BN330'),
(112, 'series', 'Pure Power 12 M'),
(112, 'màu_sắc', 'Đen'),
(112, 'công_suất_tối_đa', '850W'),
(112, 'hiệu_suất', '80 Plus Gold'),
(112, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 4 x 8-pin (6+2) PCIe, 8 x SATA, 3 x 4-pin Peripheral'),
(112, 'quạt_làm_mát', '1 x 120 mm Silent Wings fan'),
(112, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 113 (FSP Hydro G Pro 1000W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(113, 'part_number', 'HGPS-1000'),
(113, 'series', 'Hydro G Pro'),
(113, 'màu_sắc', 'Đen'),
(113, 'công_suất_tối_đa', '1000W'),
(113, 'hiệu_suất', '80 Plus Gold'),
(113, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 6 x 8-pin (6+2) PCIe, 12 x SATA, 4 x 4-pin Peripheral'),
(113, 'quạt_làm_mát', '1 x 135 mm FDB fan'),
(113, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 114 (Thermaltake Toughpower GF1 850W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(114, 'part_number', 'PS-TPD-0850FNFAGE-1'),
(114, 'series', 'Toughpower GF1'),
(114, 'màu_sắc', 'Đen'),
(114, 'công_suất_tối_đa', '850W'),
(114, 'hiệu_suất', '80 Plus Gold'),
(114, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 6 x 8-pin (6+2) PCIe, 8 x SATA, 3 x 4-pin Peripheral'),
(114, 'quạt_làm_mát', '1 x 140 mm Hydraulic Bearing fan'),
(114, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 115 (Corsair CV650 650W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(115, 'part_number', 'CP-9020210-NA'),
(115, 'series', 'CV Series'),
(115, 'màu_sắc', 'Đen'),
(115, 'công_suất_tối_đa', '650W'),
(115, 'hiệu_suất', '80 Plus Bronze'),
(115, 'số_cổng_cắm', '1 x 24-pin Main, 1 x 8-pin (4+4) EPS, 2 x 8-pin (6+2) PCIe, 6 x SATA, 3 x 4-pin Peripheral'),
(115, 'quạt_làm_mát', '1 x 120 mm rifle bearing fan'),
(115, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 116 (Gigabyte UD850GM 850W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(116, 'part_number', 'GP-UD850GM'),
(116, 'series', 'UD Series'),
(116, 'màu_sắc', 'Đen'),
(116, 'công_suất_tối_đa', '850W'),
(116, 'hiệu_suất', '80 Plus Gold'),
(116, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 4 x 8-pin (6+2) PCIe, 9 x SATA, 3 x 4-pin Peripheral'),
(116, 'quạt_làm_mát', '1 x 120 mm smart fan'),
(116, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 117 (Seasonic PRIME TX-1000)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(117, 'part_number', 'SSR-1000TR'),
(117, 'series', 'PRIME TX'),
(117, 'màu_sắc', 'Đen'),
(117, 'công_suất_tối_đa', '1000W'),
(117, 'hiệu_suất', '80 Plus Titanium'),
(117, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 8 x 8-pin (6+2) PCIe, 16 x SATA, 6 x 4-pin Peripheral'),
(117, 'quạt_làm_mát', '1 x 135 mm FDB fan'),
(117, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 118 (Cooler Master V850 Gold V2)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(118, 'part_number', 'MPY-8501-AFAAG-EU'),
(118, 'series', 'V Series Gold'),
(118, 'màu_sắc', 'Đen'),
(118, 'công_suất_tối_đa', '850W'),
(118, 'hiệu_suất', '80 Plus Gold'),
(118, 'số_cổng_cắm', '1 x 24-pin Main, 2 x 8-pin (4+4) EPS, 4 x 8-pin (6+2) PCIe, 10 x SATA, 3 x 4-pin Peripheral'),
(118, 'quạt_làm_mát', '1 x 120 mm HDB fan'),
(118, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 119 (ASUS TUF Gaming 750W Bronze)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(119, 'part_number', 'TUF-GAMING-750B'),
(119, 'series', 'TUF Gaming'),
(119, 'màu_sắc', 'Đen'),
(119, 'công_suất_tối_đa', '750W'),
(119, 'hiệu_suất', '80 Plus Bronze'),
(119, 'số_cổng_cắm', '1 x 24-pin Main, 1 x 8-pin (4+4) EPS, 2 x 8-pin (6+2) PCIe, 6 x SATA, 3 x 4-pin Peripheral'),
(119, 'quạt_làm_mát', '1 x 135 mm Axial-tech fan'),
(119, 'nguồn_đầu_vào', '100 - 240VAC');

-- Thuộc tính cho Nguồn ID 120 (MSI MAG A650BN 650W)
INSERT INTO `product-attributes` (product_id, attribute_key, attribute_value) VALUES
(120, 'part_number', 'MAG A650BN'),
(120, 'series', 'MAG Series'),
(120, 'màu_sắc', 'Đen'),
(120, 'công_suất_tối_đa', '650W'),
(120, 'hiệu_suất', '80 Plus Bronze'),
(120, 'số_cổng_cắm', '1 x 24-pin Main, 1 x 8-pin (4+4) EPS, 2 x 8-pin (6+2) PCIe, 6 x SATA, 3 x 4-pin Peripheral'),
(120, 'quạt_làm_mát', '1 x 120 mm fan'),
(120, 'nguồn_đầu_vào', '100 - 240VAC');


INSERT INTO orders
(order_date, name, phone, total_amount, shipping_address, status, user_id)
VALUES
('2025-12-12 09:10:00', 'Bien Quan', '0336684254', 12480000, 'Viet Nam', 'COMPLETED', 3),
('2025-12-12 10:20:00', 'Cristiano Ronaldo', '0965427504', 42990000, 'Portugal', 'SHIPPING', 4),
('2025-12-14 11:30:00', 'Nguyen Van A', '0902000001', 7990000, 'Ha Noi', 'PROCESSING', 5),
('2026-01-03 12:15:00', 'Tran Thi B', '0902000002', 2490000, 'Hai Phong', 'COMPLETED', 6),
('2026-01-04 13:00:00', 'Le Van C', '0902000003', 1890000, 'Da Nang', 'CANCELLED', 7),
('2026-01-07 14:40:00', 'Pham Thi D', '0902000004', 5990000, 'Hue', 'COMPLETED', 8),
('2026-01-09 15:25:00', 'Hoang Van E', '0902000005', 10490000, 'Quang Nam', 'SHIPPING', 9),
('2026-01-11 16:00:00', 'Do Thi F', '0902000006', 3490000, 'Can Tho', 'PROCESSING', 10),
('2026-01-15 17:10:00', 'Vu Van G', '0902000007', 27990000, 'Vung Tau', 'PENDING', 11),
('2026-01-19 18:30:00', 'Bui Thi H', '0902000008', 2490000, 'Dong Nai', 'COMPLETED', 12),
('2026-01-20 09:00:00', 'Dang Van I', '0902000009', 4990000, 'Binh Duong', 'SHIPPING', 13),
('2026-01-20 10:45:00', 'Bien Quan', '0336684254', 14990000, 'Viet Nam', 'PROCESSING', 3),
('2026-01-24 11:20:00', 'Cristiano Ronaldo', '0965427504', 12990000, 'Portugal', 'COMPLETED', 4),
('2026-01-25 12:10:00', 'Nguyen Van A', '0902000001', 2990000, 'Ha Noi', 'PENDING', 5),
('2026-01-25 13:35:00', 'Tran Thi B', '0902000002', 16990000, 'Hai Phong', 'COMPLETED', 6),
('2026-01-25 14:50:00', 'Le Van C', '0902000003', 890000, 'Da Nang', 'CANCELLED', 7),
('2026-01-27 15:40:00', 'Pham Thi D', '0902000004', 3290000, 'Hue', 'PROCESSING', 8),
('2026-01-28 16:25:00', 'Hoang Van E', '0902000005', 5990000, 'Quang Nam', 'SHIPPING', 9),
('2026-01-29 17:15:00', 'Do Thi F', '0902000006', 2190000, 'Can Tho', 'COMPLETED', 10),
('2026-01-29 18:45:00', 'Vu Van G', '0902000007', 4490000, 'Vung Tau', 'PENDING', 11);

INSERT INTO order_details (quantity, price_at_purchase, order_id, product_id) VALUES
(1, 3490000, 1, 1),
(1, 8990000, 1, 11),
(1, 42990000, 2, 16),
(1, 7990000, 3, 2),
(1, 2490000, 4, 6),
(1, 1890000, 5, 15),
(1, 5990000, 6, 9),
(1, 10490000, 7, 5),
(1, 3490000, 8, 1),
(1, 27990000, 9, 20),
(1, 2490000, 10, 6),
(1, 14990000, 12, 7),
(1, 12990000, 13, 12),
(1, 2990000, 14, 22),
(1, 16990000, 15, 23),
(1, 890000, 16, 5),
(1, 3290000, 17, 18),
(1, 5990000, 18, 14),
(1, 2190000, 19, 21),
(1, 4490000, 20, 25);
