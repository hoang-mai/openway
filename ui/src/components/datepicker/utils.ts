import { LocaleConfig, CalendarDay, CalendarView } from "./types";
import { viLocale, enLocale } from "./constants";

/**
 * Phân giải cấu hình ngôn ngữ (locale) thành đối tượng `LocaleConfig` hoàn chỉnh.
 *
 * @param locale - Mã ngôn ngữ ('vi' | 'en') hoặc đối tượng cấu hình `LocaleConfig` tùy biến.
 * @returns Đối tượng `LocaleConfig` tương ứng (mặc định trả về `viLocale` nếu không truyền).
 */
export function resolveLocale(locale: "vi" | "en" | LocaleConfig | undefined): LocaleConfig {
  if (!locale || locale === "vi") return viLocale;
  if (locale === "en") return enLocale;
  return locale;
}

/**
 * Chuyển đổi dữ liệu đầu vào không xác định thành đối tượng `Date` hợp lệ.
 * Hỗ trợ:
 * - Đối tượng `Date` chuẩn.
 * - Timestamp `number` (milliseconds).
 * - Chuỗi ngày định dạng theo mẫu `formatStr` truyền vào (hoặc fallback DD/MM/YYYY, MM/YYYY, YYYY, YYYY-MM-DD, ISO string).
 * - Đối tượng dạng Temporal (có phương thức `toDate()` hoặc thuộc tính `epochMilliseconds`).
 *
 * @param val - Giá trị đầu vào cần chuyển đổi (Date, string, number, Temporal-like).
 * @param formatStr - Định dạng chuỗi ngày mong đợi để phân tích (VD: 'DD/MM/YYYY', 'MM/YYYY', 'YYYY', 'YYYY-MM-DD').
 * @returns Đối tượng `Date` hợp lệ hoặc `null` nếu không thể chuyển đổi.
 */
