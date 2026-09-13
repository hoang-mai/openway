import React, { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { SelectOptionItem } from "../types";
import { useInfiniteScroll, type UseInfiniteScrollOptions } from "@/hooks/useInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";
import Skeleton from "@/components/skeleton/Skeleton";

/**
 * Các tham số truy vấn chuẩn hóa được chuyển tới hàm `queryFn`.
 */
export interface SelectQueryParams<
  TPageParam = number,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * Tham số phân trang hiện tại (trang hiện tại hoặc cursor).
   */
  pageParam: TPageParam;

  /**
   * Bộ lọc gửi lên backend (đã bao gồm từ khóa tìm kiếm được merge theo searchField).
   */
  filters: TFilters;
}

/**
 * Hàm hỗ trợ tự động trích xuất mảng dữ liệu từ các cấu trúc response phổ biến.
 */
function extractRawOptions(response: unknown): unknown[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (typeof response !== "object") return [];

  const record = response as Record<string, unknown>;
  if (Array.isArray(record.data)) return record.data;
  if (Array.isArray(record.items)) return record.items;
  if (Array.isArray(record.options)) return record.options;
  if (Array.isArray(record.results)) return record.results;
  if (Array.isArray(record.rows)) return record.rows;

  return [];
}

/**
 * Các tùy chọn cấu hình cho hook `useSelectInfiniteQuery`.
 */
export interface UseSelectInfiniteQueryOptions<
  TData = unknown,
  TResponse = unknown,
  TPageParam = number,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
  TError = Error,
> {
  /**
   * Base query key cho TanStack Query.
   * `[{ search, filters }]` sẽ tự động được thêm vào cuối queryKey:
   * `[...queryKey, { search, filters }]`.
   */
  queryKey: readonly unknown[];

  /**
   * Hàm gọi API truy vấn dữ liệu từ máy chủ theo từng trang.
   * Nhận vào `SelectQueryParams` đã chuẩn hóa và `context` của TanStack Query.
   */
  queryFn: (
    params: SelectQueryParams<TPageParam, TFilters>,
    context: QueryFunctionContext<readonly unknown[], TPageParam>
  ) => Promise<TResponse>;

  /**
   * Giá trị tham số trang đầu tiên (initialPageParam).
   * @default 1
   */
  initialPageParam?: TPageParam;

  /**
   * Hàm xác định `pageParam` cho trang tiếp theo.
   * Trả về `undefined` hoặc `null` khi không còn dữ liệu tiếp theo.
   */
  getNextPageParam?: (
    lastPage: TResponse,
    allPages: TResponse[],
    lastPageParam: TPageParam,
    allPageParams: TPageParam[]
  ) => TPageParam | undefined | null;

  /**
   * Hàm xác định `pageParam` cho trang trước đó (nếu có).
   */
  getPreviousPageParam?: (
    firstPage: TResponse,
    allPages: TResponse[],
    firstPageParam: TPageParam,
    allPageParams: TPageParam[]
  ) => TPageParam | undefined | null;

  /**
   * Hàm trích xuất danh sách options (`SelectOptionItem<TData>[]`) từ mỗi `response` trang.
   * Nếu không truyền, mặc định sẽ kiểm tra `data`, `items`, `options`, `results`, `rows` hoặc chính `response`.
   */
  selectOptions?: (response: TResponse) => SelectOptionItem<TData>[];

  /**
   * Hàm biến đổi từng phần tử thô (raw entity) thành `SelectOptionItem<TData>`.
   */
  mapOption?: (item: unknown, index: number) => SelectOptionItem<TData>;

  /**
   * Thời gian debounce từ khóa tìm kiếm (tính theo ms).
   * @default 300
   */
  debounceMs?: number;

  /**
   * Thời gian debounce cho bộ lọc menu `filters` (tính theo ms).
   * Nếu không truyền, mặc định sẽ dùng cùng giá trị với `debounceMs`.
   * @default 300
   */
  filterDebounceMs?: number;

  /**
   * Tên trường dùng để merge từ khóa tìm kiếm vào `filters` trước khi gửi lên backend trong `queryFn`.
   * Dự án tự quyết định tên trường này phù hợp với API backend (ví dụ: `searchField: "q"`, `"name"`, `"keyword"`...).
   * Mặc định là `"search"`.
   * @default "search"
   */
  searchField?: string;

  /**
   * Từ khóa tìm kiếm ban đầu.
   */
  initialSearch?: string;

  /**
   * Giá trị bộ lọc menu ban đầu.
   */
  initialFilters?: TFilters;

  /**
   * Danh sách options ban đầu ghim sẵn (ví dụ các options đã chọn trước đó cần bảo lưu).
   */
  initialOptions?: SelectOptionItem<TData>[];

  /**
   * Số dòng Skeleton hiển thị khi đang tải thêm trang tiếp theo.
   * @default 2
   */
  skeletonLines?: number;

  /**
   * Chiều cao của mỗi dòng Skeleton khi đang tải thêm trang.
   * @default "1.75rem"
   */
  skeletonHeight?: number | string;

  /**
   * Tùy biến render khi đang tải thêm trang tiếp theo (thay thế Skeleton mặc định).
   */
  renderLoadingMore?: () => ReactNode;

  /**
   * Thông báo hiển thị khi đã tải hết toàn bộ dữ liệu ở đáy danh sách (tùy chọn).
   */
  endMessage?: ReactNode;

  /**
   * Tùy chọn truyền trực tiếp cho hook `useInfiniteScroll`.
   */
  scrollOptions?: Partial<Omit<UseInfiniteScrollOptions, "onLoadMore" | "hasMore" | "isLoading">>;

  /**
   * Các tùy chọn nâng cao truyền trực tiếp cho hook `useInfiniteQuery` của TanStack Query.
   */
  queryOptions?: Omit<
    UseInfiniteQueryOptions<TResponse, TError, InfiniteData<TResponse>, readonly unknown[], TPageParam>,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
  >;
}

