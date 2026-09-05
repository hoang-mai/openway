# 📢 Alert Component (`@owa/ui`)

Component **Alert** hiển thị thông báo, cảnh báo theo ngữ cảnh (Inline Alert / Banner) với hiệu năng cao, thiết kế chuẩn **Design System**, **Pure Stateless Component** (0 dependencies) và hỗ trợ đầy đủ **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Pure Stateless Component**: Hoàn toàn không phụ thuộc vào global store (Zustand/Redux). Render trực tiếp tại bất kỳ vị trí nào trong cây JSX.
- **Tự động đóng thông minh (`closable`)**: Mặc định `closable={true}`, khi bấm nút `(X)` Alert sẽ **tự động đóng/ẩn ngay lập tức** mà không bắt buộc phải viết hàm `onClose`. Nếu có truyền callback `onClose`, Alert sẽ tự động kích hoạt callback này.
- **Hỗ trợ linh hoạt cả `description` & `children`**: Cho phép truyền nội dung mô tả qua prop `description` (chuỗi text hoặc JSX ngắn) hoặc bọc qua `children` (JSX phức tạp).
- **5 Kích thước tiêu chuẩn (`size`)**: `xs`, `sm`, `md` *(mặc định)*, `lg`, `xl` với typography và spacing được căn chỉnh chính xác.
- **6 Biến thể giao diện (`variant`)**:
  - `soft` *(mặc định)*: Nền pastel nhạt, viền mờ 2px tinh tế.
  - `filled`: Nền màu đậm, chữ trắng tương phản cao.
  - `outline`: Nền trắng, viền rõ nét theo màu chủ đề.
  - `accent-left`: Nền pastel kèm viền nhấn bên trái dày 4px (`border-l-4`).
  - `ghost`: Nền và viền trong suốt.
  - `other`: Bỏ qua các class màu mặc định, tự do tùy biến màu sắc qua `className`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info` *(mặc định)*.
- **Tùy chỉnh bo góc (`radius`)**: `none`, `sm`, `md`, `lg` *(mặc định)*, `xl`, `full`.
- **Chế độ Banner (`banner`)**: Chiều rộng 100% (`w-full`), góc vuông phẳng (`rounded-none`), không viền 2 bên (`border-x-0`), thích hợp gắn cố định trên đầu trang.
- **Hỗ trợ Icon thông minh (`icon`)**:
  - Tự động hiển thị icon SVG chuẩn theo `color` (`CheckCircleIcon`, `AlertTriangleIcon`, `AlertCircleIcon`, `InfoCircleIcon`).
  - Tắt icon dễ dàng với `icon={false}`.
  - Hỗ trợ truyền custom icon dạng JSX (`ReactNode`).
- **Action Slot (`action`)**: Vùng chuyên biệt để chèn nút bấm, liên kết thao tác nhanh.
- **Chuẩn Accessibility (A11y)**:
  - Tự động thiết lập `role="alert"` và `aria-live="assertive"` cho các trạng thái nguy cấp (`error`, `warning`).
  - Thiết lập `role="status"` và `aria-live="polite"` cho các trạng thái thông thường (`info`, `success`, `primary`, `secondary`, `neutral`).

---

## 🚀 Cài đặt & Import

```tsx
import { Alert } from "@owa/ui";
import type { AlertProps, AlertColor, AlertVariant, AlertSize, AlertRadius } from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản (Inline Alert)

Bạn có thể truyền nội dung thông báo qua prop `description` hoặc qua thẻ con `children`:

```tsx
import { Alert } from "@owa/ui";

// Cách 1: Sử dụng prop description (ngắn gọn)
export function BasicAlertExample() {
  return (
    <Alert
      color="info"
      variant="soft"
      title="Thông tin hệ thống"
      description="Hệ thống sẽ tiến hành bảo trì định kỳ vào cuối tuần này."
    />
  );
}

// Cách 2: Sử dụng children (dành cho JSX tùy biến)
export function ChildrenAlertExample() {
  return (
    <Alert color="success" title="Đã lưu thành công!">
      <p className="mt-1">Dữ liệu hồ sơ của bạn đã được cập nhật.</p>
    </Alert>
  );
}
```

