# 💡 Tooltip Component (`@owa/ui`)

Component **Tooltip** (chú giải ngữ cảnh nhanh) xây dựng trên nền tảng **`@floating-ui/react`**, hỗ trợ **chuẩn WAI-ARIA Tooltip**, **tự động căn vị trí thông minh (flip/shift/offset)**, **mũi tên động (FloatingArrow)**, **tích hợp Slot pattern React 19**, và tương thích với hệ thống **Safe Config Fallback**.

---

## 🌟 Điểm nổi bật

- **Tích hợp Slot & React 19**: Tự động gán trực tiếp event listeners và ref vào phần tử con thông qua mô hình `Slot` component mà không cần bọc thêm thẻ `<span>` thừa, bảo toàn 100% layout flexbox/grid ban đầu.
- **Hệ thống z-index đồng bộ**: Sử dụng `DEFAULT_Z_INDEX.TOOLTIP` (mặc định `60`) từ hệ sinh thái constant toàn cục của `@owa/ui`, luôn nổi trên Dropdown và Popover.
- **Mũi tên chỉ hướng thông minh (FloatingArrow)**: Mũi tên SVG tự động xoay và định vị chính xác theo góc lật của tooltip, tự đổi màu viền và nền đồng bộ theo `variant` và `color`.
- **Tự động định vị & chống tràn màn hình**:
  - `offset`: Tự động duy trì khoảng cách tiêu chuẩn với trigger.
  - `flip`: Tự động đảo hướng đối xứng khi chạm viền màn hình (ví dụ: `top` -> `bottom`).
  - `shift`: Tự động dịch chuyển ngang/dọc trong viewport để không bị cắt xén nội dung.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo an toàn tuyệt đối, không crash ứng dụng khi nhận giá trị prop kích thước hoặc màu sắc không hợp lệ.
- **WAI-ARIA Accessibility**:
  - `role="tooltip"` tự động gắn cho hộp chú giải.
  - Tự động kích hoạt khi `hover` chuột hoặc khi nhận tiêu điểm bàn phím (`focus`).
  - Tự động ẩn khi rê chuột ra ngoài (`mouseleave`), mất tiêu điểm (`blur`) hoặc khi nhấn phím `Escape`.
