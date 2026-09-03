# 📊 Table & DataTable Component (`@openway/ui`)

Bộ component **Table** và **DataTable** chuyên nghiệp, tích hợp sâu với **TanStack Table v9** (`@tanstack/react-table@^9.2.4`), thiết kế chuẩn **Design System**, hỗ trợ **Kiến trúc module 3 tầng**, **Sorting**, **Fuzzy Search / Filtering**, **Pagination**, **Row Selection**, **Column Visibility**, **Loading Skeleton**, **Empty State**, và tuân thủ tiêu chuẩn tiếp cận **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Tích hợp TanStack Table v9 mới nhất**:
  - Tận dụng kiến trúc module hóa (`tableFeatures`) giúp tối ưu bundle size và tree-shaking.
  - Reactive state hiệu năng cao trên nền tảng **TanStack Store**, tương thích hoàn toàn với **React 19** và **React Compiler**.
- **Kiến trúc linh hoạt 3 tầng**:
  - **Tầng 1 - Low-level UI Primitives**: `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableFooter>`, `<TableRow>`, `<TableHead>`, `<TableCell>`, `<TableCaption>`. Dùng để dựng bảng HTML tùy biến theo phong cách Tailwind đồng bộ.
  - **Tầng 2 - Headless Hook & Helpers**: `useDataTable()`, `createTableColumnHelper()`, `defaultTableFeatures` cung cấp type inference mạnh mẽ khi cần xây dựng custom datagrid.
  - **Tầng 3 - High-level `<DataTable>`**: Component hoàn chỉnh "Plug & Play", sẵn sàng sử dụng với đầy đủ toolbar tìm kiếm, phân trang, chọn dòng, hiển thị cột.
- **Tính năng mạnh mẽ sẵn có**:
  - ↕️ **Sắp xếp (Sorting)**: Đa chế độ (Tăng dần, Giảm dần, Mặc định), hỗ trợ multi-sort và header tương tác trực quan.
  - 🔍 **Tìm kiếm & Lọc (Filtering)**: Thanh tìm kiếm toàn bảng (Global filter) mượt mà với nút xóa nhanh.
  - 📄 **Phân trang chuyên nghiệp (Pagination)**: Điều hướng trang đầu, trang trước, trang sau, trang cuối; chọn số dòng mỗi trang (10, 20, 50, 100).
  - ☑️ **Chọn dòng (Row Selection)**: Tự động render checkbox chọn từng dòng hoặc chọn toàn bộ dòng trên trang, kèm thanh hiển thị số lượng dòng đã chọn và khu vực Bulk Actions.
  - 👁️ **Ẩn/hiện cột (Column Visibility)**: Dropdown menu popover cho phép người dùng chủ động chọn cột cần xem.
  - ⏳ **Trạng thái tải & Rỗng thông minh**: Tự động render Skeleton rows khi `isLoading={true}` và hiển thị `<Empty>` minh họa khi bảng không có dữ liệu hoặc không tìm thấy kết quả tìm kiếm.
  - 🌐 **Hỗ trợ cả Client-side & Server-side (Manual Mode)**: Linh hoạt kết nối API phân trang, tìm kiếm từ máy chủ với `manualPagination`, `manualSorting`, `pageCount`, `rowCount`.
- **3 Kích cỡ hiển thị (`size`)**: `sm` (gọn gàng, dense), `md` (chuẩn - *mặc định*), `lg` (thoáng đãng).
- **3 Biến thể giao diện (`variant`)**: `default` (viền thanh lịch), `striped` (xen kẽ màu dòng), `bordered` (viền ô đầy đủ).

---

## 🚀 Cài đặt & Import

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
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Dựng DataTable hoàn chỉnh với TanStack Table v9

Sử dụng `createTableColumnHelper` để tạo định nghĩa cột có type-safety và truyền vào component `<DataTable>`:

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
    header: "Tên sản phẩm",
  }),
  columnHelper.accessor("category", {
    header: "Danh mục",
  }),
  columnHelper.accessor("price", {
    header: "Đơn giá",
    cell: (info) => `${info.getValue().toLocaleString("vi-VN")} đ`,
  }),
  columnHelper.accessor("stock", {
    header: "Tồn kho",
  }),
];

const mockData: Product[] = [
  { id: "1", name: "Bàn làm việc thông minh", category: "Nội thất", price: 3500000, stock: 12 },
  { id: "2", name: "Ghế công thái học", category: "Nội thất", price: 2800000, stock: 25 },
  { id: "3", name: "Đèn LED chống cận", category: "Thiết bị", price: 450000, stock: 80 },
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
      searchPlaceholder="Tìm kiếm sản phẩm..."
    />
  );
}
```

---

### 2. Sử dụng Low-level Primitives (Dựng bảng HTML thuần)

Nếu bạn chỉ cần một bảng dữ liệu đơn giản không cần engine TanStack Table:

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
      <TableCaption>Bảng kê hóa đơn gần nhất</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Mã HĐ</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead align="right">Tổng tiền</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#INV-001</TableCell>
          <TableCell>Nguyễn Văn A</TableCell>
          <TableCell align="right">1.200.000 đ</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#INV-002</TableCell>
          <TableCell>Trần Thị B</TableCell>
          <TableCell align="right">850.000 đ</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Tổng cộng</TableCell>
          <TableCell align="right" className="font-bold">2.050.000 đ</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

---

### 3. Bulk Actions (Hành động hàng loạt khi chọn dòng)

`<DataTable>` hỗ trợ `renderBulkActions` để hiển thị các nút thao tác khi có dòng được chọn:

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
              console.log("Xóa các dòng:", selectedRows.map((r) => r.original));
            }}
          >
            Xóa ({selectedRows.length})
          </Button>
          <Button size="sm" color="neutral" variant="outline">
            Xuất Excel
          </Button>
        </div>
      )}
    />
  );
}
```

