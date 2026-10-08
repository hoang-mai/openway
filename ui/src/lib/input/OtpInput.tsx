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
import Spinner from "@/lib/icons/Spinner";
import HelperErrorText from "@/lib/common/HelperErrorText";
import { getSafeConfig } from "@/utils/function";
import { isValidOtpChar, sanitizeOtpString } from "./utils";
import { useLocale } from "@/locale";
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
  ariaLabel,
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
  "data-testid": dataTestId,
}: OtpInputProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
  } = config ?? {};

  const inputLocale = useLocale("input", {
    otpAriaLabel: ariaLabel,
  });

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

  const valuesRef = useRef<string[]>(currentValues);
  useEffect(() => {
    valuesRef.current = currentValues;
  }, [currentValues]);

  const hasAutoFocusedRef = useRef(false);
  const prevValueRef = useRef(value);

  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  // Auto focus on mount only (avoid hijacking focus when slots update)
  useEffect(() => {
    if (autoFocus && !disabled && !readOnly && !hasAutoFocusedRef.current) {
      hasAutoFocusedRef.current = true;
      const firstEmptyIndex = valuesRef.current.findIndex((val) => !val);
      const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
      const timer = setTimeout(() => {
        inputRefs.current[targetIndex]?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, disabled, readOnly]);

  // Focus slot 0 when value is cleared externally
  useEffect(() => {
    if (isControlled && prevValueRef.current && !value && !disabled && !readOnly) {
      inputRefs.current[0]?.focus();
    }
    prevValueRef.current = value;
  }, [value, isControlled, disabled, readOnly]);

  // Imperative handle for parent ref
  useImperativeHandle(
    ref,
    (): OtpInputRef => ({
      getValue: () => valuesRef.current.join(""),
      clear: () => {
        const empty = Array(length).fill("");
        valuesRef.current = empty;
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
    [length, isControlled, onChange, disabled, readOnly]
  );

  const triggerChange = (newValues: string[]) => {
    valuesRef.current = newValues;
    if (!isControlled) {
      setInternalValues(newValues);
    }
    const combined = newValues.join("");
    onChange?.(combined);

    if (newValues.every((val) => val.trim().length > 0) && newValues.length === length) {
      onComplete?.(combined);
    }
  };

  const fillOtpSlots = (text: string, index: number) => {
    const sanitized = sanitizeOtpString(text, type);
    if (!sanitized) return;

    const nextValues = [...valuesRef.current];
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
    inputRefs.current[nextFocusIndex]?.select();
  };

  const handleSlotChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly || isLoading) return;
    const inputValue = e.target.value;

    if (!inputValue) {
      const nextValues = [...valuesRef.current];
      nextValues[index] = "";
      triggerChange(nextValues);
      return;
    }

    // Khi nhận nhiều hơn 1 ký tự (người dùng gõ đè vào ô đã có số hoặc paste)
    if (inputValue.length > 1) {
      const prevChar = valuesRef.current[index] || "";
      const char0 = inputValue.charAt(0);
      const char1 = inputValue.charAt(1);

      // Nếu có đúng 2 ký tự và có chứa ký tự cũ: người dùng vừa gõ đè 1 ký tự mới vào ô đã có số
      if (inputValue.length === 2 && prevChar && (char0 === prevChar || char1 === prevChar)) {
        const newChar = char0 === prevChar ? char1 : char0;
        if (newChar && isValidOtpChar(newChar, type)) {
          const nextValues = [...valuesRef.current];
          nextValues[index] = newChar;
          triggerChange(nextValues);

          if (index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            inputRefs.current[index + 1]?.select();
          }
          return;
        }
      }

      // Ngược lại (paste 2+ ký tự hoặc paste đè): điền chuỗi vào các ô liên tiếp
      fillOtpSlots(inputValue, index);
      return;
    }

    const lastChar = inputValue.slice(-1);
    if (isValidOtpChar(lastChar, type)) {
      const nextValues = [...valuesRef.current];
      nextValues[index] = lastChar;
      triggerChange(nextValues);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    } else {
      // Phục hồi lại giá trị DOM nếu nhập ký tự không hợp lệ (qua IME/bàn phím ảo)
      e.target.value = valuesRef.current[index] || "";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly || isLoading) return;

    // Chặn tất cả ký tự đơn không hợp lệ và xử lý gõ đè trực tiếp
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault();
      if (isValidOtpChar(e.key, type)) {
        const nextValues = [...valuesRef.current];
        nextValues[index] = e.key;
        triggerChange(nextValues);

        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
          inputRefs.current[index + 1]?.select();
        }
      }
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const nextValues = [...valuesRef.current];
      if (valuesRef.current[index]) {
        nextValues[index] = "";
        triggerChange(nextValues);
      } else if (index > 0) {
        nextValues[index - 1] = "";
        triggerChange(nextValues);
        inputRefs.current[index - 1]?.focus();
        inputRefs.current[index - 1]?.select();
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      const nextValues = [...valuesRef.current];
      nextValues[index] = "";
      triggerChange(nextValues);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        inputRefs.current[index - 1]?.select();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      const combined = valuesRef.current.join("");
      if (combined) {
        navigator.clipboard?.writeText(combined);
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x") {
      e.preventDefault();
      const combined = valuesRef.current.join("");
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
    <div
      data-testid={dataTestId}
      className={`group/otp flex ${isHorizontal ? "flex-row items-start gap-3" : "flex-col"} ${wrapperClassName}`}
    >
      {renderLabel()}

      <div className="flex flex-col">
        <div
          role="group"
          aria-label={inputLocale.otpAriaLabel}
          aria-describedby={errorMessage || helperText ? errorHelperId : undefined}
          className={`inline-flex items-center ${currentSize.gap} ${className}`}
        >
          {Array.from({ length }).map((_, index) => {
            const isMasked = Boolean(mask || type === "password");
            const slotAriaLabel = getSlotAriaLabel
              ? getSlotAriaLabel(index, length)
              : inputLocale.otpCharAriaLabel(index + 1, length);

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
                  maxLength={length}
                  value={currentValues[index] || ""}
                  onFocus={(e) => e.target.select()}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
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
              aria-label={inputLocale.loading}
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
