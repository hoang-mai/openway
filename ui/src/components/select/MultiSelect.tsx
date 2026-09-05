import React, { useState, useMemo, useCallback, useId } from "react";
import { MultiSelectProps, SelectOptionItem } from "./types";
import MultiSelectTrigger from "./triggers/MultiSelectTrigger";
import SelectMenu from "./SelectMenu";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { useSelectFloating } from "./hooks/useSelectFloating";
import { useSelectSearch } from "./hooks/useSelectSearch";
import { createOptionsMap, getSelectedOptions } from "./utils";

const DEFAULT_OPTIONS: never[] = [];
const EMPTY_VALUES: (string | number)[] = [];

export function MultiSelect<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>>({
  ref,
  options = DEFAULT_OPTIONS,
  value: valueProp,
  defaultValue,
  onChange,
  size = "md",
  variant = "outline",
  color = "primary",
  radius = "md",
  id: idProp,
  label,
  labelPlacement = "top",
  placeholder = "Chọn...",
  helperText,
  errorMessage,
  isInvalid: isInvalidProp,
  isDisabled = false,
  readOnly = false,
  isRequired = false,
  name,
  maxTagCount,
  searchable = false,
  searchMode = "client",
  searchPlacement = "trigger",
  searchPlaceholder,
  searchField = ["label", "value"],
  preserveSelected = true,
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
  onSearch,
  debounceMs = 300,
  filterFn,
  isLoading = false,
  emptyText,
  emptyProps,
  clearable = false,
  portal = true,
  placement = "bottom-start",
  maxMenuHeight = 280,
  animated = true,
  animationDuration = 150,
  startContent,
  endContent,
  renderValue,
  renderOption,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  labelClassName = "",
  ...props
}: MultiSelectProps<TData, TFilters>) {
  const isInvalid = Boolean(isInvalidProp ?? !!errorMessage);

  // ==================== VALUE STATE ====================
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<(string | number)[]>(defaultValue ?? EMPTY_VALUES);
  const currentValues = isControlled ? (valueProp ?? EMPTY_VALUES) : uncontrolledValue;

  // ==================== HISTORICAL OPTIONS STATE (NO REF IN RENDER) ====================
  const [historicalOptions, setHistoricalOptions] = useState<Map<string | number, SelectOptionItem<TData>>>(() => {
    return createOptionsMap(options);
  });

  const selectedOptions = useMemo<SelectOptionItem<TData>[]>(() => {
    return getSelectedOptions(currentValues, options, historicalOptions);
  }, [currentValues, options, historicalOptions]);

  // ==================== OPEN & ACTIVE INDEX ====================
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ==================== SEARCH & FILTERS HOOK ====================
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
    onSearch,
    debounceMs,
    filterFn,
    isOpen,
    setIsOpen,
    preserveSelected,
    selectedValues: currentValues,
    historicalOptions,
  });

  // ==================== FLOATING UI HOOK ====================
  const {
    refs,
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
      }
    },
    disabled: isDisabled,
    readOnly,
    isLoading,
    animated,
    animationDuration,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  // ==================== SELECTION HANDLERS ====================
  const handleSelectOption = useCallback(
    (option: SelectOptionItem<TData>) => {
      if (option.disabled || isDisabled || readOnly) return;

      setHistoricalOptions((prev) => {
        if (prev.has(option.value)) return prev;
        const next = new Map(prev);
        next.set(option.value, option);
        return next;
      });

      const exists = currentValues.includes(option.value);
      const nextValues = exists
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];

      if (!isControlled) {
        setUncontrolledValue(nextValues);
      }

      const nextSelectedItems = getSelectedOptions(nextValues, options, historicalOptions);

      onChange?.(nextValues, nextSelectedItems);
      resetSearch();
    },
    [isDisabled, readOnly, currentValues, isControlled, options, onChange, resetSearch, historicalOptions]
  );

  const handleRemoveTag = useCallback(
    (option: SelectOptionItem<TData>) => {
      if (isDisabled || readOnly) return;
      const nextValues = currentValues.filter((v) => v !== option.value);

      if (!isControlled) {
        setUncontrolledValue(nextValues);
      }

      const nextSelectedItems = nextValues.map((val) => {
        return (
          options.find((o) => o.value === val) ||
          historicalOptions.get(val) || {
            value: val,
            label: String(val),
          }
        );
      });

      onChange?.(nextValues, nextSelectedItems);
    },
    [isDisabled, readOnly, currentValues, isControlled, options, onChange, historicalOptions]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDisabled || readOnly) return;

      if (!isControlled) {
        setUncontrolledValue([]);
      }
      onChange?.([], []);
      resetSearch();
    },
    [isDisabled, readOnly, isControlled, onChange, resetSearch]
  );

  // ==================== KEYBOARD HANDLING ====================
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputVal = (e.currentTarget as HTMLInputElement)?.value ?? searchInput;
    if (e.key === "Backspace" && (!inputVal || inputVal.length === 0) && selectedOptions.length > 0) {
      e.preventDefault();
      const lastTag = selectedOptions[selectedOptions.length - 1];
      if (lastTag) {
        handleRemoveTag(lastTag);
      }
    } else if (e.key === "Enter" && isOpen && activeIndex !== null) {
      e.preventDefault();
      const targetOption = filteredOptions[activeIndex];
      if (targetOption) {
        handleSelectOption(targetOption);
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
    />
  );

  return (
    <div
      ref={ref}
      id={idProp}
      className={`group/field flex ${
        isHorizontal ? "flex-row items-center gap-3" : "flex-col"
      } ${isFloating ? "pt-2" : ""} ${className}`}
      data-disabled={isDisabled}
      data-invalid={isInvalid}
      {...props}
    >
      {!isFloating && renderLabel()}

      {/* Trigger & Menu Container */}
      <div className="relative flex-1 min-w-0">
        {isFloating && renderLabel()}
        <MultiSelectTrigger
          id={triggerId}
          triggerRef={refs.setReference}
          getReferenceProps={getReferenceProps}
          selectedOptions={selectedOptions}
          isOpen={isOpen}
          size={size}
          variant={variant}
          color={color}
          radius={radius}
          placeholder={searchPlaceholder || placeholder}
          disabled={isDisabled}
          readOnly={readOnly}
          isInvalid={isInvalid}
          maxTagCount={maxTagCount}
          searchable={searchable}
          searchPlacement={searchPlacement}
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          onRemoveTag={handleRemoveTag}
          onClear={handleClear}
          clearable={clearable}
          isLoading={isLoading}
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
          selectedValues={currentValues}
          activeIndex={activeIndex}
          size={size}
          color={color}
          radius={radius}
          isLoading={isLoading}
          portal={portal}
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

      {/* Hidden inputs for form submission */}
      {name &&
        currentValues.map((val, idx) => (
          <input key={`${name}-${val}-${idx}`} type="hidden" name={`${name}[]`} value={String(val)} />
        ))}

      {/* Helper text or Error message (Animated & Accessible) */}
      <HelperErrorText
        id={`${selectId}-helper`}
        errorMessage={errorMessage}
        helperText={helperText}
      />
    </div>
  );
}

export default MultiSelect;
