import React, { useRef } from "react";
import { DateRangeYearGridProps } from "./types";
import { dateRangePickerSizeConfig, dateRangePickerColorConfig, dateRangePickerRadiusConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export default function DateRangeYearGrid({
  currentMonth,
  onSelectYear,
  size = "md",
  color = "primary",
  radius,
  rangeStart,
  rangeEnd,
  hoveredDate,
  onHoverYear,
}: DateRangeYearGridProps) {
  const sizeStyles = getSafeConfig(size, dateRangePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, dateRangePickerColorConfig, "primary");
  const radiusClass = getSafeConfig(radius, dateRangePickerRadiusConfig, "lg");

  const gridRef = useRef<HTMLDivElement>(null);

  const currentYear = currentMonth.getFullYear();
  const startDecade = Math.floor(currentYear / 10) * 10;
  const todayYear = new Date().getFullYear();

  const years: number[] = [];
  for (let i = 0; i < 12; i++) {
    years.push(startDecade + i);
  }

  const selectedYear = rangeStart ? rangeStart.getFullYear() : currentYear;
  const selectedIndex = years.indexOf(selectedYear);
  const todayIndex = years.indexOf(todayYear);
  const activeTabbableIndex = selectedIndex !== -1 ? selectedIndex : todayIndex !== -1 ? todayIndex : 0;

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
      if (currentIndex + 1 < years.length) targetIndex = currentIndex + 1;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (currentIndex - 1 >= 0) targetIndex = currentIndex - 1;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentIndex + 3 < years.length) targetIndex = currentIndex + 3;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex - 3 >= 0) targetIndex = currentIndex - 3;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = years.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const yr = years[currentIndex];
      if (yr !== undefined) {
        onSelectYear(yr);
      }
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
      aria-label="Chọn năm"
      className="grid grid-cols-3 gap-2 py-2"
      onMouseLeave={() => onHoverYear?.(null)}
    >
      {years.map((yr, idx) => {
        const sYr = rangeStart ? rangeStart.getFullYear() : null;
        const eYr = rangeEnd ? rangeEnd.getFullYear() : null;
        const hYr = hoveredDate ? hoveredDate.getFullYear() : null;

        const isRangeStart = sYr !== null && yr === sYr;
        const isRangeEnd = eYr !== null && yr === eYr;
        let isInRange = false;
        let isHoveredRange = false;

        if (sYr !== null && eYr !== null) {
          isInRange = yr > sYr && yr < eYr;
        } else if (sYr !== null && eYr === null && hYr !== null) {
          if (hYr > sYr) {
            isHoveredRange = yr > sYr && yr <= hYr;
          } else if (hYr < sYr) {
            isHoveredRange = yr < sYr && yr >= hYr;
          }
        }

        const isCurrentYear = yr === todayYear;
        const isTabbable = idx === activeTabbableIndex;

        let style = "text-neutral-800 hover:bg-neutral-100";
        if (isRangeStart || isRangeEnd) {
          style = `${colorStyles.selected} font-semibold shadow-xs`;
        } else if (isInRange || isHoveredRange) {
          style = `${colorStyles.rangeBg} ${colorStyles.rangeText}`;
        } else if (isCurrentYear) {
          style = `ring-1 ${colorStyles.todayRing} font-semibold`;
        }

        return (
          <div
            key={yr}
            role="gridcell"
            aria-selected={isRangeStart || isRangeEnd || isInRange}
            className="flex items-center justify-center"
          >
            <button
              type="button"
              tabIndex={isTabbable ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={() => onSelectYear(yr)}
              onMouseEnter={() => onHoverYear?.(new Date(yr, 0, 1))}
              aria-label={`${yr}`}
              className={`w-full flex items-center justify-center h-10 ${sizeStyles.cellText} ${radiusClass} transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${style}`}
            >
              {yr}
            </button>
          </div>
        );
      })}
    </div>
  );
}
