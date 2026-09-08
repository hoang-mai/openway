import type { HTMLAttributes, ReactNode, Ref, TdHTMLAttributes, ThHTMLAttributes } from "react";
import type {
  ColumnDef,
  Column,
  Row,
  RowSelectionState,
  SortingState,
  ColumnVisibilityState,
  PaginationState,
  ColumnFiltersState,
  ExpandedState,
  OnChangeFn,
  RowData,
  ReactTable,
  Header,
  ColumnHelper,
  FilterFnOption,
} from "@tanstack/react-table";

export type {
  ColumnDef,
  Column,
  Row,
  RowSelectionState,
  SortingState,
  ColumnVisibilityState,
  PaginationState,
  ColumnFiltersState,
  ExpandedState,
  OnChangeFn,
  RowData,
  ReactTable,
  Header,
  ColumnHelper,
  FilterFnOption,
};
import type { DefaultTableFeatures } from "./useDataTable";
export type { RankingInfo } from "./fuzzyFilter";

/**
 * Kiểu trạng thái thứ tự các cột: danh sách ID của các cột
 */
export type ColumnOrderState = string[];

// ============================================================================
// 1. KÍCH THƯỚC, BIẾN THỂ & CĂN LỀ (THEME TOKENS)
// ============================================================================

/**
 * Kích cỡ hiển thị của Table:
 * - 'sm': Nhỏ gọn (dense), padding hẹp (px-3 py-2), font chữ text-xs, phù hợp bảng nhiều dữ liệu hoặc màn hình nhỏ
 * - 'md': Tiêu chuẩn (mặc định), padding cân đối (px-4 py-3), font chữ text-sm, phù hợp hầu hết giao diện quản trị
 * - 'lg': Thoáng đãng, padding rộng (px-5 py-4), font chữ text-base, phù hợp bảng dữ liệu chính, báo cáo hoặc dashboard
 */
export type TableSize = "sm" | "md" | "lg";

/**
 * Biến thể kiểu dáng giao diện của Table:
 * - 'default': Bảng phẳng với đường kẻ phân cách viền mờ thanh lịch, nền header xám nhạt trung tính
 * - 'striped': Bảng kẻ sọc xen kẽ (Zebra stripes), các dòng chẵn mang nền xám nhạt giúp tăng khả năng đọc lướt
 * - 'bordered': Viền đầy đủ bao quanh từng ô và toàn bộ khung bao ngoài của bảng
 */
export type TableVariant = "default" | "striped" | "bordered";

/**
 * Hướng căn lề nội dung của các ô trong Table:
 * - 'left': Căn lề trái (mặc định cho văn bản, tên, mô tả, nội dung dài)
 * - 'center': Căn giữa (phù hợp cho mã định danh ID, trạng thái, ngày tháng, checkbox)
 * - 'right': Căn lề phải (chuẩn cho số tiền, số lượng, phần trăm, cột hành động thao tác)
 */
export type TableAlign = "left" | "center" | "right";

// ============================================================================
// 2. LOW-LEVEL UI PRIMITIVES PROPS
// ============================================================================

/**
 * Thuộc tính của component bọc ngoài `<Table />` (`<table>`)
 */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Ref chuyển tiếp trực tiếp đến phần tử HTML table (React 19)
   */
  ref?: Ref<HTMLTableElement>;

  /**
   * Biến thể kiểu dáng hiển thị của bảng
   * @default 'default'
   */
  variant?: TableVariant;

  /**
   * Kích cỡ hiển thị của bảng (khoảng đệm và kích thước chữ)
   * @default 'md'
   */
  size?: TableSize;

  /**
   * Class tùy biến cho khung container bao ngoài thẻ table (khung xử lý cuộn ngang overflow-x-auto)
   */
  containerClassName?: string;

  /**
   * Props truyền bổ sung vào thẻ div wrapper bao ngoài
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;

  /**
   * Nội dung các phần tử bảng bên trong (TableHeader, TableBody, TableFooter, TableCaption...)
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của component phần đầu bảng `<TableHeader />` (`<thead>`)
 */
