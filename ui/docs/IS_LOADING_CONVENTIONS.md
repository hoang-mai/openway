# Quy ước chuẩn hóa `isLoading` trong Design System (UI Package)

Tài liệu này tổng hợp toàn bộ các nguyên tắc, quy chuẩn hành vi (Behavior), giao diện (Styling), khả năng tiếp cận (Accessibility - A11y) khi xử lý trạng thái **`isLoading`** trên toàn bộ các component đầu vào form (Form Controls) và tương tác.

---

## 1. Nguyên tắc cốt lõi (Core Principles)

> [!IMPORTANT]
> **1. Chỉ vô hiệu hoá thao tác (Interaction Blocking)**: Ngăn người dùng nhập, click, paste, kéo thả, xóa hoặc mở popup khi đang loading.
>
> **2. Tuyệt đối KHÔNG thay đổi màu sắc hay độ mờ (Styling Integrity)**: Không áp dụng `opacity-xx`, không đổi màu nền sang xám (`bg-neutral-100`) hay viền (`border`) khi `isLoading`. Màu sắc và độ sáng của component phải được giữ nguyên vẹn để tránh giật UI khi dữ liệu đang tải.
>
> **3. Hiển thị Spinner trạng thái rõ ràng**: Thay thế hoặc ưu tiên hiển thị `<Spinner />` tại vị trí hành động / icon phù hợp.

---

## 2. Quy tắc hành vi & Vô hiệu hóa (Interaction Rules)

### 2.1. Chặn tương tác người dùng

- **Input / Textarea**:
  - Truyền `disabled={disabled || isLoading}` và `tabIndex={disabled || isLoading ? -1 : 0}`.
  - Các sự kiện `onChange`, `onKeyDown`, `onPaste`, `onClear` phải kiểm tra:
    ```tsx
    if (disabled || readOnly || isLoading) return;
    ```
- **Select / DatePicker / TimePicker (Dropdown & Floating Popups)**:
  - Chặn mở popup trong Floating UI Hook:
    ```tsx
    open: isOpen && !isDisabled && !isReadOnly && !isLoading,
    onOpenChange: (open) => {
      if (!isLoading) setIsOpen(open);
    }
    ```
  - Chặn click mở dropdown trên container:
    ```tsx
    onClick={() => !isDisabled && !isReadOnly && !isLoading && setIsOpen((prev) => !prev)}
    ```
  - Chặn phím tắt mở popup (`ArrowDown`, `Enter`, `Space`) trong `handleKeyDown`.
- **Toggle / Checkbox / Radio / Slider**:
  - Chặn thay đổi trạng thái khi click hoặc kéo thả con trỏ.

---

## 3. Quy tắc giao diện & Slots (UI & Slot Rules)

```
┌─────────────────────────────────────────────────────────────┐
│ [Left Icon / Addon]      Input Value          [  SPINNER  ] │
└─────────────────────────────────────────────────────────────┘
                                                    ▲
                                     (Ẩn Right Icon & Clear Button)
```

1. **Hiển thị Spinner**:
   - Render component `<Spinner />` (animate spin) với kích thước đồng bộ theo `size` của component (`sizeConfig[size].icon`).
2. **Ẩn các Actions xung đột**:
   - Khi `isLoading === true`, **tự động ẩn** nút xóa nhanh (`isClearable`) và `rightIcon` để nhường vị trí cho Spinner:
     ```tsx
     {
       isLoading && (
         <div className="flex items-center justify-center pr-3 shrink-0">{renderIconWrapper(<Spinner />)}</div>
       );
     }

     {
       !isLoading && isClearable && !disabled && !readOnly && <button onClick={handleClear}>...</button>;
     }

     {
       !isLoading && rightIcon && <div>{rightIcon}</div>;
     }
     ```
3. **Giữ nguyên Theme / Colors / Opacity**:
   - Khác với `disabled` (dùng `opacity-60 bg-neutral-100 pointer-events-none`), `isLoading` **KHÔNG** thêm class opacity hay đổi background.

---

## 4. Quy tắc Accessibility (A11y)

Để đảm bảo hỗ trợ tốt nhất cho Screen Readers và công nghệ trợ năng:

