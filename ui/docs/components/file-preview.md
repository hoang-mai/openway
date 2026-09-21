# 📁 File Preview Components (`@openway/ui`)

A high-performance file preview component suite built on top of the **HTML5 Native `<dialog>`** element and a **React Context + Compound Component** architecture:

- **`<FileContainer>`**: Modal dialog wrapper handling the Backdrop, Top-layer breakout, ESC key dismiss, Scroll locking, and Header. Accepts a `file` prop and provides `file` and `headerTitle` downstream via `FileContext`.
- **`<FilePreview>`**: Component that detects file types (`image`, `pdf`, `video`, `audio`, `document`, `other`) and delegates rendering to the appropriate viewer. Automatically consumes `file` and `headerTitle` from `useFileContext()`.
- **`<ImagePreview>`**: Rich image viewer featuring Zoom, Rotate, Flip, Drag-to-pan, Reset, and Download capabilities.

---

## 🌟 Highlights

- **Zero Global Store**: Completely independent of Zustand or Redux.
- **Context-driven Compound Architecture**:
  - `FileContainer` accepts `file` (and optional `title`) and provides them via `FileContext`.
  - `FilePreview` automatically consumes `file` and `headerTitle` from `useFileContext()`.
- **Flexible Nesting**:
  ```tsx
  <FileContainer open={open} onClose={handleClose} file={selectedFile}>
    <FilePreview imageProps={{ minZoom: 0.5, maxZoom: 3 }} />
  </FileContainer>
  ```
- **Automatic Memory Management**: Automatically revokes Object URLs (`URL.revokeObjectURL`) when handling `File` objects to prevent memory leaks.

---

## 🚀 Installation & Import

```tsx
import {
  FileContainer,
  FilePreview,
  ImagePreview,
  ImagePreviewToolbar,
  FileContext,
  useFileContext,
  getFileName,
  getFileType,
  getFileExtension,
  normalizePreviewFile,
  downloadFile,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Context-Driven Composition (Recommended)

```tsx
import { useState } from "react";
import { Button, FileContainer, FilePreview } from "@openway/ui";

export function Example() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>View file</Button>

      <FileContainer
        open={open}
        onClose={() => setOpen(false)}
        file={file}
      >
        <FilePreview
          imageProps={{
            minZoom: 0.5,
            maxZoom: 4,
            toolbarProps: {
              tools: { rotate: true, flip: true, download: true },
            },
          }}
        />
      </FileContainer>
    </div>
  );
}
```

---

### 2. Concise Usage (Automatic `<FilePreview />` rendering)

```tsx
<FileContainer
  open={open}
  onClose={() => setOpen(false)}
  file={selectedFile}
/>
```

---

### 3. Direct `<ImagePreview>` Usage

```tsx
<FileContainer open={open} onClose={() => setOpen(false)} title="View image">
  <ImagePreview src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675" name="artwork.jpg" />
</FileContainer>
```

---

## 📚 API Reference

### `<FileContainer>` (Modal Dialog)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Visibility state of the FileContainer dialog |
| `onClose` | `() => void` | `undefined` | Callback invoked when closing the dialog |
| `file` | `File \| ServerFile` | `undefined` | File data shared downstream via Context |
| `title` | `ReactNode` | `undefined` | Custom title for the header (defaults to the file name) |
| `description` | `ReactNode` | `undefined` | Subtitle description displayed beneath the header title |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Width size preset of the modal dialog |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'xl'` | Border radius of the modal dialog |
| `showCloseButton` | `boolean` | `true` | Displays close button (X) in the header |
| `closeOnOverlayClick` | `boolean` | `true` | Allows closing when clicking on the backdrop overlay |
| `closeOnEsc` | `boolean` | `true` | Allows closing when pressing the ESC key |
| `lockScroll` | `boolean` | `true` | Locks body scrolling while dialog is active |
| `className` | `string` | `""` | Custom CSS class for the dialog container |
| `overlayClassName`| `string` | `""` | Custom CSS class for the backdrop overlay |
| `children` | `ReactNode` | `undefined` | Inner content (defaults to rendering `<FilePreview />` automatically) |

---

### `<FilePreview>` (File Type Detection & Viewer Delegation)

> **Note**: `<FilePreview>` automatically consumes `file` and `headerTitle` from `FileContainer` via `useFileContext()`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onDownload` | `(file: PreviewFile) => void` | `undefined` | Custom callback when the download button is clicked |
| `imageProps` | `Partial<ImagePreviewProps>` | `undefined` | Configuration passed down to image preview (`minZoom`, `maxZoom`, `toolbarProps`, ...) |
| `className` | `string` | `""` | Custom CSS class for the content container |

---

### `<ImagePreview>` (Image Viewer & Interaction)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | **Required** | Image URL or data URL |
| `name` | `string` | `undefined` | File name used when downloading the image |
| `alt` | `string` | `undefined` | Alt description attribute for the image |
| `minZoom` | `number` | `0.2` | Minimum zoom level (20%) |
| `maxZoom` | `number` | `5` | Maximum zoom level (500%) |
| `showToolbar` | `boolean` | `true` | Displays the control toolbar at the bottom |
| `toolbarProps` | `Partial<ImagePreviewToolbarProps>` | `undefined` | Configuration for toolbar actions and tools (`tools`) |
| `className` | `string` | `""` | Custom CSS class for the outer wrapper |
| `children` | `ReactNode` | `undefined` | Supplementary React children |

### `<ImagePreviewToolbar>` (Image Viewer Controls)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `zoom` | `number` | `1` | Current zoom factor |
| `minZoom` | `number` | `0.2` | Minimum allowed zoom level |
| `maxZoom` | `number` | `5` | Maximum allowed zoom level |
| `step` | `number` | `0.05` | Zoom step increment when using the slider |
| `onZoomChange` | `(zoom: number) => void` | `undefined` | Callback invoked when zoom changes via the slider |
| `sliderProps` | `Partial<SliderProps>` | `undefined` | Custom props for the embedded Slider component |
| `tools` | `ToolbarToolsConfig` | `{}` | Toggle flags for individual toolbar buttons and tools |

---

### `ToolbarToolsConfig` (Toolbar Action Flags)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `zoomIn` | `boolean` | `true` | Zoom in button (+) |
| `zoomOut` | `boolean` | `true` | Zoom out button (-) |
| `zoomSlider` | `boolean` | `true` | Interactive zoom adjustment slider |
| `reset` | `boolean` | `true` | Zoom percentage indicator and reset button (1:1) |
| `rotate` | `boolean` | `true` | Clockwise and counterclockwise rotation buttons |
| `flip` | `boolean` | `true` | Horizontal flip toggle button |
| `download` | `boolean` | `true` | Download image button |