export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML thead
   */
  ref?: Ref<HTMLTableSectionElement>;

  /**
   * Nội dung dòng tiêu đề bên trong thẻ thead
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của component thân bảng `<TableBody />` (`<tbody>`)
 */
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML tbody
   */
  ref?: Ref<HTMLTableSectionElement>;

  /**
   * Nội dung các dòng dữ liệu bên trong thẻ tbody
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của component chân bảng `<TableFooter />` (`<tfoot>`)
 */
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML tfoot
   */
  ref?: Ref<HTMLTableSectionElement>;

  /**
   * Nội dung tổng kết hoặc thông tin thống kê ở chân bảng
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của component dòng `<TableRow />` (`<tr>`)
 */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML tr
   */
  ref?: Ref<HTMLTableRowElement>;

  /**
   * Đánh dấu dòng đang được chọn (áp dụng background highlight và thuộc tính aria-selected)
   * @default false
   */
  isSelected?: boolean;

  /**
   * Bật hiệu ứng đổi màu nền nhẹ khi rê chuột qua dòng
   * @default true
   */
  isHoverable?: boolean;

  /**
   * Nội dung các ô dữ liệu bên trong dòng (TableCell hoặc TableHead)
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của ô tiêu đề `<TableHead />` (`<th>`)
 */
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML th
   */
  ref?: Ref<HTMLTableCellElement>;

  /**
   * Hướng căn lề nội dung tiêu đề ('left', 'center', 'right')
   * @default 'left'
   */
  align?: TableAlign;

  /**
   * Nội dung hiển thị bên trong ô tiêu đề
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của ô dữ liệu `<TableCell />` (`<td>`)
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML td
   */
  ref?: Ref<HTMLTableCellElement>;

  /**
   * Hướng căn lề nội dung ô ('left', 'center', 'right')
   * @default 'left'
   */
  align?: TableAlign;

  /**
   * Nội dung hiển thị bên trong ô dữ liệu
   */
  children?: ReactNode;
}

/**
 * Thuộc tính của chú thích bảng `<TableCaption />` (`<caption>`)
 */
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML caption
   */
  ref?: Ref<HTMLTableCaptionElement>;

  /**
   * Văn bản mô tả hoặc chú thích phụ bên dưới bảng
   */
  children?: ReactNode;
}

// ============================================================================
// 3. SUBCOMPONENTS & TANSTACK TABLE V9 INTEGRATION PROPS
// ============================================================================

/**
 * Thuộc tính của component tiêu đề cột tương tác sắp xếp `<TableColumnHeader />`
 */
export interface TableColumnHeaderProps<
  TData extends RowData = RowData,
  TValue = unknown
> extends HTMLAttributes<HTMLDivElement> {
  /**
   * Đối tượng cột TanStack Table v9
   */
  column: Column<DefaultTableFeatures, TData, TValue>;

  /**
   * Tên tiêu đề hiển thị của cột
   */
  title: string;
}

/**
 * Thuộc tính của component tiêu đề cột hỗ trợ kéo thả sắp xếp `<DraggableTableHead />`
 */
export interface DraggableTableHeadProps<
  TData extends RowData = RowData,
  TValue = unknown
> {
  /**
   * Đối tượng Header TanStack Table v9 đại diện cho cột
   */
  header: Header<DefaultTableFeatures, TData, TValue>;

  /**
   * Cho phép sắp xếp dữ liệu cột khi click vào tiêu đề
   */
  canSort?: boolean;

  /**
   * Nội dung React hiển thị bên trong ô header
   */
  headerContent?: ReactNode;

  /**
   * Trạng thái sắp xếp WAI-ARIA ('ascending' | 'descending' | 'none')
   */
  ariaSort?: "ascending" | "descending" | "none";

  /**
   * Vô hiệu hóa tính năng kéo thả cho cột này (ví dụ cột Checkbox `_select`)
   * @default false
   */
  disabled?: boolean;

  /**
   * Class tùy biến cho phần tử `<th>`
   */
  className?: string;
}

/**
 * Thuộc tính của thanh điều hướng phân trang `<TablePagination />`
 */
export interface TablePaginationProps<TData extends RowData = RowData> {
  /**
   * Instance của bảng ReactTable từ hook TanStack Table v9 (`useDataTable` hoặc `useTable`)
   */
  table: ReactTable<DefaultTableFeatures, TData>;

  /**
   * Danh sách tùy chọn số dòng hiển thị trên mỗi trang trong dropdown
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Hiển thị dropdown lựa chọn số dòng trên mỗi trang
   * @default true
   */
  showPageSizeSelector?: boolean;

