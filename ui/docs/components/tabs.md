# 📑 Tabs Component (`@openway/ui`)

Highly interactive **Tabs** component suite built with the **Compound Components Pattern** (`<Tabs>`, `<TabList>`, `<Tab>`, `<TabPanels>`, `<TabPanel>`). Features a **Sliding Animated Indicator**, **Overflow Scroll**, the standalone **Custom Hook `useTabIndicator`**, **Safe Config Fallback**, and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Highlights

- **Clean Compound Components Pattern**: Clear separation of concerns between `<Tabs>`, `<TabList>`, `<Tab>`, `<TabPanels>`, and `<TabPanel>`, maximizing layout flexibility and composition.
- **Smooth Sliding Animated Indicator**: Automatically calculates position, dimensions, and transition animations across all variants (`line`, `solid`, `bordered`, `flat`), with automatic realignments upon container resize via `ResizeObserver`.
- **Standalone `useTabIndicator` Custom Hook**: Isolates all indicator coordinate calculations, overflow boundary checks, and keyboard navigation into a dedicated hook for easy maintenance and reuse.
- **Controlled & Uncontrolled Modes**: Supports both `activeKey` + `onChange` (Controlled) and `defaultActiveKey` (Uncontrolled).
- **3 Standard Sizes (`size`)**: `sm`, `md` (*default*), `lg`.
- **5 Visual Variants (`variant`)**:
  - `line` *(default)*: Smooth sliding underline/side indicator bar.
  - `solid`: High-contrast solid pill background.
  - `bordered`: Outlined border enclosing the tab.
  - `flat`: Soft muted pill background.
  - `other`: Free-form 100% customization via `className`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **Diverse Orientations & Placements (`orientation` & `placement`)**:
  - Horizontal (`horizontal`): `top` (*default*), `bottom`.
  - Vertical (`vertical`): `left`, `right`.
- **Scrollable Overflow & Chevrons**: Automatically displays left and right chevron buttons when the tab list overflows the container width, with auto `scrollIntoView` for active tabs.
- **Tab Dismissal (`closable`)**: Enables closing tabs via a close button or pressing `Delete` / `Backspace` when focused on the tab.
- **WAI-ARIA Accessibility & Keyboard Navigation**: Full support for `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, arrow keys `ArrowLeft` / `ArrowRight` / `ArrowUp` / `ArrowDown`, `Home`, and `End`.
- **Safe Config Fallback**: Integrates `getSafeConfig` to prevent runtime crashes even with invalid prop inputs.

---

## 🚀 Installation & Import

```tsx
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTabsContext,
  useTabIndicator,
} from "@openway/ui";

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
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage (Compound Components)

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@openway/ui";

