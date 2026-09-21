# 🔽 Select & MultiSelect Component (`@openway/ui`)

Premium **Select** (Single select) and **MultiSelect** (Multiple select) component suite designed according to **Design System** standards, strictly conforming to **WAI-ARIA 1.2 Combobox/Listbox**, featuring **Zero `any`**, **Client & Server** search modes, infinite scrolling with **TanStack Query v5**, and **Skeleton Loading** effects.

---

## 🌟 Highlights

- **2 Specialized Components**:
  - `<Select>`: Selects a single value; supports placeholder, clearable, and custom value/option rendering.
  - `<MultiSelect>`: Selects multiple values rendered as tags/chips; supports individual tag deletion, clear-all button, and tag count limits (`maxTags`).
- **2 Search Modes (`searchMode`)**:
  - `client`: Searches and ranks results directly on the client using an intelligent fuzzy keyword ranking algorithm (`searchField`, `filterFn`).
  - `server`: Server-side search via `searchValue` and `onSearchChange(value)`. Automatically debounced when paired with `useSelectInfiniteQuery`.
- **TanStack Query v5 & Infinite Scroll Integration (`@openway/ui/query`)**:
  - Dedicated `useSelectInfiniteQuery` hook combining `useInfiniteQuery` with `useInfiniteScroll`.
  - Automatically merges options across all pages and deduplicates by `value`.
  - Shimmering **Skeleton** loading indicators rendered at the bottom of the list when loading subsequent pages (`isFetchingNextPage`).
  - Zero double-debouncing, smooth loading powered by native `IntersectionObserver`.
- **Comprehensive Advanced UI Features**:
  - `menuFilters`: Multi-criteria filters integrated directly into the header of the dropdown menu.
  - `renderOption` & `renderValue`: Customizable rendering for individual option rows (avatars, descriptions, badges, etc.) and selected trigger values.
  - `startContent` & `endContent`: Prepend or append custom icons and content to the trigger box.
  - `portal={true}`: Renders the menu outside the local DOM via `@floating-ui/react`, preventing clipping or positioning issues caused by `overflow: hidden`.
- **WAI-ARIA Accessibility & Keyboard Navigation**:
  - Full keyboard navigation support: `ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter` to select, and `Escape` to close the dropdown.

---

## 🚀 Installation & Import

```tsx
// 1. Basic Components & Types
import { Select, MultiSelect } from "@openway/ui";
import type {
  SelectProps,
  MultiSelectProps,
  SelectOptionItem,
  SelectFilterField,
} from "@openway/ui";

// 2. Query Hook for Server Infinite Scroll (Optional, requires @tanstack/react-query v5)
import { useSelectInfiniteQuery } from "@openway/ui/query";
```

---

## 📖 Usage Guide

### 1. Basic Select (Client Mode)

```tsx
import { useState } from "react";
import { Select, SelectOptionItem } from "@openway/ui";

const departments: SelectOptionItem<string>[] = [
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "Information Technology" },
  { value: "sales", label: "Sales Department" },
  { value: "mkt", label: "Marketing Department" },
];

export function BasicSelectExample() {
  const [value, setValue] = useState<string | number | null>("it");

  return (
    <div className="max-w-sm">
      <Select
        label="Department"
        placeholder="Select department..."
        options={departments}
        value={value}
        onChange={(val) => setValue(val)}
        clearable
      />
    </div>
  );
}
```

---

### 2. MultiSelect with Tags

```tsx
import { useState } from "react";
import { MultiSelect, SelectOptionItem } from "@openway/ui";

const roles: SelectOptionItem[] = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "moderator", label: "Moderator" },
  { value: "viewer", label: "Viewer" },
];

export function MultiSelectExample() {
  const [selectedRoles, setSelectedRoles] = useState<(string | number)[]>(["editor"]);

  return (
    <div className="max-w-md">
      <MultiSelect
        label="User Roles"
        placeholder="Select roles..."
        options={roles}
        value={selectedRoles}
        onChange={(vals) => setSelectedRoles(vals)}
        searchable
        clearable
      />
    </div>
  );
}
```

---

### 3. Server Pagination & Infinite Scroll (`useSelectInfiniteQuery`)

This is the recommended approach when handling large datasets or paginated server responses:

