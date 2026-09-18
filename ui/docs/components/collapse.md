# 🗂️ Collapse Component (`@openway/ui`)

Component **Collapse** (Accordion / Collapsible panel) hiện đại, hiệu năng cao, thiết kế chuẩn **Declarative Compound Components Pattern** (`<Collapse>`, `<CollapsePanel>`, `<CollapseHeader>`, `<CollapseContent>`, `<Collapsible>`), tích hợp **CSS Grid Height Transition**, **Accordion Mode**, **Custom Slots & Subcomponents**, **Safe Config Fallback** (`getSafeConfig`) và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Compound Components Pattern chuẩn chỉ**: Tách biệt rõ ràng `<Collapse>`, `<CollapsePanel>`, `<CollapseHeader>`, `<CollapseContent>`, hỗ trợ 2 phong cách viết linh hoạt (khai báo nhanh qua Props hoặc tùy biến sâu qua Subcomponents).
- **Hiệu ứng gập mở siêu mượt (CSS Grid Transition)**: Sử dụng kỹ thuật chuyển đổi `transition-[grid-template-rows]` (`grid-rows-[1fr]` khi mở và `grid-rows-[0fr]` khi đóng), tự động tính toán chiều cao nội dung động mà không cần đo đạc DOM bằng JavaScript.
- **Chế độ Accordion & Multiple Open**:
  - `accordion={true}`: Tự động đóng các panel khác khi mở một panel mới.
  - `accordion={false}`: Cho phép mở nhiều panel đồng thời.
- **Chế độ Controlled & Uncontrolled**:
  - **Controlled**: Quản lý bằng `activeKey` + callback `onChange`.
  - **Uncontrolled**: Tự quản lý nội bộ với `defaultActiveKey`.
- **5 Biến thể giao diện (`variant`)**:
  - `outlined` (*mặc định*): Khung viền ngoài và các đường kẻ phân cách mang màu sắc chủ đề.
  - `filled`: Khối nền mang màu sắc chủ đề nhẹ tạo cảm giác liền mạch.
  - `ghost`: Trong suốt, không viền ngoài tối giản.
  - `separated`: Mỗi panel là một thẻ card riêng biệt cách nhau bởi khoảng trống `space-y-3`.
  - `other`: Không áp dụng style mặc định, tự do tùy biến qua `className`.
- **3 Kích thước tiêu chuẩn (`size`)**: `sm`, `md` (*mặc định*), `lg`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **6 Kiểu bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **Tùy biến icon & vị trí mũi tên (`expandIconPosition`)**:
  - `expandIconPosition`: `"right"` (*mặc định*), `"left"`, hoặc `"none"`.
  - `expandIcon`: Tùy biến icon hoặc render function `({ isActive, disabled }) => ReactNode`.
- **Extra Slot & Hành động phụ**: Hỗ trợ truyền badge, nút bấm, icon action (`extra`) vào header mà không kích hoạt sự kiện toggle của header.
- **Giải phóng bộ nhớ (`destroyInactivePanel`)**: Tự động unmount nội dung khỏi DOM khi panel bị đóng.
- **Component độc lập `<Collapsible>`**: Cung cấp khung gập mở độc lập nhẹ nhàng cho bất kỳ nội dung nào.
- **WAI-ARIA Accessibility & Bàn phím**: Tự động gắn `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`, hỗ trợ đầy đủ phím `Enter` và `Space`.
- **Safe Config Fallback**: Tích hợp `getSafeConfig` từ `@/utils/function` đảm bảo an toàn tuyệt đối, không crash ứng dụng khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import {
  Collapse,
  CollapsePanel,
  CollapseHeader,
  CollapseContent,
  Collapsible,
  useCollapseContext,
  useCollapsePanelContext,
  collapseSizeConfig,
  collapseRadiusConfig,
  collapseVariantContainerConfig,
  collapseVariantPanelConfig,
  collapseVariantHeaderConfig,
  collapseColorConfig,
} from "@openway/ui";

