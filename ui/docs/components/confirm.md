# 📦 Confirm Component (`@openway/ui`)

A high-performance **Confirm** dialog component suite built on top of **HTML5 Native `<dialog>`** and designed with a flexible **Pure Compound Pattern** architecture.

---

## 🌟 Key Features

- **Native Top Layer**: Utilizes the native HTML `<dialog>` element combined with the browser's `dialog.showModal()` method. Confirm automatically renders in the `#top-layer`, never cut off by parent containers with `overflow: hidden`, `overflow: auto`, or `z-index` stacking conflicts.
- **Zero Global Store**: Completely eliminates Zustand / Redux / React Portals. You can render Confirm anywhere in the JSX tree.
- **Smooth Exit Animation**: Built-in 300ms opening and closing animations (**Exit Animation 300ms**) for both the dialog box and the blurred backdrop.
- **Pure Compound Architecture**: Clean separation between the Container layer (`<ConfirmContainer>`) and the UI presentation layers (`<Confirm>`, `<ConfirmHeader>`, `<ConfirmBody>`, `<ConfirmFooter>`, `<ConfirmClose>`).
- **Automatic Context Binding**: The close button `(X)` in `<ConfirmHeader>` and the `<ConfirmClose>` component automatically trigger dismissal with exit animation without repeatedly passing `open/onClose` states.
- **Safe Loading Support (`isLoading`)**: Automatically locks the modal (blocks backdrop clicks, intercepts ESC key, disables the close `(X)` button, Cancel button, and `<ConfirmClose>` wrapper) while API calls or data operations are in progress.
- **Full Accessibility Support (A11y)**: Automatic body scroll locking (`body scroll lock`), ESC key capture, native browser focus trapping, and connected `aria-labelledby` and `aria-describedby`.

---

## 🚀 Installation & Import

```tsx
import {
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
  ConfirmClose,
  useConfirmContext,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage (Pure Compound Pattern)

```tsx
import { useState } from "react";
import {
  Button,
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
} from "@openway/ui";

export function BasicConfirmExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button color="error" onClick={() => setOpen(true)}>
        Delete this item
      </Button>

      <ConfirmContainer open={open} size="md" color="error" onClose={() => setOpen(false)}>
        <Confirm>
          <ConfirmHeader title="Confirm deletion?" />
          <ConfirmBody>
            This action cannot be undone. Are you sure you want to delete?
          </ConfirmBody>
          <ConfirmFooter
            confirmText="Delete permanently"
            cancelText="Cancel"
            onConfirm={() => {
              console.log("Deleted!");
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </Confirm>
      </ConfirmContainer>
    </div>
  );
}
```

---

### 2. Async Handling & Safe Lockout (`isLoading`)

When handling asynchronous logic (API calls) in `onConfirm`, you can either pass an async function to `onConfirm` on `<ConfirmFooter>` or control the `isLoading={loading}` prop on `<ConfirmContainer>`:

```tsx
import { useState } from "react";
import {
  Button,
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
} from "@openway/ui";

export function AsyncConfirmExample() {
  const [open, setOpen] = useState(false);

  const handleConfirmAction = async () => {
    // Automatically activates Spinner and locks interactions while the API executes
    await apiDeleteResource();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Delete account</Button>

      <ConfirmContainer open={open} color="error" onClose={() => setOpen(false)}>
        <Confirm>
          <ConfirmHeader title="Confirm account deletion" />
          <ConfirmBody>
            This process may take a few seconds to finish cleaning up data.
          </ConfirmBody>
          <ConfirmFooter
            confirmText="Delete account"
            onConfirm={handleConfirmAction}
            onCancel={() => setOpen(false)}
          />
        </Confirm>
      </ConfirmContainer>
    </div>
  );
}
```

When loading:
- Pressing `ESC` is **blocked**.
- Clicking outside on the backdrop overlay is **blocked**.
- The close button `(X)` and `Cancel` button are automatically **disabled (`disabled`)**.
- The `Confirm` button displays a loading spinner.

---

### 3. Flexible Compound Components Customization

You can freely customize the interface inside Confirm using subcomponents:

```tsx
import {
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
  ConfirmClose,
  Button,
} from "@openway/ui";

export function CompoundConfirmExample({ open, onClose }) {
  return (
    <ConfirmContainer open={open} size="lg" color="warning" onClose={onClose}>
      <Confirm>
        <ConfirmHeader title="System Update Warning" showCloseButton />
        <ConfirmBody>
          <div className="space-y-3">
            <p className="text-sm text-neutral-600">
              Some services may be temporarily interrupted for a few minutes during maintenance.
            </p>
            <div className="p-3 bg-warning-50 border border-warning-200 rounded-md text-xs text-warning-800">
              ⚠️ Please save your current work before proceeding.
            </div>
          </div>
        </ConfirmBody>
        <ConfirmFooter>
          {/* ConfirmClose automatically dismisses with Exit Animation */}
          <ConfirmClose>
            <Button variant="outline">Later</Button>
          </ConfirmClose>
          <Button color="warning" onClick={() => proceedUpdate()}>
            Start update
          </Button>
        </ConfirmFooter>
      </Confirm>
    </ConfirmContainer>
  );
}
```

---

### 4. Programmatic Dismissal via Hook (`useConfirmContext`)

```tsx
import { useConfirmContext, Button } from "@openway/ui";

