# 📑 Tabs Component (`@owa/ui`)

Bộ component **Tabs** tương tác cao, thiết kế chuẩn **Compound Components Pattern** (`<Tabs>`, `<TabList>`, `<Tab>`, `<TabPanels>`, `<TabPanel>`), tích hợp **Sliding Animated Indicator**, **Overflow Scroll**, **Custom Hook `useTabIndicator`**, **Safe Config Fallback** và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Compound Components Pattern chuẩn chỉ**: Tách biệt rõ ràng các thành phần `<Tabs>`, `<TabList>`, `<Tab>`, `<TabPanels>`, `<TabPanel>`, tối đa hóa khả năng tùy biến layout và composition.
- **Sliding Animated Indicator mượt mà**: Tự động tính toán vị trí, kích thước và chuyển động trượt mượt mà cho mọi variant (`line`, `solid`, `bordered`, `flat`), hỗ trợ tự động căn chỉnh khi resize màn hình thông qua `ResizeObserver`.
- **Custom Hook `useTabIndicator` độc lập**: Tách biệt toàn bộ logic tính toán toạ độ indicator, kiểm tra tràn viền và điều hướng bàn phím thành hook riêng để dễ bảo trì và tái sử dụng.
- **Controlled & Uncontrolled Mode**: Hỗ trợ linh hoạt cả `activeKey` + `onChange` (Controlled) và `defaultActiveKey` (Uncontrolled).
- **3 Kích thước tiêu chuẩn (`size`)**: `sm`, `md` (*mặc định*), `lg`.
- **5 Biến thể giao diện (`variant`)**:
  - `line` *(mặc định)*: Thanh gạch dưới/bên trượt mượt mà.
  - `solid`: Khối pill nền đậm nổi bật.
  - `bordered`: Bao khung viền quanh tab.
  - `flat`: Khối pill nền mềm nhạt (soft pill).
  - `other`: Tự do tùy biến 100% qua `className`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **6 Tùy chỉnh bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **Hướng & Vị trí đa dạng (`orientation` & `placement`)**:
  - Ngang (`horizontal`): `top` (*mặc định*), `bottom`.
  - Dọc (`vertical`): `left`, `right`.
- **Cuộn khi tràn viền (Scrollable Overflow & Chevrons)**: Tự động hiển thị 2 nút chevron cuộn trái/phải khi danh sách tabs vượt quá chiều rộng container, tự động cuộn `scrollIntoView` tab active.
- **Đóng / Xóa tab tiện lợi (`closable`)**: Cho phép click nút đóng hoặc nhấn phím `Delete` / `Backspace` khi đang focus vào tab.
- **WAI-ARIA Accessibility & Keyboard Navigation**: Hỗ trợ đầy đủ `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, phím mũi tên `ArrowLeft` / `ArrowRight` / `ArrowUp` / `ArrowDown`, `Home`, `End`.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` giúp component luôn an toàn, không bị crash kể cả khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTabsContext,
  useTabIndicator,
} from "@owa/ui";

import type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelsProps,
  TabPanelProps,
  TabSize,
  TabVariant,
  TabColor,
  TabRadius,
  TabOrientation,
  TabPlacement,
  UseTabIndicatorOptions,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản (Compound Components)

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@owa/ui";

