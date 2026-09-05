# 🏷️ Badge Component (`@owa/ui`)

Component **Badge** (Huy hiệu / Nhãn trạng thái / Chip) hiệu năng cao, thiết kế chuẩn **Design System**, **Pure Stateless Component** (0 dependencies) và hỗ trợ đầy đủ **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Pure Stateless Component**: Render nhanh chóng, không phụ thuộc vào global store, dễ dàng sử dụng ở bất kỳ đâu trong JSX.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (20px), `sm` (24px), `md` (28px - *mặc định*), `lg` (32px), `xl` (36px) với typography, padding và kích thước icon tự động căn chỉnh đồng bộ.
- **5 Biến thể giao diện (`variant`)**:
  - `soft` *(mặc định)*: Nền pastel nhạt, chữ đậm, viền mờ 1px nhẹ nhàng, tinh tế.
  - `filled`: Nền màu đậm, độ tương phản cao, chữ trắng nổi bật.
  - `outline`: Nền trong suốt, viền đôi 2px rõ nét theo màu chủ đề.
  - `ghost`: Không viền, nền trong suốt, đổi màu nhẹ khi hover.
  - `other`: Bỏ qua các class màu mặc định, tự do tùy biến màu sắc / gradient qua `className`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **Tùy chỉnh bo góc linh hoạt (`radius`)**: `none` (góc vuông), `sm`, `md`, `lg`, `xl`, `full` (*mặc định* - kiểu dáng viên thuốc Pill).
- **Chấm trạng thái (Status Dot & Radar Ping)**:
  - `dot={true}`: Hiển thị chấm tròn trạng thái đồng bộ màu sắc.
  - `dotPing={true}`: Bật hiệu ứng radar pulse nhấp nháy sinh động (thích hợp cho Live Stream, Trạng thái online, Cảnh báo nguy cấp).
- **Hỗ trợ Icon trước & sau (`leftIcon`, `rightIcon`)**: Tự động scale kích thước icon tương ứng theo `size` của badge.
- **Chế độ Dismissible Chip (`onDelete`)**: Tích hợp sẵn nút xóa/gỡ bỏ `(X)` với hiệu ứng hover và nhãn trợ năng `deleteAriaLabel`.
- **Tương tác Click (`onClick`)**: Tự động chuyển đổi thành nút bấm tương tác (`role="button"`, `tabIndex={0}`), kèm hiệu ứng nhấn `active:scale-[0.98]` mượt mà.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo component luôn an toàn, không bị crash dù truyền giá trị `size`, `variant`, `color`, `radius` không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import { Badge } from "@owa/ui";
import type { BadgeProps, BadgeSize, BadgeVariant, BadgeColor, BadgeRadius } from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { Badge } from "@owa/ui";

export function BasicBadgeExample() {
  return (
    <div className="flex gap-2 items-center">
      <Badge>Mặc định</Badge>
      <Badge color="success">Hoàn thành</Badge>
      <Badge color="warning" variant="filled">Cảnh báo</Badge>
    </div>
  );
}
```

---

### 2. Các kích thước (`size`)

Hỗ trợ 5 kích thước chuẩn: `xs`, `sm`, `md` *(mặc định)*, `lg`, `xl`.

```tsx
<Badge size="xs">Extra Small (20px)</Badge>
<Badge size="sm">Small (24px)</Badge>
<Badge size="md">Medium (28px)</Badge>
<Badge size="lg">Large (32px)</Badge>
<Badge size="xl">Extra Large (36px)</Badge>
```

---

### 3. Các biến thể giao diện (`variant`)

```tsx
// 1. Soft (Mặc định): Nền pastel nhạt
<Badge variant="soft" color="primary">Soft Primary</Badge>

// 2. Filled: Nền đậm, độ tương phản cao
<Badge variant="filled" color="primary">Filled Primary</Badge>

// 3. Outline: Nền trong suốt, viền 2px
<Badge variant="outline" color="primary">Outline Primary</Badge>

// 4. Ghost: Nền trong suốt, không viền
<Badge variant="ghost" color="primary">Ghost Primary</Badge>

// 5. Other: Tự do tùy biến 100% bằng Tailwind
<Badge
  variant="other"
  className="bg-linear-to-r from-violet-600 to-pink-500 text-white shadow-sm border-0"
>
  Gradient VIP
</Badge>
```

---

### 4. Các chủ đề màu sắc (`color`)

Cung cấp 7 tông màu theo chuẩn Design System:

```tsx
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="info">Info</Badge>
<Badge color="neutral">Neutral</Badge>
```

---

### 5. Chấm trạng thái (Status Dot & Radar Ping)

Thích hợp hiển thị trạng thái tài khoản, server, tiến trình:

```tsx
// Chấm trạng thái tĩnh
<Badge dot color="success">Online</Badge>
<Badge dot color="neutral">Offline</Badge>
<Badge dot color="warning">Pending</Badge>

