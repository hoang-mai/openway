import React, { useRef } from "react";
import { DateRangeMonthGridProps } from "./types";
import { dateRangePickerSizeConfig, dateRangePickerColorConfig, dateRangePickerRadiusConfig } from "./constants";
import { useLocale } from "../common/OpenWayProvider";
import { getSafeConfig } from "@/utils/function";

export default function DateRangeMonthGrid({
  currentMonth,
  onSelectMonth,
  size = "md",
  color = "primary",
  radius,
  rangeStart,
  rangeEnd,
  hoveredDate,
  onHoverMonth,
}: DateRangeMonthGridProps) {
  const loc = useLocale("datePicker");
  const sizeStyles = getSafeConfig(size, dateRangePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, dateRangePickerColorConfig, "primary");
  const radiusClass = getSafeConfig(radius, dateRangePickerRadiusConfig, "lg");

  const gridRef = useRef<HTMLDivElement>(null);

  const currentYear = currentMonth.getFullYear();
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const selectedIndex = rangeStart && rangeStart.getFullYear() === currentYear ? rangeStart.getMonth() : -1;
  const activeTabbableIndex = selectedIndex !== -1 ? selectedIndex : todayYear === currentYear ? todayMonth : 0;

  const focusButton = (targetIndex: number) => {
    const allButtons = gridRef.current?.querySelectorAll<HTMLButtonElement>("button");
    const targetBtn = allButtons?.[targetIndex];
    if (targetBtn) {
      targetBtn.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let targetIndex: number | null = null;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (currentIndex + 1 < loc.monthsShort.length) targetIndex = currentIndex + 1;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (currentIndex - 1 >= 0) targetIndex = currentIndex - 1;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentIndex + 3 < loc.monthsShort.length) targetIndex = currentIndex + 3;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex - 3 >= 0) targetIndex = currentIndex - 3;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = loc.monthsShort.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectMonth(currentIndex);
      return;
    }

    if (targetIndex !== null) {
      focusButton(targetIndex);
    }
  };

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label="Chọn tháng"
      className="grid grid-cols-3 gap-2 py-2"
      onMouseLeave={() => onHoverMonth?.(null)}
    >
      {loc.monthsShort.map((monthName, idx) => {
        const monthDate = new Date(currentYear, idx, 1);
        const mTime = monthDate.getTime();
        const sTime = rangeStart ? new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1).getTime() : null;
        const eTime = rangeEnd ? new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), 1).getTime() : null;
        const hTime = hoveredDate ? new Date(hoveredDate.getFullYear(), hoveredDate.getMonth(), 1).getTime() : null;

        const isRangeStart = !!sTime && sTime === mTime;
        const isRangeEnd = !!eTime && eTime === mTime;
        let isInRange = false;
        let isHoveredRange = false;

        if (sTime && eTime) {
          isInRange = mTime > sTime && mTime < eTime;
        } else if (sTime && !eTime && hTime) {
          if (hTime > sTime) {
            isHoveredRange = mTime > sTime && mTime <= hTime;
          } else if (hTime < sTime) {
            isHoveredRange = mTime < sTime && mTime >= hTime;
          }
        }

        const isCurrentMonth = todayYear === currentYear && todayMonth === idx;
        const isTabbable = idx === activeTabbableIndex;

        let style = "text-neutral-800 hover:bg-neutral-100";
        if (isRangeStart || isRangeEnd) {
          style = `${colorStyles.selected} font-semibold shadow-xs`;
        } else if (isInRange || isHoveredRange) {
          style = `${colorStyles.rangeBg} ${colorStyles.rangeText}`;
        } else if (isCurrentMonth) {
          style = `ring-1 ${colorStyles.todayRing} font-semibold`;
        }

        return (
          <div
            key={monthName}
            role="gridcell"
            aria-selected={isRangeStart || isRangeEnd || isInRange}
            className="flex items-center justify-center"
          >
            <button
              type="button"
              tabIndex={isTabbable ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={() => onSelectMonth(idx)}
              onMouseEnter={() => onHoverMonth?.(monthDate)}
              aria-label={`${monthName} ${currentYear}`}
              className={`w-full flex items-center justify-center h-10 ${sizeStyles.cellText} ${radiusClass} transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${style}`}
            >
              {monthName}
            </button>
          </div>
        );
      })}
    </div>
  );
}
