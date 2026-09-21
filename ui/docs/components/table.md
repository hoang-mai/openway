# 📊 Table & DataTable Component (`@openway/ui`)

Professional **Table** and **DataTable** component suite deeply integrated with **TanStack Table v9** (`@tanstack/react-table@^9.2.4`), designed to **Design System** standards. Features a **3-tier modular architecture**, **Sorting**, **Fuzzy Search / Filtering**, **Pagination**, **Row Selection**, **Column Visibility**, **Loading Skeleton**, **Empty State**, and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Highlights

- **Latest TanStack Table v9 Integration**:
  - Leverages the modular architecture (`tableFeatures`) for bundle size optimization and tree-shaking.
  - High-performance reactive state built on **TanStack Store**, fully compatible with **React 19** and **React Compiler**.
- **Flexible 3-Tier Architecture**:
  - **Tier 1 - Low-level UI Primitives**: `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableFooter>`, `<TableRow>`, `<TableHead>`, `<TableCell>`, `<TableCaption>`. Used for constructing custom HTML tables with unified Tailwind styling.
  - **Tier 2 - Headless Hook & Helpers**: `useDataTable()`, `createTableColumnHelper()`, `defaultTableFeatures` providing strong type inference for building custom datagrids.
  - **Tier 3 - High-level `<DataTable>`**: Plug & Play all-in-one component complete with search toolbar, pagination, row selection, and column visibility out of the box.
- **Robust Built-in Features**:
  - ↕️ **Sorting**: Multi-mode (Ascending, Descending, None), supporting multi-sort and interactive column headers.
  - 🔍 **Search & Filtering**: Global table search with quick clear button.
  - 📄 **Professional Pagination**: First, previous, next, and last page navigation; customizable rows per page selection (10, 20, 50, 100).
  - ☑️ **Row Selection**: Automatically renders row checkboxes and select-all header checkbox, along with a selection counter banner and bulk actions area.
  - 👁️ **Column Visibility**: Popover dropdown menu allowing users to toggle column display.
  - 🌲 **Row Expanding & Tree Data**:
    - Supports detail panel sub-components spanning all columns (`renderExpandedRow`), easily integrated with `useQuery` to fetch detailed data on demand.
    - Multi-level recursive tree data (Parent ➔ Child ➔ Grandchild...) displayed IN-LINE & WITHIN THE SAME COLUMNS as the parent table (`getSubRows`).
    - Smooth animated chevron indicator, and expand/collapse all toggle in the header.
    - Automatic hierarchical indentation based on depth (`row.depth`), with configurable maximum depth limits (`maxIndentDepth`) to preserve layout integrity.
  - ⏳ **Intelligent Loading & Empty States**: Automatically renders Skeleton rows when `isLoading={true}` and displays an `<Empty>` illustration when no data or search matches exist.
  - 🌐 **Client-side & Server-side (Manual Mode) Support**: Easily connects to backend paginated and filtered APIs using `manualPagination`, `manualSorting`, `manualExpanding`, `pageCount`, and `rowCount`.
- **3 Sizes (`size`)**: `sm` (compact, dense), `md` (standard - *default*), `lg` (spacious).
- **3 Variants (`variant`)**: `default` (clean border), `striped` (alternating row backgrounds), `bordered` (full cell borders).

---

## 🚀 Installation & Import

```tsx
import {
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableColumnHeader,
  DraggableTableHead,
  TablePagination,
  TableToolbar,
  useDataTable,
  createTableColumnHelper,
  defaultTableFeatures,
} from "@openway/ui";

import type {
  DataTableProps,
  TableProps,
  TableSize,
  TableVariant,
  TableColumnHeaderProps,
  DraggableTableHeadProps,
  ColumnOrderState,
  TablePaginationProps,
  TableToolbarProps,
  ExpandedState,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Build a Complete DataTable with TanStack Table v9

Use `createTableColumnHelper` to create type-safe column definitions and pass them to the `<DataTable>` component:

```tsx
import { DataTable, createTableColumnHelper } from "@openway/ui";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const columnHelper = createTableColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", {
    header: "Product Name",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("price", {
    header: "Unit Price",
    cell: (info) => `${info.getValue().toLocaleString("en-US")} USD`,
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
  }),
];

