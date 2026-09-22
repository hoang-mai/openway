import type { TableAlign, TableSize, TableVariant } from "./types";

export const tableSizeConfig: Record<
  TableSize,
  {
    head: string;
    cell: string;
    text: string;
    icon: string;
  }
> = {
  sm: {
    head: "px-3 py-2 text-xs font-medium text-neutral-600 tracking-normal",
    cell: "px-3 py-2 text-xs text-neutral-900 tabular-nums",
    text: "text-xs",
    icon: "size-3.5",
  },
  md: {
    head: "px-4 py-2.5 text-xs font-medium text-neutral-600 tracking-normal",
    cell: "px-4 py-2.5 text-sm text-neutral-900 tabular-nums",
    text: "text-sm",
    icon: "size-4",
  },
  lg: {
    head: "px-5 py-3 text-sm font-medium text-neutral-600 tracking-normal",
    cell: "px-5 py-3.5 text-base text-neutral-900 tabular-nums",
    text: "text-base",
    icon: "size-5",
  },
};

export const tableVariantConfig: Record<
  TableVariant,
  {
    container: string;
    table: string;
    head: string;
    row: string;
    cell: string;
  }
> = {
  default: {
    container: "border border-neutral-200 bg-white shadow-none",
    table: "border-collapse",
    head: "bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-medium",
    row: "border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors duration-120",
    cell: "text-neutral-900 tabular-nums",
  },
  striped: {
    container: "border border-neutral-200 bg-white shadow-none",
    table: "border-collapse",
    head: "bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-medium",
    row: "border-b border-neutral-100 even:bg-neutral-50/40 hover:bg-neutral-50/80 transition-colors duration-120",
    cell: "text-neutral-900 tabular-nums",
  },
  bordered: {
    container: "border border-neutral-200 bg-white shadow-none",
    table: "border-collapse border border-neutral-200",
    head: "bg-neutral-50 border border-neutral-200 text-neutral-600 font-medium",
    row: "border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors duration-120",
    cell: "border-r border-b border-neutral-200/70 text-neutral-900 tabular-nums",
  },
};

export const tableToolbarConfig = {
  container: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3",
  searchContainer: "relative w-full sm:w-64 max-w-xs",
  searchInput:
    "w-full h-8.5 pl-8.5 pr-8 rounded-md border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-2xs transition-colors",
  searchIcon: "size-4 text-neutral-400",
  clearButton:
    "absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-neutral-600 cursor-pointer",
  columnPopoverContent:
    "w-56 p-1 bg-white border border-neutral-200/90 rounded-lg shadow-ui-dropdown",
  columnPopoverHeader:
    "px-2.5 py-1.5 text-xs font-semibold text-neutral-500 border-b border-neutral-100 uppercase tracking-wider",
  columnItemCheckbox:
    "w-full flex items-center px-2 py-1.5 rounded-sm hover:bg-neutral-100/70 cursor-pointer select-none",
};

export const tableFilterConfig = {
  container: "inline-flex flex-wrap items-center gap-2",
  addButton:
    "inline-flex items-center gap-1.5 h-8 px-3 text-xs font-normal text-neutral-500 hover:text-neutral-800 bg-white hover:bg-neutral-100/70 border border-neutral-200/70 hover:border-neutral-300 rounded-md transition-colors shadow-none cursor-pointer select-none",
  addMenuDropdown:
    "bg-white border border-neutral-200/90 rounded-lg p-1 shadow-ui-dropdown min-w-48",
  addMenuItem:
    "w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-sm text-left transition-colors cursor-pointer text-neutral-700 hover:bg-neutral-100/70",
  addMenuItemActive: "text-primary-700 font-medium bg-primary-50/70 hover:bg-primary-50",
  chip:
    "inline-flex items-center h-8 px-2.5 gap-1.5 rounded-md text-xs font-normal border transition-all duration-120 cursor-pointer select-none",
  chipActive:
    "bg-neutral-100/80 hover:bg-neutral-200/60 border-neutral-200/60 text-neutral-800",
  chipInactive:
    "bg-neutral-50 hover:bg-neutral-100/80 border-neutral-200/40 text-neutral-500",
  chipOpen:
    "bg-primary-50 text-primary-900 border-primary-300/80 shadow-xs ring-1 ring-primary-500/25",
  chipLabel: "text-neutral-400 font-normal",
  chipValue: "font-medium text-neutral-800 ml-1",
  chipCloseButton:
    "ml-0.5 p-0.5 rounded-xs hover:bg-neutral-200/70 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer inline-flex items-center justify-center",
  resetButton:
    "inline-flex items-center gap-1 h-8 px-2 text-xs font-medium text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100/70 rounded-md transition-colors cursor-pointer select-none",
  popoverContent:
    "bg-white border border-neutral-200/90 rounded-lg p-3 shadow-ui-dropdown",
  popoverHeader: "flex items-center justify-between pb-1.5 mb-2 border-b border-neutral-100",
  popoverTitle: "text-xs font-medium text-neutral-600",
  popoverFooter:
    "flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-100",
  popoverRemoveButton:
    "text-xs text-neutral-500 hover:text-error-600 hover:bg-error-50 px-2 py-0.5 rounded-sm transition-colors cursor-pointer",
  popoverDoneButton:
    "text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 px-2.5 py-0.5 rounded-sm border border-neutral-200 transition-colors cursor-pointer",
  popoverDate: "w-[280px]",
  popoverCheckbox: "w-[260px]",
  popoverDefault: "w-[240px]",
};

export const tablePaginationConfig = {
  container:
    "flex flex-col sm:flex-row items-center justify-between gap-4 px-3 py-3 border-t border-neutral-200/80 bg-neutral-50/20 text-xs text-neutral-600",
  pageButton:
    "h-8 min-w-8 px-2 rounded-md flex items-center justify-center text-xs font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/25",
  pageButtonActive:
    "bg-neutral-100 font-semibold text-neutral-900 border border-neutral-200/90 shadow-2xs",
  pageButtonInactive:
    "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70",
  ellipsis:
    "h-8 w-8 flex items-center justify-center text-xs text-neutral-400 select-none",
};

export const tableAlignConfig: Record<TableAlign, string> = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
};

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const DEFAULT_PAGE_SIZE = 10;
