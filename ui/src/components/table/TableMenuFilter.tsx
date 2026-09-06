import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";
import { Input, NumberInput, parseNumber } from "@/components/input";
import { DatePicker } from "@/components/datepicker";
import { DateRangePicker } from "@/components/daterangepicker";
import { CheckboxGroup } from "@/components/checkbox";
import { Badge } from "@/components/badge";
import PlusIcon from "@/components/icons/PlusIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import ResetIcon from "@/components/icons/ResetIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { DEFAULT_Z_INDEX } from "@/constants";
import type { TableFilterDef } from "./types";

/**
 * Định dạng giá trị của bộ lọc để hiển thị tóm tắt trên Badge Chip.
 */
export function formatTableFilterBadgeValue(
  field: TableFilterDef,
  val: unknown
): string {
  if (val === undefined || val === null || val === "") {
    return "Chưa nhập";
  }

  if (val instanceof Date) {
    return val.toLocaleDateString("vi-VN");
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "Chưa chọn";
    // Date range
    if (
      field.type === "date-range" ||
      val[0] instanceof Date ||
      val[1] instanceof Date
    ) {
      const formatPart = (d: unknown) => {
        if (!d) return "";
        if (d instanceof Date) return d.toLocaleDateString("vi-VN");
        const parsed = new Date(d as string);
        if (!isNaN(parsed.getTime())) return parsed.toLocaleDateString("vi-VN");
        return String(d);
      };
      const start = formatPart(val[0]);
      const end = formatPart(val[1]);
      return start && end ? `${start} - ${end}` : start || end || "Chưa chọn";
    }
    // Checkbox group / Options (multi-select / select)
    const getOptionLabel = (item: unknown) => {
      if (field.options && field.options.length > 0) {
        const found = field.options.find(
          (o) => String(o.value) === String(item)
        );
        if (found) return String(found.label);
      }
      return String(item);
    };

    if (val.length === 1) {
      return getOptionLabel(val[0]);
    }

    const firstLabel = getOptionLabel(val[0]);
    return `${firstLabel}, +${val.length - 1}`;
  }

  if (field.options && field.options.length > 0) {
    const found = field.options.find((o) => String(o.value) === String(val));
    if (found) return String(found.label);
  }

  return String(val);
}

// ==================== SUB-COMPONENT: BADGE CHIP WITH FLOATING POPOVER ====================
interface TableFilterBadgeChipProps {
  field: TableFilterDef;
  currentValue: unknown;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRemove: () => void;
  onChange: (name: string, value: unknown) => void;
}