const mockData: Product[] = [
  { id: "1", name: "Smart Desk", category: "Furniture", price: 350, stock: 12 },
  { id: "2", name: "Ergonomic Chair", category: "Furniture", price: 280, stock: 25 },
  { id: "3", name: "Eye-care LED Lamp", category: "Appliances", price: 45, stock: 80 },
];

export function ProductTableExample() {
  return (
    <DataTable
      columns={columns}
      data={mockData}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
      enableRowSelection={true}
      initialPageSize={10}
      searchPlaceholder="Search products..."
    />
  );
}
```

---

### 2. Using Low-level Primitives (Raw HTML Table)

If you only need a simple styled table without the TanStack Table engine:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@openway/ui";

export function SimpleTableExample() {
  return (
    <Table variant="striped" size="md">
      <TableCaption>Recent Invoices List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead align="right">Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#INV-001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell align="right">$1,200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#INV-002</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell align="right">$850.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right" className="font-bold">$2,050.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

---

### 3. Bulk Actions (Operations on Selected Rows)

`<DataTable>` supports `renderBulkActions` to display action buttons when rows are selected:

```tsx
import { DataTable, Button, createTableColumnHelper } from "@openway/ui";

export function BulkActionsExample() {
  return (
    <DataTable
      columns={columns}
      data={mockData}
      enableRowSelection={true}
      renderBulkActions={(selectedRows) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            color="error"
            variant="soft"
            onClick={() => {
              console.log("Delete rows:", selectedRows.map((r) => r.original));
            }}
          >
            Delete ({selectedRows.length})
          </Button>
          <Button size="sm" color="neutral" variant="outline">
            Export to Excel
          </Button>
        </div>
      )}
    />
  );
}
```

---

### 4. Server-Side Mode (Manual Mode)

When integrating with backend pagination and filtering APIs:

```tsx
import { useState } from "react";
import { DataTable } from "@openway/ui";
import type { PaginationState, SortingState } from "@openway/ui";

export function ServerSideTableExample() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  // Call API fetch hook from backend (e.g. TanStack Query)
  // const { data, isLoading } = useQuery(...)

  return (
    <DataTable
      columns={columns}
      data={apiData?.items ?? []}
      isLoading={isFetching}
      manualPagination={true}
      manualSorting={true}
      manualFiltering={true}
      pageCount={apiData?.totalPages ?? 1}
      rowCount={apiData?.totalItems ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      globalFilter={search}
      onGlobalFilterChange={setSearch}
    />
  );
}
```

---

### 5. Expandable Sub-Detail (Detail Panel with `renderExpandedRow` & `useQuery`)

When a user clicks to expand a row, you can render a custom child component. Inside this child component, you can use TanStack Query's `useQuery` hook to load detailed data on demand:

```tsx
import { useQuery } from "@tanstack/react-query";
import { DataTable, Skeleton } from "@openway/ui";

function OrderDetailPanel({ orderId }: { orderId: string }) {
  // useQuery only executes when parent row is expanded (component mount)
  const { data: orderDetail, isLoading } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => fetch(`/api/orders/${orderId}`).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="p-3">
        <Skeleton className="h-10 w-full rounded" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-neutral-50 rounded">
      <h4 className="font-semibold text-neutral-800">Order Details #{orderId}</h4>
      <p className="text-sm text-neutral-600">Shipping Address: {orderDetail?.shippingAddress}</p>
    </div>
  );
}

export function ExpandableDetailTableExample() {
  return (
    <DataTable
      columns={columns}
      data={ordersData}
      enableExpanding={true}
      renderExpandedRow={(row) => <OrderDetailPanel orderId={row.original.id} />}
    />
  );
}
```

---

### 6. Multi-level Recursive Tree Data (with `getSubRows`)

When sub-rows share the **same data shape and render IN-LINE & WITHIN THE SAME COLUMNS** as the parent table (supporting arbitrary parent ➔ child ➔ grandchild nesting), simply provide the `getSubRows` accessor. The component automatically renders nested rows across all columns with automatic indentation calculated by `row.depth`:

```tsx
import { DataTable, createTableColumnHelper } from "@openway/ui";

interface Department {
  id: string;
  name: string;
  leader: string;
  budget: number;
  subRows?: Department[]; // Nested departments
}

const deptColumnHelper = createTableColumnHelper<Department>();

