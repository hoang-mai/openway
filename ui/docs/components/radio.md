# 🔘 Radio & RadioGroup Component (`@openway/ui`)

Professional **Radio** and **RadioGroup** component pair designed with a **Pure Data-driven** architecture. Completely free of React Context and eliminating cascading renders caused by `useEffect`, it integrates **Live Search (Client & Server modes)** via the `outline` variant of the `Input` component, supports **Preserve Selected** items, and strictly complies with **WAI-ARIA Accessibility** standards.

---

## 🌟 Highlights

### 1. Radio
- **Independent & Optimized**: Zero Context dependency, receives props directly, and supports standard React 19 `ref` forwarding without intermediate wrappers.
- **5 Standard Sizes (`size`)**: `xs`, `sm`, `md` (*default*), `lg`, `xl` with proportional sizing across the radio circle, internal dot indicator, label, and helper text.
- **4 Visual Variants (`variant`)**:
  - `filled` (*default*): Solid high-contrast background when selected.
  - `outline`: Transparent background with border and dot matching theme color.
  - `soft`: Soft pastel background tint (`bg-{color}-100`).
  - `other`: Free-form styling via `boxClassName`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **2 Label Placements (`labelPlacement`)**: `right` (*default*) and `left` (justified layout).
- **Safe Config Fallback**: Uses `getSafeConfig` to ensure the component degrades gracefully and never errors on invalid values.

### 2. RadioGroup
- **Pure Data-driven Architecture**: Accepts options via the `options: RadioOptionItem<TData>[]` prop. Eliminates bulky compound component nesting and Context Provider overhead.
- **Integrated Live Search (`searchable`)**:
  - Employs the `Input` component (`outline` variant) with a search icon (`SearchIcon`) and quick clear button (`isClearable`).
  - **Focus-Preserving**: Shows a background loading spinner in the right accessory slot via `rightIcon`, never disabling the input while the user is actively typing.
- **2 Flexible Search Modes (`searchMode`)**:
  - `client` (*default*): Smart client-side search powered by `@tanstack/match-sorter-utils` fuzzy ranking algorithm. Supports multi-field searching (`searchField`) or custom filter logic (`filterFn`).
  - `server`: Server-side API searching using `onSearch` with configurable `debounceMs` buffering.
- **Preserve Selected (`preserveSelected`)**: Automatically pins previously selected options to the top when the search query changes, with intelligent memory management (only retaining actively selected items).
- **2 Layout Orientations (`orientation`)**: `vertical` (*default*) and `horizontal`.

---

## 🚀 Installation & Import

```tsx
import { Radio, RadioGroup } from "@openway/ui";
import type {
  RadioProps,
  RadioGroupProps,
  RadioOptionItem,
  RadioSize,
  RadioVariant,
  RadioColor,
  RadioLabelPlacement,
  RadioSearchMode,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Standalone Radio Usage

```tsx
import { useState } from "react";
import { Radio } from "@openway/ui";

export function SingleRadioExample() {
  const [selected, setSelected] = useState(false);

  return (
    <Radio
      checked={selected}
      onChange={(e) => setSelected(e.target.checked)}
      label="Receive email notifications"
      helperText="You can unsubscribe at any time"
    />
  );
}
```

---

### 2. Basic RadioGroup (Data-driven)

```tsx
import { useState } from "react";
import { RadioGroup } from "@openway/ui";

export function BasicGroupExample() {
  const [delivery, setDelivery] = useState<string | null>("standard");

  return (
    <RadioGroup
      label="Shipping Method"
      helperText="Choose your preferred shipping option"
      value={delivery}
      onChange={setDelivery}
      color="primary"
      orientation="vertical"
      options={[
        { value: "standard", label: "Standard Delivery (2-3 days)" },
        { value: "express", label: "Express Delivery (1 day)" },
        { value: "same_day", label: "Same-Day Delivery" },
      ]}
    />
  );
}
```

---

### 3. Client Mode Search (Fuzzy Search & Multi-field)

```tsx
import { useState } from "react";
import { RadioGroup } from "@openway/ui";

const frameworks = [
  { value: "react", label: "React JS", code: "FE-01", description: "Facebook library" },
  { value: "vue", label: "Vue JS", code: "FE-02", description: "Progressive framework" },
  { value: "angular", label: "Angular", code: "FE-03", description: "Google platform" },
  { value: "svelte", label: "Svelte", code: "FE-04", description: "Cybernetically enhanced" },
];

export function ClientSearchExample() {
  const [selected, setSelected] = useState<string | null>("react");

  return (
    <RadioGroup
      label="Select Primary Framework"
      searchable
      searchField={["label", "code", "description"]}
      searchPlaceholder="Search by name, code, or description..."
      preserveSelected
      value={selected}
      onChange={setSelected}
      options={frameworks}
    />
  );
}
```

---

### 4. Server Mode Search (Debounced API Search & Preserve Selected)

```tsx
import { useState } from "react";
import { RadioGroup } from "@openway/ui";

