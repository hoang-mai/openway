# 🗂️ Collapse Component (`@openway/ui`)

A modern, high-performance **Collapse** (Accordion / Collapsible panel) component designed following the **Declarative Compound Components Pattern** (`<Collapse>`, `<CollapsePanel>`, `<CollapseHeader>`, `<CollapseContent>`, `<Collapsible>`), featuring **CSS Grid Height Transition**, **Accordion Mode**, **Custom Slots & Subcomponents**, **Safe Config Fallback** (`getSafeConfig`), and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Key Features

- **Standard Compound Components Pattern**: Clean separation across `<Collapse>`, `<CollapsePanel>`, `<CollapseHeader>`, and `<CollapseContent>`, supporting 2 flexible writing styles (rapid declaration via Props or deep customization via Subcomponents).
- **Ultra-smooth Height Animation (CSS Grid Transition)**: Leverages `transition-[grid-template-rows]` (`grid-rows-[1fr]` when open and `grid-rows-[0fr]` when closed), automatically computing dynamic content heights without JavaScript DOM measurements.
- **Accordion & Multiple Open Modes**:
  - `accordion={true}`: Automatically closes other panels when opening a new one.
  - `accordion={false}`: Allows multiple panels to be open simultaneously.
- **Controlled & Uncontrolled Modes**:
  - **Controlled**: Managed via `activeKey` + `onChange` callback.
  - **Uncontrolled**: Internally managed with `defaultActiveKey`.
- **5 Visual Variants (`variant`)**:
  - `outlined` (*default*): Outer border and dividers matching theme colors.
  - `filled`: Subtle theme color background fill creating a seamless aesthetic.
  - `ghost`: Transparent, minimalist borderless look.
  - `separated`: Each panel rendered as a detached card separated by `space-y-3`.
  - `other`: Skips default styles, allowing complete customization via `className`.
- **3 Standard Sizes (`size`)**: `sm`, `md` (*default*), `lg`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **Custom Arrow Icons & Positions (`expandIconPosition`)**:
  - `expandIconPosition`: `"right"` (*default*), `"left"`, or `"none"`.
  - `expandIcon`: Custom icon or render function `({ isActive, disabled }) => ReactNode`.
- **Extra Slot & Secondary Actions**: Supports passing badges, buttons, or action icons (`extra`) into the header without triggering the header toggle event.
- **DOM Cleanup (`destroyInactivePanel`)**: Automatically unmounts content from the DOM when a panel is collapsed.
- **Standalone `<Collapsible>` Component**: Provides a lightweight, standalone collapsible container for any content.
- **WAI-ARIA Accessibility & Keyboard**: Automatically assigns `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`, with full support for `Enter` and `Space` keys.
- **Safe Config Fallback**: Integrates `getSafeConfig` from `@/utils/function` to guarantee zero crashes even when invalid prop values are supplied.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Approach 1: Rapid Declaration via Props (Declarative Panel Props)

Ideal for most standard use cases:

```tsx
import { Collapse, CollapsePanel } from "@openway/ui";

export function BasicCollapse() {
  return (
    <Collapse defaultActiveKey={["1"]} variant="outlined" color="primary">
      <CollapsePanel
        value="1"
        label="1. Overview Introduction"
        description="Platform details and system architecture"
      >
        <p className="text-neutral-600">
          This is the detailed content of the first panel.
        </p>
      </CollapsePanel>

      <CollapsePanel value="2" label="2. Quick Start Guide">
        <p className="text-neutral-600">
          Run <code>pnpm add @openway/ui</code> to get started.
        </p>
      </CollapsePanel>

      <CollapsePanel value="3" label="3. Frequently Asked Questions" disabled>
        <p className="text-neutral-600">
          This panel is disabled.
        </p>
      </CollapsePanel>
    </Collapse>
  );
}
```

---

### 2. Approach 2: Deep Customization via Subcomponents (`<CollapseHeader>` & `<CollapseContent>`)

Allows free composition of complex UI structures:

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
              <Badge color="success">Paid</Badge>
              <Button size="sm" variant="ghost">Print Invoice</Button>
            </div>
          }
        >
          <span className="font-bold text-neutral-900">
            Order #101 - $149.00
          </span>
        </CollapseHeader>
        <CollapseContent>
          <div className="space-y-2">
            <p>Customer: John Doe</p>
            <p>Address: 123 Main Street, Suite 100</p>
          </div>
        </CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}
```

---

### 3. Accordion Mode (Only 1 panel open at a time)

```tsx
<Collapse accordion defaultActiveKey="faq-1" color="primary">
  <CollapsePanel value="faq-1" label="How do I change my password?">
    <p>Go to Account Settings and select Change Password.</p>
  </CollapsePanel>
  <CollapsePanel value="faq-2" label="What is the refund policy?">
    <p>We offer a 100% money-back guarantee within the first 30 days.</p>
  </CollapsePanel>
</Collapse>
```

---

### 4. Visual Variants (`variant`)

```tsx
{/* 1. Outlined (Default) */}
<Collapse variant="outlined">...</Collapse>

