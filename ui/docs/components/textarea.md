# 📝 TextArea Component (`@openway/ui`)

Component **TextArea** đa năng, hỗ trợ **tự động co giãn chiều cao (AutoResize)** bằng thư viện `react-textarea-autosize`, tích hợp **Safe Config Fallback**, **quản lý Ref tối ưu** qua `@floating-ui/react`, **bộ đếm ký tự (Character Counter)** và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Tích hợp `react-textarea-autosize`**: Tự động tăng giảm chiều cao mượt mà theo nội dung nhập mà không làm giật khung hình (`layout shift`). Hỗ trợ cấu hình `minRows`, `maxRows`, `cacheMeasurements` và callback `onHeightChange`.
- **Tùy chọn chuyển đổi linh hoạt**: Dễ dàng tắt chế độ co giãn tự động bằng `autoResize={false}` để chuyển về thẻ `<textarea>` truyền thống.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl` với font chữ, padding, kích thước nhãn và thông báo phụ được đồng bộ tỉ lệ.
- **3 Biến thể giao diện (`variant`)**:
  - `outline` *(mặc định)*: Viền nét rõ ràng quanh khung soạn thảo, hover/focus đổi màu viền chủ đề.
  - `filled`: Nền pastel nhạt (`bg-{color}-50/60`), có viền bao quanh.
  - `ghost`: Nền trong suốt, chỉ nổi bật khi hover hoặc focus.
  - `other`: Bỏ qua các class màu mặc định, tự do áp dụng custom style qua `textareaWrapperClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**:
  - `top` *(mặc định)*: Nhãn nằm phía trên ô textarea.
  - `left`: Nhãn nằm ngang bên trái ô textarea (tự động căn chỉnh theo dạng flex-row).
  - `floating`: Nhãn nổi bật vắt ngang viền trên của khung textarea.
- **Trạng thái Loading & Xoay Spinner (`isLoading` & `showSpinner`)**:
  - `isLoading={true}`: Tự động vô hiệu hóa ô nhập liệu (`disabled`), kích hoạt `aria-busy="true"` và `aria-disabled="true"`.
  - `showSpinner`: Mặc định là `false`. Đặt `showSpinner={true}` khi muốn hiển thị icon xoay vòng ở góc phải trên.
- **Nút xóa nhanh (`isClearable` & `onClear`)**: Hiển thị nút bấm xóa sạch nội dung ở góc phải trên khi ô có văn bản.
- **Bộ đếm số lượng ký tự (`showCount` & `maxLength`)**:
  - Hiển thị số lượng ký tự trực tiếp ở góc dưới bên phải (ví dụ: `45/500`).
  - Tự động chặn nhập vượt quá số ký tự cho phép cả khi gõ và khi dán (paste).
- **Quản lý Ref nâng cao**: Sử dụng `useMergeRefs` từ `@floating-ui/react` giúp gộp và chuyển tiếp `ref` mượt mà trong React 19.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo component hoạt động an toàn, không bị crash kể cả khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import { TextArea } from "@openway/ui";
import type {
  TextAreaProps,
  TextAreaConfig,
  TextAreaSize,
  TextAreaVariant,
  TextAreaColor,
  TextAreaRadius,
  TextAreaLabelPlacement,
  TextAreaResize,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { TextArea } from "@openway/ui";

export function BasicTextAreaExample() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <TextArea
        label="Mô tả chi tiết"
        placeholder="Nhập mô tả sản phẩm của bạn..."
      />
    </div>
  );
}
```

---

### 2. Tự động co giãn chiều cao (AutoResize)

Mặc định `autoResize={true}` với số dòng tối thiểu `minRows={3}`:

```tsx
// Co giãn tự do từ 3 dòng trở lên
<TextArea
  label="Phản hồi ý kiến"
  autoResize={true}
  minRows={3}
  maxRows={8}
  onHeightChange={(height) => console.log("Chiều cao hiện tại:", height)}
