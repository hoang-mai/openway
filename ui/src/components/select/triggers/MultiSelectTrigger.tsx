import React, { ReactNode, useRef } from "react";
import { SelectOptionItem, SelectSize, SelectVariant, SelectColor, SelectRadius } from "../types";
import { sizeConfig, radiusConfig, variantColorConfig, badgeRadiusMap } from "../constants";
import { getVisibleTags } from "../utils";
import { getSafeConfig } from "@/utils/function";
import { Badge } from "@/components/badge";
import SelectTriggerContainer from "./SelectTriggerContainer";

export interface MultiSelectTriggerProps<TData = unknown> {
  id?: string;
  selectedOptions: SelectOptionItem<TData>[];
  isOpen: boolean;
  size?: SelectSize;
  variant?: SelectVariant;
  color?: SelectColor;
  radius?: SelectRadius;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isInvalid?: boolean;
  maxTagCount?: number;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onRemoveTag?: (option: SelectOptionItem<TData>) => void;
  onClear?: (e: React.MouseEvent) => void;
  clearable?: boolean;
  isLoading?: boolean;
  showSpinner?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  renderValue?: (selected: SelectOptionItem<TData>[]) => ReactNode;
  triggerRef: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  className?: string;
}

export function MultiSelectTrigger<TData = unknown>({
  id,
  selectedOptions,
  isOpen,
  size = "md",
  variant = "outline",
  color = "primary",
  radius = "md",
  placeholder = "Chọn...",
  disabled = false,
  readOnly = false,
  isInvalid = false,
  maxTagCount,
  searchable = false,
  searchValue = "",
  onSearchChange,
  onRemoveTag,
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
}: MultiSelectTriggerProps<TData>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const badgeRadius = getSafeConfig(radius, badgeRadiusMap, "md");

  const hasError = Boolean(isInvalid);
  const activeColor: SelectColor = hasError ? "error" : color;

  const variantStyle =
    variant === "other" ? "" : variantColorConfig[variant]?.[activeColor] || variantColorConfig.outline.primary;

  const isTriggerSearchable = Boolean(searchable);
  const hasSelection = selectedOptions.length > 0;
  const showClear = clearable && (hasSelection || searchValue.length > 0) && !disabled && !readOnly;

  const { visibleTags, hiddenTagCount } = getVisibleTags(selectedOptions, maxTagCount);

  const handleContainerClick = () => {
    if (!disabled && !readOnly && !isLoading && isTriggerSearchable) {
      inputRef.current?.focus();
    }
  };

  const renderContent = () => {
    if (renderValue && hasSelection) {
      return (
        <div className="flex-1 min-w-0 truncate text-neutral-900">
          {renderValue(selectedOptions)}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
        {visibleTags.map((opt) => (
          <Badge
            key={String(opt.value)}
            size={currentSize.badgeSize}
            variant="soft"
            color={color}
            radius={badgeRadius}
            onDelete={!disabled && !readOnly && !isLoading && onRemoveTag ? () => onRemoveTag(opt) : undefined}
            className="max-w-full truncate"
          >
            <span className="truncate">{opt.label}</span>
          </Badge>
        ))}

        {hiddenTagCount > 0 && (
          <Badge size={currentSize.badgeSize} variant="soft" color="neutral" radius={badgeRadius}>
            +{hiddenTagCount}
          </Badge>
        )}

        {isTriggerSearchable && !disabled && !readOnly && !isLoading ? (
          <input
            ref={inputRef}
            type="text"
            aria-label="Search"
            value={searchValue ?? ""}
            placeholder={hasSelection ? "" : placeholder}
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
            className={`bg-transparent outline-none border-none p-0 flex-1 min-w-15 text-neutral-900 placeholder:text-neutral-400 ${currentSize.input}`}
          />
        ) : !hasSelection ? (
          <span className="text-neutral-400 truncate">{placeholder}</span>
        ) : null}
      </div>
    );
  };

  return (
    <SelectTriggerContainer
      id={id}
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

export default MultiSelectTrigger;