---

### 4. Chế độ Server-Side (Manual Mode)

Khi làm việc với API phân trang và lọc dữ liệu từ Backend:

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

  // Gọi hook API fetch dữ liệu từ backend (ví dụ TanStack Query)
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

## ⚙️ Bảng thuộc tính (Props Table)

### `<DataTable />`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `columns` | `ColumnDef<DefaultTableFeatures, TData, unknown>[]` | **Bắt buộc** | Mảng định nghĩa các cột hiển thị trong bảng |
| `data` | `TData[]` | **Bắt buộc** | Mảng dữ liệu hiển thị |
| `variant` | `'default' \| 'striped' \| 'bordered'` | `'default'` | Biến thể giao diện của bảng |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Kích cỡ padding và font chữ của bảng |
| `isLoading` | `boolean` | `false` | Bật trạng thái đang tải dữ liệu với Skeleton rows |
| `isRefresh` | `boolean` | `false` | Bật nút làm mới dữ liệu (Refresh button) trên thanh công cụ |
| `onRefresh` | `() => void` | `undefined` | Callback được gọi khi người dùng bấm nút làm mới |
| `loadingRowsCount` | `number` | `5` | Số dòng skeleton hiển thị khi `isLoading={true}` |
| `emptyText` | `string` | `undefined` | Văn bản hiển thị khi bảng không có dữ liệu |
| `emptyIllustration` | `ReactNode` | `undefined` | Tùy biến illustration khi bảng rỗng |
| `enableSorting` | `boolean` | `true` | Bật tính năng sắp xếp khi click vào tiêu đề cột |
| `enableFiltering` | `boolean` | `true` | Hiển thị ô tìm kiếm toàn bảng trên toolbar |
| `enablePagination` | `boolean` | `true` | Bật thanh phân trang ở chân bảng |
| `enableRowSelection`| `boolean` | `false` | Tự động thêm cột Checkbox chọn dòng |
| `enableColumnVisibility` | `boolean` | `true` | Hiển thị menu bật/tắt ẩn hiện từng cột |
| `enableColumnOrdering` | `boolean` | `false` | Bật tính năng kéo thả thay đổi thứ tự các cột (Drag-and-Drop Column Ordering) |
| `columnOrder` | `string[]` | `undefined` | Trạng thái mảng thứ tự các cột điều khiển ngoài |
| `onColumnOrderChange` | `(order) => void` | `undefined` | Callback khi thứ tự cột thay đổi do kéo thả |
| `searchPlaceholder`| `string` | `"Tìm kiếm trong bảng..."` | Placeholder cho ô tìm kiếm |
| `toolbarActions` | `ReactNode` | `undefined` | Các nút hành động thêm ở góc phải toolbar |
| `renderBulkActions`| `(selectedRows) => ReactNode` | `undefined` | Render các nút hành động hàng loạt khi chọn dòng |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Danh sách tùy chọn số dòng hiển thị mỗi trang |
| `initialPageSize` | `number` | `10` | Số lượng dòng hiển thị mặc định mỗi trang |
| `manualPagination` | `boolean` | `false` | Bật chế độ phân trang từ máy chủ (Server-side) |
| `manualSorting` | `boolean` | `false` | Bật chế độ sắp xếp từ máy chủ (Server-side) |
| `manualFiltering` | `boolean` | `false` | Bật chế độ tìm kiếm từ máy chủ (Server-side) |
| `pageCount` | `number` | `undefined` | Tổng số trang (khi dùng `manualPagination`) |
| `rowCount` | `number` | `undefined` | Tổng số dòng dữ liệu thực tế (khi dùng `manualPagination`) |
| `onRowClick` | `(row) => void` | `undefined` | Sự kiện click chuột vào một dòng |
| `className` | `string` | `""` | Class tùy biến cho wrapper bên ngoài |
| `containerClassName`| `string` | `""` | Class tùy biến cho khối bao quanh thẻ table |

---

### `<DraggableTableHead />`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `header` | `Header<DefaultTableFeatures, TData, TValue>` | **Bắt buộc** | Đối tượng Header TanStack Table v9 đại diện cho cột |
| `canSort` | `boolean` | `false` | Cho phép click để sắp xếp dữ liệu của cột |
| `headerContent` | `ReactNode` | `undefined` | Nội dung phần tử bên trong tiêu đề |
| `ariaSort` | `'ascending' \| 'descending' \| 'none'` | `undefined` | Trạng thái WAI-ARIA aria-sort trên thẻ `<th>` |
| `disabled` | `boolean` | `false` | Vô hiệu hóa tính năng kéo thả cho cột chỉ định |
| `className` | `string` | `""` | Class tùy biến cho thẻ `<th>` |

---

## ♿ Tiêu chuẩn tiếp cận (WAI-ARIA Accessibility)

- Sử dụng đầy đủ các semantic tags: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `<caption>`.
- `aria-sort="ascending" | "descending" | "none"` cập nhật trực tiếp trên thẻ tiêu đề cột `<th>` (`<TableHead />`) theo chuẩn WAI-ARIA (thay vì đặt trên thẻ `<button>`).
- `aria-selected="true"` và `data-state="selected"` cập nhật trên các `<tr>` được chọn.
- Điều hướng bàn phím: Tiêu đề cột và các nút phân trang có focus ring nổi bật (`focus-visible:ring-2`), hỗ trợ phím `Enter` và `Space`.
- Thẻ `<button>` sắp xếp và icon đều có nhãn `aria-label` đầy đủ cho các công cụ đọc màn hình (Screen Reader).
