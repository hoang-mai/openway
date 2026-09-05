import { useCallback, useMemo, useState } from "react";
import {
  useQuery,
  keepPreviousData,
  type QueryFunctionContext,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowData,
  SortingState,
  Updater,
} from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "../constants";

/**
 * Các tham số truy vấn chuẩn hóa gửi lên API máy chủ.
 */
export interface TableQueryParams {
  /**
   * Số thứ tự trang (1-indexed: 1, 2, 3...)
   */
  page: number;

  /**
   * Kích thước trang (số dòng trên 1 trang)
   */
  pageSize: number;

  /**
   * ID cột được sắp xếp
   */
  sortBy?: string;

  /**
   * Chiều sắp xếp: "asc" (tăng dần) hoặc "desc" (giảm dần)
   */
  sortOrder?: "asc" | "desc";

  /**
   * Danh sách bộ lọc cột dạng từ điển phẳng Record<cột, giá trị>
   */
  filters?: Record<string, unknown>;
}

/**
 * Các tùy chọn cấu hình cho hook `useTableQuery`.
 */
export interface UseTableQueryOptions<TData extends RowData = RowData, TResponse = unknown, TError = Error> {
  /**
   * Base query key cho TanStack Query.
   * `queryParams` sẽ tự động được thêm vào cuối queryKey: `[...queryKey, queryParams]`.
   */
  queryKey: readonly unknown[];

  /**
   * Hàm gọi API truy vấn dữ liệu từ máy chủ.
   * Nhận vào `queryParams` đã chuẩn hóa và `context` của TanStack Query.
   */
  queryFn: (params: TableQueryParams, context: QueryFunctionContext<readonly unknown[]>) => Promise<TResponse>;

  /**
   * Hàm trích xuất mảng dữ liệu các dòng (`TData[]`) từ kết quả API trả về.
   * Mặc định tự động kiểm tra `response.data`, `response.items`, `response.rows`, `response.results` hoặc bản thân mảng response.
   */
  selectData?: (response: TResponse) => TData[];

  /**
   * Hàm trích xuất tổng số lượng bản ghi (`rowCount` / `total`) từ kết quả API trả về.
   * Mặc định tự động kiểm tra `response.total`, `response.rowCount`, `response.totalCount`, `response.count`.
   */
  selectRowCount?: (response: TResponse) => number;

  /**
   * Cấu hình phân trang ban đầu
   */
  initialPagination?: {
    pageIndex?: number;
    pageSize?: number;
  };

  /**
   * Cấu hình sắp xếp ban đầu
   */
  initialSorting?: SortingState;

  /**
   * Cấu hình bộ lọc cột ban đầu
   */
  initialColumnFilters?: ColumnFiltersState;

  /**
   * Cấu hình từ khóa tìm kiếm ban đầu
   */
  initialGlobalFilter?: string;

  /**
   * Tự động đưa về trang đầu (pageIndex = 0) khi thay đổi tìm kiếm, bộ lọc hoặc sắp xếp.
   * @default true
   */
  autoResetPageIndex?: boolean;

  /**
   * Các tùy chọn nâng cao truyền trực tiếp cho hook `useQuery` của TanStack Query
   * (ví dụ: `staleTime`, `gcTime`, `refetchOnWindowFocus`, `enabled`...).
   */
  queryOptions?: Omit<UseQueryOptions<TResponse, TError, TResponse, readonly unknown[]>, "queryKey" | "queryFn">;
}

/**
 * Kết quả trả về từ hook `useTableQuery`.
 */
export interface UseTableQueryReturn<TData extends RowData = RowData, TResponse = unknown, TError = Error> {
  /**
   * Tập props trọn gói sẵn sàng truyền thẳng vào `<DataTable {...tableProps} />`
   */
  tableProps: {
    data: TData[];
    rowCount: number;
    isLoading: boolean;
    isRefresh: boolean;
    onRefresh: () => void;
    manualPagination: true;
    manualSorting: true;
    manualFiltering: true;
    pagination: PaginationState;
    onPaginationChange: OnChangeFn<PaginationState>;
    sorting: SortingState;
    onSortingChange: OnChangeFn<SortingState>;
    columnFilters: ColumnFiltersState;
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
    globalFilter: string;
    onGlobalFilterChange: (filter: string) => void;
  };

