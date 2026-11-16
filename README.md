# SubUnlock Studio · NghĩaLQ TV

Bản Full Premium Dark Mode có thêm **trang quản trị link bằng giao diện** (`admin.html`) cho GitHub Pages. Giữ nguyên 20 ID/URL mở khóa ban đầu và 14 quảng cáo TikTok trong `data/tiktok_ads.js`. Không cần Node.js, Firebase hay cơ sở dữ liệu.

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

## 4. Trang mở khóa cho khách – NHIỆM VỤ TRƯỚC, QUẢNG CÁO SAU

- Mỗi link hỗ trợ 1–8 nhiệm vụ. Link cũ vẫn hoạt động và dữ liệu giữ nguyên.
- **Bấm một nhiệm vụ → mở trực tiếp liên kết nền tảng** (YouTube, TikTok, Telegram...). Không mở quảng cáo trước hoặc cùng lúc.
- **Thực hiện tác vụ trên nền tảng và trở lại trang SubUnlock** bằng nút Quay lại / Back hoặc chuyển lại trình duyệt. Khi website nhận biết người xem đã rời và quay lại, nó **tự chuyển sang một quảng cáo ngẫu nhiên** trong cùng tab; không có nút xác nhận hay popup.
- **Trở về từ trang quảng cáo** → tiến độ bước đó được ghi nhận (ít nhất 3 giây từ lúc mở quảng cáo) và bước kế tiếp mở khóa. Mỗi bước có một quảng cáo.
- Phiên tính thời gian hoạt động 2 phút giữa các nhiệm vụ; một nhiệm vụ đang thực hiện ở ngoài sẽ không tự bị xóa khi người dùng mở YouTube/TikTok lâu hơn 2 phút. Nếu cần thời gian khác, đổi `SESSION_TTL` trong `app.js`.
- **Quan trọng**: GitHub Pages tĩnh KHÔNG có khả năng xác minh YouTube đã subscribe, TikTok đã follow hay Telegram đã tham gia. Chỉ ghi nhận người dùng đã mở liên kết nhiệm vụ, quay lại website, đi qua quảng cáo và quay lại lần nữa. Muốn xác thực thật phải có API và quyền truy cập phù hợp.
- Luồng dùng điều hướng cùng tab (không dùng popup) để giảm bị chặn trên Safari iOS, Chrome Android và trình duyệt trong ứng dụng. Một số trình duyệt tích hợp hoặc chế độ riêng tư có thể hạn chế sessionStorage / universal links; vì vậy không thể cam kết 100% trên mọi phiên bản. Hãy bật JavaScript, cho phép lưu phiên của trang và quay lại đúng tab SubUnlock.

## 5. Tình trạng kiểm thử

Đã kiểm tra bằng Chromium ở viewport 1440px, 390px và 320px; tạo/sửa/đổi thứ tự nhiệm vụ, xuất `data.js` và xác minh 20 link cũ vẫn còn sau khi thêm link mới. **Chưa** đăng GitHub thật (không có token) và **chưa** kiểm thử trực tiếp trên thiết bị iOS/Android thực tế. Nếu GitHub Pages chưa hiển thị thay đổi, cần kiểm tra trạng thái triển khai và làm mới trang (có thể gặp cache).

## 6. Cập nhật bản nhiệm vụ trước – quảng cáo sau

- `admin.html`: trang quản trị.
- `index.html`: trang người truy cập.
- Không có banner hay nút “Nhấn để xem quảng cáo”; luồng là **nhiệm vụ → trở lại → quảng cáo → trở lại → hoàn tất**.
- Giải nén ZIP và upload toàn bộ nội dung `SubUnlock-main/` lên GitHub Pages, ghi đè các file tương ứng.
- Nếu website vẫn chạy phiên bản cũ, kiểm tra GitHub Pages đã triển khai và xóa cache trình duyệt.
