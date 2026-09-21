# 🏷️ Badge Component (`@openway/ui`)

The **Badge** component (Badge / Status Label / Chip) is a high-performance, standardized **Design System** component with a **Pure Stateless Component** architecture (0 dependencies) and full **WAI-ARIA Accessibility** support.

---

## 🌟 Key Features

- **Pure Stateless Component**: Fast rendering, independent of global state stores, easy to use anywhere in JSX.
- **5 Standard Sizes (`size`)**: `xs` (20px), `sm` (24px), `md` (28px - *default*), `lg` (32px), `xl` (36px) with automatically synchronized typography, padding, and icon sizing.
- **5 Visual Variants (`variant`)**:
  - `soft` *(default)*: Light pastel background, bold text, subtle 1px border.
  - `filled`: Solid deep color background, high contrast, prominent white text.
  - `outline`: Transparent background, crisp 2px border matching the theme color.
  - `ghost`: Borderless, transparent background, subtle hover effect.
  - `other`: Skips default color classes, allowing full color/gradient customization via `className`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **Flexible Border Radius (`radius`)**: `none` (square corners), `sm`, `md`, `lg`, `xl`, `full` (*default* - pill shape).
- **Status Dot & Radar Ping**:
  - `dot={true}`: Displays a color-coordinated status dot.
  - `dotPing={true}`: Enables an animated radar pulse ping effect (ideal for live streams, online status, critical alerts).
- **Leading & Trailing Icons (`leftIcon`, `rightIcon`)**: Automatically scales icon dimensions according to the badge's `size`.
- **Dismissible Chip Mode (`onDelete`)**: Built-in remove/delete button `(X)` with hover effects and `deleteAriaLabel` accessibility label.
- **Click Interaction (`onClick`)**: Automatically converts the badge into an interactive button (`role="button"`, `tabIndex={0}`) with smooth `active:scale-[0.98]` press feedback.
- **Safe Config Fallback**: Built-in `getSafeConfig` function guarantees the component never crashes even if invalid `size`, `variant`, `color`, or `radius` values are passed.

---

## 🚀 Installation & Import

```tsx
import { Badge } from "@openway/ui";
import type { BadgeProps, BadgeSize, BadgeVariant, BadgeColor, BadgeRadius } from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { Badge } from "@openway/ui";

export function BasicBadgeExample() {
  return (
    <div className="flex gap-2 items-center">
      <Badge>Default</Badge>
      <Badge color="success">Completed</Badge>
      <Badge color="warning" variant="filled">Warning</Badge>
    </div>
  );
}
```

---

### 2. Sizes (`size`)

Supports 5 standard sizes: `xs`, `sm`, `md` *(default)*, `lg`, `xl`.

```tsx
<Badge size="xs">Extra Small (20px)</Badge>
<Badge size="sm">Small (24px)</Badge>
<Badge size="md">Medium (28px)</Badge>
<Badge size="lg">Large (32px)</Badge>
<Badge size="xl">Extra Large (36px)</Badge>
```

---

### 3. Visual Variants (`variant`)

```tsx
// 1. Soft (Default): Light pastel background
<Badge variant="soft" color="primary">Soft Primary</Badge>

// 2. Filled: Deep background, high contrast
<Badge variant="filled" color="primary">Filled Primary</Badge>

// 3. Outline: Transparent background, 2px border
<Badge variant="outline" color="primary">Outline Primary</Badge>

// 4. Ghost: Transparent background, borderless
<Badge variant="ghost" color="primary">Ghost Primary</Badge>

// 5. Other: 100% customizable with Tailwind
<Badge
  variant="other"
  className="bg-linear-to-r from-violet-600 to-pink-500 text-white shadow-sm border-0"
>
  Gradient VIP
</Badge>
```

---

### 4. Color Themes (`color`)

Provides 7 color themes matching Design System standards:

```tsx
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="info">Info</Badge>
<Badge color="neutral">Neutral</Badge>
```

---

### 5. Status Dot & Radar Ping