export function ServerSearchExample() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSearchProducts = async (query: string) => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=5`
    );
    if (!res.ok) throw new Error("API request failed");
    const data = await res.json();
    
    return data.products.map((p: any) => ({
      value: String(p.id),
      label: p.title,
      description: `$${p.price} - ${p.category}`,
    }));
  };

  return (
    <RadioGroup
      label="Choose your favorite product"
      searchable
      searchMode="server"
      onSearch={handleSearchProducts}
      searchPlaceholder="Search products from server..."
      preserveSelected
      value={selectedProduct}
      onChange={setSelectedProduct}
      color="info"
    />
  );
}
```

---

## 🎛️ Props & API Reference

### `RadioProps`

Inherits `Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">`:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Sizing for the radio circle, dot indicator, and label |
| `variant` | `'filled' \| 'outline' \| 'soft' \| 'other'` | `'filled'` | Visual styling of the box when checked |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Color theme |
| `disabled` | `boolean` | `false` | Disables user interaction |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `config` | `RadioConfig` | `undefined` | Status flags configuration (`isLoading` - spinner replaces dot, `isRequired`, `isInvalid`) |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | Placement position of the label |
| `label` | `ReactNode` | `undefined` | Label text next to the radio circle |
| `helperText` | `ReactNode` | `undefined` | Helper text displayed below |
| `errorMessage` | `ReactNode` | `undefined` | Error message displayed below |
| `dotIcon` | `ReactNode` | `RadioDotIcon` | Custom icon replacing the inner dot indicator |

---

### `RadioGroupProps<TData = unknown, TValue extends string | number = string>`

Inherits `Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children">`:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `RadioOptionItem<TData, TValue>[]` | `[]` | Data-driven array of options |
| `value` | `TValue \| null` | `undefined` | Currently selected value (Controlled mode) |
| `defaultValue` | `TValue \| null` | `null` | Default initial value (Uncontrolled mode) |
| `onChange` | `(value: TValue \| null) => void` | `undefined` | Callback fired when the selected value changes |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation of options |
| `searchable` | `boolean` | `false` | Toggles the search input bar |
| `searchMode` | `'client' \| 'server'` | `'client'` | Client-side search or server-side API call mode |
| `searchField` | `string \| string[]` | `'label'` | Data fields to match against when searching |
| `filterFn` | `(item: RadioOptionItem<TData, TValue>, query: string) => boolean` | `undefined` | Custom client-side filter function |
| `onSearch` | `(query: string, ...args: unknown[]) => void \| Promise<void>` | `undefined` | Search callback fired on input change (Server mode) |
| `listFooter` | `ReactNode` | `undefined` | Content rendered at bottom of list (Sentinel / Skeleton loading) |
| `maxHeight` | `number \| string` | `undefined` | Constrains height and enables vertical scrolling |
| `preserveSelected` | `boolean` | `true` | Retains previously selected item when the search query changes |
| `emptyText` | `ReactNode` | `'No results found'` | Message displayed when no results match |
| `emptyProps` | `Partial<EmptyProps>` | `undefined` | Custom props forwarded to the `Empty` component when list is empty |
| `size` | `RadioSize` | `'md'` | Size propagated to all child radio buttons |
| `color` | `RadioColor` | `'primary'` | Color theme propagated to all child radio buttons |
| `variant` | `RadioVariant` | `'filled'` | Variant propagated to all child radio buttons |
| `disabled` | `boolean` | `false` | Disables the entire radio group |
| `isReadOnly` | `boolean` | `false` | Read-only mode for the entire group |
| `isLoading` | `boolean` | `false` | Data loading state (loading data from API/query) |
| `skeletonCount` | `number` | `3` | Number of skeleton items displayed while loading |
| `renderSkeleton` | `() => ReactNode` | `undefined` | Custom render function for skeleton loading state |
| `config` | `RadioGroupConfig` | `undefined` | Status flags configuration (`isLoading` - locks interaction, `isRequired`, `isInvalid`, etc.) |
| `label` | `ReactNode` | `undefined` | Group label heading |
| `helperText` | `ReactNode` | `undefined` | Group helper description text |
| `errorMessage` | `ReactNode` | `undefined` | Group error message text |

---

### `RadioOptionItem<TData = unknown, TValue extends string | number = string | number>`

| Field | Type | Description |
| :--- | :--- | :--- |
| `value` | `TValue` | Unique identifier value of the option (string or number) |
| `label` | `ReactNode` | Primary display label |
| `description` | `ReactNode` | Subtitle or secondary description below the label |
| `disabled` | `boolean` | Disables this individual option |
| `isReadOnly` | `boolean` | Read-only mode for this individual option |
| `data` | `TData` | Raw original data object payload |
| `[key: string]` | `unknown` | Additional custom properties (used for filtering via `searchField`) |