- **Đa dạng biến thể & tùy biến**:
  - 4 biến thể (`variant`): `filled` (*mặc định*), `soft`, `outline`, `other`.
  - 7 chủ đề màu sắc (`color`): `neutral` (*mặc định*), `primary`, `secondary`, `error`, `success`, `warning`, `info`.
  - 5 kích cỡ (`size`): `xs`, `sm`, `md` (*mặc định*), `lg`, `xl`.
  - 6 cấp độ bo góc (`radius`): `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.

---

## 🚀 Cài đặt & Import

```tsx
import { Tooltip } from "@owa/ui";
import type {
  TooltipProps,
  TooltipPlacement,
  TooltipVariant,
  TooltipColor,
  TooltipSize,
  TooltipRadius,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Tooltip cơ bản

```tsx
import { Tooltip, Button } from "@owa/ui";

export function BasicTooltip() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Lưu dữ liệu hiện tại">
        <Button>Lưu</Button>
      </Tooltip>

      <Tooltip content="Hành động này không thể hoàn tác" color="error">
        <Button color="error" variant="soft">Xóa</Button>
      </Tooltip>
    </div>
  );
}
```

---

### 2. Các hướng hiển thị (`placement`)

Hỗ trợ 12 hướng hiển thị phong phú:

```tsx
<div className="grid grid-cols-3 gap-3">
  <Tooltip content="Top Start" placement="top-start">
    <Button variant="outline">Top Start</Button>
  </Tooltip>
  <Tooltip content="Top Center" placement="top">
    <Button variant="outline">Top</Button>
  </Tooltip>
  <Tooltip content="Top End" placement="top-end">
    <Button variant="outline">Top End</Button>
  </Tooltip>

  <Tooltip content="Bottom Start" placement="bottom-start">
    <Button variant="outline">Bottom Start</Button>
  </Tooltip>
  <Tooltip content="Bottom Center" placement="bottom">
    <Button variant="outline">Bottom</Button>
  </Tooltip>
  <Tooltip content="Bottom End" placement="bottom-end">
    <Button variant="outline">Bottom End</Button>
  </Tooltip>
</div>
```

---

### 3. Các biến thể (`variant`) & Màu sắc (`color`)

```tsx
// 1. Filled (Mặc định - Nền đậm tương phản cao)
<Tooltip content="Filled Neutral" variant="filled" color="neutral">
  <Button>Neutral</Button>
</Tooltip>
<Tooltip content="Filled Primary" variant="filled" color="primary">
  <Button color="primary">Primary</Button>
</Tooltip>

// 2. Soft (Nền pastel nhẹ nhàng)
<Tooltip content="Soft Info" variant="soft" color="info">
  <Button color="info" variant="soft">Info</Button>
</Tooltip>
<Tooltip content="Soft Success" variant="soft" color="success">
  <Button color="success" variant="soft">Success</Button>
</Tooltip>

// 3. Outline (Nền trắng viền màu sắc nét)
<Tooltip content="Outline Warning" variant="outline" color="warning">
  <Button color="warning" variant="outline">Warning</Button>
</Tooltip>

// 4. Other (Tự do tùy biến 100% qua className)
<Tooltip
  content="Custom Gradient"
  variant="other"
  className="bg-linear-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg"
>
  <Button>VIP</Button>
</Tooltip>
```

---

### 4. Tùy chỉnh độ trễ hiển thị (`delay`)

```tsx
// Xuất hiện ngay lập tức (không có độ trễ)
<Tooltip content="Hiện ngay lập tức" delay={0}>
  <Button>Instant Tooltip</Button>
</Tooltip>

// Tùy chỉnh độ trễ mở và đóng riêng biệt
<Tooltip content="Mở sau 500ms, đóng sau 100ms" delay={{ open: 500, close: 100 }}>
  <Button>Custom Delay</Button>
</Tooltip>
```

---

### 5. Kết hợp với IconButton & Trạng thái Disabled

```tsx
import { Tooltip, IconButton } from "@owa/ui";
import { EditIcon, TrashIcon } from "@/components/icons";

export function IconButtonsWithTooltip() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Chỉnh sửa thông tin">
        <IconButton icon={<EditIcon />} aria-label="Chỉnh sửa" variant="ghost" />
      </Tooltip>

      {/* Tooltip bị vô hiệu hóa khi không muốn hiển thị */}
      <Tooltip content="Nút này bị khóa" disabled>
        <IconButton icon={<TrashIcon />} aria-label="Xóa" disabled variant="ghost" />
      </Tooltip>
    </div>
  );
}
```

---

## ♿ Khả năng truy cập & Điều hướng bàn phím

| Thao tác | Hành vi |
| :--- | :--- |
| `Hover chuột` | Hiển thị tooltip sau khoảng thời gian trễ `delay.open`. |
| `Rời chuột` | Ẩn tooltip sau khoảng thời gian trễ `delay.close`. |
| `Tab` (Focus bàn phím) | Tự động kích hoạt hiển thị tooltip khi phần tử con nhận focus. |
| `Shift + Tab` / `Blur` | Tự động ẩn tooltip khi phần tử con mất focus. |
| `Escape` | Đóng tooltip ngay lập tức mà không làm mất tiêu điểm của phần tử. |

---

## 📋 API Reference

### `<Tooltip>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `content` | `ReactNode` | *(Bắt buộc)* | Nội dung văn bản hoặc JSX hiển thị bên trong hộp tooltip. |
| `children` | `ReactElement` | *(Bắt buộc)* | Phần tử con kích hoạt tooltip khi hover/focus. |
| `placement` | `TooltipPlacement` | `'top'` | Hướng hiển thị (`'top'`, `'bottom'`, `'left'`, `'right'`, và các biến thể `-start`, `-end`). |
| `variant` | `'filled' \| 'soft' \| 'outline' \| 'other'` | `'filled'` | Biến thể phong cách giao diện của tooltip. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'neutral'` | Chủ đề màu sắc của tooltip. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ padding, font-size và kích thước mũi tên. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo cong của các góc khung tooltip. |
| `hasArrow` | `boolean` | `true` | Bật/tắt mũi tên định vị chỉ về phía trigger. |
| `offset` | `number` | `8` | Khoảng cách (px) giữa trigger và khung tooltip. |
| `flip` | `boolean` | `true` | Tự động đảo hướng khi bị chạm mép màn hình. |
| `shift` | `boolean` | `true` | Tự động dịch chuyển để tooltip nằm trọn trong viewport. |
| `delay` | `number \| { open?: number; close?: number }` | `{ open: 200, close: 150 }` | Thời gian trễ khi mở / đóng tooltip (ms). |
| `disabled` | `boolean` | `false` | Vô hiệu hóa không cho phép hiển thị tooltip. |
| `open` | `boolean` | — | Trạng thái mở/đóng ở chế độ Controlled. |
| `defaultOpen` | `boolean` | `false` | Trạng thái mở ban đầu ở chế độ Uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Callback khi trạng thái hiển thị thay đổi. |
| `animated` | `boolean` | `true` | Bật/tắt hiệu ứng chuyển động mượt khi xuất hiện/biến mất. |
| `animationDuration` | `number` | `150` | Thời lượng hiệu ứng chuyển động (ms). |
| `zIndex` | `number` | `DEFAULT_Z_INDEX.TOOLTIP` (60) | Thứ tự z-index của tooltip. |
| `className` | `string` | `""` | Class CSS tùy biến cho khung tooltip. |
| `arrowClassName` | `string` | `""` | Class CSS tùy biến cho mũi tên định vị. |
| `portal` | `boolean` | `true` | Bật/tắt chế độ render nội dung tooltip qua `FloatingPortal`. |
| `portalRoot` | `HTMLElement \| null \| RefObject<HTMLElement \| null>` | — | Phần tử DOM hoặc Ref dùng làm root container cho portal. Tự động liên kết với dialog của Modal hoặc Confirm khi mở bên trong Modal/Confirm. |
