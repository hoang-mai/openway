# 📚 OpenWay UI — Thư viện Tài liệu Toàn diện (`@openway/ui`)

> **Trung tâm tài liệu chính thức của OpenWay UI Design System.**

Thư mục này được đóng gói sẵn trong package `node_modules/@openway/ui/docs/` để lập trình viên và các **AI Assistant (Antigravity)** có thể tra cứu và sử dụng nhanh chóng, chuẩn xác.

---

## 🚀 Mục lục Nhanh

- [1. Hướng dẫn Tích hợp Antigravity AI](#1-hướng-dẫn-tích-hợp-antigravity-ai)
- [2. Cài đặt & Cấu hình Theme](#2-cài-đặt--cấu-hình-theme)
- [3. Danh mục 35 Components](#3-danh-mục-35-components)
- [4. Danh mục Hooks (`@openway/ui` & `@openway/ui/query`)](#4-danh-mục-hooks)
- [5. Quy chuẩn Thiết kế (Design Tokens)](#5-quy-chuẩn-thiết-kế-design-tokens)

---

## 1. Hướng dẫn Tích hợp Antigravity AI

Thư viện được tối ưu hóa đặc biệt cho **Antigravity AI Agent**. Bạn có thể tận dụng ngay 3 tài liệu cốt lõi:

- **[`DESIGN.md`](../DESIGN.md)**: Bản kim chỉ nam (Single Source of Truth) về màu sắc Warm Neutrals, Interactive Blue `#2383e2`, bảng màu pastel, bo góc, bóng đổ và animation.
- **[`AGENTS.md`](./AGENTS.md)**: Bản chỉ dẫn hành vi, sitemap, quy tắc import và checklist cho Antigravity.
- **[`SKILL.md`](./SKILL.md)**: Antigravity Skill định dạng chuẩn (`openway-ui`), cho phép Antigravity tự động kích hoạt on-demand khi tạo mới hoặc sửa đổi UI.

### Cấu hình cho Dự án con (Consumer Project):
Thêm khối chỉ dẫn sau vào file `AGENTS.md` ở thư mục gốc dự án của bạn:

```markdown
<!-- openway-ui:start -->
# OpenWay UI Components
Khi viết giao diện hoặc tạo/sửa component:
1. Luôn ưu tiên dùng component có sẵn từ `@openway/ui`.
2. Giao diện tuân thủ triệt để OpenWay Design System: Nền ấm than chì `#f7f6f3` / `#37352f`, nút `#2383e2`, bóng đổ `.shadow-openway-*`.
3. Tham khảo tài liệu và ví dụ code mẫu tại: `node_modules/@openway/ui/docs/AGENTS.md` và `node_modules/@openway/ui/DESIGN.md`.
4. Tra cứu từng component cụ thể tại: `node_modules/@openway/ui/docs/components/<component>.md`.
5. Với phân trang server / infinite scroll: dùng hook từ `@openway/ui/query`.
6. Tuyệt đối tuân thủ Zero `any` và token màu Tailwind CSS v4.
<!-- openway-ui:end -->
```

---

## 2. Cài đặt & Cấu hình Theme

### Cài đặt Package

```bash
pnpm add @openway/ui
# hoặc
npm install @openway/ui
```

### Cấu hình trong `app/globals.css` (Tailwind CSS v4)

Chỉ cần 3 dòng để kích hoạt toàn bộ OpenWay Design System:

```css
@import "tailwindcss";

/* 1. Nạp toàn bộ tokens Warm Neutrals, Interactive Blue, Shadows và Animations */
@import "@openway/ui/styles.css";

/* 2. Quét các class của thư viện */
@source "../node_modules/@openway/ui";
```

---

## 3. Danh mục 35 Components

Tất cả tài liệu chi tiết của từng component được lưu trữ tại thư mục [`components/`](./components/):

### Buttons & Actions
- **[`button.md`](./components/button.md)**: Nút bấm `<Button>` và nút icon `<IconButton>`, 5 kích cỡ, 6 biến thể (`filled`, `soft`, `outline`, `ghost`, `text`, `other`), bo góc 4px–8px, spinner loading mượt mà.

### Form Inputs & Controls
- **[`input.md`](./components/input.md)**: Trường nhập văn bản `<Input>`, viền `#e3e2e0`, focus ring `#2383e2/25`, mắt mật khẩu ẩn/hiện, start/end content.
- **[`textarea.md`](./components/textarea.md)**: Vùng văn bản nhiều dòng `<Textarea>`, tự động co giãn độ cao (`autosize`), thanh cuộn siêu mỏng `.ui-scrollbar`.
- **[`select.md`](./components/select.md)**: Chọn đơn `<Select>` và chọn nhiều `<MultiSelect>`, tìm kiếm client/server, menu filters, skeleton infinite scroll.
- **[`checkbox.md`](./components/checkbox.md)**: Hộp kiểm `<Checkbox>` bo góc 3px (`rounded-xs`), nhóm `<CheckboxGroup>`, trạng thái indeterminate, bố cục flex.
- **[`radio.md`](./components/radio.md)**: Nút chọn 1 phương án `<Radio>` và nhóm `<RadioGroup>`, hỗ trợ giao diện dạng thẻ card.
- **[`toggle.md`](./components/toggle.md)**: Công tắc gạt `<Toggle>` (Switch), di chuyển mượt mà 150ms, hỗ trợ icon bật/tắt và nhãn mô tả.
- **[`slider.md`](./components/slider.md)**: Thanh trượt `<Slider>` chọn số hoặc dải giá trị (Radix UI Slider).

### Data Display
- **[`table.md`](./components/table.md)**: Bảng dữ liệu TanStack Table v9 `<Table>` & `<DataTable>`, header nền giấy ấm `#f7f6f3`, divider mỏng `#ebeae8`, tự động kích hoạt `font-variant-numeric: tabular-nums`.
- **[`badge.md`](./components/badge.md)**: Huy hiệu `<Badge>` 6 màu Pastel (Success, Warning, Error, Info, Secondary, Neutral), đếm số, chấm trạng thái (dot).
- **[`empty.md`](./components/empty.md)**: Màn hình trống `<Empty>` hiển thị khi không có dữ liệu kèm nút hành động CTA.
- **[`carousel.md`](./components/carousel.md)**: Trình chiếu slide `<Carousel>`, điều hướng nút bấm, autoplay, pagination dots.
- **[`collapse.md`](./components/collapse.md)**: Khối thu gọn `<Collapse>` (Accordion), hỗ trợ mở đơn mục hoặc đa mục.

### Feedback & Status
- **[`alert.md`](./components/alert.md)**: Khung Callout cảnh báo `<Alert>` (success, error, warning, info pastel), nút đóng dismiss.
- **[`skeleton.md`](./components/skeleton.md)**: Khung placeholder nhấp nháy `<Skeleton>` shimmer 1.5s mô phỏng layout đang tải.
- **[`toast.md`](./components/toast.md)**: Thông báo góc màn hình `<Toast>` (Sonner), đổ bóng `.shadow-openway-modal`.

### Navigation & Overlays
- **[`tabs.md`](./components/tabs.md)**: Chuyển đổi thẻ `<Tabs>`, thanh chỉ thị underline xanh `#2383e2` trượt mượt mà.
- **[`dropdown.md`](./components/dropdown.md)**: Menu thả xuống `<Dropdown>` đổ bóng `.shadow-openway-dropdown`, bo góc 8px.
- **[`modal.md`](./components/modal.md)**: Hộp thoại `<Modal>`, đổ bóng `.shadow-openway-modal`, bo góc 10px, ModalBody chống cắt cụt focus ring.
- **[`confirm.md`](./components/confirm.md)**: Hộp thoại xác nhận nguy hiểm `<Confirm>` (Xóa, Hủy) kèm loading state.
- **[`popover.md`](./components/popover.md)**: Khung nổi `<Popover>` neo theo phần tử (Floating UI).
- **[`tooltip.md`](./components/tooltip.md)**: Chú thích nhanh `<Tooltip>` nền đen than chì ấm `#37352f`.

### Date & Time Pickers
- **[`datepicker.md`](./components/datepicker.md)**: Bộ chọn ngày `<DatePicker>`, hỗ trợ các preset (Hôm nay, Hôm qua).
- **[`daterangepicker.md`](./components/daterangepicker.md)**: Bộ chọn khoảng ngày `<DateRangePicker>`.
- **[`timepicker.md`](./components/timepicker.md)**: Bộ chọn giờ phút giây `<TimePicker>` cột cuộn trực quan.
- **[`timerangepicker.md`](./components/timerangepicker.md)**: Bộ chọn khoảng thời gian `<TimeRangePicker>`.
- **[`datetimepicker.md`](./components/datetimepicker.md)**: Bộ chọn ngày và giờ kết hợp `<DateTimePicker>`.
- **[`datetimerangepicker.md`](./components/datetimerangepicker.md)**: Bộ chọn khoảng ngày và giờ `<DateTimeRangePicker>`.

### File & Media Upload
- **[`upload-file.md`](./components/upload-file.md)**: Tải tệp tin đa năng `<UploadFile>`, thanh tiến trình, kéo thả.
- **[`upload-avatar.md`](./components/upload-avatar.md)**: Tải ảnh đại diện `<UploadAvatar>` hình tròn kèm xem trước.
- **[`upload-image.md`](./components/upload-image.md)**: Tải nhiều ảnh `<UploadImage>` (Dropzone / Picture Wall), tích hợp modal crop ảnh.
- **[`file-preview.md`](./components/file-preview.md)**: Xem trước tệp tin `<FilePreview>` (ảnh, tài liệu, video).

---

## 4. Danh mục Hooks

Tài liệu chi tiết của các hooks được lưu trữ tại thư mục [`hooks/`](./hooks/):

### Core Hooks (`@openway/ui`)
- **[`useInfiniteScroll`](./hooks/useInfiniteScroll.md)**: Cơ chế tải vô tận thuần React 19 qua native `IntersectionObserver`, zero scroll event listener, an toàn với mutex lock.
- **[`useDebounce` & `useDebouncedCallback`](./hooks/useDebounce.md)**: Tối ưu hiệu năng, chống spam API cho giá trị tìm kiếm hoặc hàm callback.

### TanStack Query v5 Adapters (`@openway/ui/query`)
- **[`useTableQuery`](./hooks/useTableQuery.md)**: Kết nối TanStack Query v5 với `<Table />`, quản lý phân trang, sorting, column filtering và `keepPreviousData`.
- **[`useSelectInfiniteQuery`](./hooks/useSelectInfiniteQuery.md)**: Kết nối TanStack Query v5 với `<Select />` và `<MultiSelect />`, tự động cuộn tải trang tiếp, debounce từ khóa và Skeleton loading.

---

## 5. Quy chuẩn Thiết kế (Design Tokens)

1. **Warm Paper Aesthetics**: Tuyệt đối không dùng chữ đen tuyền `#000000` ở Light Mode; chữ chính là than chì `#37352f`, nền giấy `#f7f6f3`, viền `#e3e2e0`.
2. **Interactive Blue**: Nút bấm chính, checkbox checked, tab active dùng màu `#2383e2` (hover `#1b6ec2`).
3. **Bảng màu Pastel Trạng Thái (Status Palette)**:
   - Thành công (Success): Nền `#dbeddb` / Chữ `#1c3829`
   - Cảnh báo (Warning): Nền `#fdecc8` / Chữ `#402c1b`
   - Lỗi (Error): Nền `#ffe2dd` / Chữ `#5d1715`
   - Thông tin (Info): Nền `#e8f4fc` / Chữ `#0b6e99`
   - Tím (Secondary): Nền `#e8deee` / Chữ `#412454`
4. **Hệ Thống Bo Góc (@theme Geometry)**:
   - `2xs`: 2px
   - `xs`: 3px (Checkbox)
   - `sm`: 4px (Nút nhỏ, ô ngày)
   - `md`: 5px (Nút chuẩn, Input, Select, TextArea)
   - `lg`: 6px (Card, Table)
   - `xl`: 8px (Dropdown, Popover, Calendar)
   - `2xl`: 10px (Modal, Confirm)
5. **Layered Ambient Shadows**: Luôn dùng `.shadow-openway-dropdown`, `.shadow-openway-modal`, `.shadow-openway-card` kết hợp viền hairline siêu mảnh.
6. **Tabular Numbers**: Mọi bảng dữ liệu và đồng hồ đếm đều sử dụng `.tabular-nums` (`font-variant-numeric: tabular-nums`).
7. **Zero `any`**: 100% component và hook được định kiểu TypeScript nghiêm ngặt.