  /**
   * Instance query đầy đủ từ TanStack Query
   */
  query: UseQueryResult<TResponse, TError>;

  /**
   * Tham số truy vấn hiện tại (dùng để debug, ghi log, đồng bộ URL query string, hoặc xuất Excel)
   */
  queryParams: TableQueryParams;

  /**
   * Đặt lại toàn bộ phân trang, sắp xếp, tìm kiếm và bộ lọc về giá trị mặc định ban đầu
   */
  resetAll: () => void;

  /**
   * Đổi trang thủ công (1-indexed: 1, 2, 3...)
   */
  setPage: (page: number) => void;

  /**
   * Đổi số dòng trên mỗi trang thủ công
   */
  setPageSize: (pageSize: number) => void;

  /**
   * Đổi từ khóa tìm kiếm toàn bảng (lọc client-side)
   */
  setGlobalFilter: (filter: string) => void;

  /**
   * Cập nhật trạng thái sắp xếp
   */
  setSorting: (sorting: SortingState | ((prev: SortingState) => SortingState)) => void;

  /**
   * Cập nhật trạng thái bộ lọc cột
   */
  setColumnFilters: (filters: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
}

/**
 * Trích xuất mặc định danh sách dòng dữ liệu từ API response.
 */
function defaultSelectData<TData>(response: unknown): TData[] {
  if (!response) return [];
  if (Array.isArray(response)) return response as TData[];
  if (typeof response === "object") {
    const obj = response as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as TData[];
    if (Array.isArray(obj.items)) return obj.items as TData[];
    if (Array.isArray(obj.rows)) return obj.rows as TData[];
    if (Array.isArray(obj.results)) return obj.results as TData[];
  }
  return [];
}

/**
 * Trích xuất mặc định tổng số lượng bản ghi từ API response.
 */
function defaultSelectRowCount(response: unknown): number {
  if (!response) return 0;
  if (Array.isArray(response)) return response.length;
  if (typeof response === "object") {
    const obj = response as Record<string, unknown>;
    const total = obj.total ?? obj.rowCount ?? obj.totalCount ?? obj.count;
    if (typeof total === "number") return total;
    if (typeof total === "string") {
      const parsed = Number(total);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return 0;
}

/**
 * Helper giải quyết Updater của TanStack Table
 */
function resolveUpdater<T>(updater: Updater<T>, prev: T): T {
  return typeof updater === "function" ? (updater as (old: T) => T)(prev) : updater;
}

/**
 * Hook Adapter `useTableQuery` tích hợp TanStack Table v9 và TanStack Query v5.
 *
 * Tính năng:
 * - Đồng bộ hai chiều trạng thái bảng (Pagination, Sorting, Filtering, Search) với server API.
 * - Tự động định dạng tham số `TableQueryParams`: `page` (1-indexed), `pageSize`, `search`, `sortBy`, `sortOrder`, `filters`.
 * - Tự động gắn `queryParams` vào `queryKey` của TanStack Query để kích hoạt cache/refetch thông minh.
 * - Hỗ trợ phân trang mượt mà bằng `placeholderData: keepPreviousData` (không bị nhấp nháy Skeleton khi chuyển trang).
 * - Cung cấp `tableProps` dựng sẵn truyền trực tiếp vào `<DataTable {...tableProps} />`.
 */
export function useTableQuery<TData extends RowData = RowData, TResponse = unknown, TError = Error>(
  options: UseTableQueryOptions<TData, TResponse, TError>
): UseTableQueryReturn<TData, TResponse, TError> {
  const {
    queryKey,
    queryFn,
    selectData = defaultSelectData,
    selectRowCount = defaultSelectRowCount,
    initialPagination,
    initialSorting,
    initialColumnFilters,
    initialGlobalFilter,
    autoResetPageIndex = true,
    queryOptions,
  } = options;

  // 1. Quản lý trạng thái bảng (Table states)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPagination?.pageIndex ?? 0,
    pageSize: initialPagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  });

  const [sorting, setSorting] = useState<SortingState>(initialSorting ?? []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters ?? []);
  const [globalFilter, setGlobalFilter] = useState<string>(initialGlobalFilter ?? "");

  // 2. Chuẩn hóa tham số query gửi lên server
  const queryParams = useMemo<TableQueryParams>(() => {
    const params: TableQueryParams = {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    };

    const firstSort = sorting[0];
    if (firstSort) {
      params.sortBy = firstSort.id;
      params.sortOrder = firstSort.desc ? "desc" : "asc";
    }

    if (columnFilters.length > 0) {
      const filtersDict: Record<string, unknown> = {};
      columnFilters.forEach((cf) => {
        filtersDict[cf.id] = cf.value;
      });
      params.filters = filtersDict;
    }

    return params;
  }, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]);