export function toDate(val: unknown, formatStr?: string): Date | null {
  if (!val) return null;
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? null : new Date(val.getTime());
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return null;

    // 1. Ưu tiên parse theo formatStr chỉ định nếu có
    if (formatStr) {
      const parsedCustom = parseDate(trimmed, formatStr);
      if (parsedCustom) return parsedCustom;
    }

    // 2. Fallback sang Date constructor tiêu chuẩn (ISO string...)
    const parsed = new Date(trimmed);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  if (typeof val === "number") {
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

/**
 * Kiểm tra xem hai ngày có cùng ngày, tháng, năm hay không (bỏ qua giờ, phút, giây).
 *
 * @param d1 - Ngày thứ nhất.
 * @param d2 - Ngày thứ hai.
 * @returns `true` nếu hai ngày trùng nhau, ngược lại `false`.
 */
export function isSameDay(d1: Date | null | undefined, d2: Date | null | undefined): boolean {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

/**
 * Kiểm tra xem hai ngày có cùng tháng và cùng năm hay không.
 *
 * @param d1 - Ngày thứ nhất.
 * @param d2 - Ngày thứ hai.
 * @returns `true` nếu cùng tháng và năm, ngược lại `false`.
 */
export function isSameMonth(d1: Date | null | undefined, d2: Date | null | undefined): boolean {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

/**
 * So sánh xem ngày `d1` có xảy ra trước ngày `d2` hay không (chỉ so sánh ngày/tháng/năm).
 *
 * @param d1 - Ngày cần kiểm tra.
 * @param d2 - Ngày mốc so sánh.
 * @returns `true` nếu `d1` trước `d2`.
 */
export function isDateBefore(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 < t2;
}

/**
 * So sánh xem ngày `d1` có xảy ra sau ngày `d2` hay không (chỉ so sánh ngày/tháng/năm).
 *
 * @param d1 - Ngày cần kiểm tra.
 * @param d2 - Ngày mốc so sánh.
 * @returns `true` nếu `d1` sau `d2`.
 */
export function isDateAfter(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 > t2;
}

/**
 * Tính số thứ tự tuần trong năm của một ngày theo tiêu chuẩn ISO 8601.
 * Tuần 1 là tuần có ngày Thứ Năm đầu tiên của năm và tuần luôn bắt đầu từ Thứ Hai.
 *
 * @param date - Đối tượng `Date` cần tính số tuần.
 * @returns Số thứ tự tuần (1 - 53).
 */
export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Lấy tổng số ngày trong một tháng cụ thể của năm (tính cả năm nhuận).
 *
 * @param year - Năm đầy đủ (VD: 2026).
 * @param month - Chỉ số tháng (0: Tháng 1 đến 11: Tháng 12).
 * @returns Số lượng ngày trong tháng (28, 29, 30 hoặc 31).
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Sinh ma trận 42 ô ngày (chuẩn 6 tuần) hiển thị trong bảng lịch của một tháng.
 * Bao gồm:
 * 1. Các ngày cuối của tháng trước để lấp đầy tuần đầu tiên.
 * 2. Toàn bộ các ngày trong tháng hiện tại.
 * 3. Các ngày đầu của tháng tiếp theo để đủ 42 ô (6 hàng x 7 cột).
 *
 * @param year - Năm cần hiển thị.
 * @param month - Chỉ số tháng cần hiển thị (0 - 11).
 * @param firstDayOfWeek - Ngày bắt đầu tuần (0: Chủ Nhật, 1: Thứ Hai, mặc định 1).
 * @param selectedDate - Ngày đơn đang được chọn (để đánh dấu isSelected).
 * @param rangeStart - Ngày bắt đầu khoảng (chế độ range).
 * @param rangeEnd - Ngày kết thúc khoảng (chế độ range).
 * @param hoveredDate - Ngày đang được rê chuột (chế độ range preview).
 * @param minDate - Giới hạn ngày nhỏ nhất cho phép chọn.
 * @param maxDate - Giới hạn ngày lớn nhất cho phép chọn.
 * @param isDateDisabled - Hàm kiểm tra ngày có bị vô hiệu hóa hay không.
 * @returns Mảng gồm 42 đối tượng `CalendarDay`.
 */
export function generateCalendarGrid(
  year: number,
  month: number,
  firstDayOfWeek: 0 | 1 = 1,
  selectedDate?: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
  isDateDisabled?: (date: Date) => boolean
): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const currentMonthDays = getDaysInMonth(year, month);

  // Số ngày của tháng trước cần hiển thị
  const prevDaysCount = firstDayOfWeek === 1 ? (firstDayIndex === 0 ? 6 : firstDayIndex - 1) : firstDayIndex;

  // 1. Ngày của tháng trước
  for (let i = prevDaysCount - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const date = new Date(year, month - 1, d);
    days.push(
      createCalendarDay(
        date,
        false,
        today,
        selectedDate,
        minDate,
        maxDate,
        isDateDisabled
      )
    );
  }

  // 2. Ngày của tháng hiện tại
  for (let i = 1; i <= currentMonthDays; i++) {
    const date = new Date(year, month, i);
    days.push(
      createCalendarDay(
        date,
        true,
        today,
        selectedDate,
        minDate,
        maxDate,
        isDateDisabled
      )
    );
  }

  // 3. Ngày của tháng tiếp theo (cho đủ 42 ô = 6 tuần)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push(
      createCalendarDay(
        date,
        false,
        today,
        selectedDate,
        minDate,
        maxDate,
        isDateDisabled
      )
    );
  }

  return days;
}

/**
 * Hàm khởi tạo đối tượng `CalendarDay` kèm theo các trạng thái tính toán sẵn.
 *
 * @param date - Đối tượng Date đại diện cho ô ngày.
 * @param isCurrentMonth - Cờ đánh dấu ngày có thuộc tháng đang xem hay không.
 * @param today - Đối tượng Date của ngày hôm nay.
 * @param selectedDate - Ngày đang được chọn (chế độ single).
 * @param minDate - Giới hạn ngày nhỏ nhất.
 * @param maxDate - Giới hạn ngày lớn nhất.
 * @param isDateDisabled - Callback tùy biến kiểm tra ngày bị disable.
 * @returns Đối tượng `CalendarDay` hoàn chỉnh.
 */
function createCalendarDay(
  date: Date,
  isCurrentMonth: boolean,
  today: Date,
  selectedDate?: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
  isDateDisabled?: (date: Date) => boolean
): CalendarDay {
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

  let disabled = false;
  if (minDate && isDateBefore(date, minDate)) {
    disabled = true;
  }
  if (maxDate && isDateAfter(date, maxDate)) {
    disabled = true;
  }
  if (isDateDisabled && isDateDisabled(date)) {
    disabled = true;
  }

  return {
    date,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    isCurrentMonth,
    isToday: isSameDay(date, today),
    isSelected,
    isDisabled: disabled,
    weekNumber: getISOWeekNumber(date),
  };
}

/**
 * Định dạng đối tượng `Date` thành chuỗi văn bản theo định dạng mẫu.
 *
 * Các token định dạng hỗ trợ:
 * - `YYYY`: Năm 4 chữ số (VD: 2026)
 * - `YY`: Năm 2 chữ số cuối (VD: 26)
 * - `MMMM`: Tên đầy đủ của tháng (VD: Tháng 8, August)
 * - `MMM`: Tên viết tắt của tháng (VD: Thg 8, Aug)
 * - `MM`: Tháng 2 chữ số có số 0 ở đầu (01-12)
 * - `M`: Tháng 1 hoặc 2 chữ số (1-12)
 * - `DD`: Ngày trong tháng 2 chữ số (01-31)
 * - `D`: Ngày trong tháng 1 hoặc 2 chữ số (1-31)
 * - `dddd`: Tên đầy đủ ngày trong tuần (VD: Thứ Hai, Monday)
 * - `ddd`: Tên viết tắt ngày trong tuần (VD: T2, Mon)
 * - `dd`: Tên tối giản ngày trong tuần (VD: T2, Mo)
 * - `HH`: Giờ 24h định dạng 2 chữ số (00-23)
 * - `H`: Giờ 24h định dạng 1 hoặc 2 chữ số (0-23)
 * - `hh`: Giờ 12h định dạng 2 chữ số (01-12)
 * - `h`: Giờ 12h định dạng 1 hoặc 2 chữ số (1-12)
 * - `mm`: Phút 2 chữ số (00-59)
 * - `m`: Phút 1 hoặc 2 chữ số (0-59)
 * - `ss`: Giây 2 chữ số (00-59)
 * - `s`: Giây 1 hoặc 2 chữ số (0-59)
 * - `A`: Buổi sáng/chiều in hoa (AM/PM)
 * - `a`: Buổi sáng/chiều in thường (am/pm)
 *
 * @param date - Đối tượng `Date` cần định dạng.
 * @param formatStr - Chuỗi mẫu định dạng (mặc định 'DD/MM/YYYY').
 * @param locale - Ngôn ngữ hiển thị ('vi' | 'en' hoặc cấu hình `LocaleConfig`).
 * @returns Chuỗi ngày đã được định dạng. Trả về chuỗi rỗng nếu `date` không hợp lệ.
 */
export function formatDate(
  date: Date | null | undefined,
  formatStr: string = "DD/MM/YYYY",
  locale?: "vi" | "en" | LocaleConfig
): string {
  if (!date || isNaN(date.getTime())) return "";

  const loc = resolveLocale(locale);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dayOfWeek = date.getDay();

  const pad = (n: number) => String(n).padStart(2, "0");

  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  const replacements: Record<string, string> = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MMMM: loc.months[month] ?? "",
    MMM: loc.monthsShort[month] ?? "",
    MM: pad(month + 1),
    M: String(month + 1),
    DD: pad(day),
    D: String(day),
    dddd: loc.weekdays[dayOfWeek] ?? "",
    ddd: loc.weekdaysShort[dayOfWeek] ?? "",
    dd: loc.weekdaysMin[dayOfWeek] ?? "",
    HH: pad(hours),
    H: String(hours),
    hh: pad(hours12),
    h: String(hours12),
    mm: pad(minutes),
    m: String(minutes),
    ss: pad(seconds),
    s: String(seconds),
    A: ampm,
    a: ampm.toLowerCase(),
  };

  // Regex match key tokens
  return formatStr.replace(
    /YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|dd|HH|H|hh|h|mm|m|ss|s|A|a/g,
    (match) => replacements[match] ?? match
  );
}

