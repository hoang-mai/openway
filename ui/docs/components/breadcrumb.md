# 🧭 Breadcrumb Component (`@openway/ui`)

The **Breadcrumb** component suite (Hierarchical Navigation Bar) adheres to the **OpenWay Design System (Notion Warm Paper Aesthetics)**, supporting both the **Compound Components Pattern** and the **Data-driven `items` API**, seamlessly integrating with the **Next.js 16** `Link` component, smart auto-truncation **(Collapsible Ellipsis with Dropdown Menu)**, and strict compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Key Features

- **Next.js Link Integration**: The `<BreadcrumbLink>` component and `items` data array use `next/link` by default, fully supporting `href`, `replace`, `scroll`, `prefetch`, `target`, `rel`, and the `external` flag (automatically attaches an external link icon and `target="_blank"`).
- **Flexible Dual API**:
  - **Compound Components**: `<Breadcrumb>`, `<BreadcrumbList>`, `<BreadcrumbItem>`, `<BreadcrumbLink>`, `<BreadcrumbPage>`, `<BreadcrumbSeparator>`, `<BreadcrumbEllipsis>` provide deep customization for DOM structure and appearance.
  - **Data-driven (`items` prop)**: `<Breadcrumb items={[...]} />` allows quick rendering from route configuration arrays.
- **Smart Auto-collapsing (`maxItems`)**:
  - When the item count exceeds `maxItems`, intermediate pages are collapsed into an ellipsis `...` button (`BreadcrumbEllipsis`).
  - Supports 2 modes: `collapseMode="dropdown"` (opens a Dropdown menu containing hidden links) or `collapseMode="expand"` (expands all items on click).
- **Clear Distinction Between Item, Link, and Page**:
  - `<BreadcrumbItem>`: An `<li>` element wrapping a single path segment.
  - `<BreadcrumbLink>`: Interactive navigable link (Next.js navigation or button click).
  - `<BreadcrumbPage>`: Text element for the current page, marked with `aria-current="page"` and bold charcoal styling.
- **3 Standard Sizes (`size`)**: `sm` (12px), `md` (14px - *default*), `lg` (16px).
- **3 Visual Variants (`variant`)**:
  - `standard` *(default)*: Minimalist Notion standard, changing only text color and underline on hover (`hover:underline underline-offset-4`), without background color change.
  - `solid`: Warm soft pill background (`bg-neutral-100`).
  - `bordered`: Ultra-thin hairline border (`border border-neutral-200`).
- **7 Color Themes (`color`)**: `neutral` (*default - Notion Charcoal*), `primary`, `secondary`, `error`, `success`, `warning`, `info`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **Customizable Separator (`separator`)**: Defaults to `<ChevronRightIcon />`, easily customizable to `/`, `\`, `>`, or any custom SVG icon.
- **WAI-ARIA Accessibility**: `<nav aria-label="Breadcrumb">` wrapper, `<ol>`, `<li>`, `role="presentation" aria-hidden="true"` for separators, `aria-current="page"` for the current page.

---

## 🚀 Installation & Import

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  useBreadcrumbContext,
} from "@openway/ui";

import type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
  BreadcrumbItemData,
  BreadcrumbSize,
  BreadcrumbVariant,
  BreadcrumbColor,
  BreadcrumbRadius,
  BreadcrumbUnderline,
  BreadcrumbCollapseMode,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Compound Components Pattern (Basic)

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@openway/ui";

export function BasicCompoundBreadcrumb() {
  return (
    <Breadcrumb ariaLabel="Breadcrumb navigation">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

---

### 2. Data-driven Pattern (`items` prop)

When breadcrumb data comes from a dynamic route or menu list:

```tsx
import { Breadcrumb } from "@openway/ui";

export function DataDrivenBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Human Resources", href: "/projects/hr" },
        { label: "September Payroll" }, // Automatically treated as current page
      ]}
    />
  );
}
```

---

### 3. Smart Auto-collapsing (`maxItems` & `collapseMode`)

#### a) Open Dropdown Menu for Hidden Pages (`collapseMode="dropdown"`)

```tsx
<Breadcrumb
  maxItems={3}
  itemsBeforeCollapse={1}
  itemsAfterCollapse={1}
  collapseMode="dropdown"
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Smartphones", href: "/products/phones" },
    { label: "iPhone 16 Pro Max" },
  ]}