{/* 2. Filled */}
<Collapse variant="filled">...</Collapse>

{/* 3. Ghost (Minimalist) */}
<Collapse variant="ghost">...</Collapse>

{/* 4. Separated (Detached cards) */}
<Collapse variant="separated">...</Collapse>
```

---

### 5. Controlled Mode (Active State Control)

```tsx
import { useState } from "react";
import { Collapse, CollapsePanel } from "@openway/ui";

export function ControlledCollapse() {
  const [activeKeys, setActiveKeys] = useState<string | number | (string | number)[]>(["1"]);

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button onClick={() => setActiveKeys(["1"])} className="px-3 py-1 bg-primary-600 text-white rounded">
          Open Panel 1
        </button>
        <button onClick={() => setActiveKeys(["1", "2"])} className="px-3 py-1 bg-primary-600 text-white rounded">
          Open both 1 and 2
        </button>
        <button onClick={() => setActiveKeys([])} className="px-3 py-1 bg-neutral-600 text-white rounded">
          Close all
        </button>
      </div>

      <Collapse activeKey={activeKeys} onChange={setActiveKeys}>
        <CollapsePanel value="1" label="Panel 1">Content 1</CollapsePanel>
        <CollapsePanel value="2" label="Panel 2">Content 2</CollapsePanel>
      </Collapse>
    </div>
  );
}
```

---

### 6. Standalone Collapsible Component (`<Collapsible>`)

```tsx
import { useState } from "react";
import { Collapsible, Button } from "@openway/ui";

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border p-4 rounded-xl">
      <Button onClick={() => setOpen(!open)}>
        {open ? "Hide details" : "Show more details"}
      </Button>

      <Collapsible open={open} className="mt-3">
        <div className="p-3 bg-neutral-50 rounded-lg">
          Flexible expandable content without needing to reside inside a Collapse list.
        </div>
      </Collapsible>
    </div>
  );
}
```

---

## 📊 Props Reference

### `<Collapse>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeKey` | `string \| number \| (string \| number)[]` | - | Active panel keys (Controlled mode) |
| `defaultActiveKey` | `string \| number \| (string \| number)[]` | - | Initially active panel keys (Uncontrolled mode) |
| `onChange` | `(activeKey) => void` | - | Callback triggered when active state changes |
| `accordion` | `boolean` | `false` | Accordion mode allowing at most 1 active panel |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Display size |
| `variant` | `"outlined" \| "filled" \| "ghost" \| "separated" \| "other"` | `"outlined"` | Visual style variant |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Color theme |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Border radius |
| `expandIconPosition` | `"left" \| "right" \| "none"` | `"right"` | Arrow icon position |
| `expandIcon` | `ReactNode \| ((props) => ReactNode)` | - | Custom arrow icon |
| `destroyInactivePanel`| `boolean` | `false` | Automatically unmounts DOM content when panel collapses |
| `children` | `ReactNode` | - | List of `<CollapsePanel>` components |

---

### `<CollapsePanel>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | **Required** | Unique identifier key of the panel |
| `label` | `ReactNode` | - | Panel title (for declarative prop usage) |
| `description` | `ReactNode` | - | Short subtitle description |
| `startIcon` | `ReactNode` | - | Leading icon placed before the title |
| `extra` | `ReactNode` | - | Secondary content on the right (badge, action) |
| `disabled` | `boolean` | `false` | Disables the panel |
| `showArrow` | `boolean` | `true` | Shows expand arrow icon |
| `destroyInactivePanel`| `boolean` | - | Overrides unmount behavior for this specific panel |
| `children` | `ReactNode` | - | Body content or `<CollapseHeader>` & `<CollapseContent>` |

---

### `<CollapseHeader>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `startIcon` | `ReactNode` | - | Leading icon placed before the title |
| `description` | `ReactNode` | - | Subtitle description |
| `extra` | `ReactNode` | - | Secondary action slot on the right |
| `showArrow` | `boolean` | `true` | Shows expand arrow icon |
| `children` | `ReactNode` | - | JSX title content |

---

### `<CollapseContent>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `destroyInactivePanel`| `boolean` | - | Automatically unmounts content from DOM when collapsed |
| `children` | `ReactNode` | - | Detailed content inside the panel |

---

## ⌨️ Keyboard Shortcuts & Accessibility

- **`role="region"`**: Content area is marked as a complementary content region.
- **`aria-expanded` & `aria-controls`**: Header button automatically synchronizes its open/closed state with the Content panel ID.
- **`Enter` / `Space` Keys**: Press to toggle the panel when focus is on the header.
- **Event Conflict Prevention**: The `extra` slot is decoupled outside the `<button>` trigger to avoid nested interactive element violations.

---

## 🧪 Component Testing (Cypress Testing)

The component has 100% test coverage using **Cypress Component Testing** at [`Collapse.cy.tsx`](Collapse.cy.tsx):

```bash
pnpm --filter @openway/ui cypress:run --spec "src/components/collapse/Collapse.cy.tsx"
```
