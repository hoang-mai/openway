import React, { useState } from "react";
import type { Row } from "@tanstack/react-table";
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
} from "./index";
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
        isRefresh={true}
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

/**
 * Single Mount Test Harness Component
 * Gom toàn bộ các trường hợp kiểm thử (Primitives, DataTable, Loading, Empty, Ordering, Filters)
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

          {/* 1. Low-level Primitives Section */}
          <section
        data-testid="primitives-section"
        className="space-y-6 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
      >
        <h2 className="text-lg font-semibold text-neutral-900">
          1. Low-level UI Primitives
        </h2>

        {/* 1.1 Basic Semantic Table */}
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

        {/* 1.2 Variants & Sizes */}
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

      {/* 2. High-level Interactive DataTable Section */}
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

      {/* 3. Loading Skeleton State Section */}
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

      {/* 4. Empty State Section */}
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

      {/* 5. Many Pages Pagination Section */}
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

      {/* 6. Column Ordering & Drag-and-Drop Section */}
      <section
        data-testid="ordering-datatable-section"
        className="space-y-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs"
      >
        <ColumnOrderingDemo onColumnOrderChangeStub={onColumnOrderChangeStub} />
      </section>

      {/* 7.1 DataTable Bộ Lọc Menu (Client-side Filtering & Rounded Full UI) */}
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

      {/* 7.2 DataTable Bộ Lọc Menu (Server-side Filtering & Client-side Global Search) */}
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
      </div>
    </div>
  );
}

describe("Table & DataTable Component Tests (Single Mount Harness)", () => {
  beforeEach(() => {
    // Đặt khung nhìn chuẩn màn hình máy tính Desktop 1440 x 900
    cy.viewport(1440, 900);
  });

  it("verifies all Table and DataTable functionalities in a single mount", () => {
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
      cy.get("tbody tr").first().should("contain.text", "Vũ Hải G");

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
      cy.get("[role='listbox']").contains("10").click();
      cy.get("tbody tr").should("have.length", 10);
      cy.get("button[aria-label='Trang 1']").should("have.attr", "aria-current", "page");
      cy.get("button[aria-label='Trang 2']").should("be.visible");
      cy.get("button[aria-label='Trang 3']").should("not.exist");

      // Đưa page size về lại 5 để kiểm tra chọn dòng theo trang
      cy.get("[data-testid='table-page-size-selector']").click();
      cy.get("[role='listbox']").contains("5").click();
      cy.get("tbody tr").should("have.length", 5);

      // 2.5 Kiểm tra Chọn dòng (Row Selection & Bulk Actions)
      // Chọn tất cả dòng trên trang
      cy.get("input[aria-label='Chọn tất cả các dòng trên trang này']").check({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (5)");

      // Bỏ chọn tất cả
      cy.get("input[aria-label='Chọn tất cả các dòng trên trang này']").uncheck({ force: true });
      cy.get("#bulk-delete-btn").should("not.exist");

      // Chọn 1 dòng đơn lẻ
      cy.get("input[aria-label='Chọn dòng 0']").check({ force: true });
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (1)");

      // Bỏ chọn dòng đó
      cy.get("input[aria-label='Chọn dòng 0']").uncheck({ force: true });

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
    cy.get("[data-testid='table-refresh-button']").should("be.visible").click();
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
  });

  it("verifies a full-featured all-in-one DataTable (complete feature test case)", () => {
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

      // 2. Tìm kiếm toàn bảng (Global Search)
      cy.get("[data-testid='table-search-input']").type("Nguyễn");
      cy.get("tbody tr").should("have.length", 1);
      cy.contains("Nguyễn Văn A").should("be.visible");
      cy.get("[data-testid='table-clear-search-button']").click();
      cy.get("tbody tr").should("have.length", 5);

      // 3. Sắp xếp cột (Sorting)
      cy.contains("th", "Họ và tên").click();
      cy.get("tbody tr").first().should("contain.text", "Bùi Kiên H");
      cy.contains("th", "Họ và tên").click();
      cy.get("tbody tr").first().should("contain.text", "Vũ Hải G");
      cy.contains("th", "Họ và tên").click(); // Reset về ban đầu
      cy.get("tbody tr").first().should("contain.text", "Nguyễn Văn A");

      // 4. Chọn dòng & Hành động hàng loạt (Row Selection & Bulk Actions)
      cy.get("tbody tr").first().find("input[type='checkbox']").click();
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (1)");

      cy.get("tbody tr").eq(1).find("input[type='checkbox']").click();
      cy.get("#bulk-delete-btn").should("contain.text", "Xóa (2)");

      // Bỏ chọn từng dòng
      cy.get("tbody tr").first().find("input[type='checkbox']").click();
      cy.get("tbody tr").eq(1).find("input[type='checkbox']").click();
      cy.get("#bulk-delete-btn").should("not.exist");

      // Chọn tất cả các dòng trên trang này qua header checkbox
      cy.get("thead th").first().find("input[type='checkbox']").click();
      cy.get("#bulk-delete-btn").should("be.visible").and("contain.text", "Xóa (5)");
      cy.get("thead th").first().find("input[type='checkbox']").click();
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
});
