# @openway/ui

> **Thư viện UI Components doanh nghiệp cao cấp (OpenWay Design System)**, được tối ưu hóa chuyên biệt cho React 19, Next.js 15/16+ và Tailwind CSS v4.

Thư viện mang trọn vẹn ngôn ngữ thiết kế hiện đại, thanh lịch: **Sắc ấm giấy than chì (Warm Paper Aesthetics)**, **Xanh lam tương tác `#2383e2`**, **Bảng màu pastel trạng thái dịu mắt**, **Bóng đổ môi trường đa tầng (Layered Ambient Shadows)**, **Bo góc tinh tế 2px–10px** và **Chuyển động dứt khoát 120ms–200ms**.

---

## 🌟 Triết Lý Thiết Kế Cốt Lõi (OpenWay Aesthetics)

1. **Content-First & Document-Centric**: Giao diện đóng vai trò là "tờ giấy trắng chất lượng cao", giảm thiểu viền thô và màu sắc chói lọi để người dùng tập trung tối đa vào dữ liệu và trường nhập liệu.
2. **Warm Paper Aesthetics**: Tuyệt đối không dùng màu đen tuyền `#000000` ở Light Mode; sử dụng sắc đen than chì ấm (`#37352f`) kết hợp nền giấy (`#f7f6f3`) giúp mắt làm việc thư giãn suốt nhiều giờ.
3. **Layered Ambient Shadows**: Sử dụng viền hairline siêu mảnh 1px bán trong suốt kết hợp 2–3 lớp bóng môi trường (`.shadow-openway-dropdown`, `.shadow-openway-modal`, `.shadow-openway-card`) để các khối nổi êm ái trên mặt phẳng.
4. **Crisp & Compact Geometry**: Thang bo góc thanh mảnh từ 2px đến 10px (`--radius-2xs: 2px` đến `--radius-2xl: 10px`), gọn gàng và chuẩn mực cho ứng dụng quản trị.
5. **Stable Numerics (Tabular Nums)**: Tất cả bảng số liệu, OtpInput, Timer, DatePicker đều tự động kích hoạt `font-variant-numeric: tabular-nums` để số có độ rộng bằng nhau tuyệt đối, không giật khung hình khi thay đổi.
6. **Snappy Micro-Interactions**: Phản hồi nút bấm và menu tức thì (`120ms - 200ms`), loại bỏ hoàn toàn viền xanh khi click chuột, chỉ kích hoạt vòng hào quang khi điều hướng bằng phím Tab.

> 📖 **Single Source of Truth**: Xem chi tiết toàn bộ quy chuẩn tại [ui/DESIGN.md](./DESIGN.md).

---

## 1. Cài đặt

```bash
pnpm add @openway/ui
# hoặc
npm install @openway/ui
# hoặc
yarn add @openway/ui
```

---

## 2. Cấu hình Stylesheet & Theme

### Cách 1: Sử dụng sẵn toàn bộ OpenWay Theme mặc định (Khuyên dùng - Nhanh nhất)

Trong file `app/globals.css` (hoặc file CSS gốc của bạn):

```css
@import "tailwindcss";

/* 1. Kích hoạt toàn bộ token Warm Neutrals, Blue, Shadows, Animations */
@import "@openway/ui/styles.css";

/* 2. Chỉ định Tailwind quét class từ thư viện */
@source "../node_modules/@openway/ui";
```

### Cách 2: Tùy biến bảng màu thương hiệu riêng qua `@theme` (Tailwind CSS v4)

Nếu dự án của bạn có màu nhận diện riêng nhưng vẫn muốn giữ hình học và bóng đổ OpenWay:

```css
@import "tailwindcss";
@import "@openway/ui/styles.css";
@source "../node_modules/@openway/ui";

@theme {
  /* Ghi đè màu thương hiệu của bạn */
  --color-primary-500: #0284c7; /* Nút chính, checkbox active */
  --color-primary-600: #0369a1; /* Hover */
  --color-primary-700: #075985; /* Focus ring */

  --color-secondary-500: #8b5cf6;
}
```

---

## 3. Cách Sử Dụng Trong Dự Án