/**
 * Phân tích cú pháp chuỗi văn bản ngày tháng thành đối tượng `Date` dựa theo mẫu định dạng.
 *
 * @param str - Chuỗi văn bản chứa ngày tháng cần phân tích.
 * @param formatStr - Chuỗi mẫu định dạng tương ứng (mặc định 'DD/MM/YYYY').
 * @returns Đối tượng `Date` hợp lệ hoặc `null` nếu chuỗi không khớp định dạng.
 */
export function parseDate(str: string | null | undefined, formatStr: string = "DD/MM/YYYY"): Date | null {
  if (!str || typeof str !== "string") return null;
  const trimmed = str.trim();
  if (!trimmed) return null;

  let year = new Date().getFullYear();
  let month = 1;
  let day = 1;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Simple token parser
  const patternParts = formatStr.match(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s/g);
  if (!patternParts) {
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
  }

  // Create regex from formatStr
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
  }
  regexStr += "$";

  const match = new RegExp(regexStr).exec(trimmed);
  if (!match) {
    // Fallback standard parse
    const fallback = new Date(trimmed);
    return isNaN(fallback.getTime()) ? null : fallback;
  }

  patternParts.forEach((part, index) => {
    const rawVal = match[index + 1];
    if (!rawVal) return;
    const val = parseInt(rawVal, 10);
    if (isNaN(val)) return;
    if (part === "YYYY") year = val;
    else if (part === "YY") year = 2000 + val;
    else if (part === "MM" || part === "M") month = val;
    else if (part === "DD" || part === "D") day = val;
    else if (part === "HH" || part === "H" || part === "hh" || part === "h") hours = val;
    else if (part === "mm" || part === "m") minutes = val;
    else if (part === "ss" || part === "s") seconds = val;
  });

  const parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
  if (isNaN(parsedDate.getTime())) return null;
  return parsedDate;
}

