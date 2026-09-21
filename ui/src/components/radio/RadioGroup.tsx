import React, { useState, useId, useMemo, useCallback } from "react";
import { RadioGroupProps, RadioOptionItem } from "./types";
import { sizeConfig, orientationConfig, searchInputSizeConfig } from "./constants";
import Radio from "./Radio";
import Input from "@/components/input/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import Spinner from "@/components/icons/Spinner";
import Skeleton from "@/components/skeleton/Skeleton";
import Empty from "@/components/empty/Empty";
import HelperErrorText from "@/components/common/HelperErrorText";
import { rankAndFilterItems, getSafeConfig } from "@/utils/function";
import { useLocale } from "@/components/common/OpenWayProvider";

const DEFAULT_OPTIONS: never[] = [];

const SKELETON_RADIO_SIZES: Record<string, string> = {
  xs: "0.875rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "1.75rem",
};

export default function RadioGroup<TData = unknown, TValue extends string | number = string>({
  options = DEFAULT_OPTIONS as RadioOptionItem<TData, TValue>[],
  value: valueProp,
  defaultValue = null,
  onChange,
  size = "md",
  color = "primary",
  variant = "filled",
  disabled = false,
  label,
  helperText,
  errorMessage,
  orientation = "vertical",
  labelPlacement = "right",
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  config,
  searchPlaceholder: searchPlaceholderProp,
  searchValue: searchValueProp,
  onSearchChange,
  searchMode = "client",
  searchField = "label",
  filterFn,
  onSearch,
  emptyText: emptyTextProp,
  emptyProps,
  searchClassName = "",
  searchInputSize: searchInputSizeProp,
  listFooter,
  maxHeight,
  isLoading: isLoadingProp,
  skeletonCount = 3,
  renderSkeleton,
  ref,
  ...props
}: RadioGroupProps<TData, TValue>) {
  const radioLocale = useLocale("radio");
  const selectLocale = useLocale("select");
  const searchPlaceholder = searchPlaceholderProp ?? selectLocale.searchPlaceholder;
  const emptyText = emptyTextProp ?? radioLocale.emptyText;
  const {
    isRequired = false,
    isInvalid: isInvalidProp,
    isLoading: isLoadingConfig = false,
    isReadOnly = false,
    searchable = false,
    preserveSelected = true,
    isSearching: isSearchingProp,
  } = config ?? {};

  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const helperId = `${generatedId}-helper`;
  const searchInputId = `${generatedId}-search`;
  const groupName = useId();

  // Controlled vs Uncontrolled state cho giá trị đã chọn
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<TValue | null>(defaultValue ?? null);
  const currentValue = isControlled ? valueProp : internalValue;

  const isInvalid = Boolean(isInvalidProp || errorMessage);

  // Controlled vs Uncontrolled state cho ô tìm kiếm
  const isSearchControlled = searchValueProp !== undefined;
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const currentSearch = isSearchControlled ? (searchValueProp as string) : internalSearchValue;

  const effectiveIsSearching = Boolean(isSearchingProp ?? (Boolean(isLoadingProp) && searchMode === "server"));

  // Bộ nhớ đệm lưu trữ các options đã chọn (để bảo lưu preserveSelected khi lọc)
  const [historicalOptions, setHistoricalOptions] = useState<Map<string, RadioOptionItem<TData, TValue>>>(() => {
    const initialMap = new Map<string, RadioOptionItem<TData, TValue>>();
    const initialSelected = valueProp !== undefined ? valueProp : defaultValue;
    if (initialSelected !== null && initialSelected !== undefined) {
      const initialStr = String(initialSelected);
      const found = options.find((opt) => String(opt.value) === initialStr);
      if (found) {
        initialMap.set(initialStr, found);
      }
    }
    return initialMap;
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isSearchControlled) {
      setInternalSearchValue(val);
    }
    onSearchChange?.(val);

    if (searchMode === "server") {
      onSearch?.(val);
    }
  };

  const handleClearSearch = () => {
    if (!isSearchControlled) {
      setInternalSearchValue("");
    }
    onSearchChange?.("");

    if (searchMode === "server") {
      onSearch?.("");
    }
  };

  // Pipeline tính toán danh sách hiển thị
  const displayOptions = useMemo(() => {
    const keyword = currentSearch.trim();

    // 1. Server mode: dữ liệu options được cung cấp trực tiếp từ bên ngoài (hook / query)
    if (searchMode === "server") {
      if (!preserveSelected || currentValue === null || currentValue === undefined) {
        return options;
      }
      const poolValuesSet = new Set(options.map((item) => String(item.value)));
      const selectedValStr = String(currentValue);
      if (!poolValuesSet.has(selectedValStr)) {
        const cached = historicalOptions.get(selectedValStr);
        if (cached) {
          return [cached, ...options];
        } else {
          return [
            { value: selectedValStr, label: selectedValStr } as unknown as RadioOptionItem<TData, TValue>,
            ...options,
          ];
        }
      }
      return options;
    }

    // 2. Client mode: khi không tìm kiếm, hiển thị toàn bộ options
    if (!searchable || !keyword) {
      return options;
    }

    // Lọc danh sách khớp với từ khóa
    let matchedList: RadioOptionItem<TData, TValue>[];
    if (filterFn) {
      matchedList = options.filter((opt) => filterFn(opt, keyword));
    } else {
      matchedList = rankAndFilterItems(options, keyword, searchField);
    }

    // Bảo lưu mục đã chọn (preserveSelected)
    if (!preserveSelected || currentValue === null || currentValue === undefined) {
      return matchedList;
    }

    const selectedValStr = String(currentValue);
    const isAlreadyInMatched = matchedList.some((item) => String(item.value) === selectedValStr);
    if (!isAlreadyInMatched) {
      const cached = historicalOptions.get(selectedValStr);
      if (cached) {
        return [cached, ...matchedList];
      } else {
        return [
          { value: selectedValStr, label: selectedValStr } as unknown as RadioOptionItem<TData, TValue>,
          ...matchedList,
        ];
      }
    }

    return matchedList;
  }, [
    searchable,
    currentSearch,
    searchMode,
    options,
    filterFn,
    searchField,
    preserveSelected,
    currentValue,
    historicalOptions,
  ]);

  const handleRadioChange = useCallback(
    (val: string) => {
      if (disabled || isReadOnly || isLoadingConfig) return;

      const found = options.find((o) => String(o.value) === val);
      if (found) {
        setHistoricalOptions((prev) => {
          if (prev.has(val)) return prev;
          const next = new Map(prev);
          next.set(val, found);
          return next;
        });
      }

      if (!isControlled) {
        setInternalValue(val as unknown as TValue);
      }
      onChange?.(val as unknown as TValue);
    },
    [disabled, isReadOnly, isLoadingConfig, isControlled, onChange, options]
  );

  const orientationClasses = getSafeConfig(orientation, orientationConfig, "vertical");
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const searchInputSize = searchInputSizeProp ?? getSafeConfig(size, searchInputSizeConfig, "md");

  const groupLabelClasses = [
    "text-sm font-semibold text-neutral-900 mb-1.5 select-none",
    disabled ? "opacity-60" : "",
    labelClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const scrollableStyles: React.CSSProperties = maxHeight
    ? {
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }
    : {};

  const scrollableClasses = maxHeight ? "overflow-y-auto ui-scrollbar" : "";

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={errorMessage || helperText ? helperId : undefined}
      aria-errormessage={errorMessage ? helperId : undefined}
      aria-orientation={orientation}
      aria-required={isRequired ? "true" : undefined}
      aria-invalid={isInvalid ? "true" : undefined}
      aria-disabled={disabled || isLoadingConfig ? "true" : undefined}
      aria-readonly={isReadOnly ? "true" : undefined}
      aria-busy={isLoadingConfig || Boolean(isLoadingProp) || effectiveIsSearching ? "true" : undefined}
      className={`inline-flex flex-col ${wrapperClassName}`}
      {...props}
    >
      {/* Group Title / Label */}
      {label && (
        <span id={labelId} className={groupLabelClasses}>
          {label}
          {isRequired && (
            <span className="text-error-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </span>
      )}

      {/* Ô tìm kiếm Search Input sử dụng Component Input variant outline */}
      {searchable && (
        <div className={`mb-2.5 ${searchClassName}`}>
          <Input
            id={searchInputId}
            variant="outline"
            size={searchInputSize}
            color={color}
            value={currentSearch}
            onChange={handleSearchInputChange}
            placeholder={searchPlaceholder}
            disabled={disabled}
            leftIcon={<SearchIcon className="size-4 text-neutral-400" />}
            rightIcon={
              effectiveIsSearching ? (
                <Spinner className="size-4 animate-spin text-neutral-400" />
              ) : undefined
            }
            onClear={handleClearSearch}
            aria-label={typeof label === "string" ? `Tìm kiếm ${label}` : "Tìm kiếm"}
            config={{
              isClearable: !effectiveIsSearching,
              isFullWidth: true,
            }}
          />
        </div>
      )}

      {/* Danh sách Radio & Vùng cuộn & ListFooter */}
      <div
        style={scrollableStyles}
        className={`${orientationClasses} ${scrollableClasses} ${className}`}
      >
        {Boolean(isLoadingProp) && displayOptions.length === 0 ? (
          <>
            {renderSkeleton ? (
              renderSkeleton()
            ) : (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className={`inline-flex items-center ${currentSize.gap} ${
                    labelPlacement === "left" ? "flex-row-reverse justify-between" : "flex-row"
                  }`}
                  aria-hidden="true"
                >
                  <Skeleton
                    shape="circle"
                    width={SKELETON_RADIO_SIZES[size] || "1.25rem"}
                    height={SKELETON_RADIO_SIZES[size] || "1.25rem"}
                    className="shrink-0"
                  />
                  <Skeleton
                    height={size === "xs" ? "0.75rem" : size === "xl" ? "1.25rem" : "1rem"}
                    width={i === 0 ? "65%" : i === 1 ? "45%" : "55%"}
                    radius="sm"
                  />
                </div>
              ))
            )}
            {listFooter}
          </>
        ) : displayOptions.length > 0 ? (
          <>
            {displayOptions.map((opt) => {
              const optValStr = String(opt.value);
              const isOptChecked =
                currentValue !== null && currentValue !== undefined && String(currentValue) === optValStr;
              return (
                <Radio
                  key={String(opt.value)}
                  name={groupName}
                  value={String(opt.value)}
                  checked={isOptChecked}
                  onChange={() => handleRadioChange(optValStr)}
                  label={opt.label}
                  helperText={opt.description}
                  disabled={disabled || Boolean(opt.disabled)}
                  readOnly={isReadOnly || Boolean(opt.isReadOnly)}
                  size={size}
                  color={color}
                  variant={variant}
                  labelPlacement={labelPlacement}
                  config={{
                    isLoading: isLoadingConfig,
                    isInvalid,
                    isRequired,
                  }}
                />
              );
            })}
            {Boolean(isLoadingProp) && searchMode === "server" && options.length === 0 && (
              <>
                {renderSkeleton ? (
                  renderSkeleton()
                ) : (
                  Array.from({ length: skeletonCount }).map((_, i) => (
                    <div
                      key={`skeleton-loading-${i}`}
                      className={`inline-flex items-center ${currentSize.gap} ${
                        labelPlacement === "left" ? "flex-row-reverse justify-between" : "flex-row"
                      }`}
                      aria-hidden="true"
                    >
                      <Skeleton
                        shape="circle"
                        width={SKELETON_RADIO_SIZES[size] || "1.25rem"}
                        height={SKELETON_RADIO_SIZES[size] || "1.25rem"}
                        className="shrink-0"
                      />
                      <Skeleton
                        height={size === "xs" ? "0.75rem" : size === "xl" ? "1.25rem" : "1rem"}
                        width={i === 0 ? "65%" : i === 1 ? "45%" : "55%"}
                        radius="sm"
                      />
                    </div>
                  ))
                )}
              </>
            )}
            {listFooter}
          </>
        ) : (
          <>
            <div className="py-3 px-2 w-full flex justify-center">
              <Empty
                size="sm"
                image={searchable || searchMode === "server" ? "search" : "default"}
                description={
                  !currentSearch.trim() && searchMode === "server"
                    ? searchPlaceholder
                    : emptyText
                }
                className="py-1"
                {...emptyProps}
              />
            </div>
            {listFooter}
          </>
        )}
      </div>

      {/* Helper / Error animated text */}
      <HelperErrorText
        id={helperId}
        helperText={helperText}
        errorMessage={errorMessage}
        sizeClassName={currentSize.helper}
        className={helperClassName}
      />
    </div>
  );
}