| Thuộc tính A11y            | Giá trị                                   | Mục đích                                                                              |
| :------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------ |
| **`aria-busy`**            | `aria-busy={isLoading}`                   | Báo cho Screen Reader biết vùng dữ liệu / trường nhập đang trong tiến trình bận xử lý |
| **`aria-disabled`**        | `aria-disabled={disabled \|\| isLoading}` | Báo trạng thái không thể tương tác                                                    |
| **`aria-expanded`**        | `aria-expanded={isOpen && !isLoading}`    | Báo trạng thái đóng/mở popover chính xác                                              |
| **`role="status"`**        | Gắn trên container Spinner                | Định danh Spinner là thông báo trạng thái tải                                         |
| **`aria-label="Loading"`** | Gắn trên vùng Spinner                     | Mô tả rõ ràng hành động đang diễn ra                                                  |

---

## 5. Bảng tổng hợp triển khai theo từng nhóm Component

| Nhóm Component  | Tên Component                                                    | Cách thức xử lý `isLoading` chuẩn                                                                                            |
| :-------------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Text Inputs** | `Input`, `PasswordInput`, `NumberInput`                          | Disabled input, `aria-busy`, ẩn clear button & right icon, render `<Spinner />` bên phải.                                    |
| **Tags Input**  | `MultiInput`                                                     | Disabled input gõ tag, ẩn nút Add (`+`) & Clear, render Spinner góc phải.                                                    |
| **OTP Input**   | `OtpInput`                                                       | Disabled toàn bộ các ô slots, chặn paste/key/input, render `<Spinner />` ở cuối hàng ô OTP.                                  |
| **Multi-line**  | `TextArea`                                                       | Disabled textarea, `aria-busy`, ẩn clear button, render `<Spinner />` ở góc trên bên phải (`top-2.5 right-2.5`).             |
| **Dropdowns**   | `Select`, `SelectTrigger`                                        | Hỗ trợ cả `isLoading` và `loading`, chặn mở menu, disabled search input, render `<Spinner />` ở trigger.                     |
| **Pickers**     | `DatePicker`, `DateRangePicker`, `TimePicker`, `TimeRangePicker` | Chặn useFloating popup, chặn click container, chặn phím tắt, `aria-busy`, render `<Spinner />` bên phải.                     |
| **Selections**  | `Checkbox`, `Radio`                                              | Kế thừa `isLoading` từ Group context, thay thế check/dot icon bằng `<Spinner />`.                                            |
| **Switch**      | `Toggle`                                                         | Chặn click/toggle, render `<Spinner />` xoay bên trong nút thumb.                                                            |
| **Sliders**     | `Slider`                                                         | Chặn pointer event / drag trong hook `useSlider`, `aria-busy`.                                                               |
| **Actions**     | `Button`, `IconButton`                                           | `disabled={disabled \|\| isLoading}`, `aria-busy`, thay thế icon/nội dung bằng Spinner và giữ nguyên màu nền (không làm mờ). |

---

## 6. Mẫu code chuẩn (Code Template)

```tsx
export default function CustomField({
  disabled = false,
  readOnly = false,
  isLoading = false,
  isClearable = false,
  rightIcon,
  ...props
}: CustomFieldProps) {
  return (
    <div className="relative flex items-center border-2 ...">
      <input
        disabled={disabled || isLoading}
        readOnly={readOnly}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        tabIndex={disabled || isLoading ? -1 : 0}
        {...props}
      />

      {/* 1. Ưu tiên render Spinner khi isLoading */}
      {isLoading && (
        <div className="flex items-center pr-3 shrink-0" role="status" aria-label="Loading">
          <Spinner className="animate-spin size-4" />
        </div>
      )}

      {/* 2. Ẩn nút Clear khi đang loading */}
      {!isLoading && isClearable && !disabled && !readOnly && (
        <button type="button" onClick={handleClear}>
          <CloseIcon />
        </button>
      )}

      {/* 3. Ẩn Right Icon khi đang loading */}
      {!isLoading && rightIcon && <div className="flex items-center pr-3 shrink-0">{rightIcon}</div>}
    </div>
  );
}
```