### Trong `app/layout.tsx`:
```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

### Sử dụng Components trong trang:
```tsx
import { 
  Button, 
  Input, 
  Select, 
  DatePicker, 
  Table, 
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@openway/ui";

export default function Dashboard() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h1 className="text-xl font-semibold text-neutral-900">Quản lý dự án</h1>
        <Badge variant="soft" color="success">Đang hoạt động</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Tên công việc" placeholder="Nhập tiêu đề..." isRequired />
        <DatePicker label="Hạn hoàn thành" placeholder="Chọn ngày..." />
      </div>

      <Button color="primary" variant="filled">
        Tạo công việc mới
      </Button>
    </div>
  );
}
```

---

## 4. Danh Mục 35 Components

Tất cả 35 component đều hỗ trợ đầy đủ TypeScript type-safety (Zero `any`), WAI-ARIA, phím Tab, và tối ưu hiệu năng:

| Phân nhóm | Components | Mô tả tính năng |
| :--- | :--- | :--- |
| **Buttons & Actions** | `<Button>`, `<IconButton>` | 5 kích cỡ, 6 biến thể, bo góc 4px–8px, spinner loading mượt mà. |
| **Form Inputs & Controls** | `<Input>`, `<MultiInput>`, `<OtpInput>`, `<Textarea>`, `<FieldLabel>`, `<HelperErrorText>` | Outline chuẩn `#e3e2e0`, focus ring `#2383e2/25`, tự động co giãn textarea. |
| **Selections & Toggles** | `<Select>`, `<MultiSelect>`, `<Checkbox>`, `<CheckboxGroup>`, `<Radio>`, `<RadioGroup>`, `<Toggle>`, `<Slider>` | Menu dropdown nổi `.shadow-openway-dropdown`, checkbox bo góc 3px, toggle switch 150ms. |
| **Pickers (Ngày & Giờ)** | `<DatePicker>`, `<DateRangePicker>`, `<TimePicker>`, `<TimeRangePicker>`, `<DateTimePicker>`, `<DateTimeRangePicker>` | Calendar popup `.shadow-openway-dropdown`, chọn dải ngày liên tục, số cố định `tabular-nums`. |
| **Data Display** | `<Table>`, `<DataTable>`, `<Badge>`, `<Empty>`, `<Carousel>`, `<Collapse>` | Bảng TanStack Table v9, header nền giấy ấm `#f7f6f3`, divider mỏng `#ebeae8`, badge pastel 6 màu. |
| **Modals & Menus** | `<Modal>`, `<Confirm>`, `<Dropdown>`, `<Popover>`, `<Tooltip>`, `<Toast>` | Hộp thoại `.shadow-openway-modal`, bo góc 10px, ModalBody chống cắt cụt focus ring. |
| **Feedback & Upload** | `<Alert>`, `<Skeleton>`, `<UploadFile>`, `<UploadAvatar>`, `<UploadImage>`, `<FilePreview>` | Callout box chuẩn OpenWay, shimmer animation 1.5s, dropzone nét đứt tải tệp tin. |

---

## 5. Danh Sách Design Tokens Chuẩn

### Bảng màu Warm Neutrals (Light Mode)
```css
--color-neutral-white: #ffffff;  /* Nền Card, Nền Input */
--color-neutral-50:    #f7f6f3;  /* Nền Sidebar, Header Table, Dropzone */
--color-neutral-100:   #ebeae8;  /* Divider gạch ngang, hairline mỏng */
--color-neutral-200:   #e3e2e0;  /* Viền chính Input, Viền ngoài Table */
--color-neutral-300:   #d3d1cb;  /* Viền hover, Thumb scrollbar */
--color-neutral-400:   #9b9a97;  /* Placeholder, Muted icons */
--color-neutral-500:   #787774;  /* Chữ phụ (Secondary Text) */
--color-neutral-700:   #45443f;  /* Form Label, Section Header */
--color-neutral-900:   #37352f;  /* Màu chữ chính (Primary Text) */
```

### Bảng màu Trạng Thái & Badges (OpenWay Status Palette)
- **Thành công (Success)**: Nền `#dbeddb` / Chữ `#1c3829`
- **Cảnh báo (Warning)**: Nền `#fdecc8` / Chữ `#402c1b`
- **Lỗi (Error)**: Nền `#ffe2dd` / Chữ `#5d1715`
- **Thông tin (Info)**: Nền `#e8f4fc` / Chữ `#0b6e99` (Xanh đại dương tươi sáng)
- **Thứ cấp (Secondary / Tím)**: Nền `#e8deee` / Chữ `#412454`

### Thang Bo Góc (Border Radii)
- `--radius-2xs: 2px;`
- `--radius-xs: 3px;` (Checkbox, inline code)
- `--radius-sm: 4px;` (Nút nhỏ, sub-item, ô ngày lịch)
- `--radius-md: 5px;` (Nút chuẩn, Select, Input, TextArea)
- `--radius-lg: 6px;` (Card, Khung bảng dữ liệu)
- `--radius-xl: 8px;` (Dropdown menu, Popover panel, Calendar picker)
- `--radius-2xl: 10px;` (Modal dialog, Confirm dialog)

---

## 6. Tài Liệu Chi Tiết & Tích Hợp Antigravity AI (`docs/`)

Toàn bộ hướng dẫn API và code mẫu của từng component được lưu trữ tại thư mục [docs/](./docs/):
- **[Tài liệu Trung tâm (Master Guide)](./docs/README.md)**: Danh mục chi tiết 35 components và hooks.
- **[Antigravity Agent Guide](./docs/AGENTS.md)**: Hướng dẫn chuyên sâu cho Antigravity AI Agent.
- **[Antigravity Skill](./docs/SKILL.md)**: File định dạng Skill chuẩn (`openway-ui`).
- **[Thư mục Components](./docs/components/)**: Hướng dẫn chi tiết và bảng props của từng component.
- **[Thư mục Hooks](./docs/hooks/)**: Hướng dẫn `useTableQuery`, `useSelectInfiniteQuery`, `useInfiniteScroll`, `useDebounce`.

---

## 7. Giấy phép

Phát hành dưới giấy phép [MIT](LICENSE).
