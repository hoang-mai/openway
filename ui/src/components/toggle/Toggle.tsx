import { useId, useState, useRef, ChangeEvent, MouseEvent } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { ToggleProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import { getSafeConfig } from "@/utils/function";

export default function Toggle({
  size,
  variant,
  color,
  radius,
  thumbRadius,
  config,
  label,
  helperText,
  errorMessage,
  labelPlacement = "right",
  thumbIcon,
  startContent,
  endContent,
  wrapperClassName = "",
  trackClassName = "",
  thumbClassName = "",
  labelClassName = "",
  helperClassName = "",
  className = "",
  checked: checkedProp,
  defaultChecked,
  disabled = false,
  readOnly = false,
  onChange,
  onClick,
  value,
  id,
  name,
  ref,
  ...props
}: ToggleProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
  } = config ?? {};

  const generatedId = useId();
  const toggleId = id || generatedId;
  const errorHelperId = `${toggleId}-error-helper`;

  const internalRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = useMergeRefs([internalRef, ref]);

  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? Boolean(checkedProp) : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) return;
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handleWrapperClick = (e: MouseEvent<HTMLLabelElement>) => {
    if (disabled || readOnly || isLoading) {
      e.preventDefault();
    }
  };

  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const trackRadiusClass = getSafeConfig(radius, radiusConfig, "full");
  const thumbRadiusClass = getSafeConfig(thumbRadius, radiusConfig, "full");

  const variantStyles =
    variant === "other"
      ? undefined
      : getSafeConfig(activeColor, getSafeConfig(variant, variantColorConfig, "filled"), "primary");

  const trackStyles = variantStyles ? (isChecked ? variantStyles.checked.track : variantStyles.unchecked.track) : "";
  const thumbStyles = variantStyles ? (isChecked ? variantStyles.checked.thumb : variantStyles.unchecked.thumb) : "";

  const trackClasses = [
    "relative inline-flex items-center shrink-0 border box-border transition-colors duration-200 ease-in-out cursor-pointer select-none",
    currentSize.track,
    trackRadiusClass,
    trackStyles,
    disabled ? "opacity-50" : "",
    trackClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const thumbClasses = [
    "pointer-events-none inline-flex items-center justify-center transition-transform duration-200 ease-in-out select-none",
    currentSize.thumb,
    thumbRadiusClass,
    thumbStyles,
    isChecked ? currentSize.translate : "translate-x-0",
    thumbClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "select-none font-medium text-neutral-900 dark:text-neutral-100 transition-colors",
    currentSize.label,
    disabled ? "opacity-50" : "",
    labelClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const isHorizontalReverse = labelPlacement === "left";

  const wrapperClasses = [
    "group inline-flex items-center relative",
    isHorizontalReverse ? "flex-row-reverse justify-between" : "flex-row",
    currentSize.gap,
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    wrapperClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderThumbIcon = () => {
    if (isLoading && showSpinner) {
      return (
        <span className={`inline-flex items-center justify-center ${currentSize.icon}`} aria-hidden="true">
          <Spinner className="size-full animate-spin" />
        </span>
      );
    }

    if (typeof thumbIcon === "function") {
      return thumbIcon({
        isChecked,
        className: currentSize.icon,
      });
    }

    if (thumbIcon) {
      return (
        <span className={`inline-flex items-center justify-center ${currentSize.icon}`} aria-hidden="true">
          {thumbIcon}
        </span>
      );
    }

    return null;
  };

  // Label Element
  const renderLabel = () => {
    if (!label) return null;

    return (
      <span className={labelClasses}>
        {label}
        {isRequired && (
          <span className="text-error-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="inline-flex flex-col">
      <label className={wrapperClasses} onClick={handleWrapperClick}>
        {/* Hidden native input for A11y & Form Submission */}
        <input
          ref={mergedRef}
          type="checkbox"
          role="switch"
          id={toggleId}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          onClick={handleClick}
          disabled={disabled || isLoading}
          readOnly={readOnly}
          required={isRequired}
          aria-checked={isChecked}
          aria-invalid={hasError}
          aria-required={isRequired}
          aria-describedby={errorMessage || helperText ? errorHelperId : undefined}
          aria-errormessage={errorMessage ? errorHelperId : undefined}
          aria-busy={isLoading}
          aria-disabled={disabled || isLoading}
          className="sr-only peer"
          {...props}
        />

        {/* Visual Track */}
        <span className={trackClasses} aria-hidden="true">
          {/* Start Content (Left side, typically visible when checked) */}
          {startContent && (
            <span
              className={`absolute left-1.5 inline-flex items-center justify-center select-none font-medium transition-opacity duration-200 ${
                currentSize.content
              } ${isChecked ? "opacity-100" : "opacity-0"}`}
            >
              {startContent}
            </span>
          )}

          {/* Thumb */}
          <span className={thumbClasses}>{renderThumbIcon()}</span>

          {/* End Content (Right side, typically visible when unchecked) */}
          {endContent && (
            <span
              className={`absolute right-1.5 inline-flex items-center justify-center select-none font-medium transition-opacity duration-200 ${
                currentSize.content
              } ${!isChecked ? "opacity-100" : "opacity-0"}`}
            >
              {endContent}
            </span>
          )}
        </span>

        {/* Label */}
        {renderLabel()}
      </label>

      {/* Helper / Error Text */}
      <HelperErrorText
        id={errorHelperId}
        helperText={helperText}
        errorMessage={errorMessage}
        sizeClassName={currentSize.helper}
        className={helperClassName}
      />
    </div>
  );
}
