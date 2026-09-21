# 📢 Alert Component (`@openway/ui`)

The **Alert** component displays contextual notifications and alerts (Inline Alert / Banner) with high performance, a standardized **Design System** design, **Pure Stateless Component** architecture (0 dependencies), and full **WAI-ARIA Accessibility** support.

---

## 🌟 Key Features

- **Pure Stateless Component**: Completely independent of global stores (Zustand/Redux). Renders directly anywhere in the JSX tree.
- **Smart Auto-Dismiss (`closable`)**: Defaults to `closable={true}`. Clicking the `(X)` button **automatically dismisses/hides the alert immediately** without requiring an `onClose` handler. If an `onClose` callback is provided, the Alert triggers it automatically.
- **Flexible `description` & `children` Support**: Allows passing description content via the `description` prop (text string or short JSX) or wrapped inside `children` (complex JSX).
- **5 Standard Sizes (`size`)**: `xs`, `sm`, `md` *(default)*, `lg`, `xl` with precisely aligned typography and spacing.
- **6 Visual Variants (`variant`)**:
  - `soft` *(default)*: Light pastel background with a subtle 2px border.
  - `filled`: Solid color background with high-contrast white text.
  - `outline`: White background with a crisp border matching the theme color.
  - `accent-left`: Pastel background with a 4px accent border on the left (`border-l-4`).
  - `ghost`: Transparent background and border.
  - `other`: Skips default color classes, allowing full color customization via `className`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info` *(default)*.
- **Custom Border Radius (`radius`)**: `none`, `sm`, `md`, `lg` *(default)*, `xl`, `full`.
- **Banner Mode (`banner`)**: Full-width (`w-full`), square corners (`rounded-none`), borderless sides (`border-x-0`), ideal for fixed placement at the top of the page.
- **Smart Icon Support (`icon`)**:
  - Automatically displays the standard SVG icon matching the `color` (`CheckCircleIcon`, `AlertTriangleIcon`, `AlertCircleIcon`, `InfoCircleIcon`).
  - Easily disable icons with `icon={false}`.
  - Supports custom JSX icons (`ReactNode`).
- **Action Slot (`action`)**: Dedicated slot for action buttons and quick-action links.
- **Accessibility Standards (A11y)**:
  - Automatically sets `role="alert"` and `aria-live="assertive"` for critical statuses (`error`, `warning`).
  - Sets `role="status"` and `aria-live="polite"` for standard statuses (`info`, `success`, `primary`, `secondary`, `neutral`).

---

## 🚀 Installation & Import

```tsx
import { Alert } from "@openway/ui";
import type { AlertProps, AlertColor, AlertVariant, AlertSize, AlertRadius } from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage (Inline Alert)

You can pass notification content via the `description` prop or as child elements (`children`):

```tsx
import { Alert } from "@openway/ui";

// Approach 1: Using the description prop (concise)
export function BasicAlertExample() {
  return (
    <Alert
      color="info"
      variant="soft"
      title="System Information"
      description="The system will undergo scheduled maintenance this weekend."
    />
  );
}

// Approach 2: Using children (for custom JSX)
export function ChildrenAlertExample() {
  return (
    <Alert color="success" title="Successfully saved!">
      <p className="mt-1">Your profile data has been updated.</p>
    </Alert>
  );
}
```

---

### 2. Auto-dismissing Alerts (`closable` & `onClose`)

The close button `(X)` is enabled by default (`closable=true`). Users can click to dismiss the alert immediately without having to provide any handler:

```tsx
// 1. Auto-dismisses immediately on click without any extra handler:
<Alert title="Notice" description="Clicking the close button on the right will dismiss this alert." />

// 2. Auto-dismisses with an onClose callback (to execute additional logic):
<Alert
  title="Notice"
  description="Execute logic when the user dismisses the alert."
  onClose={() => console.log("Alert dismissed!")}
/>

// 3. Disable the close button (non-dismissible):
<Alert closable={false} title="Mandatory Notice" description="This alert cannot be dismissed." />
```

---

### 3. Color Themes (`color`)

The component provides 7 standard Design System color themes:

```tsx
<Alert color="primary" title="Primary" description="Primary application notification." />
<Alert color="secondary" title="Secondary" description="Secondary informational notification." />
<Alert color="neutral" title="Neutral" description="Neutral note-style notification." />
<Alert color="info" title="Info" description="Usage instruction information." />
<Alert color="success" title="Success" description="Data saved successfully." />
<Alert color="warning" title="Warning" description="Memory usage has reached 90%." />
<Alert color="error" title="Error" description="Unable to connect to the server." />
```

---

### 4. Visual Variants (`variant`)

