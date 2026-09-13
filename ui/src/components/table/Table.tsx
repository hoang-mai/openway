import { createContext, useContext, Ref, useMemo } from "react";
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableSize,
  TableVariant,
} from "./types";
import {
  tableSizeConfig,
  tableVariantConfig,
  tableAlignConfig,
} from "./constants";
import { getSafeConfig } from "@/utils/function";

interface TableContextValue {
  size: TableSize;
  variantStyles: (typeof tableVariantConfig)[TableVariant];
}

const TableContext = createContext<TableContextValue>({
  size: "md",
  variantStyles: tableVariantConfig.default,
});

export const useTableStyles = () => useContext(TableContext);

export function Table({
  variant = "default",
  size = "md",
  className = "",
  containerClassName = "",
  wrapperProps,
  children,
  ref,
  ...props
}: TableProps) {
  const variantStyles = getSafeConfig(variant, tableVariantConfig, "default");
  const contextValue = useMemo(() => ({ size, variantStyles }), [size, variantStyles]);

  return (
    <TableContext.Provider value={contextValue}>
      <div
        className={`w-full overflow-x-auto ui-scrollbar rounded-lg ${variantStyles.container} ${containerClassName}`.trim()}
        {...wrapperProps}
      >
        <table
          ref={ref}
          className={`w-full text-left caption-bottom ${variantStyles.table} ${className}`.trim()}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

export function TableHeader({
  className = "",
  children,
  ref,
  ...props
}: TableHeaderProps) {
  const { variantStyles } = useTableStyles();

  return (
    <thead
      ref={ref}
      className={`${variantStyles.head} ${className}`.trim()}
      {...props}
    >
      {children}
    </thead>
  );
}

// --- TableBody ---
export function TableBody({
  className = "",
  children,
  ref,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      ref={ref}
      className={`divide-y divide-neutral-200/70 ${className}`.trim()}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableFooter({
  className = "",
  children,
  ref,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      ref={ref}
      className={`border-t border-neutral-200 bg-neutral-50/60 font-medium text-neutral-600 ${className}`.trim()}
      {...props}
    >
      {children}
    </tfoot>
  );
}

export function TableRow({
  isSelected = false,
  isHoverable = true,
  className = "",
  children,
  ref,
  ...props
}: TableRowProps) {
  const { variantStyles } = useTableStyles();

  const selectedClass = isSelected
    ? "bg-primary-50/70 hover:bg-primary-50 text-primary-950 font-medium"
    : "";
  const hoverClass = isHoverable && !isSelected ? variantStyles.row : "";

  return (
    <tr
      ref={ref}
      data-state={isSelected ? "selected" : undefined}
      aria-selected={isSelected}
      className={`${hoverClass} ${selectedClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </tr>
  );
}

// --- TableHead ---
export function TableHead({
  align = "left",
  className = "",
  children,
  ref,
  ...props
}: TableHeadProps & { ref?: Ref<HTMLTableCellElement> }) {
  const { size } = useTableStyles();
  const sizeStyles = getSafeConfig(size, tableSizeConfig, "md");
  const alignClass = getSafeConfig(align, tableAlignConfig, "left");

  return (
    <th
      ref={ref}
      className={`tracking-wider ${sizeStyles.head} ${alignClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  align = "left",
  className = "",
  children,
  ref,
  ...props
}: TableCellProps) {
  const { size, variantStyles } = useTableStyles();
  const sizeStyles = getSafeConfig(size, tableSizeConfig, "md");
  const alignClass = getSafeConfig(align, tableAlignConfig, "left");

  return (
    <td
      ref={ref}
      className={`align-middle ${sizeStyles.cell} ${variantStyles.cell} ${alignClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableCaption({
  className = "",
  children,
  ref,
  ...props
}: TableCaptionProps) {
  return (
    <caption
      ref={ref}
      className={`mt-3 text-xs text-neutral-500 ${className}`.trim()}
      {...props}
    >
      {children}
    </caption>
  );
}
