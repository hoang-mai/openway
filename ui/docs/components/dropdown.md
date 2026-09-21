# 🔽 Dropdown Component (`@openway/ui`)

A versatile **Dropdown Menu** component suite built on top of the **Compound Component** pattern powered by **`@floating-ui/react`**, featuring **complete WAI-ARIA Menu keyboard navigation**, **intelligent positioning (flip/shift/offset)**, **smooth animations**, and full compatibility with **React 19 / React Compiler**.

---

## 🌟 Highlights

- **Compound Component Pattern**: Modular architecture comprising `<Dropdown>`, `<DropdownTrigger>`, `<DropdownMenu>`, `<DropdownItem>`, `<DropdownHeader>`, `<DropdownGroup>`, and `<DropdownSeparator>`.
- **React 19 & React Compiler Support**: Adopts the `Slot` component pattern for clean `ref` handling via JSX without triggering runtime errors or `Cannot access refs during render` warnings.
- **Unified z-index System**: Integrates with `DEFAULT_Z_INDEX.DROPDOWN` (default `50`) from global constants.
- **Intelligent Positioning**: Automatic floating position calculations via `@floating-ui/react` with `offset`, `flip`, and `shift` middlewares.
- **Always on Top (Floating Portal)**: Rendered through `<FloatingPortal>` to avoid clipping by parent CSS `overflow: hidden` or `z-index` stacking contexts.
- **Safe Config Fallback**: Built-in `getSafeConfig` utility guarantees safe fallback resolution for `sizeConfig`, `radiusConfig`, and `colorConfig`, preventing runtime crashes when invalid values are supplied.
- **WAI-ARIA Accessibility**:
  - `role="menu"` on the dropdown menu container.
  - `role="menuitem"` on each selectable item.
  - `role="group"` on menu item groups.
  - `aria-expanded`, `aria-haspopup="menu"`, `aria-disabled`.
  - Comprehensive keyboard navigation: `ArrowDown`, `ArrowUp`, `Home`, `End`, `Enter`, `Space`, `Escape`.
- **Extensive Size & Color Options**:
  - 5 sizes: `xs`, `sm`, `md` (*default*), `lg`, `xl`.
  - 7 color themes: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
  - 6 corner radius variants: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Basic Menu

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
        <Button>Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onClick={() => console.log("Profile")}>User Profile</DropdownItem>
        <DropdownItem onClick={() => console.log("Settings")}>Account Settings</DropdownItem>
        <DropdownItem isDanger onClick={() => console.log("Logout")}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

### 2. Feature-Rich Menu (Header, Group, Icon, Shortcut, Danger)

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
        <Button variant="outline">My Account</Button>
      </DropdownTrigger>
      <DropdownMenu minWidth={240}>
        <DropdownHeader>
          <div className="font-semibold text-neutral-900">John Doe</div>
          <div className="text-xs text-neutral-500">john.doe@example.com</div>
        </DropdownHeader>
        <DropdownSeparator />

        <DropdownGroup title="Management">
          <DropdownItem icon={<UserIcon />} shortcut="⌘P" onClick={() => {}}>
            User Profile
          </DropdownItem>
          <DropdownItem icon={<SettingsIcon />} shortcut="⌘S" onClick={() => {}}>
            Settings
          </DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />

        <DropdownGroup title="Security">
          <DropdownItem icon={<LockIcon />} onClick={() => {}}>
            Change Password
          </DropdownItem>
          <DropdownItem
            icon={<TrashIcon />}
            isDanger
            shortcut="⌘⌫"
            onClick={() => {}}
          >
            Delete Account
          </DropdownItem>
        </DropdownGroup>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

### 3. Custom Trigger via `asChild`

When enabling `asChild` (or passing a single valid React child element directly), `DropdownTrigger` delegates all accessibility attributes and event listeners directly to that child without introducing unnecessary wrapper `<button>` elements:

```tsx
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, IconButton } from "@openway/ui";
import { MoreVerticalIcon } from "@/components/icons";

export function CustomTriggerDropdown() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger asChild>
        <IconButton icon={<MoreVerticalIcon />} aria-label="More options" variant="ghost" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Copy Link</DropdownItem>
        <DropdownItem isDanger>Delete Item</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

---

### 4. Trigger on Hover (`trigger="hover"`)

```tsx
<Dropdown trigger="hover" placement="bottom-start">
  <DropdownTrigger>
    <Button variant="soft">Hover to Open</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

---

## ♿ Accessibility & Keyboard Navigation

