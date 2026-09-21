# 💡 Tooltip Component (`@openway/ui`)

A contextual **Tooltip** component built on **`@floating-ui/react`**, featuring **WAI-ARIA Tooltip standards**, **intelligent automatic positioning (flip/shift/offset)**, **dynamic arrow anchoring (FloatingArrow)**, **React 19 Slot pattern integration**, and seamless compatibility with **Safe Config Fallback**.

---

## 🌟 Features

- **Slot & React 19 Integration**: Directly attaches event listeners and refs to the child element via the `Slot` pattern without unnecessary wrapping `<span>` elements, preserving original flexbox/grid layout geometry 100%.
- **Synchronized z-index System**: Utilizes `DEFAULT_Z_INDEX.TOOLTIP` (default `60`) from the `@openway/ui` global constants ecosystem, ensuring tooltips always render reliably above Dropdowns and Popovers.
- **Dynamic Directional Arrow (FloatingArrow)**: SVG arrow automatically rotates and positions accurately according to tooltip flip orientation, synchronizing border and background colors based on `variant` and `color`.
- **Smart Positioning & Overflow Prevention**:
  - `offset`: Maintains consistent standard distance from trigger.
  - `flip`: Automatically inverts orientation upon viewport edge collision (e.g., `top` $\rightarrow$ `bottom`).
  - `shift`: Shifts along cross axes to prevent viewport clipping.
- **Safe Config Fallback**: Integrated `getSafeConfig` utility guarantees crash-proof runtime stability when given invalid size or color props.
- **WAI-ARIA Accessibility**:
  - `role="tooltip"` automatically assigned to the tooltip bubble.
  - Triggered automatically on mouse `hover` or keyboard `focus`.
  - Dismissed on mouse departure (`mouseleave`), focus loss (`blur`), or pressing `Escape`.