function TableFilterBadgeChip({
  field,
  currentValue,
  isOpen,
  onOpenChange,
  onRemove,
  onChange,
}: TableFilterBadgeChipProps) {
  const fieldName = field.name;

  const {
    refs: { setFloating, setReference },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange,
    placement: "bottom-start",
    transform: false,
    middleware: [
      offsetMiddleware(6),
      flipMiddleware(),
      shiftMiddleware({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } =
    useFloatingTransition(context);

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: (event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-table-filter-popover]")) {
        return false;
      }
      return true;
    },
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  const hasValue =
    currentValue !== undefined &&
    currentValue !== null &&
    currentValue !== "" &&
    (!Array.isArray(currentValue) ||
      (currentValue.length > 0 &&
        (currentValue[0] != null || currentValue[1] != null)));

  const displayVal = formatTableFilterBadgeValue(field, currentValue);
  const isDateOrDateRange =
    field.type === "date" || field.type === "date-range";

  const renderEditor = () => {
    if (field.type === "custom") {
      return (
        field.render?.({
          value: currentValue,
          onChange: (val) => onChange(fieldName, val),
        }) ?? null
      );
    }

    if (field.type === "date-range") {
      return (
        <DateRangePicker
          portal={false}
          size="sm"
          radius="md"
          placeholder={field.placeholder || "Chọn khoảng ngày"}
          value={
            (currentValue as [Date | null, Date | null]) || [null, null]
          }
          onChange={(range) => onChange(fieldName, range)}
          {...(field.props || {})}
        />
      );
    }

    if (field.type === "date") {
      return (
        <DatePicker
          portal={false}
          size="sm"
          radius="md"
          placeholder={field.placeholder || "Chọn ngày"}
          value={currentValue as Date | null | undefined}
          onChange={(d) => onChange(fieldName, d)}
          {...(field.props || {})}
        />
      );
    }

    if (field.type === "number") {
      return (
        <NumberInput
          ref={inputRef}
          size="sm"
          radius="full"
          placeholder={field.placeholder || "Nhập số..."}
          value={(currentValue as number | string) ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange(fieldName, "");
            } else {
              const parsed = parseNumber(raw);
              onChange(fieldName, parsed !== undefined ? parsed : raw);
            }
          }}
          onClear={() => onChange(fieldName, "")}
          {...(field.props || {})}
        />
      );
    }

    if (
      field.type === "select" ||
      field.type === "checkbox-group"
    ) {
      return (
        <CheckboxGroup
          size="sm"
          value={(currentValue as string[]) || []}
          onChange={(val) => onChange(fieldName, val)}
          options={(field.options || []).map((opt) => ({
            value: String(opt.value),
            label: opt.label,
            disabled: opt.disabled,
          }))}
          className="max-h-48 overflow-y-auto py-1 gap-2"
          {...(field.props || {})}
        />
      );
    }

    // Default: text / string
    return (
      <Input
        ref={inputRef}
        size="sm"
        radius="full"
        placeholder={field.placeholder || "Nhập từ khóa..."}
        value={(currentValue as string) || ""}
        onChange={(e) => onChange(fieldName, e.target.value)}
        {...(field.props || {})}
      />
    );
  };

  return (
    <>
      <div
        ref={setReference}
        {...getReferenceProps({
          className: "inline-flex items-center",
        })}
      >
        <Badge
          size="sm"
          variant="soft"
          color={hasValue || isOpen ? "primary" : "neutral"}
          radius="full"
          data-testid={`filter-chip-${fieldName}`}
          className={`cursor-pointer select-none transition-all duration-150 gap-1 px-3 py-1 rounded-full ${
            isOpen ? "ring-2 ring-primary-500/30" : "hover:opacity-90"
          }`}
          onDelete={onRemove}
          deleteAriaLabel={`Xóa bộ lọc ${field.label}`}
        >
          <span className="font-semibold">{field.label}:</span>
          <span
            data-testid={`filter-chip-val-${fieldName}`}
            className={hasValue ? "font-medium" : "opacity-70 italic"}
          >
            {displayVal}
          </span>
        </Badge>
      </div>

      {isMounted && (
        <FloatingPortal>
          <div
            ref={setFloating}
            data-table-filter-popover="true"
            data-testid={`filter-popover-${fieldName}`}
            style={{
              ...floatingStyles,
              ...transitionStyles,
              zIndex: DEFAULT_Z_INDEX.SELECT_FILTER,
            }}
            {...getFloatingProps({
              className: `bg-white border border-neutral-200 rounded-lg p-3 shadow-2xl ${
                isDateOrDateRange
                  ? "w-auto min-w-[280px]"
                  : "min-w-64 max-w-xs"
              }`,
            })}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
              <span className="text-xs font-bold text-neutral-800">
                {field.label}
              </span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-neutral-400 hover:text-neutral-600 p-0.5 rounded transition-colors cursor-pointer"
                title="Đóng"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Popover Body Editor */}
            <div className="mt-1">{renderEditor()}</div>

            {/* Popover Footer */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={onRemove}
                className="text-[11px] text-red-500 hover:text-red-700 transition-colors cursor-pointer font-medium"
              >
                Xóa bộ lọc
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-[11px] font-medium text-neutral-700 hover:bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 transition-colors cursor-pointer"
              >
                Xong
              </button>
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

// ==================== MAIN COMPONENT: TableMenuFilter ====================
export interface TableMenuFilterProps {
  filters: TableFilterDef[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onReset?: () => void;
  className?: string;
}

export function TableMenuFilter({
  filters,
  values,
  onChange,
  onReset,
  className = "",
}: TableMenuFilterProps) {
  const [manuallyAddedFields, setManuallyAddedFields] = useState<string[]>([]);

  const activeFieldNames = useMemo(() => {
    const list: string[] = [];
    const seen = new Set<string>();

    // 1. Thêm các field đang có giá trị trong values
    filters?.forEach((f) => {
      const val = values?.[f.name];
      const hasVal =
        val !== undefined &&
        val !== null &&
        val !== "" &&
        (!Array.isArray(val) ||
          (val.length > 0 && (val[0] != null || val[1] != null)));
      if (hasVal) {
        list.push(f.name);
        seen.add(f.name);
      }
    });

    // 2. Thêm các field người dùng vừa bấm chọn từ menu (chưa kịp nhập value)
    manuallyAddedFields.forEach((name) => {
      if (!seen.has(name)) {
        list.push(name);
        seen.add(name);
      }
    });

    return list;
  }, [filters, values, manuallyAddedFields]);

  const activeFieldSet = useMemo(
    () => new Set(activeFieldNames),
    [activeFieldNames]
  );

  // Field nào đang mở popover chỉnh sửa
  const [activeEditorFieldName, setActiveEditorFieldName] = useState<
    string | null
  >(null);

  // Trạng thái menu dropdown của nút "+ Bộ lọc"
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const {
    refs: { setFloating, setReference },
    floatingStyles: addMenuStyles,
    context: addMenuContext,
  } = useFloating({
    open: isAddMenuOpen,
    onOpenChange: setIsAddMenuOpen,
    placement: "bottom-start",
    transform: false,
    middleware: [
      offsetMiddleware(6),
      flipMiddleware(),
      shiftMiddleware({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted: isAddMenuMounted, styles: addMenuTransitionStyles } =
    useFloatingTransition(addMenuContext, {
      duration: 120,
    });

  const addClick = useClick(addMenuContext);
  const addDismiss = useDismiss(addMenuContext, {
    outsidePress: (event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-table-filter-popover]")) {
        return false;
      }
      return true;
    },
  });
  const { getReferenceProps: getAddRefProps, getFloatingProps: getAddFloatingProps } =
    useInteractions([addClick, addDismiss]);

  // Chọn thêm một field từ menu
  const handleSelectFieldToAdd = (field: TableFilterDef) => {
    if (!activeFieldSet.has(field.name)) {
      setManuallyAddedFields((prev) => [...prev, field.name]);
    }
    setIsAddMenuOpen(false);
    // Tự động mở popover editor cho field vừa chọn
    setActiveEditorFieldName(field.name);
  };

  // Xóa bỏ một bộ lọc chip
  const handleRemoveField = (name: string) => {
    setManuallyAddedFields((prev) => prev.filter((item) => item !== name));
    if (activeEditorFieldName === name) {
      setActiveEditorFieldName(null);
    }
    onChange(name, undefined);
  };

  // Xóa toàn bộ bộ lọc
  const handleResetAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setManuallyAddedFields([]);
    setActiveEditorFieldName(null);
    onReset?.();
  };

  const hasAnyFilter = activeFieldNames.length > 0;

  if (!filters || filters.length === 0) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      className={`inline-flex flex-wrap items-center gap-2 ${className}`.trim()}
    >
      {/* Nút "+ Bộ lọc" và Dropdown menu */}
      <div className="inline-flex">
        <button
          ref={setReference}
          type="button"
          data-testid="table-add-filter-button"
          {...getAddRefProps({
            className:
              "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-400 rounded-full transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95",
          })}
        >
          <PlusIcon className="w-3.5 h-3.5 text-neutral-500" />
          <span>Bộ lọc</span>
          <ChevronDownIcon
            className={`w-3 h-3 text-neutral-400 transition-transform ${
              isAddMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isAddMenuMounted && (
          <FloatingPortal>
            <div
              ref={setFloating}
              data-table-filter-popover="true"
              data-testid="table-add-filter-menu"
              style={{
                ...addMenuStyles,
                ...addMenuTransitionStyles,
                zIndex: DEFAULT_Z_INDEX.SELECT_FILTER,
              }}
              {...getAddFloatingProps({
                className:
                  "bg-white border border-neutral-200 rounded-lg p-1.5 shadow-xl min-w-48",
              })}
            >
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Chọn trường cần lọc
              </div>
              <div className="space-y-0.5 mt-0.5">
                {filters.map((field) => {
                  const isAlreadyActive = activeFieldSet.has(field.name);
                  return (
                    <button
                      key={field.name}
                      type="button"
                      data-testid={`filter-option-${field.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelectFieldToAdd(field);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md text-left transition-colors cursor-pointer ${
                        isAlreadyActive
                          ? "text-primary-600 font-medium bg-primary-50"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <span>{field.label}</span>
                      {isAlreadyActive && (
                        <span className="text-[10px] text-neutral-400">
                          Đang lọc
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </FloatingPortal>
        )}
      </div>

      {/* Danh sách các Badge Chips bộ lọc đang kích hoạt */}
      {filters.map((field) => {
        if (!activeFieldSet.has(field.name)) return null;
        const currentVal = values?.[field.name];
        const isOpen = activeEditorFieldName === field.name;

        return (
          <TableFilterBadgeChip
            key={field.name}
            field={field}
            currentValue={currentVal}
            isOpen={isOpen}
            onOpenChange={(open) => {
              setActiveEditorFieldName(open ? field.name : null);
            }}
            onRemove={() => handleRemoveField(field.name)}
            onChange={onChange}
          />
        );
      })}

      {/* Nút Đặt lại tất cả (Reset All) */}
      {hasAnyFilter && (
        <button
          type="button"
          data-testid="table-filter-reset-button"
          onClick={handleResetAll}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
          title="Đặt lại toàn bộ bộ lọc"
        >
          <ResetIcon className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      )}
    </div>
  );
}
