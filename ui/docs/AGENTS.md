# 🎨 OpenWay Design System — Antigravity Guide (`@openway/ui`)

Tài liệu hướng dẫn chuyên sâu dành riêng cho **Antigravity AI Agent** khi làm việc với thư viện component `@openway/ui`.

---

## ⚡ Chỉ dẫn cấu hình cho Dự án con (Consumer Projects)

Khi cài đặt `@openway/ui` vào dự án bất kỳ, thêm đoạn sau vào file `AGENTS.md` ở thư mục gốc của dự án để Antigravity tự động kích hoạt kiến thức Design System:

```markdown
<!-- openway-ui:start -->
# OpenWay UI Components Guideline
Khi tạo mới, sửa đổi hoặc sử dụng các component UI trong dự án:
- **LUÔN LUÔN** ưu tiên sử dụng các component từ `@openway/ui` thay vì tự viết HTML thẻ trần hoặc cài thư viện ngoài.
- Đọc chi tiết danh mục và tài liệu API tại: `node_modules/@openway/ui/docs/AGENTS.md`.
- Tra cứu từng component cụ thể tại: `node_modules/@openway/ui/docs/components/<component-name>.md`.
- Với phân trang server / infinite scroll cho Select: Dùng `useSelectInfiniteQuery` từ `@openway/ui/query`.
- Tuân thủ nghiêm ngặt chuẩn TypeScript **Zero `any`** và token màu **Tailwind CSS v4**.
<!-- openway-ui:end -->
```

---

## 📦 Quy tắc Import Chuẩn

```tsx
// 1. Tất cả 32 UI Components, Icons, và Core Hooks dùng chung
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  MultiSelect,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  Slider,
  Table,
  Modal,
  Confirm,
  Dropdown,
  Popover,
  Tooltip,
  Alert,
  Badge,
  Skeleton,
  Toast,
  Tabs,
  Collapse,
  Empty,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  DateTimePicker,
  DateTimeRangePicker,
  UploadFile,
  UploadAvatar,
  UploadImage,
  FilePreview,
  Carousel,
  useInfiniteScroll,
  useDebounce,
  useDebouncedCallback,
} from "@openway/ui";

// 2. Query Hooks chuyên dụng cho TanStack Query v5 (phân trang server, infinite scroll)
import { useSelectInfiniteQuery } from "@openway/ui/query";
```

---

## 🧭 Danh mục 32 Components & Tài liệu Chi tiết

Tất cả tài liệu chi tiết của từng component được lưu trữ tại `node_modules/@openway/ui/docs/components/<name>.md`:

| Phân nhóm | Component | File Tài liệu | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Buttons & Actions** | `<Button>`, `<IconButton>` | [`button.md`](./components/button.md) | Nút bấm chính/phụ, nút icon tròn/vuông, 6 variants, loading spinner. |
| **Form Inputs** | `<Input>` | [`input.md`](./components/input.md) | Nhập văn bản, số, password với mắt ẩn/hiện, start/end content. |
| | `<Textarea>` | [`textarea.md`](./components/textarea.md) | Nhập văn bản nhiều dòng, tự động co giãn độ cao theo nội dung. |
| | `<Select>`, `<MultiSelect>` | [`select.md`](./components/select.md) | Chọn đơn/nhiều, tìm kiếm client/server, menu filters, skeleton infinite scroll. |
| | `<Checkbox>`, `<CheckboxGroup>` | [`checkbox.md`](./components/checkbox.md) | Chọn nhiều giá trị, trạng thái indeterminate, bố cục ngang/dọc. |
| | `<Radio>`, `<RadioGroup>` | [`radio.md`](./components/radio.md) | Chọn 1 trong danh sách phương án, hỗ trợ custom card option. |
| | `<Toggle>` | [`toggle.md`](./components/toggle.md) | Công tắc bật/tắt (Switch), hỗ trợ icon và nhãn mô tả. |
| | `<Slider>` | [`slider.md`](./components/slider.md) | Thanh trượt chọn giá trị số hoặc dải giá trị (Radix Slider). |
| **Data Display** | `<Table>` | [`table.md`](./components/table.md) | Bảng dữ liệu TanStack Table v9, sort, filter, pagination, row selection, resize cột. |
| | `<Badge>` | [`badge.md`](./components/badge.md) | Huy hiệu số lượng, chấm trạng thái (dot), gắn góc avatar/nút. |
| | `<Empty>` | [`empty.md`](./components/empty.md) | Màn hình thông báo không có dữ liệu, minh họa trực quan kèm nút CTA. |
| | `<Carousel>` | [`carousel.md`](./components/carousel.md) | Trình chiếu slide ảnh/nội dung, điều hướng nút bấm & dot. |
| | `<Collapse>` | [`collapse.md`](./components/collapse.md) | Danh sách xếp gọn (Accordion), mở đơn lẻ hoặc mở đồng thời nhiều mục. |
| **Feedback & Status** | `<Alert>` | [`alert.md`](./components/alert.md) | Banner cảnh báo inline: success, error, warning, info, có nút đóng. |
| | `<Skeleton>` | [`skeleton.md`](./components/skeleton.md) | Khung placeholder nhấp nháy mô phỏng layout đang tải dữ liệu. |
| | `<Toast>` | [`toast.md`](./components/toast.md) | Thông báo góc màn hình nổi (dựa trên Sonner), hỗ trợ promise toast. |
| **Navigation** | `<Tabs>` | [`tabs.md`](./components/tabs.md) | Chuyển đổi tab nội dung với thanh chỉ thị hoạt họa mượt mà. |
| | `<Dropdown>` | [`dropdown.md`](./components/dropdown.md) | Menu thả xuống cho các thao tác phụ (hành động người dùng, menu bảng). |
| **Overlays & Dialogs** | `<Modal>` | [`modal.md`](./components/modal.md) | Hộp thoại modal, khóa scroll body, hỗ trợ animation mở/đóng. |
| | `<Confirm>` | [`confirm.md`](./components/confirm.md) | Hộp thoại xác nhận hành động nguy hiểm (Xóa, Hủy) kèm trạng thái loading. |
| | `<Popover>` | [`popover.md`](./components/popover.md) | Khung thông tin phụ nổi theo phần tử neo (Floating UI). |
| | `<Tooltip>` | [`tooltip.md`](./components/tooltip.md) | Gợi ý văn bản ngắn khi hover/focus vào nút hoặc icon. |
| **Date & Time Pickers** | `<DatePicker>`, `<DateRangePicker>` | [`datepicker.md`](./components/datepicker.md), [`daterangepicker.md`](./components/daterangepicker.md) | Chọn ngày, chọn khoảng ngày với preset tiện ích (Hôm nay, Tuần này). |
| | `<TimePicker>`, `<TimeRangePicker>` | [`timepicker.md`](./components/timepicker.md), [`timerangepicker.md`](./components/timerangepicker.md) | Chọn giờ phút giây dạng cột cuộn trực quan. |
| | `<DateTimePicker>`, `<DateTimeRangePicker>` | [`datetimepicker.md`](./components/datetimepicker.md), [`datetimerangepicker.md`](./components/datetimerangepicker.md) | Chọn kết hợp cả ngày và giờ trong cùng một popup. |
| **File & Media** | `<UploadFile>` | [`upload-file.md`](./components/upload-file.md) | Tải tệp tin đa định dạng (PDF, DOCX, ZIP...), thanh tiến trình, drag & drop. |
| | `<UploadAvatar>` | [`upload-avatar.md`](./components/upload-avatar.md) | Tải và xem trước ảnh đại diện người dùng dạng hình tròn. |
| | `<UploadImage>` | [`upload-image.md`](./components/upload-image.md) | Tải nhiều ảnh dạng Dropzone hoặc Picture Wall, tích hợp modal Crop ảnh. |
| | `<FilePreview>` | [`file-preview.md`](./components/file-preview.md) | Xem trước nội dung tệp tin, hình ảnh, tài liệu trực tiếp trên giao diện. |

