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
import { tableToolbarConfig } from "./constants";
import { useLocale } from "@/locale";

const DEFAULT_FILTER_VALUES: Record<string, unknown> = {};

export function TableToolbar<TData extends RowData = RowData>({
  table,
  searchPlaceholder: searchPlaceholderProp,
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
  const tableLocale = useLocale("table");
  const searchPlaceholder = searchPlaceholderProp ?? tableLocale.searchPlaceholder;
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
      className={`${tableToolbarConfig.container} ${className}`.trim()}
    >
      {/* Khối Tìm kiếm & Bộ lọc Menu & Bulk actions */}
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {enableGlobalFilter && (
          <div className={tableToolbarConfig.searchContainer}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
              <SearchIcon className={tableToolbarConfig.searchIcon} />
            </span>
            <input
              type="text"
              value={globalFilter}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              data-testid="table-search-input"
              className={tableToolbarConfig.searchInput}
            />
            {globalFilter && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label={tableLocale.clearSearch}
                data-testid="table-clear-search-button"
                className={tableToolbarConfig.clearButton}
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
            aria-label={tableLocale.refresh}
            title={tableLocale.refresh}
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
                {tableLocale.columns}
              </Button>
            </PopoverTrigger>
            <PopoverContent className={tableToolbarConfig.columnPopoverContent}>
              <PopoverHeader className={tableToolbarConfig.columnPopoverHeader}>
                {tableLocale.columnVisibility}
              </PopoverHeader>
              <PopoverBody className="max-h-60 overflow-y-auto ui-scrollbar p-1 flex flex-col gap-0.5">
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
                        wrapperClassName={tableToolbarConfig.columnItemCheckbox}
                        labelClassName="text-xs text-neutral-700 font-normal truncate"
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
