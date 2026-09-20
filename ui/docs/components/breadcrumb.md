# 🧭 Breadcrumb Component (`@openway/ui`)

Bộ component **Breadcrumb** (Thanh điều hướng phân cấp) chuẩn **OpenWay Design System (Notion Warm Paper Aesthetics)**, hỗ trợ song song **Compound Components Pattern** và **Data-driven `items` API**, tích hợp trực tiếp thẻ `Link` của **Next.js 16**, tự động rút gọn thông minh **(Collapsible Ellipsis với Dropdown Menu)** và tuân thủ tuyệt đối tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Tích hợp Next.js Link**: Component `<BreadcrumbLink>` và mảng dữ liệu `items` mặc định sử dụng thẻ `Link` từ `next/link`, hỗ trợ đầy đủ `href`, `replace`, `scroll`, `prefetch`, `target`, `rel` và cờ `external` (tự động gắn icon và `target="_blank"`).
- **Dual API linh hoạt**:
  - **Compound Components**: `<Breadcrumb>`, `<BreadcrumbList>`, `<BreadcrumbItem>`, `<BreadcrumbLink>`, `<BreadcrumbPage>`, `<BreadcrumbSeparator>`, `<BreadcrumbEllipsis>` cho khả năng tùy biến sâu cấu trúc DOM và giao diện.
  - **Data-driven (`items` prop)**: `<Breadcrumb items={[...]} />` giúp render nhanh chóng từ mảng cấu hình route.
- **Tự động thu gọn thông minh (`maxItems`)**:
  - Khi số lượng mục vượt quá `maxItems`, các trang ở giữa sẽ được gộp vào nút ba chấm `...` (`BreadcrumbEllipsis`).
  - Hỗ trợ 2 chế độ: `collapseMode="dropdown"` (mở menu Dropdown chứa các liên kết bị ẩn) hoặc `collapseMode="expand"` (mở rộng toàn bộ khi click).
- **Phân định rõ ràng giữa Item, Link và Page**:
  - `<BreadcrumbItem>`: Phần tử `<li>` bao bọc một nấc đường dẫn.
  - `<BreadcrumbLink>`: Đường dẫn có thể tương tác (chuyển trang Next.js hoặc click button).
  - `<BreadcrumbPage>`: Văn bản trang hiện tại đang đứng, mang thuộc tính `aria-current="page"` và phong cách chữ than chì đậm.
- **3 Kích thước tiêu chuẩn (`size`)**: `sm` (12px), `md` (14px - *mặc định*), `lg` (16px).
- **3 Biến thể giao diện (`variant`)**:
  - `standard` *(mặc định)*: Tối giản chuẩn Notion, chỉ đổi màu chữ và gạch chân khi hover (`hover:underline underline-offset-4`), không đổi màu nền.
  - `solid`: Dạng thẻ pill nền mềm ấm (`bg-neutral-100`).
  - `bordered`: Dạng thẻ viền hairline siêu mảnh (`border border-neutral-200`).
- **7 Chủ đề màu sắc (`color`)**: `neutral` (*mặc định - Notion Charcoal*), `primary`, `secondary`, `error`, `success`, `warning`, `info`.
- **6 Tùy chỉnh bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **Tùy biến phân cách (`separator`)**: Mặc định sử dụng `<ChevronRightIcon />`, dễ dàng thay đổi thành `/`, `\`, `>` hoặc icon SVG tùy chỉnh.
- **WAI-ARIA Accessibility**: Thẻ `<nav aria-label="Breadcrumb">`, `<ol>`, `<li>`, `role="presentation" aria-hidden="true"` cho separator, `aria-current="page"` cho trang hiện tại.

---

## 🚀 Cài đặt & Import

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  useBreadcrumbContext,
} from "@openway/ui";

import type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
  BreadcrumbItemData,
  BreadcrumbSize,
  BreadcrumbVariant,
  BreadcrumbColor,
  BreadcrumbRadius,
  BreadcrumbUnderline,
  BreadcrumbCollapseMode,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Dạng Compound Components (Cơ bản)

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@openway/ui";

export function BasicCompoundBreadcrumb() {
  return (
    <Breadcrumb ariaLabel="Đường dẫn trang">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings">Cài đặt</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>Hồ sơ cá nhân</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

---

### 2. Dạng Data-driven (`items` prop)

Khi dữ liệu breadcrumb đến từ danh sách route hoặc menu động:

```tsx
import { Breadcrumb } from "@openway/ui";

export function DataDrivenBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { label: "Trang chủ", href: "/" },
        { label: "Dự án", href: "/projects" },
        { label: "Quản lý nhân sự", href: "/projects/hr" },
        { label: "Bảng lương tháng 9" }, // Tự động là trang hiện tại
      ]}
    />
  );
}
```

---

### 3. Tự động thu gọn thông minh (`maxItems` & `collapseMode`)

#### a) Mở Menu Dropdown chứa các trang bị ẩn (`collapseMode="dropdown"`)

```tsx
<Breadcrumb
  maxItems={3}
  itemsBeforeCollapse={1}
  itemsAfterCollapse={1}
  collapseMode="dropdown"
  items={[
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
    { label: "Thiết bị điện tử", href: "/products/electronics" },
    { label: "Điện thoại thông minh", href: "/products/phones" },
    { label: "iPhone 16 Pro Max" },
  ]}
