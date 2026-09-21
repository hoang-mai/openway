# 📭 Empty Component (`@openway/ui`)

The **Empty** state component is used when a list, data table, search query, or page has no data to display. Built to strict **Design System** specifications, it features diverse **Preset Illustrations**, support for custom **Images / Icons / URLs**, flexible **Vertical / Horizontal** layouts, integrated **Safe Config Fallback** (`getSafeConfig`), and full **WAI-ARIA Accessibility** compliance.

---

## 🌟 Highlights

- **5 Built-in Preset Illustrations**:
  - `default`: Standard empty data box illustration.
  - `search`: Magnifying glass indicating no search results found.
  - `error`: Failed data load or network disconnect.
  - `folder`: Empty folder illustration.
  - `simple`: Minimal, lightweight graphic.
- **Multiple Image Sources (`image`)**:
  - Preset names (`default`, `search`, `error`, `folder`, `simple`).
  - Image URLs (automatically rendered via `next/image` with image optimizations).
  - Custom JSX (`ReactNode`) such as SVG icons, emojis, or custom components.
- **3 Standard Sizes (`size`)**:
  - `sm`: Compact, ideal for dropdowns, popovers, select menus, and small tables.
  - `md` *(default)*: Standard, ideal for content sections, cards, and modal dialogs.
  - `lg`: Large, ideal for full-page dashboards or major viewports.
- **2 Display Layouts (`layout`)**:
  - `vertical` *(default)*: Vertical top-to-bottom layout (Image -> Title -> Description -> Actions).
  - `horizontal`: Horizontal side-by-side layout (Image on the left, text content & actions on the right), optimized for wide viewports.
- **Flexible Action Area (`actions`)**: Dedicated slot for call-to-action buttons (Create, Retry, Refresh...).
- **Safe Config Fallback**: Built-in `getSafeConfig` utility guarantees resilient operation, falling back gracefully without crashing when receiving invalid `size` or `layout` values.
- **Accessibility**: Automatically adds `role="status"` and `aria-live="polite"` so screen readers accurately announce empty states.

---

## 🚀 Installation & Import

```tsx
import { Empty, EmptyIllustration } from "@openway/ui";
import type { EmptyProps, EmptySize, EmptyLayout, EmptyPresetImage } from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Empty State

```tsx
import { Empty } from "@openway/ui";

export function BasicEmptyExample() {
  return (
    <Empty
      title="No Data Available"
      description="There are currently no items in this list."
    />
  );
}
```

---

### 2. Illustration Presets (`image`)

```tsx
import { Empty } from "@openway/ui";

export function PresetExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Search not found */}
      <Empty
        image="search"
        title="No Results Found"
        description="Please try again with a different search keyword."
      />

      {/* Network / load error */}
      <Empty
        image="error"
        title="Loading Failed"
        description="Unable to connect to the server. Please try again."
      />

      {/* Empty folder */}
      <Empty
        image="folder"
        title="Empty Folder"
        description="No files have been uploaded to this directory yet."
      />
    </div>
  );
}
```

---

### 3. Custom Size (`size`) & Action Buttons (`actions`)

```tsx
import { Empty, Button } from "@openway/ui";

export function ActionsExample() {
  return (
    <Empty
      size="md"
      image="default"
      title="No Projects Yet"
      description="Create your first project to start tracking your workflow effectively."
      actions={
        <Button variant="filled" color="primary" onClick={() => console.log("Create")}>
          Create New Project
        </Button>
      }
    />
  );
}
```

---

### 4. Horizontal Layout (`layout="horizontal"`)

```tsx
import { Empty, Button } from "@openway/ui";

export function HorizontalEmptyExample() {
  return (
    <div className="border rounded-xl p-4">
      <Empty
        layout="horizontal"
        size="sm"
        image="folder"
        title="File Not Found"
        description="The directory is currently empty or you do not have permission to view it."
        actions={
          <Button size="xs" variant="outline" color="primary">
            Upload File
          </Button>
        }
      />
    </div>
  );
}
```

---

### 5. External Image URL or Custom ReactNode

```tsx
import { Empty } from "@openway/ui";

export function CustomImageExample() {
  return (
    <Empty
      image="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=160&auto=format&fit=crop&q=60"
      imageSize={120}
      imageAlt="Custom Image"
      title="Empty Photo Gallery"
      description="Start adding your favorite photographs."
    />
  );
}
```

---

## 🛡️ Safe Config Fallback

The `Empty` component incorporates the `getSafeConfig` utility from `@/utils/function`:

```tsx
import { getSafeConfig } from "@/utils/function";

const currentSize = getSafeConfig(size, emptySizeConfig, "md");
const currentLayout = getSafeConfig(layout, emptyLayoutConfig, "vertical");
```

- If `size` is not one of `"sm" | "md" | "lg"`, the component automatically falls back to the standard `"md"` size.
- If `layout` is invalid, it safely falls back to the default `"vertical"` layout.
- Ensures application resilience and prevents runtime errors or UI crashes when untrusted inputs are provided.

---

## 📋 Props Reference (`EmptyProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Overall size of the component |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Vertical stacked or horizontal side-by-side layout |
| `image` | `EmptyPresetImage \| string \| ReactNode` | `'default'` | Preset illustration name, image URL, or custom JSX node |
| `imageSize` | `number \| string` | Based on `size` | Custom width & height for the image area |
| `imageClassName`| `string` | `""` | Additional CSS class for the image wrapper element |
| `imageAlt` | `string` | `'Empty'` | Alt text attribute for the image |
| `title` | `ReactNode` | `undefined` | Empty state title |
| `titleClassName`| `string` | `""` | Additional CSS class for the title |
| `description` | `ReactNode` | `'No data'` | Detailed description text |
| `descriptionClassName` | `string` | `""` | Additional CSS class for the description |
| `actions` | `ReactNode` | `undefined` | Action button / CTA area |
| `actionsClassName` | `string` | `""` | Additional CSS class for the actions container |
| `children` | `ReactNode` | `undefined` | Custom supplementary content |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Forwarded ref to the root container |
