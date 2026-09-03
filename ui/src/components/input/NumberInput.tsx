import { ChangeEvent, FocusEvent, useState } from "react";
import { NumberInputProps } from "./types";
import Input from "./Input";
import { formatNumberString, calculateCaretPosition, parseNumber } from "./utils";

export default function NumberInput({
  value,
  defaultValue,
  min,
  max,
  thousandSeparator = ".",
  decimalSeparator = ",",
  maxDecimalDigits = 0,
  allowNegative,
  onChange,
  onClear,
  onBlur,
  ref,
  ...props
}: NumberInputProps) {
  const formatOptions = {
    max,
    min,
    thousandSeparator,
    decimalSeparator,
    maxDecimalDigits,
    allowNegative,
  };

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number | null | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const formattedDisplayValue = formatNumberString(currentValue, formatOptions);

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onClear?.();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target;
    const rawInputValue = inputElement.value;
    const oldCaretPos = inputElement.selectionStart || 0;

    // Format giá trị mới với ký tự phân cách và clamp max (không clamp min dương khi đang gõ)
    const newFormattedValue = formatNumberString(rawInputValue, formatOptions);

    // Tính toán lại vị trí con trỏ chuột không bị nhảy
    const newCaretPos = calculateCaretPosition(rawInputValue, newFormattedValue, oldCaretPos, { decimalSeparator });

    if (!isControlled) {
      setInternalValue(newFormattedValue);
    }

    // Gán giá trị vào target và trigger onChange
    inputElement.value = newFormattedValue;

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: inputElement,
        currentTarget: inputElement,
      } as ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }

    // Đặt lại vị trí con trỏ chuột
    requestAnimationFrame(() => {
      if (inputElement && inputElement.setSelectionRange) {
        inputElement.setSelectionRange(newCaretPos, newCaretPos);
      }
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (min !== undefined && currentValue !== undefined && currentValue !== null && currentValue !== "") {
      const num = parseNumber(String(currentValue), { thousandSeparator, decimalSeparator });
      if (num !== undefined && num < min) {
        const clampedValue = formatNumberString(min, { ...formatOptions, clampMin: true });
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        if (onChange) {
          e.target.value = clampedValue;
          const syntheticEvent = {
            ...e,
            target: e.target,
            currentTarget: e.target,
          } as unknown as ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    }
    onBlur?.(e);
  };

  return (
    <Input
      ref={ref}
      type="text"
      inputMode={maxDecimalDigits > 0 ? "decimal" : "numeric"}
      value={formattedDisplayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onClear={handleClear}
      {...props}
    />
  );
}
