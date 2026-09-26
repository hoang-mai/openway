import { OtpInputType } from "./types";

export interface NumberFormatOptions {
  /** Ký tự phân cách hàng nghìn. Mặc định "." (Việt Nam) */
  thousandSeparator?: string;

  /** Ký tự phân cách thập phân. Mặc định "," (Việt Nam) */
  decimalSeparator?: string;

  /** Số chữ số thập phân tối đa. Mặc định 0 (số nguyên). */
  maxDecimalDigits?: number;

  /** Cho phép nhập số âm hay không. Mặc định true (nếu min < 0 hoặc min chưa định nghĩa). */
  allowNegative?: boolean;

  /** Giá trị lớn nhất cho phép */
  max?: number;

  /** Giá trị nhỏ nhất cho phép */
  min?: number;

  /** Có bắt buộc clamp giá trị nhỏ hơn min về min hay không (mặc định false khi đang gõ) */
  clampMin?: boolean;
}

/**
 * Format chuỗi số với ký tự phân cách hàng nghìn, phân cách thập phân, số âm và giới hạn min/max.
 * Ví dụ VN: "-1000000,5" -> "-1.000.000,5"
 * Ví dụ US: "-1000000.5" -> "-1,000,000.5"
 */
export function formatNumberString(
  rawInput: string | number | undefined | null,
  options?: NumberFormatOptions
): string {
  if (rawInput === undefined || rawInput === null || rawInput === "") {
    return "";
  }

  const thousandSep = options?.thousandSeparator ?? ".";
  const decimalSep = options?.decimalSeparator ?? ",";
  const maxDecimals = options?.maxDecimalDigits ?? 0;
  const min = options?.min;
  const max = options?.max;
  const clampMin = options?.clampMin ?? false;

  // Tự động bật cho phép số âm nếu min chưa set hoặc min < 0
  const allowNeg = options?.allowNegative ?? (min === undefined || min < 0);

  // 1. Khi đầu vào là kiểu số JS thuần túy (typeof rawInput === "number")
  if (typeof rawInput === "number") {
    if (isNaN(rawInput)) return "";
    let num = rawInput;

    if (max !== undefined && num > max) num = max;
    if (min !== undefined && num < min && (clampMin || (num < 0 && min < 0))) num = min;

    const isNegative = allowNeg && num < 0;
    const absNum = Math.abs(num);

    if (maxDecimals > 0) {
      const numStr = absNum.toString();
      const parts = numStr.split(".");
      const intPart = parts[0] ?? "0";
      const decPart = parts[1] ? parts[1].slice(0, maxDecimals) : "";

      const formattedInt = parseInt(intPart, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
      const sign = isNegative ? "-" : "";

      return decPart ? `${sign}${formattedInt}${decimalSep}${decPart}` : `${sign}${formattedInt}`;
    } else {
      const intVal = Math.round(absNum);
      const formattedInt = intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
      const sign = isNegative ? "-" : "";
      return `${sign}${formattedInt}`;
    }
  }

  // 2. Khi đầu vào là chuỗi người dùng nhập (typeof rawInput === "string")
  const rawStr = String(rawInput).trim();
  if (!rawStr) return "";

  // Kiểm tra dấu âm
  const isNegative = allowNeg && rawStr.startsWith("-");

  // Nếu người dùng vừa gõ duy nhất dấu "-"
  if (isNegative && rawStr === "-") {
    return "-";
  }

  // Nếu có số thập phân (maxDecimals > 0) và chuỗi chứa đúng ký tự decimalSeparator
  if (maxDecimals > 0 && rawStr.includes(decimalSep)) {
    const parts = rawStr.split(decimalSep);
      const integerDigits = parts[0]?.replace(/\D/g, "") ?? "";
      const decimalDigits = parts.slice(1).join("").replace(/\D/g, "").slice(0, maxDecimals);

      // Chuyển sang số float để kiểm tra min/max
      if (integerDigits || decimalDigits) {
        let floatVal = parseFloat(`${integerDigits || "0"}.${decimalDigits || "0"}`);
        if (isNegative) floatVal = -floatVal;

        if (max !== undefined && !isNaN(floatVal) && floatVal > max) {
          return formatNumberString(max, { ...options, max: undefined, min: undefined });
        }
        if (min !== undefined && !isNaN(floatVal) && floatVal < min && (clampMin || (isNegative && min < 0))) {
          return formatNumberString(min, { ...options, max: undefined, min: undefined });
        }
      }

      // Format phần nguyên
      const formattedInteger = integerDigits
        ? parseInt(integerDigits, 10)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep)
        : "";

      const sign = isNegative ? "-" : "";

      // Nếu đang gõ dấu phẩy ở cuối (ví dụ "-1.000,")
      if (parts.length > 1 && parts[1] === "" && decimalDigits === "") {
        return `${sign}${formattedInteger || "0"}${decimalSep}`;
      }

      return decimalDigits.length > 0
        ? `${sign}${formattedInteger || "0"}${decimalSep}${decimalDigits}`
        : `${sign}${formattedInteger}`;
  }

  // Chế độ số nguyên thuần túy
  const digitsOnly = rawStr.replace(/\D/g, "");
  if (!digitsOnly) {
    return isNegative ? "-" : "";
  }

  let num = parseInt(digitsOnly, 10);
  if (isNaN(num)) return "";

  if (isNegative) {
    num = -num;
  }

  // Kiểm tra giới hạn max / min
  if (max !== undefined && num > max) {
    num = max;
  }
  if (min !== undefined && num < min && (clampMin || (isNegative && min < 0))) {
    num = min;
  }

  const sign = num < 0 ? "-" : "";
  const absFormatted = Math.abs(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);

  return `${sign}${absFormatted}`;
}

