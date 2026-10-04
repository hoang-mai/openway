import { TimeObject, TimePeriod, TimeValue } from "./types";

/**
 * Định dạng số thành chuỗi 2 chữ số với số 0 đứng trước nếu nhỏ hơn 10.
 *
 * @param val - Số cần đệm (ví dụ: 5 -> "05", 12 -> "12").
 * @returns Chuỗi số 2 chữ số.
 */
export function padZero(val: number): string {
  return val < 10 ? `0${val}` : `${val}`;
}

/**
 * Xác định định dạng thời gian mặc định theo cờ 12 giờ và cờ hiển thị giây.
 *
 * @param use12Hours - Có sử dụng chế độ 12 giờ kèm AM/PM không.
 * @param showSeconds - Có hiển thị giây không.
 * @returns Chuỗi định dạng mặc định (ví dụ: `'HH:mm:ss'`, `'hh:mm A'`).
 */
export function getDefaultFormat(use12Hours = false, showSeconds = true): string {
  if (use12Hours) {
    return showSeconds ? "hh:mm:ss A" : "hh:mm A";
  }
  return showSeconds ? "HH:mm:ss" : "HH:mm";
}

/**
 * Chuyển đổi linh hoạt một giá trị TimeValue (chuỗi thời gian, Date, hoặc null) thành đối tượng Date.
 * Thiết lập ngày là ngày hiện tại và gán chính xác giờ, phút, giây.
 *
 * @param val - Giá trị thời gian cần chuyển đổi.
 * @returns Đối tượng `Date` hợp lệ hoặc `null` nếu không phân tích được.
 */
export function parseTimeToDate(val?: TimeValue): Date | null {
  if (!val) return null;
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? null : new Date(val);
  }

  if (typeof val !== "string") return null;
  const str = val.trim();
  if (!str) return null;

  // Thử phân tích chuỗi chuẩn ISO (ví dụ: 2026-08-31T14:30:00)
  if (str.includes("T")) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) return d;
  }

  // Phân tích biểu thức chính quy (H:m[:s] [AM|PM])
  const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?(?:\s*([ap]m))?$/i;
  const match = str.match(timeRegex);

  if (match) {
    let hours = parseInt(match[1]!, 10);
    const minutes = parseInt(match[2]!, 10);
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
    const period = match[4]?.toUpperCase() as TimePeriod | undefined;

    if (period) {
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }

    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      const now = new Date();
      now.setHours(hours, minutes, seconds, 0);
      return now;
    }
  }

  return null;
}

/**
 * Định dạng một đối tượng Date thành chuỗi thời gian dựa theo mẫu format quy định.
 *
 * Các token hỗ trợ:
 * - `HH`: Giờ 24h (00 - 23)
 * - `H`: Giờ 24h không đệm 0 (0 - 23)
 * - `hh`: Giờ 12h (01 - 12)
 * - `h`: Giờ 12h không đệm 0 (1 - 12)
 * - `mm`: Phút 2 chữ số (00 - 59)
 * - `m`: Phút không đệm 0 (0 - 59)
 * - `ss`: Giây 2 chữ số (00 - 59)
 * - `s`: Giây không đệm 0 (0 - 59)
 * - `A`: Buổi viết hoa (AM / PM)
 * - `a`: Buổi viết thường (am / pm)
 *
 * @param date - Đối tượng Date cần định dạng.
 * @param formatStr - Mẫu định dạng chuỗi (mặc định `'HH:mm:ss'`).
 * @returns Chuỗi thời gian đã được định dạng.
 */
export function formatTime(date: Date | null | undefined, formatStr = "HH:mm:ss"): string {
  if (!date || isNaN(date.getTime())) return "";

  const fullHours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let hours12 = fullHours % 12;
  if (hours12 === 0) hours12 = 12;
  const period: TimePeriod = fullHours >= 12 ? "PM" : "AM";

  return formatStr
    .replace(/HH/g, padZero(fullHours))
    .replace(/H/g, `${fullHours}`)
    .replace(/hh/g, padZero(hours12))
    .replace(/h/g, `${hours12}`)
    .replace(/mm/g, padZero(minutes))
    .replace(/m/g, `${minutes}`)
    .replace(/ss/g, padZero(seconds))
    .replace(/s/g, `${seconds}`)
    .replace(/A/g, period)
    .replace(/a/g, period.toLowerCase());
}

/**
 * Trích xuất các thành phần giờ, phút, giây và buổi AM/PM từ đối tượng Date thành TimeObject.
 *
 * @param date - Đối tượng Date đầu vào.
 * @returns Đối tượng `TimeObject`.
 */
export function toTimeObject(date: Date | null): TimeObject {
  if (!date) {
    return { hours: 0, minutes: 0, seconds: 0, period: "AM" };
  }
  const fullHours = date.getHours();
  return {
    hours: fullHours,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    period: fullHours >= 12 ? "PM" : "AM",
  };
}

/**
 * Tạo một đối tượng Date mới (với ngày hôm nay) và gán chính xác giờ, phút, giây truyền vào.
 *
 * @param hours - Giờ (0 - 23).
 * @param minutes - Phút (0 - 59).
 * @param seconds - Giây (0 - 59, mặc định 0).
 * @returns Đối tượng Date mới.
 */
