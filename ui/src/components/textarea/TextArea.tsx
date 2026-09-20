import { useId, useState, useRef, ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMergeRefs } from "@floating-ui/react";
import { TextAreaProps } from "./types";
import { sizeConfig, radiusConfig, resizeConfig, variantColorConfig } from "./constants";
import CloseIcon from "@/components/icons/CloseIcon";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { getSafeConfig } from "@/utils/function";

export default function TextArea({
  size,
  variant,
  color,
  radius,
  label,
  labelPlacement = "floating",
  config,
  helperText,
  errorMessage,
  onClear,
  minRows = 3,
  maxRows,
  onHeightChange,
  cacheMeasurements,
  resize = "none",
  wrapperClassName = "",
  textareaWrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  countClassName = "",
  id,
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  className = "",
  placeholder,
  maxLength,
  ref,
  style,
  ...props
}: TextAreaProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = false,
    showCount = false,
    isFullWidth = true,
    autoResize = true,
  } = config ?? {};

  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorHelperId = `${textareaId}-error-helper`;

  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const mergedRef = useMergeRefs([internalRef, ref]);

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string | number | readonly string[] | undefined>(
    defaultValue ?? ""
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let nextValue = e.target.value;
    if (maxLength !== undefined && nextValue.length > maxLength) {
      nextValue = nextValue.slice(0, maxLength);
      e.target.value = nextValue;
    }
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue("");
    }
    if (internalRef.current) {
      internalRef.current.value = "";
    }
    if (onChange && internalRef.current) {
      const syntheticEvent = {
        target: internalRef.current,
        currentTarget: internalRef.current,
      } as ChangeEvent<HTMLTextAreaElement>;
      onChange(syntheticEvent);
    }
    onClear?.();
  };

  const effectiveValue = isControlled ? (value ?? "") : (uncontrolledValue ?? "");
  const currentLength = effectiveValue !== undefined && effectiveValue !== null ? String(effectiveValue).length : 0;
  const hasValue = currentLength > 0;

  // Visual error state updates immediately
  const isInvalidState = Boolean(isInvalid || errorMessage);
  const activeColor = isInvalidState ? "error" : color;

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const resizeClass = autoResize ? "resize-none" : getSafeConfig(resize, resizeConfig, "none");

  const variantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, variantColorConfig, "outline"), "primary");

  const isFloating = labelPlacement === "floating";
  const hasFloatingLabel = isFloating && Boolean(label);

  // Label Element
  const renderLabel = () => (
    <FieldLabel
      htmlFor={textareaId}
      label={label}
      isRequired={isRequired}
      isFloating={isFloating}
      size={size}
      color={activeColor}
      hasError={isInvalidState}
      className={labelClassName}
    />
  );

  const containerClasses = [
    "group/textarea relative flex flex-col transition-all duration-150 ease-in-out border",
    roundedClass,
    variantStyles,
    disabled ? "opacity-50" : "",
    isFullWidth ? "w-full" : "w-auto",
    textareaWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const hasTopRightAction = isClearable || (isLoading && showSpinner);

  const textareaClasses = [
    "w-full bg-transparent outline-none border-none text-neutral-900 placeholder:text-neutral-400 disabled:cursor-not-allowed ui-scrollbar",
    currentSize.textarea,
    hasTopRightAction ? "pr-8" : "",
    showCount ? "pb-6" : "",
    resizeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isHorizontal = labelPlacement === "left";

  const commonProps = {
    id: textareaId,
    ...(isControlled ? { value: value ?? "" } : { defaultValue }),
    onChange: handleChange,
    disabled: disabled || isLoading,
    readOnly,
    maxLength,
    "aria-invalid": isInvalidState,
    "aria-required": isRequired,
    "aria-describedby": errorMessage || helperText ? errorHelperId : undefined,
    "aria-errormessage": errorMessage ? errorHelperId : undefined,
    "aria-busy": isLoading,
    "aria-disabled": disabled || isLoading,
    placeholder,
    className: textareaClasses,
    style,
    ...props,
  };

  return (
    <div
      className={`group/field relative flex ${
        isHorizontal ? "flex-row items-start gap-3" : "flex-col"
      } ${hasFloatingLabel ? "pt-2" : ""} ${isFullWidth ? "w-full" : "inline-flex"} ${wrapperClassName}`}
    >
      {!isFloating && renderLabel()}

      <div className={`flex flex-col ${isFullWidth ? "w-full" : ""}`}>
        <div className={containerClasses}>
          {isFloating && renderLabel()}

          {autoResize ? (
            <TextareaAutosize
              ref={mergedRef}
              minRows={minRows}
              maxRows={maxRows}
              onHeightChange={onHeightChange}
              cacheMeasurements={cacheMeasurements}
              {...commonProps}
            />
          ) : (
            <textarea ref={mergedRef} rows={minRows} {...commonProps} />
          )}

          {/* Top-Right Loading Spinner */}
          {isLoading && showSpinner && (
            <div className="absolute top-2.5 right-2.5 text-neutral-400 size-4 select-none pointer-events-none">
              <Spinner className="size-full animate-spin" />
            </div>
          )}

          {/* Top-Right Clear Button */}
          {!isLoading && isClearable && !disabled && !readOnly && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Xóa nội dung"
              tabIndex={hasValue ? 0 : -1}
              aria-hidden={!hasValue}
              className={`absolute top-2.5 right-2.5 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-600 active:scale-95 transition-opacity duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current rounded-full size-4 ${
                hasValue ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
              }`}
            >
              <CloseIcon className="size-full" />
            </button>
          )}

          {/* Character Counter */}
          {showCount && (
            <div
              className={`absolute bottom-2 right-2.5 text-[11px] font-mono select-none pointer-events-none z-10 text-neutral-400 ${countClassName}`}
            >
              {currentLength}
              {maxLength !== undefined && `/${maxLength}`}
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
      </div>
    </div>
  );
}