---

## 🪝 Utility & Query Hooks

- **[`useInfiniteScroll`](./hooks/useInfiniteScroll.md)**: Tải dữ liệu vô tận thuần React 19 qua `IntersectionObserver`, tự động kích hoạt `onLoadMore` khi sentinel vào viewport.
- **[`useDebounce` & `useDebouncedCallback`](./hooks/useDebounce.md)**: Bộ đôi hoãn cập nhật giá trị hoặc hàm callback theo mili-giây, chống spam request.
- **[`useTableQuery`](./hooks/useTableQuery.md)** (`@openway/ui/query`): Adapter kết nối TanStack Query v5 với `<Table />`, hỗ trợ phân trang máy chủ, multi-column sorting, column filtering và `keepPreviousData`.
- **[`useSelectInfiniteQuery`](./hooks/useSelectInfiniteQuery.md)** (`@openway/ui/query`): Adapter kết nối TanStack Query v5 với `<Select />` và `<MultiSelect />`, tự động cuộn tải trang, debounce từ khóa và Skeleton loading.

---

## 🎨 Quy chuẩn Design Tokens & Styling

1. **Bảng màu Tailwind CSS v4 Theme-Agnostic**:
   - Component không cố định mã màu HEX mà sử dụng các biến theme:
     `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
   - Các mức sắc độ: `50`, `100`, `200`, `300`, `400`, `500` (màu chính), `600` (hover), `700` (focus ring), `800`, `900`, `950`.
2. **Kích thước (`size`)**:
   - `xs` (24px), `sm` (32px), `md` (40px - chuẩn cho form input/nút), `lg` (48px), `xl` (56px).
3. **Bo góc (`radius`)**:
   - `none` (0px), `sm` (4px), `md` (6px), `lg` (8px - chuẩn mặc định), `xl` (12px), `full` (tròn).
4. **Hỗ trợ chế độ Tối (Dark Mode)**:
   - Tất cả component tự động thích ứng qua class Tailwind `dark:`.

---

## 🚨 Nguyên tắc cốt lõi cho AI Agent khi code

1. **KHÔNG tự chế component trần**: Khi cần nút, ô nhập, bảng, modal, dialog, picker -> Luôn import component tương ứng từ `@openway/ui`.
2. **KHÔNG dùng `any`**: Sử dụng chính xác Generic Types exported từ thư viện (ví dụ `SelectOptionItem<TData>`, `ColumnDef<TData>`).
3. **Tránh Double Debounce**: Khi dùng `useSelectInfiniteQuery`, `<Select>` đã tự động debounce từ khóa theo `debounceMs` rồi mới truyền vào `onSearch`.
4. **Trợ năng WAI-ARIA**: Khi dùng `<IconButton>`, bắt buộc phải truyền `aria-label` để màn hình đọc hỗ trợ người khiếm thị.
