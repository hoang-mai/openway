# ☑️ Checkbox & CheckboxGroup Component (`@owa/ui`)

Bộ đôi component **Checkbox** và **CheckboxGroup** chuyên nghiệp, thiết kế theo kiến trúc **Data-driven thuần túy (Pure Data-driven)**, không sử dụng React Context, loại bỏ hoàn toàn `useEffect` gây cascading render, tích hợp **Live Search (Client & Server modes)** thông qua component `Input` variant `outline`, hỗ trợ **bảo lưu mục đã chọn (Preserve Selected)** và tuân thủ chặt chẽ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

### 1. Checkbox
- **Độc lập & Tối ưu**: Không phụ thuộc vào Context, nhận props trực tiếp, hỗ trợ chuyển tiếp `ref` chuẩn React 19 mà không cần wrapper trung gian.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl` đồng bộ tỉ lệ ô tick, icon SVG, nhãn và văn bản chú thích.
- **4 Biến thể giao diện (`variant`)**:
  - `filled` (*mặc định*): Nền màu chủ đề khi được chọn.
  - `outline`: Viền nét màu chủ đề, nền trong suốt.
  - `soft`: Nền pastel dịu mắt (`bg-{color}-100`).
  - `other`: Tự do tùy biến style qua `boxClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **Trạng thái gạch ngang (`indeterminate`)**: Hỗ trợ trạng thái chọn một phần với thuộc tính chuẩn `aria-checked="mixed"` và icon trừ (`MinusIcon`).
- **2 Vị trí đặt nhãn (`labelPlacement`)**: `right` (*mặc định*) và `left` (căn đều hai bên).
- **Safe Config Fallback**: Sử dụng `getSafeConfig` đảm bảo component luôn an toàn, không bao giờ bị lỗi hiển thị khi nhận giá trị không hợp lệ.

### 2. CheckboxGroup
- **Kiến trúc Data-driven thuần túy**: Nhận danh sách lựa chọn qua prop `options: CheckboxOptionItem<TData>[]`. Không còn cấu trúc compound component cồng kềnh, không tốn chi phí Context Provider.
- **Tích hợp tìm kiếm trực quan (`searchable`)**:
  - Sử dụng component `Input` variant `outline` với icon tìm kiếm (`SearchIcon`) và nút xóa nhanh (`isClearable`).
  - **Không làm mất focus**: Trạng thái tải ngầm hiển thị spinner ở góc phải qua `rightIcon`, không disable input trong khi người dùng đang gõ phím.
- **2 Chế độ tìm kiếm linh hoạt (`searchMode`)**:
  - `client` (*mặc định*): Tìm kiếm thông minh bằng thuật toán fuzzy ranking của `@tanstack/match-sorter-utils`. Hỗ trợ tìm theo đa trường dữ liệu (`searchField`) hoặc custom function (`filterFn`).
  - `server`: Tìm kiếm qua API máy chủ với `onSearch` và bộ đệm thời gian `debounceMs`.
- **Bảo lưu mục đã chọn (`preserveSelected`)**: Tự động ghim lại các mục đã chọn lên đầu danh sách khi chuyển đổi từ khóa tìm kiếm mới, quản lý bộ nhớ thông minh (chỉ lưu các mục thực sự được tick chọn).
- **2 Bố cục sắp xếp (`orientation`)**: `vertical` (*mặc định*) và `horizontal`.

---

## 🚀 Cài đặt & Import

```tsx
import { Checkbox, CheckboxGroup } from "@owa/ui";
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxOptionItem,
  CheckboxSize,
  CheckboxVariant,
  CheckboxColor,
  CheckboxRadius,
  CheckboxLabelPlacement,
  CheckboxSearchMode,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Sử dụng Checkbox đơn lẻ

```tsx
import { useState } from "react";
import { Checkbox } from "@owa/ui";

export function SingleCheckboxExample() {
  const [agree, setAgree] = useState(false);

  return (
    <Checkbox
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
      label="Tôi đồng ý với các điều khoản và chính sách dịch vụ"
      helperText="Vui lòng đọc kỹ trước khi tiếp tục"
      config={{ isRequired: true }}
    />
  );
}
```

---

### 2. CheckboxGroup cơ bản (Data-driven)

```tsx
import { useState } from "react";
import { CheckboxGroup } from "@owa/ui";

export function BasicGroupExample() {
  const [selected, setSelected] = useState<string[]>(["react"]);

  return (
    <CheckboxGroup
      label="Kỹ năng công nghệ"
      helperText="Chọn các kỹ năng bạn có kinh nghiệm làm việc"
      value={selected}
      onChange={setSelected}
      color="primary"
      orientation="horizontal"
      options={[
        { value: "react", label: "React 19" },
        { value: "vue", label: "Vue.js 3" },
        { value: "tailwind", label: "Tailwind CSS v4" },
        { value: "typescript", label: "TypeScript" },
      ]}
    />
  );
}
```

---

### 3. Tìm kiếm Client Mode (Fuzzy Search & Đa trường)

```tsx
import { useState } from "react";
import { CheckboxGroup } from "@owa/ui";

const frameworks = [
  { value: "react", label: "React JS", code: "FE-01", description: "Facebook library" },
  { value: "vue", label: "Vue JS", code: "FE-02", description: "Progressive framework" },
  { value: "angular", label: "Angular", code: "FE-03", description: "Google platform" },
  { value: "svelte", label: "Svelte", code: "FE-04", description: "Cybernetically enhanced" },
];

