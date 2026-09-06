# 📚 OpenWay UI — Thư viện Tài liệu Toàn diện (`@openway/ui`)

Chào mừng bạn đến với trung tâm tài liệu chính thức của **OpenWay UI Design System**. Thư mục này được đóng gói sẵn trong package `node_modules/@openway/ui/docs/` để lập trình viên và các **AI Assistant (Antigravity)** có thể tra cứu và sử dụng nhanh chóng, chuẩn xác.

---

## 🚀 Mục lục Nhanh

- [1. Hướng dẫn Tích hợp Antigravity AI](#1-hướng-dẫn-tích-hợp-antigravity-ai)
- [2. Cài đặt & Cấu hình Theme Tailwind CSS](#2-cài-đặt--cấu-hình-theme-tailwind-css)
- [3. Danh mục 32 Components](#3-danh-mục-32-components)
- [4. Danh mục Hooks (`@openway/ui` & `@openway/ui/query`)](#4-danh-mục-hooks)
- [5. Quy chuẩn Thiết kế (Design Tokens)](#5-quy-chuẩn-thiết-kế-design-tokens)

---

## 1. Hướng dẫn Tích hợp Antigravity AI

Thư viện được tối ưu hóa đặc biệt cho **Antigravity AI Agent**. Bạn có thể tận dụng ngay 2 tài liệu cốt lõi:

- **[`AGENTS.md`](./AGENTS.md)**: Bản chỉ dẫn hành vi, sitemap, quy tắc import và checklist cho Antigravity.
- **[`SKILL.md`](./SKILL.md)**: Antigravity Skill định dạng chuẩn (`openway-ui`), cho phép Antigravity tự động kích hoạt on-demand khi tạo mới hoặc sửa đổi UI.

### Cấu hình cho Dự án con (Consumer Project):
Thêm khối chỉ dẫn sau vào file `AGENTS.md` ở thư mục gốc dự án của bạn:

```markdown
<!-- openway-ui:start -->
# OpenWay UI Components
Khi viết giao diện hoặc tạo/sửa component:
1. Luôn ưu tiên dùng component có sẵn từ `@openway/ui`.
2. Tham khảo tài liệu và ví dụ code mẫu tại: `node_modules/@openway/ui/docs/AGENTS.md`.
3. Tra cứu từng component cụ thể tại: `node_modules/@openway/ui/docs/components/<component>.md`.
4. Với phân trang server / infinite scroll: dùng hook từ `@openway/ui/query`.
5. Tuyệt đối tuân thủ Zero `any` và token màu Tailwind CSS v4.
<!-- openway-ui:end -->
```

---

## 2. Cài đặt & Cấu hình Theme Tailwind CSS

### Cài đặt Package

```bash
pnpm add @openway/ui
# hoặc
npm install @openway/ui
```

### Cấu hình Bảng màu trong `app/globals.css` (Tailwind CSS v4)

Thư viện theo triết lý **Theme-Agnostic** (không cố định màu HEX, dự án tự định nghĩa màu):

```css
@import "tailwindcss";

/* 1. Quét các class của thư viện */
@source "../node_modules/@openway/ui";

/* 2. Cung cấp bảng màu thương hiệu của bạn */
@theme {
  --color-primary-500: #0284c7; /* Màu chính của nút, checkbox active... */
  --color-primary-600: #0369a1; /* Màu khi hover, active... */
  --color-primary-700: #075985; /* Màu focus ring */

  --color-secondary-500: #a855f7;
  --color-secondary-600: #9333ea;

  --color-error-500: #ef4444;
  --color-warning-500: #f59e0b;
  --color-success-500: #10b981;
  --color-info-500: #3b82f6;
}
```

---

## 3. Danh mục 32 Components

Tất cả tài liệu chi tiết của từng component được lưu trữ tại thư mục [`components/`](./components/):

### Buttons & Actions
- **[`button.md`](./components/button.md)**: Nút bấm `<Button>` và nút icon `<IconButton>`, 5 kích cỡ, 6 biến thể (`filled`, `soft`, `outline`, `ghost`, `text`, `other`), loading spinner.

### Form Inputs & Controls
- **[`input.md`](./components/input.md)**: Trường nhập văn bản `<Input>`, hiển thị mật khẩu ẩn/hiện, start/end content.
- **[`textarea.md`](./components/textarea.md)**: Vùng văn bản nhiều dòng `<Textarea>`, tự động co giãn độ cao (`autosize`).
- **[`select.md`](./components/select.md)**: Chọn đơn `<Select>` và chọn nhiều `<MultiSelect>`, tìm kiếm client/server, menu filters, skeleton infinite scroll.
- **[`checkbox.md`](./components/checkbox.md)**: Hộp kiểm `<Checkbox>` và nhóm `<CheckboxGroup>`, trạng thái indeterminate, bố cục flex.
- **[`radio.md`](./components/radio.md)**: Nút chọn 1 phương án `<Radio>` và nhóm `<RadioGroup>`, hỗ trợ giao diện dạng thẻ card.
- **[`toggle.md`](./components/toggle.md)**: Công tắc gạt `<Toggle>` (Switch), hỗ trợ icon bật/tắt và nhãn mô tả.
- **[`slider.md`](./components/slider.md)**: Thanh trượt `<Slider>` chọn số hoặc dải giá trị (Radix UI Slider).

### Data Display
- **[`table.md`](./components/table.md)**: Bảng dữ liệu mạnh mẽ `<Table>` (TanStack Table v9), sắp xếp, lọc cột, phân trang, resize cột.
- **[`badge.md`](./components/badge.md)**: Huy hiệu `<Badge>` đếm số, chấm trạng thái (dot), gắn góc avatar/nút.
- **[`empty.md`](./components/empty.md)**: Màn hình trống `<Empty>` hiển thị khi không có dữ liệu kèm nút hành động CTA.
- **[`carousel.md`](./components/carousel.md)**: Trình chiếu slide `<Carousel>`, điều hướng nút bấm, autoplay, pagination dots.
- **[`collapse.md`](./components/collapse.md)**: Khối thu gọn `<Collapse>` (Accordion), hỗ trợ mở đơn mục hoặc đa mục.

### Feedback & Status
- **[`alert.md`](./components/alert.md)**: Khung cảnh báo inline `<Alert>` (success, error, warning, info), nút đóng dismiss.
- **[`skeleton.md`](./components/skeleton.md)**: Khung placeholder nhấp nháy `<Skeleton>` giả lập layout đang tải.
- **[`toast.md`](./components/toast.md)**: Thông báo góc màn hình `<Toast>` (Sonner), hỗ trợ promise toast.

### Navigation & Overlays
- **[`tabs.md`](./components/tabs.md)**: Chuyển đổi thẻ `<Tabs>`, thanh chỉ thị hoạt họa mượt mà.
- **[`dropdown.md`](./components/dropdown.md)**: Menu thả xuống `<Dropdown>` cho các thao tác phụ.
- **[`modal.md`](./components/modal.md)**: Hộp thoại `<Modal>`, khóa cuộn màn hình, hiệu ứng animation.
- **[`confirm.md`](./components/confirm.md)**: Hộp thoại xác nhận nguy hiểm `<Confirm>` (Xóa, Hủy) kèm loading state.
- **[`popover.md`](./components/popover.md)**: Khung nổi `<Popover>` neo theo phần tử (Floating UI).
- **[`tooltip.md`](./components/tooltip.md)**: Chú thích nhanh `<Tooltip>` khi hover/focus.

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

1. **Zero `any`**: 100% các component và hook đều được khai báo TypeScript chặt chẽ, type-safe.
2. **5 Kích thước Chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - chuẩn form), `lg` (48px), `xl` (56px).
3. **Độ Bo Góc Chuẩn (`radius`)**: `none` (0px), `sm` (4px), `md` (6px), `lg` (8px - chuẩn mặc định), `xl` (12px), `full` (tròn).
