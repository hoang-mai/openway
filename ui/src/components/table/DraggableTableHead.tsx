import type { CSSProperties } from "react";
import type { RowData } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { DraggableTableHeadProps } from "./types";
import { TableHead } from "./Table";
import { TableColumnHeader } from "./TableColumnHeader";

export function DraggableTableHead<TData extends RowData = RowData, TValue = unknown>({
  header,
  canSort = false,
  headerContent,
  ariaSort,
  disabled = false,
  className = "",
}: DraggableTableHeadProps<TData, TValue>) {
  const isSelectCol = header.column.id === "_select";
  const isDisabled = disabled || isSelectCol;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: header.column.id,
    disabled: isDisabled,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 20 : undefined,
    whiteSpace: "nowrap",
  };

  const content =
    canSort && typeof header.column.columnDef.header === "string" ? (
      <TableColumnHeader column={header.column} title={header.column.columnDef.header} />
    ) : (
      headerContent
    );

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      aria-sort={ariaSort}
      data-column-id={header.column.id}
      {...(!isDisabled ? attributes : {})}
      {...(!isDisabled ? listeners : {})}
      className={`
        ${!isDisabled ? "select-none cursor-grab active:cursor-grabbing transition-colors" : ""}
        ${isDragging ? "bg-neutral-100 shadow-md ring-1 ring-primary-500/30" : ""}
        ${className}
      `.trim()}
    >
      {content}
    </TableHead>
  );
}

export default DraggableTableHead;
