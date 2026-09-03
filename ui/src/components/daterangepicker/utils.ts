import { DateRangeCalendarDay } from "./types";
import {
  isSameDay,
  isDateBefore,
  isDateAfter,
  getISOWeekNumber,
} from "../datepicker/utils";

/**
 * Kiểm tra xem một ngày có nằm trong khoảng giữa ngày bắt đầu và ngày kết thúc hay không (bao gồm cả 2 đầu mút).
 * Dùng riêng cho logic chọn khoảng ngày của DateRangePicker.
 *
 * @param date - Ngày cần kiểm tra.
 * @param start - Ngày bắt đầu khoảng.
 * @param end - Ngày kết thúc khoảng.
 * @returns `true` nếu `date` nằm trong khoảng [`start`, `end`].
 */
export function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const tStart = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const tEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const min = Math.min(tStart, tEnd);
  const max = Math.max(tStart, tEnd);
  return t >= min && t <= max;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function createRangeCalendarDay(
  date: Date,
  isCurrentMonth: boolean,
  today: Date,
  rangeStart?: Date | null,
  rangeEnd?: Date | null,
  hoveredDate?: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
  isDateDisabled?: (date: Date) => boolean
): DateRangeCalendarDay {
  const isRangeStart = rangeStart ? isSameDay(date, rangeStart) : false;
  const isRangeEnd = rangeEnd ? isSameDay(date, rangeEnd) : false;
  const isInRange = isDateInRange(date, rangeStart || null, rangeEnd || null);
  const isHoveredRange = rangeStart && !rangeEnd && hoveredDate ? isDateInRange(date, rangeStart, hoveredDate) : false;

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
    isSelected: isRangeStart || isRangeEnd,
    isDisabled: disabled,
    isRangeStart,
    isRangeEnd,
    isInRange,
    isHoveredRange,
    weekNumber: getISOWeekNumber(date),
  };
}

export function generateRangeCalendarGrid(
  year: number,
  month: number,
  firstDayOfWeek: 0 | 1 = 1,
  rangeStart?: Date | null,
  rangeEnd?: Date | null,
  hoveredDate?: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
  isDateDisabled?: (date: Date) => boolean
): DateRangeCalendarDay[] {
  const days: DateRangeCalendarDay[] = [];
  const today = new Date();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const currentMonthDays = getDaysInMonth(year, month);

  const prevDaysCount = firstDayOfWeek === 1 ? (firstDayIndex === 0 ? 6 : firstDayIndex - 1) : firstDayIndex;

  for (let i = prevDaysCount - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const date = new Date(year, month - 1, d);
    days.push(
      createRangeCalendarDay(
        date,
        false,
        today,
        rangeStart,
        rangeEnd,
        hoveredDate,
        minDate,
        maxDate,
        isDateDisabled
      )
    );
  }

  for (let i = 1; i <= currentMonthDays; i++) {
    const date = new Date(year, month, i);
    days.push(
      createRangeCalendarDay(
        date,
        true,
        today,
        rangeStart,
        rangeEnd,
        hoveredDate,
        minDate,
        maxDate,
        isDateDisabled
      )
    );
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push(
      createRangeCalendarDay(
        date,
        false,
        today,
        rangeStart,
        rangeEnd,
        hoveredDate,
        minDate,
        maxDate,
        isDateDisabled
      )
    );
  }

  return days;
}