/**
 * Lấy chuỗi số thô (loại bỏ dấu phân cách hàng nghìn, giữ lại dấu âm).
 */
export function parseRawNumberString(
  formattedValue: string,
  options?: Pick<NumberFormatOptions, "thousandSeparator">
): string {
  const thousandSep = options?.thousandSeparator ?? ".";
  return formattedValue.split(thousandSep).join("");
}

/**
 * Chuyển chuỗi đã format thành số (number) trong JavaScript.
 */
export function parseNumber(
  formattedValue: string,
  options?: Pick<NumberFormatOptions, "thousandSeparator" | "decimalSeparator">
): number | undefined {
  if (!formattedValue) return undefined;

  const thousandSep = options?.thousandSeparator ?? ".";
  const decimalSep = options?.decimalSeparator ?? ",";

  let clean = formattedValue.split(thousandSep).join("");

  if (decimalSep !== ".") {
    clean = clean.split(decimalSep).join(".");
  }

  clean = clean.replace(/[^\d.-]/g, "");
  if (!clean || clean === "." || clean === "-") return undefined;

  const num = parseFloat(clean);
  return isNaN(num) ? undefined : num;
}

/**
 * Tính toán lại vị trí con trỏ chuột (caret) sau khi chèn/xóa dấu phân cách hoặc dấu âm.
 */
