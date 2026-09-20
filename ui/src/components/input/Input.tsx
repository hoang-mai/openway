import { useId, useState, useRef, ReactNode } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { InputProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import CloseIcon from "@/components/icons/CloseIcon";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { getSafeConfig } from "@/utils/function";

export default function Input({
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
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  className = "",
  type = "text",
  placeholder,
  ref,
  ...props
}: InputProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = false,
    isFullWidth = true,
  } = config ?? {};

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;

  const internalRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = useMergeRefs([internalRef, ref]);

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
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
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    onClear?.();
  };

  const hasValue = isControlled
    ? value !== undefined && value !== null && Boolean(String(value).length > 0)
    : Boolean(uncontrolledValue && String(uncontrolledValue).length > 0);
  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const variantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, variantColorConfig, "outline"), "primary");

  const renderIconWrapper = (iconNode: ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 text-neutral-400 leading-none select-none ${currentSize.icon}`}
      aria-hidden="true"
    >
      {iconNode}
    </span>
  );

  const isFloating = labelPlacement === "floating";
  const hasFloatingLabel = isFloating && Boolean(label);

  // Label Element
  const renderLabel = () => (
    <FieldLabel
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

  const containerClasses = [
    "group/input relative flex items-center transition-all duration-150 ease-in-out border",
    currentSize.wrapper,
    roundedClass,
    variantStyles,
    disabled ? "opacity-50" : "",
    isFullWidth ? "w-full" : "w-auto",
    inputWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "w-full h-full bg-transparent outline-none border-none text-neutral-900 placeholder:text-neutral-400 disabled:cursor-not-allowed",
    currentSize.input,
    leftIcon ? "pl-1.5" : "",
    rightIcon || isClearable || isLoading ? "pr-1.5" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isHorizontal = labelPlacement === "left";

  return (
    <div
      className={`group/field relative flex ${
        isHorizontal ? "flex-row items-center gap-3" : "flex-col"
      } ${hasFloatingLabel ? "pt-2" : ""} ${isFullWidth ? "w-full" : "inline-flex"} ${wrapperClassName}`}
    >
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
              <div className="flex items-center justify-center pl-3 shrink-0">{renderIconWrapper(leftIcon)}</div>
            )}

            <input
              ref={mergedRef}
              id={inputId}
              type={type}
              {...(isControlled ? { value: value ?? "" } : { defaultValue })}
              onChange={handleChange}
              disabled={disabled || isLoading}
              readOnly={readOnly}
              aria-invalid={hasError}
              aria-required={isRequired}
              aria-describedby={errorMessage || helperText ? errorHelperId : undefined}
              aria-errormessage={errorMessage ? errorHelperId : undefined}
              aria-busy={isLoading}
              aria-disabled={disabled || isLoading}
              placeholder={placeholder}
              className={inputClasses}
              {...props}
            />

            {isLoading && showSpinner && (
              <div className="flex items-center justify-center pr-3 shrink-0">{renderIconWrapper(<Spinner />)}</div>
            )}

            {!isLoading && isClearable && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input"
                tabIndex={hasValue ? 0 : -1}
                aria-hidden={!hasValue}
                className={`inline-flex items-center justify-center mr-2 shrink-0 text-neutral-400 hover:text-neutral-600 active:scale-95 transition-opacity duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current rounded-full ${currentSize.icon} ${
                  hasValue ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <CloseIcon className="size-full" />
              </button>
            )}

            {!isLoading && rightIcon && (
              <div className="flex items-center justify-center pr-3 shrink-0">{renderIconWrapper(rightIcon)}</div>
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
      </div>
    </div>
  );
}
