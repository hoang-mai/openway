import React, { useMemo, useState } from "react";
import type { Row } from "@tanstack/react-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
  DataTable,
  createTableColumnHelper,
  type DefaultTableFeatures,
  type TableFilterDef,
  type ColumnFiltersState,
  type ExpandedState,
} from "./index";
import { useTableQuery, type TableQueryParams } from "../../query";
import { Button } from "../button";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Nguyễn Văn A", email: "vana@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Trần Thị B", email: "thib@example.com", role: "Editor", status: "Inactive" },
  { id: 3, name: "Lê Văn C", email: "vanc@example.com", role: "Viewer", status: "Active" },
  { id: 4, name: "Phạm Minh D", email: "minhd@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Hoàng Tuấn E", email: "tuane@example.com", role: "Viewer", status: "Inactive" },
  { id: 6, name: "Đỗ Mai F", email: "maif@example.com", role: "Viewer", status: "Active" },
  { id: 7, name: "Vũ Hải G", email: "haig@example.com", role: "Admin", status: "Active" },
  { id: 8, name: "Bùi Kiên H", email: "kienh@example.com", role: "Editor", status: "Active" },
  { id: 9, name: "Đặng Thùy I", email: "thuyi@example.com", role: "Viewer", status: "Inactive" },
  { id: 10, name: "Dương Quốc K", email: "quock@example.com", role: "Viewer", status: "Active" },
  { id: 11, name: "Lý Bảo L", email: "baol@example.com", role: "Admin", status: "Active" },
  { id: 12, name: "Ngô Trọng M", email: "trongm@example.com", role: "Editor", status: "Active" },
];

const manyPagesRoles = ["Admin", "Editor", "Viewer", "Manager", "Analyst"];
const manyPagesStatuses = ["Active", "Inactive", "Pending"];

const manyPagesMockUsers: User[] = Array.from({ length: 65 }, (_, index) => {
  const id = index + 1;
  const role = manyPagesRoles[index % manyPagesRoles.length] ?? "Viewer";
  const status = manyPagesStatuses[index % manyPagesStatuses.length] ?? "Active";
  return {
    id,
    name: `Thành viên ${id}`,
    email: `member${id}@example.com`,
    role,
    status,
  };
});

const columnHelper = createTableColumnHelper<User>();

const defaultColumns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Họ và tên",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("role", {
    header: "Vai trò",
  }),
  columnHelper.accessor("status", {
    header: "Trạng thái",
  }),
]);

/**
 * Component demo tương tác dành riêng cho kiểm thử Kéo thả & Thứ tự cột (Column Ordering)
 */
function ColumnOrderingDemo({
  onColumnOrderChangeStub,
}: {
  onColumnOrderChangeStub?: (order: string[]) => void;
}) {
  const [order, setOrder] = useState<string[]>([
    "id",
    "name",
    "email",
    "role",
    "status",
  ]);

  const handleCustomReorder = () => {
    // Đảo ngược thứ tự các cột: status, role, email, name, id
    const reversed = ["status", "role", "email", "name", "id"];
    setOrder(reversed);
    onColumnOrderChangeStub?.(reversed);
  };

  const handleReset = () => {
    const original = ["id", "name", "email", "role", "status"];
    setOrder(original);
    onColumnOrderChangeStub?.(original);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            6. DataTable Kéo Thả &amp; Sắp Xếp Thứ Tự Cột (Column Ordering / Dnd)
          </h2>
          <p className="text-xs text-neutral-500">
            Hỗ trợ kéo thả thay đổi vị trí các cột với @dnd-kit và đồng bộ trạng thái điều khiển (Controlled `columnOrder`).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            id="reorder-columns-btn"
            size="sm"
            variant="outline"
            onClick={handleCustomReorder}
          >
            Đảo ngược cột (Programmatic)
          </Button>
          <Button
            id="reset-columns-btn"
            size="sm"
            variant="ghost"
            onClick={handleReset}
          >
            Đặt lại mặc định
          </Button>
        </div>
      </div>

      <div
        data-testid="current-order-display"
        className="text-xs font-mono text-neutral-700 bg-neutral-100 px-3 py-2 rounded-lg border border-neutral-200 flex items-center gap-1.5"
      >
        <span className="font-semibold text-neutral-900">Thứ tự cột hiện tại:</span>
        <span>{order.join(" ➔ ")}</span>
      </div>

      <DataTable
        columns={defaultColumns}
        data={mockUsers.slice(0, 3)}
        enableColumnOrdering={true}
        enablePagination={false}
        enableFiltering={false}
        columnOrder={order}
        onColumnOrderChange={(newOrder: string[]) => {
          setOrder(newOrder);
          onColumnOrderChangeStub?.(newOrder);
        }}
      />
    </div>
  );
}

const testFilters: TableFilterDef[] = [
  {
    name: "name",
    label: "Tên",
    type: "text",
    placeholder: "Lọc theo tên...",
  },
  {
    name: "role",
    label: "Vai trò",
    type: "checkbox-group",
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Editor", value: "Editor" },
      { label: "Viewer", value: "Viewer" },
    ],
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "checkbox-group",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    name: "createdAt",
    label: "Khoảng ngày",
    type: "date-range",
    placeholder: "Chọn khoảng ngày...",
  },
];

/**
 * Component kiểm thử tổng hợp đầy đủ 100% tính năng của DataTable
 */
function FullFeaturedTableDemo({
  onRowClickStub,
  onRefreshStub,
}: {
  onRowClickStub?: (row: Row<DefaultTableFeatures, User>) => void;
  onRefreshStub?: () => void;
}) {
  return (
    <div
      data-testid="full-featured-table-section"
      className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xl space-y-4 max-w-[1280px] mx-auto my-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            Bảng Dữ Liệu Toàn Diện (Full-Featured DataTable)
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Tích hợp đầy đủ: Sắp xếp (Sorting), Tìm kiếm (Global Search), Menu Bộ lọc (Select, Text, DateRange), Chọn dòng (Selection), Thao tác hàng loạt (Bulk Actions), Ẩn/Hiện cột (Visibility), Phân trang (Pagination), Nút tùy biến (Toolbar Actions), Làm mới (Refresh) và Click dòng (Row Click).
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shrink-0 self-start sm:self-auto">
          ✓ 100% Tính năng
        </span>
      </div>

      <DataTable
        columns={defaultColumns}
        data={mockUsers}
        filters={testFilters}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnVisibility={true}
        enableColumnOrdering={true}
        enableExpanding={true}
        renderExpandedRow={(row) => (
          <div data-testid={`full-detail-${row.original.id}`} className="p-4 bg-neutral-50/80 rounded-lg space-y-1">
            <h4 className="font-semibold text-neutral-800">Thông tin chi tiết: {row.original.name}</h4>
            <p className="text-xs text-neutral-600">Email: {row.original.email} | Vai trò: {row.original.role}</p>
            <p className="text-xs text-neutral-600">Trạng thái tài khoản: {row.original.status}</p>
          </div>
        )}
        onRefresh={onRefreshStub}
        pageSizeOptions={[5, 10, 20]}
        initialPageSize={5}
        searchPlaceholder="Tìm kiếm toàn bảng..."
        onRowClick={onRowClickStub}
        toolbarActions={
          <div className="flex items-center gap-2">
            <Button id="export-excel-btn" size="sm" variant="outline">
              Xuất Excel
            </Button>
            <Button id="create-user-btn" size="sm" color="primary">
              + Thêm người dùng
            </Button>
          </div>
        }
        renderBulkActions={(selectedRows) => (
          <Button
            id="bulk-delete-btn"
            size="sm"
            color="error"
            variant="soft"
          >
            Xóa ({selectedRows.length})
          </Button>
        )}
      />
    </div>
  );
}

interface ServerUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockServerDb: ServerUser[] = [
  { id: "1", name: "Nguyễn Văn A", email: "vana@example.com", role: "Admin" },
  { id: "2", name: "Trần Thị B", email: "thib@example.com", role: "Editor" },
  { id: "3", name: "Lê Văn C", email: "vanc@example.com", role: "Viewer" },
  { id: "4", name: "Phạm Minh D", email: "minhd@example.com", role: "Admin" },
  { id: "5", name: "Hoàng Tuấn E", email: "tuane@example.com", role: "Editor" },
  { id: "6", name: "Đỗ Mai F", email: "maif@example.com", role: "Viewer" },
  { id: "7", name: "Vũ Hải G", email: "haig@example.com", role: "Admin" },
  { id: "8", name: "Bùi Kiên H", email: "kienh@example.com", role: "Editor" },
];

