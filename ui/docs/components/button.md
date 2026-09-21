# 🔘 Button & IconButton Component (`@openway/ui`)

The **Button** & **IconButton** component suite offers highly interactive, standardized **Design System** buttons featuring **flexible loading states**, **Safe Config Fallback**, and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Key Features

- **Pure Stateless & High Performance**: Optimized rendering, independent of global stores, easy to use and extend.
- **2 Convenient Component Variants**:
  - `<Button>`: Standard button with text label, leading/trailing icons, and full-width mode.
  - `<IconButton>`: Icon-only button with circular/square bounding box, requiring an `aria-label` for screen reader accessibility.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *default*), `lg` (48px), `xl` (56px) with proportionately scaled heights, padding, font sizes, and icon dimensions.
- **6 Visual Variants (`variant`)**:
  - `filled` *(default)*: Deep solid background, high-contrast white text, highlighting primary calls to action (Primary CTA).
  - `soft`: Light pastel background, matching text and border color tone, suitable for secondary actions.
  - `outline`: Transparent background, crisp 2px border, subtle background shift on hover.
  - `ghost`: Transparent background and border, shows background tint on hover.
  - `text`: Borderless text-only button, compact padding, text color shifts on hover.
  - `other`: Bypasses default color classes, allowing custom styles/gradients via `className`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **Flexible Border Radius (`radius`)**: `none` (square 0px), `sm`, `md`, `lg` (*default on Button*), `xl`, `full` (*default on IconButton*).
- **Smart Loading State (`isLoading` & `showSpinner`)**:
  - `isLoading={true}`: Automatically disables interactions (`disabled`), setting `aria-busy="true"` and `aria-disabled="true"`.
  - `showSpinner`: Defaults to `false` (no spinner icon). Set `showSpinner={true}` when a rotating spinner icon is desired.
  - `loadingText`: Allows replacing the displayed label while loading (e.g., *"Processing..."*).
- **Smooth Interactive Feedback**: Subtle scale-down effect on press (`active:scale-[0.98]`), prominent shade-700 focus ring for keyboard navigation.
- **Safe Config Fallback**: Built-in `getSafeConfig` function ensures rock-solid stability without crashes even when invalid size or color props are supplied.

---

## 🚀 Installation & Import

```tsx
import { Button, IconButton } from "@openway/ui";
import type {
  ButtonProps,
  IconButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonColor,
  ButtonRadius,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { Button } from "@openway/ui";

export function BasicButtonExample() {
  return (
    <div className="flex gap-3 items-center">
      <Button>Default Button</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success" variant="soft">Save changes</Button>
      <Button color="error" variant="outline">Delete data</Button>
    </div>
  );
}
```

---

### 2. Sizes (`size`)

Supports 5 sizes from `xs` to `xl`:

```tsx
<Button size="xs">Extra Small (24px)</Button>
<Button size="sm">Small (32px)</Button>
<Button size="md">Medium (40px - Default)</Button>
<Button size="lg">Large (48px)</Button>
<Button size="xl">Extra Large (56px)</Button>
```

---

### 3. Visual Variants (`variant`)

```tsx
// 1. Filled (Default): Solid prominent background
<Button variant="filled" color="primary">Filled Primary</Button>

// 2. Soft: Light pastel background
<Button variant="soft" color="primary">Soft Primary</Button>

// 3. Outline: 2px border
<Button variant="outline" color="primary">Outline Primary</Button>

// 4. Ghost: Transparent background
<Button variant="ghost" color="primary">Ghost Primary</Button>

// 5. Text: Minimalist text button
<Button variant="text" color="primary">Text Button</Button>

// 6. Other: 100% customizable via className
<Button
  variant="other"
  className="bg-linear-to-r from-violet-600 via-purple-600 to-pink-500 text-white shadow-md hover:opacity-90"
>
  Gradient VIP
</Button>
```

---

### 4. Color Themes (`color`)

Provides 7 color themes based on Design System standards:

```tsx
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="neutral">Neutral</Button>
<Button color="error">Error</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>
```

---

### 5. Icon Support (`leftIcon`, `rightIcon`) & `<IconButton>` Component

