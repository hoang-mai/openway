# 📦 Modal Component (`@openway/ui`)

High-performance **Modal** component suite built on the **HTML5 Native `<dialog>`** element and designed using the flexible **Pure Compound Pattern**.

---

## 🌟 Highlights

- **Native Top Layer**: Built with the `<dialog>` element and the browser's native `dialog.showModal()` method. The modal is automatically rendered in the browser's top layer (`#top-layer`), preventing clipping issues caused by parent containers with `overflow: hidden`, `overflow: auto`, or `z-index` conflicts.
- **Zero Global Store**: Completely eliminates the need for Zustand / Redux / React Portal. You can render the Modal anywhere within your JSX tree.
- **Smooth Exit Animation**: Features built-in entry and exit transitions (**250ms Exit Animation**) for both the dialog window and the backdrop overlay.
- **Pure Compound Architecture**: Clean separation of concerns between the container layer (`<ModalContainer>`) and the presentation layers (`<Modal>`, `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`, `<ModalClose>`).
- **Automatic Context Linking**: The close button `(X)` in `<ModalHeader>` and the `<ModalClose>` component trigger modal dismissal with exit animations without manually passing down `open/onClose` state.
- **Safe Loading Support (`isLoading`)**: Automatically locks the modal against dismissal (disables backdrop clicks, suppresses the ESC key, and disables close buttons and `<ModalClose>` triggers) during asynchronous API calls and background operations.
- **Comprehensive Accessibility (a11y)**: Automatic body scroll locking (`body scroll lock`), `ESC` key listening, native browser focus trap, and integrated `aria-labelledby` and `aria-describedby` associations.

---

## 🚀 Installation & Import

```tsx
import {
  ModalContainer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  useModalContext,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage (Basic Modal)

```tsx
import { useState } from "react";
import {
  Button,
  ModalContainer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@openway/ui";

export function BasicModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <ModalContainer open={open} onClose={() => setOpen(false)}>
        <Modal size="md" radius="xl">
          <ModalHeader
            title="Confirm Update"
            description="Please review your information before proceeding."
          />
          <ModalBody>
            <p className="text-sm text-neutral-600">
              The system will save your changes to the database.
            </p>
          </ModalBody>
          <ModalFooter>
            <ModalClose>
              <Button variant="outline">Cancel</Button>
            </ModalClose>
            <ModalClose>
              <Button color="primary">Confirm</Button>
            </ModalClose>
          </ModalFooter>
        </Modal>
      </ModalContainer>
    </div>
  );
}
```

---

### 2. Complex Forms & Loading States (`isLoading`)

When submitting forms and invoking asynchronous APIs, pass the `isLoading={loading}` prop to `<ModalContainer>`. The system automatically:
- Prevents users from closing the modal via the `ESC` key or clicking on the backdrop overlay.
- Automatically disables the header close button `(X)` and elements wrapped inside `<ModalClose>`.

```tsx
export function CreateUserModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Call API to save data
      await apiCreateUser();
      onSuccess?.();
      // 2. Close modal upon completion
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer open={open} isLoading={loading} onClose={onClose}>
      <Modal size="lg">
        <ModalHeader
          title="Create New User"
          description="Enter details for the new member"
        />
        <form onSubmit={handleSubmit}>
          <ModalBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input required className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" required className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
          </ModalBody>
          <ModalFooter>
            {/* Automatically disabled when isLoading = true */}
            <ModalClose>
              <Button variant="outline" type="button">Cancel</Button>
            </ModalClose>
            <Button color="primary" type="submit" loading={loading}>
              Save Member
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </ModalContainer>
  );
}
```

---

### 3. Programmatic Dismissal via Hook (`useModalContext`)

If you need to execute asynchronous logic (e.g. validation, fetching) inside deeply nested children within the Modal:

```tsx
import { useModalContext, Button } from "@openway/ui";

function CustomAction() {
  const { onClose, isLoading } = useModalContext();

  const handleSaveAndClose = async () => {
    await saveApi();
    onClose?.(); // Triggers the 250ms exit animation of ModalContainer
  };

  return (
    <Button onClick={handleSaveAndClose} disabled={isLoading}>
      Save and Close
    </Button>
  );
}
```

---

### 4. Customizing Sizes (`size`) & Border Radius (`radius`)

Modal supports 6 width sizes and 6 border radius levels. You can pass `size` directly to `<ModalContainer size="lg">` to automatically synchronize the size across all child components (`Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`):

> **Size Precedence:** `Prop passed directly to child component` > `size prop from ModalContainer via Context` > `Default ("md")`.

```tsx
// Synchronizes the entire Modal, Header, Body, and Footer to "lg"
<ModalContainer open={open} size="lg" onClose={() => setOpen(false)}>
  <Modal radius="full">
    <ModalHeader title="Large Modal (LG)" />
    <ModalBody>...</ModalBody>
    <ModalFooter>...</ModalFooter>
  </Modal>
