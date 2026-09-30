# Handoff: VCSF 2026 — thay tag NHÁP bằng tag "Tự động dịch"

Trang đã dựng sẵn, chỉ cần sửa nhỏ ở mục **Diễn giả**. File `VCSF 2026 Home v2.1.dc.html` là bản tham chiếu HTML, không copy vào dự án (mở kèm `support.js`).

## 1. Xoá tag NHÁP/DRAFT
- Xoá badge NHÁP/DRAFT màu vàng ở góc trái trên ảnh của **thẻ diễn giả** (danh sách).
- Xoá badge NHÁP/DRAFT cạnh **chức vụ** trong modal.
- Xoá badge NHÁP/DRAFT cạnh tiêu đề **Tiểu sử** trong modal.
- Xoá chuỗi i18n `spDraft` ('NHÁP' / 'DRAFT').

## 2. Thêm tag "Tự động dịch" trong modal
- **Ý nghĩa dữ liệu:** mảng `draft` của mỗi diễn giả (`chuc_danh_vi`, `chuc_danh_en`, `bio_vi`, `bio_en`) giờ nghĩa là "trường này được dịch tự động".
- **Điều kiện hiện**, tính theo ngôn ngữ đang xem, VI và EN riêng:
  `autoTag = draft.includes('chuc_danh_' + locale) || draft.includes('bio_' + locale)`
- **Chỉ hiện trong modal.** Không hiện trên thẻ diễn giả, không có dòng ghi chú ở cuối bio.
- **Vị trí:** đầu vùng bio, ngay **trên** tiêu đề "Tiểu sử / Biography", cách tiêu đề 18px.
- **Style:**
  - Pill inline-flex, cao 34px, padding `0 16px 0 12px`, gap 8px, bo tròn 999px.
  - Nền `linear-gradient(90deg, #FFE58A, #FFC93C)`.
  - Chữ #3D2E00, Open Sans 700 13px/1, letter-spacing .01em.
  - Shadow `0 6px 18px rgba(255,190,40,.35)`.
  - Icon dịch 15px (stroke currentColor, 2.2) phía trước chữ. SVG path:
    `M4 5h8M8 3v2M5.5 5c1 3.5 3.5 6 6.5 7.5M10.5 5c-1 3.5-3.5 6-6.5 7.5M13 21l4-9 4 9M14.5 18h5`
- **Chuỗi i18n:** `spAuto` = 'Tự động dịch' / 'Auto-translated'.

## 3. Dữ liệu
- **Ông Đỗ Tiến Thịnh** (`do-tien-thinh`): đổi `draft` từ `["bio_vi","bio_en"]` thành `[]`, nên không còn tag.
- **Ông Nirukt Sapru** (`nirukt-sapru`): giữ `["chuc_danh_vi","bio_vi"]`, nên tag chỉ hiện ở bản VI.
- Các diễn giả còn lại: `[]`.
