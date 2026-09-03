import {
  useState,
  useId,
  useMemo,
  useCallback,
} from "react";
import { CheckboxGroupProps, CheckboxOptionItem } from "./types";
import { sizeConfig, orientationConfig, searchInputSizeConfig } from "./constants";
import { getSafeConfig, rankAndFilterItems } from "@/utils/function";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import HelperErrorText from "@/components/common/HelperErrorText";
import Checkbox from "./Checkbox";
import Input from "@/components/input/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import Spinner from "@/components/icons/Spinner";

const DEFAULT_OPTIONS: never[] = [];
const DEFAULT_VALUE: never[] = [];

export default function CheckboxGroup<TData = unknown>({
  value: valueProp,
  defaultValue = DEFAULT_VALUE,
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
  options = DEFAULT_OPTIONS as CheckboxOptionItem<TData>[],
  config,
  searchMode = "client",
  searchPlaceholder = "Tìm kiếm...",
  searchValue: searchValueProp,
  defaultSearchValue = "",
  onSearchChange,
  searchClassName = "",
  searchField = "label",
  filterFn,
  onSearch,
  debounceMs = 300,
  emptyText = "Không tìm thấy kết quả",
  children,
  ref,
  ...props
}: CheckboxGroupProps<TData>) {
  const {
    isRequired = false,
    isInvalid: isInvalidProp,
    isLoading = false,
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
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const currentValue = isControlled ? (valueProp as string[]) : internalValue;
  const isInvalid = Boolean(isInvalidProp ?? !!errorMessage);

  // Controlled vs Uncontrolled search query
  const isSearchControlled = searchValueProp !== undefined;
  const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue);
  const currentSearch = isSearchControlled ? (searchValueProp as string) : internalSearchValue;

  // Server mode state
  const [serverOptions, setServerOptions] = useState<CheckboxOptionItem<TData>[] | null>(null);
  const [internalIsSearching, setInternalIsSearching] = useState(false);
  const effectiveIsSearching = Boolean(isSearchingProp ?? internalIsSearching);

  // Bộ lưu trữ các options từ Server hoặc các mục đã chọn trong lịch sử để bảo lưu
  const [historicalOptions, setHistoricalOptions] = useState<Map<string, CheckboxOptionItem<TData>>>(() => {
    const initialMap = new Map<string, CheckboxOptionItem<TData>>();
    options.forEach((opt) => {
      initialMap.set(String(opt.value), opt);
    });
    return initialMap;
  });

  // Debounced callback cho Server Search Mode
  const { debounced: debouncedServerSearch } = useDebouncedCallback(
    async (query: string) => {
      if (searchMode !== "server" || !onSearch) return;
      try {
        setInternalIsSearching(true);
        const result = await onSearch(query);
        if (Array.isArray(result)) {
          setServerOptions(result);
        }
      } catch (err) {
        console.error("Error fetching search options:", err);
      } finally {
        setInternalIsSearching(false);
      }
    },
    debounceMs
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isSearchControlled) {
      setInternalSearchValue(val);
    }
    onSearchChange?.(val);

    if (searchMode === "server") {
      debouncedServerSearch(val);
    }
  };

  const handleClearSearch = () => {
    if (!isSearchControlled) {
      setInternalSearchValue("");
    }
    onSearchChange?.("");

    if (searchMode === "server") {
      debouncedServerSearch("");
    }
  };

  // Pipeline tính toán danh sách hiển thị
  const displayOptions = useMemo(() => {
    const keyword = currentSearch.trim();
    const currentPool = searchMode === "server" && serverOptions ? serverOptions : options;

    // 1. Khi không tìm kiếm, hiển thị toàn bộ pool
    if (!searchable || !keyword) {
      return currentPool;
    }

    // 2. Lọc danh sách khớp với từ khóa
    let matchedList: CheckboxOptionItem<TData>[];
    if (searchMode === "server") {
      matchedList = currentPool;
    } else if (filterFn) {
      matchedList = currentPool.filter((opt) => filterFn(opt, keyword));
    } else {
      matchedList = rankAndFilterItems(currentPool, keyword, searchField);
    }

    // 3. Bảo lưu các mục đã chọn (preserveSelected)
    if (!preserveSelected) {
      return matchedList;
    }

    const matchedValuesSet = new Set(matchedList.map((item) => String(item.value)));
    const preservedList: CheckboxOptionItem<TData>[] = [];

    for (const val of currentValue) {
      if (!matchedValuesSet.has(val)) {
        const cached = historicalOptions.get(val);

        if (cached) {
          preservedList.push(cached);
        } else {
          preservedList.push({ value: val, label: val } as CheckboxOptionItem<TData>);
        }
      }
    }

    return [...preservedList, ...matchedList];
  }, [
    searchable,
    currentSearch,
    searchMode,
    serverOptions,
    options,
    filterFn,
    searchField,
    preserveSelected,
    currentValue,
    historicalOptions,
  ]);

  const handleCheckboxChange = useCallback(
    (val: string, isChecked: boolean) => {
      if (disabled || isReadOnly || isLoading) return;

      if (isChecked) {
        const pool = searchMode === "server" && serverOptions ? serverOptions : options;
        const found = pool.find((o) => String(o.value) === val);
        if (found) {
          setHistoricalOptions((prev) => {
            if (prev.has(val)) return prev;
            const next = new Map(prev);
            next.set(val, found);
            return next;
          });
        }
      }

      let nextValue: string[];
      if (isChecked) {
        nextValue = [...currentValue, val];
      } else {
        nextValue = currentValue.filter((item) => item !== val);
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [disabled, isReadOnly, isLoading, currentValue, isControlled, onChange, options, searchMode, serverOptions]
  );



  const orientationClasses = getSafeConfig(orientation, orientationConfig, "vertical");

  const groupLabelClasses = [
    "text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 select-none",
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

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={errorMessage || helperText ? helperId : undefined}
      aria-disabled={disabled || isLoading ? "true" : undefined}
      aria-busy={isLoading || effectiveIsSearching ? "true" : undefined}
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

      {/* Danh sách Checkbox */}
      <div className={`${orientationClasses} ${className}`}>
        {children ? (
          children
        ) : displayOptions.length > 0 ? (
          displayOptions.map((opt) => {
            const optValStr = String(opt.value);
            const isOptChecked = selectedValuesSet.has(optValStr);
            return (
              <Checkbox
                key={opt.value}
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
                onChange={(e) => handleCheckboxChange(optValStr, e.target.checked)}
                config={{
                  indeterminate: opt.indeterminate,
                  isLoading,
                  showSpinner,
                  isInvalid,
                  isRequired,
                }}
              />
            );
          })
        ) : (
          <div className="py-2 text-xs text-neutral-500 dark:text-neutral-400 italic">
            {!currentSearch.trim() && searchMode === "server"
              ? "Nhập từ khóa để tìm kiếm..."
              : emptyText}
          </div>
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
