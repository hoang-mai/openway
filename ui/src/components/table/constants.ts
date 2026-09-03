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
    head: "px-3 py-2 text-xs font-semibold",
    cell: "px-3 py-2 text-xs",
    text: "text-xs",
    icon: "w-3.5 h-3.5",
  },
  md: {
    head: "px-4 py-3 text-sm font-semibold",
    cell: "px-4 py-3 text-sm",
    text: "text-sm",
    icon: "w-4 h-4",
  },
  lg: {
    head: "px-5 py-4 text-base font-semibold",
    cell: "px-5 py-4 text-base",
    text: "text-base",
    icon: "w-5 h-5",
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
    container: "border border-neutral-200 shadow-xs",
    table: "border-collapse",
    head: "bg-neutral-50/80 border-b border-neutral-200 text-neutral-600",
    row: "border-b border-neutral-200/80 hover:bg-neutral-50/50 transition-colors",
    cell: "text-neutral-700",
  },
  striped: {
    container: "border border-neutral-200 shadow-xs",
    table: "border-collapse",
    head: "bg-neutral-100/80 border-b border-neutral-200 text-neutral-700",
    row: "border-b border-neutral-200/80 even:bg-neutral-50/60 hover:bg-neutral-100/40 transition-colors",
    cell: "text-neutral-700",
  },
  bordered: {
    container: "border border-neutral-200 shadow-xs",
    table: "border-collapse border border-neutral-200",
    head: "bg-neutral-50 border border-neutral-200 text-neutral-700",
    row: "border-b border-neutral-200 hover:bg-neutral-50/50 transition-colors",
    cell: "border border-neutral-200 text-neutral-700",
  },
};

export const tableAlignConfig: Record<TableAlign, string> = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
};

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const DEFAULT_PAGE_SIZE = 10;
