# 🎚️ Toggle Component (`@owa/ui`)

Component **Toggle** (Switch công tắc) hiện đại, linh hoạt, tương tác cao, thiết kế chuẩn **Design System**, hỗ trợ **Safe Config Fallback**, **Start/End Content & Thumb Icons**, **Loading & Spinners**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility** (`role="switch"`).

---

## 🌟 Điểm nổi bật

- **5 Kích thước tiêu chuẩn (`size`)**:
  - `xs`: Track 28x16px, thumb 12px, text 12px.
  - `sm`: Track 36x20px, thumb 14px, text 14px.
  - `md` *(mặc định)*: Track 44x24px, thumb 20px, text 14px.
  - `lg`: Track 52x28px, thumb 24px, text 16px.
  - `xl`: Track 64x36px, thumb 28px, text 18px.
- **4 Biến thể giao diện (`variant`)**:
  - `filled` *(mặc định)*: Nền track màu đặc tương phản cao khi bật.
  - `outline`: Nền track trong suốt/trắng, viền và thumb mang màu chủ đề.
  - `soft`: Nền track pastel dịu nhẹ theo tone màu chủ đề.
  - `other`: Bỏ qua style mặc định, tự do tùy biến hoàn toàn qua `trackClassName` và `thumbClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius` & `thumbRadius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full` *(mặc định: `full`)*.
- **2 Vị trí đặt nhãn (`labelPlacement`)**:
  - `right` *(mặc định)*: Toggle bên trái, nhãn bên phải.
  - `left`: Nhãn bên trái, toggle bên phải.
- **Tùy biến Icon & Nội dung linh hoạt**:
  - `thumbIcon`: Icon tùy biến bên trong nút trượt (hỗ trợ cả ReactNode tĩnh hoặc function `({ isChecked, className }) => ReactNode`).
  - `startContent` & `endContent`: Icon / nội dung hiển thị trực tiếp trong lòng thanh trượt (track).
- **Trạng thái Loading & Spinners (`isLoading`)**:
  - Tự động hiển thị spinner xoay tròn bên trong nút trượt (thumb) và khóa tương tác (`disabled`).
- **Trạng thái Báo lỗi & Hướng dẫn (`isInvalid`, `errorMessage`, `helperText`)**:
  - Tự động chuyển đổi màu viền báo lỗi và hiển thị animation mở rộng mượt mà.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo an toàn tuyệt đối khi truyền props sai hoặc không tồn tại.
- **React 19 Ref Forwarding**: Tích hợp `useMergeRefs` chuyển tiếp ref trực tiếp đến thẻ `<input type="checkbox" role="switch">`.

---

## 🚀 Cài đặt & Import

```tsx
import { Toggle } from "@owa/ui";
import type {
  ToggleProps,
  ToggleConfig,
  ToggleSize,
  ToggleVariant,
  ToggleColor,
  ToggleRadius,
  ToggleLabelPlacement,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { Toggle } from "@owa/ui";

export function BasicToggleExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
      label="Bật tính năng thông báo"
    />
  );
}
```

---

### 2. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Label bên phải (Mặc định)
<Toggle label="Label bên phải" labelPlacement="right" />

// 2. Label bên trái
<Toggle label="Label bên trái" labelPlacement="left" />
```

---

### 3. Biến thể (`variant`) & Màu sắc (`color`)

```tsx
// Filled (mặc định)
<Toggle variant="filled" color="primary" label="Primary Filled" defaultChecked />
<Toggle variant="filled" color="success" label="Success Filled" defaultChecked />

// Outline
<Toggle variant="outline" color="primary" label="Primary Outline" defaultChecked />

// Soft (Pastel)
<Toggle variant="soft" color="secondary" label="Secondary Soft" defaultChecked />

// Other (Custom gradient)
<Toggle
  variant="other"
  trackClassName="bg-gradient-to-r from-purple-600 to-pink-500 border-0"
  thumbClassName="bg-white text-purple-600 shadow-md"
  label="Custom Gradient"
  defaultChecked