export function ClientSearchExample() {
  const [selected, setSelected] = useState<string[]>(["react"]);

  return (
    <CheckboxGroup
      label="Tìm kiếm Framework"
      searchable
      searchField={["label", "code", "description"]}
      searchPlaceholder="Tìm theo tên, mã code hoặc mô tả..."
      preserveSelected
      value={selected}
      onChange={setSelected}
      options={frameworks}
    />
  );
}
```

---

### 4. Tìm kiếm Server Mode (Gọi API với Debounce & Bảo lưu mục đã chọn)

```tsx
import { useState } from "react";
import { CheckboxGroup } from "@owa/ui";

export function ServerSearchExample() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSearchProducts = async (query: string) => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=5`
    );
    if (!res.ok) throw new Error("API request failed");
    const data = await res.json();
    
    return data.products.map((p: any) => ({
      value: String(p.id),
      label: p.title,
      description: `$${p.price} - ${p.category}`,
    }));
  };

  return (
    <CheckboxGroup
      label="Chọn sản phẩm"
      searchable
      searchMode="server"
      debounceMs={300}
      onSearch={handleSearchProducts}
      searchPlaceholder="Tìm kiếm sản phẩm từ máy chủ..."
      preserveSelected
      value={selectedProducts}
      onChange={setSelectedProducts}
      color="info"
    />
  );
}
```

---

## 🎛️ Bảng Props & API Reference

### `CheckboxProps`

Kế thừa `Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ ô chọn, icon và nhãn |
| `variant` | `'filled' \| 'outline' \| 'soft' \| 'other'` | `'filled'` | Kiểu dáng hiển thị của box |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Mức độ bo góc |
| `config` | `CheckboxConfig` | `undefined` | Cấu hình cờ trạng thái (`isRequired`, `indeterminate`, `isLoading`, `isInvalid`,...) |
| `disabled` | `boolean` | `false` | Vô hiệu hóa tương tác |
| `readOnly` | `boolean` | `false` | Chế độ chỉ đọc |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | Vị trí hiển thị nhãn |
| `label` | `ReactNode` | `undefined` | Nhãn văn bản cạnh ô checkbox |
| `helperText` | `ReactNode` | `undefined` | Chú thích bên dưới |
| `errorMessage` | `ReactNode` | `undefined` | Thông báo lỗi |
| `icon` | `ReactNode` | `CheckIcon` | Icon tùy biến khi checked |
| `indeterminateIcon` | `ReactNode` | `MinusIcon` | Icon tùy biến khi indeterminate |

---

### `CheckboxGroupProps<TData = unknown>`

Kế thừa `Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children">`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `options` | `CheckboxOptionItem<TData>[]` | `[]` | Mảng dữ liệu các lựa chọn (Data-driven) |
| `value` | `string[]` | `undefined` | Danh sách giá trị đã chọn (Controlled) |
| `defaultValue` | `string[]` | `[]` | Danh sách giá trị mặc định (Uncontrolled) |
| `onChange` | `(values: string[]) => void` | `undefined` | Callback khi danh sách chọn thay đổi |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Bố cục sắp xếp các mục |
| `searchable` | `boolean` | `false` | Bật/tắt thanh tìm kiếm |
| `searchMode` | `'client' \| 'server'` | `'client'` | Chế độ tìm kiếm phía client hoặc gọi API server |
| `searchField` | `string \| string[]` | `'label'` | Các trường dữ liệu dùng để tìm kiếm |
| `filterFn` | `(item: CheckboxOptionItem<TData>, query: string) => boolean` | `undefined` | Hàm lọc tùy biến phía client |
| `onSearch` | `(query: string) => Promise<CheckboxOptionItem<TData>[]>` | `undefined` | Hàm gọi API tìm kiếm phía server |
| `debounceMs` | `number` | `300` | Thời gian trễ gọi hàm `onSearch` (ms) |
| `preserveSelected` | `boolean` | `true` | Bảo lưu các mục đã chọn khi từ khóa tìm kiếm thay đổi |
| `emptyText` | `ReactNode` | `'Không tìm thấy kết quả'` | Thông báo khi không có kết quả |
| `size` | `CheckboxSize` | `'md'` | Kích cỡ truyền xuống toàn bộ checkbox con |
| `color` | `CheckboxColor` | `'primary'` | Màu sắc truyền xuống toàn bộ checkbox con |
| `variant` | `CheckboxVariant` | `'filled'` | Biến thể truyền xuống toàn bộ checkbox con |
| `radius` | `CheckboxRadius` | `undefined` | Bo góc truyền xuống toàn bộ checkbox con |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ nhóm |
| `isReadOnly` | `boolean` | `false` | Chế độ chỉ đọc cho toàn bộ nhóm |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải của nhóm |
| `label` | `ReactNode` | `undefined` | Tiêu đề của nhóm |
| `helperText` | `ReactNode` | `undefined` | Chú thích của nhóm |
| `errorMessage` | `ReactNode` | `undefined` | Thông báo lỗi của nhóm |

---

### `CheckboxOptionItem<TData = unknown>`

| Trường | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `value` | `string` | Giá trị định danh duy nhất của ô chọn |
| `label` | `ReactNode` | Nhãn hiển thị chính |
| `description` | `ReactNode` | Đoạn chú thích/mô tả phụ bên dưới nhãn |
| `disabled` | `boolean` | Vô hiệu hóa ô chọn này |
| `isReadOnly` | `boolean` | Chế độ chỉ đọc cho ô chọn này |
| `indeterminate`| `boolean` | Trạng thái gạch ngang cho ô chọn này |
| `data` | `TData` | Đối tượng dữ liệu gốc đính kèm |
| `[key: string]` | `unknown` | Mở rộng các trường tùy ý (phục vụ lọc theo `searchField`) |