/>
```

#### b) Mở rộng toàn bộ đường dẫn khi click (`collapseMode="expand"`)

```tsx
<Breadcrumb
  maxItems={3}
  collapseMode="expand"
  items={[
    { label: "Trang chủ", href: "/" },
    { label: "Kho tài liệu", href: "/docs" },
    { label: "Kỹ thuật", href: "/docs/engineering" },
    { label: "Frontend", href: "/docs/engineering/frontend" },
    { label: "OpenWay UI Guidelines" },
  ]}
/>
```

---

### 4. Kích thước (`size`)

Hỗ trợ 3 kích thước: `sm` (12px), `md` (14px - mặc định), `lg` (16px).

```tsx
<Breadcrumb size="sm" items={sampleItems} />
<Breadcrumb size="md" items={sampleItems} />
<Breadcrumb size="lg" items={sampleItems} />
```

---

### 5. Biến thể giao diện (`variant`)

- `standard`: Phong cách Notion Warm Paper tối giản, liên kết thanh mảnh.
- `solid`: Khối pill màu mềm ấm, phù hợp cho thanh điều hướng trên thanh công cụ/header.
- `bordered`: Có đường viền mảnh `1px border-neutral-200`.

```tsx
<Breadcrumb variant="standard" items={sampleItems} />
<Breadcrumb variant="solid" items={sampleItems} />
<Breadcrumb variant="bordered" items={sampleItems} />
```

---

### 6. Tùy biến dấu phân cách (`separator`)

Có thể truyền ký tự chuỗi hoặc icon SVG bất kỳ:

```tsx
// Phân cách bằng dấu gạch chéo
<Breadcrumb separator="/" items={sampleItems} />

// Phân cách bằng dấu lớn hơn
<Breadcrumb separator=">" items={sampleItems} />

// Phân cách bằng icon tùy biến
<Breadcrumb separator={<CustomDividerIcon className="size-3 text-neutral-400" />} items={sampleItems} />
```

---

### 7. Tích hợp Icon & Huy hiệu (Badges)

```tsx
import { Breadcrumb, Badge, HomeIcon } from "@openway/ui";

<Breadcrumb
  items={[
    { label: "Trang chủ", href: "/", icon: <HomeIcon /> },
    { label: "Thông báo", href: "/notifications", badge: <Badge size="xs" color="error">3</Badge> },
    { label: "Chi tiết thông báo" },
  ]}
/>
```

---

### 8. Liên kết ngoài (`external`)

Khi truyền `external: true`, component tự động gắn `target="_blank"`, `rel="noopener noreferrer"` và bổ sung icon liên kết ngoài:

```tsx
<BreadcrumbLink href="https://notion.so" external>
  Tài liệu Notion
</BreadcrumbLink>
```

---

## 📊 Bảng Tham Số Props (API Reference)

### `<Breadcrumb>` (Container)

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `items` | `BreadcrumbItemData[]` | — | Mảng dữ liệu các mục (Data-driven mode) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Kích thước hiển thị |
| `variant` | `'standard' \| 'solid' \| 'bordered' \| 'other'` | `'standard'` | Biến thể kiểu dáng giao diện |
| `color` | `'neutral' \| 'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'neutral'` | Chủ đề màu sắc |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo góc các mục |
| `underline` | `'none' \| 'hover' \| 'always'` | `'hover'` | Kiểu gạch chân liên kết |
| `separator` | `ReactNode` | `<ChevronRightIcon />` | Ký hiệu / icon phân cách |
| `maxItems` | `number` | — | Số lượng mục tối đa trước khi thu gọn |
| `itemsBeforeCollapse`| `number` | `1` | Số mục giữ lại ở đầu trước dấu `...` |
| `itemsAfterCollapse` | `number` | `1` | Số mục giữ lại ở cuối sau dấu `...` |
| `collapseMode` | `'dropdown' \| 'expand' \| 'none'` | `'dropdown'` | Hành vi khi click nút thu gọn |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ liên kết |
| `ariaLabel` | `string` | `'Breadcrumb'` | Nhãn trợ năng cho thẻ `<nav>` |

### `BreadcrumbItemData` (Từng mục trong mảng `items`)

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `label` | `ReactNode` | Tiêu đề hiển thị (**Bắt buộc**) |
| `href` | `string` | Đường dẫn chuyển trang Next.js |
| `icon` | `ReactNode` | Icon hiển thị phía trước tiêu đề |
| `endIcon` | `ReactNode` | Icon hiển thị phía sau tiêu đề |
| `badge` | `ReactNode` | Huy hiệu / nhãn đi kèm |
| `current` | `boolean` | Đánh dấu là trang hiện tại (`aria-current="page"`) |
| `disabled` | `boolean` | Vô hiệu hóa mục này |
| `external` | `boolean` | Mở liên kết ở tab mới kèm icon ngoài |
| `onClick` | `(e: MouseEvent) => void` | Callback khi click vào mục |

### `<BreadcrumbLink>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `href` | `string` | — | Đường dẫn điều hướng `next/link` |
| `asChild` | `boolean` | `false` | Truyền quyền render cho component con (Slot) |
| `as` | `ElementType` | — | Tùy biến thẻ render (ví dụ `button`) |
| `external` | `boolean` | `false` | Mở liên kết ở tab mới |
| `startIcon` | `ReactNode` | — | Icon hiển thị phía trước |
| `endIcon` | `ReactNode` | — | Icon hiển thị phía sau |
| `badge` | `ReactNode` | — | Huy hiệu gắn kèm |
| `disabled` | `boolean` | `false` | Vô hiệu hóa liên kết |