/**
 * Kết quả trả về từ hook `useSelectInfiniteQuery`.
 */
export interface UseSelectInfiniteQueryReturn<
  TData = unknown,
  TResponse = unknown,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
  TError = Error,
> {
  /**
   * Bộ props trọn gói sẵn sàng truyền thẳng vào `<Select {...selectProps} />` hoặc `<MultiSelect {...selectProps} />`
   */
  selectProps: {
    options: SelectOptionItem<TData>[];
    isLoading: boolean;
    searchMode: "server";
    searchValue: string;
    onSearchChange: (val: string) => void;
    menuFilterValues: TFilters;
    onMenuFilterChange: (filters: TFilters) => void;
    listFooter: ReactNode;
  };

  /**
   * Instance query đầy đủ từ TanStack Query
   */
  query: UseInfiniteQueryResult<InfiniteData<TResponse>, TError>;

  /**
   * Toàn bộ danh sách options đã gom tụ từ tất cả các trang
   */
  options: SelectOptionItem<TData>[];

  /**
   * Từ khóa tìm kiếm tức thì hiện tại trên ô input
   */
  search: string;

  /**
   * Phương thức cập nhật từ khóa tìm kiếm
   */
  setSearch: (search: string) => void;

  /**
   * Bộ lọc menu hiện tại
   */
  filters: TFilters;

  /**
   * Phương thức cập nhật bộ lọc menu
   */
  setFilters: (filters: TFilters | ((prev: TFilters) => TFilters)) => void;

  /**
   * Ref gắn vào phần tử sentinel (IntersectionObserver)
   */
  sentinelRef: (node: HTMLElement | null) => void;

  /**
   * Đặt lại toàn bộ tìm kiếm, bộ lọc về giá trị ban đầu
   */
  reset: () => void;
}

const EMPTY_FILTERS: Record<string, unknown> = {};

/**
 * Hook `useSelectInfiniteQuery` kết hợp TanStack Query `useInfiniteQuery` với `useInfiniteScroll`
 * dành riêng cho `<Select />` và `<MultiSelect />` ở chế độ máy chủ (`searchMode="server"`).
 */
export function useSelectInfiniteQuery<
  TData = unknown,
  TResponse = unknown,
  TPageParam = number,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
  TError = Error,
