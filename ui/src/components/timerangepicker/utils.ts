/**
 * Kiểm tra xem một thời điểm `time` có nằm trong khoảng giữa `start` và `end` trong ngày hay không.
 *
 * @param time - Thời điểm cần kiểm tra.
 * @param start - Thời điểm bắt đầu khoảng.
 * @param end - Thời điểm kết thúc khoảng.
 * @returns `true` nếu `time` nằm trong khoảng [`start`, `end`].
 */
export function isTimeInRange(
  time: Date | null,
  start: Date | null,
  end: Date | null
): boolean {
  if (!time || !start || !end) return false;
  const t = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const s = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
  const e = end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds();
  return t >= s && t <= e;
}
