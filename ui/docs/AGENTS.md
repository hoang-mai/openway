# 🎨 OpenWay Design System — Antigravity Guide (`@openway/ui`)

> **Tài liệu hướng dẫn chuyên sâu dành riêng cho Antigravity AI Agent khi phát triển và bảo trì giao diện theo chuẩn OpenWay Design System.**

---

## ⚡ Chỉ dẫn cấu hình cho Dự án con (Consumer Projects)

Khi cài đặt `@openway/ui` vào dự án bất kỳ, thêm đoạn sau vào file `AGENTS.md` ở thư mục gốc của dự án để Antigravity tự động kích hoạt kiến thức Design System:

```markdown
<!-- openway-ui:start -->
# OpenWay UI Components Guideline
Khi tạo mới, sửa đổi hoặc sử dụng các component UI trong dự án:
- **LUÔN LUÔN** ưu tiên sử dụng các component từ `@openway/ui` thay vì tự viết HTML thẻ trần hoặc cài thư viện ngoài.
- **Phong cách thiết kế**: Tuân thủ chuẩn OpenWay Design System (Sắc ấm giấy than chì `#f7f6f3`/`#37352f`, xanh tương tác `#2383e2`, bóng môi trường đa tầng `.shadow-openway-*`, bo góc tinh tế 2px–10px, chuyển động 120ms–200ms).
- Đọc chi tiết danh mục và tài liệu API tại: `node_modules/@openway/ui/docs/AGENTS.md`.
- Bản quy chuẩn gốc (Single Source of Truth): `node_modules/@openway/ui/DESIGN.md`.
- Tra cứu từng component cụ thể tại: `node_modules/@openway/ui/docs/components/<component-name>.md`.
- Với phân trang server / infinite scroll cho Select: Dùng `useSelectInfiniteQuery` từ `@openway/ui/query`.
- Tuân thủ nghiêm ngặt chuẩn TypeScript **Zero `any`** và token màu **Tailwind CSS v4**.
<!-- openway-ui:end -->
```

---

## 📦 Quy tắc Import Chuẩn

```tsx
// 1. Tất cả 36 UI Components, Icons, và Core Hooks dùng chung
import {
  Button,
  IconButton,
  Input,
  MultiInput,
  OtpInput,
  FieldLabel,
  HelperErrorText,
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
  DataTable,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
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
  Typography,
  Text,
  useInfiniteScroll,
  useDebounce,
  useDebouncedCallback,
} from "@openway/ui";