const deptColumns = deptColumnHelper.columns([
  deptColumnHelper.accessor("name", {
    header: "Department Name",
  }),
  deptColumnHelper.accessor("leader", {
    header: "Department Head",
  }),
  deptColumnHelper.accessor("budget", {
    header: "Budget",
    cell: (info) => `${info.getValue().toLocaleString("en-US")} USD`,
  }),
]);

export function DepartmentTreeTableExample() {
  return (
    <DataTable
      columns={deptColumns}
      data={departmentsData}
      enableExpanding={true}
      getSubRows={(row) => row.subRows}
      maxIndentDepth={4}  // Limits indent depth to 4 levels to avoid layout squishing
      indentSize={1.25}   // 1.25rem per level
    />
  );
}
```

---

### 7. Advanced Toolbar Filters (`TableMenuFilter` & `TableFilterDef`)

`DataTable` includes the built-in `TableMenuFilter` component via the `filters` prop. Filters use a **Discriminated Union** structure customized for each field type:

- `string` / `text`: String text filter using `Input`.
- `number`: Numeric value filter with `min`, `max`, `step`.
- `date`: Single date picker using `DatePicker` with `minDate`, `maxDate`.
- `date-range`: Date range picker using `DateRangePicker`. Requires defining `endName` (e.g. `name: "createdAtStart"`, `endName: "createdAtEnd"`).
- `checkbox-group` / `select`: Multi-selection filter supporting both Client mode & Server mode (`searchable`, `searchMode="server"`, `onSearch`, `isLoading`, `preserveSelected`, `historicalOptionLabels`).
- `custom`: Custom rendering component via `renderEditor`.

> [!NOTE]
> For date-related filter types (`date` with `DatePicker` and `date-range` with `DateRangePicker`), note that locale is configured centrally via `OpenWayProvider` (since v2.0.0).

#### Declaration Example:

```tsx
import { DataTable, type TableFilterDef } from "@openway/ui";

const tableFilters: TableFilterDef[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Filter by name...",
  },
  {
    name: "role",
    label: "Role",
    type: "checkbox-group",
    searchable: true,
    options: [
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
  },
  {
    name: "createdAtStart",
    endName: "createdAtEnd",
    label: "Created Date",
    type: "date-range",
    placeholder: "Select date range...",
  },
];

