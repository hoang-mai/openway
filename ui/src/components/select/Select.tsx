import React, { useState, useEffect, useMemo, useCallback, useId } from "react";
import { SelectProps, SelectOptionItem } from "./types";
import SingleSelectTrigger from "./triggers/SingleSelectTrigger";
import SelectMenu from "./SelectMenu";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { useSelectFloating } from "./hooks/useSelectFloating";
import { useSelectSearch } from "./hooks/useSelectSearch";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { getSelectedOption } from "./utils";

const DEFAULT_OPTIONS: never[] = [];

export function Select<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>>({
  ref,
  options = DEFAULT_OPTIONS,
  value,
  defaultValue,
  onChange,
  size = "md",
  variant = "outline",
  color = "primary",
  radius = "md",
  id: idProp,
  label,
  labelPlacement = "floating",
  placeholder = "Chọn...",
  helperText,
  errorMessage,
  isDisabled = false,
  readOnly = false,
  name,
  searchable = false,
  searchMode = "client",
  searchPlaceholder,
  searchField = ["label", "value"],
  searchValue: searchValueProp,
  onSearchChange,
  menuFilters,
  menuFilterValues: controlledFilterValues,
  menuFilterLayout = "vertical",
  menuFilterGridCols = 2,
  showResetFilters = true,
  resetFiltersText,
  onMenuFilterChange,
  menuHeader,
  menuFooter,
  listFooter,
  filterFn,
  emptyText,
  emptyProps,
  isLoading: isLoadingProp,
  skeletonCount = 4,
  renderSkeleton,
  portal = true,
  portalRoot,
  placement = "bottom-start",
  maxMenuHeight = 280,
  animated = true,
  animationDuration = 150,
  startContent,
  endContent,
  renderValue,
  renderOption,
  config,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  labelClassName = "",
  helperClassName = "",
  ...props
}: SelectProps<TData, TFilters>) {
  const {
    isRequired = false,
    isInvalid: isInvalidConfig = false,
    isLoading: isLoadingConfig = false,
    showSpinner = false,
    isClearable = false,
    isFullWidth = true,
  } = config ?? {};

  const isInvalid = Boolean(isInvalidConfig ?? !!errorMessage);
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  // Tách bạch rõ ràng 2 trạng thái:
  // 1. isFetching (isLoadingProp): trạng thái get/tải dữ liệu options từ server
  const isFetching = Boolean(isLoadingProp);
  // 2. isSubmitting (isLoadingConfig): trạng thái khi gửi formData từ form config
  const isSubmitting = Boolean(isLoadingConfig);
  // Trạng thái bận hiển thị trên Trigger (khi submit có spinner)
  const isTriggerLoading = isSubmitting;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string | number | null>(defaultValue ?? null);
  const currentValue = isControlled ? (value ?? null) : uncontrolledValue;

  const [historicalOptions, setHistoricalOptions] = useState<Map<string | number, SelectOptionItem<TData>>>(() => {
    const initialMap = new Map<string | number, SelectOptionItem<TData>>();
    const initialVal = value !== undefined ? value : defaultValue;
    if (initialVal !== null && initialVal !== undefined) {
      const found = options.find((opt) => opt.value === initialVal);
      if (found) {
        initialMap.set(initialVal, found);
      }
    }
    return initialMap;
  });

  // Tự động ghi nhớ option đã chọn vào historicalOptions khi options được tải về
  useEffect(() => {
    if (currentValue !== null && currentValue !== undefined) {
      const found = options.find((opt) => opt.value === currentValue);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistoricalOptions((prev) => {
          const existing = prev.get(currentValue);
          if (existing && existing.label === found.label && existing.data === found.data) {
            return prev;
          }
          const next = new Map(prev);
          next.set(currentValue, found);
          return next;
        });
      }
    }
  }, [currentValue, options]);

  const selectedOption = useMemo<SelectOptionItem<TData> | null>(() => {
    const item = getSelectedOption(currentValue, options, historicalOptions);
    if (!item) return null;
    // Khi đang tải dữ liệu options lần đầu từ server (chưa có trong cache), không hiển thị fallback ID thô
    if (isFetching && options.length === 0 && !historicalOptions.has(item.value)) {
      return null;
    }
    return item;
  }, [currentValue, options, historicalOptions, isFetching]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const {
    searchInput,
    handleSearchChange,
    resetSearch,
    currentFilters,
    handleFilterChange,
    handleResetFilters,
    filteredOptions,
  } = useSelectSearch<TData, TFilters>({
    options,
    searchMode,
    controlledSearchValue: searchValueProp,
    onSearchChange,
    searchField,
    menuFilters,
    controlledFilterValues,
    onMenuFilterChange,
    filterFn,
    isOpen,
    setIsOpen,
  });

  const {
    refs,
    elements: { reference },
    floatingStyles,
    transitionStyles,
    isMounted,
    getReferenceProps,
    getFloatingProps,
    elementsRef,
  } = useSelectFloating({
      placement,
      isOpen,
      onOpenChange: (nextOpen) => {
        setIsOpen(nextOpen);
        if (!nextOpen) {
          setActiveIndex(null);
          if (searchMode === "client") {
            resetSearch();
          }
        }
      },
      disabled: isDisabled,
      readOnly,
      isLoading: isSubmitting,
      animated,
      animationDuration,
      activeIndex,
      onNavigate: setActiveIndex,
    });

  const handleSelectOption = useCallback(
    (option: SelectOptionItem<TData>) => {
      if (option.disabled || isDisabled || readOnly) return;

      setHistoricalOptions((prev) => {
        if (prev.get(option.value) === option) return prev;
        const next = new Map(prev);
        next.set(option.value, option);
        return next;
      });

      if (!isControlled) {
        setUncontrolledValue(option.value);
      }
      onChange?.(option.value, option);
      setIsOpen(false);
      resetSearch();
    },
    [isDisabled, readOnly, isControlled, onChange, resetSearch]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDisabled || readOnly) return;

      if (!isControlled) {
        setUncontrolledValue(null);
      }
      onChange?.(null, null);
      resetSearch();
    },
    [isDisabled, readOnly, isControlled, onChange, resetSearch]
  );

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      if (isOpen && activeIndex !== null) {
        e.preventDefault();
        const targetOption = filteredOptions[activeIndex];
        if (targetOption && !targetOption.disabled) {
          handleSelectOption(targetOption);
        }
      } else if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    } else if (e.key === "ArrowDown" && !isOpen) {
      setIsOpen(true);
    }
  };

  // ==================== LAYOUT ====================
  const isFloating = labelPlacement === "floating";
  const isHorizontal = labelPlacement === "left";
  const generatedId = useId();
  const selectId = idProp || generatedId;
  const triggerId = `${selectId}-trigger`;

  const renderLabel = () => (
    <FieldLabel
      htmlFor={triggerId}
      label={label}
      isRequired={isRequired}
      isFloating={isFloating}
      size={size}
      color={color}
      hasError={isInvalid}
      cursor="pointer"
      className={labelClassName}
      isOpen={isOpen}
    />
  );

  const hasFloatingLabel = isFloating && Boolean(label);

  return (
    <div
      ref={ref}
      id={idProp}
      className={`group/field relative flex ${
        isHorizontal ? "flex-row items-center gap-3" : "flex-col"
      } ${hasFloatingLabel ? "pt-2" : ""} ${isFullWidth ? "w-full" : "inline-flex"} ${className}`}
      data-state={isOpen ? "open" : "closed"}
      data-disabled={isDisabled}
      data-invalid={isInvalid}
      {...props}
    >
      {!isFloating && renderLabel()}

      {/* Main column containing Trigger & Helper/Error Text */}
      <div className={`flex flex-col ${isFullWidth ? "w-full" : "flex-1 min-w-0"}`}>
        {/* Trigger & Menu Container */}
        <div className="relative w-full">
          {isFloating && renderLabel()}
          <SingleSelectTrigger
            id={triggerId}
            triggerRef={refs.setReference}
            getReferenceProps={getReferenceProps}
            selectedOption={selectedOption}
            isOpen={isOpen}
            size={size}
            variant={variant}
            color={color}
            radius={radius}
            placeholder={searchPlaceholder || placeholder}
            disabled={isDisabled}
            readOnly={readOnly}
            isInvalid={isInvalid}
            searchable={searchable}
            searchValue={searchInput}
            onSearchChange={handleSearchChange}
            onClear={handleClear}
            clearable={isClearable}
            isLoading={isTriggerLoading}
            showSpinner={showSpinner}
            startContent={startContent}
            endContent={endContent}
            renderValue={renderValue}
            onKeyDown={handleTriggerKeyDown}
            className={triggerClassName}
          />

          <SelectMenu
            isOpen={isOpen}
            isMounted={isMounted}
            animated={animated}
            transitionStyles={transitionStyles}
            options={filteredOptions}
            selectedValues={currentValue !== null && currentValue !== undefined ? [currentValue] : []}
            activeIndex={activeIndex}
            size={size}
            color={color}
            radius={radius}
            isLoading={isFetching}
            skeletonCount={skeletonCount}
            renderSkeleton={renderSkeleton}
            portal={portal}
            portalRoot={portalRoot}
            reference={reference}
            maxMenuHeight={maxMenuHeight}
            emptyText={emptyText}
            emptyProps={emptyProps}
            menuHeader={menuHeader}
            menuFooter={menuFooter}
            listFooter={listFooter}
            menuFilters={menuFilters}
            menuFilterValues={currentFilters}
            menuFilterLayout={menuFilterLayout}
            menuFilterGridCols={menuFilterGridCols}
            showResetFilters={showResetFilters}
            resetFiltersText={resetFiltersText}
            onMenuFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            renderOption={renderOption}
            onSelectOption={handleSelectOption}
            onOptionMouseEnter={setActiveIndex}
            floatingRef={refs.setFloating}
            floatingStyles={floatingStyles}
            getFloatingProps={getFloatingProps}
            listElementsRef={elementsRef}
            className={menuClassName}
          />
        </div>

        {/* Hidden input for form submission */}
        {name && currentValue !== null && currentValue !== undefined && (
          <input type="hidden" name={name} value={String(currentValue)} />
        )}

        {/* Helper text or Error message (Animated & Accessible) */}
        <HelperErrorText
          id={`${selectId}-helper`}
          errorMessage={errorMessage}
          helperText={helperText}
          sizeClassName={currentSize.helper}
          className={helperClassName}
        />
      </div>
    </div>
  );
}

export default Select;
