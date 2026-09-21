# 💀 Skeleton & LoadingImage Component (`@openway/ui`)

Modern, high-performance **Skeleton** and **LoadingImage** component suite built to **Design System** standards. Provides smooth data loading placeholders to eliminate Cumulative Layout Shift (CLS), integrates **Safe Config Fallback** (`getSafeConfig`), and conforms to **WAI-ARIA Accessibility** standards.

---

## 🌟 Highlights

- **Skeleton Placeholder**:
  - **3 Animation Variants (`variant`)**:
    - `pulse` *(default)*: Smooth fading breathing animation.
    - `wave`: GPU-accelerated diagonal shimmer from top-left to bottom-right.
    - `none`: Static placeholder without animation.
  - **2 Shapes (`shape`)**:
    - `rectangle` *(default)*: Rectangular or square shape, paired with `radius`.
    - `circle`: Perfect circular shape (`rounded-full`), automatically ignores `radius`.
  - **6 Border Radius Levels (`radius`)**: `none`, `sm`, `md` *(default)*, `lg`, `xl`, `full`.
  - **Multi-line Mode (`lines`)**: Automatically stacks multiple text lines as paragraphs, with the final line narrowed to 60% width for a natural look.
  - **Flexible Dimensions (`width`, `height`, `gap`)**: Supports both numeric pixel values and CSS string units (`rem`, `%`, `vh`, etc.).

- **LoadingImage**:
  - **Next.js Image Integration**: Inherits full optimization from `next/image` (`fill`, `priority`, `sizes`, `quality`, etc.).
  - **Versatile Image Sources (`src`)**: Accepts URL strings/StaticImport, as well as direct **`File`** or **`Blob`** objects (automatically creates and revokes Object URLs safely without memory leaks).
  - **Automatic `unoptimized` Handling**: Automatically enables `unoptimized` for `File` / `Blob` sources to avoid resolution errors on Next.js Image Optimization server.
  - **Object Fit Options (`objectFit`)**: Supports 5 modes: `cover` *(default)*, `contain`, `fill`, `none`, and `scale-down`.
  - **Automatic State Reset**: Resets `isLoaded` and `hasError` when `src` changes.
  - **Fallback Error State**: Automatically displays a fallback placeholder icon if the image fails to load (`onError`).

- **Safe Config Fallback**: Integrates `getSafeConfig` to guarantee stability and prevent layout crashes on invalid `variant`, `radius`, or `objectFit` inputs.
- **Accessibility**: Built-in `role="status"` and `aria-label="Loading..."` attributes.

---

## 🚀 Installation & Import

```tsx
import { Skeleton, LoadingImage } from "@openway/ui";
import type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonShape,
  SkeletonRadius,
  SkeletonObjectFit,
  LoadingImageProps,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Skeleton

```tsx
import { Skeleton } from "@openway/ui";

export function BasicSkeletonExample() {
  return (
    <div className="space-y-4">
      {/* Single block */}
      <Skeleton width="100%" height="2rem" />

      {/* Circular avatar */}
      <Skeleton shape="circle" width={48} height={48} />

      {/* Shimmer wave effect */}
      <Skeleton variant="wave" width="200px" height="1.5rem" />
    </div>
  );
}
```

### 2. Multi-line Skeleton (Paragraph Text)

```tsx
<Skeleton lines={3} height="1rem" gap="0.75rem" />
```

### 3. LoadingImage with URL or File / Blob

```tsx
import { LoadingImage } from "@openway/ui";

export function ImageExamples({ file }: { file?: File }) {
  return (
    <div className="flex gap-4">
      {/* Load image via URL with lg border radius */}
      <LoadingImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
        alt="Mountain view"
        width={300}
        height={200}
        radius="lg"
        objectFit="cover"
      />

      {/* Load image directly from File object (Upload preview) */}
      {file && (
        <LoadingImage
          src={file}
          alt="Upload preview"
          width={150}
          height={150}
          radius="full"
          objectFit="contain"
        />
      )}
    </div>
  );
}
```

---

## ⚙️ Props API Reference

### `SkeletonProps`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animation effect variant for placeholder |
| `shape` | `'rectangle' \| 'circle'` | `'rectangle'` | Shape of the skeleton placeholder |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius (only applies when `shape === 'rectangle'`) |
| `width` | `string \| number` | — | Width (px or CSS string) |
| `height` | `string \| number` | `'1rem'` | Height (px or CSS string) |
| `lines` | `number` | `1` | Number of stacked lines (when > 1) |
| `gap` | `string \| number` | `'0.5rem'` | Spacing between lines when `lines > 1` |
| `className` | `string` | `""` | Additional Tailwind CSS classes |
| `ref` | `React.Ref<HTMLDivElement>` | — | Ref attached to root div element |

### `LoadingImageProps`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `ImageProps['src'] \| File \| Blob \| ServerFile` | — | Image source (URL, static import, File/Blob, or ServerFile) |
| `alt` | `string` | `""` | Alternative text for the image |
| `width` | `number` | — | Display width (if `fill` is not used) |
| `height` | `number` | — | Display height (if `fill` is not used) |
| `fill` | `boolean` | `false` | Stretches image to fill parent wrapper |
| `skeletonVariant` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Skeleton variant while loading |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius applied to both skeleton and image |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | CSS object-fit layout mode |
| `preview` | `boolean` | `true` | Enables modal preview modal on click (via FilePreview & FileContainer) |
| `wrapperClassName` | `string` | `""` | Custom CSS class for the wrapper div |
| `wrapperStyle` | `CSSProperties` | — | Inline style for the wrapper div |
| `onClick` | `(e) => void` | — | Click callback on image / wrapper |
| `onLoad` | `(e) => void` | — | Callback fired when image finishes loading |
| `onError` | `(e) => void` | — | Callback fired if image loading fails |
| `ref` | `React.Ref<HTMLDivElement>` | — | Ref attached to the wrapper div element |
