# 🔘 Radio & RadioGroup Component (`@owa/ui`)

Bộ đôi component **Radio** và **RadioGroup** chuyên nghiệp, thiết kế theo kiến trúc **Data-driven thuần túy (Pure Data-driven)**, không sử dụng React Context, loại bỏ hoàn toàn `useEffect` gây cascading render, tích hợp **Live Search (Client & Server modes)** thông qua component `Input` variant `outline`, hỗ trợ **bảo lưu mục đã chọn (Preserve Selected)** và tuân thủ chặt chẽ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

### 1. Radio
- **Độc lập & Tối ưu**: Không phụ thuộc vào Context, nhận props trực tiếp, hỗ trợ chuyển tiếp `ref` chuẩn React 19 mà không cần wrapper trung gian.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl` đồng bộ tỉ lệ ô tròn, dot indicator bên trong, nhãn và văn bản chú thích.
- **4 Biến thể giao diện (`variant`)**:
  - `filled` (*mặc định*): Nền màu đặc tương phản cao khi được chọn.
  - `outline`: Nền trong suốt, viền và dot mang màu chủ đề.
  - `soft`: Nền pastel dịu mắt (`bg-{color}-100`).
  - `other`: Tự do tùy biến style qua `boxClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **2 Vị trí đặt nhãn (`labelPlacement`)**: `right` (*mặc định*) và `left` (căn đều hai bên).
- **Safe Config Fallback**: Sử dụng `getSafeConfig` đảm bảo component luôn an toàn, không bao giờ bị lỗi hiển thị khi nhận giá trị không hợp lệ.

### 2. RadioGroup
- **Kiến trúc Data-driven thuần túy**: Nhận danh sách lựa chọn qua prop `options: RadioOptionItem<TData>[]`. Không còn cấu trúc compound component cồng kềnh, không tốn chi phí Context Provider.
- **Tích hợp tìm kiếm trực quan (`searchable`)**:
  - Sử dụng component `Input` variant `outline` với icon tìm kiếm (`SearchIcon`) và nút xóa nhanh (`isClearable`).
  - **Không làm mất focus**: Trạng thái tải ngầm hiển thị spinner ở góc phải qua `rightIcon`, không disable input trong khi người dùng đang gõ phím.
- **2 Chế độ tìm kiếm linh hoạt (`searchMode`)**:
  - `client` (*mặc định*): Tìm kiếm thông minh bằng thuật toán fuzzy ranking của `@tanstack/match-sorter-utils`. Hỗ trợ tìm theo đa trường dữ liệu (`searchField`) hoặc custom function (`filterFn`).
  - `server`: Tìm kiếm qua API máy chủ với `onSearch` và bộ đệm thời gian `debounceMs`.
- **Bảo lưu mục đã chọn (`preserveSelected`)**: Tự động ghim lại mục đã chọn lên đầu danh sách khi chuyển đổi từ khóa tìm kiếm mới, quản lý bộ nhớ thông minh (chỉ lưu mục thực sự được chọn).
- **2 Bố cục sắp xếp (`orientation`)**: `vertical` (*mặc định*) và `horizontal`.

---

## 🚀 Cài đặt & Import

```tsx
import { Radio, RadioGroup } from "@owa/ui";
import type {
  RadioProps,
  RadioGroupProps,
  RadioOptionItem,
  RadioSize,
  RadioVariant,
  RadioColor,
  RadioLabelPlacement,
  RadioSearchMode,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Sử dụng Radio đơn lẻ

```tsx
import { useState } from "react";
import { Radio } from "@owa/ui";

export function SingleRadioExample() {
  const [selected, setSelected] = useState(false);

  return (
    <Radio
      checked={selected}
      onChange={(e) => setSelected(e.target.checked)}
      label="Nhận thông báo qua email"
      helperText="Bạn có thể hủy đăng ký bất cứ lúc nào"
    />
  );
}
```

---

### 2. RadioGroup cơ bản (Data-driven)

```tsx
import { useState } from "react";
import { RadioGroup } from "@owa/ui";

export function BasicGroupExample() {
  const [delivery, setDelivery] = useState<string | null>("standard");

  return (
    <RadioGroup
      label="Phương thức giao hàng"
      helperText="Chọn hình thức vận chuyển phù hợp"
      value={delivery}
      onChange={setDelivery}
      color="primary"
      orientation="vertical"
      options={[
        { value: "standard", label: "Giao hàng tiêu chuẩn (2-3 ngày)" },
        { value: "express", label: "Giao hàng hỏa tốc (1 ngày)" },
        { value: "same_day", label: "Giao hàng trong ngày" },
      ]}
    />
  );
}
```

---

### 3. Tìm kiếm Client Mode (Fuzzy Search & Đa trường)

```tsx
import { useState } from "react";
import { RadioGroup } from "@owa/ui";

const frameworks = [
  { value: "react", label: "React JS", code: "FE-01", description: "Facebook library" },
  { value: "vue", label: "Vue JS", code: "FE-02", description: "Progressive framework" },
  { value: "angular", label: "Angular", code: "FE-03", description: "Google platform" },
  { value: "svelte", label: "Svelte", code: "FE-04", description: "Cybernetically enhanced" },
];