```tsx
import { Select } from "@openway/ui";
import { useSelectInfiniteQuery } from "@openway/ui/query";

interface UserItem {
  id: number;
  name: string;
  email: string;
}

export function ServerInfiniteSelectExample() {
  const { selectProps, query } = useSelectInfiniteQuery<
    UserItem,
    { users: UserItem[]; nextCursor?: number },
    number
  >({
    queryKey: ["users-infinite"],
    queryFn: async ({ pageParam, search }) => {
      const res = await fetch(
        `/api/users?cursor=${pageParam}&q=${encodeURIComponent(search)}`
      );
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // Map raw entity to standard SelectOptionItem format
    mapOption: (item) => {
      const user = item as UserItem;
      return {
        value: user.id,
        label: user.name,
        description: user.email,
        data: user,
      };
    },
    debounceMs: 300,
    endMessage: "All users loaded",
  });

  return (
    <div className="max-w-md">
      <Select
        {...selectProps}
        label="Select Member"
        placeholder="Search members..."
        searchable
        clearable
      />
    </div>
  );
}
```

---

### 4. Custom Option Rendering (`renderOption`) & Rich Layout

```tsx
<Select
  label="Select User"
  options={userOptions}
  renderOption={(option, { isSelected, isFocused }) => (
    <div className="flex items-center gap-2.5 py-1">
      <img
        src={option.data?.avatarUrl}
        alt={option.label}
        className="w-7 h-7 rounded-full object-cover"
      />
      <div>
        <div className="font-medium text-sm text-neutral-800">
          {option.label}
        </div>
        <div className="text-xs text-neutral-400">
          {option.description}
        </div>
      </div>
    </div>
  )}
/>
```

---

### 5. Menu-Integrated Filters (`menuFilters`)

```tsx
const filterFields: SelectFilterField[] = [
  // 1. CheckboxGroup with Server Mode & dedicated search input
  {
    name: "categories",
    label: "Categories",
    type: "checkbox-group",
    options: categoryOptions,
    searchable: true,
    searchMode: "server",
    isLoading: isFetchingCategories,
    onSearchChange: (keyword) => setCategoryKeyword(keyword),
    preserveSelected: true,
  },
  // 2. DateRangePicker split into 2 independent keys (startDate, endDate)
  {
    name: "startDate",
    endName: "endDate",
    label: "Created Date",
    type: "date-range",
    placeholder: "Select date range...",
  },
];

<Select
  label="Customer"
  options={customerOptions}
  menuFilters={filterFields}
  onMenuFilterChange={(filters) => {
    // filters: { categories: string[], startDate: Date | null, endDate: Date | null }
    console.log("Applied filters:", filters);
  }}
/>
```

> [!NOTE]
> For date-based filters like `date-range` (`DateRangePicker`) or `date` (`DatePicker`), note that locale is configured centrally via `OpenWayProvider` (since v2.0.0).

---

## 🎛️ Detailed Props Reference

### Shared Props (`BaseSelectProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `SelectOptionItem<TData>[]` | `[]` | Array of selectable option items. |
| `label` | `ReactNode` | `undefined` | Label displayed above the trigger. |
| `placeholder` | `string` | `"Select..."` | Placeholder text when no value is selected. |
| `searchable` | `boolean` | `false` | Enables search input field within the menu. |
| `searchMode` | `"client" \| "server"` | `"client"` | Client-side search or server-side API query mode. |
| `searchValue` | `string` | `undefined` | Search input query string (Controlled mode). |
| `onSearchChange` | `(value: string) => void` | `undefined` | Callback fired when the search query changes. |
| `listFooter` | `ReactNode` | `undefined` | Element rendered at the bottom of the list (used for Sentinel / Skeleton loading). |
| `clearable` | `boolean` | `false` | Displays quick clear button for selected value(s). |
| `disabled` | `boolean` | `false` | Disables user interaction. |
| `isLoading` | `boolean` | `false` | Displays loading state indicator. |
| `portal` | `boolean` | `true` | Renders menu through a portal to prevent container overflow clipping. |
| `maxMenuHeight` | `number` | `280` | Maximum height of the scrollable menu in pixels. |
| `renderOption` | `(option, state) => ReactNode` | `undefined` | Custom render function for each listbox option. |
| `renderValue` | `(selected) => ReactNode` | `undefined` | Custom render function for selected value on the trigger. |
| `menuFilters` | `SelectFilterField[]` | `undefined` | Array of filter fields integrated into dropdown header. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Sizing of the trigger box. |
| `variant` | `"outline" \| "filled" \| "soft"`| `"outline"` | Border and background visual style variant. |
