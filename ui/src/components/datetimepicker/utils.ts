import { LocaleConfig } from "../datepicker/types";
import { formatDate } from "../datepicker/utils";

/**
 * Lấy định dạng ngày giờ mặc định theo cờ use12Hours và showSeconds
 */
export function getDefaultDateTimeFormat(use12Hours: boolean = false, showSeconds: boolean = true): string {
  if (use12Hours) {
    return showSeconds ? "DD/MM/YYYY hh:mm:ss A" : "DD/MM/YYYY hh:mm A";
  }
  return showSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm";
}

/**
 * Gộp date (năm, tháng, ngày) và time (giờ, phút, giây) thành 1 đối tượng Date
 */
export function combineDateTime(date: Date | null, time: Date | null): Date | null {
  if (!date && !time) return null;
  const baseDate = date ? new Date(date) : new Date();
  if (time) {
    baseDate.setHours(time.getHours());
    baseDate.setMinutes(time.getMinutes());
    baseDate.setSeconds(time.getSeconds());
    baseDate.setMilliseconds(time.getMilliseconds());
  }
  return baseDate;
}

/**
 * Chuyển đổi giá trị bất kỳ (Date, string, number, Temporal object) thành Date
 */
export function toDateTime(val: unknown, formatStr: string = "DD/MM/YYYY HH:mm:ss"): Date | null {
  if (!val) return null;
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? null : new Date(val.getTime());
  }
  if (typeof val === "string" || typeof val === "number") {
    if (typeof val === "string") {
      const parsedWithFormat = parseDateTime(val, formatStr);
      if (parsedWithFormat) return parsedWithFormat;
    }
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  const anyObj = val as { toDate?: () => Date; epochMilliseconds?: number };
  if (typeof anyObj.toDate === "function") {
    return anyObj.toDate();
  }
  if (typeof anyObj.epochMilliseconds === "number") {
    return new Date(anyObj.epochMilliseconds);
  }
  return null;
}

/**
 * Format Date thành chuỗi theo formatStr và locale
 */
export function formatDateTime(
  date: Date | null | undefined,
  formatStr: string = "DD/MM/YYYY HH:mm:ss",
  locale?: "vi" | "en" | LocaleConfig
): string {
  if (!date || isNaN(date.getTime())) return "";
  return formatDate(date, formatStr, locale);
}

/**
 * Parse chuỗi theo định dạng formatStr (hỗ trợ YYYY, YY, MM, M, DD, D, HH, H, hh, h, mm, m, ss, s, A, a)
 */
export function parseDateTime(str: string | null | undefined, formatStr: string = "DD/MM/YYYY HH:mm:ss"): Date | null {
  if (!str || typeof str !== "string") return null;
  const trimmed = str.trim();
  if (!trimmed) return null;

  let year = new Date().getFullYear();
  let month = 1;
  let day = 1;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let is12Hour = false;
  let isPM = false;

  const patternParts = formatStr.match(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g);
  if (!patternParts) {
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
  }

  // Tạo regex từ formatStr
  let regexStr = "^" + formatStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const part of patternParts) {
    if (part === "YYYY") regexStr = regexStr.replace("YYYY", "(\\d{4})");
    else if (part === "YY") regexStr = regexStr.replace("YY", "(\\d{2})");
    else if (part === "MM" || part === "M") regexStr = regexStr.replace(part, "(\\d{1,2})");
    else if (part === "DD" || part === "D") regexStr = regexStr.replace(part, "(\\d{1,2})");
    else if (part === "HH" || part === "H" || part === "hh" || part === "h")
      regexStr = regexStr.replace(part, "(\\d{1,2})");
    else if (part === "mm" || part === "m") regexStr = regexStr.replace(part, "(\\d{1,2})");
    else if (part === "ss" || part === "s") regexStr = regexStr.replace(part, "(\\d{1,2})");
    else if (part === "A" || part === "a") regexStr = regexStr.replace(part, "(AM|PM|am|pm)");
  }
  regexStr += "$";

  const match = new RegExp(regexStr, "i").exec(trimmed);
  if (!match) {
    const fallback = new Date(trimmed);
    return isNaN(fallback.getTime()) ? null : fallback;
  }

  patternParts.forEach((part, index) => {
    const rawVal = match[index + 1];
    if (!rawVal) return;

    if (part === "A" || part === "a") {
      is12Hour = true;
      if (rawVal.toUpperCase() === "PM") {
        isPM = true;
      }
      return;
    }

    const val = parseInt(rawVal, 10);
    if (isNaN(val)) return;

    if (part === "YYYY") year = val;
    else if (part === "YY") year = 2000 + val;
    else if (part === "MM" || part === "M") month = val;
    else if (part === "DD" || part === "D") day = val;
    else if (part === "HH" || part === "H") hours = val;
    else if (part === "hh" || part === "h") {
      is12Hour = true;
      hours = val;
    } else if (part === "mm" || part === "m") minutes = val;
    else if (part === "ss" || part === "s") seconds = val;
  });

  if (is12Hour) {
    if (isPM) {
      if (hours < 12) hours += 12;
    } else {
      if (hours === 12) hours = 0;
    }
  }

  const result = new Date(year, month - 1, day, hours, minutes, seconds);
  return isNaN(result.getTime()) ? null : result;
}