export function ClientSearchExample() {
  const [selected, setSelected] = useState<string | null>("react");

  return (
    <RadioGroup
      label="Chọn Framework chính"
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
import { RadioGroup } from "@owa/ui";

export function ServerSearchExample() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

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
    <RadioGroup
      label="Chọn sản phẩm yêu thích"
      searchable
      searchMode="server"
      onSearch={handleSearchProducts}
      searchPlaceholder="Tìm kiếm sản phẩm từ máy chủ..."
      preserveSelected
      value={selectedProduct}
      onChange={setSelectedProduct}
      color="info"
    />
  );
}
```

---

## 🎛️ Bảng Props & API Reference

### `RadioProps`

Kế thừa `Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ ô chọn tròn, dot và nhãn |
| `variant` | `'filled' \| 'outline' \| 'soft' \| 'other'` | `'filled'` | Kiểu dáng hiển thị của box khi checked |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc |
| `disabled` | `boolean` | `false` | Vô hiệu hóa tương tác |
| `readOnly` | `boolean` | `false` | Chế độ chỉ đọc |
| `config` | `RadioConfig` | `undefined` | Cấu hình cờ trạng thái (`isLoading` - spinner thay dot, `isRequired`, `isInvalid`) |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | Vị trí hiển thị nhãn |
| `label` | `ReactNode` | `undefined` | Nhãn văn bản cạnh ô radio |
| `helperText` | `ReactNode` | `undefined` | Chú thích bên dưới |
| `errorMessage` | `ReactNode` | `undefined` | Thông báo lỗi |
| `dotIcon` | `ReactNode` | `RadioDotIcon` | Icon tùy biến thay thế dot bên trong |

---

### `RadioGroupProps<TData = unknown, TValue extends string | number = string>`

Kế thừa `Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children">`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `options` | `RadioOptionItem<TData, TValue>[]` | `[]` | Mảng dữ liệu các lựa chọn (Data-driven) |
| `value` | `TValue \| null` | `undefined` | Giá trị đang chọn (Controlled) |
| `defaultValue` | `TValue \| null` | `null` | Giá trị mặc định (Uncontrolled) |
| `onChange` | `(value: TValue \| null) => void` | `undefined` | Callback khi lựa chọn thay đổi |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Bố cục sắp xếp các mục |
| `searchable` | `boolean` | `false` | Bật/tắt thanh tìm kiếm |
| `searchMode` | `'client' \| 'server'` | `'client'` | Chế độ tìm kiếm phía client hoặc gọi API server |
| `searchField` | `string \| string[]` | `'label'` | Các trường dữ liệu dùng để tìm kiếm |
| `filterFn` | `(item: RadioOptionItem<TData, TValue>, query: string) => boolean` | `undefined` | Hàm lọc tùy biến phía client |
| `onSearch` | `(query: string, ...args: unknown[]) => void \| Promise<void>` | `undefined` | Callback khi người dùng gõ tìm kiếm (Server mode) |
| `listFooter` | `ReactNode` | `undefined` | Nội dung ở đáy danh sách (Sentinel / Skeleton loading) |
| `maxHeight` | `number \| string` | `undefined` | Giới hạn chiều cao và bật thanh cuộn dọc cho danh sách |
| `preserveSelected` | `boolean` | `true` | Bảo lưu mục đã chọn khi từ khóa tìm kiếm thay đổi |
| `emptyText` | `ReactNode` | `'Không tìm thấy kết quả'` | Thông báo khi không có kết quả |
| `emptyProps` | `Partial<EmptyProps>` | `undefined` | Tùy biến props cho component `Empty` khi danh sách trống |
| `size` | `RadioSize` | `'md'` | Kích cỡ truyền xuống toàn bộ radio con |
| `color` | `RadioColor` | `'primary'` | Màu sắc truyền xuống toàn bộ radio con |
| `variant` | `RadioVariant` | `'filled'` | Biến thể truyền xuống toàn bộ radio con |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ nhóm |
| `isReadOnly` | `boolean` | `false` | Chế độ chỉ đọc cho toàn bộ nhóm |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải dữ liệu (Data Loading từ API/query) |
| `skeletonCount` | `number` | `3` | Số lượng dòng Skeleton hiển thị khi đang tải dữ liệu |
| `renderSkeleton` | `() => ReactNode` | `undefined` | Tùy biến render giao diện Skeleton khi tải dữ liệu |
| `config` | `RadioGroupConfig` | `undefined` | Cấu hình cờ trạng thái (`isLoading` - trạng thái bận khóa tương tác, `isRequired`, `isInvalid`,...) |
| `label` | `ReactNode` | `undefined` | Tiêu đề của nhóm |
| `helperText` | `ReactNode` | `undefined` | Chú thích của nhóm |
| `errorMessage` | `ReactNode` | `undefined` | Thông báo lỗi của nhóm |

---

### `RadioOptionItem<TData = unknown, TValue extends string | number = string | number>`

| Trường | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `value` | `TValue` | Giá trị định danh duy nhất của ô chọn (string hoặc number) |
| `label` | `ReactNode` | Nhãn hiển thị chính |
| `description` | `ReactNode` | Đoạn chú thích/mô tả phụ bên dưới nhãn |
| `disabled` | `boolean` | Vô hiệu hóa ô chọn này |
| `isReadOnly` | `boolean` | Chế độ chỉ đọc cho ô chọn này |
| `data` | `TData` | Đối tượng dữ liệu gốc đính kèm |
| `[key: string]` | `unknown` | Mở rộng các trường tùy ý (phục vụ lọc theo `searchField`) |
