# SubUnlock Studio · NghĩaLQ TV

Bản Dark Mode có thêm **trang quản trị link bằng giao diện** (`admin.html`) cho GitHub Pages. Giữ nguyên 20 ID/URL mở khóa ban đầu và 14 quảng cáo TikTok trong `data/tiktok_ads.js`. Không cần Node.js, Firebase hay cơ sở dữ liệu.

## 1. Cài đặt lần đầu

Đưa **toàn bộ nội dung bên trong thư mục `SubUnlock-main/`** lên chính repository đang chạy GitHub Pages. Giữ nguyên đường dẫn của các file và thư mục. Đảm bảo có cả các file mới `admin.html`, `admin.css`, `admin.js` và ba file trang công khai đã cập nhật `index.html`, `style.css`, `app.js`.

Trang người dùng: `https://<owner>.github.io/<repository>/?id=hackmenuios`

Trang quản trị: `https://<owner>.github.io/<repository>/admin.html`

Ví dụ nếu repository có tên `SubUnlock` và username là `nghialqtv`, đường dẫn quản trị sẽ là `https://nghialqtv.github.io/SubUnlock/admin.html`. **Nếu repository của bạn đặt tên khác, hãy thay bằng tên thật.**

## 2. Thêm link mới trong giao diện

1. Mở `admin.html` → **Tạo link mới**.
2. Nhập **Tên link**, **ID** (sẽ tạo `?id=...`), **Link đích** (địa chỉ sẽ mở sau khi hoàn thành nhiệm vụ).
3. Chọn nền tảng: **YouTube, TikTok, Telegram, Discord, Facebook, Instagram, Zalo, Tùy chỉnh**. Có thể thêm 1–8 nhiệm vụ cho mỗi link, đổi tên, đổi đường dẫn, đảo thứ tự và xóa nhiệm vụ.
4. Xem bản xem trước ở bên phải. Chọn một trong hai cách cập nhật trang:
   - **Tải `data.js`**: tải file mới về rồi upload **đè** `data.js` tại thư mục gốc của repository. Không thay thế `data/tiktok_ads.js`.
   - **Đăng lên GitHub**: nhập GitHub username, repository, branch, cùng **fine-grained personal access token** có quyền `Contents: Read and write` trong đúng repository. Nhấn **Kiểm tra kết nối**, rồi **Đăng lên GitHub**.
5. Sau khi GitHub Pages triển khai thay đổi, sao chép link chia sẻ bên dưới bản xem trước.

**Quan trọng về bảo mật**: Website GitHub Pages tĩnh không tự có tài khoản admin. Bất kỳ ai biết địa chỉ `/admin.html` đều có thể mở *giao diện chỉnh sửa cục bộ*, nhưng **không thể thay đổi dữ liệu công khai** nếu không có quyền GitHub. Trình quản trị không lưu token vào file, localStorage hay `data.js`. Không chia sẻ token và không đặt token vào mã nguồn. Giới hạn token vào một repository, cấp đúng `Contents: Read and write` và đặt hạn dùng thích hợp. Mỗi lần đăng trực tiếp cần nhập token trong phiên đang mở.

## 3. Quản lý dữ liệu & an toàn

- Trang quản trị mở và giữ nguyên 20 ID cũ cùng URL mở khóa, URL mặc định (`DEFAULT_SUB`, `DEFAULT_TIKTOK`, `DEFAULT_TELE`, `CYBER_MODS_URL`).
- Khi chỉnh sửa một ID cũ, link được cấu hình nhiệm vụ riêng. Những ID chưa được chỉnh vẫn sử dụng 4 nhiệm vụ truyền thống.
- Khi xuất/đăng, hệ thống kiểm tra URL HTTP(S), ID và số lượng nhiệm vụ.
- **Lưu bản nháp** chỉ lưu vào trình duyệt đang mở và có thể khôi phục, **không cập nhật GitHub**.
- Khi đăng trực tiếp, trước tiên GitHub API lấy SHA mới nhất của `data.js`. Nếu nội dung GitHub đã thay đổi từ lúc mở quản trị, hệ thống **cảnh báo trước khi ghi đè**, phòng tránh mất dữ liệu.
- Các file quảng cáo TikTok tiếp tục là `data/tiktok_ads.js` và `tiktok_ads/tiktok-gate.js`. Chúng **không** bị chỉnh sửa bởi trang quản trị link.

## 4. Trang mở khóa cho khách

- Mỗi link hỗ trợ 1–8 nhiệm vụ và các nền tảng nêu trên.
- Link cũ vẫn hoạt động; link mới dùng `?id=<ID đã tạo>`.
- **Một lần nhấn vào nhiệm vụ**: trang thử mở **quảng cáo TikTok ngẫu nhiên ở thẻ mới** và **liên kết nhiệm vụ ở thẻ hiện tại**. Không có nút “Xem quảng cáo”, không cần nhấn xác nhận lần hai. Nếu trình duyệt chặn thẻ quảng cáo, sẽ ưu tiên mở quảng cáo tại thẻ hiện tại thay vì âm thầm bỏ qua quảng cáo; trong trường hợp đó, liên kết nhiệm vụ có thể không tự mở.
- Tiến độ nhiệm vụ tự hoàn tất sau 3 giây (kể cả sau khi quay lại bằng nút Back). Phiên vẫn hết hạn sau 2 phút như phiên bản trước. Tiến độ chỉ xác nhận **đã nhấn mở liên kết**, không chứng minh đã đăng ký/follow thật.
- Việc mở link và xem quảng cáo **không chứng minh** người xem đã thật sự đăng ký/follow trên nền tảng bên ngoài; muốn xác thực bắt buộc cần API/backend phù hợp.
- Với website tĩnh, không thể bảo đảm 100% hai liên kết mở đồng thời trên mọi trình duyệt. Safari/Chrome và trình duyệt tích hợp ứng dụng có thể chặn thẻ quảng cáo hoặc mở sâu trong ứng dụng. Không có giải pháp frontend nào đảm bảo vượt được chính sách chặn popup của trình duyệt.

## 5. Tình trạng kiểm thử

Đã kiểm tra bằng Chromium ở viewport 1440px, 390px và 320px; tạo/sửa/đổi thứ tự nhiệm vụ, xuất `data.js` và xác minh 20 link cũ vẫn còn sau khi thêm link mới. **Chưa** đăng GitHub thật (không có token) và **chưa** kiểm thử trực tiếp trên thiết bị iOS/Android thực tế. Nếu GitHub Pages chưa hiển thị thay đổi, cần kiểm tra trạng thái triển khai và làm mới trang (có thể gặp cache).

## 6. Cập nhật bản tự mở quảng cáo

- **Trang admin**: file `admin.html`, ví dụ `https://nghialqtv.github.io/SubUnlock/admin.html` nếu repository có tên `SubUnlock`. Trang khách là `index.html`.
- Phiên bản này **không có phần “Nhấn để xem quảng cáo”**, cả banner trên đầu lẫn nút bên dưới tiến độ đều đã bỏ.
- Cập nhật toàn bộ nội dung thư mục `SubUnlock-main/` trong bản ZIP, không phải upload riêng file ZIP.
- Sau khi cập nhật, thử bấm nhiệm vụ ở Safari/Chrome. Popup blocker và in-app browsers có thể chỉ cho phép điều hướng một trang; xử lý dự phòng sẽ ưu tiên quảng cáo.
