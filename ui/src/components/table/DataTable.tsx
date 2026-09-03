import { useMemo, useState} from "react";
import {
  flexRender,
  type ColumnDef,
  type ColumnHelper,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
  type ColumnVisibilityState,
  type ColumnFiltersState,
  type Updater,
  type RowData,
  type Row,
  type Cell,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { DataTableProps } from "./types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Table";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";
import { TableColumnHeader } from "./TableColumnHeader";
import { DraggableTableHead } from "./DraggableTableHead";
import { useDataTable, type DefaultTableFeatures } from "./useDataTable";
import Checkbox from "../checkbox/Checkbox";
import Empty from "../empty/Empty";
import Skeleton from "../skeleton/Skeleton";
import { DEFAULT_PAGE_SIZE } from "./constants";

export function DataTable<TData extends RowData = RowData>({
  columns,
  data,
  variant = "default",
  size = "md",

  // Trạng thái tải & rỗng
  isLoading = false,
  isRefresh = false,
  onRefresh,
  loadingRowsCount = 5,
  emptyText,
  emptyIllustration,

  // Bật/tắt tính năng
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  enableColumnVisibility = true,
  enableColumnOrdering = false,

  // Bộ lọc & Search
  filters,
  searchPlaceholder,
  toolbarActions,
  renderBulkActions,

  // Phân trang
  pageSizeOptions,
  initialPageSize = DEFAULT_PAGE_SIZE,

  // Server-side
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pageCount,
  rowCount,

  // Controlled States
  pagination: controlledPagination,
  onPaginationChange,
  sorting: controlledSorting,
  onSortingChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  columnOrder: controlledColumnOrder,
  onColumnOrderChange,
  globalFilter: controlledGlobalFilter,
  onGlobalFilterChange,
  globalFilterFn: controlledGlobalFilterFn,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,

  // Tương tác
  onRowClick,

  // Styling
  className = "",
  containerClassName = "",
}: DataTableProps<TData>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const [internalColumnOrder, setInternalColumnOrder] = useState<string[]>([]);
  const [internalGlobalFilter, setInternalGlobalFilter] = useState<string>("");
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>(() => {
    if (!filters) return [];
    const initial: ColumnFiltersState = [];
    filters.forEach((f) => {
      if (
        f.defaultValue !== undefined &&
        f.defaultValue !== null &&
        f.defaultValue !== "" &&
        (!Array.isArray(f.defaultValue) || f.defaultValue.length > 0)
      ) {
        initial.push({ id: f.name, value: f.defaultValue });
      }
    });
    return initial;
  });

  const sorting = controlledSorting ?? internalSorting;
  const setSorting = (updater: Updater<SortingState>) => {
    const nextVal =
      typeof updater === "function"
        ? (updater as (prev: SortingState) => SortingState)(sorting)
        : updater;
    if (onSortingChange) {
      (onSortingChange as (val: SortingState) => void)(nextVal);
    } else {
      setInternalSorting(nextVal);
    }
  };

  const pagination = controlledPagination ?? internalPagination;
  const setPagination = (updater: Updater<PaginationState>) => {
    const nextVal =
      typeof updater === "function"
        ? (updater as (prev: PaginationState) => PaginationState)(pagination)
        : updater;
    if (onPaginationChange) {
      (onPaginationChange as (val: PaginationState) => void)(nextVal);
    } else {
      setInternalPagination(nextVal);
    }
  };

  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const setRowSelection = (updater: Updater<RowSelectionState>) => {
    const nextVal =
      typeof updater === "function"
        ? (updater as (prev: RowSelectionState) => RowSelectionState)(rowSelection)
        : updater;
    if (onRowSelectionChange) {
      (onRowSelectionChange as (val: RowSelectionState) => void)(nextVal);
    } else {
      setInternalRowSelection(nextVal);
    }
  };

  const columnVisibility = controlledColumnVisibility ?? internalColumnVisibility;
  const setColumnVisibility = (updater: Updater<ColumnVisibilityState>) => {
    const nextVal =
      typeof updater === "function"
        ? (updater as (prev: ColumnVisibilityState) => ColumnVisibilityState)(columnVisibility)
        : updater;
    if (onColumnVisibilityChange) {
      (onColumnVisibilityChange as (val: ColumnVisibilityState) => void)(nextVal);
    } else {
      setInternalColumnVisibility(nextVal);
    }
  };

  const columnOrder = controlledColumnOrder ?? internalColumnOrder;
  const setColumnOrder = (updater: Updater<string[]>) => {
    const nextVal =
      typeof updater === "function"
        ? (updater as (prev: string[]) => string[])(columnOrder)
        : updater;
    if (onColumnOrderChange) {
      (onColumnOrderChange as (val: string[]) => void)(nextVal);
    } else {
      setInternalColumnOrder(nextVal);
    }
  };

  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter;
  const setGlobalFilter = (updater: unknown) => {
    const nextVal =
      typeof updater === "function"
        ? (updater as (prev: string) => string)(globalFilter)
        : updater;
    if (onGlobalFilterChange) {
      onGlobalFilterChange(String(nextVal ?? ""));
    } else {
      setInternalGlobalFilter(String(nextVal ?? ""));
    }
  };

  const columnFilters = controlledColumnFilters ?? internalColumnFilters;

  // Bản đồ giá trị bộ lọc dạng Record<name, value> truyền cho TableMenuFilter
  const filterValues = useMemo(() => {
    const map: Record<string, unknown> = {};
    columnFilters.forEach((cf) => {
      map[cf.id] = cf.value;
    });
    return map;
  }, [columnFilters]);

  // Xử lý khi giá trị trên TableMenuFilter thay đổi
  const handleFilterChange = (name: string, value: unknown) => {
    const nextFilters = columnFilters.filter((cf) => cf.id !== name);
    const hasValue =
      value !== undefined &&
      value !== null &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0);

    if (hasValue) {
      nextFilters.push({ id: name, value });
    }

    if (onColumnFiltersChange) {
      (onColumnFiltersChange as (filters: ColumnFiltersState) => void)(nextFilters);
    } else {
      setInternalColumnFilters(nextFilters);
    }
  };

  // Xử lý khi người dùng ấn "Đặt lại" toàn bộ bộ lọc
  const handleFilterReset = () => {
    if (onColumnFiltersChange) {
      onColumnFiltersChange([]);
    } else {
      setInternalColumnFilters([]);
    }
  };

  const tableColumns = useMemo<
    | ColumnDef<DefaultTableFeatures, TData, unknown>[]
    | ReturnType<ColumnHelper<DefaultTableFeatures, TData>["columns"]>
  >(() => {
    let processedCols = columns as ColumnDef<DefaultTableFeatures, TData, unknown>[];

    if (!manualFiltering && filters && filters.length > 0) {
      processedCols = processedCols.map((col) => {
        const colId = (col.id ?? (col as { accessorKey?: string }).accessorKey) as string;
        const matchedFilter = filters.find((f) => f.name === colId);
        if (!matchedFilter || col.filterFn) {
          return col;
        }

        if (
          matchedFilter.type === "select" ||
          matchedFilter.type === "checkbox-group"
        ) {
          return {
            ...col,
            filterFn: (row: Row<DefaultTableFeatures, TData>, id: string, filterVal: unknown) => {
              if (!filterVal || (Array.isArray(filterVal) && filterVal.length === 0)) return true;
              const cellVal = row.getValue(id);
              if (Array.isArray(filterVal)) {
                return filterVal.some(
                  (v) => String(v).toLowerCase() === String(cellVal).toLowerCase()
                );
              }
              return String(cellVal).toLowerCase() === String(filterVal).toLowerCase();
            },
          };
        }

        if (matchedFilter.type === "date-range") {
          return {
            ...col,
            filterFn: (row: Row<DefaultTableFeatures, TData>, id: string, filterVal: unknown) => {
              if (!filterVal || !Array.isArray(filterVal)) return true;
              const [startDate, endDate] = filterVal as [Date | null, Date | null];
              if (!startDate && !endDate) return true;
              const cellVal = row.getValue(id);
              if (!cellVal) return false;
              const cellDate =
                cellVal instanceof Date ? cellVal : new Date(cellVal as string | number);
              if (isNaN(cellDate.getTime())) return false;
              if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (cellDate < start) return false;
              }
              if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                if (cellDate > end) return false;
              }
              return true;
            },
          };
        }

        return col;
      });
    }

    // 2. Thêm cột Checkbox chọn dòng (selectColumn) hoàn toàn riêng biệt nếu bật enableRowSelection
    if (enableRowSelection) {
      const hasSelectColumn = (columns as Array<{ id?: string }>).some((col) => col.id === "_select");
      if (!hasSelectColumn) {
        const selectColumn: ColumnDef<DefaultTableFeatures, TData, unknown> = {
          id: "_select",
          header: ({ table }) => (
            <div className="flex items-center justify-center">
              <Checkbox
                size="sm"
                checked={table.getIsAllPageRowsSelected()}
                config={{ indeterminate: table.getIsSomePageRowsSelected() }}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
                aria-label="Chọn tất cả các dòng trên trang này"
              />
            </div>
          ),
          cell: ({ row }) => (
            <div className="flex items-center justify-center">
              <Checkbox
                size="sm"
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
                aria-label={`Chọn dòng ${row.id}`}
              />
            </div>
          ),
          enableSorting: false,
          enableHiding: false,
        };
        return [selectColumn, ...processedCols];
      }
    }

    return processedCols;
  }, [columns, enableRowSelection, manualFiltering, filters]);

  const table = useDataTable<TData>({
    data,
    columns: tableColumns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
      columnOrder,
      globalFilter,
      columnFilters: manualFiltering ? [] : columnFilters,
    },
    enableSorting,
    enableRowSelection,
    manualPagination,
    manualSorting,
    manualFiltering: false,
    globalFilterFn: controlledGlobalFilterFn ?? "fuzzy",
    pageCount,
    rowCount,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
  });

  const visibleColumnsCount = table.getVisibleLeafColumns().length;
  const rows = enablePagination
    ? table.getRowModel().rows
    : table.getPrePaginatedRowModel?.()?.rows ?? table.getRowModel().rows;

  const showToolbar =
    enableFiltering ||
    enableColumnVisibility ||
    Boolean(filters && filters.length > 0) ||
    Boolean(isRefresh || onRefresh) ||
    Boolean(toolbarActions) ||
    Boolean(renderBulkActions);

  // DnD Sensors và Handlers cho Column Ordering
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const columnOrderList = useMemo(() => {
    return table.getVisibleLeafColumns().map((col) => col.id);
  }, [table]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      if (active.id === "_select" || over.id === "_select") {
        return;
      }
      const currentLeafCols = table.getVisibleLeafColumns().map((c) => c.id);
      const oldIndex = currentLeafCols.indexOf(active.id as string);
      const newIndex = currentLeafCols.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(currentLeafCols, oldIndex, newIndex);
        setColumnOrder(newOrder);
      }
    }
  };

  const tableElement = (
    <Table
      variant={variant}
      size={size}
      containerClassName={containerClassName}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} isHoverable={false}>
            {enableColumnOrdering ? (
              <SortableContext
                items={columnOrderList}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) {
                    return <TableHead key={header.id} />;
                  }

                  const canSort = header.column.getCanSort() && enableSorting;
                  const isSorted = header.column.getIsSorted();
                  const ariaSort = canSort
                    ? isSorted === "asc"
                      ? "ascending"
                      : isSorted === "desc"
                      ? "descending"
                      : "none"
                    : undefined;

                  const headerContent = flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );

                  return (
                    <DraggableTableHead
                      key={header.id}
                      header={header}
                      canSort={canSort}
                      ariaSort={ariaSort}
                      headerContent={headerContent}
                    />
                  );
                })}
              </SortableContext>
            ) : (
              headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return <TableHead key={header.id} />;
                }

                const canSort = header.column.getCanSort() && enableSorting;
                const isSorted = header.column.getIsSorted();
                const ariaSort = canSort
                  ? isSorted === "asc"
                    ? "ascending"
                    : isSorted === "desc"
                    ? "descending"
                    : "none"
                  : undefined;

                const headerContent = flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                );

                return (
                  <TableHead
                    key={header.id}
                    aria-sort={ariaSort}
                    data-column-id={header.column.id}
                  >
                    {canSort && typeof header.column.columnDef.header === "string" ? (
                      <TableColumnHeader
                        column={header.column}
                        title={header.column.columnDef.header}
                      />
                    ) : (
                      headerContent
                    )}
                  </TableHead>
                );
              })
            )}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {isLoading || isRefresh ? (
          // Trạng thái Loading Skeleton
          Array.from({ length: loadingRowsCount }).map((_, rowIndex) => (
            <TableRow key={`skeleton-row-${rowIndex}`} isHoverable={false}>
              {Array.from({ length: visibleColumnsCount }).map((__, cellIndex) => (
                <TableCell key={`skeleton-cell-${rowIndex}-${cellIndex}`}>
                  <Skeleton className="h-4 w-full rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          // Trạng thái không có dữ liệu (Empty state)
          <TableRow isHoverable={false}>
            <TableCell
              colSpan={visibleColumnsCount}
              className="py-12 text-center"
            >
              {emptyIllustration ?? (
                <Empty
                  size="sm"
                  image={globalFilter ? "search" : "default"}
                  description={
                    emptyText ||
                    (globalFilter
                      ? "Không tìm thấy kết quả phù hợp với từ khóa"
                      : "Không có dữ liệu hiển thị")
                  }
                />
              )}
            </TableCell>
          </TableRow>
        ) : (
          // Dòng dữ liệu bình thường
          rows.map((row: Row<DefaultTableFeatures, TData>) => {
            const isSelected = row.getIsSelected();
            return (
              <TableRow
                key={row.id}
                isSelected={isSelected}
                isHoverable={true}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer" : undefined}
              >
                {row.getVisibleCells().map((cell: Cell<DefaultTableFeatures, TData, unknown>) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className={`w-full space-y-2 ${className}`.trim()}>
      {/* Toolbar */}
      {showToolbar && (
        <TableToolbar
          table={table}
          searchPlaceholder={searchPlaceholder}
          enableGlobalFilter={enableFiltering}
          enableColumnVisibility={enableColumnVisibility}
          isRefresh={isRefresh}
          onRefresh={onRefresh}
          actions={toolbarActions}
          selectedActions={renderBulkActions}
          filters={filters}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onFilterReset={handleFilterReset}
        />
      )}

      {/* Table Container */}
      {enableColumnOrdering ? (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          {tableElement}
        </DndContext>
      ) : (
        tableElement
      )}

      {/* Pagination */}
      {enablePagination && !isLoading && rows.length > 0 && (
        <TablePagination
          table={table}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}