  /**
   * Hiển thị ô nhảy nhanh đến trang chỉ định
   * @default false
   */
  showPageJump?: boolean;

  /**
   * Class tùy biến cho thanh phân trang
   */
  className?: string;
}

/**
 * Kiểu hiển thị của bộ lọc trong TableToolbar / DataTable (đồng nhất với SelectFilterType)
 */
export type TableFilterType =
  | "string"
  | "text"
  | "number"
  | "date"
  | "date-range"
  | "checkbox-group"
  | "select"
  | "custom";

/**
 * Tùy chọn dành cho bộ lọc dạng select / checkbox-group
 */
export interface TableFilterOption {
  label: ReactNode;
  value: string | number | boolean;
  disabled?: boolean;
}

/**
 * Định nghĩa cấu hình bộ lọc cho DataTable / TableToolbar (đồng nhất với SelectFilterField)
 */
export interface TableFilterDef<TValue = unknown> {
  /**
   * Tên định danh trường lọc (dùng làm key trong object filters, đồng nhất với SelectFilterField)
   */
  name: string;

  /**
   * Tên hiển thị của bộ lọc trên giao diện (ví dụ: "Trạng thái", "Ngày tạo")
   */
  label?: ReactNode;

  /**
   * Kiểu hiển thị bộ lọc: 'string' | 'text' | 'number' | 'date' | 'date-range' | 'checkbox-group' | 'select' | 'custom'
   */
  type: TableFilterType;

  /**
   * Danh sách options dành cho kiểu 'select' hoặc 'checkbox-group'
   */
  options?: TableFilterOption[];

  /**
   * Placeholder gợi ý trong editor
   */
  placeholder?: string;

  /**
   * Giá trị mặc định khi khởi tạo
   */
  defaultValue?: TValue;

  /**
   * Giá trị điều khiển
   */
  value?: TValue;

  /**
   * Thuộc tính tùy biến truyền bổ sung vào component editor (DateRangePicker, DatePicker, CheckboxGroup...)
   */
  props?: Record<string, unknown>;

  /**
   * Thời gian trì hoãn debounce (ms) riêng cho trường lọc này ở chế độ server (tùy chọn)
   */
  debounceMs?: number;

  /**
   * Hàm render component tùy biến khi `type: 'custom'`
   */
  render?: (props: {
    value: TValue;
    onChange: (val: TValue) => void;
  }) => ReactNode;
}

/**
 * Thuộc tính của thanh công cụ bảng `<TableToolbar />`
 */
export interface TableToolbarProps<TData extends RowData = RowData> {
  /**
   * Instance của bảng ReactTable từ hook TanStack Table v9
   */
  table: ReactTable<DefaultTableFeatures, TData>;

  /**
   * Placeholder gợi ý cho ô tìm kiếm toàn bảng
   * @default 'Tìm kiếm trong bảng...'
   */
  searchPlaceholder?: string;

  /**
   * Bật ô tìm kiếm toàn bảng (Global Filter)
   * @default true
   */
  enableGlobalFilter?: boolean;

  /**
   * Bật menu Popover cho phép người dùng ẩn/hiện từng cột
   * @default true
   */
  enableColumnVisibility?: boolean;

  /**
   * Bật nút làm mới dữ liệu trên thanh công cụ (Refresh button)
   * @default false
   */
  isRefresh?: boolean;

  /**
   * Callback được gọi khi người dùng click vào nút làm mới trên thanh công cụ
   */
  onRefresh?: () => void;

  /**
   * Các nút hành động tùy biến hiển thị ở góc phải thanh công cụ (ví dụ: Thêm mới, Bộ lọc nâng cao, Xuất file...)
   */
  actions?: ReactNode;

  /**
   * Hàm render các nút hành động hàng loạt khi có ít nhất 1 dòng được chọn (Bulk Actions)
   */
  selectedActions?: (selectedRows: Row<DefaultTableFeatures, TData>[]) => ReactNode;

  /**
   * Danh sách cấu hình các bộ lọc menu hiển thị trên thanh công cụ
   */
  filters?: TableFilterDef[];

  /**
   * Giá trị hiện tại của các bộ lọc: `{ [name]: value }`
   */
  filterValues?: Record<string, unknown>;

  /**
   * Callback khi một bộ lọc thay đổi giá trị
   */
  onFilterChange?: (name: string, value: unknown) => void;

