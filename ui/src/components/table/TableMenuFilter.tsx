import React, { useState, useRef, useEffect, useMemo, ReactNode } from "react";
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
import { Input, type InputProps, NumberInput } from "@/components/input";
import { parseNumber } from "@/components/input/utils";
import { DatePicker } from "@/components/datepicker";
import { DateRangePicker } from "@/components/daterangepicker";
import { CheckboxGroup, type CheckboxOptionItem } from "@/components/checkbox";
import { Badge } from "@/components/badge";
import { tableFilterConfig } from "./constants";
import PlusIcon from "@/components/icons/PlusIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import ResetIcon from "@/components/icons/ResetIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { DEFAULT_Z_INDEX } from "@/constants";
import type { TableFilterDef } from "./types";
import { useLocale } from "@/locale";
import type { TableLocale } from "@/locale/types";

/**
 * Định dạng giá trị của bộ lọc để hiển thị tóm tắt trên Badge Chip.
 */
export function formatTableFilterBadgeValue(
  field: TableFilterDef,
  val: unknown,
  historicalOptionLabels?: Map<string | number, ReactNode>,
  locale?: TableLocale
): string {
  const notEntered = locale?.notEntered ?? "Chưa nhập";
  const notSelected = locale?.notSelected ?? "Chưa chọn";

  if (val === undefined || val === null || val === "") {
    return notEntered;
  }

  if (val instanceof Date) {
    return val.toLocaleDateString();
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return notSelected;
    // Date range
    if (
      field.type === "date-range" ||
      val[0] instanceof Date ||
      val[1] instanceof Date
    ) {
      const formatPart = (d: unknown) => {
        if (!d) return "";
        if (d instanceof Date) return d.toLocaleDateString();
        const parsed = new Date(d as string);
        if (!isNaN(parsed.getTime())) return parsed.toLocaleDateString();
        return String(d);
      };
      const start = formatPart(val[0]);
      const end = formatPart(val[1]);
      return start && end ? `${start} - ${end}` : start || end || notSelected;
    }
    // Checkbox group / Options (multi-select / select)
    const getOptionLabel = (item: unknown) => {
      if (
        (field.type === "checkbox-group" || field.type === "select") &&
        field.options &&
        field.options.length > 0
      ) {
        const found = field.options.find(
          (o) => String(o.value) === String(item)
        );
        if (found) return String(found.label);
      }
      if (historicalOptionLabels) {
        const cached =
          historicalOptionLabels.get(String(item)) ??
          historicalOptionLabels.get(item as string | number);
        if (cached !== undefined && cached !== null) return String(cached);
      }
      return String(item);
    };

    if (val.length === 1) {
      return getOptionLabel(val[0]);
    }

    const firstLabel = getOptionLabel(val[0]);
    return `${firstLabel}, +${val.length - 1}`;
  }

  if (
    (field.type === "checkbox-group" || field.type === "select") &&
    field.options &&
    field.options.length > 0
  ) {
    const found = field.options.find((o) => String(o.value) === String(val));
    if (found) return String(found.label);
  }
  if (historicalOptionLabels) {
    const cached =
      historicalOptionLabels.get(String(val)) ??
      historicalOptionLabels.get(val as string | number);
    if (cached !== undefined && cached !== null) return String(cached);
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
  onChange: (updates: Record<string, unknown>) => void;
}

function TableFilterBadgeChip({
  field,
  currentValue,
  isOpen,
  onOpenChange,
  onRemove,
  onChange,
}: TableFilterBadgeChipProps) {
  const tableLocale = useLocale("table");
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

  const [historicalOptionLabels, setHistoricalOptionLabels] = useState<Map<string | number, ReactNode>>(() => {
    const initial = new Map<string | number, ReactNode>();
    if ((field.type === "checkbox-group" || field.type === "select") && field.options && Array.isArray(currentValue)) {
      const set = new Set(currentValue.map(String));
      field.options.forEach((opt) => {
        if (set.has(String(opt.value))) {
          initial.set(String(opt.value), opt.label);
        }
      });
    }
    return initial;
  });

  useEffect(() => {
    if ((field.type === "checkbox-group" || field.type === "select") && field.options && Array.isArray(currentValue)) {
      const set = new Set(currentValue.map(String));
      let hasNew = false;
      const nextMap = new Map(historicalOptionLabels);
      for (const opt of field.options) {
        if (set.has(String(opt.value)) && !nextMap.has(String(opt.value))) {
          nextMap.set(String(opt.value), opt.label);
          hasNew = true;
        }
      }
      if (hasNew) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistoricalOptionLabels(nextMap);
      }
    }
  }, [field, currentValue, historicalOptionLabels]);

  const hasValue =
    currentValue !== undefined &&
    currentValue !== null &&
    currentValue !== "" &&
    (!Array.isArray(currentValue) ||
      (currentValue.length > 0 &&
        (currentValue[0] != null || currentValue[1] != null)));

  const displayVal = formatTableFilterBadgeValue(field, currentValue, historicalOptionLabels, tableLocale);
  const isDateOrDateRange =
    field.type === "date" || field.type === "date-range";

  const renderEditor = () => {
    if (field.type === "custom") {
      return (
        field.render?.({
          value: currentValue,
          onChange: (val) => onChange({ [field.name]: val }),
        }) ?? null
      );
    }

    if (field.type === "date-range") {
      const rangeVal = (currentValue as [Date | null, Date | null]) || [null, null];
      return (
        <DateRangePicker
          portal={false}
          size="sm"
          radius="md"
          placeholder={field.placeholder || "Chọn khoảng ngày"}
          value={rangeVal}
          onChange={(range) => {
            onChange({
              [field.name]: range?.[0] ?? null,
              [field.endName]: range?.[1] ?? null,
            });
          }}
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
          minDate={field.minDate}
          maxDate={field.maxDate}
          value={currentValue as Date | null | undefined}
          onChange={(d) => onChange({ [field.name]: d })}
          {...(field.props || {})}
        />
      );
    }

    if (field.type === "number") {
      return (
        <NumberInput
          ref={inputRef}
          size="sm"
          radius="md"
          placeholder={field.placeholder || "Nhập số..."}
          min={field.min}
          max={field.max}
          step={field.step}
          value={(currentValue as number | string) ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange({ [field.name]: "" });
            } else {
              const parsed = parseNumber(raw);
              onChange({ [field.name]: parsed !== undefined ? parsed : raw });
            }
          }}
          onClear={() => onChange({ [field.name]: "" })}
          {...(field.props || {})}
        />
      );
    }

    if (
      field.type === "select" ||
      field.type === "checkbox-group"
    ) {
      const rawOptions = (field.options || (field.props?.options as CheckboxOptionItem[]) || []) as CheckboxOptionItem[];
      const formattedOptions = rawOptions.map((opt) => ({
        value: String(opt.value),
        label: opt.label,
        description: opt.description,
        disabled: opt.disabled,
        data: opt.data,
      }));

      const isSearchable =
        field.searchable ??
        Boolean(field.props?.config?.searchable);
      const preserveSelected =
        field.preserveSelected ??
        Boolean(field.props?.config?.preserveSelected);
      const searchMode =
        field.searchMode ?? (field.props?.searchMode as "client" | "server") ?? "client";

      return (
        <div className="w-64 min-w-60 p-1">
          <CheckboxGroup
            size="sm"
            value={((currentValue as (string | number)[]) || []).map(String)}
            onChange={(val) => {
              onChange({ [field.name]: val });
              if (rawOptions.length > 0) {
                const set = new Set(val.map(String));
                const newMap = new Map(historicalOptionLabels);
                for (const opt of rawOptions) {
                  if (set.has(String(opt.value))) {
                    newMap.set(String(opt.value), opt.label);
                  }
                }
                setHistoricalOptionLabels(newMap);
              }
            }}
            options={formattedOptions}
            config={{
              ...field.props?.config,
              searchable: isSearchable,
              preserveSelected,
            }}
            searchMode={searchMode}
            searchPlaceholder={field.searchPlaceholder || "Tìm kiếm lựa chọn..."}
            onSearch={field.onSearch || field.props?.onSearch}
            onSearchChange={field.onSearchChange || field.props?.onSearchChange}
            isLoading={field.isLoading ?? field.props?.isLoading}
            listFooter={field.listFooter ?? field.props?.listFooter}
            skeletonCount={field.skeletonCount ?? field.props?.skeletonCount ?? 3}
            maxHeight={field.maxHeight ?? field.props?.maxHeight ?? 200}
            className="max-h-52 overflow-y-auto ui-scrollbar py-1 gap-2"
            {...(field.props || {})}
          />
        </div>
      );
    }

    // Default: text / string
    const stringProps = (field.type === "string" || field.type === "text" ? field.props : undefined) as
      | Partial<InputProps>
      | undefined;

    return (
      <Input
        ref={inputRef}
        size="sm"
        radius="md"
        placeholder={field.placeholder || "Nhập từ khóa..."}
        value={(currentValue as string) || ""}
        onChange={(e) => onChange({ [field.name]: e.target.value })}
        {...(stringProps || {})}
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
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onOpenChange(!isOpen);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenChange(!isOpen);
            }
          }}
          onDelete={() => onRemove()}
          deleteAriaLabel={`${tableLocale.resetFilter} ${field.label}`}
          variant="soft"
          color={isOpen ? "primary" : "neutral"}
          radius="md"
          size="md"
          data-testid={`filter-chip-${fieldName}`}
          className={`${tableFilterConfig.chip} ${
            isOpen
              ? tableFilterConfig.chipOpen
              : hasValue
              ? tableFilterConfig.chipActive
              : tableFilterConfig.chipInactive
          }`}
          title={`${field.label}: ${displayVal}`}
        >
          <span className={tableFilterConfig.chipLabel}>{field.label}:</span>
          <span
            data-testid={`filter-chip-val-${fieldName}`}
            className={tableFilterConfig.chipValue}
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
              className: `${tableFilterConfig.popoverContent} ${
                isDateOrDateRange
                  ? tableFilterConfig.popoverDate
                  : field.type === "checkbox-group"
                  ? tableFilterConfig.popoverCheckbox
                  : tableFilterConfig.popoverDefault
              }`,
            })}
          >
            {/* Popover Header */}
            <div className={tableFilterConfig.popoverHeader}>
              <span className={tableFilterConfig.popoverTitle}>
                {field.label}
              </span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-neutral-400 hover:text-neutral-600 p-0.5 rounded-xs transition-colors cursor-pointer"
                title="Đóng"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>

            {/* Popover Body Editor */}
            <div className="mt-1">{renderEditor()}</div>

            {/* Popover Footer */}
            <div className={tableFilterConfig.popoverFooter}>
              <button
                type="button"
                onClick={onRemove}
                className={tableFilterConfig.popoverRemoveButton}
              >
                Xóa bộ lọc
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={tableFilterConfig.popoverDoneButton}
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
  onChange: (updates: Record<string, unknown>) => void;
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
  const tableLocale = useLocale("table");
  const [manuallyAddedFields, setManuallyAddedFields] = useState<string[]>([]);

  const activeFieldNames = useMemo(() => {
    const list: string[] = [];
    const seen = new Set<string>();

    // 1. Thêm các field đang có giá trị trong values
    filters?.forEach((f) => {
      let val: unknown;
      if (f.type === "date-range") {
        const start = values?.[f.name] ?? f.defaultValue?.[0];
        const end = values?.[f.endName] ?? f.defaultValue?.[1];
        if (start || end) {
          val = [start, end];
        }
      } else {
        val = values?.[f.name] ?? f.defaultValue;
      }
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
    const field = filters.find((f) => f.name === name);
    setManuallyAddedFields((prev) => prev.filter((item) => item !== name));
    if (activeEditorFieldName === name) {
      setActiveEditorFieldName(null);
    }
    if (field?.type === "date-range") {
      onChange({ [name]: undefined, [field.endName]: undefined });
    } else {
      onChange({ [name]: undefined });
    }
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
      className={`${tableFilterConfig.container} ${className}`.trim()}
    >
      {/* Nút "+ Bộ lọc" và Dropdown menu */}
      <div className="inline-flex">
        <button
          ref={setReference}
          type="button"
          data-testid="table-add-filter-button"
          {...getAddRefProps({
            className: tableFilterConfig.addButton,
          })}
        >
          <PlusIcon className="size-3.5 text-neutral-400" />
          <span>{tableLocale.filter}</span>
          <ChevronDownIcon
            className={`size-3 text-neutral-400 transition-transform ${
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
                className: tableFilterConfig.addMenuDropdown,
              })}
            >
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider select-none">
                {tableLocale.selectFilterField}
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
                      className={`${tableFilterConfig.addMenuItem} ${
                        isAlreadyActive ? tableFilterConfig.addMenuItemActive : ""
                      }`}
                    >
                      <span>{field.label}</span>
                      {isAlreadyActive && (
                        <span className="text-[10px] text-neutral-400">
                          {tableLocale.filtering}
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
        let currentVal: unknown;
        if (field.type === "date-range") {
          const start = values?.[field.name] ?? field.defaultValue?.[0] ?? null;
          const end = values?.[field.endName] ?? field.defaultValue?.[1] ?? null;
          currentVal = start || end ? [start, end] : null;
        } else {
          currentVal = values?.[field.name] ?? field.defaultValue;
        }
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
          className={tableFilterConfig.resetButton}
          title={tableLocale.resetAllFilters}
        >
          <ResetIcon className="size-3.5" />
          <span>{tableLocale.resetFilter}</span>
        </button>
      )}
    </div>
  );
}