export function createDateWithTime(hours: number, minutes: number, seconds = 0): Date {
  const d = new Date();
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

/**
 * Kiểm tra xem 2 thời điểm có cùng giờ, phút và giây hay không.
 *
 * @param d1 - Thời điểm thứ nhất.
 * @param d2 - Thời điểm thứ hai.
 * @param checkSeconds - Có kiểm tra phần giây hay không (mặc định `true`).
 * @returns `true` nếu 2 thời điểm trùng khớp thời gian.
 */
export function isSameTime(d1: Date | null, d2: Date | null, checkSeconds = true): boolean {
  if (!d1 || !d2) return false;
  if (checkSeconds) {
    return (
      d1.getHours() === d2.getHours() &&
      d1.getMinutes() === d2.getMinutes() &&
      d1.getSeconds() === d2.getSeconds()
    );
  }
  return d1.getHours() === d2.getHours() && d1.getMinutes() === d2.getMinutes();
}

/**
 * Kiểm tra xem thời điểm thứ nhất có xảy ra trước thời điểm thứ hai trong ngày hay không.
 *
 * @param time1 - Thời điểm cần so sánh.
 * @param time2 - Thời điểm mốc.
 * @returns `true` nếu `time1` xảy ra trước `time2`.
 */
export function isTimeBefore(time1: Date | null, time2: Date | null): boolean {
  if (!time1 || !time2) return false;
  const t1 = time1.getHours() * 3600 + time1.getMinutes() * 60 + time1.getSeconds();
  const t2 = time2.getHours() * 3600 + time2.getMinutes() * 60 + time2.getSeconds();
  return t1 < t2;
}

/**
 * Kiểm tra xem thời điểm thứ nhất có xảy ra sau thời điểm thứ hai trong ngày hay không.
 *
 * @param time1 - Thời điểm cần so sánh.
 * @param time2 - Thời điểm mốc.
 * @returns `true` nếu `time1` xảy ra sau `time2`.
 */
export function isTimeAfter(time1: Date | null, time2: Date | null): boolean {
  if (!time1 || !time2) return false;
  const t1 = time1.getHours() * 3600 + time1.getMinutes() * 60 + time1.getSeconds();
  const t2 = time2.getHours() * 3600 + time2.getMinutes() * 60 + time2.getSeconds();
  return t1 > t2;
}

/**
 * Kiểm tra xem một giá trị giờ, phút hoặc giây cụ thể có bị vô hiệu hóa (disable) hay không
 * dựa trên giới hạn min/max hoặc các hàm disable tùy chỉnh.
 *
 * @param type - Loại đơn vị thời gian ('hour', 'minute', 'second').
 * @param val - Giá trị cần kiểm tra.
 * @param selectedHour - Giờ đang được chọn hiện tại.
 * @param selectedMinute - Phút đang được chọn hiện tại.
 * @param minTime - Giới hạn thời gian tối thiểu.
 * @param maxTime - Giới hạn thời gian tối đa.
 * @param disabledHours - Hàm trả về danh sách giờ bị vô hiệu hóa.
 * @param disabledMinutes - Hàm trả về danh sách phút bị vô hiệu hóa.
 * @param disabledSeconds - Hàm trả về danh sách giây bị vô hiệu hóa.
 * @returns `true` nếu giá trị bị disable.
 */
export function checkIsDisabled(
  type: "hour" | "minute" | "second",
  val: number,
  selectedHour: number,
  selectedMinute: number,
  minTime?: Date | null,
  maxTime?: Date | null,
  disabledHours?: () => number[],
  disabledMinutes?: (h: number) => number[],
  disabledSeconds?: (h: number, m: number) => number[]
): boolean {
  if (type === "hour") {
    if (disabledHours?.().includes(val)) return true;
    if (minTime && val < minTime.getHours()) return true;
    if (maxTime && val > maxTime.getHours()) return true;
  } else if (type === "minute") {
    if (disabledMinutes?.(selectedHour).includes(val)) return true;
    if (minTime) {
      if (selectedHour < minTime.getHours()) return true;
      if (selectedHour === minTime.getHours() && val < minTime.getMinutes()) {
        return true;
      }
    }
    if (maxTime) {
      if (selectedHour > maxTime.getHours()) return true;
      if (selectedHour === maxTime.getHours() && val > maxTime.getMinutes()) {
        return true;
      }
    }
  } else if (type === "second") {
    if (disabledSeconds?.(selectedHour, selectedMinute).includes(val)) {
      return true;
    }
    if (minTime) {
      if (selectedHour < minTime.getHours()) return true;
      if (selectedHour === minTime.getHours() && selectedMinute < minTime.getMinutes()) {
        return true;
      }
      if (
        selectedHour === minTime.getHours() &&
        selectedMinute === minTime.getMinutes() &&
        val < minTime.getSeconds()
      ) {
        return true;
      }
    }
    if (maxTime) {
      if (selectedHour > maxTime.getHours()) return true;
      if (selectedHour === maxTime.getHours() && selectedMinute > maxTime.getMinutes()) {
        return true;
      }
      if (
        selectedHour === maxTime.getHours() &&
        selectedMinute === maxTime.getMinutes() &&
        val > maxTime.getSeconds()
      ) {
        return true;
      }
    }
  }

  return false;
}
