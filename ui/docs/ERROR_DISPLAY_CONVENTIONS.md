# Quy ước chuẩn hóa Hiển thị Lỗi & Hiệu ứng chuyển động (Error Animation Lifecycle)

Tài liệu này quy định chi tiết về kiến trúc vòng đời hiển thị lỗi (Error Lifecycle), hiệu ứng chuyển động mượt mà (Smooth Animation), kỹ thuật chống giật layout (Hardware-Accelerated CSS Grid) và khả năng tiếp cận (Accessibility - A11y) áp dụng trên toàn bộ các Form Control Components.

---

## 1. Mục đích & Nguyên tắc cốt lõi (Core Principles)

> [!IMPORTANT]
> **1. Chống giật layout (Zero Layout Shift)**: Không dùng kỹ thuật render điều kiện đơn giản `{errorMessage && <p>...}` vì sẽ làm layout bị giật cục. Phải sử dụng CSS Grid Transition (`grid-rows-[1fr]` <-> `grid-rows-[0fr]`).
>
> **2. Vòng đời chuyển động hoàn chỉnh (Enter & Exit Animations)**: Khi xuất hiện lỗi, chạy animation `animate-error-in`. Khi lỗi được giải quyết, giữ chữ lỗi trong 250ms để chạy `animate-error-out` và thu gọn chiều cao mượt mà trước khi gỡ khỏi DOM.
>
> **3. Đồng bộ trạng thái toàn diện**: Khi `hasError = true`, toàn bộ Label, Viền (`border-error-500`), và Focus Ring (`ring-error-500/20`) phải tự động chuyển sang màu đỏ đồng bộ.

---

## 2. Vòng đời Animation Lỗi (Error In & Out Lifecycle)

Quản lý trạng thái lỗi thông qua 2 state nội bộ:

```tsx
// 1. Lưu trữ lỗi hiển thị và cờ đang thoát animation
const [displayedError, setDisplayedError] = useState<React.ReactNode>(errorMessage);
const [isExiting, setIsExiting] = useState(false);

useEffect(() => {
  if (errorMessage) {
    // Khi có lỗi mới -> Hiển thị ngay lập tức
    setDisplayedError(errorMessage);
    setIsExiting(false);
  } else if (displayedError) {
    // Khi lỗi được xóa -> Bắt đầu hiệu ứng thoát (Exit Animation)
    setIsExiting(true);
    const timer = setTimeout(() => {
      setDisplayedError(undefined);
      setIsExiting(false);
    }, 250); // Khớp với thời gian animation CSS (200-250ms)
    return () => clearTimeout(timer);
  }
}, [errorMessage, displayedError]);
```

---

## 3. Quy chuẩn Hiển thị bằng CSS Grid (`renderHelperOrError`)

### Cấu trúc DOM chuẩn:

```tsx
const renderHelperOrError = () => {
  const activeText = displayedError || helperText;
  const hasMessage = Boolean(displayedError || helperText);
  const isShowingError = Boolean(displayedError);

  return (
    <div
      className={`grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out overflow-hidden ${
        hasMessage ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
      }`}
      aria-live="polite"
    >
      <div className="overflow-hidden">
        <div
          id={helperId}
          role={isShowingError ? "alert" : "status"}
          className={`leading-tight transition-colors duration-200 font-normal ${
            size === "xs" || size === "sm" ? "text-[10px]" : "text-xs"
          } ${
            isShowingError
              ? isExiting
                ? "text-error-600 animate-error-out"
                : "text-error-600 animate-error-in"
              : "text-neutral-500"
          } ${helperClassName}`}
        >
          {activeText || "\u00A0"}
        </div>
      </div>
    </div>
  );
};
```

### Điểm mấu chốt kỹ thuật:

1. **`grid-rows-[1fr]` vs `grid-rows-[0fr]`**: Cho phép CSS animate chiều cao nội dung động (Dynamic Height) mà không cần tính `height` bằng Javascript.
2. **`overflow-hidden` ở cả container và lớp con**: Cần thiết để CSS Grid nội suy từ 0px đến chiều cao thực tế.
3. **`activeText || "\u00A0"`**: Sử dụng non-breaking space khi đang thoát để tránh giật chiều cao dòng text.

---

## 4. Quy tắc Accessibility (A11y)

| Thuộc tính             | Khi là Error Message                                     | Khi là Helper Text thông thường |
| :--------------------- | :------------------------------------------------------- | :------------------------------ |
| **`role`**             | `role="alert"` (Screen Reader sẽ đọc ngay khi xuất hiện) | `role="status"`                 |
| **`aria-live`**        | `aria-live="polite"`                                     | `aria-live="polite"`            |
| **`aria-invalid`**     | `aria-invalid={hasError}` trên thẻ `<input>`             | `aria-invalid={false}`          |
| **`aria-describedby`** | Trỏ tới `helperId` của khối thông báo                    | Trỏ tới `helperId`              |

---

## 5. Quy tắc Đồng bộ Trạng thái Viền & Label

### 5.1. Xác định trạng thái lỗi:

```tsx
const hasError = Boolean(isInvalid || errorMessage || displayedError);
const activeColor = hasError ? "error" : color;
```

### 5.2. Đồng bộ màu sắc:

- **Variant Border / Container**: Tự động nhận `border-error-500` và `focus-within:ring-error-500/20`.
- **Label**:
  - Khi `hasError === true`: `text-error-600 font-bold`.
  - Khi `hasError === false`: `text-neutral-700` hoặc `text-neutral-800`.
- **Input text**: Giữ nguyên màu chữ để người dùng dễ dàng chỉnh sửa lại dữ liệu sai.

---

## 6. Danh sách Components đã áp dụng chuẩn này

- ✅ `Input`, `PasswordInput`, `NumberInput`
- ✅ `MultiInput`
- ✅ `TextArea`
- ✅ `DatePicker`
- ✅ `DateRangePicker`
- ✅ `TimePicker`
- ✅ `TimeRangePicker`
- ✅ `DateTimePicker`
