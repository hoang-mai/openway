import {
  tableFeatures,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  columnPinningFeature,
  columnOrderingFeature,
  createSortedRowModel,
  createPaginatedRowModel,
  createFilteredRowModel,
  createColumnHelper,
  useTable,
  type TableOptions,
  type RowData,
  type ColumnHelper,
  type ReactTable,
} from "@tanstack/react-table";
import { fuzzyFilter } from "./fuzzyFilter";

/**
 * Bộ features tiêu chuẩn của @openway/ui dành cho TanStack Table v9.
 * Bao gồm: Sắp xếp (Sorting), Phân trang (Pagination), Chọn dòng (Row Selection),
 * Lọc cột & Lọc toàn bảng (Column & Global Filtering), Ẩn/hiện cột (Visibility),
 * Ghim cột (Pinning), và Sắp xếp thứ tự cột (Column Ordering).
 */
export const defaultTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  columnPinningFeature,
  columnOrderingFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    fuzzy: fuzzyFilter,
  },
});

export type DefaultTableFeatures = typeof defaultTableFeatures;

/**
 * Helper tạo định nghĩa cột (column definitions) có type-safety đầy đủ
 * gắn liền với DefaultTableFeatures của TanStack Table v9.
 */
export function createTableColumnHelper<TData extends RowData = RowData>(): ColumnHelper<
  DefaultTableFeatures,
  TData
> {
  return createColumnHelper<DefaultTableFeatures, TData>();
}

export type UseDataTableOptions<TData extends RowData = RowData> = Omit<
  TableOptions<DefaultTableFeatures, TData>,
  "features" | "columns"
> & {
  features?: DefaultTableFeatures;
  columns:
    | TableOptions<DefaultTableFeatures, TData>["columns"]
    | ReturnType<ColumnHelper<DefaultTableFeatures, TData>["columns"]>;
};

/**
 * Hook `useDataTable` bọc `useTable` của TanStack Table v9 với cấu hình
 * tính năng mặc định tối ưu sẵn cho @openway/ui.
 */
export function useDataTable<TData extends RowData = RowData>(
  options: UseDataTableOptions<TData>
): ReactTable<DefaultTableFeatures, TData> {
  const { features = defaultTableFeatures, columns, ...restOptions } = options;
  return useTable({
    features,
    columns: columns as TableOptions<DefaultTableFeatures, TData>["columns"],
    ...restOptions,
  });
}
