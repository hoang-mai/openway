# 🔽 Hook `useSelectInfiniteQuery` (`@openway/ui/query`)

A specialized adapter hook combining **TanStack Query v5** (`useInfiniteQuery`) with **`useInfiniteScroll`** and **`Skeleton`**, specifically designed for `<Select />` and `<MultiSelect />` components in server search mode (`searchMode="server"`).

---

## 🌟 Highlights

- **Fully Automated**: Returns an all-in-one `selectProps` bundle ready to spread directly into `<Select {...selectProps} />` or `<MultiSelect {...selectProps} />`.
- **Infinite Scrolling**: Automatically observes when the user scrolls to the bottom of the list via `useInfiniteScroll` (native `IntersectionObserver`) and triggers `fetchNextPage()`.
- **Skeleton Loading Effect**: Automatically displays 2 pulsing `Skeleton` lines mimicking option items in `listFooter` while fetching subsequent pages (`isFetchingNextPage`).
- **Option Merging & Deduplication**: Automatically flattens paginated data (`pages`) into a single list and deduplicates options by `value`.
- **Prevents Double Debouncing**: `<Select />` handles debouncing user keystrokes based on `debounceMs` before invoking `onSearch`; the hook receives the search event and immediately triggers the query without redundant latency.
- **Zero `any`**: 100% type-safe with generic types `TData`, `TResponse`, and `TPageParam`.

---

## 🚀 Import

```tsx
import { useSelectInfiniteQuery } from "@openway/ui/query";
import type {
  SelectQueryParams,
  UseSelectInfiniteQueryOptions,
  UseSelectInfiniteQueryReturn,
} from "@openway/ui/query";
```

---

## 📖 Usage Guide

### 1. Basic Server Pagination with Cursor / NextPage

```tsx
import { Select } from "@openway/ui";
import { useSelectInfiniteQuery } from "@openway/ui/query";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductPageResponse {
  items: Product[];
  nextPage?: number;
}

export function InfiniteProductSelect() {
  const { selectProps, query } = useSelectInfiniteQuery<
    Product,
    ProductPageResponse,
    number
  >({
    queryKey: ["products-infinite"],
    queryFn: async ({ pageParam, search }) => {
      const res = await fetch(
        `/api/products?page=${pageParam}&search=${encodeURIComponent(search)}`
      );
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    mapOption: (item) => {
      const product = item as Product;
      return {
        value: product.id,
        label: product.title,
        description: `${product.price.toLocaleString()} đ`,
        data: product,
      };
    },
    debounceMs: 300,
    endMessage: "All products have been loaded",
  });

  return (
    <div className="max-w-md">
      <Select
        {...selectProps}
        label="Chọn sản phẩm"
        placeholder="Tìm kiếm theo tên sản phẩm..."
        searchable
        clearable
      />
    </div>
  );
}
```

---

## 🎛️ Options Table (`UseSelectInfiniteQueryOptions`)

| Option Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `queryKey` | `readonly unknown[]` | **Required** | Root query key. `[{ search, filters }]` is automatically appended to the end of `queryKey`. |
| `queryFn` | `(params, context) => Promise<TResponse>` | **Required** | Page-by-page API fetch function receiving `pageParam`, `search`, and `filters`. |
| `initialPageParam` | `TPageParam` | `1` | Initial page parameter value (page number or cursor). |
| `getNextPageParam` | `(lastPage, allPages, ...) => TPageParam` | Auto-inferred (`nextPage`, `nextCursor`...) | Determines the parameter for the next page. Returns `undefined` when there are no more pages. |
| `selectOptions` | `(response) => SelectOptionItem<TData>[]` | Auto-extracted | Function extracting the array of options from each page response. |
| `mapOption` | `(item, index) => SelectOptionItem<TData>` | `undefined` | Transformer function converting a raw item into a `SelectOptionItem`. |
| `debounceMs` | `number` | `300` | Search debounce duration passed down to Select. |
| `skeletonLines` | `number` | `2` | Number of Skeleton lines displayed at the bottom of the list when loading more pages. |
| `endMessage` | `ReactNode` | `undefined` | Message displayed at the bottom of the list when all pages have been loaded. |

---

## 📦 Return Value (`UseSelectInfiniteQueryReturn`)

- `selectProps`: Props bundle to spread directly into `<Select />` or `<MultiSelect />`:
  - `options`: Combined options array aggregated from all loaded pages.
  - `isLoading`: Loading state for the initial page.
  - `searchMode: "server"`
  - `onSearch`: Handler receiving search keyword and filters from Select.
  - `listFooter`: Sentinel element with Skeleton loading indicators when fetching subsequent pages.
- `query`: `UseInfiniteQueryResult` object from TanStack Query.
- `options`: Complete list of options.
- `search`, `setSearch`: Current search keyword and its setter.
- `filters`, `setFilters`: Current menu filters and their setter.
- `reset`: Resets all search keywords and filters to their initial values.
