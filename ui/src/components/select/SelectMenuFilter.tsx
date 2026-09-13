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
import { SelectFilterField, SelectFilterLayout, SelectColor, SelectRadius } from "./types";
import { formatFilterBadgeValue } from "./utils";
import { Input, NumberInput, parseNumber } from "@/components/input";
import { DatePicker } from "@/components/datepicker";
import { DateRangePicker } from "@/components/daterangepicker";
import { CheckboxGroup, type CheckboxOptionItem } from "@/components/checkbox";
import { Badge } from "@/components/badge";
import PlusIcon from "@/components/icons/PlusIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import ResetIcon from "@/components/icons/ResetIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { DEFAULT_Z_INDEX } from "@/constants";
import { getSafeConfig } from "@/utils/function";
import { menuRadiusConfig } from "./constants";

export interface SelectMenuFilterProps<TFilters extends Record<string, unknown> = Record<string, unknown>> {
  filters: SelectFilterField<unknown>[];
  values: Partial<TFilters>;
  onChange: (updates: Record<string, unknown>) => void;
  onReset?: () => void;
  layout?: SelectFilterLayout;
  gridCols?: number;
  showReset?: boolean;
  resetText?: ReactNode;
  color?: SelectColor;
  radius?: SelectRadius;
}

// ==================== SUB-COMPONENT: BADGE CHIP WITH FLOATING POPOVER ====================
interface FilterBadgeChipProps {
  field: SelectFilterField<unknown>;
  currentValue: unknown;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRemove: () => void;
  onChange: (updates: Record<string, unknown>) => void;
  color: SelectColor;
  radius: SelectRadius;
}