  // 3. Ghép queryKey với queryParams
  const fullQueryKey = useMemo(() => [...queryKey, queryParams] as const, [queryKey, queryParams]);

  // 4. Gọi useQuery của TanStack Query v5
  const query = useQuery<TResponse, TError, TResponse, readonly unknown[]>({
    queryKey: fullQueryKey,
    queryFn: (ctx) => queryFn(queryParams, ctx),
    placeholderData: keepPreviousData,
    ...queryOptions,
  });

  // 5. Trích xuất dữ liệu hàng và tổng số lượng
  const data = useMemo<TData[]>(() => {
    return query.data ? selectData(query.data) : [];
  }, [query.data, selectData]);

  const rowCount = useMemo<number>(() => {
    return query.data ? selectRowCount(query.data) : 0;
  }, [query.data, selectRowCount]);

  // 6. Xử lý các sự kiện thay đổi trạng thái kèm autoResetPageIndex
  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback((updater) => {
    setPagination((prev) => resolveUpdater(updater, prev));
  }, []);

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      setSorting((prev) => resolveUpdater(updater, prev));
      if (autoResetPageIndex) {
        setPagination((prev) => (prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }));
      }
    },
    [autoResetPageIndex]
  );

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (updater) => {
      setColumnFilters((prev) => resolveUpdater(updater, prev));
      if (autoResetPageIndex) {
        setPagination((prev) => (prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }));
      }
    },
    [autoResetPageIndex]
  );

  const handleGlobalFilterChange = useCallback(
    (filter: string) => {
      setGlobalFilter(filter);
      if (autoResetPageIndex) {
        setPagination((prev) => (prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }));
      }
    },
    [autoResetPageIndex]
  );

  // 7. Các hàm tiện ích bổ sung
  const resetAll = useCallback(() => {
    setPagination({
      pageIndex: initialPagination?.pageIndex ?? 0,
      pageSize: initialPagination?.pageSize ?? DEFAULT_PAGE_SIZE,
    });
    setSorting(initialSorting ?? []);
    setColumnFilters(initialColumnFilters ?? []);
    setGlobalFilter(initialGlobalFilter ?? "");
  }, [initialPagination, initialSorting, initialColumnFilters, initialGlobalFilter]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(0, page - 1),
    }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination({
      pageIndex: 0,
      pageSize,
    });
  }, []);

  const setGlobalFilterValue = useCallback(
    (filter: string) => {
      handleGlobalFilterChange(filter);
    },
    [handleGlobalFilterChange]
  );

  // 8. Đóng gói tableProps truyền cho DataTable
  const { isLoading, isRefetching, refetch } = query;

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const tableProps = useMemo(
    () => ({
      data,
      rowCount,
      isLoading,
      isRefresh: isRefetching && !isLoading,
      onRefresh: handleRefresh,
      manualPagination: true as const,
      manualSorting: true as const,
      manualFiltering: true as const,
      pagination,
      onPaginationChange: handlePaginationChange,
      sorting,
      onSortingChange: handleSortingChange,
      columnFilters,
      onColumnFiltersChange: handleColumnFiltersChange,
      globalFilter,
      onGlobalFilterChange: handleGlobalFilterChange,
    }),
    [
      data,
      rowCount,
      isLoading,
      isRefetching,
      handleRefresh,
      pagination,
      handlePaginationChange,
      sorting,
      handleSortingChange,
      columnFilters,
      handleColumnFiltersChange,
      globalFilter,
      handleGlobalFilterChange,
    ]
  );

  return {
    tableProps,
    query,
    queryParams,
    resetAll,
    setPage,
    setPageSize,
    setGlobalFilter: setGlobalFilterValue,
    setSorting,
    setColumnFilters,
  };
}
