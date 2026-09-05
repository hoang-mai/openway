# ⏱️ Hooks `useDebounce` & `useDebouncedCallback` (`@openway/ui`)

Bộ đôi hook tối ưu hiệu năng giúp hoãn thực thi và chống spam request khi người dùng nhập dữ liệu hoặc thao tác liên tục.

---

## 🌟 Phân biệt 2 Hook

- **`useDebounce<T>(value, delay)`**: Dùng để debounce một **giá trị (value)** (ví dụ: chuỗi tìm kiếm text input, giá trị thanh trượt slider). Khi người dùng ngừng thay đổi sau khoảng thời gian `delay`, giá trị mới được cập nhật.
- **`useDebouncedCallback(callback, delay)`**: Dùng để debounce một **hàm callback** (ví dụ: hàm gọi API, resize window, autosave form). Trả về hàm `{ debounced, cancel }`. Luôn giữ tham chiếu callback mới nhất mà không gây re-render dư thừa.

---

## 🚀 Import

```tsx
import { useDebounce, useDebouncedCallback } from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Sử dụng `useDebounce` với giá trị

```tsx
import { useState, useEffect } from "react";
import { Input, useDebounce } from "@openway/ui";

export function SearchFilter() {
  const [keyword, setKeyword] = useState("");
  // debouncedKeyword chỉ thay đổi sau khi ngừng gõ 400ms
  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    if (debouncedKeyword) {
      console.log("Tìm kiếm với từ khóa:", debouncedKeyword);
    }
  }, [debouncedKeyword]);

  return (
    <Input
      label="Tìm kiếm"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Gõ từ khóa..."
    />
  );
}
```

---

### 2. Sử dụng `useDebouncedCallback` với hàm xử lý

```tsx
import { useDebouncedCallback, Button } from "@openway/ui";

export function AutoSaveForm() {
  const { debounced: handleAutoSave, cancel } = useDebouncedCallback((formData: Record<string, unknown>) => {
    console.log("Tự động lưu dữ liệu lên server:", formData);
  }, 500);

  return (
    <div className="space-y-2">
      <Button onClick={() => handleAutoSave({ title: "Bản nháp mới" })}>
        Cập nhật dữ liệu
      </Button>
      <Button variant="ghost" color="error" onClick={cancel}>
        Hủy lưu tự động
      </Button>
    </div>
  );
}
```

---

## 🎛️ Bảng Tham số

### `useDebounce<T>(value: T, delay?: number): T`
| Tham số | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `value` | `T` | **Bắt buộc** | Giá trị cần debounce. |
| `delay` | `number` | `300` | Thời gian hoãn tính theo mili-giây (ms). |

### `useDebouncedCallback(callback, delay?: number)`
| Tham số | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `callback` | `(...args: Args) => R` | **Bắt buộc** | Hàm cần debounce. |
| `delay` | `number` | `300` | Thời gian hoãn tính theo mili-giây (ms). |
- Trả về object: `{ debounced: (...args) => void, cancel: () => void }`.