| Key | Behavior |
| :--- | :--- |
| `Enter` / `Space` / `ArrowDown` | Opens the menu when focused on the trigger and focuses the first item. |
| `ArrowDown` | Moves focus to the next item (automatically skips `disabled` items and separators). |
| `ArrowUp` | Moves focus to the previous item (supports looping via `loop: true`). |
| `Home` | Jumps focus to the first item in the menu. |
| `End` | Jumps focus to the last item in the menu. |
| `Escape` | Closes the menu and returns focus to the trigger element. |
| `Enter` / `Space` | Activates the `onClick` event of the focused item and closes the menu (if `closeOnSelect={true}`). |

---

## 📋 API Reference

### `<Dropdown>` (Root Component)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Child components (`DropdownTrigger`, `DropdownMenu`). |
| `open` | `boolean` | — | Controlled open state of the menu. |
| `defaultOpen` | `boolean` | `false` | Initial open state in uncontrolled mode. |
| `onOpenChange` | `(open: boolean) => void` | — | Callback invoked when the open/closed state changes. |
| `trigger` | `'click' \| 'hover'` | `'click'` | Trigger interaction mode to open the dropdown. |
| `placement` | `DropdownPlacement` | `'bottom-start'` | Menu placement relative to the trigger. |
| `offset` | `number` | `4` | Distance (px) between the trigger and menu. |
| `flip` | `boolean` | `true` | Automatically flips placement when overflowing the viewport. |
| `shift` | `boolean` | `true` | Automatically shifts menu along the axis to remain visible. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size applied to the menu and its items. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Corner radius of the menu container. |
| `color` | `DropdownColor` | `'primary'` | Primary accent color when an item is active/hovered. |
| `disabled` | `boolean` | `false` | Disables the entire Dropdown. |
| `animated` | `boolean` | `true` | Enables or disables enter/exit animations. |
| `animationDuration` | `number` | `150` | Animation duration in milliseconds. |
| `closeOnSelect` | `boolean` | `true` | Automatically closes the menu when an item is selected. |
| `closeOnEsc` | `boolean` | `true` | Closes the menu when pressing `Escape`. |
| `closeOnClickOutside` | `boolean` | `true` | Closes the menu when clicking outside. |

---

### `<DropdownTrigger>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Trigger element. |
| `asChild` | `boolean` | `false` | Merges props and behavior onto child element without a wrapper button. |
| `className` | `string` | `""` | Additional custom CSS classes. |
| `ref` | `Ref<HTMLElement>` | — | React 19 Ref forwarding directly to the trigger element. |

---

### `<DropdownMenu>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Content inside the menu (Header, Group, Item, Separator). |
| `minWidth` | `string \| number` | — | Minimum width of the menu container. |
| `zIndex` | `number` | `DEFAULT_Z_INDEX.DROPDOWN` (50) | Z-index stacking order for the menu. |
| `className` | `string` | `""` | Additional custom CSS classes. |
| `style` | `CSSProperties` | — | Additional custom inline styles. |
| `ref` | `Ref<HTMLDivElement>` | — | React 19 Ref forwarding directly to the menu container. |

---

### `<DropdownItem>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Label or content of the item. |
| `icon` | `ReactNode` | — | Leading icon displayed on the left. |
| `shortcut` | `string` | — | Keyboard shortcut indicator displayed on the right (e.g., `"⌘K"`, `"Ctrl+S"`). |
| `color` | `DropdownColor` | — | Overrides the color theme for this item. |
| `size` | `DropdownSize` | — | Overrides the size for this item. |
| `disabled` | `boolean` | `false` | Disables the item (prevents hover and click interactions). |
| `isDanger` | `boolean` | `false` | Styles item as a destructive/danger action (red text, light red hover background). |
| `onClick` | `(e: MouseEvent) => void` | — | Callback invoked when the user clicks the item. |
| `className` | `string` | `""` | Additional custom CSS classes. |
| `ref` | `Ref<HTMLDivElement>` | — | React 19 Ref forwarding directly to the item. |

---

### `<DropdownHeader>`, `<DropdownGroup>`, `<DropdownSeparator>`

- `<DropdownHeader>`: Displays header/account information at the top of the menu (`<div>` conforming to WAI-ARIA menu structure).
- `<DropdownGroup title="Group Title">`: Groups related items under a common title with `role="group"`.
- `<DropdownSeparator>`: Contextual divider between menu groups (semantic HTML5 `<hr>` tag).