function FilterBadgeChip({
  field,
  currentValue,
  isOpen,
  onOpenChange,
  onRemove,
  onChange,
  color,
  radius,
}: FilterBadgeChipProps) {
  const {
    refs: { setFloating, setReference },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange,
    placement: "bottom-start",
    transform: false,
    middleware: [offsetMiddleware(6), flipMiddleware(), shiftMiddleware({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context);

  const popoverRadius = getSafeConfig(radius, menuRadiusConfig, "md");

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: (event) => {
      const target = event.target as HTMLElement | null;
      // If clicking inside another filter popover, let the parent deal with it
      if (target?.closest?.("[data-select-filter-popover]")) {
        return false;
      }
      return true;
    },
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen]);

  const [historicalOptionLabels, setHistoricalOptionLabels] = useState<Map<string | number, ReactNode>>(() => {
    const initial = new Map<string | number, ReactNode>();
    if (field.type === "checkbox-group" && field.options && Array.isArray(currentValue)) {
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
    if (field.type === "checkbox-group" && field.options && Array.isArray(currentValue)) {
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
    (!Array.isArray(currentValue) || currentValue.length > 0);

  const displayVal = formatFilterBadgeValue(field, currentValue, historicalOptionLabels);

  const renderEditor = () => {
    if (field.type === "custom") {
      return (
        field.render?.({
          value: currentValue,
          onChange: (val) => onChange({ [field.name]: val }),
        }) ?? null
      );
    }

    switch (field.type) {
      case "string":
      case "text":
        return (
          <Input
            ref={inputRef}
            size="sm"
            color={color}
            radius={radius}
            placeholder={field.placeholder || "Nhập từ khóa..."}
            value={(currentValue as string) || ""}
            onChange={(e) => onChange({ [field.name]: e.target.value })}
            {...(field.props || {})}
          />
        );

      case "number":
        return (
          <NumberInput
            ref={inputRef}
            size="sm"
            color={color}
            radius={radius}
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

      case "date":
        return (
          <DatePicker
            portal={false}
            size="sm"
            color={color}
            radius={radius}
            placeholder={field.placeholder || "Chọn ngày"}
            minDate={field.minDate}
            maxDate={field.maxDate}
            value={currentValue as Date | null | undefined}
            onChange={(d) => onChange({ [field.name]: d })}
            {...(field.props || {})}
          />
        );

      case "date-range": {
        const rangeVal = (currentValue as [Date | null, Date | null]) || [null, null];
        return (
          <DateRangePicker
            portal={false}
            size="sm"
            color={color}
            radius={radius}
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

      case "checkbox-group": {
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
              color={color}
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
              className="max-h-52 overflow-y-auto py-1 gap-2"
              {...(field.props || {})}
            />
          </div>
        );
      }

      default:
        return null;
    }
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
          color={hasValue || isOpen ? color : "neutral"}
          radius="full"
          className={`cursor-pointer select-none transition-all duration-150 gap-1 px-3 py-1 rounded-full ${
            isOpen ? "ring-2 ring-primary-500/30" : "hover:opacity-90"
          }`}
          onDelete={onRemove}
          deleteAriaLabel={`Xóa bộ lọc ${field.label}`}
        >
          <span className="font-semibold">{field.label}:</span>
          <span className={hasValue ? "font-medium" : "opacity-70 italic"}>{displayVal}</span>
        </Badge>
      </div>

      {isMounted && (
        <FloatingPortal>
          <div
            ref={setFloating}
            data-select-filter-popover="true"
            style={{
              ...floatingStyles,
              ...transitionStyles,
              zIndex: DEFAULT_Z_INDEX.SELECT_FILTER,
            }}
            {...getFloatingProps({
              className: `bg-white border border-neutral-200 ${popoverRadius} p-3 shadow-2xl ${
                field.type === "date" || field.type === "date-range"
                  ? "w-auto min-w-[280px]"
                  : "min-w-64 max-w-xs"
              }`,
            })}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
              <span className="text-xs font-bold text-neutral-800">{field.label}</span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-neutral-400 hover:text-neutral-600 p-0.5 rounded transition-colors"
                title="Đóng"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>

            {/* Popover Body Editor */}
            <div className="mt-1">{renderEditor()}</div>

            {/* Popover Footer */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={onRemove}
                className="text-[11px] text-red-500 hover:text-red-700 transition-colors"
              >
                Xóa bộ lọc
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-[11px] font-medium text-neutral-700 hover:bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 transition-colors cursor-pointer"
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

// ==================== MAIN COMPONENT ====================
export function SelectMenuFilter<TFilters extends Record<string, unknown> = Record<string, unknown>>({
  filters,
  values,
  onChange,
  onReset,
  showReset = true,
  resetText = "Đặt lại bộ lọc",
  color = "primary",
  radius = "full",
}: SelectMenuFilterProps<TFilters>) {
  // Active fields list (fields that user selected to filter)
  const [activeFieldNames, setActiveFieldNames] = useState<string[]>(() => {
    const initial: string[] = [];
    filters?.forEach((f) => {
      let val: unknown;
      if (f.type === "date-range") {
        const start = values?.[f.name as keyof TFilters] ?? f.defaultValue?.[0];
        const end = values?.[f.endName as keyof TFilters] ?? f.defaultValue?.[1];
        if (start || end) {
          val = [start, end];
        }
      } else {
        val = values?.[f.name as keyof TFilters] ?? f.defaultValue;
      }
      if (val !== undefined && val !== null && val !== "" && (!Array.isArray(val) || val.length > 0)) {
        initial.push(f.name);
      }
    });
    return initial;
  });

  // Track which field's popover is open
  const [activeEditorFieldName, setActiveEditorFieldName] = useState<string | null>(null);

  // Dropdown state for "+ Bộ lọc"
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
    middleware: [offsetMiddleware(6), flipMiddleware(), shiftMiddleware({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted: isAddMenuMounted, styles: addMenuTransitionStyles } = useFloatingTransition(addMenuContext, {
    duration: 120,
  });

  const addClick = useClick(addMenuContext);
  const addDismiss = useDismiss(addMenuContext, {
    outsidePress: (event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-select-filter-popover]")) {
        return false;
      }
      return true;
    },
  });
  const { getReferenceProps: getAddRefProps, getFloatingProps: getAddFloatingProps } = useInteractions([
    addClick,
    addDismiss,
  ]);

  // Handle selecting a field from the "+ Bộ lọc" dropdown
  const handleSelectFieldToAdd = (field: SelectFilterField<unknown>) => {
    if (!activeFieldNames.includes(field.name)) {
      setActiveFieldNames((prev) => [...prev, field.name]);
    }
    setIsAddMenuOpen(false);
    // Tự động mở popover hiển thị trên dropdown cho field vừa chọn!
    setActiveEditorFieldName(field.name);
  };

  // Handle removing a filter chip
  const handleRemoveField = (fieldName: string) => {
    const field = filters.find((f) => f.name === fieldName);
    setActiveFieldNames((prev) => prev.filter((name) => name !== fieldName));
    if (activeEditorFieldName === fieldName) {
      setActiveEditorFieldName(null);
    }
    if (field?.type === "date-range") {
      onChange({ [fieldName]: undefined, [field.endName]: undefined });
    } else {
      onChange({ [fieldName]: undefined });
    }
  };

  // Handle reset all
  const handleResetAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveFieldNames([]);
    setActiveEditorFieldName(null);
    onReset?.();
  };

  const activeFieldNameSet = useMemo(() => new Set(activeFieldNames), [activeFieldNames]);
  const hasAnyFilter = activeFieldNames.length > 0;
  const dropdownRadius = getSafeConfig(radius, menuRadiusConfig, "md");

  if (!filters || filters.length === 0) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      className="p-2.5 border-b border-neutral-200 bg-neutral-50/90 rounded-t-lg select-text"
    >
      <div className="flex flex-wrap items-center gap-1.5 min-h-7">
        {/* "+ Bộ lọc" Button & Dropdown */}
        <div className="inline-flex">
          <button
            ref={setReference}
            type="button"
            {...getAddRefProps({
              className: `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-400 rounded-full transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95`,
            })}
          >
            <PlusIcon className="size-3.5 text-neutral-500" />
            <span>Bộ lọc</span>
            <ChevronDownIcon className={`size-3 text-neutral-400 transition-transform ${isAddMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* "+ Bộ lọc" Dropdown list floating on top */}
          {isAddMenuMounted && (
            <FloatingPortal>
              <div
                ref={setFloating}
                data-select-filter-popover="true"
                style={{
                  ...addMenuStyles,
                  ...addMenuTransitionStyles,
                  zIndex: DEFAULT_Z_INDEX.SELECT_FILTER,
                }}
                {...getAddFloatingProps({
                  className: `bg-white border border-neutral-200 ${dropdownRadius} p-1 shadow-2xl min-w-44`,
                })}
              >
                <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Chọn trường cần lọc
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {filters.map((field) => {
                    const isAlreadyActive = activeFieldNameSet.has(field.name);
                    return (
                      <button
                        key={field.name}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectFieldToAdd(field);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded text-left transition-colors ${
                          isAlreadyActive
                            ? "text-primary font-medium bg-primary/5 hover:bg-primary/10"
                            : "text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <span>{field.label}</span>
                        {isAlreadyActive && <span className="text-[10px] text-neutral-400">Đang lọc</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FloatingPortal>
          )}
        </div>

        {/* Filter Badges with Floating Popovers */}
        {activeFieldNames.map((fieldName) => {
          const field = filters.find((f) => f.name === fieldName);
          if (!field) return null;
          let currentValue: unknown;
          if (field.type === "date-range") {
            const start = values[field.name as keyof TFilters] ?? field.defaultValue?.[0] ?? null;
            const end = values[field.endName as keyof TFilters] ?? field.defaultValue?.[1] ?? null;
            currentValue = start || end ? [start, end] : null;
          } else {
            currentValue = values[fieldName as keyof TFilters] ?? field.defaultValue;
          }

          return (
            <FilterBadgeChip
              key={fieldName}
              field={field}
              currentValue={currentValue}
              isOpen={activeEditorFieldName === fieldName}
              onOpenChange={(open) => setActiveEditorFieldName(open ? fieldName : null)}
              onRemove={() => handleRemoveField(fieldName)}
              onChange={onChange}
              color={color}
              radius={radius}
            />
          );
        })}

        {/* Reset All Button */}
        {showReset && onReset && hasAnyFilter && (
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-800 px-2.5 py-1 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors ml-auto cursor-pointer"
            title="Đặt lại toàn bộ bộ lọc"
          >
            <ResetIcon className="size-3" />
            <span>{resetText}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SelectMenuFilter;
