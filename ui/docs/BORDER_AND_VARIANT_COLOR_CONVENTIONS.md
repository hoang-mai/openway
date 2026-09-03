# Quy ước chuẩn hóa Border (`border-2`) & Bảng màu Variant Color trong Design System

Tài liệu này quy định chi tiết về độ dày đường viền (**`border-2`**), các biến thể giao diện (**`variants`**), và cấu hình bảng màu sắc (**`variantColorConfig`**) áp dụng cho tất cả các Form Control Components trong hệ thống.

---

## 1. Quy chuẩn độ dày viền (`border-2`)

> [!IMPORTANT]
> **Quy tắc cốt lõi**:
>
> - Tất cả các Form Input Container (`Input`, `MultiInput`, `OtpInput`, `TextArea`, `SelectTrigger`, `DatePicker`, `TimePicker`,...) **bắt buộc sử dụng độ dày `border-2` (2px)** cố định.
> - **Chống giật layout (Prevent Layout Shift)**: Không dùng viền `border` (1px) ở trạng thái thường rồi tăng lên `border-2` khi focus/error vì sẽ làm thay đổi kích thước container 1px gây giật layout.

### Container Base Class mẫu:

```tsx
const inputContainerBase = "group relative flex items-center transition-all duration-150 ease-in-out border-2";
```

---

## 2. Hệ thống Biến thể Giao diện (Variants)

Design System hỗ trợ 4 biến thể chính cho các ô nhập liệu:

| Variant                    | Mục đích sử dụng                            | Đặc điểm nhận diện                                                                      |
| :------------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------- |
| **`outline`** _(Mặc định)_ | Biến thể phổ biến nhất trên form            | Nền trắng (`bg-neutral-white`), viền `border-2` màu sắc nét theo theme.                 |
| **`filled`**               | Dùng cho form trên nền sáng, bảng biểu      | Nền nhạt pastel (`bg-<color>-50/60`), viền nhẹ, đổi nền đậm hơn khi hover/focus.        |
| **`ghost`**                | Dùng cho toolbar, inline-edit, filter nhanh | Nền và viền trong suốt (`border-transparent`), chỉ hiện viền và nền mờ khi hover/focus. |
| **`other`**                | Tự do custom ngoại lệ                       | Không áp dụng style có sẵn, toàn quyền tuỳ biến qua `className`.                        |

---

## 3. Bảng màu chủ đề (7 Color Themes)

Hệ thống cung cấp 7 bảng màu chuẩn:

1. **`primary`**: Màu thương hiệu chính (Xanh dương / Brand Blue).
2. **`secondary`**: Màu phụ trợ.
3. **`neutral`**: Màu xám trung tính (Xám Slate / Gray), phù hợp cho giao diện tối giản.
4. **`error`**: Màu đỏ báo lỗi, cảnh báo nghiêm trọng (tự động kích hoạt khi có `errorMessage` hoặc `isInvalid`).
5. **`success`**: Màu xanh lá xác thực thành công.
6. **`warning`**: Màu vàng/cam cảnh báo chú ý.
7. **`info`**: Màu xanh thông tin.

---

## 4. Chi tiết Cấu hình Màu sắc (`variantColorConfig`)

Cấu hình chi tiết các class Tailwind cho từng cặp `Variant` + `Color`:

```ts
export const variantColorConfig: Record<Exclude<InputVariant, "other">, Record<InputColor, string>> = {
  // ==================== 1. OUTLINE VARIANT ====================
  outline: {
    primary:
      "bg-neutral-white border-primary-400 hover:border-primary-500 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-neutral-white border-secondary-400 hover:border-secondary-500 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-neutral-white border-error-500 hover:border-error-600 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-neutral-white border-success-400 hover:border-success-500 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-neutral-white border-warning-400 hover:border-warning-500 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-neutral-white border-info-400 hover:border-info-500 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
  },

  // ==================== 2. FILLED VARIANT ====================
  filled: {
    primary:
      "bg-primary-50/60 border-primary-200 hover:bg-primary-100/60 focus-within:bg-primary-100/60 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-secondary-50/60 border-secondary-200 hover:bg-secondary-100/60 focus-within:bg-secondary-100/60 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-neutral-50/60 border-neutral-200 hover:bg-neutral-200/60 focus-within:bg-neutral-200/60 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-error-50/60 border-error-500 hover:border-error-600 hover:bg-error-100/60 focus-within:bg-error-100/60 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-success-50/60 border-success-200 hover:bg-success-100/60 focus-within:bg-success-100/60 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-warning-50/60 border-warning-200 hover:bg-warning-100/60 focus-within:bg-warning-100/60 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-info-50/60 border-info-200 hover:bg-info-100/60 focus-within:bg-info-100/60 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
  },

  // ==================== 3. GHOST VARIANT ====================
  ghost: {
    primary:
      "bg-transparent border-transparent hover:bg-primary-50/50 focus-within:bg-primary-50/50 focus-within:border-primary-200/20 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-transparent border-transparent hover:bg-secondary-50/50 focus-within:bg-secondary-50/50 focus-within:border-secondary-200/20 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-transparent border-transparent hover:bg-neutral-50/50 focus-within:bg-neutral-50/50 focus-within:border-neutral-200/20 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-transparent border-error-500 hover:bg-error-50/50 focus-within:bg-error-50/50 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-transparent border-transparent hover:bg-success-50/50 focus-within:bg-success-50/50 focus-within:border-success-200/20 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-transparent border-transparent hover:bg-warning-50/50 focus-within:bg-warning-50/50 focus-within:border-warning-200/20 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-transparent border-transparent hover:bg-info-50/50 focus-within:bg-info-50/50 focus-within:border-info-200/20 focus-within:ring-2 focus-within:ring-info-500/20",
  },
};
```

---

## 5. Quy tắc Focus Ring & Error State

### 5.1. Hiệu ứng Focus Ring

- Luôn sử dụng vòng sáng **`focus-within:ring-2`** kết hợp độ mờ **`focus-within:ring-<color>-500/20`** (20% opacity) để tạo cảm giác mềm mại, không gây chói mắt.

### 5.2. Tự động chuyển Theme sang `error` khi có lỗi

- Khi component gặp lỗi (`isInvalid === true` hoặc có `errorMessage` hoặc `displayedError`), `activeColor` sẽ tự động chuyển thành `"error"`:

```tsx
const hasError = Boolean(isInvalid || errorMessage || displayedError);
const activeColor = hasError ? "error" : color;

const variantStyles =
  variant === "other" ? "" : variantColorConfig[variant]?.[activeColor] || variantColorConfig.outline.primary;
```

---

## 6. Mẫu áp dụng trong Component

```tsx
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";

export default function InputField({
  size = "md",
  variant = "outline",
  color = "primary",
  radius,
  isInvalid = false,
  errorMessage,
  className = "",
  inputWrapperClassName = "",
  ...props
}) {
  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  const currentSize = sizeConfig[size] || sizeConfig.md;
  const roundedClass = radius ? radiusConfig[radius] : currentSize.rounded;
  const variantStyles =
    variant === "other" ? "" : variantColorConfig[variant]?.[activeColor] || variantColorConfig.outline.primary;

  const containerClasses = [
    "group relative flex items-center transition-all duration-150 ease-in-out border-2",
    currentSize.wrapper,
    roundedClass,
    variantStyles,
    inputWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <input className="w-full bg-transparent outline-none border-none ..." {...props} />
    </div>
  );
}
```
