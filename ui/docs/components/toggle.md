# 🎚️ Toggle Component (`@openway/ui`)

A modern, flexible, and interactive **Toggle** (switch) component designed to strict **Design System** standards, featuring **Safe Config Fallback**, **Start/End Content & Thumb Icons**, **Loading & Spinners**, and full compliance with **WAI-ARIA Accessibility** (`role="switch"`).

---

## 🌟 Features

- **5 Standard Sizes (`size`)**:
  - `xs`: Track 28x16px, thumb 12px, text 12px.
  - `sm`: Track 36x20px, thumb 14px, text 14px.
  - `md` *(default)*: Track 44x24px, thumb 20px, text 14px.
  - `lg`: Track 52x28px, thumb 24px, text 16px.
  - `xl`: Track 64x36px, thumb 28px, text 18px.
- **4 Visual Variants (`variant`)**:
  - `filled` *(default)*: High-contrast solid track background when active.
  - `outline`: Transparent/white track background with themed border and thumb.
  - `soft`: Gentle pastel track background matching the theme color.
  - `other`: Bypasses default styles for complete custom styling via `trackClassName` and `thumbClassName`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radii (`radius` & `thumbRadius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full` *(default: `full`)*.
- **2 Label Placements (`labelPlacement`)**:
  - `right` *(default)*: Toggle on the left, label on the right.
  - `left`: Label on the left, toggle on the right.
- **Flexible Icon & Content Customization**:
  - `thumbIcon`: Custom icon inside the thumb (supports static ReactNode or dynamic function `({ isChecked, className }) => ReactNode`).
  - `startContent` & `endContent`: Icon / content rendered directly inside the track.
- **Loading State & Spinners (`isLoading`)**:
  - Automatically displays an inline spinner inside the thumb and disables user interactions (`disabled`).
- **Error State & Helper Text (`isInvalid`, `errorMessage`, `helperText`)**:
  - Automatically applies invalid error styling and renders smooth expandable error messages.
- **Safe Config Fallback**: Built-in `getSafeConfig` utility guarantees crash-proof runtime stability when invalid props are provided.
- **React 19 Ref Forwarding**: Integrates `useMergeRefs` to forward refs directly to the underlying `<input type="checkbox" role="switch">`.

---

## 🚀 Installation & Import

```tsx
import { Toggle } from "@openway/ui";
import type {
  ToggleProps,
  ToggleConfig,
  ToggleSize,
  ToggleVariant,
  ToggleColor,
  ToggleRadius,
  ToggleLabelPlacement,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { useState } from "react";
import { Toggle } from "@openway/ui";

export function BasicToggleExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
      label="Enable notifications"
    />
  );
}
```

---

### 2. Label Placement (`labelPlacement`)

```tsx
// 1. Label on the right (Default)
<Toggle label="Label on right" labelPlacement="right" />

// 2. Label on the left
<Toggle label="Label on left" labelPlacement="left" />
```

---

### 3. Variants (`variant`) & Colors (`color`)

```tsx
// Filled (default)
<Toggle variant="filled" color="primary" label="Primary Filled" defaultChecked />
<Toggle variant="filled" color="success" label="Success Filled" defaultChecked />

// Outline
<Toggle variant="outline" color="primary" label="Primary Outline" defaultChecked />

// Soft (Pastel)
<Toggle variant="soft" color="secondary" label="Secondary Soft" defaultChecked />

// Other (Custom gradient)
<Toggle
  variant="other"
  trackClassName="bg-gradient-to-r from-purple-600 to-pink-500 border-0"
  thumbClassName="bg-white text-purple-600 shadow-md"
  label="Custom Gradient"
  defaultChecked
/>
```

---

### 4. Icons inside Thumb & Start/End Content

```tsx
// Static icon inside Thumb
<Toggle thumbIcon={<span>🔒</span>} label="Security" />

// Dynamic icon changing based on checked state
<Toggle
  thumbIcon={({ isChecked }) => (
    <span>{isChecked ? "🌙" : "☀️"}</span>
  )}
  label="Appearance Mode"
/>

// Start / End Content inside Track
<Toggle
  startContent="☀️"
  endContent="🌙"
  size="lg"
  label="Day & Night"
/>
```

---

### 5. Loading, Error & Helper Text States

```tsx
// Loading state (via config)
<Toggle config={{ isLoading: true }} label="Synchronizing data..." />

// Error and Required state
<Toggle
  config={{ isRequired: true }}
  errorMessage="You must agree to the terms of service!"
  label="I agree to the terms"
/>

// Helper text
<Toggle
  label="Two-factor Authentication"
  helperText="Receive OTP codes via your registered phone number."
/>
```

---

### 6. Centralized Configuration via `config` Prop (`ToggleConfig`)

```tsx
<Toggle
  label="Automatic Backup"
  config={{
    isRequired: true,
    isLoading: false,
    isInvalid: false,
  }}
/>
```

---

## 🛠 Props Reference (`ToggleProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Toggle size (track, thumb, label font, spacing). |
| `variant` | `'filled' \| 'outline' \| 'soft' \| 'other'` | `'filled'` | Visual variant when toggle is in the active (checked) state. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color per Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Border radius of the track. |
| `thumbRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Border radius of the sliding thumb. |
| `config` | `ToggleConfig` | — | Consolidated configuration object for state flags (`isRequired`, `isInvalid`, `isLoading`). |
| `label` | `ReactNode` | — | Text or element label rendered beside the toggle. |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | Position of the label relative to the toggle. |
| `checked` | `boolean` | — | Active state (Controlled mode). |
| `defaultChecked` | `boolean` | `false` | Initial default active state (Uncontrolled mode). |
| `disabled` | `boolean` | `false` | Disables interaction with the toggle. |
| `readOnly` | `boolean` | `false` | Read-only mode, prevents changing state. |
| `helperText` | `ReactNode` | — | Helper or instructional text rendered beneath. |
| `errorMessage` | `ReactNode` | — | Error message displayed on validation failure (triggers invalid visual state). |
| `thumbIcon` | `ReactNode \| (({ isChecked, className }) => ReactNode)` | — | Icon rendered inside the sliding thumb. |
| `startContent` | `ReactNode` | — | Content or icon inside the track (left side when checked). |
| `endContent` | `ReactNode` | — | Content or icon inside the track (right side when unchecked). |
| `wrapperClassName` | `string` | — | Custom className for the outer container (toggle + label). |
| `trackClassName` | `string` | — | Custom className for the track element. |
| `thumbClassName` | `string` | — | Custom className for the thumb element. |
| `labelClassName` | `string` | — | Custom className for the `<label>` element. |
| `helperClassName` | `string` | — | Custom className for helperText / errorMessage container. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying `<input>` element. |

---

### `ToggleConfig` Reference

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red `*` and sets `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Activates invalid error styling and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interaction and sets `aria-busy="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a rotating spinner inside the thumb when `isLoading = true`. |
