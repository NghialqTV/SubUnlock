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

## 4. Trang mở khóa cho khách – HAI LƯỢT QUẢNG CÁO CỐ ĐỊNH

- Giao diện công khai theo mẫu GET KEY AOV: nền đen Dark Mode, logo Liên Quân, thanh tiến độ, các thẻ nhiệm vụ Dark Mode tách biệt bằng khoảng cách, viền và bóng nổi; nút Mở Khóa Link Chính.
- Mặc định có 4 nhiệm vụ theo thứ tự: Đăng Kí Kênh NghĩaLQ TV → Đăng Kí Kênh Cyber Mods → Follow TikTok → Tham Gia Telegram.
- **Quảng cáo lần 1:** chỉ mở khi người dùng nhấn nhiệm vụ Follow TikTok. Quảng cáo mở ở tab mới trước khi website điều hướng sang TikTok; nếu popup bị chặn, quảng cáo mở trong tab hiện tại rồi khi quay lại website sẽ tự mở link Follow TikTok.
- Các nhiệm vụ mở trực tiếp YouTube, TikTok hoặc Telegram; quay lại website thì nhiệm vụ được ghi nhận. **Không có quảng cáo chen giữa các nhiệm vụ.**
- **Quảng cáo lần 2:** chỉ xuất hiện khi người dùng đã hoàn thành tất cả nhiệm vụ và nhấn **Mở Khóa Link Chính**. Nếu mở được tab quảng cáo, link chính tiếp tục mở ở tab hiện tại. Nếu trình duyệt chặn popup, quảng cáo mở ở tab hiện tại và website tự tiếp tục đến link chính khi người dùng quay lại.
- Tiến độ được lưu trong `sessionStorage` của tab hiện tại để giữ bước khi quay lại từ nền tảng bên ngoài. Tải lại trang sẽ reset về 0/4; phiên cũng tự reset sau 3 phút kể từ lúc tải trang. Quay lại từ YouTube/TikTok/Telegram trong vòng 3 phút vẫn giữ tiến độ.
- **Quan trọng:** GitHub Pages tĩnh không thể xác minh YouTube đã subscribe, TikTok đã follow hay Telegram đã tham gia. Website chỉ ghi nhận người dùng đã mở liên kết nhiệm vụ và quay lại. Muốn xác thực thật cần API và quyền truy cập phù hợp.
- Một số trình duyệt tích hợp hoặc chế độ riêng tư có thể hạn chế popup, sessionStorage hoặc universal links; không thể cam kết 100% trên mọi phiên bản.

## 5. Tình trạng kiểm thử

Đã kiểm tra cú pháp JavaScript bằng `node --check` cho `app.js`, `data.js`, `tiktok-gate.js` và `admin.js`. Chưa đăng GitHub thật và chưa kiểm thử trực tiếp trên thiết bị iOS/Android thực tế. Hãy thử trên trình duyệt điện thoại sau khi GitHub Pages triển khai; popup có thể bị chặn tùy cài đặt trình duyệt, khi đó website dùng điều hướng cùng tab làm phương án dự phòng.

## 6. Cập nhật bản GET KEY AOV – hai lượt quảng cáo

- `index.html`: bố cục GET KEY AOV và danh sách nhiệm vụ dạng hàng.
- `style.css`: giao diện Dark Mode đen/xám, thẻ nhiệm vụ tách biệt, màu hoàn thành xanh lá, thanh tiến độ xanh dương.
- `app.js`: xử lý 4 nhiệm vụ tuần tự, quảng cáo lần 1 tại Follow TikTok, quảng cáo lần 2 tại nút mở khóa và reset phiên khi tải lại hoặc đủ 3 phút.
- `data.js`: cấu hình link nhiệm vụ và link mở khóa; `data/tiktok_ads.js`: danh sách link quảng cáo.
- Giải nén ZIP và upload toàn bộ nội dung `SubUnlock-main/` lên GitHub Pages, ghi đè các file tương ứng.
- Nếu website vẫn chạy phiên bản cũ, kiểm tra GitHub Pages đã triển khai và làm mới cache trình duyệt.
