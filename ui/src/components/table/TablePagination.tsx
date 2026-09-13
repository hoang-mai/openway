import { useMemo } from "react";
import type { RowData } from "@tanstack/react-table";
import type { TablePaginationProps } from "./types";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "./constants";
import IconButton from "../button/IconButton";
import { Select } from "../select/Select";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import DoubleChevronLeftIcon from "../icons/DoubleChevronLeftIcon";
import DoubleChevronRightIcon from "../icons/DoubleChevronRightIcon";

function getPaginationRange(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function TablePagination<TData extends RowData = RowData>({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPageSizeSelector = true,
  className = "",
}: TablePaginationProps<TData>) {
  const pagination = table.state.pagination;
  const pageIndex = pagination?.pageIndex ?? 0;
  const pageSize = pagination?.pageSize ?? 10;
  const pageCount = table.getPageCount();

  const totalPages = Math.max(pageCount, 1);
  const currentPage = pageIndex + 1;

  const canPrevious = table.getCanPreviousPage();
  const canNext = table.getCanNextPage();

  const pageSizeSelectOptions = useMemo(
    () =>
      pageSizeOptions.map((size) => ({
        label: `${size}`,
        value: size,
      })),
    [pageSizeOptions]
  );

  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-3 text-xs text-neutral-600 ${className}`.trim()}
    >
      {/* Tùy chọn kích cỡ trang */}
      {showPageSizeSelector ? (
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Số dòng/trang:</span>
          <div className="w-20" data-testid="table-page-size-selector">
            <Select
              size="sm"
              options={pageSizeSelectOptions}
              value={pageSize}
              onChange={(val) => {
                if (val !== null && val !== undefined) {
                  table.setPageSize(Number(val));
                }
              }}
              searchable={false}
              aria-label="Số dòng mỗi trang"
            />
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* Điều hướng và các nút phân trang */}
      <div className="flex items-center gap-1 ml-auto sm:ml-0">
        <IconButton
          icon={<DoubleChevronLeftIcon className="w-3.5 h-3.5" />}
          aria-label="Trang đầu"
          size="sm"
          variant="outline"
          color="neutral"
          disabled={!canPrevious}
          onClick={() => table.firstPage()}
        />
        <IconButton
          icon={<ChevronLeftIcon className="w-3.5 h-3.5" />}
          aria-label="Trang trước"
          size="sm"
          variant="outline"
          color="neutral"
          disabled={!canPrevious}
          onClick={() => table.previousPage()}
        />

        {/* Các số trang hiển thị dạng bo tròn full đặt ở giữa các IconButton */}
        <div className="flex items-center gap-1 px-1">
          {paginationRange.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 flex items-center justify-center text-xs text-neutral-400 select-none"
                >
                  ...
                </span>
              );
            }

            const pageNum = Number(item);
            const isCurrent = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => table.setPageIndex(pageNum - 1)}
                aria-label={`Trang ${pageNum}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  isCurrent
                    ? "border border-primary-600 text-primary-600 font-semibold bg-primary-50/70 shadow-xs"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 font-medium"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <IconButton
          icon={<ChevronRightIcon className="w-3.5 h-3.5" />}
          aria-label="Trang sau"
          size="sm"
          variant="outline"
          color="neutral"
          disabled={!canNext}
          onClick={() => table.nextPage()}
        />
        <IconButton
          icon={<DoubleChevronRightIcon className="w-3.5 h-3.5" />}
          aria-label="Trang cuối"
          size="sm"
          variant="outline"
          color="neutral"
          disabled={!canNext}
          onClick={() => table.lastPage()}
        />
      </div>
    </div>
  );
}
