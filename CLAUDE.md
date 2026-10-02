# VCSF 2026 Landing — ngữ cảnh dự án

Trang chủ song ngữ VI/EN cho **Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam 2026** (VCSF 2026, Hà Nội, 05/10/2026).
Dựng lại bằng **React 19 + Vite + TypeScript + CSS Modules** (không dùng UI library) từ bản design HTML của Claude Design.
Chạy, build, deploy và bảng "sửa nội dung ở đâu": xem `README.md`.

## Cách làm việc với chủ dự án

- Trả lời bằng **tiếng Việt**.
- Làm **từng phần một**. Sau mỗi thay đổi chạy `npm run build` và `npx oxlint src`, báo cần kiểm tra gì, rồi **dừng chờ duyệt**. Chủ dự án nói "OK / tiếp" mới làm tiếp.
- Chủ dự án kiểm tra trên iPhone (trình duyệt Brave) qua `npm run dev:lan`, sau đó mở `http://<IP máy>:5173`.
- Khi được bảo làm hiệu ứng "mượt hơn / mềm hơn": **giữ nguyên hiệu ứng gốc**, chỉ chỉnh timing/easing và gỡ nguyên nhân giật (decode ảnh, layout thrash, animation bắt đầu ngay khi mount). **Không** tự đổi sang hiệu ứng khác. (Đã từng đổi menu sang kiểu circle-reveal và bị yêu cầu trả lại.)
- Không tự commit/push. Chủ dự án tự commit và push bằng **GitHub Desktop**, trừ khi yêu cầu khác.
- Nội dung (chữ, giờ giấc, tên người) giữ **nguyên văn** theo design. Thấy chỗ nghi sai thì báo, không tự sửa.

## Nguồn sự thật: bản design

- `design_handoff_vcsf2026_home_v2_1/design/VCSF 2026 Home v2.1.dc.html` là chuẩn về giá trị (px, màu, gradient, easing, copy). Khi file này và `README.md`/`PROMPT.md` trong thư mục handoff mâu thuẫn, **file HTML thắng**.
- Để xem bản gốc chạy thật: copy file đó thành `reference.html` và `design/support.js` thành `support.js` ở gốc repo (cả hai đã gitignore), chạy `npx serve -l 4000 .`, mở `http://localhost:4000/reference.html`.
- Những chỗ file HTML khác README handoff (đã làm theo HTML):
  - Thứ tự mục: Hero → dải SDG → Live → **01 Lịch sử** → **02 Giới thiệu** → 03 Diễn giả → 04 Chương trình → 05 Thư viện (05.1 Ảnh, 05.2 Video, 05.3 Tài liệu) → 06 Đối tác → Footer.
  - Mục Giới thiệu là 2 ảnh xếp lệch có parallax. "Cây tri thức" (`growTree`) mặc định tắt nên không dựng.
  - Dải SDG là marquee chạy ngang dưới Hero.
  - Đối tác có 4 hạng: Chiến lược / Bạch Kim / Vàng / Đồng.
  - Offset khi cuộn tới mục: 60px (riêng nút Live là 80px).
  - Ảnh `history/2021-web.jpg` và `2024-web.jpg` không tồn tại, nên dùng `2021.jpg` và `2024-1.jpg`.

## Cấu trúc code

- `src/components/<Tên>/<Tên>.tsx` + `.module.css`, mỗi mục một thư mục. Dùng chung: `SectionHeader` (tiêu đề đánh số, `tone="light" | "dark"`), `LightBeams` (tia sáng tự vẽ khi cuộn), `LangToggle`, `LiveDot`, `BackToTop`.
- `src/data/`: `content.ts` (chữ giao diện `L`, `LIVE`, SDG), `speakers.ts`, `agenda.ts`, `archive.ts` (các năm, ảnh, video, link), `partners.ts`. Phần lớn được trích nguyên văn từ file design bằng sed.
- `src/config.ts`: `LIVE_MODE`, `LIVE_URL`, `MOTION`, `HISTORY_AUTOPLAY`, các mốc thời gian sự kiện, `MENU_BG`, `SECTIONS`.
- i18n: `src/i18n/context.ts` (`useT()`, `useLocale()`) và `LocaleContext.tsx` (Provider). Mặc định `vi`.
- Hooks trong `src/hooks/`:
  - `useReveal` (các phần tử `[data-reveal]` + `data-delay`) và `useParallax` (`[data-par]`) chạy **một lần ở `App`** sau khi mount.
  - `useMotion` (full / subtle / off; `prefers-reduced-motion` ép về off, đồng thời đặt `html[data-motion]`).
  - `useViewport` (`narrow` < 760px, `portraitFit` khi vh/vw > 0.9).
  - `useScrollState` (header: đã cuộn chưa, mục đang xem, thanh tiến độ).
  - `useDragMarquee` (dải chạy vô tận kéo tay được, dùng cho SDG và dải ảnh).
  - `useBodyLock` (khoá cuộn và bù độ rộng scrollbar qua `--sbw`, để header/nút fixed không bị giật).
  - `useLive`, `useNow`.