  /**
   * Callback khi người dùng bấm "Đặt lại bộ lọc" (Reset all)
   */
  onFilterReset?: () => void;

  /**
   * Class tùy biến cho thanh công cụ
   */
  className?: string;
}

// ============================================================================
// 4. HIGH-LEVEL ALL-IN-ONE DATATABLE COMPONENT PROPS
// ============================================================================

/**
 * Thuộc tính của component bảng hoàn chỉnh `<DataTable />`
 * Tích hợp sẵn toàn bộ tính năng của TanStack Table v9.
 */
export interface DataTableProps<TData extends RowData = RowData> {
  /**
   * Danh sách định nghĩa các cột dữ liệu (sử dụng helper `createTableColumnHelper` để tạo)
   */
  columns:
    | ColumnDef<DefaultTableFeatures, TData, unknown>[]
    | ReturnType<ColumnHelper<DefaultTableFeatures, TData>["columns"]>;

  /**
   * Mảng dữ liệu nguồn hiển thị trong bảng
   */
  data: TData[];

  /**
   * Biến thể giao diện của bảng:
   * - 'default': Viền ngang mờ thanh lịch
   * - 'striped': Dòng xen kẽ màu (Zebra stripes)
   * - 'bordered': Viền lưới đầy đủ bao quanh từng ô
   * @default 'default'
   */
  variant?: TableVariant;

  /**
   * Kích thước bảng ('sm' nhỏ gọn, 'md' chuẩn, 'lg' thoáng đãng)
   * @default 'md'
   */
  size?: TableSize;

  // --- TRẠNG THÁI TẢI & RỖNG ---

  /**
   * Trạng thái đang tải dữ liệu (tự động hiển thị các dòng Skeleton animation)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Bật nút làm mới dữ liệu trên thanh công cụ (Refresh button)
   * @default false
   */
  isRefresh?: boolean;

  /**
   * Callback được gọi khi người dùng click vào nút làm mới trên thanh công cụ
   */
  onRefresh?: () => void;

  /**
   * Số dòng Skeleton hiển thị khi đang tải (`isLoading={true}`)
   * @default 5
   */
  loadingRowsCount?: number;

  /**
   * Văn bản hiển thị khi bảng không có dữ liệu
   * @default 'Không có dữ liệu hiển thị'
   */
  emptyText?: string;

  /**
   * Hình ảnh hoặc component minh họa tùy biến khi bảng không có dữ liệu (thay thế Empty mặc định)
   */
  emptyIllustration?: ReactNode;

  // --- BẬT / TẮT TÍNH NĂNG ---

  /**
   * Bật tính năng sắp xếp (Sorting) khi click vào tiêu đề cột
   * @default true
   */
  enableSorting?: boolean;

  /**
   * Bật ô tìm kiếm toàn bảng (Global Filter) trên thanh công cụ
   * @default true
   */
  enableFiltering?: boolean;

  /**
   * Bật thanh phân trang (Pagination) ở chân bảng
   * @default true
   */
  enablePagination?: boolean;

  /**
   * Bật tính năng chọn dòng (tự động chèn cột Checkbox chọn dòng và chọn tất cả)
   * @default false
   */
  enableRowSelection?: boolean;

  /**
   * Bật menu Popover cho phép người dùng chủ động ẩn/hiện từng cột
   * @default true
   */
  enableColumnVisibility?: boolean;

  /**
   * Bật tính năng kéo thả thay đổi thứ tự các cột (Column Ordering / Dnd)
   * @default false
   */
  enableColumnOrdering?: boolean;

  // --- THANH CÔNG CỤ & HÀNH ĐỘNG HÀNG LOẠT ---

  /**
   * Văn bản gợi ý placeholder cho ô tìm kiếm
   * @default 'Tìm kiếm trong bảng...'
   */
  searchPlaceholder?: string;

  /**
   * Các nút hành động tùy biến đặt ở góc phải thanh công cụ (ví dụ: Nút thêm mới, Export...)
   */
  toolbarActions?: ReactNode;

  /**
   * Render các nút thao tác hàng loạt khi có dòng được chọn (ví dụ: Xóa, Đổi trạng thái, Xuất dữ liệu...)
   */
  renderBulkActions?: (selectedRows: Row<DefaultTableFeatures, TData>[]) => ReactNode;

  // --- CẤU HÌNH PHÂN TRANG ---