import type {
  CollapseProps,
  CollapsePanelProps,
  CollapseHeaderProps,
  CollapseContentProps,
  CollapsibleProps,
  CollapseSize,
  CollapseVariant,
  CollapseColor,
  CollapseRadius,
  CollapseExpandIconPosition,
  CollapseActiveKey,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách 1: Khai báo nhanh qua Props (Declarative Panel Props)

Phù hợp cho hầu hết các trường hợp thông dụng:

```tsx
import { Collapse, CollapsePanel } from "@openway/ui";

export function BasicCollapse() {
  return (
    <Collapse defaultActiveKey={["1"]} variant="outlined" color="primary">
      <CollapsePanel
        value="1"
        label="1. Giới thiệu tổng quan"
        description="Thông tin nền tảng và kiến trúc hệ thống"
      >
        <p className="text-neutral-600">
          Đây là nội dung chi tiết của panel đầu tiên.
        </p>
      </CollapsePanel>

      <CollapsePanel value="2" label="2. Hướng dẫn cài đặt nhanh">
        <p className="text-neutral-600">
          Chạy lệnh <code>pnpm add @openway/ui</code> để bắt đầu sử dụng.
        </p>
      </CollapsePanel>

      <CollapsePanel value="3" label="3. Câu hỏi thường gặp" disabled>
        <p className="text-neutral-600">
          Panel này đang bị vô hiệu hóa.
        </p>
      </CollapsePanel>
    </Collapse>
  );
}
```

---

### 2. Cách 2: Tùy biến sâu qua Subcomponents (`<CollapseHeader>` & `<CollapseContent>`)

Cho phép bạn tự do composition cấu trúc giao diện phức tạp:

```tsx
import { Collapse, CollapsePanel, CollapseHeader, CollapseContent } from "@openway/ui";
import { Badge, Button } from "@openway/ui";

export function CustomSlotCollapse() {
  return (
    <Collapse variant="separated">
      <CollapsePanel value="order-101">
        <CollapseHeader
          extra={
            <div className="flex items-center gap-2">
              <Badge color="success">Đã thanh toán</Badge>
              <Button size="sm" variant="ghost">In hóa đơn</Button>
            </div>
          }
        >
          <span className="font-bold text-neutral-900">
            Đơn hàng #101 - $149.00
          </span>
        </CollapseHeader>
        <CollapseContent>
          <div className="space-y-2">
            <p>Khách hàng: Nguyễn Văn A</p>
            <p>Địa chỉ: 123 Đường Lê Lợi, Q.1, TP.HCM</p>
          </div>
        </CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}
```

---

### 3. Chế độ Accordion (Chỉ mở 1 panel tại một thời điểm)

```tsx
<Collapse accordion defaultActiveKey="faq-1" color="primary">
  <CollapsePanel value="faq-1" label="Làm sao để đổi mật khẩu?">
    <p>Truy cập mục Cài đặt tài khoản và chọn Đổi mật khẩu.</p>
  </CollapsePanel>
  <CollapsePanel value="faq-2" label="Chính sách hoàn tiền như thế nào?">
    <p>Chúng tôi hoàn tiền 100% trong vòng 30 ngày đầu tiên.</p>
  </CollapsePanel>
</Collapse>
```

---

### 4. Các biến thể giao diện (`variant`)

```tsx
{/* 1. Outlined (Mặc định) */}
<Collapse variant="outlined">...</Collapse>

{/* 2. Filled */}
<Collapse variant="filled">...</Collapse>

{/* 3. Ghost (Tối giản) */}
<Collapse variant="ghost">...</Collapse>

{/* 4. Separated (Thẻ card rời rạc) */}
<Collapse variant="separated">...</Collapse>
```

---

### 5. Chế độ điều khiển chủ động (Controlled Mode)

```tsx
import { useState } from "react";
import { Collapse, CollapsePanel } from "@openway/ui";

export function ControlledCollapse() {
  const [activeKeys, setActiveKeys] = useState<string | number | (string | number)[]>(["1"]);

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button onClick={() => setActiveKeys(["1"])} className="px-3 py-1 bg-primary-600 text-white rounded">
          Mở Panel 1
        </button>
        <button onClick={() => setActiveKeys(["1", "2"])} className="px-3 py-1 bg-primary-600 text-white rounded">
          Mở cả 1 và 2
        </button>
        <button onClick={() => setActiveKeys([])} className="px-3 py-1 bg-neutral-600 text-white rounded">
          Đóng tất cả
        </button>
      </div>

      <Collapse activeKey={activeKeys} onChange={setActiveKeys}>
        <CollapsePanel value="1" label="Panel 1">Nội dung 1</CollapsePanel>
        <CollapsePanel value="2" label="Panel 2">Nội dung 2</CollapsePanel>
      </Collapse>
    </div>
  );
}
```

---

### 6. Sử dụng component gập mở độc lập `<Collapsible>`

```tsx
import { useState } from "react";
import { Collapsible, Button } from "@openway/ui";

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border p-4 rounded-xl">
      <Button onClick={() => setOpen(!open)}>
        {open ? "Thu gọn chi tiết" : "Xem thêm chi tiết"}
      </Button>

      <Collapsible open={open} className="mt-3">
        <div className="p-3 bg-neutral-50 rounded-lg">
          Nội dung mở rộng linh hoạt không cần nằm trong Collapse list.
        </div>
      </Collapsible>
    </div>
  );
}
```

---

## 📊 Bảng thuộc tính Props

### `<Collapse>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `activeKey` | `string \| number \| (string \| number)[]` | - | Khóa các panel đang mở (Controlled mode) |
| `defaultActiveKey` | `string \| number \| (string \| number)[]` | - | Khóa các panel mở ban đầu (Uncontrolled mode) |
| `onChange` | `(activeKey) => void` | - | Callback kích hoạt khi trạng thái mở/đóng thay đổi |
| `accordion` | `boolean` | `false` | Chế độ chỉ mở tối đa 1 panel |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Kích thước hiển thị |
| `variant` | `"outlined" \| "filled" \| "ghost" \| "separated" \| "other"` | `"outlined"` | Biến thể kiểu dáng giao diện |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Chủ đề màu sắc |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Tùy chỉnh bo góc |
| `expandIconPosition` | `"left" \| "right" \| "none"` | `"right"` | Vị trí icon mũi tên |
| `expandIcon` | `ReactNode \| ((props) => ReactNode)` | - | Custom icon mũi tên |
| `destroyInactivePanel`| `boolean` | `false` | Tự động unmount nội dung DOM khi panel đóng |
| `children` | `ReactNode` | - | Danh sách các `<CollapsePanel>` |

---

### `<CollapsePanel>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | **Bắt buộc** | Khóa định danh duy nhất của panel |
| `label` | `ReactNode` | - | Tiêu đề panel (khi dùng cách khai báo nhanh) |
| `description` | `ReactNode` | - | Phụ đề mô tả ngắn |
| `startIcon` | `ReactNode` | - | Icon đặt phía trước tiêu đề |
| `extra` | `ReactNode` | - | Nội dung phụ bên phải (badge, action) |
| `disabled` | `boolean` | `false` | Vô hiệu hóa panel |
| `showArrow` | `boolean` | `true` | Hiển thị icon mũi tên |
| `destroyInactivePanel`| `boolean` | - | Ghi đè cấu hình unmount cho riêng panel này |
| `children` | `ReactNode` | - | Nội dung body hoặc `<CollapseHeader>` & `<CollapseContent>` |

---

### `<CollapseHeader>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `startIcon` | `ReactNode` | - | Icon đặt phía trước tiêu đề |
| `description` | `ReactNode` | - | Phụ đề mô tả |
| `extra` | `ReactNode` | - | Vùng hành động phụ bên phải |
| `showArrow` | `boolean` | `true` | Hiển thị mũi tên mở rộng |
| `children` | `ReactNode` | - | Nội dung tiêu đề JSX |

---

### `<CollapseContent>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `destroyInactivePanel`| `boolean` | - | Tự động gỡ nội dung khỏi DOM khi đóng |
| `children` | `ReactNode` | - | Nội dung chi tiết bên trong panel |

---

## ⌨️ Phím tắt & Trợ năng (Accessibility)

- **`role="region"`**: Thẻ nội dung được đánh dấu là vùng nội dung bổ sung.
- **`aria-expanded` & `aria-controls`**: Nút Header tự động đồng bộ trạng thái đóng/mở với ID của Content panel.
- **Phím `Enter` / `Space`**: Nhấn để đóng hoặc mở panel khi đang focus vào tiêu đề.
- **Ngăn chặn xung đột sự kiện**: Vùng `extra` được tách biệt bên ngoài thẻ `<button>` trigger để tránh lỗi nested interactive element.

---

## 🧪 Kiểm thử Component (Cypress Testing)

Component được kiểm thử 100% bằng **Cypress Component Testing** tại [`Collapse.cy.tsx`](Collapse.cy.tsx):

```bash
pnpm --filter @openway/ui cypress:run --spec "src/components/collapse/Collapse.cy.tsx"
```