- **Extensive Variants & Customization**:
  - 4 variants (`variant`): `filled` (*default*), `soft`, `outline`, `other`.
  - 7 color themes (`color`): `neutral` (*default*), `primary`, `secondary`, `error`, `success`, `warning`, `info`.
  - 5 sizes (`size`): `xs`, `sm`, `md` (*default*), `lg`, `xl`.
  - 6 border radii (`radius`): `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.

---

## 🚀 Installation & Import

```tsx
import { Tooltip } from "@openway/ui";
import type {
  TooltipProps,
  TooltipPlacement,
  TooltipVariant,
  TooltipColor,
  TooltipSize,
  TooltipRadius,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Tooltip

```tsx
import { Tooltip, Button } from "@openway/ui";

export function BasicTooltip() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="Save current data">
        <Button>Save</Button>
      </Tooltip>

      <Tooltip content="This action cannot be undone" color="error">
        <Button color="error" variant="soft">Delete</Button>
      </Tooltip>
    </div>
  );
}
```

---

### 2. Placements (`placement`)

Supports 12 comprehensive placement orientations:

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

### 3. Variants (`variant`) & Colors (`color`)

```tsx
// 1. Filled (Default - High-contrast solid background)
<Tooltip content="Filled Neutral" variant="filled" color="neutral">
  <Button>Neutral</Button>
</Tooltip>
<Tooltip content="Filled Primary" variant="filled" color="primary">
  <Button color="primary">Primary</Button>
</Tooltip>

// 2. Soft (Gentle pastel background)
<Tooltip content="Soft Info" variant="soft" color="info">
  <Button color="info" variant="soft">Info</Button>
</Tooltip>
<Tooltip content="Soft Success" variant="soft" color="success">
  <Button color="success" variant="soft">Success</Button>
</Tooltip>

// 3. Outline (Clean white background with crisp colored border)
<Tooltip content="Outline Warning" variant="outline" color="warning">
  <Button color="warning" variant="outline">Warning</Button>
</Tooltip>

// 4. Other (Fully customizable via className)
<Tooltip
  content="Custom Gradient"
  variant="other"
  className="bg-linear-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg"
>
  <Button>VIP</Button>
</Tooltip>
```

---

### 4. Display Delays (`delay`)

```tsx
// Display immediately (no delay)
<Tooltip content="Appears instantly" delay={0}>
  <Button>Instant Tooltip</Button>
</Tooltip>

// Separate open and close delays
<Tooltip content="Opens after 500ms, closes after 100ms" delay={{ open: 500, close: 100 }}>
  <Button>Custom Delay</Button>
</Tooltip>
```

---

### 5. Integration with IconButton & Disabled State

```tsx
import { Tooltip, IconButton } from "@openway/ui";
import { EditIcon, TrashIcon } from "@/components/icons";

export function IconButtonsWithTooltip() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Edit information">
        <IconButton icon={<EditIcon />} aria-label="Edit" variant="ghost" />
      </Tooltip>

      {/* Tooltip disabled when not intended to display */}
      <Tooltip content="This button is locked" disabled>
        <IconButton icon={<TrashIcon />} aria-label="Delete" disabled variant="ghost" />
      </Tooltip>
    </div>
  );
}
```

---

## ♿ Accessibility & Keyboard Navigation

| Interaction | Behavior |
| :--- | :--- |
| `Mouse Hover` | Displays tooltip after `delay.open` milliseconds. |
| `Mouse Leave` | Hides tooltip after `delay.close` milliseconds. |
| `Tab` (Keyboard Focus) | Automatically displays tooltip when child element receives focus. |
| `Shift + Tab` / `Blur` | Automatically hides tooltip when child element loses focus. |
| `Escape` | Immediately closes tooltip without shifting element focus. |

---

## 📋 API Reference

### `<Tooltip>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `content` | `ReactNode` | *(Required)* | Text content or JSX rendered inside the tooltip bubble. |
| `children` | `ReactElement` | *(Required)* | Child trigger element that activates tooltip on hover/focus. |
| `placement` | `TooltipPlacement` | `'top'` | Display direction (`'top'`, `'bottom'`, `'left'`, `'right'`, and `-start`, `-end` variants). |
| `variant` | `'filled' \| 'soft' \| 'outline' \| 'other'` | `'filled'` | Visual styling variant of the tooltip. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'neutral'` | Theme color of the tooltip. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size scaling for padding, typography, and arrow dimensions. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Corner border radius of the tooltip box. |
| `hasArrow` | `boolean` | `true` | Enables or disables directional arrow pointing toward trigger. |
| `offset` | `number` | `8` | Distance in pixels between trigger and tooltip bubble. |
| `flip` | `boolean` | `true` | Automatically flips orientation when colliding with viewport edges. |
| `shift` | `boolean` | `true` | Automatically shifts along cross axes to keep tooltip within viewport. |
| `delay` | `number \| { open?: number; close?: number }` | `{ open: 200, close: 150 }` | Open and close delay durations in milliseconds. |
| `disabled` | `boolean` | `false` | Prevents the tooltip from showing when true. |
| `open` | `boolean` | — | Controlled visibility state. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled visibility state. |
| `onOpenChange` | `(open: boolean) => void` | — | Callback fired when visibility changes. |
| `animated` | `boolean` | `true` | Enables smooth transitions on appearance and disappearance. |
| `animationDuration` | `number` | `150` | Transition duration in milliseconds. |
| `zIndex` | `number` | `DEFAULT_Z_INDEX.TOOLTIP` (60) | Custom z-index stack position. |
| `className` | `string` | `""` | Custom CSS class applied to the tooltip bubble. |
| `arrowClassName` | `string` | `""` | Custom CSS class applied to the directional arrow. |
| `portal` | `boolean` | `true` | Toggles rendering tooltip contents via `FloatingPortal`. |
| `portalRoot` | `HTMLElement \| null \| RefObject<HTMLElement \| null>` | — | Target DOM element or Ref used as portal container. Automatically binds to Modal or Confirm dialogs when nested inside. |
