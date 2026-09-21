# 💬 Popover Component (`@openway/ui`)

The **Popover** component suite is built on top of **`@floating-ui/react`** following the **Compound Component** pattern. It provides full support for the **WAI-ARIA Dialog specification**, **smart focus management (`FloatingFocusManager`)**, **intelligent positioning (flip/shift/offset)**, and full compatibility with **React 19 / React Compiler**.

---

## 🌟 Highlights

- **Compound Component Pattern**: Clean modular structure consisting of `<Popover>`, `<PopoverTrigger>`, `<PopoverContent>`, `<PopoverHeader>`, `<PopoverBody>`, `<PopoverFooter>`, and `<PopoverClose>`.
- **React 19 & React Compiler Ready**: Utilizes the `Slot` component pattern on both `PopoverTrigger` and `PopoverClose`, ensuring clean `ref` forwarding and reliable rendering.
- **Focus Management**: Integrates `FloatingFocusManager`, automatically trapping focus inside the popover when in `modal={true}` mode and restoring focus to the trigger upon dismissal.
- **Unified z-index System**: Defaults to `DEFAULT_Z_INDEX.POPOVER` (default `50`) from the `@openway/ui` constant system.
- **Always Floats on Top (Floating Portal)**: Popover content renders within a `<FloatingPortal>`, ensuring it is never clipped or constrained by parent layouts or `overflow: hidden`.
- **Safe Config Fallback**: Uses `getSafeConfig` internally so subcomponents (`PopoverContent`, `PopoverHeader`, `PopoverBody`, `PopoverFooter`) safely retrieve `sizeConfig` and `radiusConfig`.
- **WAI-ARIA Accessibility**:
  - `role="dialog"` on the popover container.
  - `aria-expanded` and `aria-haspopup="dialog"`.
  - Automatic dismissal on `Escape` key press (`closeOnEsc`) or clicking outside (`closeOnClickOutside`).
- **Flexible Customization**:
  - 5 sizes: `xs`, `sm`, `md` (*default*), `lg`, `xl`.
  - 6 border radius variants: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
  - 2 trigger mechanisms: `click` (*default*) or `hover` (supports `safePolygon` for smooth pointer traversal into the popover).

---

## 🚀 Installation & Import

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
} from "@openway/ui";
import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
  PopoverCloseProps,
  PopoverPlacement,
  PopoverTriggerType,
  PopoverSize,
  PopoverRadius,
  PopoverColor,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Popover (Input Forms / Filter Panels)

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  Button,
} from "@openway/ui";

