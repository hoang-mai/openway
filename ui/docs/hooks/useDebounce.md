# ⏱️ Hooks `useDebounce` & `useDebouncedCallback` (`@openway/ui`)

A performance optimization hook duo designed to delay execution and prevent request spamming during continuous user input or frequent actions.

---

## 🌟 Differentiating the Two Hooks

- **`useDebounce<T>(value, delay)`**: Used to debounce a **value** (e.g., text search input query, slider value). The updated value is only emitted after the user stops making changes for the specified `delay` duration.
- **`useDebouncedCallback(callback, delay)`**: Used to debounce a **callback function** (e.g., API call handler, window resize listener, form autosave). Returns `{ debounced, cancel }`. Always maintains the latest callback reference without triggering redundant re-renders.

---

## 🚀 Import

```tsx
import { useDebounce, useDebouncedCallback } from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Using `useDebounce` with a Value

```tsx
import { useState, useEffect } from "react";
import { Input, useDebounce } from "@openway/ui";

export function SearchFilter() {
  const [keyword, setKeyword] = useState("");
  // debouncedKeyword only updates after typing stops for 400ms
  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    if (debouncedKeyword) {
      console.log("Searching with keyword:", debouncedKeyword);
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

### 2. Using `useDebouncedCallback` with a Handler Function

```tsx
import { useDebouncedCallback, Button } from "@openway/ui";

export function AutoSaveForm() {
  const { debounced: handleAutoSave, cancel } = useDebouncedCallback((formData: Record<string, unknown>) => {
    console.log("Autosaving data to server:", formData);
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

## 🎛️ Parameters

### `useDebounce<T>(value: T, delay?: number): T`
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `T` | **Required** | The value to debounce. |
| `delay` | `number` | `300` | Delay duration in milliseconds (ms). |

### `useDebouncedCallback(callback, delay?: number)`
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `callback` | `(...args: Args) => R` | **Required** | The function to debounce. |
| `delay` | `number` | `300` | Delay duration in milliseconds (ms). |
- Returns an object: `{ debounced: (...args) => void, cancel: () => void }`.