>({
  queryKey,
  queryFn,
  initialPageParam = 1 as unknown as TPageParam,
  getNextPageParam,
  getPreviousPageParam,
  selectOptions,
  mapOption,
  debounceMs = 300,
  filterDebounceMs,
  searchField = "search",
  initialSearch = "",
  initialFilters = EMPTY_FILTERS as TFilters,
  initialOptions,
  skeletonLines = 2,
  skeletonHeight = "1.75rem",
  renderLoadingMore,
  endMessage,
  scrollOptions,
  queryOptions,
}: UseSelectInfiniteQueryOptions<TData, TResponse, TPageParam, TFilters, TError>): UseSelectInfiniteQueryReturn<
  TData,
  TResponse,
  TFilters,
  TError
> {
  // 1. Quản lý từ khóa tìm kiếm & bộ lọc menu (với useDebounce)
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, debounceMs);

  const [filters, setFilters] = useState<TFilters>(initialFilters);

  // Đếm số lượng bộ lọc active hiện tại
  const activeFilterCount = useMemo(() => {
    let count = 0;
    for (const key of Object.keys(filters)) {
      const val = (filters as Record<string, unknown>)[key];
      if (val !== undefined && val !== null && val !== "") {
        if (Array.isArray(val)) {
          if (val.length > 0) count++;
        } else {
          count++;
        }
      }
    }
    return count;
  }, [filters]);

  // Nhận diện khi chip/bộ lọc bị xóa để bypass debounce gọi API ngay lập tức
  const [filterTrack, setFilterTrack] = useState({
    prevCount: activeFilterCount,
    prevFilters: filters,
    isFilterRemoved: false,
  });

  if (filters !== filterTrack.prevFilters) {
    setFilterTrack({
      prevCount: activeFilterCount,
      prevFilters: filters,
      isFilterRemoved: activeFilterCount < filterTrack.prevCount,
    });
  }

  const effectiveFilterDelay =
    activeFilterCount === 0 || filterTrack.isFilterRemoved ? 0 : (filterDebounceMs ?? debounceMs);
  const debouncedFiltersVal = useDebounce(filters, effectiveFilterDelay);
  const debouncedFilters = effectiveFilterDelay === 0 ? filters : debouncedFiltersVal;

  // 2. Merge search vào filters theo searchField để gửi lên backend (dự án tự quyết định tên trường)
  const effectiveSearchField = searchField ?? "search";

  const queryFilters = useMemo(() => {
    const next = { ...debouncedFilters } as Record<string, unknown>;
    const keyword = debouncedSearch.trim();
    if (keyword) {
      next[effectiveSearchField] = keyword;
    } else {
      delete next[effectiveSearchField];
    }
    return next as TFilters;
  }, [debouncedFilters, effectiveSearchField, debouncedSearch]);

  // 3. Xây dựng full queryKey kết hợp filters (đã chứa search theo searchField)
  const fullQueryKey = useMemo(() => [...queryKey, { filters: queryFilters }] as const, [queryKey, queryFilters]);

  // 4. Default getNextPageParam thông minh
  const resolvedGetNextPageParam = useCallback(
    (
      lastPage: TResponse,
      allPages: TResponse[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[]
    ): TPageParam | undefined | null => {
      if (getNextPageParam) {
        return getNextPageParam(lastPage, allPages, lastPageParam, allPageParams);
      }

      if (!lastPage || typeof lastPage !== "object") return undefined;
      const record = lastPage as Record<string, unknown>;

      if (typeof record.nextPage === "number" || typeof record.nextPage === "string") {
        return record.nextPage as unknown as TPageParam;
      }
      if (typeof record.next_page === "number" || typeof record.next_page === "string") {
        return record.next_page as unknown as TPageParam;
      }
      if (typeof record.nextCursor === "string" || typeof record.nextCursor === "number") {
        return record.nextCursor as unknown as TPageParam;
      }
      if (typeof record.next_cursor === "string" || typeof record.next_cursor === "number") {
        return record.next_cursor as unknown as TPageParam;
      }

      if (record.hasMore === false || record.has_more === false || record.hasNextPage === false) {
        return undefined;
      }

      if (typeof lastPageParam === "number") {
        const rawItems = extractRawOptions(lastPage);
        if (rawItems.length === 0) return undefined;

        const total =
          typeof record.total === "number"
            ? record.total
            : typeof record.totalCount === "number"
              ? record.totalCount
              : typeof record.count === "number"
                ? record.count
                : undefined;

        if (total !== undefined) {
          const currentCount = allPages.reduce((acc, p) => acc + extractRawOptions(p).length, 0);
          if (currentCount >= total) return undefined;
        }

        return (lastPageParam + 1) as unknown as TPageParam;
      }

      return undefined;
    },
    [getNextPageParam]
  );

  // 5. TanStack Query useInfiniteQuery
  const query = useInfiniteQuery<TResponse, TError, InfiniteData<TResponse>, readonly unknown[], TPageParam>({
    queryKey: fullQueryKey,
    queryFn: (context) => {
      return queryFn(
        {
          pageParam: context.pageParam as TPageParam,
          filters: queryFilters,
        },
        context
      );
    },
    initialPageParam,
    getNextPageParam: resolvedGetNextPageParam,
    getPreviousPageParam,
    ...queryOptions,
  });

  // 6. Trích xuất và gom tụ options từ tất cả các trang
  const options = useMemo<SelectOptionItem<TData>[]>(() => {
    const pages = query.data?.pages ?? [];
    const allItems: SelectOptionItem<TData>[] = [];
    const seen = new Set<string | number>();

    // Nếu có initialOptions, đưa vào danh sách trước
    if (initialOptions && initialOptions.length > 0) {
      for (const opt of initialOptions) {
        if (!seen.has(opt.value)) {
          seen.add(opt.value);
          allItems.push(opt);
        }
      }
    }

    for (const page of pages) {
      let pageOptions: SelectOptionItem<TData>[] = [];

      if (selectOptions) {
        pageOptions = selectOptions(page);
      } else {
        const raw = extractRawOptions(page);
        if (mapOption) {
          pageOptions = raw.map((item, index) => mapOption(item, index));
        } else {
          pageOptions = raw as SelectOptionItem<TData>[];
        }
      }

      for (const opt of pageOptions) {
        if (opt && opt.value !== undefined && !seen.has(opt.value)) {
          seen.add(opt.value);
          allItems.push(opt);
        }
      }
    }

    return allItems;
  }, [query.data?.pages, selectOptions, mapOption, initialOptions]);

  // 7. useInfiniteScroll để tải trang tiếp theo khi người dùng cuộn đến cuối
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    },
    hasMore: Boolean(query.hasNextPage),
    isLoading: query.isFetchingNextPage || query.isLoading,
    disabled: query.isError,
    rootMargin: scrollOptions?.rootMargin ?? "80px",
    threshold: scrollOptions?.threshold ?? 0,
    root: scrollOptions?.root,
  });

  // 8. Reset state
  const reset = useCallback(() => {
    setSearch(initialSearch);
    setFilters(initialFilters);
  }, [initialSearch, initialFilters]);

  // 10. Giao diện Skeleton / Sentinel dưới đáy danh sách (listFooter)
  const listFooter = useMemo<ReactNode>(() => {
    // Nếu chưa có option nào thì để màn hình loading chính của SelectMenu hiển thị
    if (options.length === 0) return null;

    if (query.isFetchingNextPage) {
      return (
        <div ref={sentinelRef} className="p-1 space-y-1 w-full">
          {renderLoadingMore ? (
            renderLoadingMore()
          ) : (
            <Skeleton lines={skeletonLines} height={skeletonHeight} gap="0.25rem" radius="sm" className="p-0.5" />
          )}
        </div>
      );
    }

    if (query.hasNextPage) {
      return <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />;
    }

    if (endMessage) {
      return <div className="py-2 px-1 text-center text-xs text-neutral-400">{endMessage}</div>;
    }

    return null;
  }, [
    options.length,
    query.isFetchingNextPage,
    query.hasNextPage,
    sentinelRef,
    renderLoadingMore,
    skeletonLines,
    skeletonHeight,
    endMessage,
  ]);

  // 10. Đóng gói selectProps trọn gói (Single Source of Truth)
  const selectProps = useMemo(
    () => ({
      options,
      isLoading: query.isLoading,
      searchMode: "server" as const,
      searchValue: search,
      onSearchChange: setSearch,
      menuFilterValues: filters,
      onMenuFilterChange: (newFilters: TFilters) => setFilters(newFilters),
      listFooter,
    }),
    [options, query.isLoading, search, setSearch, filters, setFilters, listFooter]
  );

  return {
    selectProps,
    query,
    options,
    search,
    setSearch,
    filters,
    setFilters,
    sentinelRef,
    reset,
  };
}

export default useSelectInfiniteQuery;