  /**
   * Danh sách các tùy chọn số lượng dòng trên mỗi trang
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Số lượng dòng hiển thị mặc định mỗi trang khi khởi tạo
   * @default 10
   */
  initialPageSize?: number;

  // --- CHẾ ĐỘ MÁY CHỦ (SERVER-SIDE / MANUAL MODE) ---

  /**
   * Bật chế độ phân trang thủ công từ server (dữ liệu đã được cắt sẵn theo trang từ API)
   * @default false
   */
  manualPagination?: boolean;

  /**
   * Bật chế độ sắp xếp thủ công từ server (truyền tham số sort lên API)
   * @default false
   */
  manualSorting?: boolean;

  /**
   * Bật chế độ tìm kiếm/lọc thủ công từ server (truyền từ khóa filter lên API)
   * @default false
   */
  manualFiltering?: boolean;

  /**
   * Thời gian trì hoãn debounce (ms) khi thay đổi bộ lọc hoặc tìm kiếm ở chế độ server (`manualFiltering: true`).
   * Áp dụng cho toàn bộ các trường Input, NumberInput, DatePicker, DateRangePicker, CheckboxGroup/Select, custom và tìm kiếm toàn bảng.
   * Đặt 0 để tắt debounce (gọi ngay lập tức).
   * @default 300
   */
  debounceMs?: number;

  /**
   * Tổng số trang trả về từ máy chủ (bắt buộc khi dùng `manualPagination={true}`)
   */
  pageCount?: number;

  /**
   * Tổng số lượng bản ghi thực tế từ máy chủ
   */
  rowCount?: number;

  // --- TRẠNG THÁI ĐIỀU KHIỂN (CONTROLLED STATES) ---

  /**
   * Trạng thái phân trang điều khiển ngoài: `{ pageIndex, pageSize }`
   */
  pagination?: PaginationState;

  /**
   * Callback khi trạng thái phân trang thay đổi
   */
  onPaginationChange?: ((pagination: PaginationState) => void) | OnChangeFn<PaginationState>;

  /**
   * Trạng thái sắp xếp điều khiển ngoài: `Array<{ id, desc }>`
   */
  sorting?: SortingState;

  /**
   * Callback khi trạng thái sắp xếp thay đổi
   */
  onSortingChange?: ((sorting: SortingState) => void) | OnChangeFn<SortingState>;

  /**
   * Trạng thái dòng được chọn điều khiển ngoài: `Record<rowId, boolean>`
   */
  rowSelection?: RowSelectionState;

  /**
   * Callback khi danh sách dòng được chọn thay đổi
   */
  onRowSelectionChange?: ((selection: RowSelectionState) => void) | OnChangeFn<RowSelectionState>;

  /**
   * Trạng thái hiển thị cột điều khiển ngoài: `Record<columnId, boolean>`
   */
  columnVisibility?: ColumnVisibilityState;

  /**
   * Callback khi trạng thái hiển thị cột thay đổi
   */
  onColumnVisibilityChange?: ((visibility: ColumnVisibilityState) => void) | OnChangeFn<ColumnVisibilityState>;

  /**
   * Trạng thái thứ tự các cột điều khiển ngoài (mảng danh sách ID cột)
   */
  columnOrder?: string[];

  /**
   * Callback khi thứ tự cột thay đổi
   */
  onColumnOrderChange?: ((order: string[]) => void) | OnChangeFn<string[]>;

  /**
   * Từ khóa tìm kiếm toàn bảng điều khiển ngoài
   */
  globalFilter?: string;

  /**
   * Callback khi từ khóa tìm kiếm toàn bảng thay đổi
   */
  onGlobalFilterChange?: (filter: string) => void;

  /**
   * Hàm hoặc tên bộ lọc toàn bảng tùy biến (FilterFn hoặc 'fuzzy').
   * Mặc định DataTable sử dụng `fuzzyFilter` (Fuzzy Search từ @tanstack/match-sorter-utils).
   */
  globalFilterFn?: FilterFnOption<DefaultTableFeatures, TData>;

  /**
   * Danh sách cấu hình các bộ lọc menu hiển thị dạng SelectMenuFilter trên thanh công cụ
   */
  filters?: TableFilterDef[];

  /**
   * Trạng thái bộ lọc cột điều khiển ngoài (ColumnFiltersState của TanStack Table)
   */
  columnFilters?: ColumnFiltersState;