---

### 2. Tự động đóng thông báo (`closable` & `onClose`)

Nút đóng `(X)` mặc định luôn bật (`closable=true`). Người dùng có thể click để tắt thông báo ngay mà **không cần truyền bất kỳ hàm nào**:

```tsx
// 1. Tự động đóng/ẩn ngay khi click (x) mà không cần viết thêm hàm gì:
<Alert title="Thông báo" description="Click nút x bên phải sẽ tự ẩn thông báo này." />

// 2. Tự động đóng kèm theo callback onClose (nếu muốn xử lý thêm logic):
<Alert
  title="Thông báo"
  description="Thực hiện logic khi người dùng tắt thông báo."
  onClose={() => console.log("Alert đã được đóng!")}
/>

// 3. Tắt nút đóng (không cho người dùng đóng):
<Alert closable={false} title="Thông báo bắt buộc" description="Nội dung không thể đóng." />
```

---

### 3. Các chủ đề màu sắc (`color`)

Component cung cấp 7 tông màu chuẩn Design System:

```tsx
<Alert color="primary" title="Primary" description="Thông báo chính của ứng dụng." />
<Alert color="secondary" title="Secondary" description="Thông báo phụ bổ sung thông tin." />
<Alert color="neutral" title="Neutral" description="Thông báo trung tính dạng ghi chú." />
<Alert color="info" title="Info" description="Thông tin hướng dẫn sử dụng." />
<Alert color="success" title="Success" description="Dữ liệu đã được lưu thành công." />
<Alert color="warning" title="Warning" description="Dung lượng bộ nhớ đã đạt mức 90%." />
<Alert color="error" title="Error" description="Không thể kết nối đến máy chủ." />
```

---

### 4. Các biến thể giao diện (`variant`)

```tsx
// 1. Soft (Mặc định)
<Alert variant="soft" color="success" title="Soft Variant" description="Nền pastel nhạt, chữ và viền cùng tông màu." />

// 2. Filled
<Alert variant="filled" color="error" title="Filled Variant" description="Nền màu đậm, độ tương phản cao, nổi bật." />

// 3. Outline
<Alert variant="outline" color="primary" title="Outline Variant" description="Nền trắng, viền rõ nét theo màu chủ đề." />

// 4. Accent Left
<Alert variant="accent-left" color="warning" title="Accent Left Variant" description="Nền pastel kèm viền nhấn dày 4px bên trái." />

// 5. Ghost
<Alert variant="ghost" color="info" title="Ghost Variant" description="Nền và viền trong suốt, chỉ hiển thị icon và chữ." />

// 6. Other (Tự do tùy biến)
<Alert
  variant="other"
  className="bg-purple-100 text-purple-900 border-2 border-purple-300"
  title="Other Variant"
  description="Tự do áp dụng class Tailwind tùy chỉnh bên ngoài."
/>
```

---

### 5. Kích cỡ (`size`) & Độ bo góc (`radius`)

```tsx
// 5 kích cỡ tiêu chuẩn
<Alert size="xs" title="Size XS" description="Thông báo kích cỡ rất nhỏ" />
<Alert size="sm" title="Size SM" description="Thông báo kích cỡ nhỏ" />
<Alert size="md" title="Size MD" description="Thông báo kích cỡ vừa (mặc định)" />
<Alert size="lg" title="Size LG" description="Thông báo kích cỡ lớn" />
<Alert size="xl" title="Size XL" description="Thông báo kích cỡ rất lớn" />

// Tùy chỉnh độ bo góc
<Alert radius="none" title="Không bo góc" description="Góc vuông 0px" />
<Alert radius="sm" title="Bo góc nhỏ" description="rounded-sm" />
<Alert radius="md" title="Bo góc vừa" description="rounded-md" />
<Alert radius="lg" title="Bo góc lớn" description="rounded-lg (mặc định)" />
<Alert radius="xl" title="Bo góc rất lớn" description="rounded-xl" />
<Alert radius="full" title="Bo tròn" description="rounded-2xl" />
```

---

### 6. Chế độ Banner (`banner`)

