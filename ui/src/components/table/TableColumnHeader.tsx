import { MouseEvent } from "react";
import type { RowData } from "@tanstack/react-table";
import type { TableColumnHeaderProps } from "./types";
import ArrowUpDownIcon from "../icons/ArrowUpDownIcon";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";

export function TableColumnHeader<
  TData extends RowData = RowData,
  TValue = unknown
>({
  column,
  title,
  className = "",
  ...props
}: TableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={`font-semibold ${className}`.trim()} {...props}>
        {title}
      </div>
    );
  }

  const isSorted = column.getIsSorted();

  const handleSort = (e: MouseEvent) => {
    e.preventDefault();
    const handler = column.getToggleSortingHandler();
    if (handler) {
      handler(e);
    }
  };

  return (
    <div className={`flex items-center space-x-1.5 ${className}`.trim()} {...props}>
      <button
        type="button"
        onClick={handleSort}
        className="group inline-flex items-center gap-1.5 font-semibold text-inherit hover:text-neutral-900 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 py-0.5 -mx-1"
      >
        <span>{title}</span>
        <span className="shrink-0 inline-flex items-center justify-center" aria-hidden="true">
          {isSorted === "asc" ? (
            <ArrowUpIcon className="w-3.5 h-3.5 text-primary-600" />
          ) : isSorted === "desc" ? (
            <ArrowDownIcon className="w-3.5 h-3.5 text-primary-600" />
          ) : (
            <ArrowUpDownIcon className="w-3.5 h-3.5 text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </span>
      </button>
    </div>
  );
}
