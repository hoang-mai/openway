import React, { useState, useMemo, useCallback, useId } from "react";
import { SelectProps, SelectOptionItem } from "./types";
import SingleSelectTrigger from "./triggers/SingleSelectTrigger";
import SelectMenu from "./SelectMenu";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { useSelectFloating } from "./hooks/useSelectFloating";
import { useSelectSearch } from "./hooks/useSelectSearch";
import { createOptionsMap, getSelectedOption } from "./utils";

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
  labelPlacement = "top",
  placeholder = "Chọn...",
  helperText,
  errorMessage,
  isInvalid: isInvalidProp,
  isDisabled = false,
  readOnly = false,
  isRequired = false,
  name,
  searchable = false,
  searchMode = "client",
  searchPlacement = "trigger",
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
}: SelectProps<TData, TFilters>) {
  const isInvalid = Boolean(isInvalidProp ?? !!errorMessage);

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string | number | null>(defaultValue ?? null);
  const currentValue = isControlled ? (value ?? null) : uncontrolledValue;

  const [historicalOptions, setHistoricalOptions] = useState<Map<string | number, SelectOptionItem<TData>>>(() => {
    return createOptionsMap(options);
  });

  const selectedOption = useMemo<SelectOptionItem<TData> | null>(() => {
    return getSelectedOption(currentValue, options, historicalOptions);
  }, [currentValue, options, historicalOptions]);

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
    onSearch,
    debounceMs,
    filterFn,
    isOpen,
    setIsOpen,
  });

  const { refs, floatingStyles, transitionStyles, isMounted, getReferenceProps, getFloatingProps, elementsRef } =
    useSelectFloating({
      placement,
      isOpen,
      onOpenChange: (nextOpen) => {
        setIsOpen(nextOpen);
        if (!nextOpen) {
          setActiveIndex(null);
          resetSearch();
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

  const handleSelectOption = useCallback(
    (option: SelectOptionItem<TData>) => {
      if (option.disabled || isDisabled || readOnly) return;

      setHistoricalOptions((prev) => {
        if (prev.has(option.value)) return prev;
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

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isOpen && activeIndex !== null) {
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
          searchPlacement={searchPlacement}
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
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
          selectedValues={currentValue !== null && currentValue !== undefined ? [currentValue] : []}
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
      <HelperErrorText id={`${selectId}-helper`} errorMessage={errorMessage} helperText={helperText} />
    </div>
  );
}

export default Select;
