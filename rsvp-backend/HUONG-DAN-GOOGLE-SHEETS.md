# Kết nối biểu mẫu RSVP với Google Sheets

## 1. Tạo bảng tính

1. Mở Google Sheets và tạo một bảng tính mới, ví dụ: `RSVP - Thượng thọ Bà Phi Yến`.
2. Vào **Extensions → Apps Script**.
3. Xóa nội dung mặc định và dán toàn bộ mã trong file `Code.gs`.
4. Nhấn **Save**.

## 2. Xuất bản Web App

1. Trong Apps Script, chọn **Deploy → New deployment**.
2. Loại triển khai: **Web app**.
3. **Execute as:** Me.
4. **Who has access:** Anyone.
5. Nhấn **Deploy**, cấp quyền, rồi sao chép URL kết thúc bằng `/exec`.

## 3. Dán đường dẫn vào website

Mở file `assets/js/app.js`, tìm dòng:

```js
rsvpEndpoint: ''
```

Dán URL Web App vào giữa hai dấu nháy:

```js
rsvpEndpoint: 'https://script.google.com/macros/s/MA_TRIEN_KHAI/exec'
```

Lưu file và tải lại lên GitHub. Biểu mẫu sẽ tự ghi dữ liệu vào Google Sheets và phần “Đã xác nhận” sẽ cộng tổng số khách có tham dự.

## 4. Kiểm tra

1. Mở website trên điện thoại.
2. Gửi thử một xác nhận với 2 khách.
3. Kiểm tra Google Sheets có thêm một dòng mới.
4. Tải lại trang; tổng số khách phải tăng thêm 2.
