import {
  useId,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import { OtpInputProps, OtpInputRef } from "./types";
import { otpSlotSizeConfig, sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import Spinner from "@/components/icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import { getSafeConfig } from "@/utils/function";
import { isValidOtpChar, sanitizeOtpString } from "./utils";

export default function OtpInput({
  ref,
  config,
  id,
  name,
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  type = "numeric",
  mask = false,
  size = "md",
  variant = "outline",
  color = "primary",
  radius,
  autoFocus = false,
  disabled = false,
  readOnly = false,
  groupSize,
  separator = "-",
  ariaLabel = "One-time password",
  getSlotAriaLabel,
  allowOneTimeCode = true,
  label,
  labelPlacement = "top",
  helperText,
  errorMessage,
  className = "",
  slotClassName = "",
  wrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
}: OtpInputProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
  } = config ?? {};

  const generatedId = useId();
  const baseId = id || generatedId;
  const inputSlotId = `${baseId}-slot-0`;
  const errorHelperId = `${baseId}-error-helper`;

  // Internal state for uncontrolled mode
  const [internalValues, setInternalValues] = useState<string[]>(() => {
    const initial = (value !== undefined ? value : defaultValue).split("");
    return Array.from({ length }, (_, i) => initial[i] || "");
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isControlled = value !== undefined;
  const currentValues = isControlled
    ? Array.from({ length }, (_, i) => (value && value[i] !== undefined ? value[i] : ""))
    : internalValues;

  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && !disabled && !readOnly) {
      const firstEmptyIndex = currentValues.findIndex((val) => !val);
      const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
      inputRefs.current[targetIndex]?.focus();
    }
  }, [autoFocus, currentValues, disabled, readOnly]);

  // Imperative handle for parent ref
  useImperativeHandle(
    ref,
    (): OtpInputRef => ({
      getValue: () => currentValues.join(""),
      clear: () => {
        const empty = Array(length).fill("");
        if (!isControlled) {
          setInternalValues(empty);
        }
        onChange?.("");
        if (!disabled && !readOnly) {
          inputRefs.current[0]?.focus();
        }
      },
      focus: (index = 0) => {
        const targetIndex = Math.max(0, Math.min(index, length - 1));
        inputRefs.current[targetIndex]?.focus();
      },
    }),
    [currentValues, length, isControlled, onChange, disabled, readOnly]
  );

  const triggerChange = (newValues: string[]) => {
    if (!isControlled) {
      setInternalValues(newValues);
    }
    const combined = newValues.join("");
    onChange?.(combined);

    if (newValues.every((val) => val.length > 0) && newValues.length === length) {
      onComplete?.(combined);
    }
  };

  const fillOtpSlots = (text: string, index: number) => {
    const sanitized = sanitizeOtpString(text, type);
    if (!sanitized) return;

    const nextValues = [...currentValues];
    const startIndex = sanitized.length >= length ? 0 : index;
    const chars = sanitized.slice(0, length - startIndex).split("");

    chars.forEach((char, i) => {
      if (startIndex + i < length) {
        nextValues[startIndex + i] = char;
      }
    });

    triggerChange(nextValues);

    const nextFocusIndex = Math.min(startIndex + chars.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleSlotChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly || isLoading) return;
    const inputValue = e.target.value;

    if (!inputValue) {
      const nextValues = [...currentValues];
      nextValues[index] = "";
      triggerChange(nextValues);
      return;
    }

    if (inputValue.length > 1) {
      fillOtpSlots(inputValue, index);
      return;
    }

    const lastChar = inputValue.slice(-1);
    if (isValidOtpChar(lastChar, type)) {
      const nextValues = [...currentValues];
      nextValues[index] = lastChar;
      triggerChange(nextValues);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly || isLoading) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      const nextValues = [...currentValues];
      if (currentValues[index]) {
        nextValues[index] = "";
        triggerChange(nextValues);
      } else if (index > 0) {
        nextValues[index - 1] = "";
        triggerChange(nextValues);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      const nextValues = [...currentValues];
      nextValues[index] = "";
      triggerChange(nextValues);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      const combined = currentValues.join("");
      if (combined) {
        navigator.clipboard?.writeText(combined);
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x") {
      e.preventDefault();
      const combined = currentValues.join("");
      if (combined) {
        navigator.clipboard?.writeText(combined);
      }
      const empty = Array(length).fill("");
      triggerChange(empty);
      inputRefs.current[0]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly || isLoading) return;
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    fillOtpSlots(pastedData, index);
  };

  const currentSize = getSafeConfig(size, otpSlotSizeConfig, "md");
  const sizeStyles = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const variantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, variantColorConfig, "outline"), "primary");

  const disabledStyles = disabled ? "opacity-50" : "";

  const renderLabel = () => {
    if (!label) return null;
    return (
      <label
        htmlFor={inputSlotId}
        className={`block font-medium text-neutral-700 select-none ${currentSize.label} ${labelClassName}`}
      >
        {label}
        {isRequired && <span className="text-error-500 ml-0.5">*</span>}
      </label>
    );
  };

  const isHorizontal = labelPlacement === "left";

  return (
    <div className={`group/otp flex ${isHorizontal ? "flex-row items-start gap-3" : "flex-col"} ${wrapperClassName}`}>
      {renderLabel()}

      <div className="flex flex-col">
        <div
          role="group"
          aria-label={ariaLabel}
          aria-describedby={errorMessage || helperText ? errorHelperId : undefined}
          className={`inline-flex items-center ${currentSize.gap} ${className}`}
        >
          {Array.from({ length }).map((_, index) => {
            const isMasked = Boolean(mask || type === "password");
            const slotAriaLabel = getSlotAriaLabel
              ? getSlotAriaLabel(index, length)
              : `Ký tự ${index + 1} trên ${length}`;

            const shouldRenderSeparator =
              Boolean(groupSize && groupSize > 0) && (index + 1) % (groupSize || 1) === 0 && index < length - 1;

            return (
              <div key={`${baseId}-slot-${index}`} className="inline-flex items-center gap-1.5">
                <input
                  id={`${baseId}-slot-${index}`}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type={isMasked ? "password" : "text"}
                  inputMode={type === "numeric" ? "numeric" : "text"}
                  pattern={type === "numeric" ? "[0-9]*" : undefined}
                  maxLength={1}
                  value={currentValues[index] || ""}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => handleSlotChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  disabled={disabled || isLoading}
                  readOnly={readOnly}
                  aria-label={slotAriaLabel}
                  aria-invalid={hasError}
                  aria-required={isRequired}
                  aria-busy={isLoading}
                  aria-disabled={disabled || isLoading}
                  autoComplete={allowOneTimeCode ? "one-time-code" : "off"}
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  data-1p-ignore="true"
                  data-lpignore="true"
                  data-form-type="other"
                  className={`border text-center p-0 outline-none transition-all duration-150 ease-in-out text-neutral-900 ${
                    currentSize.slot
                  } ${currentSize.text} ${roundedClass} ${variantStyles} ${disabledStyles} ${slotClassName}`}
                />
                {shouldRenderSeparator && (
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center text-neutral-400 select-none font-bold shrink-0"
                  >
                    {separator}
                  </span>
                )}
              </div>
            );
          })}

          {isLoading && showSpinner && (
            <div
              role="status"
              aria-label="Đang tải"
              className="inline-flex items-center justify-center pl-1.5 shrink-0 text-neutral-400"
            >
              <Spinner className={`animate-spin ${sizeStyles.icon}`} />
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

        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValues.join("")}
            disabled={disabled || isLoading}
          />
        )}
      </div>
    </div>
  );
}
