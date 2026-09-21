import React, { ReactNode, useRef } from "react";
import {
  SelectOptionItem,
  SelectSize,
  SelectVariant,
  SelectColor,
  SelectRadius,
} from "../types";
import { sizeConfig, radiusConfig, variantColorConfig } from "../constants";
import { getSafeConfig } from "@/utils/function";
import SelectTriggerContainer from "./SelectTriggerContainer";

export interface SingleSelectTriggerProps<TData = unknown> {
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  selectedOption: SelectOptionItem<TData> | null;
  isOpen: boolean;
  size?: SelectSize;
  variant?: SelectVariant;
  color?: SelectColor;
  radius?: SelectRadius;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isInvalid?: boolean;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onClear?: (e: React.MouseEvent) => void;
  clearable?: boolean;
  isLoading?: boolean;
  showSpinner?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  renderValue?: (selected: SelectOptionItem<TData>) => ReactNode;
  triggerRef: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  className?: string;
}

export function SingleSelectTrigger<TData = unknown>({
  id,
  ariaLabel,
  ariaLabelledBy,
  selectedOption,
  isOpen,
  size = "md",
  variant = "outline",
  color = "primary",
  radius = "md",
  placeholder = "Chọn...",
  disabled = false,
  readOnly = false,
  isInvalid = false,
  searchable = false,
  searchValue = "",
  onSearchChange,
  onClear,
  clearable = false,
  isLoading = false,
  showSpinner = false,
  startContent,
  endContent,
  renderValue,
  triggerRef,
  getReferenceProps,
  onKeyDown,
  className = "",
}: SingleSelectTriggerProps<TData>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const hasError = Boolean(isInvalid);
  const activeColor: SelectColor = hasError ? "error" : color;

  const variantStyle =
    variant === "other" ? "" : variantColorConfig[variant]?.[activeColor] || variantColorConfig.outline.primary;

  const isTriggerSearchable = Boolean(searchable);
  const hasSelection = selectedOption !== null && selectedOption !== undefined;
  const showClear = clearable && (hasSelection || searchValue.length > 0) && !disabled && !readOnly;

  const handleContainerClick = () => {
    if (!disabled && !readOnly && !isLoading && isTriggerSearchable) {
      inputRef.current?.focus();
    }
  };

  const renderContent = () => {
    if (renderValue && hasSelection && selectedOption) {
      return <div className="flex-1 min-w-0 truncate text-neutral-900">{renderValue(selectedOption)}</div>;
    }

    if (isTriggerSearchable && !disabled && !readOnly && !isLoading) {
      return (
        <div className="relative flex-1 min-w-0 flex items-center">
          <input
            ref={inputRef}
            type="text"
            aria-label="Search"
            value={searchValue ?? ""}
            placeholder={selectedOption ? selectedOption.label : placeholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.stopPropagation();
              }
              onKeyDown?.(e);
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            }}
            className={`w-full bg-transparent outline-none border-none p-0 text-neutral-900 ${
              !searchValue && selectedOption
                ? "placeholder:text-neutral-900 placeholder:font-normal"
                : "placeholder:text-neutral-400"
            } ${currentSize.input}`}
          />
        </div>
      );
    }

    return (
      <div className="flex-1 min-w-0 truncate">
        {selectedOption ? (
          <span className="text-neutral-900">{selectedOption.label}</span>
        ) : (
          <span className="text-neutral-600">{placeholder}</span>
        )}
      </div>
    );
  };

  return (
    <SelectTriggerContainer
      id={id}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      isOpen={isOpen}
      disabled={disabled}
      isLoading={isLoading}
      showSpinner={showSpinner}
      showClear={showClear}
      onClear={onClear}
      startContent={startContent}
      endContent={endContent}
      triggerRef={triggerRef}
      getReferenceProps={getReferenceProps}
      onClick={handleContainerClick}
      onKeyDown={onKeyDown}
      roundedClass={roundedClass}
      currentSize={currentSize}
      variantStyle={variantStyle}
      className={className}
    >
      {renderContent()}
    </SelectTriggerContainer>
  );
}

export default SingleSelectTrigger;
