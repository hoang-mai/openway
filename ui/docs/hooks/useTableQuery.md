# 📊 Hook `useTableQuery` (`@openway/ui/query`)

A specialized adapter hook connecting **TanStack Query v5** (`useQuery`) with the `<Table />` component, fully automating server-side pagination, multi-column sorting, data filtering, and optimizing UX via `keepPreviousData`.

---

## 🌟 Highlights

- **Automatic Table Synchronization**: Returns a comprehensive `tableProps` bundle ready to spread directly into `<Table {...tableProps} />`.
- **Server Pagination**: Manages `page` (1-indexed), `pageSize`, automatically handles page transitions, and computes total pages (`pageCount`).
- **Server Sorting**: Synchronizes `sortBy` and `sortOrder` ("asc" | "desc") from Table header click interactions and sends them to the server.
- **Server Filtering & Auto-Reset**: Automatically converts the TanStack Table filter array into a flat `Record<string, unknown>` dictionary, automatically resetting to page 1 whenever filters change (`autoResetPageIndex`).
- **Smooth Page Transitions (`keepPreviousData`)**: Previous page data remains visible while new page data is being fetched in the background, eliminating white flashes and UI jumps.
- **Zero `any`**: 100% type-safe with generic types `TData` and `TResponse`.

---

## 🚀 Import

```tsx
import { useTableQuery } from "@openway/ui/query";
import type {
  TableQueryParams,
  UseTableQueryOptions,
  UseTableQueryReturn,
} from "@openway/ui/query";
```

---

## 📖 Usage Guide

### Server-side Pagination, Sorting & Filtering

```tsx
import { Table, type ColumnDef } from "@openway/ui";
import { useTableQuery } from "@openway/ui/query";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserApiResponse {
  data: User[];
  total: number;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Họ và tên", enableSorting: true },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Vai trò" },
];

export function UserManagementTable() {
  const { tableProps, query, page, setPage } = useTableQuery<User, UserApiResponse>({
    queryKey: ["users-table"],
    queryFn: async (params) => {
      const searchParams = new URLSearchParams({
        page: String(params.page),
        pageSize: String(params.pageSize),
        ...(params.sortBy && { sortBy: params.sortBy, sortOrder: params.sortOrder ?? "asc" }),
      });
      const res = await fetch(`/api/users?${searchParams}`);
      return res.json();
    },
    // Automatically extract data array and total count from response
    selectData: (res) => res.data,
    selectTotal: (res) => res.total,
    initialPageSize: 10,
  });

  return (
    <div className="space-y-4">
      <Table
        {...tableProps}
        columns={columns}
        border
        striped
        hoverable
      />
    </div>
  );
}
```

---

## 🎛️ Options Table (`UseTableQueryOptions`)

| Option Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `queryKey` | `readonly unknown[]` | **Required** | Root query key for TanStack Query. |
| `queryFn` | `(params, context) => Promise<TResponse>` | **Required** | API data fetching function receiving `TableQueryParams`. |
| `selectData` | `(res) => TData[]` | Auto-extracts `data/items/results/rows` | Function extracting the data array from the API response. |
| `selectTotal` | `(res) => number` | Auto-extracts `total/totalCount/count` | Function extracting total record count from the API response. |
| `initialPage` | `number` | `1` | Starting page number (1-indexed). |
| `initialPageSize` | `number` | `10` | Number of rows displayed per page. |
| `autoResetPageIndex` | `boolean` | `true` | Automatically resets back to page 1 when filters or sorting change. |
| `debounceMs` | `number` | `300` | Debounce delay (ms) for server-side filter changes before firing API requests. Set to `0` to disable. |
| `queryOptions` | `Omit<UseQueryOptions, ...>` | `undefined` | Advanced TanStack Query configurations (`staleTime`, `refetchInterval`...). |

---

## 📦 Return Value (`UseTableQueryReturn`)

- `tableProps`: Props bundle to spread directly into `<Table />`:
  - `data: TData[]`
  - `pageCount: number`
  - `pagination: { pageIndex, pageSize }`
  - `onPaginationChange: OnChangeFn<PaginationState>`
  - `sorting: SortingState`
  - `onSortingChange: OnChangeFn<SortingState>`
  - `columnFilters: ColumnFiltersState`
  - `onColumnFiltersChange: OnChangeFn<ColumnFiltersState>`
  - `globalFilter: string`
  - `onGlobalFilterChange: (filter: string) => void`
  - `isLoading: boolean`
  - `manualPagination: true`
  - `manualSorting: true`
  - `manualFiltering: true`
- `query`: Query result from `useQuery`.
- `queryParams`: Normalized query parameters sent to the server API (`page`, `pageSize`, `sortBy`, `sortOrder`, `filters`).
- `page`, `setPage`: Current page number and its setter.
- `pageSize`, `setPageSize`: Current page size and its setter.
- `resetFilters`: Resets all active filters.