export function calculateCaretPosition(
  oldValue: string,
  newValue: string,
  oldCaretPosition: number,
  options?: Pick<NumberFormatOptions, "decimalSeparator">
): number {
  const decimalSep = options?.decimalSeparator ?? ",";

  // Đếm số lượng ký tự có nghĩa (chữ số + dấu phân cách + dấu âm) trước con trỏ cũ
  let charsBeforeCaret = 0;
  for (let i = 0; i < oldCaretPosition && i < oldValue.length; i++) {
    const ch = oldValue.charAt(i);
    if (/\d/.test(ch) || ch === decimalSep || ch === "-") {
      charsBeforeCaret++;
    }
  }

  // Nếu không có ký tự có nghĩa nào trước con trỏ cũ
  if (charsBeforeCaret === 0) {
    return 0;
  }

  // Tìm vị trí tương ứng trong chuỗi mới (mặc định ở cuối chuỗi mới nếu ký tự gõ thêm bị loại bỏ)
  let newCaretPosition = newValue.length;
  let charsCount = 0;

  for (let i = 0; i < newValue.length; i++) {
    const ch = newValue.charAt(i);
    if (/\d/.test(ch) || ch === decimalSep || ch === "-") {
      charsCount++;
    }
    if (charsCount === charsBeforeCaret) {
      newCaretPosition = i + 1;
      break;
    }
  }

  return Math.min(newCaretPosition, newValue.length);
}

// ==================== OTP INPUT UTILS ====================

/**
 * Kiểm tra một ký tự đơn lẻ có hợp lệ theo kiểu nhập OTP (numeric, alphanumeric, password) hay không.
 *
 * @param char - Ký tự cần kiểm tra (1 ký tự).
 * @param type - Kiểu OTP cho phép: 'numeric' (chỉ số 0-9), 'alphanumeric' (chữ và số), hoặc 'password'. Mặc định là 'numeric'.
 * @returns `true` nếu ký tự hợp lệ, ngược lại `false`.
 *
 * @example
 * isValidOtpChar("5", "numeric") // true
 * isValidOtpChar("a", "numeric") // false
 * isValidOtpChar("a", "alphanumeric") // true
 */
export function isValidOtpChar(char: string, type: OtpInputType = "numeric"): boolean {
  if (type === "numeric") {
    return /^\d$/.test(char);
  }
  if (type === "alphanumeric") {
    return /^[a-zA-Z0-9]$/.test(char);
  }
  return true;
}

/**
 * Làm sạch chuỗi ký tự đầu vào khi Paste hoặc Autofill, chỉ giữ lại các ký tự hợp lệ theo kiểu OTP.
 *
 * @param str - Chuỗi ký tự thô cần làm sạch (ví dụ: "ab6-5 c4 321d").
 * @param type - Kiểu OTP cho phép: 'numeric', 'alphanumeric', hoặc 'password'. Mặc định là 'numeric'.
 * @returns Chuỗi ký tự đã được lọc sạch các ký tự không hợp lệ.
 *
 * @example
 * sanitizeOtpString("12-34 56", "numeric") // "123456"
 * sanitizeOtpString("A-1#B2", "alphanumeric") // "A1B2"
 */
export function sanitizeOtpString(str: string, type: import("./types").OtpInputType = "numeric"): string {
  if (type === "numeric") {
    return str.replace(/\D/g, "");
  }
  if (type === "alphanumeric") {
    return str.replace(/[^a-zA-Z0-9]/g, "");
  }
  return str;
}

// ==================== MULTI INPUT UTILS ====================

/**
 * Phân tách chuỗi văn bản thành danh sách các thẻ (tags) dựa trên regex hoặc ký tự phân cách khi Paste hoặc khởi tạo.
 *
 * @param text - Chuỗi văn bản thô (ví dụ: "React, Vue; Angular\nSvelte").
 * @param splitRegex - Regex phân tách (mặc định: `/[\r\n,;\t]+/`).
 * @param trim - Tự động loại bỏ khoảng trắng thừa đầu và cuối mỗi tag (mặc định: `true`).
 * @returns Mảng các chuỗi tag hợp lệ đã lọc bỏ các phần tử rỗng.
 *
 * @example
 * splitTagsFromText("React, Vue; Angular") // ["React", "Vue", "Angular"]
 */
export function splitTagsFromText(
  text: string,
  splitRegex: RegExp = /[\r\n,;\t]+/,
  trim: boolean = true
): string[] {
  if (!text) return [];
  return text
    .split(splitRegex)
    .map((item) => (trim ? item.trim() : item))
    .filter(Boolean);
}