</ModalContainer>
```

| Size (`size`) | Width (`max-w`) | Intended Use |
| :--- | :--- | :--- |
| `xs` | `320px` | Short alerts, simple prompts |
| `sm` | `400px` | Confirmation dialogs, 1-2 input fields |
| `md` *(default)* | `540px` | Standard input forms |
| `lg` | `720px` | Multi-column forms, avatar cropping |
| `xl` | `960px` | Document viewing, data tables, sheets |
| `full` | `100vw` | Fullscreen modal experience |

---

## 📚 Props Reference (API Reference)

### `<ModalContainer>`

Wrapper layer managing the Overlay Backdrop, Native Dialog, exit animation, and ESC key handling.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Whether the modal is open or closed |
| `onClose` | `() => void` | `undefined` | Callback fired when the modal closes (backdrop click, ESC key, or close button) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Global size synchronized via Context to `Modal`, `ModalHeader`, `ModalBody`, and `ModalFooter` |
| `isLoading` | `boolean` | `false` | Loading/processing state. When `true`, prevents closing the modal (via backdrop click, ESC key, X button, or `<ModalClose>`) and automatically disables close buttons |
| `closeOnOverlayClick` | `boolean` | `true` | Allows closing the modal by clicking the backdrop overlay (blocked when `isLoading = true`) |
| `closeOnEsc` | `boolean` | `true` | Allows closing the modal by pressing the `ESC` key (blocked when `isLoading = true`) |
| `lockScroll` | `boolean` | `true` | Automatically locks body scroll (`body overflow: hidden`) when the modal is open |
| `overlayClassName` | `string` | `""` | Custom CSS class for the full-screen backdrop overlay |
| `className` | `string` | `""` | CSS class for the outer dialog container |
| `children` | `ReactNode` | — | Content inside the container (typically `<Modal>`) |

---

### `<Modal>`

The dialog box interface container.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Width size of the dialog box |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'rounded-lg'` | Border radius level of the dialog box |
| `className` | `string` | `""` | Custom CSS class for the dialog box |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref directly referencing the dialog div element |
| `children` | `ReactNode` | — | Child components (`<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`) |

---

### `<ModalHeader>`

Header section of the modal dialog.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | `undefined` | Primary title of the Modal |
| `description` | `ReactNode` | `undefined` | Subtitle or description text below the title |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Size applied to title and padding |
| `showCloseButton` | `boolean` | `true` | Whether to display the close `(X)` button at the top right (automatically disabled when `isLoading = true`) |
| `onClose` | `() => void` | `undefined` | Custom callback when clicking the `(X)` button (always executes alongside ModalContainer's exit animation) |
| `titleClassName` | `string` | `""` | Custom CSS class for the title text |
| `descriptionClassName`| `string` | `""` | Custom CSS class for the description text |
| `closeButtonClassName`| `string` | `""` | Custom CSS class for the close `(X)` button |
| `className` | `string` | `""` | CSS class for the entire header section |

---

### `<ModalBody>`

Body section containing the main modal content (automatically enables vertical scrolling when content overflows).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Padding size and font size (automatically inherited from ModalContainer) |
| `className` | `string` | `""` | Custom CSS class for the body section |
| `children` | `ReactNode` | — | Form content, tables, lists, etc. |

---

### `<ModalFooter>`

Footer section containing action buttons for confirmation or cancellation.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Padding size and gap spacing between action buttons |
| `className` | `string` | `""` | CSS class for the entire footer container |
| `children` | `ReactNode` | — | Buttons (`<Button>`, `<ModalClose>`) |

---

### `<ModalClose>`

Wrapper around any button or element inside the Modal (such as a Cancel button in the Footer). When clicked, `<ModalClose>` automatically triggers a smooth exit transition (**250ms Exit Animation**) prior to unmounting (automatically disabled when `isLoading = true`).

```tsx
<ModalFooter>
  {/* asChild=true (default) forwards the click event directly to Button without creating an extra div wrapper */}
  <ModalClose>
    <Button variant="outline">Cancel</Button>
  </ModalClose>
  <Button color="primary" onClick={handleSave}>Save changes</Button>
</ModalFooter>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Button or child element that triggers modal dismissal |
| `asChild` | `boolean` | `true` | Forwards the `onClick` handler and `disabled` prop directly to the child element instead of wrapping in an outer `div` |