```tsx
// 1. Soft (Default)
<Alert variant="soft" color="success" title="Soft Variant" description="Light pastel background, matching text and border color tone." />

// 2. Filled
<Alert variant="filled" color="error" title="Filled Variant" description="Solid deep background, high contrast, prominent." />

// 3. Outline
<Alert variant="outline" color="primary" title="Outline Variant" description="White background, crisp border matching theme color." />

// 4. Accent Left
<Alert variant="accent-left" color="warning" title="Accent Left Variant" description="Pastel background with a 4px accent border on the left." />

// 5. Ghost
<Alert variant="ghost" color="info" title="Ghost Variant" description="Transparent background and border, showing only icon and text." />

// 6. Other (Custom styling)
<Alert
  variant="other"
  className="bg-purple-100 text-purple-900 border-2 border-purple-300"
  title="Other Variant"
  description="Freely apply custom external Tailwind classes."
/>
```

---

### 5. Sizes (`size`) & Border Radius (`radius`)

```tsx
// 5 standard sizes
<Alert size="xs" title="Size XS" description="Extra small size alert" />
<Alert size="sm" title="Size SM" description="Small size alert" />
<Alert size="md" title="Size MD" description="Medium size alert (default)" />
<Alert size="lg" title="Size LG" description="Large size alert" />
<Alert size="xl" title="Size XL" description="Extra large size alert" />

// Border radius customization
<Alert radius="none" title="No Radius" description="Square corners 0px" />
<Alert radius="sm" title="Small Radius" description="rounded-sm" />
<Alert radius="md" title="Medium Radius" description="rounded-md" />
<Alert radius="lg" title="Large Radius" description="rounded-lg (default)" />
<Alert radius="xl" title="Extra Large Radius" description="rounded-xl" />
<Alert radius="full" title="Full Radius" description="rounded-2xl" />
```

---

### 6. Banner Mode (`banner`)

Banner mode stretches the notification across the full width (`w-full`), eliminates rounded corners (`rounded-none`) and horizontal borders, making it ideal for fixed placement at the top of the viewport:

```tsx
<Alert
  banner
  color="error"
  title="Network Issue"
  description="Some payment services are currently experiencing disruptions."
  action={
    <button className="text-xs underline font-medium cursor-pointer">
      View details
    </button>
  }
/>
```

---

### 7. Custom Icons & Action Slot

```tsx
import { Alert, Button } from "@openway/ui";

export function AdvancedAlertExample() {
  return (
    <div className="space-y-4">
      {/* Hide Icon */}
      <Alert icon={false} color="neutral" title="No Icon" description="Notification content without a leading icon." />

      {/* Custom JSX Icon */}
      <Alert
        icon={<span className="text-lg">🚀</span>}
        color="primary"
        title="New Feature"
        description="Experience version 2.0 with major improvements."
      />

      {/* Action Slot with Button */}
      <Alert
        color="info"
        title="New Update Available"
        description="Please reload the application to apply the latest patch."
        action={
          <Button size="xs" variant="filled" color="info">
            Update Now
          </Button>
        }
      />
    </div>
  );
}
```

---

## 🛠️ API Reference (`AlertProps`)

The `Alert` component accepts props extending standard HTML `HTMLAttributes<HTMLDivElement>` (except for the `title` prop):

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Alert size (affects padding, font size, icon size). |
| `variant` | `"soft" \| "filled" \| "outline" \| "accent-left" \| "ghost" \| "other"` | `"soft"` | Visual variant and color presentation style. |
| `color` | `"primary" \| "secondary" \| "neutral" \| "error" \| "success" \| "warning" \| "info"` | `"info"` | Color theme based on the Design System. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"` | Border radius of the alert container. |
| `title` | `ReactNode` | `undefined` | Bold title of the alert. |
| `description` | `ReactNode` | `undefined` | Short description content of the notification. |
| `children` | `ReactNode` | `undefined` | Custom JSX description content inside the Alert. |
| `icon` | `ReactNode \| boolean` | `true` | Leading icon: `true` = automatic based on color, `false` = hidden, `ReactNode` = custom icon. |
| `action` | `ReactNode` | `undefined` | Action element placed on the right side (Button, Link, Tag). |
| `closable` | `boolean` | `true` | Shows the close button `(X)` and automatically hides the Alert when clicked. |
| `onClose` | `() => void` | `undefined` | Callback invoked when the user clicks the close button. |
| `closeAriaLabel` | `string` | `"Close alert"` | Accessibility label for the close button. |
| `banner` | `boolean` | `false` | Enables Banner mode: Full width (`w-full`), square corners (`rounded-none`), borderless sides. |
| `titleClassName` | `string` | `""` | Custom className for the title element (`title`). |
| `descriptionClassName` | `string` | `""` | Custom className for the description/children container (`description` / `children`). |
| `actionClassName` | `string` | `""` | Custom className for the `action` slot. |
| `iconClassName` | `string` | `""` | Custom className for the icon container. |
| `closeButtonClassName` | `string` | `""` | Custom className for the close button `(X)`. |
| `className` | `string` | `""` | Custom class for the outer container. |
| `role` | `string` | Auto | ARIA role (`"alert"` for error/warning, `"status"` for other colors). |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Forwarded ref to the outer `<div>` element. |
