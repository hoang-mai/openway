import { useId, useState, useRef, ReactNode, KeyboardEvent, ClipboardEvent } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { MultiInputProps } from "./types";
import {
  multiInputSizeConfig,
  radiusConfig,
  badgeRadiusMap,
  variantColorConfig,
} from "./constants";
import { Badge } from "@/components/badge";
import CloseIcon from "@/components/icons/CloseIcon";
import Spinner from "@/components/icons/Spinner";
import PlusIcon from "@/components/icons/PlusIcon";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { getSafeConfig } from "@/utils/function";
import { splitTagsFromText } from "./utils";

export default function MultiInput({
  size,
  variant,
  color,
  radius,
  label,
  labelPlacement = "floating",
  config,
  helperText,
  errorMessage,
  leftIcon,
  leftAddon,
  rightIcon,
  rightAddon,
  onClear,
  wrapperClassName = "",
  inputWrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  id,
  name,
  value,
  defaultValue = [],
  onChange,
  inputValue,
  onInputValueChange,
  delimiters = ["Enter"],
  showAddButton = false,
  renderAddButton,
  addOnBlur = false,
  addOnPaste = true,
  pasteSplitRegex = /[\r\n,;\t]+/,
  trimValues = true,
  allowDuplicates = false,
  onDuplicate,
  maxTags,
  onMaxTagsReached,
  maxTagLength,
  validateTag,
  onValidateError,
  maxTagCount,
  renderTag,
  tagVariant,
  tagColor,
  tagRadius,
  tagSize,
  tagClassName = "",
  addButtonClassName = "",
  disabled = false,
  readOnly = false,
  className = "",
  placeholder = "Nhập và nhấn Enter...",
  autoFocus = false,
  ref,
}: MultiInputProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = false,
    isFullWidth = false,
  } = config ?? {};

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;
  const labelId = label ? `${inputId}-label` : undefined;

  const internalRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = useMergeRefs([internalRef, ref]);

  // Controlled vs Uncontrolled Values
  const isValuesControlled = value !== undefined;
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const currentValues = isValuesControlled ? value || [] : internalValues;

  // Controlled vs Uncontrolled Input Text
  const isInputControlled = inputValue !== undefined;
  const [internalInputValue, setInternalInputValue] = useState("");
  const currentInputValue = isInputControlled ? inputValue || "" : internalInputValue;

  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  // Helper cập nhật text input
  const setInputText = (nextText: string) => {
    if (!isInputControlled) {
      setInternalInputValue(nextText);
    }
    onInputValueChange?.(nextText);
  };

  // Helper cập nhật values
  const updateValues = (nextValues: string[]) => {
    if (!isValuesControlled) {
      setInternalValues(nextValues);
    }
    onChange?.(nextValues);
  };

  // Helper thêm 1 tag
  const addTag = (rawTag: string): boolean => {
    if (disabled || readOnly || isLoading) return false;
    let tag = trimValues ? rawTag.trim() : rawTag;
    if (!tag) return false;

    if (maxTagLength && maxTagLength > 0 && tag.length > maxTagLength) {
      tag = tag.slice(0, maxTagLength);
    }

    if (maxTags !== undefined && currentValues.length >= maxTags) {
      onMaxTagsReached?.(tag);
      setLiveAnnouncement(`Maximum limit of ${maxTags} tags reached`);
      return false;
    }

    if (!allowDuplicates && currentValues.includes(tag)) {
      onDuplicate?.(tag);
      setLiveAnnouncement(`Tag "${tag}" already exists`);
      return false;
    }

    if (validateTag) {
      const validationResult = validateTag(tag);
      if (validationResult === false || typeof validationResult === "string") {
        onValidateError?.(tag, typeof validationResult === "string" ? validationResult : undefined);
        setLiveAnnouncement(`Tag "${tag}" is invalid`);
        return false;
      }
    }

    const nextValues = [...currentValues, tag];
    updateValues(nextValues);
    setInputText("");
    setLiveAnnouncement(`Added tag "${tag}"`);
    return true;
  };

  // Helper thêm nhiều tags (khi paste)
  const addMultipleTags = (rawTags: string[]) => {
    if (disabled || readOnly || isLoading) return;
    const nextValues = [...currentValues];
    const existingTagsSet = new Set(currentValues);
    let addedCount = 0;

    for (const raw of rawTags) {
      let tag = trimValues ? raw.trim() : raw;
      if (!tag) continue;

      if (maxTagLength && maxTagLength > 0 && tag.length > maxTagLength) {
        tag = tag.slice(0, maxTagLength);
      }

      if (maxTags !== undefined && nextValues.length >= maxTags) {
        onMaxTagsReached?.(tag);
        break;
      }

      if (!allowDuplicates && existingTagsSet.has(tag)) {
        onDuplicate?.(tag);
        continue;
      }

      if (validateTag) {
        const validationResult = validateTag(tag);
        if (validationResult === false || typeof validationResult === "string") {
          onValidateError?.(tag, typeof validationResult === "string" ? validationResult : undefined);
          continue;
        }
      }

      nextValues.push(tag);
      existingTagsSet.add(tag);
      addedCount++;
    }

    updateValues(nextValues);
    setInputText("");
    if (addedCount > 0) {
      setLiveAnnouncement(`Added ${addedCount} tags`);
    }
  };

  // Xóa 1 tag theo index
  const removeTag = (indexToRemove: number) => {
    if (disabled || readOnly || isLoading) return;
    const removedItem = currentValues[indexToRemove];
    const nextValues = currentValues.filter((_, i) => i !== indexToRemove);
    updateValues(nextValues);
    if (removedItem) {
      setLiveAnnouncement(`Removed tag "${removedItem}"`);
    }
  };

  // Xóa toàn bộ tags & text
  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (disabled || readOnly || isLoading) return;
    updateValues([]);
    setInputText("");
    setLiveAnnouncement("Removed all tags");
    onClear?.();
    internalRef.current?.focus();
  };

  // Xử lý sự kiện bàn phím
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) return;

    const isDelimiter =
      delimiters.includes(e.key) ||
      (delimiters.includes("Enter") && e.key === "Enter") ||
      (delimiters.includes("Comma") && (e.key === "," || e.key === "Comma")) ||
      (delimiters.includes("Tab") && e.key === "Tab") ||
      (delimiters.includes("Space") && (e.key === " " || e.key === "Space"));

    if (isDelimiter) {
      if (currentInputValue) {
        e.preventDefault();
        addTag(currentInputValue);
      }
    } else if (e.key === "Backspace" && currentInputValue === "" && currentValues.length > 0) {
      e.preventDefault();
      removeTag(currentValues.length - 1);
    }
  };

  // Xử lý Paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) return;
    if (addOnPaste) {
      const pasteText = e.clipboardData.getData("text");
      if (pasteText) {
        const parts = splitTagsFromText(pasteText, pasteSplitRegex, trimValues);
        if (parts.length > 1 || pasteSplitRegex.test(pasteText)) {
          e.preventDefault();
          addMultipleTags(parts);
        }
      }
    }
  };

  const handleBlur = () => {
    if (addOnBlur && currentInputValue.trim()) {
      addTag(currentInputValue);
    }
  };

  const hasValue = currentValues.length > 0 || currentInputValue.length > 0;
  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  const currentSize = getSafeConfig(size, multiInputSizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const resolvedBadgeRadius = tagRadius || getSafeConfig(radius, badgeRadiusMap, "md");
  const resolvedBadgeSize = tagSize || currentSize.badgeSize || "sm";
  const resolvedTagColor = tagColor || color;
  const resolvedTagVariant = tagVariant || variant;

  const variantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, variantColorConfig, "outline"), "primary");

  const isFloating = labelPlacement === "floating";

  const renderIconWrapper = (iconNode: ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 text-neutral-400 leading-none select-none ${currentSize.icon}`}
      aria-hidden="true"
    >
      {iconNode}
    </span>
  );

  // Label Element
  const renderLabel = () => (
    <FieldLabel
      id={labelId}
      htmlFor={inputId}
      label={label}
      isRequired={isRequired}
      isFloating={isFloating}
      size={size}
      color={activeColor}
      hasError={hasError}
      className={labelClassName}
    />
  );

  // Xử lý maxTagCount
  const visibleTags = maxTagCount && maxTagCount > 0 ? currentValues.slice(0, maxTagCount) : currentValues;
  const hiddenTagCount = maxTagCount && maxTagCount > 0 ? Math.max(0, currentValues.length - maxTagCount) : 0;

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-text";

  const containerClasses = [
    "group/input relative flex items-center transition-all duration-150 ease-in-out border-2",
    currentSize.wrapper,
    roundedClass,
    variantStyles,
    disabledStyles,
    isFullWidth ? "w-full" : "w-auto min-w-[200px]",
    inputWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const isHorizontal = labelPlacement === "left";

  const canAddMore = maxTags === undefined || currentValues.length < maxTags;
  const showAddBtn = showAddButton && !disabled && !readOnly;

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className={`group/field flex ${
        isHorizontal ? "flex-row items-center gap-3" : "flex-col"
      } ${isFullWidth ? "w-full" : "inline-flex"} ${wrapperClassName}`}
    >
      {/* Screen Reader Live Region */}
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </span>

      {!isFloating && renderLabel()}

      <div className={`flex flex-col ${isFullWidth ? "w-full" : ""}`}>
        <div className="flex items-stretch">
          {leftAddon && (
            <div
              className={`inline-flex items-center px-3 text-neutral-600 bg-neutral-100 border border-r-0 border-neutral-300 text-sm font-medium ${
                roundedClass ? `${roundedClass} rounded-r-none` : ""
              }`}
            >
              {leftAddon}
            </div>
          )}

          <div
            className={`${containerClasses} ${
              leftAddon ? "rounded-l-none!" : ""
            } ${rightAddon ? "rounded-r-none!" : ""}`}
          >
            {isFloating && renderLabel()}

            {leftIcon && (
              <div className="flex items-center justify-center pl-1 pr-1.5 shrink-0">{renderIconWrapper(leftIcon)}</div>
            )}

            {/* Container for tags list and native input */}
            <div className={`flex flex-wrap items-center flex-1 min-w-0 ${currentSize.gap}`}>
              {(() => {
                const tagOccurrenceMap = new Map<string, number>();
                return visibleTags.map((tagVal, index) => {
                  const count = (tagOccurrenceMap.get(tagVal) ?? 0) + 1;
                  tagOccurrenceMap.set(tagVal, count);
                  const tagKey = `${tagVal}_${count}`;

                  if (renderTag) {
                    return (
                      <span key={tagKey} className="inline-flex shrink-0">
                        {renderTag({
                          value: tagVal,
                          index,
                          onRemove: () => removeTag(index),
                          disabled,
                          readOnly,
                        })}
                      </span>
                    );
                  }

                  return (
                    <span key={tagKey} className="inline-flex shrink-0">
                      <Badge
                        size={resolvedBadgeSize}
                        variant={resolvedTagVariant}
                        color={resolvedTagColor}
                        radius={resolvedBadgeRadius}
                        deleteAriaLabel={`Remove tag ${tagVal}`}
                        onDelete={!disabled && !readOnly ? () => removeTag(index) : undefined}
                        className={`shrink-0 max-w-full truncate select-none ${tagClassName}`}
                      >
                        {tagVal}
                      </Badge>
                    </span>
                  );
                });
              })()}

              {hiddenTagCount > 0 && (
                <span className="inline-flex shrink-0">
                  <Badge
                    size={resolvedBadgeSize}
                    variant="filled"
                    color="neutral"
                    radius={resolvedBadgeRadius}
                    className="shrink-0 font-medium select-none"
                  >
                    +{hiddenTagCount}
                  </Badge>
                </span>
              )}

              {canAddMore ? (
                <input
                  ref={mergedRef}
                  id={inputId}
                  type="text"
                  value={currentInputValue}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  onBlur={handleBlur}
                  disabled={disabled || isLoading}
                  readOnly={readOnly}
                  autoFocus={autoFocus}
                  aria-invalid={hasError}
                  aria-required={isRequired}
                  aria-describedby={errorMessage || helperText ? errorHelperId : undefined}
                  aria-errormessage={errorMessage ? errorHelperId : undefined}
                  aria-busy={isLoading}
                  aria-disabled={disabled || isLoading}
                  aria-autocomplete="none"
                  placeholder={currentValues.length === 0 ? placeholder : ""}
                  className={`flex-1 bg-transparent outline-none border-none text-neutral-900 placeholder:text-neutral-400 disabled:cursor-not-allowed ${currentSize.input} ${className}`}
                />
              ) : null}
            </div>

            {/* Add (+) button at the end of input */}
            {showAddBtn && (
              <div className="flex items-center justify-center pl-1.5 shrink-0">
                {renderAddButton ? (
                  renderAddButton({
                    onAdd: () => addTag(currentInputValue),
                    disabled: !currentInputValue.trim() || !canAddMore,
                  })
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentInputValue.trim() && canAddMore) {
                        addTag(currentInputValue);
                      } else {
                        internalRef.current?.focus();
                      }
                    }}
                    disabled={!currentInputValue.trim() || !canAddMore}
                    aria-label="Thêm thẻ"
                    className={`inline-flex items-center justify-center p-1 rounded hover:bg-neutral-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer text-neutral-600 hover:text-neutral-900 ${addButtonClassName}`}
                  >
                    <PlusIcon className={currentSize.icon} />
                  </button>
                )}
              </div>
            )}

            {isLoading && showSpinner && (
              <div className="flex items-center justify-center pl-1.5 shrink-0" role="status" aria-label="Đang tải">
                {renderIconWrapper(<Spinner />)}
              </div>
            )}

            {!isLoading && isClearable && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Xóa tất cả các thẻ"
                tabIndex={hasValue ? 0 : -1}
                aria-hidden={!hasValue}
                className={`inline-flex items-center justify-center pl-1.5 shrink-0 text-neutral-400 hover:text-neutral-600 active:scale-95 transition-opacity duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current rounded-full ${currentSize.icon} ${
                  hasValue ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <CloseIcon className="size-full" />
              </button>
            )}

            {!isLoading && rightIcon && (
              <div className="flex items-center justify-center pl-1.5 shrink-0">{renderIconWrapper(rightIcon)}</div>
            )}
          </div>

          {rightAddon && (
            <div
              className={`inline-flex items-center px-3 text-neutral-600 bg-neutral-100 border border-l-0 border-neutral-300 text-sm font-medium ${
                roundedClass ? `${roundedClass} rounded-l-none` : ""
              }`}
            >
              {rightAddon}
            </div>
          )}
        </div>

        <HelperErrorText
          id={errorHelperId}
          helperText={helperText}
          errorMessage={errorMessage}
          sizeClassName={currentSize.helper}
          className={helperClassName}
        />

        {name && (() => {
          const hiddenOccurrenceMap = new Map<string, number>();
          return (
            <>
              {currentValues.map((tagVal) => {
                const count = (hiddenOccurrenceMap.get(tagVal) ?? 0) + 1;
                hiddenOccurrenceMap.set(tagVal, count);
                const tagKey = `${tagVal}_${count}`;
                return (
                  <input
                    key={`hidden_${tagKey}`}
                    type="hidden"
                    name={`${name}[]`}
                    value={tagVal}
                    disabled={disabled || isLoading}
                  />
                );
              })}
              {currentValues.length === 0 && (
                <input
                  type="hidden"
                  name={name}
                  value=""
                  disabled={disabled || isLoading}
                />
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
