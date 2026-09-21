# 👤 Upload Avatar Component Suite (`@openway/ui`)

A comprehensive, flexible, and highly interactive **UploadAvatar** component that empowers users to upload, drag-and-drop, crop, preview in a lightbox, and manage avatar images. Seamlessly integrated with the `@openway/ui` **Design System**, supporting **Safe Config Fallback**, **Automated Lifecycle Memory Cleanup**, and strict **WAI-ARIA Accessibility** compliance.

---

## 🌟 Features

- **All-in-One Image Workflow**:
  - 📁 **Drag-and-Drop & File Selection**: Intuitive drag-and-drop powered by `react-dropzone`, automatically verifying MIME types (`accept`) and file size limits (`maxSize`).
  - ✂️ **Built-in Image Cropping (`UploadAvatarCropModal`)**: Integrated modal supporting Zoom, 90° Rotation, Flip, Reset, and choosing alternate files directly inside the modal.
  - 🔍 **Full-screen Lightbox Preview**: Integrated with `<FileContainer>` and `<FilePreview>` for zooming, rotating, and downloading the original high-resolution file.
  - ⚡ **Quick Removal & Action Menu**: Smooth action menu appearing on hover/focus allowing users to Preview, Re-crop, and Remove the avatar.
- **Optimized Memory Management (Zero Memory Leaks)**:
  - Implements **Lifecycle Cleanup**: Automatically revokes Blob URLs (`URL.revokeObjectURL`) within `useEffect` cleanup functions when closing modals, replacing avatars, or unmounting components.
- **5 Standard Sizes (`size`)**:
  - `xs`: 48x48px (`size-12`)
  - `sm`: 64x64px (`size-16`)
  - `md`: 80x80px (`size-20` – *default*)
  - `lg`: 96x96px (`size-24`)
  - `xl`: 128x128px (`size-32`)
- **3 Visual Variants (`variant`)**:
  - `outline` *(default)*: Crisp border around the avatar frame, adapting border colors on hover and focus.
  - `filled`: Soft pastel background (`bg-{color}-50/60`) with matching border.
  - `ghost`: Transparent background with minimal subtle border.
  - `other`: Bypasses default styles for complete custom styling via `avatarClassName`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **2 Flexible Shapes (`shape`)**:
  - `circle` *(default)*: Perfectly circular avatar (`rounded-full`).
  - `square`: Square avatar with customizable corner radius `radius` (`none`, `sm`, `md`, `lg`, `xl`, `full`).
- **Refined Default Avatar Icon**: Uses a crisp `<AvatarIcon />` silhouette placeholder instead of generic upload cloud icons.
- **Unified Form & A11y Configuration (Consistent with `Input`)**:
  - Consolidates boolean flags into the `config` prop: `isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`.
  - Supports `labelPlacement` (`top` or `left`), `helperText`, and `errorMessage`.
  - Keyboard accessible: <kbd>Space</kbd> / <kbd>Enter</kbd> to pick files, <kbd>Delete</kbd> / <kbd>Backspace</kbd> to remove avatar.
  - Screen reader friendly with `aria-live` status announcement regions.

---

## 🚀 Installation & Import

```tsx
import {
  UploadAvatar,
  UploadAvatarCropModal,
  UploadAvatarCropContent,
  getCroppedImage,
  createImage,
  rotateSize,
} from "@openway/ui";

import type {
  UploadAvatarProps,
  UploadAvatarConfig,
  UploadAvatarCropOptions,
  UploadAvatarCropModalProps,
  UploadAvatarCropContentProps,
  UploadAvatarSize,
  UploadAvatarVariant,
  UploadAvatarColor,
  UploadAvatarShape,
  UploadAvatarRadius,
  UploadAvatarLabelPlacement,
  PreviewFile,
  ServerFile,
  PixelCrop,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage (Uncontrolled & Controlled)

#### Method 1: Self-managed (Uncontrolled with `defaultValue`)
```tsx
import { UploadAvatar } from "@openway/ui";

export function UncontrolledExample() {
  return (
    <UploadAvatar
      defaultValue="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
      label="Avatar"
      helperText="Supports JPG, PNG, WEBP under 5MB"
      onChange={(item) => console.log("Avatar changed:", item)}
    />
  );
}
```

#### Method 2: State-managed (Controlled with `value`)
```tsx
import { useState } from "react";
import { UploadAvatar, PreviewFile } from "@openway/ui";