function TableQueryInner() {
  const helper = createTableColumnHelper<ServerUser>();
  const columns = useMemo(
    () => [
      helper.accessor("id", { header: "ID" }),
      helper.accessor("name", { header: "Họ và tên" }),
      helper.accessor("email", { header: "Email" }),
      helper.accessor("role", { header: "Vai trò" }),
    ],
    [helper]
  );

  const { tableProps, queryParams, resetAll } = useTableQuery<
    ServerUser,
    { items: ServerUser[]; total: number }
  >({
    queryKey: ["test-users"],
    initialPagination: { pageSize: 3 },
    queryFn: async (params: TableQueryParams) => {
      let result = [...mockServerDb];
      if (params.filters?.role && Array.isArray(params.filters.role) && params.filters.role.length > 0) {
        result = result.filter((u) => (params.filters?.role as string[]).includes(u.role));
      }
      const total = result.length;
      const start = (params.page - 1) * params.pageSize;
      const paged = result.slice(start, start + params.pageSize);
      return { items: paged, total };
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <span data-testid="query-page-display">Trang: {queryParams.page}</span>
          <span className="text-xs text-neutral-500">Tổng 8 dòng</span>
        </div>
        <Button id="reset-query-btn" data-testid="reset-query-btn" size="sm" variant="outline" onClick={resetAll}>
          Reset Query
        </Button>
      </div>
      <DataTable
        columns={columns}
        filters={[
          {
            name: "role",
            label: "Vai trò",
            type: "select",
            options: [
              { label: "Admin", value: "Admin" },
              { label: "Editor", value: "Editor" },
            ],
          },
        ]}
        {...tableProps}
      />
    </div>
  );
}

interface OrgNode {
  id: string;
  name: string;
  leader: string;
  subRows?: OrgNode[];
}

const orgData: OrgNode[] = [
  {
    id: "root-1",
    name: "Khối Công Nghệ",
    leader: "Nguyễn Văn A",
    subRows: [
      {
        id: "child-1-1",
        name: "Trung Tâm Phần Mềm",
        leader: "Trần Văn B",
        subRows: [
          {
            id: "grandchild-1-1-1",
            name: "Nhóm Frontend",
            leader: "Lê Thị C",
          },
        ],
      },
      {
        id: "child-1-2",
        name: "Trung Tâm Hạ Tầng",
        leader: "Vũ Hải G",
      },
    ],
  },
  {
    id: "root-2",
    name: "Khối Kinh Doanh",
    leader: "Đỗ Mai F",
  },
];

const orgColumnHelper = createTableColumnHelper<OrgNode>();
const orgCols = orgColumnHelper.columns([
  orgColumnHelper.accessor("id", { header: "Mã" }),
  orgColumnHelper.accessor("name", { header: "Tên đơn vị" }),
  orgColumnHelper.accessor("leader", { header: "Trưởng đơn vị" }),
]);

const singleMountQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function PrimitivesDemo() {
  return (
    <section
      data-testid="primitives-section"
      className="space-y-6 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <h2 className="text-lg font-semibold text-neutral-900">
        1. Low-level UI Primitives
      </h2>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-neutral-700">
          1.1 Bảng cơ bản (Default variant & md size)
        </h3>
        <Table data-testid="primitive-table" variant="default" size="md">
          <TableCaption>Bảng kê doanh số mẫu</TableCaption>
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
              <TableCell align="right" className="font-bold">
                2.050.000 đ
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-700">
            1.2 Striped Variant (Size sm)
          </h3>
          <Table variant="striped" size="sm" data-testid="striped-table">
            <TableHeader>
              <TableRow>
                <TableHead>Cột A</TableHead>
                <TableHead>Cột B</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dòng 1</TableCell>
                <TableCell>Giá trị 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dòng 2</TableCell>
                <TableCell>Giá trị 2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dòng 3</TableCell>
                <TableCell>Giá trị 3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-700">
            1.3 Bordered Variant (Size lg)
          </h3>
          <Table variant="bordered" size="lg" data-testid="bordered-table">
            <TableHeader>
              <TableRow>
                <TableHead>Cột X</TableHead>
                <TableHead align="center">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dòng X1</TableCell>
                <TableCell align="center">Hoàn tất</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dòng X2</TableCell>
                <TableCell align="center">Đang xử lý</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

function InteractiveTableDemo({
  onRowClickStub,
  onRefreshStub,
}: {
  onRowClickStub?: (row: Row<DefaultTableFeatures, User>) => void;
  onRefreshStub?: () => void;
}) {
  return (
    <section
      data-testid="interactive-datatable-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          2. High-level DataTable (Đầy đủ tính năng TanStack Table v9)
        </h2>
        <p className="text-xs text-neutral-500">
          Hỗ trợ sắp xếp (Sorting), tìm kiếm toàn bảng (Global filter), phân trang (Pagination), chọn dòng (Row selection) và ẩn/hiện cột (Column visibility).
        </p>
      </div>

      <DataTable
        columns={defaultColumns}
        data={mockUsers}
        isRefresh={true}
        onRefresh={onRefreshStub}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnVisibility={true}
        enableColumnOrdering={true}
        pageSizeOptions={[5, 10, 20]}
        initialPageSize={5}
        searchPlaceholder="Tìm kiếm trong bảng..."
        onRowClick={onRowClickStub}
        renderBulkActions={(selectedRows) => (
          <Button
            id="bulk-delete-btn"
            size="sm"
            color="error"
            variant="soft"
          >
            Xóa ({selectedRows.length})
          </Button>
        )}
      />
    </section>
  );
}

function LoadingTableDemo() {
  return (
    <section
      data-testid="loading-datatable-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          3. DataTable ở trạng thái Đang tải (Loading Skeleton)
        </h2>
        <p className="text-xs text-neutral-500">
          Tự động hiển thị các dòng Skeleton hoạt họa tương ứng số cột khi isLoading=true.
        </p>
      </div>

      <DataTable
        columns={defaultColumns}
        data={[]}
        isLoading={true}
        loadingRowsCount={3}
        enableFiltering={false}
        enablePagination={false}
      />
    </section>
  );
}

function EmptyTableDemo() {
  return (
    <section
      data-testid="empty-datatable-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          4. DataTable ở trạng thái Rỗng (Empty State)
        </h2>
        <p className="text-xs text-neutral-500">
          Hiển thị Empty illustration và thông điệp tùy biến khi data=[].
        </p>
      </div>

      <DataTable
        columns={defaultColumns}
        data={[]}
        emptyText="Không có dữ liệu trong bảng"
        enableFiltering={false}
        enablePagination={false}
      />
    </section>
  );
}

function ManyPagesTableDemo() {
  return (
    <section
      data-testid="many-pages-datatable-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          5. DataTable Phân trang Nhiều Trang (65 dòng - 13 trang &amp; Ellipsis &apos;...&apos;)
        </h2>
        <p className="text-xs text-neutral-500">
          Kiểm thử phân trang danh sách lớn gồm 65 bản ghi (13 trang, 5 dòng/trang). Kiểm tra tính năng thu gọn dấu &apos;...&apos; khi ở trang đầu, trang cuối và các trang ở giữa.
        </p>
      </div>

      <DataTable
        columns={defaultColumns}
        data={manyPagesMockUsers}
        initialPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        enablePagination={true}
        enableSorting={true}
        enableFiltering={true}
        searchPlaceholder="Tìm kiếm trong 65 thành viên..."
      />
    </section>
  );
}

function FilterTableDemo({
  onColumnFiltersChangeStub,
}: {
  onColumnFiltersChangeStub?: (filters: ColumnFiltersState) => void;
}) {
  return (
    <div className="space-y-6">
      <section
        data-testid="client-filter-datatable-section"
        className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
      >
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            7.1 DataTable Bộ Lọc Menu (Client-side Filtering &amp; Rounded Full UI)
          </h2>
          <p className="text-xs text-neutral-500">
            Hỗ trợ hiển thị bộ lọc menu SelectMenuFilter với chip bo tròn rounded-full, ô tìm kiếm rounded-full, lọc tức thì trên client.
          </p>
        </div>

        <DataTable
          columns={defaultColumns}
          data={mockUsers}
          filters={testFilters}
          manualFiltering={false}
          enableFiltering={true}
          enablePagination={false}
          searchPlaceholder="Tìm kiếm nhanh client..."
        />
      </section>

      <section
        data-testid="server-filter-datatable-section"
        className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
      >
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            7.2 DataTable Bộ Lọc Menu (Server-side Filtering &amp; Client-side Global Search)
          </h2>
          <p className="text-xs text-neutral-500">
            Khi manualFiltering=true, bộ lọc cột bắn sự kiện onColumnFiltersChange mà không lọc client, trong khi ô tìm kiếm toàn bảng (globalFilter) vẫn tự động lọc client-side native!
          </p>
        </div>

        <DataTable
          columns={defaultColumns}
          data={mockUsers}
          filters={testFilters}
          manualFiltering={true}
          onColumnFiltersChange={onColumnFiltersChangeStub}
          enableFiltering={true}
          enablePagination={false}
          searchPlaceholder="Tìm kiếm nhanh server data..."
        />
      </section>
    </div>
  );
}

function TableQueryDemo() {
  return (
    <section
      data-testid="table-query-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          8. Server-side Query DataTable (useTableQuery)
        </h2>
        <p className="text-xs text-neutral-500">
          Tích hợp adapter hook useTableQuery từ @openway/ui kết nối TanStack Query với DataTable.
        </p>
      </div>
      <QueryClientProvider client={singleMountQueryClient}>
        <TableQueryInner />
      </QueryClientProvider>
    </section>
  );
}

function DetailPanelDemo() {
  return (
    <section
      data-testid="expanding-detail-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          9. DataTable Mở Rộng Dòng Chi Tiết (renderExpandedRow)
        </h2>
        <p className="text-xs text-neutral-500">
          Nút mở rộng được tích hợp trực tiếp vào cột đầu tiên, tuyệt đối không có nút mở rộng trên header.
        </p>
      </div>
      <DataTable
        columns={defaultColumns}
        data={mockUsers.slice(0, 3)}
        enableExpanding={true}
        renderExpandedRow={(row) => (
          <div data-testid={`detail-content-${row.original.id}`} className="p-3">
            <p>Chi tiết người dùng: {row.original.name}</p>
            <p>Email: {row.original.email}</p>
          </div>
        )}
      />
    </section>
  );
}

function TreeDataDemo() {
  return (
    <section
      data-testid="expanding-tree-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          10. DataTable Dữ Liệu Cây Phân Cấp (Multi-level Tree Data)
        </h2>
        <p className="text-xs text-neutral-500">
          Dòng con hiển thị cùng hàng và cột với cha, tự động thụt lề, dòng lá có ký hiệu ↳.
        </p>
      </div>
      <DataTable
        columns={orgCols}
        data={orgData}
        enableExpanding={true}
        getSubRows={(row) => row.subRows}
        maxIndentDepth={3}
      />
    </section>
  );
}

function CustomExpandColumnDemo() {
  return (
    <section
      data-testid="expanding-custom-col-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          11. DataTable Mở Rộng Cột Tùy Chọn (expandColumnId=&quot;email&quot;)
        </h2>
        <p className="text-xs text-neutral-500">
          Tích hợp nút Chevron vào cột Email thay vì cột ID.
        </p>
      </div>
      <DataTable
        columns={defaultColumns}
        data={mockUsers.slice(0, 3)}
        enableExpanding={true}
        expandColumnMode="integrated"
        expandColumnId="email"
        renderExpandedRow={(row) => (
          <div data-testid={`custom-expand-detail-${row.original.id}`} className="p-3">
            Detail of {row.original.name}
          </div>
        )}
      />
    </section>
  );
}

function StandaloneExpandColumnDemo() {
  return (
    <section
      data-testid="expanding-standalone-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          12. DataTable Mở Rộng Cột Độc Lập (expandColumnMode=&quot;standalone&quot;)
        </h2>
        <p className="text-xs text-neutral-500">
          Cột expand riêng biệt (standalone), header không có nút toggle all.
        </p>
      </div>
      <DataTable
        columns={defaultColumns}
        data={mockUsers.slice(0, 3)}
        enableExpanding={true}
        expandColumnMode="standalone"
        renderExpandedRow={(row) => (
          <div data-testid={`standalone-detail-${row.original.id}`} className="p-3">
            Standalone detail: {row.original.name}
          </div>
        )}
      />
    </section>
  );
}

function ControlledExpandDemo() {
  const [expanded, setExpanded] = useState<ExpandedState>({ "0": true });

  return (
    <section
      data-testid="expanding-controlled-section"
      className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            13. DataTable Trạng Thái Mở Rộng Có Điều Khiển (Controlled Expanded State)
          </h2>
          <p className="text-xs text-neutral-500">
            Điều khiển đóng/mở hàng từ state bên ngoài thông qua expanded và onExpandedChange.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            id="btn-expand-all"
            size="sm"
            variant="outline"
            onClick={() => setExpanded(true)}
          >
            Mở tất cả
          </Button>
          <Button
            id="btn-collapse-all"
            size="sm"
            variant="ghost"
            onClick={() => setExpanded({})}
          >
            Đóng tất cả
          </Button>
        </div>
      </div>
      <div
        data-testid="controlled-state-display"
        className="text-xs font-mono text-neutral-700 bg-neutral-100 px-3 py-2 rounded-lg border border-neutral-200"
      >
        State: {JSON.stringify(expanded)}
      </div>
      <DataTable
        columns={defaultColumns}
        data={mockUsers.slice(0, 3)}
        enableExpanding={true}
        expanded={expanded}
        onExpandedChange={setExpanded}
        renderExpandedRow={(row) => (
          <div data-testid={`controlled-detail-${row.original.id}`} className="p-3">
            Controlled detail: {row.original.name}
          </div>
        )}
      />
    </section>
  );
}

function ServerDebounceFilterDemo({
  queryFnStub,
}: {
  queryFnStub?: (params: TableQueryParams) => void;
}) {
  const debounceFilters: TableFilterDef[] = [
    {
      name: "name",
      label: "Tên",
      type: "text",
      placeholder: "Nhập tên...",
    },
    {
      name: "age",
      label: "Tuổi",
      type: "number",
      placeholder: "Nhập tuổi...",
    },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      options: [
        { label: "Admin", value: "Admin" },
        { label: "Editor", value: "Editor" },
      ],
    },
    {
      name: "createdAt",
      label: "Khoảng ngày",
      type: "date-range",
      placeholder: "Chọn khoảng ngày...",
    },
  ];

  const { tableProps } = useTableQuery<User, { items: User[]; total: number }>({
    queryKey: ["debounce-users"],
    debounceMs: 150,
    queryFn: async (params) => {
      queryFnStub?.(params);
      return { items: mockUsers, total: mockUsers.length };
    },
  });

  return (
    <div data-testid="server-debounce-section" className="p-6 bg-white rounded-xl">
      <DataTable
        columns={defaultColumns}
        filters={debounceFilters}
        {...tableProps}
        enableFiltering={true}
        enablePagination={false}
      />
    </div>
  );
}

/**
 * Single Mount Test Harness Component
 * Gom toàn bộ các trường hợp kiểm thử (Primitives, DataTable, Loading, Empty, Ordering, Filters, useTableQuery, Expanding)
 * vào chung một lần mount duy nhất để dễ dàng quan sát và kiểm thử trực quan trên Cypress.
 */
function TableSingleMountHarness({
  onRowClickStub,
  onRefreshStub,
  onColumnOrderChangeStub,
  onColumnFiltersChangeStub,
}: {
  onRowClickStub?: (row: Row<DefaultTableFeatures, User>) => void;
  onRefreshStub?: () => void;
  onColumnOrderChangeStub?: (order: string[]) => void;
  onColumnFiltersChangeStub?: (filters: ColumnFiltersState) => void;
}) {
  return (
    <div
      data-testid="desktop-screen-container"
      className="p-4 sm:p-8 bg-neutral-900/90 min-h-screen text-neutral-800 flex flex-col items-center justify-start font-sans"
    >
      {/* Khung mô phỏng màn hình máy tính (Desktop Screen / Browser Mockup) */}
      <div className="w-full max-w-[1360px] rounded-2xl border border-neutral-700 bg-white shadow-2xl overflow-hidden flex flex-col">
        {/* Thanh tiêu đề cửa sổ máy tính (macOS/Desktop Window Header) */}
        <div className="h-11 bg-neutral-100 border-b border-neutral-200 px-4 flex items-center justify-between select-none">
          {/* 3 nút cửa sổ macOS */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-rose-600/30" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-600/30" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-emerald-600/30" />
          </div>

          {/* Thanh địa chỉ URL & Độ phân giải màn hình máy tính */}
          <div className="flex items-center gap-2 px-4 py-1 bg-white rounded-lg text-xs text-neutral-600 border border-neutral-200 shadow-xs max-w-md w-full justify-center">
            <span className="text-neutral-400">🖥️</span>
            <span className="font-mono text-neutral-500">https://openway.design/components/table</span>
            <span className="text-neutral-300">|</span>
            <span className="text-[11px] font-semibold text-primary-600">Desktop 1440 × 900</span>
          </div>

          {/* Huy hiệu chỉ báo màn hình */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Màn hình máy tính</span>
          </div>
        </div>

        {/* Nội dung bên trong màn hình máy tính */}
        <div className="p-8 space-y-12 bg-neutral-50/60 min-h-[800px]">
          <header className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Table &amp; DataTable Component Test Suite (Desktop Screen)
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                Toàn bộ các trường hợp kiểm thử (Primitives, Interactive DataTable, Loading Skeleton, Empty State, Many Pages Pagination) hiển thị trong khung màn hình máy tính chuẩn 1440px.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-200 shrink-0 self-start sm:self-auto">
              🖥️ Độ phân giải Desktop
            </div>
          </header>

          {/* 0. Bảng Dữ Liệu Toàn Diện (Full-Featured DataTable Showcase) */}
          <FullFeaturedTableDemo
            onRowClickStub={onRowClickStub}
            onRefreshStub={onRefreshStub}
          />

          <PrimitivesDemo />
          <InteractiveTableDemo
            onRowClickStub={onRowClickStub}
            onRefreshStub={onRefreshStub}
          />
          <LoadingTableDemo />
          <EmptyTableDemo />
          <ManyPagesTableDemo />
          <section
            data-testid="ordering-datatable-section"
            className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
          >
            <ColumnOrderingDemo onColumnOrderChangeStub={onColumnOrderChangeStub} />
          </section>
          <FilterTableDemo onColumnFiltersChangeStub={onColumnFiltersChangeStub} />
          <TableQueryDemo />
          <DetailPanelDemo />
          <TreeDataDemo />
          <CustomExpandColumnDemo />
          <StandaloneExpandColumnDemo />
          <ControlledExpandDemo />
        </div>
      </div>
    </div>
  );
}

describe("Table & DataTable Component Tests", () => {
  beforeEach(() => {
    // Đặt khung nhìn chuẩn màn hình máy tính Desktop 1440 x 900
    cy.viewport(1440, 900);
  });

  it("1. Toàn bộ 11 Component trên cùng 1 màn hình máy tính (Single Mount Harness)", () => {
    const onRowClick = cy.stub().as("onRowClick");
    const onRefresh = cy.stub().as("onRefresh");
    const onColumnOrderChange = cy.stub().as("onColumnOrderChange");
    const onColumnFiltersChange = cy.stub().as("onColumnFiltersChange");

    // Chỉ mount đúng 1 lần duy nhất cho toàn bộ test suite!
    cy.mount(
      <TableSingleMountHarness
        onRowClickStub={onRowClick}
        onRefreshStub={onRefresh}
        onColumnOrderChangeStub={onColumnOrderChange}
        onColumnFiltersChangeStub={onColumnFiltersChange}
      />
    );

    // Xác nhận khung màn hình máy tính đã được mount thành công
    cy.get("[data-testid='desktop-screen-container']").should("exist");

    // ==========================================
    // 1. Kiểm tra Low-level UI Primitives
    // ==========================================
    cy.get("[data-testid='primitives-section']").within(() => {
      // 1.1 Basic Table structure
      cy.get("[data-testid='primitive-table']").should("exist");
      cy.get("table").should("exist");
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");
      cy.get("tfoot").should("exist");
      cy.get("caption").contains("Bảng kê doanh số mẫu").should("be.visible");
      cy.contains("Mã HĐ").should("be.visible");
      cy.contains("#INV-001").should("be.visible");
      cy.contains("Tổng cộng").should("be.visible");
      cy.contains("2.050.000 đ").should("be.visible");

      // 1.2 Variants
      cy.get("[data-testid='striped-table']").should("exist");
      cy.get("[data-testid='bordered-table']").should("exist");
    });

    // ==========================================
    // 2. Kiểm tra DataTable (TanStack Table v9)
    // ==========================================
    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      // 2.1 Khởi tạo và hiển thị cột, dòng ban đầu
      cy.contains("Họ và tên").should("be.visible");
      cy.contains("Email").should("be.visible");
      cy.contains("Vai trò").should("be.visible");
      cy.contains("Trạng thái").should("be.visible");

      // Trang 1 với pageSize = 5: hiển thị 5 dòng đầu
      cy.get("tbody tr").should("have.length", 5);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.contains("Trần Thị B").should("be.visible");
      cy.contains("Lê Văn C").should("be.visible");
      cy.contains("Phạm Minh D").should("be.visible");
      cy.contains("Hoàng Tuấn E").should("be.visible");

      // Nút số trang ban đầu
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.get("button[aria-label='Trang 2']").should("be.visible");
      cy.get("button[aria-label='Trang 3']").should("be.visible");

      // 2.2 Kiểm tra Sắp xếp (Sorting) & chuẩn tiếp cận WAI-ARIA
      cy.contains("button", "Họ và tên").should("not.have.attr", "aria-sort");
      cy.contains("button", "Họ và tên").click();
      // Kiểm tra aria-sort hợp lệ trên thẻ th (role columnheader) thay vì thẻ button
      cy.contains("th", "Họ và tên").should("have.attr", "aria-sort", "ascending");
      // Sau khi sắp xếp tăng dần, dòng đầu tiên sẽ là "Bùi Kiên H"
      cy.get("tbody tr").first().should("contain.text", "Bùi Kiên H");

      // Sắp xếp giảm dần
      cy.contains("button", "Họ và tên").click();
      cy.contains("th", "Họ và tên").should("have.attr", "aria-sort", "descending");
      cy.get("tbody tr").first().should("contain.text", "Đỗ Mai F");

      // Click sort lại ID để đưa về thứ tự chuẩn
      cy.contains("button", "ID").click();

      // 2.3 Kiểm tra Tìm kiếm toàn bảng (Global Filter)
      cy.get("input[placeholder='Tìm kiếm trong bảng...']").type("Nguyễn Văn A");
      cy.get("tbody tr").should("have.length", 1);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.contains("Trần Thị B").should("not.exist");

      // Xóa từ khóa tìm kiếm qua nút clear
      cy.get("button[aria-label='Xóa tìm kiếm']").click();
      cy.get("tbody tr").should("have.length", 5);

      // 2.4 Kiểm tra Phân trang (Pagination)
      cy.get("button[aria-label='Trang sau']").click();
      cy.get("button[aria-label='Trang 2']").should("have.attr", "aria-current", "page");

      cy.get("button[aria-label='Trang trước']").click();
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");

      // Click trực tiếp vào nút số trang 3
      cy.get("button[aria-label='Trang 3']").click();
      cy.get("button[aria-label='Trang 3']").should("have.attr", "aria-current", "page");
      cy.get("button[aria-label='Trang đầu']").click();
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");

      // Thay đổi page size sang 10 dòng/trang qua component Select
      cy.get("[data-testid='table-page-size-selector']").click();
    });
    cy.get("[role='listbox']").contains("10").click();
    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 10);
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.get("button[aria-label='Trang 2']").should("be.visible");
      cy.get("button[aria-label='Trang 3']").should("not.exist");

      // Đưa page size về lại 5 để kiểm tra chọn dòng theo trang
      cy.get("[data-testid='table-page-size-selector']").click();
    });
    cy.get("[role='listbox']").contains("5").click();
    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 5);

      // 2.5 Kiểm tra Chọn dòng (Row Selection & Bulk Actions)
      // Chọn tất cả dòng trên trang
      cy.get("input[aria-label='Chọn tất cả các dòng trên trang này']").check({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (5)");

      // Bỏ chọn tất cả
      cy.get("input[aria-label='Chọn tất cả các dòng trên trang này']").uncheck({ force: true });
      cy.get("#bulk-delete-btn").should("not.exist");

      // Chọn 1 dòng đơn lẻ
      cy.get("tbody tr").first().find("input[type='checkbox']").check({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (1)");

      // Bỏ chọn dòng đó
      cy.get("tbody tr").first().find("input[type='checkbox']").uncheck({ force: true });

      // 2.6 Kiểm tra Ẩn/hiện cột (Column Visibility)
      cy.contains("button", "Cột").click();
    });

    // Popover hiển thị ngoài DOM (FloatingPortal) nên query từ root
    cy.contains("Hiển thị cột").should("be.visible");
    // Click bỏ chọn hiển thị cột "Email"
    cy.contains("label", "Email").within(() => {
      cy.get("input[type='checkbox']").uncheck({ force: true });
    });

    // Xác nhận cột Email đã bị ẩn trong bảng
    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      cy.contains("th", "Email").should("not.exist");
    });

    // Bật lại cột Email
    cy.contains("label", "Email").within(() => {
      cy.get("input[type='checkbox']").check({ force: true });
    });
    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      cy.contains("th", "Email").should("be.visible");
    });

    // 2.7 Kiểm tra sự kiện onRowClick
    cy.get("[data-testid='interactive-datatable-section'] tbody tr").first().click();
    cy.get("@onRowClick").should("have.been.calledOnce");

    // 2.8 Kiểm tra nút làm mới dữ liệu chủ động (isRefresh / onRefresh)
    cy.get("[data-testid='interactive-datatable-section'] [data-testid='table-refresh-button']")
      .should("be.visible")
      .click();
    cy.get("@onRefresh").should("have.been.calledOnce");

    // 2.9 Kiểm tra tính năng kéo thả sắp xếp cột (Column Ordering / Dnd)
    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      // Các cột có thuộc tính data-column-id và class hỗ trợ kéo thả cursor-grab
      cy.get("th[data-column-id='id']").should("exist").and("have.class", "cursor-grab");
      cy.get("th[data-column-id='name']").should("exist").and("have.class", "cursor-grab");
      cy.get("th[data-column-id='email']").should("exist").and("have.class", "cursor-grab");
      cy.get("th[data-column-id='role']").should("exist").and("have.class", "cursor-grab");
      cy.get("th[data-column-id='status']").should("exist").and("have.class", "cursor-grab");
      // Cột checkbox không kéo thả
      cy.get("th[data-column-id='_select']").should("not.have.class", "cursor-grab");
    });

    // ==========================================
    // 3. Kiểm tra Loading Skeleton State
    // ==========================================
    cy.get("[data-testid='loading-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 3);
      cy.get("tbody tr").first().find("td").should("have.length", defaultColumns.length);
    });

    // ==========================================
    // 4. Kiểm tra Empty State
    // ==========================================
    cy.get("[data-testid='empty-datatable-section']").within(() => {
      cy.contains("Không có dữ liệu trong bảng").should("be.visible");
    });

    // ==========================================
    // 5. Kiểm tra Phân trang Nhiều Trang (Many Pages & Ellipsis '...')
    // ==========================================
    cy.get("[data-testid='many-pages-datatable-section']").within(() => {
      // 5.1 Ban đầu ở trang 1: hiển thị 5 dòng đầu và nút 1, 2, 3, 4, 5, ..., 13
      cy.get("tbody tr").should("have.length", 5);
      cy.contains("Thành viên 1").should("be.visible");
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.get("button[aria-label='Trang 2']").should("be.visible");
      cy.get("button[aria-label='Trang 3']").should("be.visible");
      cy.get("button[aria-label='Trang 4']").should("be.visible");
      cy.get("button[aria-label='Trang 5']").should("be.visible");
      cy.contains("span", "...").should("be.visible");
      cy.get("button[aria-label='Trang 13']").should("be.visible");

      // 5.2 Click nút "Trang cuối" -> nhảy đến trang 13
      cy.get("button[aria-label='Trang cuối']").click();
      cy.contains("Thành viên 61").should("be.visible");
      cy.get("button[aria-label='Trang 13']").should("have.attr", "aria-current", "page");
      // Khi ở cuối: hiển thị 1, ..., 9, 10, 11, 12, 13
      cy.get("button[aria-label='Trang 1']").should("be.visible");
      cy.contains("span", "...").should("be.visible");
      cy.get("button[aria-label='Trang 9']").should("be.visible");
      cy.get("button[aria-label='Trang 10']").should("be.visible");
      cy.get("button[aria-label='Trang 11']").should("be.visible");
      cy.get("button[aria-label='Trang 12']").should("be.visible");

      // 5.3 Click nút số trang 9 -> nhảy vào khoảng giữa
      cy.get("button[aria-label='Trang 9']").click();
      cy.get("button[aria-label='Trang 9']").should("have.attr", "aria-current", "page");
      // Khi ở giữa trang 9: hiển thị 1, ..., 8, 9, 10, ..., 13
      cy.get("button[aria-label='Trang 1']").should("be.visible");
      cy.get("button[aria-label='Trang 8']").should("be.visible");
      cy.get("button[aria-label='Trang 10']").should("be.visible");
      cy.get("button[aria-label='Trang 13']").should("be.visible");

      // 5.4 Click nút "Trang đầu" -> quay về trang 1
      cy.get("button[aria-label='Trang đầu']").click();
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.contains("Thành viên 1").should("be.visible");
    });

    // ==========================================
    // 6. Kiểm tra Kéo thả & Thứ tự Cột (Column Ordering / Dnd)
    // ==========================================
    cy.get("[data-testid='ordering-datatable-section']").within(() => {
      // 6.1 Thứ tự các cột ban đầu
      cy.get("thead th").eq(0).should("contain.text", "ID");
      cy.get("thead th").eq(1).should("contain.text", "Họ và tên");
      cy.get("thead th").eq(2).should("contain.text", "Email");
      cy.get("thead th").eq(3).should("contain.text", "Vai trò");
      cy.get("thead th").eq(4).should("contain.text", "Trạng thái");

      // Kiểm tra dữ liệu dòng 1 ăn khớp với thứ tự cột ban đầu
      cy.get("tbody tr").first().find("td").eq(0).should("contain.text", "1");
      cy.get("tbody tr").first().find("td").eq(1).should("contain.text", "Nguyễn Văn A");
      cy.get("tbody tr").first().find("td").eq(2).should("contain.text", "vana@example.com");
      cy.get("tbody tr").first().find("td").eq(3).should("contain.text", "Admin");
      cy.get("tbody tr").first().find("td").eq(4).should("contain.text", "Active");

      // 6.2 Các cột đều có thuộc tính kéo thả (data-column-id & cursor-grab)
      cy.get("th[data-column-id='id']").should("have.class", "cursor-grab");
      cy.get("th[data-column-id='name']").should("have.class", "cursor-grab");
      cy.get("th[data-column-id='email']").should("have.class", "cursor-grab");
      cy.get("th[data-column-id='role']").should("have.class", "cursor-grab");
      cy.get("th[data-column-id='status']").should("have.class", "cursor-grab");

      // 6.3 Kiểm tra thay đổi thứ tự cột theo trạng thái điều khiển (Controlled Column Ordering)
      cy.get("#reorder-columns-btn").click();
      cy.get("@onColumnOrderChange").should("have.been.calledWith", [
        "status",
        "role",
        "email",
        "name",
        "id",
      ]);

      // Xác nhận thứ tự header đã đảo ngược hoàn toàn
      cy.get("thead th").eq(0).should("contain.text", "Trạng thái");
      cy.get("thead th").eq(1).should("contain.text", "Vai trò");
      cy.get("thead th").eq(2).should("contain.text", "Email");
      cy.get("thead th").eq(3).should("contain.text", "Họ và tên");
      cy.get("thead th").eq(4).should("contain.text", "ID");

      // Xác nhận dữ liệu cell của dòng đầu tiên tự động đảo ngược theo đúng thứ tự cột mới
      cy.get("tbody tr").first().find("td").eq(0).should("contain.text", "Active");
      cy.get("tbody tr").first().find("td").eq(1).should("contain.text", "Admin");
      cy.get("tbody tr").first().find("td").eq(2).should("contain.text", "vana@example.com");
      cy.get("tbody tr").first().find("td").eq(3).should("contain.text", "Nguyễn Văn A");
      cy.get("tbody tr").first().find("td").eq(4).should("contain.text", "1");

      // 6.4 Bấm nút "Đặt lại mặc định"
      cy.get("#reset-columns-btn").click();
      cy.get("thead th").eq(0).should("contain.text", "ID");
      cy.get("thead th").eq(1).should("contain.text", "Họ và tên");
      cy.get("thead th").eq(2).should("contain.text", "Email");
      cy.get("thead th").eq(3).should("contain.text", "Vai trò");
      cy.get("thead th").eq(4).should("contain.text", "Trạng thái");

      // 6.5 Mô phỏng tương tác kéo thả @dnd-kit thông qua Pointer Events
      cy.get("th[data-column-id='email']").then(($el) => {
        const coords = $el[0]!.getBoundingClientRect();
        cy.wrap($el)
          .trigger("pointerdown", { which: 1, button: 0, clientX: coords.x + 10, clientY: coords.y + 10, force: true })
          .trigger("pointermove", { clientX: coords.x - 50, clientY: coords.y + 10, force: true });
        cy.get("th[data-column-id='name']").then(($target) => {
          const targetCoords = $target[0]!.getBoundingClientRect();
          cy.wrap($target)
            .trigger("pointermove", { clientX: targetCoords.x, clientY: targetCoords.y, force: true })
            .trigger("pointerup", { force: true });
        });
      });
    });

    // ==========================================================
    // 7. Kiểm tra DataTable Bộ Lọc Menu (SelectMenuFilter style)
    // ==========================================================
    // 7.1 Client-side Filtering & Rounded-full UI
    cy.get("[data-testid='client-filter-datatable-section']").within(() => {
        // 7.1.1 Ô tìm kiếm Search có bo tròn full (rounded-full)
        cy.get("[data-testid='table-search-input']").should("have.class", "rounded-full");

        // Nút "+ Bộ lọc" có bo tròn full (rounded-full)
        cy.get("[data-testid='table-add-filter-button']").should("have.class", "rounded-full");

        // Click nút "+ Bộ lọc"
        cy.get("[data-testid='table-add-filter-button']").click();
      });

      // Menu danh sách trường filter xuất hiện qua portal
      cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
      cy.get("[data-testid='filter-option-role']").click();

      // Chip lọc Role xuất hiện và có class rounded-full
      cy.get("[data-testid='client-filter-datatable-section']").within(() => {
        cy.get("[data-testid='filter-chip-role']")
          .should("be.visible")
          .and("have.class", "rounded-full");
      });

      // Popover editor cho Role xuất hiện (CheckboxGroup)
      cy.get("[data-testid='filter-popover-role']").should("be.visible");
      // Chọn vai trò Admin
      cy.get("[data-testid='filter-popover-role']").contains("label", "Admin").click();
      // Bấm nút "Xong"
      cy.get("[data-testid='filter-popover-role']").contains("button", "Xong").click();

      // Xác nhận kết quả lọc Client-side: chỉ có 3 dòng Admin hiển thị (id: 1, 7, 11)
      cy.get("[data-testid='client-filter-datatable-section']").within(() => {
        cy.get("tbody tr").should("have.length", 3);
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).find("td").eq(3).should("contain.text", "Admin");
        });

        // 7.1.2 Kết hợp tìm kiếm toàn bảng (globalFilter) trên kết quả đã lọc
        cy.get("[data-testid='table-search-input']").type("Nguyễn");
        cy.get("tbody tr").should("have.length", 1);
        cy.get("tbody tr").first().find("td").eq(1).should("contain.text", "Nguyễn Văn A");

        // Xóa từ khóa search
        cy.get("[data-testid='table-clear-search-button']").click();
        cy.get("tbody tr").should("have.length", 3);

        // 7.1.2.1 Fuzzy Search & Bỏ dấu tiếng Việt: gõ 'nguyen' không dấu vẫn tìm ra 'Nguyễn Văn A'
        cy.get("[data-testid='table-search-input']").type("nguyen");
        cy.get("tbody tr").should("have.length", 1);
        cy.get("tbody tr").first().find("td").eq(1).should("contain.text", "Nguyễn Văn A");

        cy.get("[data-testid='table-clear-search-button']").click();
        cy.get("tbody tr").should("have.length", 3);

        // Bấm nút "Đặt lại" để xóa toàn bộ bộ lọc
        cy.get("[data-testid='table-filter-reset-button']").click();
        cy.get("tbody tr").should("have.length", 12);

        // 7.1.3 Thêm bộ lọc DateRange (kiểu giống SelectMenuFilter)
        cy.get("[data-testid='table-add-filter-button']").click();
      });

      cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
      cy.get("[data-testid='filter-option-createdAt']").click();

      // Chip Khoảng ngày xuất hiện với rounded-full
      cy.get("[data-testid='client-filter-datatable-section']").within(() => {
        cy.get("[data-testid='filter-chip-createdAt']")
          .should("be.visible")
          .and("have.class", "rounded-full");
      });

      // Popover editor cho DateRange xuất hiện chứa lịch chọn khoảng ngày giống SelectMenuFilter
      cy.get("[data-testid='filter-popover-createdAt']").should("be.visible");
      cy.get("[data-testid='filter-popover-createdAt']").contains("button", "Xong").click();

      // Xóa chip DateRange
      cy.get("[data-testid='client-filter-datatable-section']").within(() => {
        cy.get("[data-testid='filter-chip-createdAt'] button[aria-label='Xóa bộ lọc Khoảng ngày']").click();
        cy.get("[data-testid='filter-chip-createdAt']").should("not.exist");
      });

      // 7.2 Server-side Filtering & Client-side Global Search
      cy.get("[data-testid='server-filter-datatable-section']").within(() => {
        // Ô tìm kiếm có class rounded-full
        cy.get("[data-testid='table-search-input']").should("have.class", "rounded-full");

        // Click nút "+ Bộ lọc"
        cy.get("[data-testid='table-add-filter-button']").click();
      });

      // Menu portal xuất hiện
      cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
      cy.get("[data-testid='filter-option-status']").click();

      // Popover status xuất hiện
      cy.get("[data-testid='filter-popover-status']").should("be.visible");
      cy.get("[data-testid='filter-popover-status']").contains("label", "Active").click();
      cy.get("[data-testid='filter-popover-status']").contains("button", "Xong").click();

      // Xác nhận sự kiện onColumnFiltersChange được gọi với [{ id: "status", value: ["Active"] }]
      cy.get("@onColumnFiltersChange").should("have.been.calledWith", [
        { id: "status", value: ["Active"] },
      ]);

      // Do manualFiltering = true, bảng KHÔNG lọc client cho cột (vẫn còn nguyên 12 dòng)
      cy.get("[data-testid='server-filter-datatable-section']").within(() => {
        cy.get("tbody tr").should("have.length", 12);

        // 👉 NHƯNG Ô TÌM KIẾM TOÀN BẢNG VẪN LỌC CLIENT-SIDE TỰ ĐỘNG BẰNG NATIVE TANSTACK TABLE:
        cy.get("[data-testid='table-search-input']").type("Trần");
        cy.get("tbody tr").should("have.length", 1);
        cy.get("tbody tr").first().find("td").eq(1).should("contain.text", "Trần Thị B");

        // Xóa tìm kiếm
        cy.get("[data-testid='table-clear-search-button']").click();
        cy.get("tbody tr").should("have.length", 12);
      });
  });

  it("2. Bảng Dữ Liệu Toàn Diện (Full-Featured DataTable - 100% Tính Năng)", () => {
    const onRowClick = cy.stub().as("onRowClick");
    const onRefresh = cy.stub().as("onRefresh");

    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <FullFeaturedTableDemo
          onRowClickStub={onRowClick}
          onRefreshStub={onRefresh}
        />
      </div>
    );

    cy.get("[data-testid='full-featured-table-section']").within(() => {
      // Header tuyệt đối KHÔNG có nút mở rộng / toggle all
      cy.get("[data-testid='table-toggle-all-rows-expanded']").should("not.exist");

      // 1. Kiểm tra hiển thị thanh công cụ và dữ liệu ban đầu
      cy.get("[data-testid='table-search-input']").should("exist").and("be.visible");
      cy.get("[data-testid='table-add-filter-button']").should("exist").and("be.visible");
      cy.get("[data-testid='table-refresh-button']").should("exist").and("be.visible");
      cy.contains("button", "Cột").should("exist").and("be.visible");
      cy.get("#export-excel-btn").should("exist").and("contain.text", "Xuất Excel");
      cy.get("#create-user-btn").should("exist").and("contain.text", "+ Thêm người dùng");

      // Bulk action chưa hiển thị khi chưa có dòng được chọn
      cy.get("#bulk-delete-btn").should("not.exist");

      // Dữ liệu ban đầu hiển thị 5 dòng trên trang 1
      cy.get("tbody tr").should("have.length", 5);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.contains("Trần Thị B").should("be.visible");

      // Mở rộng dòng chi tiết (Expand Row - Nút chevron chỉ có trên dòng)
      cy.get("[data-testid='full-detail-1']").should("not.exist");
      cy.get("[data-testid='table-row-expand-button-0']").click();
      cy.get("[data-testid='full-detail-1']").should("be.visible");
      cy.contains("Thông tin chi tiết: Nguyễn Văn A").should("be.visible");
      cy.get("[data-testid='table-row-expand-button-0']").click();
      cy.get("[data-testid='full-detail-1']").should("not.exist");

      // 2. Tìm kiếm toàn bảng (Global Search)
      cy.get("[data-testid='table-search-input']").type("Nguyễn");
      cy.get("tbody tr").should("have.length", 1);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.get("[data-testid='table-clear-search-button']").click();
      cy.get("tbody tr").should("have.length", 5);

      // 3. Sắp xếp cột (Sorting)
      cy.contains("button", "Họ và tên").click();
      cy.get("tbody tr").first().should("contain.text", "Bùi Kiên H");
      cy.contains("button", "Họ và tên").click();
      cy.get("tbody tr").first().should("contain.text", "Đỗ Mai F");
      cy.contains("button", "ID").click(); // Sort desc theo ID
      cy.contains("button", "ID").click(); // Sort asc theo ID đưa về dòng 1
      cy.get("tbody tr").first().should("contain.text", "Nguyễn Văn A");

      // 4. Chọn dòng & Hành động hàng loạt (Row Selection & Bulk Actions)
      cy.get("tbody tr").first().find("input[type='checkbox']").click({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (1)");

      cy.get("tbody tr").eq(1).find("input[type='checkbox']").click({ force: true });
      cy.get("#bulk-delete-btn").should("contain.text", "Xóa (2)");

      // Bỏ chọn từng dòng
      cy.get("tbody tr").first().find("input[type='checkbox']").click({ force: true });
      cy.get("tbody tr").eq(1).find("input[type='checkbox']").click({ force: true });
      cy.get("#bulk-delete-btn").should("not.exist");

      // Chọn tất cả các dòng trên trang này qua header checkbox
      cy.get("thead th").first().find("input[type='checkbox']").click({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (5)");
      cy.get("thead th").first().find("input[type='checkbox']").click({ force: true });
      cy.get("#bulk-delete-btn").should("not.exist");

      // 5. Tương tác click dòng (Row Click)
      cy.get("tbody tr").first().click();
      cy.get("@onRowClick").should("have.been.called");

      // 6. Nút làm mới dữ liệu (Refresh)
      cy.get("[data-testid='table-refresh-button']").click();
      cy.get("@onRefresh").should("have.been.called");

      // 7. Phân trang (Pagination)
      cy.get("button[aria-label='Trang 2']").click();
      cy.get("tbody tr").should("have.length", 5);
      cy.contains("Đỗ Mai F").should("be.visible");
      cy.get("button[aria-label='Trang 1']").click();
      cy.contains("Nguyễn Văn A").should("be.visible");

      // 8. Kéo thả thứ tự cột (Column Ordering cursor class)
      cy.get("th[data-column-id='email']").should("have.class", "cursor-grab");

      // Mở menu thêm bộ lọc
      cy.get("[data-testid='table-add-filter-button']").click();
    });

    // 9. Bộ lọc cột Menu (TableMenuFilter qua Portal)
    cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
    cy.get("[data-testid='filter-option-role']").click();

    cy.get("[data-testid='filter-popover-role']").should("be.visible");
    cy.get("[data-testid='filter-popover-role']").contains("label", "Admin").click();
    cy.get("[data-testid='filter-popover-role']").contains("label", "Editor").click();
    cy.get("[data-testid='filter-popover-role']").contains("button", "Xong").click();

    cy.get("[data-testid='full-featured-table-section']").within(() => {
      // Badge hiển thị vượt quá dạng "+1" khi chọn nhiều hơn 1 mục (Admin, +1)
      cy.get("[data-testid='filter-chip-role']").should("contain.text", "Admin, +1");

      // Bảng lọc gồm các dòng Admin và Editor (tổng cộng 7 dòng: 3 Admin + 4 Editor)
      cy.get("tbody tr").should("have.length", 5); // Trang 1 hiển thị 5 dòng
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).find("td").eq(4).invoke("text").should("match", /Admin|Editor/);
      });

      // Đặt lại bộ lọc
      cy.get("[data-testid='table-filter-reset-button']").click();
      cy.get("tbody tr").should("have.length", 5);

      // Mở popover ẩn/hiện cột
      cy.contains("button", "Cột").click();
    });

    // 10. Ẩn / Hiện cột (Column Visibility qua Popover)
    cy.contains("div", "Hiển thị cột").should("be.visible");
    cy.contains("label", "Email").click();
    cy.get("[data-testid='full-featured-table-section']").within(() => {
      cy.contains("th", "Email").should("not.exist");
    });
    // Bật lại cột Email
    cy.contains("label", "Email").click();
    cy.get("[data-testid='full-featured-table-section']").within(() => {
      cy.contains("th", "Email").should("exist");
    });
  });

  it("3. Mở rộng xem chi tiết Sub-component (renderExpandedRow & Detail Panel - Nút chỉ có trên row)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <DetailPanelDemo />
      </div>
    );

    cy.get("[data-testid='expanding-detail-section']").within(() => {
      // Header tuyệt đối KHÔNG có nút mở rộng / toggle-all
      cy.get("[data-testid='table-toggle-all-rows-expanded']").should("not.exist");
      cy.get("thead th [data-testid^='table-row-expand-button']").should("not.exist");

      // Ban đầu hiển thị 3 dòng dữ liệu, chưa mở detail panel
      cy.get("tbody tr").should("have.length", 3);
      cy.get("[data-testid^='detail-content-']").should("not.exist");

      // Bấm nút expand ở dòng 0 (ID: 1)
      cy.get("[data-testid='table-row-expand-button-0']").click();

      // Xuất hiện detail panel của dòng 0 cùng hiệu ứng animation
      cy.get("[data-testid='detail-content-1']").should("be.visible");
      cy.contains("Chi tiết người dùng: Nguyễn Văn A").should("be.visible");
      cy.get("[data-testid='table-expanded-row-0'] .animate-table-expand-wrapper").should("exist");
      cy.get("[data-testid='table-expanded-row-0'] .animate-table-expand-content").should("exist");
      cy.get("[data-testid='table-row-expand-button-0'] svg").should("have.class", "rotate-90");

      // Bấm thu gọn lại
      cy.get("[data-testid='table-row-expand-button-0']").click();
      cy.get("[data-testid='detail-content-1']").should("not.exist");
    });
  });

  it("4. Dữ liệu cây phân cấp đa tầng (Multi-level Tree Data & getSubRows)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <TreeDataDemo />
      </div>
    );

    cy.get("[data-testid='expanding-tree-section']").within(() => {
      // Header không có nút expand
      cy.get("[data-testid='table-toggle-all-rows-expanded']").should("not.exist");

      // Ban đầu hiển thị 2 dòng gốc (root-1, root-2)
      cy.get("tbody tr").should("have.length", 2);
      cy.contains("td", "Khối Công Nghệ").should("be.visible");
      cy.contains("td", "Khối Kinh Doanh").should("be.visible");
      cy.contains("td", "Trung Tâm Phần Mềm").should("not.exist");

      // Mở rộng dòng root-1 (dòng 0)
      cy.get("[data-testid='table-row-expand-button-0']").click();

      // Xuất hiện thêm 2 dòng con (child-1-1 và child-1-2) cùng hiệu ứng sub-row
      cy.contains("td", "Trung Tâm Phần Mềm").should("be.visible");
      cy.contains("td", "Trung Tâm Hạ Tầng").should("be.visible");
      cy.get("tbody tr").should("have.length", 4);
      cy.get("tbody tr.animate-table-subrow-in").should("have.length.at.least", 2);

      // Mở rộng tiếp dòng con child-1-1 (dòng 1 / index 0.0)
      cy.get("[data-testid='table-row-expand-button-0.0']").click();

      // Xuất hiện dòng cháu (grandchild-1-1-1)
      cy.contains("td", "Nhóm Frontend").should("be.visible");
      cy.get("tbody tr").should("have.length", 5);

      // Dòng lá (grandchild-1-1-1) không có con nên hiển thị ký hiệu rẽ nhánh ↳
      cy.contains("tbody tr", "Nhóm Frontend").within(() => {
        cy.contains("span", "↳").should("be.visible");
      });
    });
  });

  it("5. Mở rộng tích hợp vào cột tùy biến qua expandColumnId", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <CustomExpandColumnDemo />
      </div>
    );

    cy.get("[data-testid='expanding-custom-col-section']").within(() => {
      // Header không có nút toggle all
      cy.get("[data-testid='table-toggle-all-rows-expanded']").should("not.exist");

      // Nút expand nằm ở cột email (ô thứ 3, index 2)
      cy.get("tbody tr").first().find("td").eq(2).within(() => {
        cy.get("[data-testid='table-row-expand-button-0']").should("be.visible").click();
      });

      cy.get("[data-testid='custom-expand-detail-1']").should("be.visible");
    });
  });

  it("6. Mở rộng dạng cột độc lập (expandColumnMode='standalone')", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <StandaloneExpandColumnDemo />
      </div>
    );

    cy.get("[data-testid='expanding-standalone-section']").within(() => {
      // Header không có nút toggle all
      cy.get("[data-testid='table-toggle-all-rows-expanded']").should("not.exist");
      cy.get("thead th").first().find("button").should("not.exist");

      // Cột đầu tiên là cột expand độc lập
      cy.get("tbody tr").first().find("td").first().within(() => {
        cy.get("[data-testid='table-row-expand-button-0']").should("be.visible").click();
      });

      cy.get("[data-testid='standalone-detail-1']").should("be.visible");
    });
  });

  it("7. Trạng thái mở rộng có điều khiển (Controlled Expanded State)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <ControlledExpandDemo />
      </div>
    );

    cy.get("[data-testid='expanding-controlled-section']").within(() => {
      // Dòng 0 mở sẵn theo initial state
      cy.get("[data-testid='controlled-detail-1']").should("be.visible");

      // Bấm "Mở tất cả"
      cy.get("#btn-expand-all").click();
      cy.get("[data-testid='controlled-detail-1']").should("be.visible");
      cy.get("[data-testid='controlled-detail-2']").should("be.visible");
      cy.get("[data-testid='controlled-detail-3']").should("be.visible");

      // Bấm "Đóng tất cả"
      cy.get("#btn-collapse-all").click();
      cy.get("[data-testid^='controlled-detail-']").should("not.exist");
    });
  });

  it("8. Low-level UI Primitives (Semantic Table, TableHeader, Variants, Sizes)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <PrimitivesDemo />
      </div>
    );

    cy.get("[data-testid='primitives-section']").within(() => {
      // 1.1 Basic Table structure
      cy.get("[data-testid='primitive-table']").should("exist");
      cy.get("table").should("exist");
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");
      cy.get("tfoot").should("exist");
      cy.get("caption").contains("Bảng kê doanh số mẫu").should("be.visible");
      cy.contains("Mã HĐ").should("be.visible");
      cy.contains("#INV-001").should("be.visible");
      cy.contains("Tổng cộng").should("be.visible");
      cy.contains("2.050.000 đ").should("be.visible");

      // 1.2 Variants
      cy.get("[data-testid='striped-table']").should("exist");
      cy.get("[data-testid='bordered-table']").should("exist");
    });
  });

  it("9. High-level Interactive DataTable (Sorting, Global Filter, Pagination, Selection)", () => {
    const onRowClick = cy.stub().as("onRowClick");
    const onRefresh = cy.stub().as("onRefresh");

    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <InteractiveTableDemo
          onRowClickStub={onRowClick}
          onRefreshStub={onRefresh}
        />
      </div>
    );

    cy.get("[data-testid='interactive-datatable-section']").within(() => {
      // Khởi tạo và hiển thị cột, dòng ban đầu
      cy.contains("Họ và tên").should("be.visible");
      cy.contains("Email").should("be.visible");
      cy.contains("Vai trò").should("be.visible");
      cy.contains("Trạng thái").should("be.visible");

      // Trang 1 với pageSize = 5: hiển thị 5 dòng đầu
      cy.get("tbody tr").should("have.length", 5);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.contains("Trần Thị B").should("be.visible");
      cy.contains("Lê Văn C").should("be.visible");
      cy.contains("Phạm Minh D").should("be.visible");
      cy.contains("Hoàng Tuấn E").should("be.visible");

      // Kiểm tra Sắp xếp (Sorting)
      cy.contains("button", "Họ và tên").click();
      cy.contains("th", "Họ và tên").should("have.attr", "aria-sort", "ascending");
      cy.get("tbody tr").first().should("contain.text", "Bùi Kiên H");

      cy.contains("button", "Họ và tên").click();
      cy.contains("th", "Họ và tên").should("have.attr", "aria-sort", "descending");
      cy.get("tbody tr").first().should("contain.text", "Đỗ Mai F");

      cy.contains("button", "ID").click();

      // Kiểm tra Tìm kiếm toàn bảng (Global Filter)
      cy.get("input[placeholder='Tìm kiếm trong bảng...']").type("Nguyễn Văn A");
      cy.get("tbody tr").should("have.length", 1);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.get("button[aria-label='Xóa tìm kiếm']").click();
      cy.get("tbody tr").should("have.length", 5);

      // Kiểm tra Phân trang (Pagination)
      cy.get("button[aria-label='Trang sau']").click();
      cy.get("button[aria-label='Trang 2']").should("have.attr", "aria-current", "page");
      cy.get("button[aria-label='Trang trước']").click();
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");

      // Kiểm tra Chọn dòng (Row Selection & Bulk Actions)
      cy.get("input[aria-label='Chọn tất cả các dòng trên trang này']").check({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (5)");
      cy.get("input[aria-label='Chọn tất cả các dòng trên trang này']").uncheck({ force: true });
      cy.get("#bulk-delete-btn").should("not.exist");

      // Kiểm tra sự kiện onRowClick
      cy.get("tbody tr").first().click();
      cy.get("@onRowClick").should("have.been.calledOnce");

      // Kiểm tra nút làm mới dữ liệu
      cy.get("[data-testid='table-refresh-button']").should("be.visible").click();
      cy.get("@onRefresh").should("have.been.calledOnce");
    });
  });

  it("10. DataTable ở trạng thái Đang tải (Loading Skeleton)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <LoadingTableDemo />
      </div>
    );

    cy.get("[data-testid='loading-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 3);
      cy.get("tbody tr").first().find("td").should("have.length", defaultColumns.length);
    });
  });

  it("11. DataTable ở trạng thái Rỗng (Empty State)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <EmptyTableDemo />
      </div>
    );

    cy.get("[data-testid='empty-datatable-section']").within(() => {
      cy.contains("Không có dữ liệu trong bảng").should("be.visible");
    });
  });

  it("12. DataTable Phân trang nhiều trang (65 dòng dữ liệu, 13 trang & Ellipsis)", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <ManyPagesTableDemo />
      </div>
    );

    cy.get("[data-testid='many-pages-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 5);
      cy.contains("Thành viên 1").should("be.visible");
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.contains("span", "...").should("be.visible");
      cy.get("button[aria-label='Trang 13']").should("be.visible");

      // Click trang cuối -> trang 13
      cy.get("button[aria-label='Trang cuối']").click();
      cy.contains("Thành viên 61").should("be.visible");
      cy.get("button[aria-label='Trang 13']").should("have.attr", "aria-current", "page");

      // Click trang 9 (ở giữa)
      cy.get("button[aria-label='Trang 9']").click();
      cy.get("button[aria-label='Trang 9']").should("have.attr", "aria-current", "page");

      // Click trang đầu -> quay lại trang 1
      cy.get("button[aria-label='Trang đầu']").click();
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.contains("Thành viên 1").should("be.visible");
    });
  });

  it("13. DataTable Kéo thả và thay đổi thứ tự cột (Column Ordering / Dnd)", () => {
    const onColumnOrderChange = cy.stub().as("onColumnOrderChange");

    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <div className="max-w-[1280px] mx-auto p-6 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <ColumnOrderingDemo onColumnOrderChangeStub={onColumnOrderChange} />
        </div>
      </div>
    );

    cy.get("th[data-column-id='id']").should("have.class", "cursor-grab");
    cy.get("th[data-column-id='name']").should("have.class", "cursor-grab");
    cy.get("th[data-column-id='email']").should("have.class", "cursor-grab");

    // Đảo ngược thứ tự cột
    cy.get("#reorder-columns-btn").click();
    cy.get("@onColumnOrderChange").should("have.been.calledWith", [
      "status",
      "role",
      "email",
      "name",
      "id",
    ]);
    cy.get("thead th").eq(0).should("contain.text", "Trạng thái");
    cy.get("thead th").eq(4).should("contain.text", "ID");

    // Đặt lại mặc định
    cy.get("#reset-columns-btn").click();
    cy.get("thead th").eq(0).should("contain.text", "ID");
    cy.get("thead th").eq(4).should("contain.text", "Trạng thái");
  });

  it("14. DataTable Bộ lọc Menu nâng cao (Client-side & Server-side filtering)", () => {
    const onColumnFiltersChange = cy.stub().as("onColumnFiltersChange");

    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <FilterTableDemo onColumnFiltersChangeStub={onColumnFiltersChange} />
      </div>
    );

    // Client-side filtering
    cy.get("[data-testid='client-filter-datatable-section']").within(() => {
      cy.get("[data-testid='table-search-input']").should("have.class", "rounded-full");
      cy.get("[data-testid='table-add-filter-button']").click();
    });

    cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
    cy.get("[data-testid='filter-option-role']").click();

    cy.get("[data-testid='filter-popover-role']").should("be.visible");
    cy.get("[data-testid='filter-popover-role']").contains("label", "Admin").click();
    cy.get("[data-testid='filter-popover-role']").contains("button", "Xong").click();

    cy.get("[data-testid='client-filter-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 3);
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).find("td").eq(3).should("contain.text", "Admin");
      });
      cy.get("[data-testid='table-filter-reset-button']").click();
      cy.get("tbody tr").should("have.length", 12);
    });

    // Server-side filtering
    cy.get("[data-testid='server-filter-datatable-section']").within(() => {
      cy.get("[data-testid='table-add-filter-button']").click();
    });

    cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
    cy.get("[data-testid='filter-option-status']").click();

    cy.get("[data-testid='filter-popover-status']").should("be.visible");
    cy.get("[data-testid='filter-popover-status']").contains("label", "Active").click();
    cy.get("[data-testid='filter-popover-status']").contains("button", "Xong").click();

    cy.get("@onColumnFiltersChange").should("have.been.calledWith", [
      { id: "status", value: ["Active"] },
    ]);

    // manualFiltering = true nên không lọc client
    cy.get("[data-testid='server-filter-datatable-section']").within(() => {
      cy.get("tbody tr").should("have.length", 12);
    });
  });

  it("15. Tích hợp TanStack Query với adapter hook useTableQuery", () => {
    cy.mount(
      <div className="p-8 bg-neutral-100 min-h-screen">
        <TableQueryDemo />
      </div>
    );

    cy.get("[data-testid='table-query-section']").within(() => {
      cy.get("tbody tr").should("have.length", 3);
      cy.contains("span", "Tổng 8 dòng").should("be.visible");
      cy.get("[data-testid='query-page-display']").should("contain.text", "Trang: 1");

      // Chuyển sang trang 2
      cy.get("button[aria-label='Trang sau']").click();
      cy.get("[data-testid='query-page-display']").should("contain.text", "Trang: 2");
      cy.get("tbody tr").should("have.length", 3);

      // Reset toàn bộ query
      cy.get("[data-testid='reset-query-btn']").click();
      cy.get("[data-testid='query-page-display']").should("contain.text", "Trang: 1");
    });
  });

  it("16. Debounce ở chế độ server cho tất cả các loại filter (Input, Number, Select, Reset, Remove chip)", () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const queryFnSpy = cy.stub().as("queryFnSpy");

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <div className="p-8 bg-neutral-100 min-h-screen">
          <ServerDebounceFilterDemo queryFnStub={queryFnSpy} />
        </div>
      </QueryClientProvider>
    );

    // Khởi tạo ban đầu: queryFn được gọi 1 lần với trang 1
    cy.get("@queryFnSpy").should("have.been.calledOnce");

    // 1. Kiểm tra bộ lọc Text / Input: mở popover và gõ ký tự
    cy.get("[data-testid='server-debounce-section']").within(() => {
      cy.get("[data-testid='table-add-filter-button']").click();
    });
    cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
    cy.get("[data-testid='filter-option-name']").click();

    cy.get("[data-testid='filter-popover-name']").should("be.visible");
    cy.get("[data-testid='filter-popover-name'] input").type("Thao");
    // Badge chip cập nhật giá trị hiển thị ngay lập tức (zero-latency)
    cy.get("[data-testid='filter-chip-val-name']").should("contain.text", "Thao");
    // API queryFn được gọi sau khi debounce 150ms
    cy.get("@queryFnSpy").should("have.been.calledWith", Cypress.sinon.match({
      filters: { name: "Thao" },
    }));
    cy.get("[data-testid='filter-popover-name']").contains("button", "Xong").click();

    // 2. Kiểm tra bộ lọc Number Input: mở popover và gõ số
    cy.get("[data-testid='server-debounce-section']").within(() => {
      cy.get("[data-testid='table-add-filter-button']").click();
    });
    cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
    cy.get("[data-testid='filter-option-age']").click();

    cy.get("[data-testid='filter-popover-age']").should("be.visible");
    cy.get("[data-testid='filter-popover-age'] input").type("28");
    cy.get("[data-testid='filter-chip-val-age']").should("contain.text", "28");
    cy.get("@queryFnSpy").should("have.been.calledWith", Cypress.sinon.match({
      filters: { name: "Thao", age: 28 },
    }));
    cy.get("[data-testid='filter-popover-age']").contains("button", "Xong").click();

    // 3. Kiểm tra bộ lọc Select (CheckboxGroup): chọn tùy chọn
    cy.get("[data-testid='server-debounce-section']").within(() => {
      cy.get("[data-testid='table-add-filter-button']").click();
    });
    cy.get("[data-testid='table-add-filter-menu']").should("be.visible");
    cy.get("[data-testid='filter-option-role']").click();

    cy.get("[data-testid='filter-popover-role']").should("be.visible");
    cy.get("[data-testid='filter-popover-role']").contains("label", "Admin").click();
    cy.get("[data-testid='filter-chip-val-role']").should("contain.text", "Admin");
    cy.get("@queryFnSpy").should("have.been.calledWith", Cypress.sinon.match({
      filters: { name: "Thao", age: 28, role: ["Admin"] },
    }));
    cy.get("[data-testid='filter-popover-role']").contains("button", "Xong").click();

    // 4. Kiểm tra xóa chip bộ lọc: phát tín hiệu ngay lập tức
    cy.get("[data-testid='filter-chip-age'] button[aria-label='Xóa bộ lọc Tuổi']").click();
    cy.get("@queryFnSpy").should("have.been.calledWith", Cypress.sinon.match({
      filters: { name: "Thao", role: ["Admin"] },
    }));

    // 5. Kiểm tra nút Đặt lại (Reset all): phát tín hiệu ngay lập tức
    cy.get("[data-testid='table-filter-reset-button']").click();
    cy.get("@queryFnSpy").should("have.been.calledWith", Cypress.sinon.match((params: TableQueryParams) => {
      return !params.filters || Object.keys(params.filters).length === 0;
    }));
  });
});
