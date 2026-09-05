# 🔘 Button & IconButton Component (`@owa/ui`)

Bộ component **Button** & **IconButton** tương tác cao, thiết kế chuẩn **Design System**, hỗ trợ **trạng thái Loading linh hoạt**, **Safe Config Fallback** và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Pure Stateless & Hiệu năng cao**: Tối ưu hóa render, không phụ thuộc vào global store, dễ dàng sử dụng và mở rộng.
- **2 Biến thể Component tiện dụng**:
  - `<Button>`: Nút bấm tiêu chuẩn kèm văn bản, icon trái/phải, chế độ full width.
  - `<IconButton>`: Nút bấm chỉ chứa icon hình tròn / vuông, bắt buộc nhãn `aria-label` cho trợ năng (Screen Reader).
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px) với chiều cao, padding, font size và kích cỡ icon được căn chuẩn theo tỷ lệ.
- **6 Biến thể giao diện (`variant`)**:
  - `filled` *(mặc định)*: Nền màu đậm, chữ trắng tương phản cao, nổi bật các hành động chính (Primary CTA).
  - `soft`: Nền pastel nhạt, chữ và viền cùng tông màu, thích hợp cho hành động phụ.
  - `outline`: Nền trong suốt, viền đôi 2px rõ nét, hover đổi màu nền nhẹ.
  - `ghost`: Nền và viền trong suốt, hiển thị nền khi hover.
  - `text`: Nút dạng chữ không viền, padding hẹp, hover đổi màu chữ.
  - `other`: Bỏ qua các class màu mặc định, tự do áp dụng custom style / gradient qua `className`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **Tùy chỉnh bo góc linh hoạt (`radius`)**: `none` (góc vuông 0px), `sm`, `md`, `lg` (*mặc định trên Button*), `xl`, `full` (*mặc định trên IconButton*).
- **Trạng thái Loading thông minh (`isLoading` & `showSpinner`)**:
  - `isLoading={true}`: Tự động khóa tương tác (`disabled`), đặt `aria-busy="true"` và `aria-disabled="true"`.
  - `showSpinner`: Mặc định là `false` (không hiển thị spinner xoay). Đặt `showSpinner={true}` khi muốn hiển thị icon xoay vòng.
  - `loadingText`: Cho phép thay thế nội dung hiển thị khi đang tải (ví dụ: *"Đang xử lý..."*).
