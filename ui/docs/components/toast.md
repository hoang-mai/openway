# 🍞 Toast Component & API (`@openway/ui`)

A floating notification system (**Toast Notifications**) featuring smooth **3D card stacking** powered by the **Sonner** engine, seamlessly integrated with the visual design of the **`<Alert />`** component per **Design System** standards, **100% Type-safe (Zero `any`)**, and fully compliant with **WAI-ARIA Accessibility**.

---

## 🌟 Features

- **100% `<Alert />` Visual Integration**: Every toast notification inherits the complete design system aesthetic of `<Alert />` (5 sizes, 6 variants, 7 colors, custom icon, action button, border radius).
- **Intelligent 3D Card Stacking**: By default (`expand={false}`), notifications neatly nest together in a 3D card deck that smoothly expands on hover.
- **Convenient Imperative API**: Call `toast.success()`, `toast.error()`, etc. anywhere (inside React components, event handlers, Axios/Fetch interceptors) without requiring nested context providers.
- **Standardized Concise Syntax**: `toast.success(title, description?, options?)` — intuitive, memorable, and ergonomic.
- **Automated Promise Handling (`toast.promise`)**: Automatically manages async lifecycles: displays a loading spinner, then smoothly transitions to *Success* or *Error* within the exact same toast card.
- **Strict Type Safety**: Completely avoids `any`, providing full Generic `<T>` inference for API response data in `toast.promise`.
- **Standardized Constants**: Employs `DEFAULT_TOAST_DURATION = 4000ms`, making it easy to customize display durations globally or locally.

---

## 🚀 Setup & Installation

### Step 1: Mount `<Toaster />` in Root Layout
Mount the `<Toaster />` component once at the topmost layout file of your application (e.g., `App.tsx`, `main.tsx`, or `app/layout.tsx`):

```tsx
import { Toaster } from "@openway/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Place Toaster at the bottom of the body */}
        <Toaster position="top-right" duration={4000} />
      </body>
    </html>
  );
}
```

---

### Step 2: Trigger Toasts Anywhere
```tsx
import { toast } from "@openway/ui";

export function SaveButton() {
  const handleSave = () => {
    toast.success("Saved successfully!", "Your profile information has been updated.");
  };

  return <button onClick={handleSave}>Save Changes</button>;
}
```

---

## 📖 Detailed Usage Guide

### 1. Basic Notification Methods

```tsx
import { toast } from "@openway/ui";

// 1. Success
toast.success("Success!", "New account created successfully.");

// 2. Error
toast.error("Error occurred!", "Unable to connect to the server.");

// 3. Warning
toast.warning("Storage Warning", "Your cloud storage is nearly full (90%).");

// 4. Info / Default
toast.info("Update Available", "Please refresh the page to apply new changes.");
// Or invoke directly:
toast("System Notification", "Your session will expire in 15 minutes.");

// 5. Loading (Does not dismiss automatically)
const loadingId = toast.loading("Synchronizing data...", "Please keep your browser open.");
```

---

### 2. Customizing Alert Appearance via `options`

Pass the third argument (`options`) to change variant, duration, size, or add action buttons:

```tsx
import { toast, Button } from "@openway/ui";

// Filled variant displayed for 8 seconds:
toast.error("Deletion failed!", "You do not have permission to delete this resource.", {
  variant: "filled",
  duration: 8000,
});

// Adding an Action button slot:
toast.info("Moved to Trash", "File 'document.pdf' has been removed.", {
  action: (
    <Button
      size="xs"
      variant="outline"
      color="info"
      onClick={() => {
        // Handle undo logic
        console.log("Undo action");
      }}
    >
      Undo
    </Button>
  ),
});

// Customizing radius and size:
toast.success("Link copied!", undefined, {
  size: "sm",
  radius: "full",
});
```

---

### 3. Automating Async APIs with `toast.promise`

`toast.promise` automatically renders a loading state with a spinner, updating smoothly to Success or Error once the promise resolves or rejects:

#### Method 1: Simple Message Strings
```tsx
import { toast } from "@openway/ui";

async function handleUpdateProfile() {
  await toast.promise(updateUserApi(data), {
    loading: "Updating profile...",
    success: "Profile updated successfully!",
    error: "Failed to update profile.",
  });
}
```

#### Method 2: Accessing API Response Data & Customizing UI
```tsx
import { toast } from "@openway/ui";

interface Invoice {
  code: string;
  total: number;
}

async function handleCreateInvoice() {
  await toast.promise<Invoice>(createInvoiceApi(), {
    loading: {
      title: "Generating invoice...",
      description: "System is issuing the electronic invoice code.",
    },
    success: (invoice) => ({
      title: "Invoice generated successfully!",
      description: `Invoice code: #${invoice.code} - Total: $${invoice.total.toLocaleString()}`,
      variant: "filled",
    }),
    error: (err) => ({
      title: "Failed to generate invoice!",
      description: err instanceof Error ? err.message : "An unexpected error occurred.",
    }),
    finally: () => {
      console.log("Operation finished.");
    },
  });
}
```

---

### 4. Dismissing Toasts (`toast.dismiss`)

```tsx
import { toast } from "@openway/ui";

// 1. Dismiss a specific toast by its returned ID:
const id = toast.loading("Compressing files...");
// ...once complete:
toast.dismiss(id);