export function ControlledExample() {
  const [avatar, setAvatar] = useState<PreviewFile | string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <UploadAvatar
        value={avatar}
        onChange={setAvatar}
        label="Profile Avatar"
        helperText="Click to upload and crop image"
      />
      <p className="text-xs text-neutral-500">
        Selected: {avatar ? (typeof avatar === "string" ? avatar : avatar.name) : "No image selected"}
      </p>
    </div>
  );
}
```

---

### 2. Customizing Image Cropping (`crop`)

Configure detailed cropping modal behavior or disable it entirely:

```tsx
import { UploadAvatar } from "@openway/ui";

// 1. Customize crop modal
<UploadAvatar
  crop={{
    aspectRatio: 1, // 1:1 Aspect ratio
    cropShape: "round", // Round "round" or rectangular "rect" crop mask
    showGrid: true, // Show 3x3 alignment grid
    minZoom: 1,
    maxZoom: 5,
    modalTitle: "Adjust Profile Avatar",
  }}
/>

// 2. Disable crop modal completely (direct upload upon selection)
<UploadAvatar crop={false} />
```

---

### 3. Sizes (`size`) & Shapes (`shape`)

```tsx
import { UploadAvatar } from "@openway/ui";

export function SizesAndShapesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Standard sizes */}
      <UploadAvatar size="xs" label="XS (48px)" />
      <UploadAvatar size="sm" label="SM (64px)" />
      <UploadAvatar size="md" label="MD (80px)" />
      <UploadAvatar size="lg" label="LG (96px)" />
      <UploadAvatar size="xl" label="XL (128px)" />

      {/* Rounded square */}
      <UploadAvatar
        shape="square"
        radius="lg"
        size="lg"
        crop={{ cropShape: "rect" }}
        label="Company Logo"
      />
    </div>
  );
}
```

---

### 4. Variants (`variant`) & Colors (`color`)

```tsx
import { UploadAvatar } from "@openway/ui";

export function VariantsAndColorsExample() {
  return (
    <div className="flex gap-6">
      <UploadAvatar variant="outline" color="primary" label="Outline Primary" />
      <UploadAvatar variant="filled" color="secondary" label="Filled Secondary" />
      <UploadAvatar variant="ghost" color="neutral" label="Ghost Neutral" />
      <UploadAvatar config={{ isInvalid: true }} errorMessage="Invalid avatar image" />
    </div>
  );
}
```

---

### 5. Integration with React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";
import { UploadAvatar, Button } from "@openway/ui";

interface ProfileFormData {
  avatar: File | null;
}

export function ProfileForm() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: { avatar: null },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted with file:", data.avatar);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
      <Controller
        name="avatar"
        control={control}
        rules={{ required: "Please upload your profile avatar" }}
        render={({ field: { value, onChange, ref } }) => (
          <UploadAvatar
            ref={ref}
            value={value}
            onChange={onChange}
            label="Profile Avatar"
            helperText="Maximum size 2MB"
            maxSize={2 * 1024 * 1024}
            config={{
              isRequired: true,
              isInvalid: Boolean(errors.avatar),
              isLoading: isSubmitting,
              showSpinner: isSubmitting,
            }}
            errorMessage={errors.avatar?.message}
          />
        )}
      />
      <Button type="submit" disabled={isSubmitting}>Save Changes</Button>
    </form>
  );
}
```

---

## 🛠 Props Reference

