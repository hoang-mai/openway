# 🖼️ UploadImage Component (`@openway/ui`)

A professional image upload component supporting `drag-and-drop`, instant `preview`, intuitive cropping, list or thumbnail card grid views (`picture wall`), with strict adherence to **Design System** and **Accessibility** standards.

---

## 🌟 Features

- **3 View Modes (`viewMode`)**:
  - `dropzone` *(default)*: Large drag-and-drop area with icon, title, and descriptive prompt.
  - `card-grid`: Thumbnail card grid (picture wall) where the upload trigger appears as an integrated grid tile.
  - `button`: Compact button trigger that initiates the image picker dialog.
- **Flexible Cropping Integration (`enableCrop`)**:
  - Intuitive cropping modal powered by `react-easy-crop` with customizable aspect ratios (`cropAspectRatio`).
  - Supports rotation, zoom, and post-crop image quality control.
- **Convenient Image Preview (`enablePreview`)**:
  - Integrated full-screen lightbox modal displaying high-res image previews, file sizes, and file names.
- **File Size & Format Validation**:
  - Configurable maximum (`maxSize`) and minimum (`minSize`) file limits.
  - Maximum file count limit (`maxFiles`).
  - Customizable accepted MIME types (`accept`, e.g., `image/jpeg`, `image/png`, `image/webp`).
- **Visual Error Feedback & Upload States**:
  - Automated error notifications when file size or MIME type restrictions are violated.
  - Visual upload progress indicator (`progress`) and lively hover effects.

---

## 🚀 Installation & Import

```tsx
import { UploadImage } from "@openway/ui";
import type { UploadImageProps, UploadImageFileItem } from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Dropzone UploadImage

```tsx
import { useState } from "react";
import { UploadImage, UploadImageFileItem } from "@openway/ui";

export function BasicUploadImageExample() {
  const [files, setFiles] = useState<UploadImageFileItem[]>([]);

  return (
    <div className="max-w-md">
      <UploadImage
        label="Article Featured Image"
        value={files}
        onChange={(newFiles) => setFiles(newFiles)}
        maxFiles={1}
        maxSize={5 * 1024 * 1024} // 5MB
        helperText="PNG, JPG, WEBP formats up to 5MB"
      />
    </div>
  );
}
```

---

### 2. Card Grid (Picture Wall - `card-grid`)

Ideal for product image galleries or portfolio albums:

```tsx
import { useState } from "react";
import { UploadImage, UploadImageFileItem } from "@openway/ui";

export function PictureWallExample() {
  const [gallery, setGallery] = useState<UploadImageFileItem[]>([]);

  return (
    <div className="max-w-xl">
      <UploadImage
        viewMode="card-grid"
        shape="square"
        maxFiles={8}
        value={gallery}
        onChange={(newFiles) => setGallery(newFiles)}
        label="Product Photo Gallery"
        enablePreview
      />
    </div>
  );
}
```

---

### 3. Enabling Image Cropping (`enableCrop`)

```tsx
<UploadImage
  label="Upload Cover Image (16:9 Aspect Ratio)"
  maxFiles={1}
  enableCrop
  cropAspectRatio={16 / 9}
  value={files}
  onChange={setFiles}
/>
```

---

## 🎛️ Detailed Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `UploadImageFileItem[]` | `[]` | Current list of image file items. |
| `onChange` | `(files: UploadImageFileItem[]) => void` | `undefined` | Callback invoked when image list changes (add, remove, crop). |
| `viewMode` | `"dropzone" \| "card-grid" \| "button"` | `"dropzone"` | Visual layout mode for image uploading. |
| `shape` | `"rectangle" \| "square"` | `"rectangle"` | Geometry of image display containers. |
| `maxFiles` | `number` | `1` | Maximum number of images allowed to upload. |
| `maxSize` | `number` | `10 * 1024 * 1024` | Maximum allowable file size per image (in bytes). |
| `accept` | `Record<string, string[]>` | Standard image types | Object defining allowed MIME types and extensions. |
| `enableCrop` | `boolean` | `false` | Displays image crop dialog prior to appending to list. |
| `cropAspectRatio` | `number` | `1` | Aspect ratio for cropping (e.g., `1` for square, `16/9` for banners). |
| `enablePreview` | `boolean` | `true` | Allows clicking images to open high-res preview modal. |
| `disabled` | `boolean` | `false` | Disables image upload interactions. |
| `color` | `ThemeColor` | `"primary"` | Theme color per Design System. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size scale of the upload area. |
| `radius` | `Radius` | `"md"` | Border radius of the upload frame and thumbnails. |