// 2. Query Hooks chuyên dụng cho TanStack Query v5 (phân trang server, infinite scroll)
import { useTableQuery, useSelectInfiniteQuery } from "@openway/ui/query";
```

---

## 🧭 Danh mục 36 Components & Tài liệu Chi tiết

Tất cả tài liệu chi tiết của từng component được lưu trữ tại `node_modules/@openway/ui/docs/components/<name>.md`:

| Phân nhóm | Component | File Tài liệu | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Typography & Content**| `<Typography>`, `<Text>` | [`typography.md`](./components/typography.md) | Hệ thống văn bản & khối nội dung chuẩn 100% Notion Design System (h1–h6, p, code đỏ #eb5757, quote 3px, 10 màu Notion, copyable, ellipsis, tabular). |
| **Buttons & Actions** | `<Button>`, `<IconButton>` | [`button.md`](./components/button.md) | Nút chính xanh `#2383e2`, nút phụ viền `#e3e2e0`, bo góc 4px–8px, loading spinner. |
| **Form Inputs** | `<Input>`, `<MultiInput>`, `<OtpInput>` | [`input.md`](./components/input.md) | Viền `#e3e2e0 hover:border-[#d3d1cb]`, focus ring `#2383e2/25`, con trỏ than chì. |
| | `<Textarea>` | [`textarea.md`](./components/textarea.md) | Nhập nhiều dòng, auto-resize, thanh cuộn mỏng `.ui-scrollbar`. |
| | `<Select>`, `<MultiSelect>` | [`select.md`](./components/select.md) | Chọn đơn/nhiều, dropdown nổi `.shadow-openway-dropdown`, search tích hợp. |
| | `<Checkbox>`, `<CheckboxGroup>` | [`checkbox.md`](./components/checkbox.md) | Checkbox bo góc 3px (`rounded-xs`), icon check trắng, group linh hoạt. |
| | `<Radio>`, `<RadioGroup>` | [`radio.md`](./components/radio.md) | Chọn 1 phương án, viền 1.3px, chấm xanh giữa 8px. |
| | `<Toggle>` | [`toggle.md`](./components/toggle.md) | Công tắc switch bật/tắt, track chuyển màu 150ms. |
| | `<Slider>` | [`slider.md`](./components/slider.md) | Thanh trượt chọn số/dải giá trị, thumb `.shadow-openway-card`. |
| **Data Display** | `<Table>`, `<DataTable>` | [`table.md`](./components/table.md) | Bảng TanStack Table v9, header giấy `#f7f6f3`, divider `#ebeae8`, `tabular-nums`. |
| | `<Badge>` | [`badge.md`](./components/badge.md) | 6 màu Pastel (Success, Warning, Error, Info, Secondary, Neutral). |
| | `<Empty>` | [`empty.md`](./components/empty.md) | Minh họa rỗng tối giản trên nền `#f7f6f3` bo tròn kèm CTA. |
| | `<Carousel>` | [`carousel.md`](./components/carousel.md) | Slide trình chiếu, phím điều hướng kính mờ. |
| | `<Collapse>` | [`collapse.md`](./components/collapse.md) | Toggle list, icon tam giác xoay 90deg thụt lề divider. |
| **Feedback & Status** | `<Alert>` | [`alert.md`](./components/alert.md) | Callout box trên nền giấy hoặc pastel trạng thái. |
| | `<Skeleton>` | [`skeleton.md`](./components/skeleton.md) | Hiệu ứng shimmer quét mờ 1.5s giữa `#ebeae8` và `#f7f6f3`. |
| | `<Toast>` | [`toast.md`](./components/toast.md) | Thông báo góc màn hình đổ bóng `.shadow-openway-modal`. |
| **Navigation & Overlays**| `<Tabs>` | [`tabs.md`](./components/tabs.md) | Tab gạch chân xanh `#2383e2` hoặc tab pill nền `#ebeae8`. |
| | `<Dropdown>` | [`dropdown.md`](./components/dropdown.md) | Menu nổi `.shadow-openway-dropdown`, hover `#f1f1ef`, hotkey hint. |
| | `<Modal>`, `<Confirm>` | [`modal.md`](./components/modal.md), [`confirm.md`](./components/confirm.md) | Khung thoại `.shadow-openway-modal`, bo góc 10px, ModalBody chống cắt ring. |
| | `<Popover>` | [`popover.md`](./components/popover.md) | Khung nổi neo theo phần tử kích hoạt. |
| | `<Tooltip>` | [`tooltip.md`](./components/tooltip.md) | Chú thích đen than chì ấm `#37352f text-white` bo góc 4px. |
| **Date & Time Pickers** | `<DatePicker>`, `<DateRangePicker>` | [`datepicker.md`](./components/datepicker.md), [`daterangepicker.md`](./components/daterangepicker.md) | Khung lịch `.shadow-openway-dropdown`, dải ngày chọn `#edf5fc`. |
| | `<TimePicker>`, `<TimeRangePicker>` | [`timepicker.md`](./components/timepicker.md), [`timerangepicker.md`](./components/timerangepicker.md) | Cột cuộn giờ phút giây thanh mảnh `.ui-scrollbar`. |
| | `<DateTimePicker>`, `<DateTimeRangePicker>` | [`datetimepicker.md`](./components/datetimepicker.md), [`datetimerangepicker.md`](./components/datetimerangepicker.md) | Tích hợp 2 ngăn: lịch ngày bên trái và cột giờ bên phải. |
| **File & Media** | `<UploadFile>` | [`upload-file.md`](./components/upload-file.md) | Tải tệp đa định dạng, nét đứt `#d3d1cb`, dnd zone. |
| | `<UploadAvatar>` | [`upload-avatar.md`](./components/upload-avatar.md) | Tải ảnh đại diện tròn/vuông kèm xem trước. |
| | `<UploadImage>` | [`upload-image.md`](./components/upload-image.md) | Dropzone ảnh, picture wall, modal crop. |
| | `<FilePreview>` | [`file-preview.md`](./components/file-preview.md) | Xem trước tài liệu, ảnh, video. |

---

## 🪝 Utility & Query Hooks