export function UserTableWithFilters() {
  return (
    <DataTable
      columns={columns}
      data={users}
      filters={tableFilters}
      enableFiltering={true}
    />
  );
}
```

> **Note on Debounce & Resetting Filters**:
> Both `useTableQuery` and `useSelectInfiniteQuery` support **Dynamic Debounce**: typing queries debounces according to `debounceMs`, but clearing filter chips or resetting filters immediately sets latency to `0ms` to trigger instant API calls without waiting.

---

## ⚙️ Props Reference (Props Table)

### `<DataTable />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `columns` | `ColumnDef<DefaultTableFeatures, TData, unknown>[]` | **Required** | Column definitions array for the table |
| `data` | `TData[]` | **Required** | Array of data records to display |
| `variant` | `'default' \| 'striped' \| 'bordered'` | `'default'` | Visual styling variant of the table |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table padding and font size |
| `isLoading` | `boolean` | `false` | Enables loading state with Skeleton rows |
| `isRefresh` | `boolean` | `false` | Shows the refresh button on the toolbar |
| `onRefresh` | `() => void` | `undefined` | Callback invoked when the refresh button is clicked |
| `loadingRowsCount` | `number` | `5` | Number of skeleton rows displayed when `isLoading={true}` |
| `emptyText` | `string` | `undefined` | Text displayed when table has no data |
| `emptyIllustration` | `ReactNode` | `undefined` | Custom illustration rendered for empty table |
| `enableSorting` | `boolean` | `true` | Enables sorting on column header clicks |
| `enableFiltering` | `boolean` | `true` | Displays global search input on the toolbar |
| `enablePagination` | `boolean` | `true` | Enables pagination controls at table footer |
| `enableRowSelection`| `boolean` | `false` | Automatically adds a Checkbox column for row selection |
| `enableColumnVisibility` | `boolean` | `true` | Displays menu to toggle column visibility |
| `enableColumnOrdering` | `boolean` | `false` | Enables Drag-and-Drop Column Ordering |
| `columnOrder` | `string[]` | `undefined` | Controlled array of column IDs for ordering |
| `onColumnOrderChange` | `(order) => void` | `undefined` | Callback fired when column order changes via drag and drop |
| `enableExpanding` | `boolean` | `false` | Enables row expanding (auto-enabled if `renderExpandedRow` or `getSubRows` is provided) |
| `expanded` | `ExpandedState` | `undefined` | Controlled row expanded state |
| `onExpandedChange` | `(expanded) => void` | `undefined` | Callback fired when row expanded state changes |
| `getSubRows` | `(row, index) => TData[] \| undefined` | `undefined` | Function to retrieve child rows for multi-level tree data |
| `getRowCanExpand` | `(row) => boolean` | `undefined` | Custom predicate determining if a row is expandable |
| `renderExpandedRow` | `(row) => ReactNode` | `undefined` | Renders custom detail component (Detail Panel) spanning all columns |
| `showExpandColumn` | `boolean` | `true` | Automatically renders the expand toggle button when expanding is enabled |
| `expandColumnMode` | `'integrated' \| 'standalone' \| 'none'` | `'integrated'` | Mode for expand button (`integrated` merges into first column, `standalone` creates dedicated `_expand` column) |
| `expandColumnId` | `string` | `undefined` | Column ID to merge expand button into when `expandColumnMode='integrated'` (defaults to first content column) |
| `expandColumnPosition` | `'start' \| 'end'` | `'start'` | Column position for expand button in `standalone` mode |
| `maxIndentDepth` | `number` | `4` | Maximum tree indentation depth level (prevents layout degradation on deep trees) |
| `indentSize` | `number` | `1.25` | Indentation width per depth level in `rem` units |
| `manualExpanding` | `boolean` | `false` | Enables server-side manual row expansion |
| `autoResetExpanded` | `boolean` | `true` | Automatically collapses expanded rows when data changes |
| `paginateExpandedRows` | `boolean` | `true` | Paginates child rows together with primary table rows |
| `searchPlaceholder`| `string` | `"Search table..."` | Placeholder text for search input |
| `toolbarActions` | `ReactNode` | `undefined` | Additional action buttons on the right side of the toolbar |
| `renderBulkActions`| `(selectedRows) => ReactNode` | `undefined` | Renders bulk action buttons when rows are selected |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Available rows-per-page options |
| `initialPageSize` | `number` | `10` | Default initial number of rows per page |
| `manualPagination` | `boolean` | `false` | Enables server-side manual pagination |
| `manualSorting` | `boolean` | `false` | Enables server-side manual sorting |
| `manualFiltering` | `boolean` | `false` | Enables server-side manual search filtering |
| `pageCount` | `number` | `undefined` | Total page count (when using `manualPagination`) |
| `rowCount` | `number` | `undefined` | Total record count (when using `manualPagination`) |
| `onRowClick` | `(row) => void` | `undefined` | Click event callback on a table row |
| `className` | `string` | `""` | Custom CSS class for the outer wrapper |
| `containerClassName`| `string` | `""` | Custom CSS class for the table container box |

---

### `<DraggableTableHead />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `header` | `Header<DefaultTableFeatures, TData, TValue>` | **Required** | TanStack Table v9 Header object representing the column |
| `canSort` | `boolean` | `false` | Allows clicking to sort the column |
| `headerContent` | `ReactNode` | `undefined` | Content rendered inside the header cell |
| `ariaSort` | `'ascending' \| 'descending' \| 'none'` | `undefined` | WAI-ARIA aria-sort state on `<th>` tag |
| `disabled` | `boolean` | `false` | Disables drag-and-drop ordering for this specific column |
| `className` | `string` | `""` | Custom CSS class for the `<th>` element |

---

## ♿ Accessibility Standards (WAI-ARIA Accessibility)

- Employs complete semantic HTML table tags: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `<caption>`.
- `aria-sort="ascending" | "descending" | "none"` is bound directly to the `<th>` header element (`<TableHead />`) per WAI-ARIA standards (rather than on an inner `<button>`).
- `aria-selected="true"` and `data-state="selected"` applied to selected `<tr>` rows.
- Keyboard navigation: Column headers and pagination buttons feature prominent focus rings (`focus-visible:ring-2`), supporting `Enter` and `Space` activation.
- Sort buttons and interactive icons include comprehensive `aria-label` attributes for Screen Readers.