Chế độ Banner giúp thông báo trải rộng toàn bộ chiều ngang (`w-full`), loại bỏ bo góc (`rounded-none`) và viền 2 bên, rất phù hợp gắn cố định trên cùng màn hình:

```tsx
<Alert
  banner
  color="error"
  title="Sự cố đường truyền"
  description="Hiện tại một số dịch vụ thanh toán đang bị gián đoạn."
  action={
    <button className="text-xs underline font-medium cursor-pointer">
      Xem chi tiết
    </button>
  }
/>
```

---

### 7. Icon tùy biến & Action Slot

```tsx
import { Alert, Button } from "@owa/ui";

export function AdvancedAlertExample() {
  return (
    <div className="space-y-4">
      {/* Ẩn Icon */}
      <Alert icon={false} color="neutral" title="Không có icon" description="Nội dung không kèm icon đầu dòng." />

      {/* Custom Icon bằng JSX */}
      <Alert
        icon={<span className="text-lg">🚀</span>}
        color="primary"
        title="Tính năng mới"
        description="Trải nghiệm phiên bản 2.0 với nhiều cải tiến vượt bậc."
      />

      {/* Action Slot kèm Button */}
      <Alert
        color="info"
        title="Bản cập nhật mới sẵn sàng"
        description="Vui lòng tải lại ứng dụng để áp dụng bản vá mới nhất."
        action={
          <Button size="xs" variant="filled" color="info">
            Cập nhật ngay
          </Button>
        }
      />
    </div>
  );
}
```

---

## 🛠️ API Reference (`AlertProps`)

Component `Alert` nhận các props mở rộng từ thẻ HTML chuẩn `HTMLAttributes<HTMLDivElement>` (ngoại trừ prop `title`):

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Kích cỡ của Alert (ảnh hưởng padding, font size, icon size). |
| `variant` | `"soft" \| "filled" \| "outline" \| "accent-left" \| "ghost" \| "other"` | `"soft"` | Biến thể giao diện và phong cách hiển thị màu sắc. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"info"` | Chủ đề màu sắc theo Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"` | Độ bo góc của khung thông báo. |
| `title` | `ReactNode` | `undefined` | Tiêu đề in đậm của Alert. |
| `description` | `ReactNode` | `undefined` | Nội dung mô tả ngắn của thông báo. |
| `children` | `ReactNode` | `undefined` | Nội dung mô tả tùy biến bằng JSX bên trong Alert. |
| `icon` | `ReactNode \| boolean` | `true` | Icon đầu thông báo: `true` = tự động theo màu, `false` = ẩn, `ReactNode` = custom icon. |
| `action` | `ReactNode` | `undefined` | Phần tử hành động phụ nằm ở góc phải (Button, Link, Tag). |
| `closable` | `boolean` | `true` | Hiển thị nút đóng `(X)` và tự động ẩn Alert khi click. |
| `onClose` | `() => void` | `undefined` | Callback được gọi khi người dùng bấm nút đóng. |
| `closeAriaLabel` | `string` | `"Close alert"` | Nhãn trợ năng (accessibility) cho nút đóng. |
| `banner` | `boolean` | `false` | Bật chế độ Banner: Full width (`w-full`), góc vuông (`rounded-none`), không viền 2 bên. |
| `titleClassName` | `string` | `""` | Tùy biến className riêng cho phần tiêu đề (`title`). |
| `descriptionClassName` | `string` | `""` | Tùy biến className riêng cho phần nội dung (`description` / `children`). |
| `actionClassName` | `string` | `""` | Tùy biến className riêng cho vùng `action`. |
| `iconClassName` | `string` | `""` | Tùy biến className riêng cho vùng chứa icon. |
| `closeButtonClassName` | `string` | `""` | Tùy biến className riêng cho nút đóng `(X)`. |
| `className` | `string` | `""` | Class tùy biến cho khung container bao ngoài. |
| `role` | `string` | Tự động | ARIA role (`"alert"` cho error/warning, `"status"` cho các màu khác). |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref chuyển tiếp đến phần tử thẻ `<div>` bọc ngoài. |
