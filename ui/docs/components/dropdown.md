# 🔽 Dropdown Component (`@openway/ui`)

Bộ component **Dropdown Menu** xây dựng theo mô hình **Compound Component** trên nền tảng **`@floating-ui/react`**, hỗ trợ **điều hướng bàn phím WAI-ARIA Menu hoàn chỉnh**, **tự động căn chỉnh vị trí thông minh (flip/shift/offset)**, **hiệu ứng chuyển động mượt mà**, và tương thích hoàn toàn với **React 19 / React Compiler**.

---

## 🌟 Điểm nổi bật

- **Compound Component Pattern**: Cấu trúc module linh hoạt gồm `<Dropdown>`, `<DropdownTrigger>`, `<DropdownMenu>`, `<DropdownItem>`, `<DropdownHeader>`, `<DropdownGroup>`, `<DropdownSeparator>`.
- **Hỗ trợ React 19 & React Compiler**: Áp dụng mô hình `Slot` component giúp xử lý `ref` sạch sẽ qua JSX, không gây lỗi runtime hay cảnh báo `Cannot access refs during render`.
- **Hệ thống z-index đồng bộ**: Tích hợp với `DEFAULT_Z_INDEX.DROPDOWN` (mặc định `50`) từ hệ thống constant toàn cục.
- **Tự động định vị thông minh**: Tính toán vị trí nổi thông minh qua `@floating-ui/react` với các middleware `offset`, `flip`, `shift`.
- **Luôn nổi trên cùng (Floating Portal)**: Menu luôn được render qua `<FloatingPortal>` để không bị ảnh hưởng bởi CSS `overflow: hidden` hoặc `z-index` của cha.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` giúp lấy an toàn `sizeConfig`, `radiusConfig`, `colorConfig`, ngăn ngừa crash giao diện khi nhận giá trị không hợp lệ.
- **WAI-ARIA Accessibility**:
  - `role="menu"` cho dropdown menu container.
  - `role="menuitem"` cho từng item lựa chọn.
  - `role="group"` cho nhóm menu item.
  - `aria-expanded`, `aria-haspopup="menu"`, `aria-disabled`.
  - Hỗ trợ đầy đủ phím tắt bàn phím: `ArrowDown`, `ArrowUp`, `Home`, `End`, `Enter`, `Space`, `Escape`.
- **Nhiều tùy chọn kích thước & màu sắc**:
  - 5 kích cỡ: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl`.
  - 7 chủ đề màu: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
  - 6 cấp độ bo góc: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.

---

## 🚀 Cài đặt & Import

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownHeader,
  DropdownGroup,
  DropdownSeparator,
} from "@openway/ui";
import type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownItemProps,
  DropdownHeaderProps,
  DropdownGroupProps,
  DropdownSeparatorProps,
  DropdownPlacement,
  DropdownSize,
  DropdownRadius,
  DropdownColor,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Menu cơ bản

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@openway/ui";

export function BasicDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Mở Menu</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onClick={() => console.log("Hồ sơ")}>Hồ sơ cá nhân</DropdownItem>
        <DropdownItem onClick={() => console.log("Cài đặt")}>Cài đặt tài khoản</DropdownItem>
        <DropdownItem isDanger onClick={() => console.log("Đăng xuất")}>Đăng xuất</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

### 2. Menu đầy đủ tính năng (Header, Group, Icon, Shortcut, Danger)

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownHeader,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  Button,
} from "@openway/ui";
import { UserIcon, SettingsIcon, LockIcon, TrashIcon } from "@/components/icons";

