import { ChangeEvent } from "react";
import type { RowData } from "@tanstack/react-table";
import type { TableToolbarProps } from "./types";
import Button from "../button/Button";
import IconButton from "../button/IconButton";
import Checkbox from "../checkbox/Checkbox";
import Popover from "../popover/Popover";
import PopoverTrigger from "../popover/PopoverTrigger";
import { PopoverContent } from "../popover/PopoverContent";
import { PopoverHeader } from "../popover/PopoverHeader";
import { PopoverBody } from "../popover/PopoverBody";
import SearchIcon from "../icons/SearchIcon";
import SlidersHorizontalIcon from "../icons/SlidersHorizontalIcon";
import CloseIcon from "../icons/CloseIcon";
import RotateCwIcon from "../icons/RotateCwIcon";
import { TableMenuFilter } from "./TableMenuFilter";

const DEFAULT_FILTER_VALUES: Record<string, unknown> = {};

export function TableToolbar<TData extends RowData = RowData>({
  table,
  searchPlaceholder = "Tìm kiếm trong bảng...",
  enableGlobalFilter = true,
  enableColumnVisibility = true,
  isRefresh = false,
  onRefresh,
  actions,
  selectedActions,
  filters,
  filterValues = DEFAULT_FILTER_VALUES,
  onFilterChange,
  onFilterReset,
  className = "",
}: TableToolbarProps<TData>) {
  const globalFilter = (table.state.globalFilter as string) ?? "";
  const hideableColumns = table.getAllLeafColumns().filter((col) => col.getCanHide());

  const selectedRows = table.getSelectedRowModel?.()?.rows ?? [];
  const selectedCount = selectedRows.length;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value);
  };

  const handleClearSearch = () => {
    table.setGlobalFilter("");
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 ${className}`.trim()}
    >
      {/* Khối Tìm kiếm & Bộ lọc Menu & Bulk actions */}
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {enableGlobalFilter && (
          <div className="relative w-full sm:w-64 max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-neutral-400">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={globalFilter}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              data-testid="table-search-input"
              className="w-full h-9 pl-8 pr-8 rounded-full border border-neutral-300 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-xs transition-colors"
            />
            {globalFilter && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Xóa tìm kiếm"
                data-testid="table-clear-search-button"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Bộ lọc cột menu dạng SelectMenuFilter */}
        {filters && filters.length > 0 && onFilterChange && (
          <TableMenuFilter
            filters={filters}
            values={filterValues}
            onChange={onFilterChange}
            onReset={onFilterReset}
          />
        )}

        {/* Hành động hàng loạt khi chọn dòng */}
        {selectedCount > 0 && selectedActions && (
          <div className="flex items-center gap-2 animate-in fade-in-50 duration-200">
            {selectedActions(selectedRows)}
          </div>
        )}
      </div>

      {/* Khối Tùy chọn hiển thị cột & Actions người dùng */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {actions}

        {(isRefresh || Boolean(onRefresh)) && (
          <IconButton
            icon={<RotateCwIcon className={`w-3.5 h-3.5 ${isRefresh ? "animate-spin" : ""}`} />}
            aria-label="Làm mới dữ liệu"
            title="Làm mới dữ liệu"
            size="sm"
            variant="outline"
            color="neutral"
            onClick={onRefresh}
            data-testid="table-refresh-button"
          />
        )}

        {enableColumnVisibility && hideableColumns.length > 0 && (
          <Popover size="sm" placement="bottom-end">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                color="neutral"
                leftIcon={<SlidersHorizontalIcon className="w-3.5 h-3.5" />}
              >
                Cột
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 shadow-lg border border-neutral-200">
              <PopoverHeader className="px-3 py-2 text-xs font-semibold text-neutral-700 border-b border-neutral-100">
                Hiển thị cột
              </PopoverHeader>
              <PopoverBody className="max-h-60 overflow-y-auto ui-scrollbar p-1.5 flex flex-col gap-0.5">
                {hideableColumns.map((column) => {
                  const colHeader =
                    typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id;
                  return (
                    <div key={column.id} className="w-full">
                      <Checkbox
                        size="sm"
                        label={colHeader}
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        className="w-full"
                        wrapperClassName="w-full flex items-center px-2 py-1.5 rounded-md hover:bg-neutral-100/80 cursor-pointer select-none"
                        labelClassName="text-xs text-neutral-700 font-medium truncate"
                      />
                    </div>
                  );
                })}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