  /**
   * Callback khi trạng thái bộ lọc cột thay đổi (trả về mảng ColumnFiltersState của TanStack Table)
   */
  onColumnFiltersChange?: ((filters: ColumnFiltersState) => void) | OnChangeFn<ColumnFiltersState>;

  // --- MỞ RỘNG DÒNG (ROW EXPANDING & TREE DATA) ---

  /**
   * Bật tính năng mở rộng dòng (tự động bật nếu có `renderExpandedRow`, `getSubRows`, hoặc `expanded`)
   * @default false
   */
  enableExpanding?: boolean;

  /**
   * Bật hiệu ứng mở rộng mượt mà (smooth slide down, fade in và hiệu ứng chuyển động)
   * @default true
   */
  enableExpandingAnimation?: boolean;

  /**
   * Trạng thái dòng mở rộng điều khiển ngoài (Controlled state): `Record<rowId, boolean> | true`
   */
  expanded?: ExpandedState;

  /**
   * Callback khi trạng thái mở rộng dòng thay đổi
   */
  onExpandedChange?: ((expanded: ExpandedState) => void) | OnChangeFn<ExpandedState>;

  /**
   * Hàm trích xuất dữ liệu con cho cấu trúc cây phân cấp (Tree Data đa tầng)
   */
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[];

  /**
   * Điều kiện tùy biến xác định dòng nào có thể mở rộng được
   */
  getRowCanExpand?: (row: Row<DefaultTableFeatures, TData>) => boolean;

  /**
   * Bật chế độ mở rộng thủ công từ máy chủ (Server-side expanding)
   * @default false
   */
  manualExpanding?: boolean;

  /**
   * Tự động thu gọn các dòng đã mở rộng khi dữ liệu thay đổi hoặc phân trang
   * @default true
   */
  autoResetExpanded?: boolean;

  /**
   * Phân trang các dòng con cùng với các dòng chính của bảng
   * @default true
   */
  paginateExpandedRows?: boolean;

  /**
   * Hàm render giao diện tùy biến (Detail Panel gộp colSpan) bên dưới dòng cha khi mở rộng
   */
  renderExpandedRow?: (row: Row<DefaultTableFeatures, TData>) => ReactNode;

  /**
   * Tự động hiển thị nút mở rộng dòng
   * @default true (khi tính năng expanding được kích hoạt)
   */
  showExpandColumn?: boolean;

  /**
   * Chế độ hiển thị nút mở rộng dòng:
   * - 'integrated': Tích hợp trực tiếp nút mở rộng và thụt lề vào cột dữ liệu đầu tiên (mặc định, không tách riêng cột)
   * - 'standalone': Tách thành một cột riêng biệt `_expand`
   * - 'none': Không tự động render UI nút mở rộng
   * @default 'integrated'
   */
  expandColumnMode?: "integrated" | "standalone" | "none";

  /**
   * ID cột được tích hợp nút mở rộng khi dùng chế độ `expandColumnMode='integrated'`.
   * Mặc định tự động gắn vào cột nội dung đầu tiên (sau cột `_select`).
   */
  expandColumnId?: string;

  /**
   * Vị trí đặt cột nút mở rộng dòng khi ở chế độ `expandColumnMode='standalone'` ('start' ở đầu bảng, 'end' ở cuối bảng)
   * @default 'start'
   */
  expandColumnPosition?: "start" | "end";

  /**
   * Mức độ thụt đầu dòng tối đa cho dữ liệu dạng cây (tránh thụt quá sâu làm vỡ layout)
   * @default 4
   */
  maxIndentDepth?: number;

  /**
   * Khoảng cách thụt lề cho mỗi cấp độ sâu (tính bằng rem)
   * @default 1.25
   */
  indentSize?: number;

  // --- SỰ KIỆN TƯƠNG TÁC ---

  /**
   * Callback được kích hoạt khi người dùng click vào một dòng trong bảng
   */
  onRowClick?: (row: Row<DefaultTableFeatures, TData>) => void;

  // --- TÙY BIẾN STYLE & CLASS ---

  /**
   * Class tùy biến cho phần tử bọc ngoài toàn bộ component (gồm toolbar + table + pagination)
   */
  className?: string;

  /**
   * Class tùy biến cho khung container bao quanh trực tiếp thẻ table
   */
  containerClassName?: string;
}