export function BasicTabsExample() {
  return (
    <Tabs defaultActiveKey="overview" variant="line" color="primary">
      <TabList>
        <Tab value="overview" label="Tổng quan" />
        <Tab value="profile" label="Hồ sơ" />
        <Tab value="settings" label="Cài đặt" />
      </TabList>

      <TabPanels>
        <TabPanel value="overview">
          <p className="p-4 text-neutral-700">Nội dung trang tổng quan</p>
        </TabPanel>
        <TabPanel value="profile">
          <p className="p-4 text-neutral-700">Thông tin hồ sơ người dùng</p>
        </TabPanel>
        <TabPanel value="settings">
          <p className="p-4 text-neutral-700">Cấu hình cài đặt hệ thống</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

---

### 2. Chế độ điều khiển (Controlled vs Uncontrolled)

#### a) Controlled Mode (Quản lý state từ bên ngoài)
```tsx
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@owa/ui";

export function ControlledTabs() {
  const [activeKey, setActiveKey] = useState<string | number>("tab-1");

  return (
    <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
      <TabList>
        <Tab value="tab-1" label="Tab 1" />
        <Tab value="tab-2" label="Tab 2" />
      </TabList>
      <TabPanels>
        <TabPanel value="tab-1">Nội dung 1</TabPanel>
        <TabPanel value="tab-2">Nội dung 2</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

#### b) Uncontrolled Mode (Tự quản lý nội bộ với `defaultActiveKey`)
```tsx
<Tabs defaultActiveKey="tab-2">
  <TabList>
    <Tab value="tab-1" label="Tab 1" />
    <Tab value="tab-2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="tab-1">Nội dung 1</TabPanel>
    <TabPanel value="tab-2">Nội dung 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

### 3. Các kích thước (`size`)

Hỗ trợ 3 kích cỡ: `sm`, `md` (*mặc định*), `lg`:

```tsx
<Tabs size="sm" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Small Tab" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Nội dung kích thước nhỏ</TabPanel>
    <TabPanel value="2">Nội dung 2</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="md" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Medium Tab (Mặc định)" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Nội dung kích thước vừa</TabPanel>
    <TabPanel value="2">Nội dung 2</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="lg" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Large Tab" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Nội dung kích thước lớn</TabPanel>
    <TabPanel value="2">Nội dung 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

### 4. Các biến thể giao diện (`variant`)

```tsx
// 1. Line (Mặc định): Thanh gạch dưới/bên trượt
<Tabs variant="line" defaultActiveKey="1">...</Tabs>

// 2. Solid: Khối pill nền nổi bật
<Tabs variant="solid" defaultActiveKey="1">...</Tabs>

// 3. Bordered: Bao viền khung
<Tabs variant="bordered" defaultActiveKey="1">...</Tabs>

// 4. Flat: Khối pill nền mềm nhạt
<Tabs variant="flat" defaultActiveKey="1">...</Tabs>

// 5. Other: Tự do tùy biến class hoàn toàn
<Tabs variant="other" defaultActiveKey="1">...</Tabs>
```

---

### 5. Các chủ đề màu sắc (`color`)

Cung cấp 7 màu sắc theo chuẩn Design System:

```tsx
<Tabs color="primary" variant="solid" defaultActiveKey="1">...</Tabs>
<Tabs color="secondary" variant="solid" defaultActiveKey="1">...</Tabs>
<Tabs color="neutral" variant="solid" defaultActiveKey="1">...</Tabs>
<Tabs color="error" variant="solid" defaultActiveKey="1">...</Tabs>
<Tabs color="success" variant="solid" defaultActiveKey="1">...</Tabs>
<Tabs color="warning" variant="solid" defaultActiveKey="1">...</Tabs>
<Tabs color="info" variant="solid" defaultActiveKey="1">...</Tabs>
```

---

### 6. Hướng và Vị trí (`orientation` & `placement`)

```tsx
// Dọc bên trái (Vertical Left)
<Tabs orientation="vertical" placement="left" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Menu 1" />
    <Tab value="2" label="Menu 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Nội dung menu 1</TabPanel>
    <TabPanel value="2">Nội dung menu 2</TabPanel>
  </TabPanels>
</Tabs>

// Dọc bên phải (Vertical Right)
<Tabs orientation="vertical" placement="right" defaultActiveKey="1">...</Tabs>

// Ngang phía dưới (Horizontal Bottom)
<Tabs orientation="horizontal" placement="bottom" defaultActiveKey="1">...</Tabs>
```

---

### 7. Icon, Badge & Tab có thể đóng (`closable` & `onClose`)

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@owa/ui";
import { HomeIcon, UserIcon, SettingsIcon } from "@/components/icons";

export function RichTabsExample() {
  const handleClose = (key: string | number) => {
    console.log("Đóng tab:", key);
  };

  return (
    <Tabs defaultActiveKey="tab-1" onClose={handleClose}>
      <TabList>
        {/* Tab có icon đầu */}
        <Tab value="tab-1" startIcon={<HomeIcon />} label="Trang chủ" />
        
        {/* Tab có badge số lượng */}
        <Tab value="tab-2" startIcon={<UserIcon />} badge={5} label="Thông báo" />
        
        {/* Tab có thể đóng (closable) & vô hiệu hóa */}
        <Tab value="tab-3" startIcon={<SettingsIcon />} label="Tạm thời" closable />
        <Tab value="tab-4" label="Bị khóa" disabled />
      </TabList>

      <TabPanels>
        <TabPanel value="tab-1">Nội dung trang chủ</TabPanel>
        <TabPanel value="tab-2">Nội dung thông báo</TabPanel>
        <TabPanel value="tab-3">Nội dung tab tạm thời</TabPanel>
        <TabPanel value="tab-4">Nội dung bị khóa</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

---

### 8. Cuộn ngang khi tràn viền (Scrollable Overflow) & Canh giữa (`centered`)

Khi danh sách tab có độ dài lớn vượt quá container, `TabList` sẽ tự động hiển thị 2 nút chevron trái/phải để người dùng cuộn mượt mà:

```tsx
// Canh giữa các tab trong container
<Tabs defaultActiveKey="1">
  <TabList centered>
    <Tab value="1" label="Tab 1" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>...</TabPanels>
</Tabs>

// Tabs fullWidth tràn đều 100%
<Tabs fullWidth defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Tab 1" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>...</TabPanels>
</Tabs>
```

---

### 9. Nội dung mở rộng (`extra`) & Tối ưu DOM (`destroyInactiveTabPane`)

```tsx
<Tabs defaultActiveKey="1" destroyInactiveTabPane>
  <TabList
    extra={
      <button className="px-3 py-1.5 text-xs bg-primary-50 text-primary-700 rounded-md font-medium hover:bg-primary-100">
        + Thêm mới
      </button>
    }
  >
    <Tab value="1" label="Tab 1" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    {/* Khi tab không active, DOM của TabPanel sẽ được unmount hoàn toàn để tiết kiệm bộ nhớ */}
    <TabPanel value="1">Nội dung 1</TabPanel>
    <TabPanel value="2">Nội dung 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

## 🛠️ API Reference

### 1. `TabsProps`

Kế thừa các thuộc tính HTML `HTMLAttributes<HTMLDivElement>` ngoại trừ `onChange`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `activeKey` | `string \| number` | `undefined` | Khóa của tab đang active (Controlled mode). |
| `defaultActiveKey` | `string \| number` | `undefined` | Khóa của tab active mặc định ban đầu (Uncontrolled mode). |
| `onChange` | `(key: string \| number) => void` | `undefined` | Callback kích hoạt khi thay đổi tab được chọn. |
| `onClose` | `(key: string \| number) => void` | `undefined` | Callback kích hoạt khi người dùng bấm nút đóng tab (`closable`). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Kích thước giao diện chung cho các tab con. |
| `variant` | `"line" \| "solid" \| "bordered" \| "flat" \| "other"` | `"line"` | Biến thể kiểu dáng thanh tab & indicator. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Chủ đề màu sắc theo Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Độ bo góc của tab và sliding indicator. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Chiều hiển thị danh sách tabs (ngang hoặc dọc). |
| `placement` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Vị trí đặt `TabList` so với `TabPanels`. |
| `fullWidth` | `boolean` | `false` | Tự động giãn đều chiều rộng các tab vừa khớp 100% container. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ tabs trong nhóm. |
| `destroyInactiveTabPane` | `boolean` | `false` | Tự động unmount nội dung khỏi DOM khi tab không active. |
| `children` | `ReactNode` | `undefined` | Các component con (`<TabList>`, `<TabPanels>`). |
| `className` | `string` | `""` | Class CSS tùy biến cho container bao ngoài. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref chuyển tiếp đến container Tabs. |

---

### 2. `TabListProps`

Kế thừa `HTMLAttributes<HTMLDivElement>`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | `undefined` | Danh sách các phần tử `<Tab>` con. |
| `extra` | `ReactNode` | `undefined` | Nội dung hoặc nút hành động phụ đặt ở góc thanh tab list. |
| `centered` | `boolean` | `false` | Canh giữa danh sách tabs trong container (`orientation="horizontal"`). |
| `className` | `string` | `""` | Class CSS tùy biến bổ sung cho TabList. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref chuyển tiếp đến thẻ tablist. |

---

### 3. `TabProps`

Kế thừa `ButtonHTMLAttributes<HTMLButtonElement>` ngoại trừ `value`:

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | *(Bắt buộc)* | Khóa định danh duy nhất của tab để liên kết với `TabPanel`. |
| `label` | `ReactNode` | `undefined` | Tiêu đề hiển thị của tab. |
| `startIcon` | `ReactNode` | `undefined` | Icon hiển thị trước tiêu đề. |
| `endIcon` | `ReactNode` | `undefined` | Icon hiển thị sau tiêu đề. |
| `badge` | `ReactNode` | `undefined` | Huy hiệu hoặc số lượng hiển thị trên tab. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa riêng tab này. |
| `closable` | `boolean` | `false` | Cho phép hiển thị nút đóng tab (hỗ trợ phím Delete/Backspace). |
| `onClose` | `(e: MouseEvent) => void` | `undefined` | Callback khi bấm nút đóng trên tab này. |
| `children` | `ReactNode` | `undefined` | Nội dung tùy biến thay thế cho prop `label`. |
| `className` | `string` | `""` | Class CSS tùy biến cho nút tab. |
| `ref` | `Ref<HTMLButtonElement>` | `undefined` | Ref chuyển tiếp đến thẻ `<button>` của tab. |

---

### 4. `TabPanelsProps` & `TabPanelProps`

#### `TabPanelsProps`
| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | `undefined` | Danh sách các component `<TabPanel>` con. |
| `className` | `string` | `""` | Class CSS tùy biến cho khung chứa TabPanels. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref chuyển tiếp đến container TabPanels. |

#### `TabPanelProps`
| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | *(Bắt buộc)* | Khóa liên kết trực tiếp với `value` của `<Tab>` tương ứng. |
| `destroyInactiveTabPane` | `boolean` | `undefined` | Ghi đè cấu hình unmount khỏi DOM khi tab không active riêng cho panel này. |
| `children` | `ReactNode` | `undefined` | Nội dung hiển thị khi tab tương ứng đang active. |
| `className` | `string` | `""` | Class CSS tùy biến cho panel nội dung. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref chuyển tiếp đến thẻ tabpanel. |

---

### 5. Hook `useTabIndicator`

```tsx
import { useTabIndicator } from "@owa/ui";

const {
  listRef,
  indicatorStyle,
  canScrollLeft,
  canScrollRight,
  checkScroll,
  updateIndicator,
  handleScrollLeft,
  handleScrollRight,
  handleKeyDown,
} = useTabIndicator({
  activeKey,
  orientation,
  placement,
  variant,
  color,
  radius,
});
```