/>
```

---

### 4. Icon bên trong Thumb & Start/End Content

```tsx
// Static icon trong Thumb
<Toggle thumbIcon={<span>🔒</span>} label="Bảo mật" />

// Dynamic icon thay đổi theo trạng thái checked
<Toggle
  thumbIcon={({ isChecked }) => (
    <span>{isChecked ? "🌙" : "☀️"}</span>
  )}
  label="Chế độ giao diện"
/>

// Start / End Content nằm trong Track
<Toggle
  startContent="☀️"
  endContent="🌙"
  size="lg"
  label="Ngày & Đêm"
/>
```

---

### 5. Trạng thái Loading, Error & Helper Text

```tsx
// Trạng thái Loading (qua config)
<Toggle config={{ isLoading: true }} label="Đang đồng bộ dữ liệu..." />

// Trạng thái Báo lỗi & Bắt buộc
<Toggle
  config={{ isRequired: true }}
  errorMessage="Bạn phải đồng ý với điều khoản dịch vụ!"
  label="Tôi đồng ý với điều khoản"
/>

// Helper text hướng dẫn
<Toggle
  label="Xác thực 2 bước"
  helperText="Nhận mã OTP qua số điện thoại đã đăng ký."
/>
```

---

### 6. Cấu hình tập trung qua prop `config` (`ToggleConfig`)

```tsx
<Toggle
  label="Tự động sao lưu"
  config={{
    isRequired: true,
    isLoading: false,
    isInvalid: false,
  }}
/>
```

---

## 🛠 Bảng thông số Props (`ToggleProps`)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ toggle (track, thumb, font label, khoảng cách). |
| `variant` | `'filled' \| 'outline' \| 'soft' \| 'other'` | `'filled'` | Biến thể hiển thị giao diện khi toggle ở trạng thái bật. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Độ bo góc của thanh trượt (track). |
| `thumbRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Độ bo góc của nút trượt (thumb). |
| `config` | `ToggleConfig` | — | Cấu hình tập trung các cờ trạng thái (`isRequired`, `isInvalid`, `isLoading`). |
| `label` | `ReactNode` | — | Nhãn văn bản hiển thị cạnh toggle. |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | Vị trí hiển thị của nhãn so với toggle. |
| `checked` | `boolean` | — | Trạng thái bật/tắt (Controlled). |
| `defaultChecked` | `boolean` | `false` | Trạng thái mặc định ban đầu (Uncontrolled). |
| `disabled` | `boolean` | `false` | Vô hiệu hóa tương tác của toggle. |
| `readOnly` | `boolean` | `false` | Chế độ chỉ đọc, không cho phép đổi trạng thái. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn/trợ giúp bên dưới. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi (tự động kích hoạt trạng thái báo lỗi). |
| `thumbIcon` | `ReactNode \| (({ isChecked, className }) => ReactNode)` | — | Icon hiển thị bên trong nút trượt (thumb). |
| `startContent` | `ReactNode` | — | Nội dung/icon hiển thị bên trong track (phía bên trái khi bật). |
| `endContent` | `ReactNode` | — | Nội dung/icon hiển thị bên trong track (phía bên phải khi tắt). |
| `wrapperClassName` | `string` | — | ClassName tùy biến cho container bao bọc (toggle + label). |
| `trackClassName` | `string` | — | ClassName tùy biến cho thanh trượt (track). |
| `thumbClassName` | `string` | — | ClassName tùy biến cho nút trượt (thumb). |
| `labelClassName` | `string` | — | ClassName tùy biến cho nhãn `<label>`. |
| `helperClassName` | `string` | — | ClassName tùy biến cho đoạn văn bản helperText / errorMessage. |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp đến thẻ `<input>` bên dưới. |

### Cấu hình `ToggleConfig`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu `*` đỏ và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Kích hoạt giao diện báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác (`aria-busy="true"`). |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner bên trong nút trượt (thumb) khi `isLoading = true`. |
