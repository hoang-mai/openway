import React, { useId, useState } from "react";
import { CheckboxProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import CheckIcon from "@/components/icons/CheckIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";

export default function Checkbox({
  size = "md",
  variant = "filled",
  color = "primary",
  radius,
  config,
  label: labelProp,
  children,
  helperText,
  errorMessage,
  labelPlacement = "right",
  icon,
  indeterminateIcon,
  wrapperClassName = "",
  boxClassName = "",
  labelClassName = "",
  helperClassName = "",
  className = "",
  checked: checkedProp,
  defaultChecked,
  disabled = false,
  readOnly = false,
  onChange,
  value,
  id: idProp,
  name,
  ref,
  ...props
}: CheckboxProps) {
  const {
    isRequired = false,
    isInvalid: isInvalidFromConfig = false,
    isLoading = false,
    showSpinner = false,
    indeterminate = false,
  } = config ?? {};

  const label = labelProp || children;

  const generatedId = useId();
  const id = idProp || generatedId;
  const helperId = `${id}-helper`;

  const isInvalid = Boolean(isInvalidFromConfig ?? !!errorMessage);

  // Determine controlled vs uncontrolled state
  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isChecked = isControlled ? Boolean(checkedProp) : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) return;

    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const isCheckedOrIndeterminate = isChecked || indeterminate;

  const safeVariant = getSafeConfig(variant === "other" ? "filled" : variant, variantColorConfig, "filled");

  // Visual Box Color & Variant styling
  let boxVariantStyles: string;
  if (variant === "other") {
    boxVariantStyles = "";
  } else if (isCheckedOrIndeterminate) {
    boxVariantStyles = getSafeConfig(color, safeVariant, "primary");
  } else {
    // Unchecked base style with focus ring according to color
    boxVariantStyles =
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400 peer-focus-visible:border-primary-500";
  }

  // Error border overrides when invalid
  if (isInvalid) {
    boxVariantStyles = isCheckedOrIndeterminate
      ? getSafeConfig("error", safeVariant, "primary")
      : "bg-neutral-white border-error-500 hover:border-error-600 text-error-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400 peer-focus-visible:border-error-500";
  }

  const boxClasses = [
    "inline-flex items-center justify-center shrink-0 border transition-all duration-150 select-none",
    currentSize.box,
    roundedClass,
    boxVariantStyles,
    !disabled && !readOnly && !isLoading ? "active:scale-95" : "",
    boxClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "select-none font-medium text-neutral-900 transition-colors",
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
    disabled ? "opacity-50" : "cursor-pointer",
    wrapperClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderIcon = () => {
    if (isLoading && showSpinner) {
      return (
        <span
          className={`inline-flex items-center justify-center animate-in zoom-in-75 duration-100 ${currentSize.icon}`}
          aria-hidden="true"
        >
          <Spinner className="size-full animate-spin" />
        </span>
      );
    }
    if (indeterminate) {
      return (
        <span
          className={`inline-flex items-center justify-center animate-in zoom-in-75 duration-100 ${currentSize.icon}`}
          aria-hidden="true"
        >
          {indeterminateIcon || <MinusIcon className="size-full" />}
        </span>
      );
    }
    if (isChecked) {
      return (
        <span
          className={`inline-flex items-center justify-center animate-in zoom-in-75 duration-100 ${currentSize.icon}`}
          aria-hidden="true"
        >
          {icon || <CheckIcon className="size-full" />}
        </span>
      );
    }
    return null;
  };

  const hasContent = Boolean(label);

  const handleWrapperClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disabled || readOnly || isLoading) {
      e.preventDefault();
    }
  };

  return (
    <div className={`inline-flex flex-col ${className}`.trim()}>
      <label className={wrapperClasses} onClick={handleWrapperClick}>
        {/* Hidden native input for Accessibility and form handling */}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled || isLoading}
          readOnly={readOnly}
          required={isRequired}
          aria-checked={indeterminate ? "mixed" : isChecked}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          aria-busy={isLoading}
          aria-disabled={disabled || isLoading}
          aria-describedby={errorMessage || helperText ? helperId : undefined}
          onChange={handleChange}
          className="sr-only peer"
          {...props}
        />

        {/* Visual Box */}
        <span className={boxClasses} aria-hidden="true">
          {renderIcon()}
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