- Biến CSS toàn cục: màu trong `src/styles/tokens.css`. `--header-h` do Header tự cập nhật bằng ResizeObserver với `box: 'border-box'` (bắt buộc border-box, vì khi cuộn header chỉ đổi padding). Hiệu ứng chung (`vcFade`, `vcSlide`, `vcPop`, `vcSwap`, `vcFloat`, `vcLive*`) nằm trong `global.css`.
- Hiệu ứng "đổi nội dung" (đổi năm, tab, video, ảnh lightbox) chỉ chạy **sau lần đổi đầu tiên**, không chạy lúc mount và không chạy khi đổi ngôn ngữ.
- Modal diễn giả và Lightbox render qua `createPortal` ra `document.body`.

## Các thay đổi chủ dự án đã yêu cầu (khác bản design)

- **Hero mobile**: `min-height: max(100lvh, 560px)` để bù thanh công cụ trình duyệt; video dọc được đẩy lên với `VIDEO_Y_PHONE = 60` (%). Giá trị này dùng chung cho cả vị trí video và cung icon trôi (`computeRings`).
- **Menu**: vẫn là hiệu ứng fade như design nhưng mềm hơn. Menu mount ở trạng thái ẩn và bật `.open` sau 2 frame. Ảnh nền được preload + decode sẵn. Khoá cuộn giữ đến khi menu unmount. Thời gian đóng `CLOSE_MS = 450`.
- **Diễn giả**: Đã bỏ nhóm Diễn giả khác (01/10). Hiện có 4 nhóm: Phiên toàn thể / Phiên chuyên đề / Chuyên đề 1 / Chuyên đề 2; `HIDDEN_GROUPS = []`. Thẻ trên mobile hiện 2 cột.
- **Tag "Tự động dịch"** (handoff `design_handoff_vcsf2026_auto_translate_tag`): bỏ hết tag NHÁP/DRAFT. Mảng `draft` giờ nghĩa là "dịch tự động"; tag chỉ hiện trong modal, trên tiêu đề Tiểu sử, tính theo ngôn ngữ đang xem. Tắt bằng `SHOW_AUTO_TAG`. **Từ 02/10 đã gỡ hết tag dịch khỏi trang**: `SHOW_AUTO_TAG = false`, và bỏ hộp NOTE "Unofficial translation" ở mục Giới thiệu bản EN. Không tự thêm lại.
- **Chương trình**: thanh tab **sticky** dưới header, cách header `--stick-gap` (10px desktop, 12px mobile). Khi đang dính có nền đậm. Đổi tab lúc đang dính thì cuộn về đầu thẻ. Chỉ hiện 2 tab đầu của design (tab thứ 3 là dữ liệu 2025, đã bỏ).
- **Nút lên đầu trang**: hiện khi cuộn xuống (đã qua 60% màn hình đầu), ẩn khi cuộn lên quá `HIDE_AFTER_PHONE = 240`px trên mobile hoặc 12px trên desktop.
- **Thư viện ảnh**: bấm cả ô ảnh là mở lightbox; nút phóng to luôn hiện trên màn hình cảm ứng.
- **Video**: còn 2 tab: VCSF 2025 (`1wRxXT3qVP8`, thumbnail lấy từ `i.ytimg.com` maxres, dự phòng hqdefault) và VCSF 2026 (chưa có id, hiện "Đang cập nhật"). Tên video khai báo theo ngôn ngữ trong `archive.ts`.
- **Đối tác**: Nestlé đứng đầu hạng Chiến lược. Ô hạng Bạch Kim (C.P.) và hạng Đồng cùng kích thước với ô hạng Vàng trên cả desktop và mobile (dùng chung lưới, chiều cao, padding của hạng Vàng). Mỗi ô logo là link mở trang nhà tài trợ (`href` trong `partners.ts`, lấy từ vbcsd.vn).

## Còn chờ khách / việc trước khi chạy thật

- Ảnh thật VCSF 2025 (dải ảnh đang dùng tạm ảnh các năm trước), id video 2026, link PDF riêng cho từng tài liệu (hiện cả 3 trỏ chung về 1 thư mục Drive), link Facebook.
- Xác nhận file logo nào là Hemera Media, file nào là Hemera Tech.
- Giờ kết thúc buổi chiều: agenda tổng thể VI ghi 15h45 + bốc thăm 15h45–16h00; EN ghi 16h30; chương trình chi tiết phiên chuyên đề kết thúc 16h20. Mục Giới thiệu/Live đang theo agenda tổng thể (VI 16:00, EN 16:30).
- Đã xoá PTT Hồ Quốc Dũng khỏi danh sách diễn giả vì không có ảnh (yêu cầu 02/10); còn 27 diễn giả, đều có ảnh. 8 người chưa có bio (Hồ Sỹ Hùng, Nguyễn Xuân Thắng, Bùi Văn Khắng, Binu Jacob, James Crampton, Lê Hoàng Minh, Nguyễn Quang Vinh, Hà Thu Thanh); ảnh Bùi Văn Khắng độ phân giải thấp (gốc 300×400); 2 bài trình bày Phần 1 phiên chuyên đề chưa có tên.
- Deploy: tạm dùng Vercel (gói Hobby, chỉ để gửi link xem thử). Chạy thật dự kiến dùng Cloudflare Pages, Vercel Pro hoặc hosting trong nước (nếu khách cần hoá đơn VAT). Tên miền chưa chốt.

## Môi trường

- Windows, Node 24. Python 3.13 cài ở máy nhà, máy khác có thể chưa có.
- `.mcp.json` khai báo Playwright MCP để so trang với bản design. Cần chấp nhận server khi Claude Code hỏi thì mới tự chụp màn hình được.