function CustomChildAction() {
  const { onClose, isLoading } = useConfirmContext();

  return (
    <Button onClick={onClose} disabled={isLoading}>
      Close dialog
    </Button>
  );
}
```

---

### 5. Customizing Size (`size`), Color Theme (`color`), & Border Radius (`radius`)

Confirm supports 5 widths and 7 color themes:

| Size (`size`) | Max Width (`max-w`) |
| :--- | :--- |
| `xs` | `320px` |
| `sm` | `380px` |
| `md` *(default)* | `440px` |
| `lg` | `520px` |
| `xl` | `600px` |

Color themes (`color`):
- `primary`, `secondary`, `neutral`, `error`, `success`, `warning` *(default)*, `info`.

Prop precedence:
> **`Props passed directly to child component`** > **`Size / color props from ConfirmContainer via Context`** > **`Default ("md" / "warning")`**.

---

## 📚 API Reference

### `<ConfirmContainer>`

Wrapper layer managing Overlay Backdrop, Native Dialog, Exit Animation, and ESC key handling.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Controls open/closed display state of the Confirm |
| `onClose` | `() => void` | `undefined` | Callback invoked when Confirm closes (backdrop click, ESC press, close X button click) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Overall size of Confirm (passed down context to sync sizing for Confirm, Header, Body, Footer) |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'warning'` | Overall color theme (passed down context to sync for Confirm, Header, Footer) |
| `isLoading` | `boolean` | `false` | Loading/processing state. When `true`, prevents closing and disables close actions |
| `closeOnOverlayClick` | `boolean` | `true` | Allows closing Confirm by clicking on the outside backdrop (blocked when `isLoading = true`) |
| `closeOnEsc` | `boolean` | `true` | Allows closing Confirm by pressing the `ESC` key (blocked when `isLoading = true`) |
| `lockScroll` | `boolean` | `true` | Automatically locks body scroll (`body overflow: hidden`) when Confirm opens |
| `overlayClassName` | `string` | `""` | Custom CSS class for the full-screen blurred backdrop overlay |
| `className` | `string` | `""` | CSS class for the dialog container |
| `children` | `ReactNode` | — | Content inside the container (typically `<Confirm>`) |

---

### `<Confirm>`

Dialog box layout container (Pure Compound Dialog Box).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Inherited from ConfirmContainer* | Width size of the dialog box |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'rounded-lg'` | Border radius |
| `className` | `string` | `""` | Custom CSS class for the dialog box |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Forwarded ref to the dialog div element |
| `children` | `ReactNode` | — | Child subcomponents (`<ConfirmHeader>`, `<ConfirmBody>`, `<ConfirmFooter>`) |

---

### `<ConfirmHeader>`

Header section of the Confirm dialog (displays icon badge, title, and close X button).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | `undefined` | Main title of the Confirm dialog |
| `icon` | `ReactNode \| boolean` | `true` | Icon displayed beside title (`true` matches theme color, `false` hides it) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Inherited from Context* | Size applied to title, icon, and padding |
| `color` | `'primary' \| 'secondary' \| ...` | *Inherited from Context* | Color theme for the icon badge |
| `showCloseButton` | `boolean` | `false` | Displays close button `(X)` on top right (automatically `disabled` when `isLoading = true`) |
| `onClose` | `() => void` | `undefined` | Callback on clicking `(X)` button (triggers Exit Animation of ConfirmContainer) |
| `iconClassName` | `string` | `""` | Custom CSS class for the icon badge container |
| `titleClassName` | `string` | `""` | Custom CSS class for the title text |
| `closeButtonClassName`| `string` | `""` | Custom CSS class for the close `(X)` button |
| `className` | `string` | `""` | CSS class for the header container |
| `children` | `ReactNode` | `undefined` | Custom content inside header |

---

### `<ConfirmBody>`

Body section containing description text or custom content.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `description` | `ReactNode` | `undefined` | Short description text (automatically wrapped in `<p>` with standard typography) |
| `descriptionClassName` | `string` | `""` | Custom CSS class for the description `<p>` element |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Inherited from Context* | Size applied to font size and padding |
| `className` | `string` | `""` | CSS class for the body container |
| `children` | `ReactNode` | `undefined` | Custom content inside body |

---

### `<ConfirmFooter>`

Footer section containing confirmation and cancellation action buttons.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `confirmText` | `ReactNode` | `'Confirm'` | Confirm button label |
| `cancelText` | `ReactNode \| false` | `'Cancel'` | Cancel button label (`false` to hide Cancel button) |
| `confirmVariant` | `ButtonVariant` | `'filled'` | Visual variant of Confirm button |
| `cancelVariant` | `ButtonVariant` | `'outline'` | Visual variant of Cancel button |
| `confirmColor` | `ButtonColor` | *Inherited from `color`* | Confirm button color |
| `cancelColor` | `ButtonColor` | `'secondary'` | Cancel button color |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Inherited from Context* | Size applied to buttons and padding |
| `onConfirm` | `() => void \| Promise<unknown>` | `undefined` | Callback when clicking Confirm (supports async function with automatic loading spinner) |
| `onCancel` | `() => void` | `undefined` | Callback when clicking Cancel |
| `onClose` | `() => void` | `undefined` | Callback on close |
| `confirmButtonProps` | `Partial<ButtonProps>` | `undefined` | Additional props passed directly to Confirm Button |
| `cancelButtonProps` | `Partial<ButtonProps>` | `undefined` | Additional props passed directly to Cancel Button |
| `className` | `string` | `""` | CSS class for footer container |
| `children` | `ReactNode` | `undefined` | Custom action buttons when defining custom footer |

---

### `<ConfirmClose>`

Wrapper around any button or element inside Confirm. When clicked, `<ConfirmClose>` automatically triggers smooth exit animation before unmounting (automatically `disabled` when `isLoading = true`).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Button or child element triggering the close action |
| `asChild` | `boolean` | `true` | Passes `onClick` and `disabled` directly to child element instead of wrapping with a `div` |