/>
```

#### b) Expand All Items on Click (`collapseMode="expand"`)

```tsx
<Breadcrumb
  maxItems={3}
  collapseMode="expand"
  items={[
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Engineering", href: "/docs/engineering" },
    { label: "Frontend", href: "/docs/engineering/frontend" },
    { label: "OpenWay UI Guidelines" },
  ]}
/>
```

---

### 4. Sizes (`size`)

Supports 3 sizes: `sm` (12px), `md` (14px - default), `lg` (16px).

```tsx
<Breadcrumb size="sm" items={sampleItems} />
<Breadcrumb size="md" items={sampleItems} />
<Breadcrumb size="lg" items={sampleItems} />
```

---

### 5. Visual Variants (`variant`)

- `standard`: Minimalist Notion Warm Paper style with sleek links.
- `solid`: Warm soft pill blocks, ideal for toolbars and headers.
- `bordered`: Clean border lines with `1px border-neutral-200`.

```tsx
<Breadcrumb variant="standard" items={sampleItems} />
<Breadcrumb variant="solid" items={sampleItems} />
<Breadcrumb variant="bordered" items={sampleItems} />
```

---

### 6. Custom Separators (`separator`)

Supports any string character or custom SVG icon:

```tsx
// Slash separator
<Breadcrumb separator="/" items={sampleItems} />

// Greater-than separator
<Breadcrumb separator=">" items={sampleItems} />

// Custom icon separator
<Breadcrumb separator={<CustomDividerIcon className="size-3 text-neutral-400" />} items={sampleItems} />
```

---

### 7. Icons & Badges Integration

```tsx
import { Breadcrumb, Badge, HomeIcon } from "@openway/ui";

<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: <HomeIcon /> },
    { label: "Notifications", href: "/notifications", badge: <Badge size="xs" color="error">3</Badge> },
    { label: "Notification Details" },
  ]}
/>
```

---

### 8. External Links (`external`)

When passing `external: true`, the component automatically adds `target="_blank"`, `rel="noopener noreferrer"`, and an external link icon:

```tsx
<BreadcrumbLink href="https://notion.so" external>
  Notion Docs
</BreadcrumbLink>
```

---

## 📊 API Reference

### `<Breadcrumb>` (Container)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `BreadcrumbItemData[]` | — | Item data array (Data-driven mode) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Display size |
| `variant` | `'standard' \| 'solid' \| 'bordered' \| 'other'` | `'standard'` | Visual styling variant |
| `color` | `'neutral' \| 'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'neutral'` | Color theme |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius of items |
| `underline` | `'none' \| 'hover' \| 'always'` | `'hover'` | Link underline style |
| `separator` | `ReactNode` | `<ChevronRightIcon />` | Separator symbol or icon |
| `maxItems` | `number` | — | Maximum number of items before collapsing |
| `itemsBeforeCollapse`| `number` | `1` | Number of items retained before the `...` ellipsis |
| `itemsAfterCollapse` | `number` | `1` | Number of items retained after the `...` ellipsis |
| `collapseMode` | `'dropdown' \| 'expand' \| 'none'` | `'dropdown'` | Behavior when clicking the collapse button |
| `disabled` | `boolean` | `false` | Disables all links |
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessibility label for the `<nav>` element |

### `BreadcrumbItemData` (Item in `items` Array)

| Property | Type | Description |
| :--- | :--- | :--- |
| `label` | `ReactNode` | Display label (**Required**) |
| `href` | `string` | Navigation URL for Next.js |
| `icon` | `ReactNode` | Icon displayed before the label |
| `endIcon` | `ReactNode` | Icon displayed after the label |
| `badge` | `ReactNode` | Attached badge or tag |
| `current` | `boolean` | Marks as the current page (`aria-current="page"`) |
| `disabled` | `boolean` | Disables this item |
| `external` | `boolean` | Opens link in a new tab with an external icon |
| `onClick` | `(e: MouseEvent) => void` | Callback when clicking the item |

### `<BreadcrumbLink>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `href` | `string` | — | `next/link` navigation URL |
| `asChild` | `boolean` | `false` | Delegates rendering to child component (Slot) |
| `as` | `ElementType` | — | Custom rendering element (e.g., `button`) |
| `external` | `boolean` | `false` | Opens link in a new tab |
| `startIcon` | `ReactNode` | — | Icon displayed before the label |
| `endIcon` | `ReactNode` | — | Icon displayed after the label |
| `badge` | `ReactNode` | — | Attached badge |
| `disabled` | `boolean` | `false` | Disables the link |
