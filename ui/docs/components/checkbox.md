# ☑️ Checkbox & CheckboxGroup Component (`@openway/ui`)

A professional **Checkbox** and **CheckboxGroup** component pair designed using a **Pure Data-driven** architecture, free of React Context, completely eliminating `useEffect` cascading renders, featuring **Live Search (Client & Server modes)** via the `outline` variant `Input` component, supporting **Preserve Selected items**, and adhering strictly to **WAI-ARIA Accessibility** standards.

---

## 🌟 Key Features

### 1. Checkbox
- **Independent & Optimized**: Zero Context dependency, receives props directly, supports standard React 19 forwarded `ref` without intermediary wrappers.
- **5 Standard Sizes (`size`)**: `xs`, `sm`, `md` (*default*), `lg`, `xl` with synchronized proportions across the checkbox, SVG icon, label, and helper text.
- **4 Visual Variants (`variant`)**:
  - `filled` (*default*): Theme background color when checked.
  - `outline`: Theme border color with transparent background.
  - `soft`: Gentle pastel background (`bg-{color}-100`).
  - `other`: Freely customize styles via `boxClassName`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **Indeterminate State (`indeterminate`)**: Supports partially selected states with the standard `aria-checked="mixed"` attribute and a minus icon (`MinusIcon`).
- **2 Label Placements (`labelPlacement`)**: `right` (*default*) and `left` (space-between alignment).
- **Safe Config Fallback**: Uses `getSafeConfig` to ensure the component remains completely safe without display issues when receiving invalid prop values.

### 2. CheckboxGroup
- **Pure Data-driven Architecture**: Receives the options list via the `options: CheckboxOptionItem<TData>[]` prop. No bulky compound components, no Context Provider overhead.
- **Integrated Visual Search (`searchable`)**:
  - Uses the `outline` variant `Input` component with a search icon (`SearchIcon`) and quick-clear button (`isClearable`).
  - **Maintains Focus**: Background loading state shows a right spinner via `rightIcon`, without disabling the input while the user is actively typing.
- **2 Flexible Search Modes (`searchMode`)**:
  - `client` (*default*): Smart search powered by the fuzzy ranking algorithm of `@tanstack/match-sorter-utils`. Supports multi-field searches (`searchField`) or custom functions (`filterFn`).
  - `server`: Server-side API search with `onSearch` and configurable `debounceMs`.
- **Preserve Selected Items (`preserveSelected`)**: Automatically pins selected items to the top of the list when changing search keywords, with smart memory management (only retains truly checked items).
- **2 Layout Orientations (`orientation`)**: `vertical` (*default*) and `horizontal`.

---

## 🚀 Installation & Import

```tsx
import { Checkbox, CheckboxGroup } from "@openway/ui";
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxOptionItem,
  CheckboxSize,
  CheckboxVariant,
  CheckboxColor,
  CheckboxRadius,
  CheckboxLabelPlacement,
  CheckboxSearchMode,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Standalone Checkbox Usage

```tsx
import { useState } from "react";
import { Checkbox } from "@openway/ui";

export function SingleCheckboxExample() {
  const [agree, setAgree] = useState(false);

  return (
    <Checkbox
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
      label="I agree to the terms and privacy policy"
      helperText="Please read carefully before proceeding"
      config={{ isRequired: true }}
    />
  );
}
```

---

### 2. Basic CheckboxGroup (Data-driven)

```tsx
import { useState } from "react";
import { CheckboxGroup } from "@openway/ui";

export function BasicGroupExample() {
  const [selected, setSelected] = useState<string[]>(["react"]);

  return (
    <CheckboxGroup
      label="Technical Skills"
      helperText="Select skills you have experience working with"
      value={selected}
      onChange={setSelected}
      color="primary"
      orientation="horizontal"
      options={[
        { value: "react", label: "React 19" },
        { value: "vue", label: "Vue.js 3" },
        { value: "tailwind", label: "Tailwind CSS v4" },
        { value: "typescript", label: "TypeScript" },
      ]}
    />
  );
}
```

---

### 3. Client Mode Search (Fuzzy Search & Multi-field)

```tsx
import { useState } from "react";
import { CheckboxGroup } from "@openway/ui";

const frameworks = [
  { value: "react", label: "React JS", code: "FE-01", description: "Facebook library" },
  { value: "vue", label: "Vue JS", code: "FE-02", description: "Progressive framework" },
  { value: "angular", label: "Angular", code: "FE-03", description: "Google platform" },
  { value: "svelte", label: "Svelte", code: "FE-04", description: "Cybernetically enhanced" },
];

