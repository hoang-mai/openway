import {
  useState,
  useId,
  useMemo,
  useCallback,
} from "react";
import { CheckboxGroupProps, CheckboxOptionItem } from "./types";
import { sizeConfig, orientationConfig, searchInputSizeConfig } from "./constants";
import { getSafeConfig, rankAndFilterItems } from "@/utils/function";
import HelperErrorText from "@/components/common/HelperErrorText";
import Checkbox from "./Checkbox";
import Input from "@/components/input/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import Spinner from "@/components/icons/Spinner";
import Skeleton from "@/components/skeleton/Skeleton";
import Empty from "@/components/empty/Empty";
import { useLocale } from "@/locale";

const DEFAULT_OPTIONS: never[] = [];
const DEFAULT_VALUE: never[] = [];

const SKELETON_BOX_SIZES: Record<string, string> = {
  xs: "0.875rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "1.75rem",
};

export default function CheckboxGroup<TData = unknown, TValue extends string | number = string>({
  value: valueProp,
  defaultValue = DEFAULT_VALUE as TValue[],
  onChange,
  size = "md",
  color = "primary",
  variant = "filled",
  radius,
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
  options = DEFAULT_OPTIONS as CheckboxOptionItem<TData, TValue>[],
  config,
  searchMode = "client",
  searchPlaceholder: searchPlaceholderProp,
  searchValue: searchValueProp,
  defaultSearchValue = "",
  onSearchChange,
  searchClassName = "",
  searchField = "label",
  filterFn,
  onSearch,
  emptyText: emptyTextProp,
  emptyProps,
  listFooter,
  maxHeight,
  isLoading: isLoadingProp,
  skeletonCount = 3,
  renderSkeleton,
  children,
  ref,
  ...props
}: CheckboxGroupProps<TData, TValue>) {
  const checkboxLocale = useLocale("checkbox");
  const selectLocale = useLocale("select");
  const searchPlaceholder = searchPlaceholderProp ?? selectLocale.searchPlaceholder;
  const emptyText = emptyTextProp ?? checkboxLocale.emptyText;
  const {
    isRequired = false,
    isInvalid: isInvalidProp,
    isLoading: isLoadingConfig = false,
    showSpinner = false,
    isReadOnly = false,
    searchable = false,
    preserveSelected = true,
    isSearching: isSearchingProp,
  } = config ?? {};

  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const helperId = `${generatedId}-helper`;
  const searchInputId = `${generatedId}-search`;

  // Controlled vs Uncontrolled selection state
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<TValue[]>(defaultValue);
  const currentValue = isControlled ? (valueProp as TValue[]) : internalValue;
  const isInvalid = Boolean(isInvalidProp ?? !!errorMessage);

  // Controlled vs Uncontrolled search query
  const isSearchControlled = searchValueProp !== undefined;
  const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue);
  const currentSearch = isSearchControlled ? (searchValueProp as string) : internalSearchValue;

  const effectiveIsSearching = Boolean(isSearchingProp ?? (Boolean(isLoadingProp) && searchMode === "server"));

  // Bộ lưu trữ các options đã chọn trong lịch sử để bảo lưu (chỉ lưu các option ĐÃ ĐƯỢC CHỌN)
  const [historicalOptions, setHistoricalOptions] = useState<Map<string | number, CheckboxOptionItem<TData>>>(() => {
    const initialMap = new Map<string | number, CheckboxOptionItem<TData>>();
    const initialSelected = new Set((valueProp ?? defaultValue ?? []).map(String));
    options.forEach((opt) => {
      if (initialSelected.has(String(opt.value))) {
        initialMap.set(opt.value, opt);
      }
    });
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
      if (!preserveSelected || currentValue.length === 0) {
        return options;
      }
      const poolValuesSet = new Set(options.map((item) => String(item.value)));
      const preservedList: CheckboxOptionItem<TData>[] = [];
      for (const val of currentValue) {
        if (!poolValuesSet.has(String(val))) {
          const cached = historicalOptions.get(val);
          if (cached) {
            preservedList.push(cached);
          } else {
            preservedList.push({ value: val, label: String(val) } as CheckboxOptionItem<TData>);
          }
        }
      }
      return [...preservedList, ...options];
    }

    // 2. Client mode: khi không tìm kiếm, hiển thị toàn bộ options
    if (!searchable || !keyword) {
      return options;
    }

    // Lọc danh sách khớp với từ khóa
    let matchedList: CheckboxOptionItem<TData>[];
    if (filterFn) {
      matchedList = options.filter((opt) => filterFn(opt, keyword));
    } else {
      matchedList = rankAndFilterItems(options, keyword, searchField);
    }

    // Bảo lưu các mục đã chọn (preserveSelected)
    if (!preserveSelected) {
      return matchedList;
    }

    const matchedValuesSet = new Set(matchedList.map((item) => String(item.value)));
    const preservedList: CheckboxOptionItem<TData>[] = [];

    for (const val of currentValue) {
      if (!matchedValuesSet.has(String(val))) {
        const cached = historicalOptions.get(val);
        if (cached) {
          preservedList.push(cached);
        } else {
          preservedList.push({ value: val, label: String(val) } as CheckboxOptionItem<TData>);
        }
      }
    }

    return [...preservedList, ...matchedList];
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

  const handleCheckboxChange = useCallback(
    (val: string | number, isChecked: boolean) => {
      if (disabled || isReadOnly || isLoadingConfig) return;

      if (isChecked) {
        const found = options.find((o) => String(o.value) === String(val));
        if (found) {
          setHistoricalOptions((prev) => {
            if (prev.has(val)) return prev;
            const next = new Map(prev);
            next.set(val, found);
            return next;
          });
        }
      }

      let nextValue: TValue[];
      if (isChecked) {
        nextValue = [...currentValue, val as TValue];
      } else {
        nextValue = currentValue.filter((item) => String(item) !== String(val));
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [disabled, isReadOnly, isLoadingConfig, currentValue, isControlled, onChange, options]
  );

  const orientationClasses = getSafeConfig(orientation, orientationConfig, "vertical");

  const groupLabelClasses = [
    "text-sm font-semibold text-neutral-900 mb-1.5 select-none",
    disabled ? "opacity-60" : "",
    labelClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const searchInputSize = getSafeConfig(size, searchInputSizeConfig, "md");

  // Set để tra cứu O(1) các mục đã chọn trong vòng lặp render
  const selectedValuesSet = useMemo(
    () => new Set(currentValue.map(String)),
    [currentValue]
  );

  const scrollableStyles: React.CSSProperties = maxHeight
    ? {
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }
    : {};

  const scrollableClasses = maxHeight ? "overflow-y-auto ui-scrollbar" : "";

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={errorMessage || helperText ? helperId : undefined}
      aria-disabled={disabled || isLoadingConfig ? "true" : undefined}
      aria-busy={isLoadingConfig || Boolean(isLoadingProp) || effectiveIsSearching ? "true" : undefined}
      className={`inline-flex flex-col ${wrapperClassName}`}
      {...props}
    >
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

      {/* Danh sách Checkbox & Vùng cuộn & ListFooter */}
      <div
        style={scrollableStyles}
        className={`${orientationClasses} ${scrollableClasses} ${className}`}
      >
        {children ? (
          children
        ) : Boolean(isLoadingProp) && displayOptions.length === 0 ? (
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
                    shape="rectangle"
                    radius={radius || "md"}
                    width={SKELETON_BOX_SIZES[size] || "1.25rem"}
                    height={SKELETON_BOX_SIZES[size] || "1.25rem"}
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
              const isOptChecked = selectedValuesSet.has(optValStr);
              return (
                <Checkbox
                  key={String(opt.value)}
                  value={opt.value}
                  label={opt.label}
                  helperText={opt.description}
                  disabled={disabled || Boolean(opt.disabled)}
                  readOnly={isReadOnly || Boolean(opt.isReadOnly)}
                  size={size}
                  color={color}
                  variant={variant}
                  radius={radius}
                  labelPlacement={labelPlacement}
                  checked={isOptChecked}
                  onChange={(e) => handleCheckboxChange(opt.value, e.target.checked)}
                  config={{
                    indeterminate: opt.indeterminate,
                    isLoading: isLoadingConfig,
                    showSpinner,
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
                        shape="rectangle"
                        radius={radius || "md"}
                        width={SKELETON_BOX_SIZES[size] || "1.25rem"}
                        height={SKELETON_BOX_SIZES[size] || "1.25rem"}
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