- **Trải nghiệm tương tác mượt mà**: Hiệu ứng thu nhỏ nhẹ khi bấm (`active:scale-[0.98]`), focus ring shade 700 nổi bật khi điều hướng bằng bàn phím.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo component hoạt động ổn định, không bị crash kể cả khi truyền prop kích cỡ/màu sắc không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import { Button, IconButton } from "@owa/ui";
import type {
  ButtonProps,
  IconButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonColor,
  ButtonRadius,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { Button } from "@owa/ui";

export function BasicButtonExample() {
  return (
    <div className="flex gap-3 items-center">
      <Button>Button Mặc định</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success" variant="soft">Lưu thay đổi</Button>
      <Button color="error" variant="outline">Xóa dữ liệu</Button>
    </div>
  );
}
```

---

### 2. Các kích thước (`size`)

Hỗ trợ 5 kích thước từ `xs` đến `xl`:

```tsx
<Button size="xs">Extra Small (24px)</Button>
<Button size="sm">Small (32px)</Button>
<Button size="md">Medium (40px - Mặc định)</Button>
<Button size="lg">Large (48px)</Button>
<Button size="xl">Extra Large (56px)</Button>
```

---

### 3. Các biến thể giao diện (`variant`)

```tsx
// 1. Filled (Mặc định): Nền đậm nổi bật
<Button variant="filled" color="primary">Filled Primary</Button>

// 2. Soft: Nền pastel nhạt
<Button variant="soft" color="primary">Soft Primary</Button>

// 3. Outline: Viền 2px
<Button variant="outline" color="primary">Outline Primary</Button>

// 4. Ghost: Nền trong suốt
<Button variant="ghost" color="primary">Ghost Primary</Button>

// 5. Text: Dạng văn bản tối giản
<Button variant="text" color="primary">Text Button</Button>

// 6. Other: Tự do tùy biến 100% qua className
<Button
  variant="other"
  className="bg-linear-to-r from-violet-600 via-purple-600 to-pink-500 text-white shadow-md hover:opacity-90"
>
  Gradient VIP
</Button>
```

---

### 4. Các chủ đề màu sắc (`color`)

Cung cấp 7 tông màu theo chuẩn Design System:

```tsx
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="neutral">Neutral</Button>
<Button color="error">Error</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>
```

---

### 5. Hỗ trợ Icon (`leftIcon`, `rightIcon`) & Component `<IconButton>`

```tsx
import { Button, IconButton } from "@owa/ui";
import { PlusIcon, ArrowRightIcon, TrashIcon, HeartIcon } from "@/components/icons";

export function ButtonIconExample() {
  return (
    <div className="space-y-4">
      {/* Button có icon đầu hoặc cuối */}
      <div className="flex gap-3 items-center">
        <Button leftIcon={<PlusIcon />}>Tạo mới</Button>
        <Button variant="outline" color="secondary" rightIcon={<ArrowRightIcon />}>
          Tiếp tục
        </Button>
        <Button variant="ghost" color="error" leftIcon={<TrashIcon />}>
          Xóa
        </Button>
      </div>

      {/* IconButton tròn chuyên dụng */}
      <div className="flex gap-3 items-center">
        <IconButton icon={<HeartIcon />} aria-label="Yêu thích" color="error" variant="soft" />
        <IconButton icon={<PlusIcon />} aria-label="Thêm mới" color="primary" variant="filled" />
        <IconButton icon={<TrashIcon />} aria-label="Xóa mục" color="neutral" variant="ghost" />
        {/* Tùy chỉnh bo góc cho IconButton */}
        <IconButton icon={<PlusIcon />} aria-label="Thêm" radius="md" variant="outline" />
      </div>
    </div>
  );
}
```

---

### 6. Trạng thái Loading & Tùy chọn Spinner (`isLoading`, `showSpinner`, `loadingText`)

Khi `isLoading={true}`, nút sẽ tự động bị vô hiệu hóa (`disabled`), đặt `aria-busy="true"`. Bạn có thể tùy chọn có hiển thị icon xoay vòng hay không thông qua prop `showSpinner` (mặc định là `false`):

```tsx
// 1. Loading không hiện spinner (mặc định: showSpinner=false)
<Button isLoading>Đang lưu...</Button>

// 2. Loading có hiện spinner xoay vòng (showSpinner=true)
<Button isLoading showSpinner>Đang lưu...</Button>

// 3. Loading có spinner kèm theo loadingText thay thế
<Button isLoading showSpinner loadingText="Đang xử lý dữ liệu...">
  Gửi yêu cầu
</Button>

// 4. IconButton ở trạng thái loading
<IconButton
  icon={<TrashIcon />}
  aria-label="Đang xóa"
  isLoading
  showSpinner
/>
```

---

### 7. Tràn chiều rộng (`isFullWidth`) & Vô hiệu hóa (`disabled`)

```tsx
// Chiều rộng 100% của container
<Button isFullWidth color="primary" size="lg">
  Đăng ký tài khoản ngay
</Button>

// Nút bị vô hiệu hóa
<Button disabled color="primary">
  Không khả dụng
</Button>
```

---

### 8. Tùy chỉnh bo góc (`radius`)

```tsx
<Button radius="none">radius="none" (0px)</Button>
<Button radius="sm">radius="sm" (rounded-sm)</Button>
<Button radius="md">radius="md" (rounded-md)</Button>
<Button radius="lg">radius="lg" (rounded-lg - Mặc định)</Button>
<Button radius="xl">radius="xl" (rounded-xl)</Button>
<Button radius="full">radius="full" (Pill Shape)</Button>
```

---

## 🛠️ API Reference

### 1. `ButtonProps`

Kế thừa toàn bộ thuộc tính chuẩn của thẻ HTML `<button>` (`ButtonHTMLAttributes<HTMLButtonElement>`):

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Kích cỡ của nút (chiều cao, padding, font size, icon size). |
| `variant` | `"filled" \| "soft" \| "ghost" \| "text" \| "outline" \| "other"` | `"filled"` | Biến thể giao diện và phong cách màu sắc. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Chủ đề màu sắc theo Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"` | Độ bo góc của nút bấm. |
| `leftIcon` | `ReactNode` | `undefined` | Icon hoặc phần tử hiển thị trước nội dung chữ. |
| `rightIcon` | `ReactNode` | `undefined` | Icon hoặc phần tử hiển thị sau nội dung chữ. |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải (tự động khóa tương tác và đặt aria-busy). |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading. |
| `loadingText` | `ReactNode` | `undefined` | Văn bản hiển thị thay thế khi đang loading. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiều rộng chiếm 100% khung chứa (`w-full`). |
| `disabled` | `boolean` | `false` | Vô hiệu hóa nút bấm. |
| `children` | `ReactNode` | `undefined` | Nội dung văn bản hoặc phần tử bên trong nút. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Thuộc tính type chuẩn của HTML button. |
| `className` | `string` | `""` | Class CSS Tailwind tùy biến bên ngoài. |
| `ref` | `Ref<HTMLButtonElement>` | `undefined` | Ref chuyển tiếp đến thẻ `<button>`. |

---

### 2. `IconButtonProps`

Kế thừa các thuộc tính của `<button>` ngoại trừ `children`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `icon` | `ReactNode` | *(Bắt buộc)* | Icon hiển thị chính giữa nút. |
| `aria-label` | `string` | *(Bắt buộc)* | Nhãn mô tả hành động dành cho Screen Reader / A11y. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Kích cỡ của nút icon (24px, 32px, 40px, 48px, 56px). |
| `variant` | `"filled" \| "soft" \| "ghost" \| "text" \| "outline" \| "other"` | `"filled"` | Biến thể giao diện của nút icon. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Chủ đề màu sắc theo Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Độ bo góc của nút icon (mặc định tròn hoàn toàn). |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải (vô hiệu hóa tương tác). |
| `showSpinner` | `boolean` | `false` | Hiển thị spinner xoay thay thế cho icon khi đang loading. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa nút icon. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Thuộc tính type của nút. |
| `className` | `string` | `""` | Class CSS Tailwind tùy biến bên ngoài. |
| `ref` | `Ref<HTMLButtonElement>` | `undefined` | Ref chuyển tiếp đến thẻ `<button>`. |
