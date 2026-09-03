import React, { useState, useId, useMemo, useCallback } from "react";
import { RadioGroupProps, RadioOptionItem } from "./types";
import { sizeConfig, orientationConfig, searchInputSizeConfig } from "./constants";
import Radio from "./Radio";
import Input from "@/components/input/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { rankAndFilterItems, getSafeConfig } from "@/utils/function";

const DEFAULT_OPTIONS: never[] = [];

export default function RadioGroup<TData = unknown>({
  options = DEFAULT_OPTIONS as RadioOptionItem<TData>[],
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
  searchPlaceholder = "Tìm kiếm...",
  searchValue: searchValueProp,
  onSearchChange,
  searchMode = "client",
  searchField = "label",
  filterFn,
  onSearch,
  debounceMs = 300,
  emptyText = "Không tìm thấy kết quả",
  searchClassName = "",
  searchInputSize: searchInputSizeProp,
  ref,
  ...props
}: RadioGroupProps<TData>) {
  const {
    isRequired = false,
    isInvalid: isInvalidProp,
    isLoading = false,
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
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
  const currentValue = isControlled ? valueProp : internalValue;

  const isInvalid = Boolean(isInvalidProp || errorMessage);

  // Controlled vs Uncontrolled state cho ô tìm kiếm
  const isSearchControlled = searchValueProp !== undefined;
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const currentSearch = isSearchControlled ? searchValueProp : internalSearchValue;

  // Trạng thái tìm kiếm Server
  const [internalIsSearching, setInternalIsSearching] = useState(false);
  const effectiveIsSearching = isSearchingProp ?? internalIsSearching;
  const [serverOptions, setServerOptions] = useState<RadioOptionItem<TData>[] | null>(null);

  // Bộ nhớ đệm lưu trữ các options đã chọn (để bảo lưu preserveSelected khi lọc)
  const [historicalOptions, setHistoricalOptions] = useState<Map<string, RadioOptionItem<TData>>>(() => {
    const initialMap = new Map<string, RadioOptionItem<TData>>();
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
        console.error("Error fetching radio search options:", err);
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
      setServerOptions(null);
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
    let matchedList: RadioOptionItem<TData>[];
    if (searchMode === "server") {
      matchedList = currentPool;
    } else if (filterFn) {
      matchedList = currentPool.filter((opt) => filterFn(opt, keyword));
    } else {
      matchedList = rankAndFilterItems(currentPool, keyword, searchField);
    }

    // 3. Bảo lưu các mục đã chọn (preserveSelected)
    if (!preserveSelected || currentValue === null || currentValue === undefined) {
      return matchedList;
    }

    // Bảo lưu mục đã chọn: nếu mục đang chọn không nằm trong kết quả tìm kiếm, đưa lên đầu danh sách
    const selectedValStr = String(currentValue);
    const isAlreadyInMatched = matchedList.some((item) => String(item.value) === selectedValStr);
    if (!isAlreadyInMatched) {
      const cached = historicalOptions.get(selectedValStr);
      if (cached) {
        return [cached, ...matchedList];
      } else {
        return [{ value: selectedValStr, label: selectedValStr } as RadioOptionItem<TData>, ...matchedList];
      }
    }

    return matchedList;
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

  const handleRadioChange = useCallback(
    (val: string) => {
      if (disabled || isReadOnly || isLoading) return;

      // Lưu đúng option được chọn vào historicalOptions để tối ưu bộ nhớ
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

      if (!isControlled) {
        setInternalValue(val);
      }
      onChange?.(val);
    },
    [disabled, isReadOnly, isLoading, isControlled, onChange, options, searchMode, serverOptions]
  );

  const orientationClasses = getSafeConfig(orientation, orientationConfig, "vertical");
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const searchInputSize = searchInputSizeProp ?? getSafeConfig(size, searchInputSizeConfig, "md");

  const groupLabelClasses = [
    "text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 select-none",
    disabled ? "opacity-60" : "",
    labelClassName,
  ]
    .filter(Boolean)
    .join(" ");

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
      aria-disabled={disabled ? "true" : undefined}
      aria-readonly={isReadOnly ? "true" : undefined}
      aria-busy={isLoading ? "true" : undefined}
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
            disabled={disabled || isLoading}
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

      {/* Danh sách Radio */}
      <div className={`${orientationClasses} ${className}`}>
        {displayOptions.length > 0 ? (
          displayOptions.map((opt) => {
            const optValStr = String(opt.value);
            const isOptChecked =
              currentValue !== null && currentValue !== undefined && String(currentValue) === optValStr;
            return (
              <Radio
                key={opt.value}
                name={groupName}
                value={opt.value}
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
                  isLoading,
                  isInvalid,
                  isRequired,
                }}
              />
            );
          })
        ) : (
          <div className="py-3 text-center text-sm text-neutral-400 select-none">
            {!currentSearch.trim() && searchMode === "server"
              ? "Nhập từ khóa để tìm kiếm sản phẩm..."
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