// 2. Dismiss ALL active toasts on screen:
toast.dismiss();
```

---

### 5. Fully Custom Toasts with `toast.custom`

Render arbitrary JSX components with custom styling:

```tsx
import { toast } from "@openway/ui";

// Approach 1: Render function receiving the toast ID for dismissal
toast.custom((id) => (
  <div className="p-4 bg-purple-900 text-white rounded-xl shadow-xl flex items-center justify-between">
    <span>✨ Special Promotional Offer!</span>
    <button
      onClick={() => toast.dismiss(id)}
      className="ml-3 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs"
    >
      Close
    </button>
  </div>
));

// Approach 2: Pass AlertProps directly
toast.custom({
  color: "secondary",
  variant: "outline",
  title: "Customized via AlertProps",
  description: "Directly rendering an Alert configuration.",
});
```

---

## ⚙️ API Reference

### 1. `ToasterProps` (Configuration for `<Toaster />`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `'top-right'` | Screen position for rendering toasts (`'top-left'`, `'top-right'`, `'top-center'`, `'bottom-left'`, `'bottom-right'`, `'bottom-center'`). |
| `visibleToasts` | `number` | `3` | Maximum number of visible toasts before 3D card stacking occurs. |
| `expand` | `boolean` | `false` | When `false`, collapses toasts into a 3D card deck (expands on hover). When `true`, always renders expanded. |
| `duration` | `number` | `4000` (`DEFAULT_TOAST_DURATION`) | Default display duration for toasts (ms). |
| `closeButton` | `boolean` | `false` | Displays Sonner's default close button (Alert component already includes its own integrated close button). |
| `className` | `string` | `""` | Custom class name applied to the Toaster container. |

---

### 2. `ToastOptions` (`options` parameter for `toast.xxx`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `4000` | Display duration for this notification (ms). Pass `Infinity` to keep persistent. |
| `position` | `ToastPosition` | Inherited from Toaster | Override display position for this specific toast. |
| `variant` | `AlertVariant` | `'soft'` | Visual variant of the Alert (`'soft'`, `'filled'`, `'outline'`, `'accent-left'`, `'ghost'`, `'other'`). |
| `color` | `AlertColor` | Matches method | Theme color (`'primary'`, `'secondary'`, `'neutral'`, `'error'`, `'success'`, `'warning'`, `'info'`). |
| `size` | `AlertSize` | `'md'` | Notification size (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`). |
| `radius` | `AlertRadius` | `'lg'` | Border radius (`'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'full'`). |
| `icon` | `ReactNode \| boolean` | `true` | Icon display (`true`: default icon, `false`: hidden icon, `ReactNode`: custom icon). |
| `action` | `ReactNode` | `undefined` | Action button or link element rendered inside the Alert. |
| `closable` | `boolean` | `true` | Allows closing the toast via close button `(X)` (automatically dismisses from Sonner). |
| `onClose` | `() => void` | `undefined` | Callback fired when the user clicks the close button `(X)`. |
| `onDismiss` | `(toast: ToastT) => void` | `undefined` | Callback fired when the toast is dismissed from view. |
| `onAutoClose` | `(toast: ToastT) => void` | `undefined` | Callback fired when the toast closes automatically after `duration` expires. |
| `className` | `string` | `""` | Custom CSS class for the Alert container. |

---

### 3. `ToastPromiseOptions<T>` (Configuration for `toast.promise`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `loading` | `ToastMessageResult` | Content displayed while the Promise is executing (Loading state). |
| `success` | `ToastMessageResult \| (data: T) => ToastMessageResult` | Content displayed when the Promise resolves successfully (Resolve state). |
| `error` | `ToastMessageResult \| (error: unknown) => ToastMessageResult` | Content displayed when the Promise fails (Reject state). |
| `finally` | `() => void \| Promise<void>` | Callback always executed after the Promise completes (both success and error). |
| `duration` | `number` | Display duration for result toast (defaults to 4000ms). |
| `size` | `AlertSize` | Notification size applied throughout the promise lifecycle. |
| `variant` | `AlertVariant` | Alert variant applied throughout the promise lifecycle. |
| `radius` | `AlertRadius` | Border radius applied throughout the promise lifecycle. |

---

### 4. Toast Method Directory

| Method | Syntax | Description |
| :--- | :--- | :--- |
| `toast()` | `toast(title, description?, options?)` | Displays a default informational toast (`color="info"`). |
| `toast.success()` | `toast.success(title, description?, options?)` | Displays a success toast (`color="success"`). |
| `toast.error()` | `toast.error(title, description?, options?)` | Displays an error toast (`color="error"`). |
| `toast.warning()` | `toast.warning(title, description?, options?)` | Displays a warning toast (`color="warning"`). |
| `toast.info()` | `toast.info(title, description?, options?)` | Displays an informational toast (`color="info"`). |
| `toast.loading()` | `toast.loading(title, description?, options?)` | Displays a loading toast with spinner (`icon=Spinner`, `duration=Infinity`). |
| `toast.promise()` | `toast.promise(promise, options)` | Automatically tracks a Promise and updates toast state accordingly. |
| `toast.custom()` | `toast.custom(jsxFn \| alertProps, options?)` | Displays a fully customized toast. |
| `toast.dismiss()` | `toast.dismiss(id?)` | Dismisses toast by ID, or dismisses all active toasts if no ID is passed. |