export function BasicPopover() {
  return (
    <Popover placement="bottom-start" size="md">
      <PopoverTrigger>
        <Button variant="outline">Open Filter</Button>
      </PopoverTrigger>
      <PopoverContent minWidth={280}>
        <PopoverHeader>Advanced Filters</PopoverHeader>
        <PopoverBody>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Keywords</label>
              <input
                type="text"
                placeholder="Enter keywords..."
                className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-sm outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Status</label>
              <select className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-sm outline-none focus:border-primary-500">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </PopoverBody>
        <PopoverFooter className="flex justify-end gap-2">
          <PopoverClose asChild>
            <Button variant="ghost" size="sm">Cancel</Button>
          </PopoverClose>
          <Button size="sm">Apply</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
```

---

### 2. Customizing Trigger with `asChild`

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, IconButton } from "@openway/ui";
import { InfoIcon } from "@/components/icons";

export function InfoPopover() {
  return (
    <Popover trigger="hover" placement="top">
      <PopoverTrigger asChild>
        <IconButton icon={<InfoIcon />} aria-label="View explanation" variant="ghost" size="sm" />
      </PopoverTrigger>
      <PopoverContent maxWidth={320}>
        <PopoverBody>
          <p className="text-xs text-neutral-600 leading-relaxed">
            This data is synchronized automatically from the server every 5 minutes.
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
```

---

### 3. Hover Trigger (`trigger="hover"`)

When set to `hover`, Popover integrates Floating UI's `safePolygon()` algorithm, enabling users to move their cursor diagonally across from the trigger to the popover panel without accidental closing:

```tsx
<Popover trigger="hover" placement="bottom">
  <PopoverTrigger>
    <Button variant="soft">Hover to view details</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>
      <p className="text-sm">Detailed content displayed upon hovering!</p>
    </PopoverBody>
  </PopoverContent>
</Popover>
```

---

### 4. Modal Mode (`modal={true}`)

Enabling `modal={true}` locks background interactions and traps keyboard `Tab` navigation strictly within the Popover:

```tsx
<Popover modal={true} placement="bottom-start">
  <PopoverTrigger>
    <Button color="error">Delete critical data</Button>
  </PopoverTrigger>
  <PopoverContent minWidth={300}>
    <PopoverHeader>Confirm Deletion</PopoverHeader>
    <PopoverBody>
      <p className="text-sm text-neutral-700">
        Are you sure you want to delete this record? This action cannot be undone.
      </p>
    </PopoverBody>
    <PopoverFooter className="flex justify-end gap-2">
      <PopoverClose asChild>
        <Button variant="outline" size="sm">Cancel</Button>
      </PopoverClose>
      <Button color="error" size="sm">Confirm Delete</Button>
    </PopoverFooter>
  </PopoverContent>
</Popover>
```

---

## ♿ Accessibility & Keyboard Navigation

| Key | Behavior |
| :--- | :--- |
| `Enter` / `Space` | Toggles the popover open or closed when the trigger is focused. |
| `Tab` | Cycles focus sequentially through interactive elements (inputs, buttons) inside the popover. |
| `Shift + Tab` | Cycles focus in reverse through interactive elements inside the popover. |
| `Escape` | Closes the popover and automatically restores focus to the trigger element. |

---

## 📋 API Reference

### `<Popover>` (Root Component)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Subcomponents (`PopoverTrigger`, `PopoverContent`). |
| `open` | `boolean` | — | Open state for controlled mode. |
| `defaultOpen` | `boolean` | `false` | Initial open state for uncontrolled mode. |
| `onOpenChange` | `(open: boolean) => void` | — | Callback fired when the open/closed state changes. |
| `trigger` | `'click' \| 'hover'` | `'click'` | Trigger event to open the popover. |
| `placement` | `PopoverPlacement` | `'bottom'` | Position and alignment of the popover relative to the trigger. |
| `offset` | `number` | `8` | Distance (px) between the trigger and the popover. |
| `flip` | `boolean` | `true` | Automatically flips placement if the popover overflows the viewport. |
| `shift` | `boolean` | `true` | Automatically shifts the popover along the axis to remain within the viewport. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size applied to padding and font size of the popover. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius of the popover container. |
| `color` | `PopoverColor` | `'neutral'` | Theme color styling of the popover. |
| `disabled` | `boolean` | `false` | Disables the entire Popover. |
| `animated` | `boolean` | `true` | Enables or disables open/close transition animations. |
| `animationDuration` | `number` | `150` | Transition animation duration in milliseconds. |
| `modal` | `boolean` | `false` | Traps focus within the popover and blocks background interactions. |
| `closeOnEsc` | `boolean` | `true` | Closes the popover when pressing the `Escape` key. |
| `closeOnClickOutside` | `boolean` | `true` | Closes the popover when clicking outside of it. |

---

### `<PopoverTrigger>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Child element acting as the trigger. |
| `asChild` | `boolean` | `false` | Forwards props/events directly to the child element instead of rendering a default button wrapper. |
| `className` | `string` | `""` | Additional custom CSS class. |
| `ref` | `Ref<HTMLElement>` | — | React 19 Ref directly attached to the trigger element. |

---

### `<PopoverContent>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Content displayed inside the popover. |
| `minWidth` | `string \| number` | — | Minimum width of the popover panel. |
| `maxWidth` | `string \| number` | — | Maximum width of the popover panel. |
| `zIndex` | `number` | `DEFAULT_Z_INDEX.POPOVER` (50) | Z-index stack order for the floating popover. |
| `className` | `string` | `""` | Additional custom CSS class. |
| `style` | `CSSProperties` | — | Additional inline styles. |
| `ref` | `Ref<HTMLDivElement>` | — | React 19 Ref directly attached to the content container. |

---

### `<PopoverHeader>`, `<PopoverBody>`, `<PopoverFooter>`, `<PopoverClose>`

- `<PopoverHeader>`: Header title of the popover (conforms to WAI-ARIA `<h2>` semantic dialog specification).
- `<PopoverBody>`: Main body section containing text, inputs, or interactive controls.
- `<PopoverFooter>`: Footer section containing action buttons (Cancel, Submit).
- `<PopoverClose>`: Component to dismiss the popover (supports `asChild` to wrap custom Button components).