export function ClientSearchExample() {
  const [selected, setSelected] = useState<string[]>(["react"]);

  return (
    <CheckboxGroup
      label="Search Frameworks"
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

### 4. Server Mode Search & Infinite Pagination (`useSelectInfiniteQuery`)

`CheckboxGroup` works seamlessly with the `useSelectInfiniteQuery` hook:
- The hook automatically merges search keywords into `filters` based on `searchField` (e.g., `name: "phone"`).
- The hook manages centralized debouncing; when users type into search, `CheckboxGroup` directly calls `onSearch` and the hook debounces before calling the API.
- Supports smooth infinite scrolling when combining `maxHeight` and `listFooter`.

```tsx
import { CheckboxGroup } from "@openway/ui";
import { useSelectInfiniteQuery } from "@openway/ui/query";

export function InfiniteProductCheckboxGroup() {
  const { selectProps } = useSelectInfiniteQuery({
    queryKey: ["products-infinite"],
    searchField: "q", // Merge search keyword into filters: { q: "phone", ... }
    queryFn: async ({ pageParam, filters }) => {
      const queryParams = new URLSearchParams({
        limit: "10",
        skip: String((pageParam - 1) * 10),
        ...filters,
      });
      const res = await fetch(`https://dummyjson.com/products/search?${queryParams}`);
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentLoaded = allPages.reduce((acc, p) => acc + (p.products?.length || 0), 0);
      return currentLoaded < lastPage.total ? allPages.length + 1 : undefined;
    },
    mapOption: (item: any) => ({
      value: String(item.id),
      label: item.title,
      description: `$${item.price} - ${item.category}`,
    }),
    debounceMs: 300,
  });

  return (
    <div className="max-w-md">
      <CheckboxGroup
        {...selectProps}
        label="Product List (Infinite Scroll)"
        searchable
        searchPlaceholder="Search products..."
        maxHeight={300}
        color="info"
      />
    </div>
  );
}
```

---

## 🎛️ Props & API Reference

### `CheckboxProps`

Inherits `Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">`:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the checkbox box, icon, and label |
| `variant` | `'filled' \| 'outline' \| 'soft' \| 'other'` | `'filled'` | Visual style of the checkbox box |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Color theme |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius |
| `config` | `CheckboxConfig` | `undefined` | Status flags configuration (`isRequired`, `indeterminate`, `isLoading`, `isInvalid`, etc.) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | Label display placement |
| `label` | `ReactNode` | `undefined` | Text label next to the checkbox |
| `helperText` | `ReactNode` | `undefined` | Helper text displayed below |
| `errorMessage` | `ReactNode` | `undefined` | Error message |
| `icon` | `ReactNode` | `CheckIcon` | Custom icon when checked |
| `indeterminateIcon` | `ReactNode` | `MinusIcon` | Custom icon when indeterminate |

---

### `CheckboxGroupProps<TData = unknown, TValue extends string | number = string>`

Inherits `Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">`:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `CheckboxOptionItem<TData, TValue>[]` | `[]` | Data array of options (Data-driven) |
| `value` | `TValue[]` | `undefined` | List of selected values (Controlled) |
| `defaultValue` | `TValue[]` | `[]` | List of default selected values (Uncontrolled) |
| `onChange` | `(values: TValue[]) => void` | `undefined` | Callback invoked when selected list changes |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation of items |
| `searchable` | `boolean` | `false` | Enables/disables search bar |
| `searchMode` | `'client' \| 'server'` | `'client'` | Search mode: client-side filtering or server API call |
| `searchField` | `string \| string[]` | `'label'` | Data fields used for searching (Client mode) |
| `filterFn` | `(item, query) => boolean` | `undefined` | Custom client-side filter function |
| `onSearch` | `(query) => void` | `undefined` | Callback when user types in search (Server mode) |
| `listFooter` | `ReactNode` | `undefined` | Content at the bottom of the list (Sentinel / Skeleton loading) |
| `maxHeight` | `number \| string` | `undefined` | Limits height and enables vertical scrollbar |
| `preserveSelected` | `boolean` | `true` | Preserves selected items when search keywords change |
| `emptyText` | `ReactNode` | `'No results found'` | Notice displayed when no options match |
| `emptyProps` | `Partial<EmptyProps>` | `undefined` | Custom props for the `Empty` component when list is empty |
| `size` | `CheckboxSize` | `'md'` | Size propagated to all child checkboxes |
| `color` | `CheckboxColor` | `'primary'` | Color propagated to all child checkboxes |
| `variant` | `CheckboxVariant` | `'filled'` | Variant propagated to all child checkboxes |
| `radius` | `CheckboxRadius` | `undefined` | Border radius propagated to all child checkboxes |
| `disabled` | `boolean` | `false` | Disables the entire group |
| `isLoading` | `boolean` | `false` | Data loading state (Data Loading from API/query) |
| `skeletonCount` | `number` | `3` | Number of Skeleton lines shown during data loading |
| `renderSkeleton` | `() => ReactNode` | `undefined` | Custom Skeleton render function during data loading |
| `config` | `CheckboxGroupConfig` | `undefined` | State flags configuration (`isLoading` - busy locking state, `showSpinner`, `isRequired`, `isInvalid`, etc.) |
| `label` | `ReactNode` | `undefined` | Group label |
| `helperText` | `ReactNode` | `undefined` | Group helper text |
| `errorMessage` | `ReactNode` | `undefined` | Group error message |

---

### `CheckboxOptionItem<TData = unknown, TValue extends string | number = string | number>`

| Field | Type | Description |
| :--- | :--- | :--- |
| `value` | `TValue` | Unique identifier value of the option (string or number) |
| `label` | `ReactNode` | Main display label |
| `description` | `ReactNode` | Secondary note/description beneath the label |
| `disabled` | `boolean` | Disables this option |
| `isReadOnly` | `boolean` | Read-only mode for this option |
| `indeterminate`| `boolean` | Indeterminate state for this option |
| `data` | `TData` | Attached original data object |
| `[key: string]` | `unknown` | Extended arbitrary fields (for filtering via `searchField`) |
