# Thiệp online — Lễ mừng thượng thọ Bà Phạm Thị Phi Yến 90 tuổi

Website thiệp mời tối ưu cho điện thoại, sử dụng HTML, CSS và JavaScript thuần.

## Tính năng

- Hiệu ứng mở phong bì 3D.
- Ảnh chính và album ảnh chất lượng cao.
- Hoa sen, ánh sáng vàng và chuyển động GSAP/AOS.
- Nhạc nền HTML5 Audio.
- Đồng hồ đếm ngược đến 10:30 ngày 22/08/2026, múi giờ Việt Nam.
- RSVP có thể lưu vào Google Sheets và tự thống kê tổng số khách.
- Google Maps Embed.
- Mã QR thật trỏ đến GitHub Pages.
- Tối ưu responsive cho điện thoại, máy tính bảng và máy tính.

## Đường dẫn dự kiến

`https://tuananhphamcoder-ctrl.github.io/mung-tho-90-tuoi/`

Mã QR trong `assets/qr/qr-thiep-online.png` đang trỏ đến đúng đường dẫn trên. Mã sẽ quét được ngay sau khi GitHub Pages được xuất bản.

## Đăng lên GitHub Pages

1. Tạo repository public có tên chính xác: `mung-tho-90-tuoi`.
2. Tải toàn bộ nội dung trong thư mục này lên nhánh `main`. File `index.html` phải nằm ở thư mục gốc.
3. Mở repository → **Settings → Pages**.
4. Tại **Build and deployment**, chọn **Deploy from a branch**.
5. Branch: `main`; Folder: `/ (root)`; nhấn **Save**.
6. Chờ vài phút rồi mở đường dẫn dự kiến ở trên.

## Kết nối RSVP với Google Sheets

Xem hướng dẫn trong `rsvp-backend/HUONG-DAN-GOOGLE-SHEETS.md`.

## Thay nhạc hoặc ảnh

- Nhạc nền: thay file `assets/audio/nhac-nen.mp3`, giữ nguyên tên file.
- Ảnh: thay các file `.webp` trong `assets/images`, giữ nguyên tên để không phải sửa mã.

## Cấu trúc thư mục

```text
mung-tho-90-tuoi/
├── index.html
├── assets/
│   ├── audio/nhac-nen.mp3
│   ├── css/style.css
│   ├── images/
│   ├── js/app.js
│   └── qr/qr-thiep-online.png
├── rsvp-backend/
│   ├── Code.gs
│   └── HUONG-DAN-GOOGLE-SHEETS.md
├── .nojekyll
└── README.md
```