- **[`useInfiniteScroll`](./hooks/useInfiniteScroll.md)**: Tải dữ liệu vô tận thuần React 19 qua `IntersectionObserver`, tự động kích hoạt `onLoadMore` khi sentinel vào viewport.
- **[`useDebounce` & `useDebouncedCallback`](./hooks/useDebounce.md)**: Hoãn cập nhật giá trị hoặc hàm callback theo mili-giây, chống spam API.
- **[`useTableQuery`](./hooks/useTableQuery.md)** (`@openway/ui/query`): Adapter kết nối TanStack Query v5 với `<Table />`, hỗ trợ phân trang máy chủ, multi-column sorting, column filtering và `keepPreviousData`.
- **[`useSelectInfiniteQuery`](./hooks/useSelectInfiniteQuery.md)** (`@openway/ui/query`): Adapter kết nối TanStack Query v5 với `<Select />` và `<MultiSelect />`, tự động cuộn tải trang, debounce từ khóa và Skeleton loading.

---

## 🎨 Quy chuẩn Design Tokens (Bắt Buộc Cho AI Agent)

1. **Warm Paper Palette**:
   - **Tuyệt đối KHÔNG dùng `#000000`** cho chữ hoặc icon ở Light Mode.
   - Chữ chính: `#37352f` (`neutral-900`), Chữ phụ: `#787774` (`neutral-500`), Label: `#45443f` (`neutral-700`).
   - Nền canvas: `#ffffff` (`neutral-white`), Nền phụ / header: `#f7f6f3` (`neutral-50`).
   - Viền chính: `#e3e2e0` (`neutral-200`), Viền mỏng divider: `#ebeae8` (`neutral-100`).
2. **Interactive Blue**:
   - Nút chính, checkbox active: `#2383e2` (`primary-500`), hover `#1b6ec2` (`primary-600`), focus ring: `ring-primary-500/25`.
3. **Bảng màu Pastel Trạng Thái**:
   - Success: Nền `#dbeddb`, Chữ `#1c3829`
   - Warning: Nền `#fdecc8`, Chữ `#402c1b`
   - Error: Nền `#ffe2dd`, Chữ `#5d1715`
   - Info: Nền `#e8f4fc`, Chữ `#0b6e99`
4. **Đổ Bóng Đa Tầng (Layered Ambient Shadows)**:
   - Dùng `.shadow-openway-dropdown` cho Select, Dropdown, Popover, Calendar.
   - Dùng `.shadow-openway-modal` cho Modal, Confirm, Toast.
   - Dùng `.shadow-openway-card` cho Card, Tooltip, Floating elements.
5. **Bo Góc Chuẩn (@theme Geometry)**:
   - Checkbox: `rounded-xs` (3px)
   - Nút nhỏ, sub-item: `rounded-sm` (4px)
   - Nút chuẩn, Input, Select, TextArea: `rounded-md` (5px)
   - Card, Table: `rounded-lg` (6px)
   - Dropdown, Popover: `rounded-xl` (8px)
   - Modal dialog: `rounded-2xl` (10px)
6. **Chữ Số Cố Định (Tabular Nums)**:
   - Khi hiển thị dữ liệu bảng, OtpInput, ngày giờ, số liệu tài chính: luôn dùng class `.tabular-nums`.

---

## 🚨 Nguyên tắc cốt lõi cho AI Agent khi code

1. **KHÔNG tự chế component trần**: Khi cần nút, ô nhập, bảng, modal, dialog, picker -> Luôn import component tương ứng từ `@openway/ui`.
2. **KHÔNG dùng `any`**: Sử dụng chính xác Generic Types exported từ thư viện (ví dụ `SelectOptionItem<TData>`, `ColumnDef<TData>`).
3. **KHÔNG hardcode mã màu HEX trực tiếp trong className**: Luôn dùng token semantic như `bg-neutral-50`, `border-neutral-200`, `text-neutral-900`, `text-primary-600`.
4. **Modal Alignment**: Khi dựng form bên trong `<ModalBody>`, thẻ con tự động căn thẳng hàng với ModalHeader mà không bao giờ bị cắt cụt viền hào quang focus ring (`ring-2`).
5. **Trợ năng WAI-ARIA**: Khi dùng `<IconButton>`, bắt buộc phải truyền `aria-label` để màn hình đọc hỗ trợ người khiếm thị.