Ideal for displaying user account status, server health, and ongoing processes:

```tsx
// Static status dot
<Badge dot color="success">Online</Badge>
<Badge dot color="neutral">Offline</Badge>
<Badge dot color="warning">Pending</Badge>

// Pulsing status dot (Radar Pulse Ping)
<Badge dot dotPing color="error">Live 2.4k</Badge>
<Badge dot dotPing color="primary" variant="filled">Stream Active</Badge>
```

---

### 6. Leading & Trailing Icons (`leftIcon`, `rightIcon`)

```tsx
import { Badge } from "@openway/ui";
import { SparklesIcon, CheckIcon, ShieldIcon } from "@/components/icons";

export function IconBadgeExample() {
  return (
    <div className="flex gap-2">
      <Badge color="primary" leftIcon={<SparklesIcon />}>
        VIP Privilege
      </Badge>
      <Badge color="success" rightIcon={<CheckIcon />}>
        Verified
      </Badge>
      <Badge color="secondary" leftIcon={<ShieldIcon />} rightIcon={<CheckIcon />}>
        High Security
      </Badge>
    </div>
  );
}
```

---

### 7. Dismissible Chip (With `onDelete` button)

When passing the `onDelete` prop, the Badge displays a close button `(X)` on the right:

```tsx
import { useState } from "react";
import { Badge } from "@openway/ui";

export function ChipListExample() {
  const [tags, setTags] = useState(["React", "TypeScript", "TailwindCSS"]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          color="primary"
          onDelete={() => removeTag(tag)}
          deleteAriaLabel={`Remove tag ${tag}`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

---

### 8. Click Interactions (`onClick`)

Badge automatically supports pointer cursor, `active:scale-[0.98]` feedback, `role="button"`, and `tabIndex={0}`:

```tsx
<Badge
  color="info"
  variant="soft"
  onClick={() => alert("Filter selected!")}
>
  Filter: Newest
</Badge>
```

---

### 9. Border Radius (`radius`)

```tsx
<Badge radius="none">radius="none" (0px)</Badge>
<Badge radius="sm">radius="sm" (rounded-sm)</Badge>
<Badge radius="md">radius="md" (rounded-md)</Badge>
<Badge radius="lg">radius="lg" (rounded-lg)</Badge>
<Badge radius="xl">radius="xl" (rounded-xl)</Badge>
<Badge radius="full">radius="full" (Pill - Default)</Badge>
```

---

## 🛠️ API Reference (`BadgeProps`)

The `Badge` component accepts props extending standard HTML `HTMLAttributes<HTMLSpanElement>`:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Badge size (affects height, padding, font size, icon size). |
| `variant` | `"soft" \| "filled" \| "outline" \| "ghost" \| "other"` | `"soft"` | Visual variant and color presentation style. |
| `color` | `"primary" \| "secondary" \| "error" \| "success" \| "warning" \| "info" \| "neutral"` | `"primary"` | Color theme based on the Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Border radius of the badge. |
| `dot` | `boolean` | `false` | Displays a status dot at the start of the badge. |
| `dotPing` | `boolean` | `false` | Enables pulse animation for the status dot. |
| `leftIcon` | `ReactNode` | `undefined` | Icon or element displayed before the content. |
| `rightIcon` | `ReactNode` | `undefined` | Icon or element displayed after the content (hidden when `onDelete` is present). |
| `onDelete` | `() => void` | `undefined` | Callback when the user clicks the remove button `(X)` on the badge. |
| `deleteAriaLabel` | `string` | `"Remove"` | Accessibility label for the remove button `(X)`. |
| `children` | `ReactNode` | `undefined` | Text content or element displayed inside the badge. |
| `onClick` | `MouseEventHandler<HTMLSpanElement>` | `undefined` | Click event converting the badge into an interactive button. |
| `className` | `string` | `""` | Custom external Tailwind CSS class. |
| `ref` | `Ref<HTMLSpanElement>` | `undefined` | Forwarded ref to the badge `<span>` element. |