// Chấm trạng thái nhấp nháy (Radar Pulse Ping)
<Badge dot dotPing color="error">Live 2.4k</Badge>
<Badge dot dotPing color="primary" variant="filled">Stream Active</Badge>
```

---

### 6. Icon trước & sau (`leftIcon`, `rightIcon`)

```tsx
import { Badge } from "@owa/ui";
import { SparklesIcon, CheckIcon, ShieldIcon } from "@/components/icons";

export function IconBadgeExample() {
  return (
    <div className="flex gap-2">
      <Badge color="primary" leftIcon={<SparklesIcon />}>
        Đặc quyền VIP
      </Badge>
      <Badge color="success" rightIcon={<CheckIcon />}>
        Đã xác minh
      </Badge>
      <Badge color="secondary" leftIcon={<ShieldIcon />} rightIcon={<CheckIcon />}>
        Bảo mật cao
      </Badge>
    </div>
  );
}
```

---

### 7. Dismissible Chip (Có nút xóa `onDelete`)

Khi truyền prop `onDelete`, Badge sẽ hiển thị nút đóng `(X)` ở góc phải:

```tsx
import { useState } from "react";
import { Badge } from "@owa/ui";

export function ChipListExample() {
  const [tags, setTags] = useState(["React", "TypeScript", "TailwindCSS"]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          color="primary"
          onDelete={() => removeTag(tag)}
          deleteAriaLabel={`Xóa thẻ ${tag}`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

---

### 8. Tương tác bấm (`onClick`)

Badge tự động hỗ trợ cursor pointer, hiệu ứng `active:scale-[0.98]`, `role="button"` và `tabIndex={0}`:

```tsx
<Badge
  color="info"
  variant="soft"
  onClick={() => alert("Đã chọn bộ lọc!")}
>
  Bộ lọc: Mới nhất
</Badge>
```

---

### 9. Tùy chỉnh bo góc (`radius`)

```tsx
<Badge radius="none">radius="none" (0px)</Badge>
<Badge radius="sm">radius="sm" (rounded-sm)</Badge>
<Badge radius="md">radius="md" (rounded-md)</Badge>
<Badge radius="lg">radius="lg" (rounded-lg)</Badge>
<Badge radius="xl">radius="xl" (rounded-xl)</Badge>
<Badge radius="full">radius="full" (Pill - Mặc định)</Badge>
```

---

## 🛠️ API Reference (`BadgeProps`)

Component `Badge` nhận các props mở rộng từ thẻ HTML chuẩn `HTMLAttributes<HTMLSpanElement>`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Kích cỡ của badge (ảnh hưởng chiều cao, padding, font size, icon size). |
| `variant` | `"soft" \| "filled" \| "outline" \| "ghost" \| "other"` | `"soft"` | Biến thể giao diện và phong cách hiển thị màu sắc. |
| `color` | `"primary" \| "secondary" \| "error" \| "success" \| "warning" \| "info" \| "neutral"` | `"primary"` | Chủ đề màu sắc theo Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Độ bo góc của badge. |
| `dot` | `boolean` | `false` | Hiển thị chấm tròn trạng thái ở đầu badge. |
| `dotPing` | `boolean` | `false` | Bật hiệu ứng nhấp nháy (pulse) cho chấm tròn trạng thái. |
| `leftIcon` | `ReactNode` | `undefined` | Icon hoặc phần tử hiển thị phía trước nội dung. |
| `rightIcon` | `ReactNode` | `undefined` | Icon hoặc phần tử hiển thị phía sau nội dung (ẩn khi có `onDelete`). |
| `onDelete` | `() => void` | `undefined` | Callback khi người dùng bấm nút xóa `(X)` trên badge. |
| `deleteAriaLabel` | `string` | `"Remove"` | Nhãn trợ năng (accessibility) cho nút xóa `(X)`. |
| `children` | `ReactNode` | `undefined` | Nội dung văn bản hoặc phần tử hiển thị bên trong badge. |
| `onClick` | `MouseEventHandler<HTMLSpanElement>` | `undefined` | Sự kiện click biến badge thành nút tương tác. |
| `className` | `string` | `""` | Class CSS Tailwind tùy biến bên ngoài. |
| `ref` | `Ref<HTMLSpanElement>` | `undefined` | Ref chuyển tiếp đến thẻ `<span>` của badge. |