### `UploadAvatarProps`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `PreviewFile \| string \| null` | `undefined` | Current avatar value (Controlled mode). |
| `defaultValue` | `PreviewFile \| string \| null` | `null` | Initial avatar value (Uncontrolled mode). |
| `onChange` | `(item: PreviewFile \| null) => void` | `undefined` | Callback invoked when avatar changes or is cleared (`null`). |
| `onRemove` | `(item: PreviewFile) => void` | `undefined` | Callback invoked when the remove button is clicked. |
| `onPreview` | `(item: PreviewFile) => void` | `undefined` | Callback invoked when lightbox preview is opened. |
| `onClear` | `() => void` | `undefined` | Callback invoked when quick clear is executed. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar dimensions (48px, 64px, 80px, 96px, 128px). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Border and background styling variant. |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'primary'` | Theme color per Design System. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape of the avatar frame (`circle`: full circle; `square`: square). |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | Inherited from `size` | Corner radius override when `shape="square"`. |
| `crop` | `boolean \| UploadAvatarCropOptions` | `true` | Enables/disables or configures image crop modal before upload. |
| `maxSize` | `number` | `undefined` | Maximum allowed file size in bytes. |
| `accept` | `string \| Accept` | `"image/*"` | Allowed MIME types or file extensions. |
| `config` | `UploadAvatarConfig` | `{}` | Consolidated configuration object for boolean state flags (see table below). |
| `label` | `ReactNode` | `undefined` | Header label rendered for the avatar field. |
| `labelPlacement`| `'top' \| 'left'` | `'top'` | Position of the label relative to the avatar. |
| `helperText` | `ReactNode` | `undefined` | Helper text rendered beneath the avatar. |
| `errorMessage` | `ReactNode` | `undefined` | Error message displayed beneath avatar (triggers invalid error styling). |
| `disabled` | `boolean` | `false` | Disables all user interaction and upload abilities. |
| `readOnly` | `boolean` | `false` | Read-only mode; prevents uploading, modifying, or removing the image. |
| `icon` | `ReactNode` | `<AvatarIcon />` | Custom placeholder icon when no image is present. |
| `name` | `string` | `undefined` | Name attribute for HTML form submissions. |
| `id` | `string` | Auto-generated | Element ID for label binding and accessibility. |
| `ref` | `Ref<HTMLInputElement>` | `undefined` | Forwarded ref to the hidden `<input type="file">`. |
| `className` | `string` | `""` | Custom CSS class for the outermost container. |
| `wrapperClassName` | `string` | `""` | Alias for `className`. |
| `avatarClassName` | `string` | `""` | Custom CSS class applied directly to the avatar frame. |
| `labelClassName` | `string` | `""` | Custom CSS class for the `<label>` element. |
| `helperClassName` | `string` | `""` | Custom CSS class for helperText and errorMessage containers. |

---

### `UploadAvatarConfig`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isRequired` | `boolean` | `false` | Marks field as required (renders red `*` beside label). |
| `isInvalid` | `boolean` | `false` | Activates invalid error styling and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Sets loading state, locks interactions, and enables `aria-busy="true"`. |
| `showSpinner` | `boolean` | `false` | Renders a loading spinner overlay when `isLoading=true`. |
| `isClearable` | `boolean` | `false` | Displays quick clear button for removing avatar. |
| `isFullWidth` | `boolean` | `false` | Expands outer container to 100% of parent container width. |

---

### `UploadAvatarCropOptions`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `aspectRatio` | `number` | `1` | Aspect ratio for cropping (defaults to 1:1 for avatar). |
| `cropShape` | `'round' \| 'rect'` | `'round'` for circle, `'rect'` for square | Shape of crop mask overlay inside modal. |
| `showGrid` | `boolean` | `true` | Displays 3x3 alignment rule grid during cropping. |
| `minZoom` | `number` | `1` | Minimum zoom level. |
| `maxZoom` | `number` | `4` | Maximum zoom level. |
| `modalTitle` | `string` | `"Crop Avatar"` | Header title for the crop modal dialog. |

---

## ♿ Accessibility

- **WAI-ARIA & Keyboard Navigation**:
  - The avatar element is assigned `role="button"` and `tabIndex={0}`, navigatable via <kbd>Tab</kbd>.
  - Press <kbd>Space</kbd> or <kbd>Enter</kbd> to open file selection dialog.
  - When an image is present, pressing <kbd>Delete</kbd> or <kbd>Backspace</kbd> immediately clears the avatar.
- **Screen Reader Support**:
  - Integrated `aria-live="polite"` (`sr-only`) region announces status updates, upload completions, or deletions to assistive technologies.
  - Automatic association between label, helperText, errorMessage, and input via `aria-describedby` and `htmlFor`.
- **Disabled & Loading States**:
  - When `disabled={true}` or `isLoading={true}`, the component automatically asserts `aria-disabled="true"` and `aria-busy="true"`, preventing click and drag events.