/>

// Tắt autoResize để dùng chiều cao cố định
<TextArea
  label="Ghi chú cố định"
  autoResize={false}
  rows={4}
  resize="vertical"
/>
```

---

### 3. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Top (Mặc định)
<TextArea label="Nhãn phía trên" labelPlacement="top" placeholder="Nhập văn bản..." />

// 2. Left (Ngang bên trái)
<TextArea label="Nhãn bên trái" labelPlacement="left" placeholder="Nhập văn bản..." />

// 3. Floating (Nổi trên viền)
<TextArea label="Nhãn nổi viền" labelPlacement="floating" placeholder="Nhập văn bản..." />
```

---

### 4. Giới hạn ký tự & Bộ đếm (`showCount` & `maxLength`)

```tsx
<TextArea
  label="Đánh giá sản phẩm"
  maxLength={200}
  showCount={true}
  placeholder="Tối đa 200 ký tự (tự động chặn khi đạt giới hạn)..."
/>
```

---

### 5. Xóa nhanh & Trạng thái Loading

```tsx
<TextArea
  label="Tìm kiếm nội dung"
  isClearable={true}
  onClear={() => console.log("Đã xóa sạch nội dung")}
  defaultValue="Nội dung ban đầu"
/>

<TextArea
  label="Đang đồng bộ dữ liệu"
  isLoading={true}
  showSpinner={true}
  defaultValue="Vui lòng đợi..."
/>
```

---

### 6. Trạng thái Báo lỗi & Hướng dẫn (`errorMessage` & `helperText`)

```tsx
<TextArea
  label="Địa chỉ giao hàng"
  isRequired={true}
  errorMessage="Địa chỉ không được để trống!"
  isInvalid={true}
/>

<TextArea
  label="Tiểu sử bản thân"
  helperText="Hãy viết ngắn gọn 1-2 câu về kinh nghiệm của bạn."
/>
```

---

## 🛠 Bảng thông số Props (`TextAreaProps`)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ giao diện (font chữ, padding, kích thước nhãn). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Biến thể hiển thị giao diện. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo góc của khung viền textarea. |
| `label` | `ReactNode` | — | Nhãn tiêu đề hiển thị cho ô nhập liệu. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Vị trí hiển thị của nhãn. |
| `config` | `TextAreaConfig` | — | Cấu hình tập trung các cờ trạng thái / tính năng (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `autoResize`, `showCount`, `isFullWidth`). |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn/trợ giúp bên dưới ô. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi khi nhập sai (tự kích hoạt trạng thái báo lỗi). |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `false` | Hiển thị nút xóa nhanh nội dung khi có văn bản. |
| `onClear` | `() => void` | — | Callback được gọi khi bấm nút xóa nhanh. |
| `autoResize` | `boolean` | `true` | Tự động co giãn chiều cao theo nội dung nhập. |
| `minRows` | `number` | `3` | Số dòng hiển thị tối thiểu khi `autoResize` bật. |
| `maxRows` | `number` | — | Số dòng hiển thị tối đa trước khi xuất hiện thanh cuộn. |
| `onHeightChange` | `(height: number, meta: { rowHeight: number }) => void` | — | Callback khi chiều cao thay đổi do autoResize. |
| `cacheMeasurements` | `boolean` | — | Bật bộ nhớ đệm kết quả đo chiều cao để tối ưu render. |
| `showCount` | `boolean` | `false` | Hiển thị bộ đếm số lượng ký tự ở góc phải dưới. |
| `maxLength` | `number` | — | Số ký tự tối đa cho phép nhập (chặn tự động khi đạt giới hạn). |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'none'` | Tùy chọn kéo giãn khung thủ công. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `ref` | `Ref<HTMLTextAreaElement>` | — | Ref chuyển tiếp đến thẻ `<textarea>` HTML bên dưới. |