```tsx
import { Button, IconButton } from "@openway/ui";
import { PlusIcon, ArrowRightIcon, TrashIcon, HeartIcon } from "@/components/icons";

export function ButtonIconExample() {
  return (
    <div className="space-y-4">
      {/* Button with leading or trailing icon */}
      <div className="flex gap-3 items-center">
        <Button leftIcon={<PlusIcon />}>Create New</Button>
        <Button variant="outline" color="secondary" rightIcon={<ArrowRightIcon />}>
          Continue
        </Button>
        <Button variant="ghost" color="error" leftIcon={<TrashIcon />}>
          Delete
        </Button>
      </div>

      {/* Dedicated circular IconButton */}
      <div className="flex gap-3 items-center">
        <IconButton icon={<HeartIcon />} aria-label="Favorites" color="error" variant="soft" />
        <IconButton icon={<PlusIcon />} aria-label="Add new" color="primary" variant="filled" />
        <IconButton icon={<TrashIcon />} aria-label="Delete item" color="neutral" variant="ghost" />
        {/* Custom border radius for IconButton */}
        <IconButton icon={<PlusIcon />} aria-label="Add" radius="md" variant="outline" />
      </div>
    </div>
  );
}
```

---

### 6. Loading States & Spinner Options (`isLoading`, `showSpinner`, `loadingText`)

When `isLoading={true}`, the button is automatically disabled (`disabled`) with `aria-busy="true"`. You can choose whether to display a rotating spinner icon via the `showSpinner` prop (default is `false`):

```tsx
// 1. Loading without spinner (default: showSpinner=false)
<Button isLoading>Saving...</Button>

// 2. Loading with rotating spinner (showSpinner=true)
<Button isLoading showSpinner>Saving...</Button>

// 3. Loading with spinner and replacement loadingText
<Button isLoading showSpinner loadingText="Processing data...">
  Submit Request
</Button>

// 4. IconButton in loading state
<IconButton
  icon={<TrashIcon />}
  aria-label="Deleting"
  isLoading
  showSpinner
/>
```

---

### 7. Full Width (`isFullWidth`) & Disabled State (`disabled`)

```tsx
// 100% container width
<Button isFullWidth color="primary" size="lg">
  Sign up now
</Button>

// Disabled button
<Button disabled color="primary">
  Unavailable
</Button>
```

---

### 8. Border Radius (`radius`)

```tsx
<Button radius="none">radius="none" (0px)</Button>
<Button radius="sm">radius="sm" (rounded-sm)</Button>
<Button radius="md">radius="md" (rounded-md)</Button>
<Button radius="lg">radius="lg" (rounded-lg - Default)</Button>
<Button radius="xl">radius="xl" (rounded-xl)</Button>
<Button radius="full">radius="full" (Pill Shape)</Button>
```

---

## 🛠️ API Reference

### 1. `ButtonProps`

Inherits all standard HTML `<button>` attributes (`ButtonHTMLAttributes<HTMLButtonElement>`):

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Button size (height, padding, font size, icon size). |
| `variant` | `"filled" \| "soft" \| "ghost" \| "text" \| "outline" \| "other"` | `"filled"` | Visual variant and color style. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Color theme based on Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"` | Border radius of the button. |
| `leftIcon` | `ReactNode` | `undefined` | Icon or element displayed before the text. |
| `rightIcon` | `ReactNode` | `undefined` | Icon or element displayed after the text. |
| `isLoading` | `boolean` | `false` | Loading state (automatically disables interaction and sets aria-busy). |
| `showSpinner` | `boolean` | `false` | Displays a rotating spinner when in loading state. |
| `loadingText` | `ReactNode` | `undefined` | Replacement text displayed while loading. |
| `isFullWidth` | `boolean` | `false` | Expands width to occupy 100% of parent container (`w-full`). |
| `disabled` | `boolean` | `false` | Disables the button. |
| `children` | `ReactNode` | `undefined` | Text content or elements inside the button. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Standard HTML button type attribute. |
| `className` | `string` | `""` | Custom external Tailwind CSS class. |
| `ref` | `Ref<HTMLButtonElement>` | `undefined` | Forwarded ref to the `<button>` element. |

---

### 2. `IconButtonProps`

Inherits `<button>` attributes except `children`:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `ReactNode` | *(Required)* | Icon displayed centered in the button. |
| `aria-label` | `string` | *(Required)* | Descriptive action label for Screen Readers / A11y. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Icon button size (24px, 32px, 40px, 48px, 56px). |
| `variant` | `"filled" \| "soft" \| "ghost" \| "text" \| "outline" \| "other"` | `"filled"` | Visual variant of the icon button. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"primary"` | Color theme based on Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Border radius of the icon button (fully rounded by default). |
| `isLoading` | `boolean` | `false` | Loading state (disables interaction). |
| `showSpinner` | `boolean` | `false` | Displays a rotating spinner in place of the icon while loading. |
| `disabled` | `boolean` | `false` | Disables the icon button. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Button type attribute. |
| `className` | `string` | `""` | Custom external Tailwind CSS class. |
| `ref` | `Ref<HTMLButtonElement>` | `undefined` | Forwarded ref to the `<button>` element. |