export function AdvancedDropdown() {
  return (
    <Dropdown placement="bottom-start" size="md">
      <DropdownTrigger>
        <Button variant="outline">Tài khoản của tôi</Button>
      </DropdownTrigger>
      <DropdownMenu minWidth={240}>
        <DropdownHeader>
          <div className="font-semibold text-neutral-900">Nguyễn Văn A</div>
          <div className="text-xs text-neutral-500">vana@example.com</div>
        </DropdownHeader>
        <DropdownSeparator />

        <DropdownGroup title="Quản lý">
          <DropdownItem icon={<UserIcon />} shortcut="⌘P" onClick={() => {}}>
            Hồ sơ cá nhân
          </DropdownItem>
          <DropdownItem icon={<SettingsIcon />} shortcut="⌘S" onClick={() => {}}>
            Cài đặt
          </DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />

        <DropdownGroup title="Bảo mật">
          <DropdownItem icon={<LockIcon />} onClick={() => {}}>
            Đổi mật khẩu
          </DropdownItem>
          <DropdownItem
            icon={<TrashIcon />}
            isDanger
            shortcut="⌘⌫"
            onClick={() => {}}
          >
            Xóa tài khoản
          </DropdownItem>
        </DropdownGroup>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

### 3. Tùy chỉnh Trigger qua `asChild`

Khi bật `asChild` (hoặc truyền trực tiếp một phần tử con hợp lệ), `DropdownTrigger` sẽ truyền toàn bộ accessibility attributes và sự kiện vào phần tử con mà không bọc thêm thẻ `<button>` thừa:

```tsx
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, IconButton } from "@openway/ui";
import { MoreVerticalIcon } from "@/components/icons";

export function CustomTriggerDropdown() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger asChild>
        <IconButton icon={<MoreVerticalIcon />} aria-label="Tùy chọn khác" variant="ghost" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Chỉnh sửa</DropdownItem>
        <DropdownItem>Sao chép liên kết</DropdownItem>
        <DropdownItem isDanger>Xóa mục này</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

### 4. Kích hoạt bằng Hover (`trigger="hover"`)

```tsx
<Dropdown trigger="hover" placement="bottom-start">
  <DropdownTrigger>
    <Button variant="soft">Rê chuột để mở</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Tùy chọn 1</DropdownItem>
    <DropdownItem>Tùy chọn 2</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

---

## ♿ Khả năng truy cập & Điều hướng bàn phím

| Phím bấm | Hành vi |
| :--- | :--- |
| `Enter` / `Space` / `ArrowDown` | Mở menu khi đang focus tại trigger và focus vào item đầu tiên. |
| `ArrowDown` | Di chuyển focus xuống item tiếp theo (tự động bỏ qua item bị `disabled` hoặc separator). |
| `ArrowUp` | Di chuyển focus lên item phía trên (hỗ trợ vòng lặp danh sách `loop: true`). |
| `Home` | Nhảy nhanh tới item đầu tiên trong menu. |
| `End` | Nhảy nhanh tới item cuối cùng trong menu. |
| `Escape` | Đóng menu và trả focus về lại trigger element. |
| `Enter` / `Space` | Kích hoạt sự kiện `onClick` của item đang chọn và đóng menu (nếu `closeOnSelect={true}`). |

---

## 📋 API Reference

### `<Dropdown>` (Root Component)

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Các component con (`DropdownTrigger`, `DropdownMenu`). |
| `open` | `boolean` | — | Trạng thái mở menu (chế độ Controlled). |
| `defaultOpen` | `boolean` | `false` | Trạng thái mở ban đầu (chế độ Uncontrolled). |
| `onOpenChange` | `(open: boolean) => void` | — | Callback khi trạng thái đóng/mở thay đổi. |
| `trigger` | `'click' \| 'hover'` | `'click'` | Kiểu kích hoạt mở dropdown. |
| `placement` | `DropdownPlacement` | `'bottom-start'` | Vị trí hiển thị menu so với trigger. |
| `offset` | `number` | `4` | Khoảng cách (px) giữa trigger và menu. |
| `flip` | `boolean` | `true` | Tự động đảo hướng khi bị tràn mép màn hình. |
| `shift` | `boolean` | `true` | Tự động dịch chuyển menu để không bị che khuất. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thước áp dụng cho menu và items. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo góc của khung menu. |
| `color` | `DropdownColor` | `'primary'` | Tông màu chủ đạo khi item được active/hover. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ Dropdown. |
| `animated` | `boolean` | `true` | Bật/tắt animation mở/đóng menu. |
| `animationDuration` | `number` | `150` | Thời lượng animation (ms). |
| `closeOnSelect` | `boolean` | `true` | Tự động đóng menu khi chọn một item. |
| `closeOnEsc` | `boolean` | `true` | Đóng menu khi nhấn phím `Escape`. |
| `closeOnClickOutside` | `boolean` | `true` | Đóng menu khi click ra ngoài. |

---

### `<DropdownTrigger>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Phần tử con làm trigger. |
| `asChild` | `boolean` | `false` | Sử dụng chính phần tử con thay vì bọc button mặc định. |
| `className` | `string` | `""` | Class CSS tùy biến bổ sung. |
| `ref` | `Ref<HTMLElement>` | — | React 19 Ref trực tiếp vào trigger element. |

---

### `<DropdownMenu>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Nội dung bên trong menu (Header, Group, Item, Separator). |
| `minWidth` | `string \| number` | — | Độ rộng tối thiểu của menu. |
| `zIndex` | `number` | `DEFAULT_Z_INDEX.DROPDOWN` (50) | Thứ tự z-index của menu. |
| `className` | `string` | `""` | Class CSS tùy biến bổ sung. |
| `style` | `CSSProperties` | — | Style inline tùy biến bổ sung. |
| `ref` | `Ref<HTMLDivElement>` | — | React 19 Ref trực tiếp vào menu container. |

---

### `<DropdownItem>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Nhãn hoặc nội dung của item. |
| `icon` | `ReactNode` | — | Icon hiển thị ở phía trước (bên trái). |
| `shortcut` | `string` | — | Ký hiệu phím tắt hiển thị ở bên phải (ví dụ: `"⌘K"`, `"Ctrl+S"`). |
| `color` | `DropdownColor` | — | Ghi đè màu sắc riêng cho item này. |
| `size` | `DropdownSize` | — | Ghi đè kích thước riêng cho item này. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa item (không thể hover hay click). |
| `isDanger` | `boolean` | `false` | Định dạng item theo phong cách cảnh báo/hành động nguy hiểm (chữ đỏ, hover nền đỏ nhạt). |
| `onClick` | `(e: MouseEvent) => void` | — | Callback khi người dùng click vào item. |
| `className` | `string` | `""` | Class CSS tùy biến bổ sung. |
| `ref` | `Ref<HTMLDivElement>` | — | React 19 Ref trực tiếp vào item. |

---

### `<DropdownHeader>`, `<DropdownGroup>`, `<DropdownSeparator>`

- `<DropdownHeader>`: Hiển thị thông tin tiêu đề/tài khoản đầu menu (`<div>` chuẩn WAI-ARIA menu).
- `<DropdownGroup title="Tiêu đề nhóm">`: Gom nhóm các item và hiển thị nhãn nhóm `role="group"`.
- `<DropdownSeparator>`: Đường kẻ ngang phân cách ngữ cảnh giữa các nhóm menu (thẻ `<hr>` ngữ nghĩa HTML5).
