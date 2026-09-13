# 📊 Hook `useTableQuery` (`@openway/ui/query`)

Hook adapter chuyên dụng kết nối **TanStack Query v5** (`useQuery`) với component `<Table />`, tự động hóa toàn bộ quy trình phân trang máy chủ (Server-side pagination), sắp xếp nhiều cột (Sorting), lọc dữ liệu (Filtering), và tối ưu UX qua `keepPreviousData`.

---

## 🌟 Điểm nổi bật

- **Tự động đồng bộ với Table**: Trả về trọn gói `tableProps` sẵn sàng spread thẳng vào `<Table {...tableProps} />`.
- **Server Pagination**: Quản lý `page` (1-indexed), `pageSize`, tự động chuyển trang và tính toán tổng số trang (`pageCount`).
- **Server Sorting**: Đồng bộ `sortBy` và `sortOrder` ("asc" | "desc") từ trạng thái click header của Table gửi lên server.
- **Server Filtering & Auto-Reset**: Tự động chuyển đổi mảng filter của TanStack Table thành dictionary phẳng `Record<string, unknown>`, tự động đưa trang về trang 1 khi người dùng thay đổi bộ lọc (`autoResetPageIndex`).
- **Giữ dữ liệu mượt mà (`keepPreviousData`)**: Dữ liệu trang cũ vẫn hiển thị trong lúc trang mới đang tải ngầm, loại bỏ hiện tượng nhấp nháy trắng bảng.
- **Zero `any`**: Type-safe 100% với Generic type `TData` và `TResponse`.

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

## 📖 Hướng dẫn sử dụng

### Phân trang, Sắp xếp & Lọc phía Máy chủ

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
    // Tự động bóc tách mảng dữ liệu và tổng số dòng từ response
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

## 🎛️ Bảng Options (`UseTableQueryOptions`)

| Tên Option | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `queryKey` | `readonly unknown[]` | **Bắt buộc** | Query key gốc của TanStack Query. |
| `queryFn` | `(params, context) => Promise<TResponse>` | **Bắt buộc** | Hàm fetch dữ liệu từ API nhận `TableQueryParams`. |
| `selectData` | `(res) => TData[]` | Tự trích xuất `data/items/results/rows` | Hàm lấy mảng dữ liệu từ API response. |
| `selectTotal` | `(res) => number` | Tự trích xuất `total/totalCount/count` | Hàm lấy tổng số bản ghi từ API response. |
| `initialPage` | `number` | `1` | Trang bắt đầu (1-indexed). |
| `initialPageSize` | `number` | `10` | Số dòng hiển thị mỗi trang. |
| `autoResetPageIndex` | `boolean` | `true` | Tự động quay về trang 1 khi đổi bộ lọc hoặc sắp xếp. |
| `debounceMs` | `number` | `300` | Thời gian trì hoãn debounce (ms) khi thay đổi bộ lọc ở chế độ server trước khi gọi API. Đặt 0 để tắt. |
| `queryOptions` | `Omit<UseQueryOptions, ...>` | `undefined` | Các cấu hình nâng cao của TanStack Query (`staleTime`, `refetchInterval`...). |

---

## 📦 Giá trị trả về (`UseTableQueryReturn`)

- `tableProps`: Gói props truyền thẳng vào `<Table />`:
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
- `query`: Query result từ `useQuery`.
- `queryParams`: Tham số truy vấn chuẩn hóa gửi lên API máy chủ (`page`, `pageSize`, `sortBy`, `sortOrder`, `filters`).
- `page`, `setPage`: Xem và thay đổi số trang hiện tại.
- `pageSize`, `setPageSize`: Xem và thay đổi số dòng/trang.
- `resetFilters`: Đặt lại toàn bộ bộ lọc.
