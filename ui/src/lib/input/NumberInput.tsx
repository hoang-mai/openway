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
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Chuỗi text tạm thời người dùng đang gõ (giữ dấu - và dấu phân cách dở dang)
  const [typingText, setTypingText] = useState<string | null>(null);

  // Parse số của chuỗi đang gõ để so sánh với prop value
  const parsedTyping = typingText !== null
    ? (parseNumber(typingText, { thousandSeparator, decimalSeparator }) ?? null)
    : null;

  // Nếu prop value trùng khớp với giá trị đang gõ -> giữ nguyên typingText để không bị nuốt dấu.
  // Nếu prop value bị thay đổi từ bên ngoài (ví dụ nút Reset, fetch data) -> tự động format theo value mới.
  const displayValue = (typingText !== null && (!isControlled || parsedTyping === value))
    ? typingText
    : formatNumberString(isControlled ? value : internalValue, formatOptions);

  const handleClear = () => {
    setTypingText(null);
    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.(null, "");
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

    setTypingText(newFormattedValue);
    if (!isControlled) {
      setInternalValue(newFormattedValue);
    }

    // Parse ra số thuần (number | null)
    const parsed = parseNumber(newFormattedValue, { thousandSeparator, decimalSeparator });
    const parsedNum = parsed !== undefined ? parsed : null;

    inputElement.value = newFormattedValue;
    onChange?.(parsedNum, newFormattedValue);

    // Đặt lại vị trí con trỏ chuột
    requestAnimationFrame(() => {
      if (inputElement && inputElement.setSelectionRange) {
        inputElement.setSelectionRange(newCaretPos, newCaretPos);
      }
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTypingText(null);
    const currentValue = isControlled ? value : internalValue;
    if (min !== undefined && currentValue !== undefined && currentValue !== null && currentValue !== "") {
      const num = typeof currentValue === "number" ? currentValue : parseNumber(String(currentValue), { thousandSeparator, decimalSeparator });
      if (num !== undefined && num < min) {
        const clampedValue = formatNumberString(min, { ...formatOptions, clampMin: true });
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        onChange?.(min, clampedValue);
      }
    }
    onBlur?.(e);
  };

  return (
    <Input
      ref={ref}
      type="text"
      inputMode={maxDecimalDigits > 0 ? "decimal" : "numeric"}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onClear={handleClear}
      {...props}
    />
  );
}