export function BasicTabsExample() {
  return (
    <Tabs defaultActiveKey="overview" variant="line" color="primary">
      <TabList>
        <Tab value="overview" label="Overview" />
        <Tab value="profile" label="Profile" />
        <Tab value="settings" label="Settings" />
      </TabList>

      <TabPanels>
        <TabPanel value="overview">
          <p className="p-4 text-neutral-700">Overview tab content</p>
        </TabPanel>
        <TabPanel value="profile">
          <p className="p-4 text-neutral-700">User profile information</p>
        </TabPanel>
        <TabPanel value="settings">
          <p className="p-4 text-neutral-700">System settings configuration</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

---

### 2. Control Modes (Controlled vs Uncontrolled)

#### a) Controlled Mode (Externally Managed State)
```tsx
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@openway/ui";

export function ControlledTabs() {
  const [activeKey, setActiveKey] = useState<string | number>("tab-1");

  return (
    <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
      <TabList>
        <Tab value="tab-1" label="Tab 1" />
        <Tab value="tab-2" label="Tab 2" />
      </TabList>
      <TabPanels>
        <TabPanel value="tab-1">Content 1</TabPanel>
        <TabPanel value="tab-2">Content 2</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

#### b) Uncontrolled Mode (Internally Managed with `defaultActiveKey`)
```tsx
<Tabs defaultActiveKey="tab-2">
  <TabList>
    <Tab value="tab-1" label="Tab 1" />
    <Tab value="tab-2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="tab-1">Content 1</TabPanel>
    <TabPanel value="tab-2">Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

### 3. Sizing (`size`)

Supports 3 sizes: `sm`, `md` (*default*), `lg`:

```tsx
<Tabs size="sm" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Small Tab" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Small size content</TabPanel>
    <TabPanel value="2">Content 2</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="md" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Medium Tab (Default)" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Medium size content</TabPanel>
    <TabPanel value="2">Content 2</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="lg" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Large Tab" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Large size content</TabPanel>
    <TabPanel value="2">Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

### 4. Visual Variants (`variant`)

```tsx
// 1. Line (Default): Smooth sliding underline/side bar
<Tabs variant="line" defaultActiveKey="1">...</Tabs>

// 2. Solid: Bold pill background
<Tabs variant="solid" defaultActiveKey="1">...</Tabs>

// 3. Bordered: Outlined frame
<Tabs variant="bordered" defaultActiveKey="1">...</Tabs>

// 4. Flat: Soft muted pill background
<Tabs variant="flat" defaultActiveKey="1">...</Tabs>

// 5. Other: Completely customizable via class
<Tabs variant="other" defaultActiveKey="1">...</Tabs>
```

---

### 5. Color Themes (`color`)

Provides 7 colors conforming to Design System tokens:

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

### 6. Orientation and Placement (`orientation` & `placement`)

```tsx
// Vertical Left
<Tabs orientation="vertical" placement="left" defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Menu 1" />
    <Tab value="2" label="Menu 2" />
  </TabList>
  <TabPanels>
    <TabPanel value="1">Menu 1 content</TabPanel>
    <TabPanel value="2">Menu 2 content</TabPanel>
  </TabPanels>
</Tabs>

// Vertical Right
<Tabs orientation="vertical" placement="right" defaultActiveKey="1">...</Tabs>

// Horizontal Bottom
<Tabs orientation="horizontal" placement="bottom" defaultActiveKey="1">...</Tabs>
```

---

### 7. Icons, Badges & Closable Tabs (`closable` & `onClose`)

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@openway/ui";
import { HomeIcon, UserIcon, SettingsIcon } from "@/components/icons";

export function RichTabsExample() {
  const handleClose = (key: string | number) => {
    console.log("Close tab:", key);
  };

  return (
    <Tabs defaultActiveKey="tab-1" onClose={handleClose}>
      <TabList>
        {/* Tab with leading icon */}
        <Tab value="tab-1" startIcon={<HomeIcon />} label="Home" />
        
        {/* Tab with count badge */}
        <Tab value="tab-2" startIcon={<UserIcon />} badge={5} label="Notifications" />
        
        {/* Closable and disabled tabs */}
        <Tab value="tab-3" startIcon={<SettingsIcon />} label="Temporary" closable />
        <Tab value="tab-4" label="Locked" disabled />
      </TabList>

      <TabPanels>
        <TabPanel value="tab-1">Home content</TabPanel>
        <TabPanel value="tab-2">Notifications content</TabPanel>
        <TabPanel value="tab-3">Temporary tab content</TabPanel>
        <TabPanel value="tab-4">Locked content</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

---

### 8. Scrollable Overflow & Centering (`centered`)

When tabs exceed the container width, `TabList` automatically displays left and right chevron buttons for smooth scrolling:

```tsx
// Centered tabs within container
<Tabs defaultActiveKey="1">
  <TabList centered>
    <Tab value="1" label="Tab 1" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>...</TabPanels>
</Tabs>

// Full-width tabs stretching 100%
<Tabs fullWidth defaultActiveKey="1">
  <TabList>
    <Tab value="1" label="Tab 1" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>...</TabPanels>
</Tabs>
```

---

### 9. Extra Content (`extra`) & DOM Optimization (`destroyInactiveTabPane`)

```tsx
<Tabs defaultActiveKey="1" destroyInactiveTabPane>
  <TabList
    extra={
      <button className="px-3 py-1.5 text-xs bg-primary-50 text-primary-700 rounded-md font-medium hover:bg-primary-100">
        + Add New
      </button>
    }
  >
    <Tab value="1" label="Tab 1" />
    <Tab value="2" label="Tab 2" />
  </TabList>
  <TabPanels>
    {/* Unmounts inactive TabPanels completely from the DOM to conserve memory */}
    <TabPanel value="1">Content 1</TabPanel>
    <TabPanel value="2">Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

## 🛠️ API Reference

### 1. `TabsProps`

Inherits HTML attributes `HTMLAttributes<HTMLDivElement>` except `onChange`:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeKey` | `string \| number` | `undefined` | Active tab key (Controlled mode). |
| `defaultActiveKey` | `string \| number` | `undefined` | Initial active tab key (Uncontrolled mode). |
| `onChange` | `(key: string \| number) => void` | `undefined` | Callback fired when the active tab changes. |
| `onClose` | `(key: string \| number) => void` | `undefined` | Callback fired when closing a tab (`closable`). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Shared size for child tabs. |
| `variant` | `"line" \| "solid" \| "bordered" \| "flat" \| "other"` | `"line"` | Visual variant for tab bar & indicator. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Color theme according to Design System tokens. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Border radius for tabs and sliding indicator. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation (horizontal or vertical). |
| `placement` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Position of `TabList` relative to `TabPanels`. |
| `fullWidth` | `boolean` | `false` | Stretches tabs equally to fill 100% width of container. |
| `disabled` | `boolean` | `false` | Disables all tabs in the group. |
| `destroyInactiveTabPane` | `boolean` | `false` | Unmounts content from DOM when tab is inactive. |
| `children` | `ReactNode` | `undefined` | Child components (`<TabList>`, `<TabPanels>`). |
| `className` | `string` | `""` | Custom CSS class for outer container. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref forwarded to Tabs container. |

---

### 2. `TabListProps`

Inherits `HTMLAttributes<HTMLDivElement>`:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | `undefined` | Array of child `<Tab>` components. |
| `extra` | `ReactNode` | `undefined` | Extra content or actions rendered at the end of the tab list. |
| `centered` | `boolean` | `false` | Centers tabs in container (`orientation="horizontal"`). |
| `className` | `string` | `""` | Additional custom CSS class for TabList. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref forwarded to tablist element. |

---

### 3. `TabProps`

Inherits `ButtonHTMLAttributes<HTMLButtonElement>` except `value`:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | *(Required)* | Unique identifier linking the tab to its corresponding `TabPanel`. |
| `label` | `ReactNode` | `undefined` | Display label of the tab. |
| `startIcon` | `ReactNode` | `undefined` | Leading icon before the label. |
| `endIcon` | `ReactNode` | `undefined` | Trailing icon after the label. |
| `badge` | `ReactNode` | `undefined` | Badge or count indicator on the tab. |
| `disabled` | `boolean` | `false` | Disables this individual tab. |
| `closable` | `boolean` | `false` | Displays a close button (supports Delete/Backspace keys). |
| `onClose` | `(e: MouseEvent) => void` | `undefined` | Callback fired when the close button is clicked. |
| `children` | `ReactNode` | `undefined` | Custom content replacing the `label` prop. |
| `className` | `string` | `""` | Custom CSS class for the tab button. |
| `ref` | `Ref<HTMLButtonElement>` | `undefined` | Ref forwarded to the `<button>` element of the tab. |

---

### 4. `TabPanelsProps` & `TabPanelProps`

#### `TabPanelsProps`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | `undefined` | Array of child `<TabPanel>` components. |
| `className` | `string` | `""` | Custom CSS class for TabPanels container. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref forwarded to TabPanels container. |

#### `TabPanelProps`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | *(Required)* | Matching key corresponding to `<Tab>` value. |
| `destroyInactiveTabPane` | `boolean` | `undefined` | Overrides unmount-when-inactive setting for this panel. |
| `children` | `ReactNode` | `undefined` | Content displayed when this tab is active. |
| `className` | `string` | `""` | Custom CSS class for the content panel. |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref forwarded to tabpanel element. |

---

### 5. `useTabIndicator` Hook

```tsx
import { useTabIndicator } from "@openway/ui";

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