/**
 * Tự động chuyển đổi định dạng ngày cơ sở (baseFormat) phù hợp với chế độ xem CalendarView (days, months, years).
 * Giữ nguyên phong cách phân cách (separator) và thứ tự token của baseFormat.
 * Ví dụ:
 * - baseFormat = "DD-MM-YYYY", view = "months" -> "MM-YYYY"
 * - baseFormat = "DD/MM/YYYY", view = "months" -> "MM/YYYY"
 * - baseFormat = "YYYY-MM-DD", view = "months" -> "YYYY-MM"
 * - baseFormat = "YYYY/MM/DD", view = "months" -> "YYYY/MM"
 * - baseFormat = "MM-DD-YYYY", view = "months" -> "MM-YYYY"
 * - baseFormat = "MM/DD/YYYY", view = "months" -> "MM/YYYY"
 * - view = "years" -> "YYYY"
 */
export function getAdaptiveViewFormat(baseFormat: string, view: CalendarView = "days"): string {
  if (view === "days") {
    return baseFormat;
  }
  if (view === "years") {
    if (baseFormat.includes("YYYY")) return "YYYY";
    if (baseFormat.includes("YY")) return "YY";
    return "YYYY";
  }
  if (view === "months") {
    // 1. Xóa token ngày có ký tự phân cách ở sau: "DD/", "DD-", "DD.", "DD "
    let monthFormat = baseFormat.replace(/(?:DD|D|dddd|ddd|dd)\s*[-/.,\s]+\s*/, "");
    // 2. Xóa token ngày có ký tự phân cách ở trước: "-DD", "/DD", ".DD", ", DD"
    monthFormat = monthFormat.replace(/\s*[-/.,\s]+\s*(?:DD|D|dddd|ddd|dd)/, "");
    // 3. Chuẩn hóa khoảng trắng hoặc dấu phân cách trùng lặp
    monthFormat = monthFormat.replace(/[-/.,\s]{2,}/g, (match) => match.charAt(0)).trim();
    // 4. Nếu kết quả không chứa ký tự tháng hoặc năm, fallback an toàn
    if (!monthFormat || (!monthFormat.includes("M") && !monthFormat.includes("Y"))) {
      return baseFormat.includes("-") ? "MM-YYYY" : "MM/YYYY";
    }
    return monthFormat;
  }
  return baseFormat;
}
