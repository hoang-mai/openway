import React, { useId, useState } from "react";
import { RadioProps } from "./types";
import { sizeConfig, variantColorConfig } from "./constants";
import RadioDotIcon from "@/components/icons/RadioDotIcon";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import { getSafeConfig } from "@/utils/function";

export default function Radio({
  size = "md",
  variant = "filled",
  color = "primary",
  disabled = false,
  readOnly = false,
  config,
  labelPlacement = "right",
  label,
  helperText,
  errorMessage,
  dotIcon,
  wrapperClassName = "",
  boxClassName = "",
  labelClassName = "",
  helperClassName = "",
  className = "",
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  value,
  id: idProp,
  name,
  ref,
  ...props
}: RadioProps) {
  const {
    isRequired = false,
    isInvalid: isInvalidProp = false,
    isLoading = false,
  } = config ?? {};

  const generatedId = useId();
  const id = idProp || generatedId;
  const helperId = `${id}-helper`;

  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checkedProp : internalChecked;

  const isInvalid = Boolean(isInvalidProp || errorMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) return;

    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const currentSize = getSafeConfig(size, sizeConfig, "md");

  // Visual Box Color & Variant styling
  const safeVariantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(
          color,
          getSafeConfig(variant, variantColorConfig, "filled"),
          "primary"
        );

  const boxVariantStyles = isInvalid
    ? variantColorConfig[variant === "other" ? "filled" : variant]?.error || variantColorConfig.filled.error
    : isChecked
    ? safeVariantStyles
    : "bg-neutral-white border-neutral-300 hover:border-neutral-400 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400 peer-focus-visible:border-primary-500";

  const boxClasses = [
    "inline-flex items-center justify-center shrink-0 border rounded-full transition-all duration-150 select-none",
    currentSize.box,
    boxVariantStyles,
    !disabled && !readOnly && !isLoading ? "active:scale-95" : "",
    boxClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "select-none font-medium text-neutral-900 dark:text-neutral-100 transition-colors",
    currentSize.label,
    disabled ? "opacity-60" : "",
    labelClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = [
    "group inline-flex relative",
    labelPlacement === "left" ? "flex-row-reverse justify-between" : "flex-row",
    currentSize.gap,
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    wrapperClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderDot = () => {
    if (isLoading) {
      return (
        <span
          className={`inline-flex items-center justify-center animate-in zoom-in-75 duration-100 ${currentSize.dot}`}
          aria-hidden="true"
        >
          <Spinner className="size-full animate-spin" />
        </span>
      );
    }
    if (isChecked) {
      return (
        <span
          className={`inline-flex items-center justify-center animate-in zoom-in-75 duration-100 ${currentSize.dot}`}
          aria-hidden="true"
        >
          {dotIcon || <RadioDotIcon className="size-full" />}
        </span>
      );
    }
    return null;
  };

  const hasContent = Boolean(label);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disabled || readOnly || isLoading) {
      e.preventDefault();
    }
  };

  return (
    <div className="inline-flex flex-col">
      <label className={wrapperClasses} onClick={handleWrapperClick}>
        {/* Hidden native input for keyboard access and screen readers */}
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled || isLoading}
          readOnly={readOnly}
          required={isRequired}
          aria-busy={isLoading}
          aria-disabled={disabled || isLoading}
          aria-describedby={errorMessage || helperText ? helperId : undefined}
          onChange={handleChange}
          onClick={handleClick}
          className="sr-only peer"
          {...props}
        />

        {/* Visual Box */}
        <span className={boxClasses} aria-hidden="true">
          {renderDot()}
        </span>

        {/* Label */}
        {hasContent && (
          <span className={labelClasses}>
            {label}
            {isRequired && (
              <span className="text-error-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </span>
        )}
      </label>

      {/* Helper text / Error message animation */}
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
