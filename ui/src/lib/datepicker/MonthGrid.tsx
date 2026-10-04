import React, { useRef } from "react";
import { MonthGridProps } from "./types";
import { datePickerSizeConfig, datePickerColorConfig, datePickerRadiusConfig } from "./constants";
import { isSameMonth } from "./utils";
import { useLocale } from "@/locale";
import { getSafeConfig } from "@/utils/function";

export default function MonthGrid({
  currentMonth,
  selectedDate,
  onSelectMonth,
  size = "md",
  color = "primary",
  radius,
}: MonthGridProps) {
  const loc = useLocale("datePicker");
  const sizeStyles = getSafeConfig(size, datePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, datePickerColorConfig, "primary");
  const radiusClass = getSafeConfig(radius, datePickerRadiusConfig, "lg");

  const gridRef = useRef<HTMLDivElement>(null);

  const currentYear = currentMonth.getFullYear();
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const selectedIndex = selectedDate && selectedDate.getFullYear() === currentYear ? selectedDate.getMonth() : -1;
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
    <div ref={gridRef} role="grid" aria-label="Chọn tháng" className="grid grid-cols-3 gap-2 py-2">
      {loc.monthsShort.map((monthName, idx) => {
        const monthDate = new Date(currentYear, idx, 1);
        const isSelected = selectedDate ? isSameMonth(monthDate, selectedDate) : false;
        const isCurrentMonth = todayYear === currentYear && todayMonth === idx;
        const isTabbable = idx === activeTabbableIndex;

        let style = "text-neutral-800 hover:bg-neutral-100";
        if (isSelected) {
          style = `${colorStyles.selected} font-semibold shadow-xs`;
        } else if (isCurrentMonth) {
          style = `ring-1 ${colorStyles.todayRing} font-semibold`;
        }

        return (
          <div key={monthName} role="gridcell" aria-selected={isSelected} className="flex items-center justify-center">
            <button
              type="button"
              tabIndex={isTabbable ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={() => onSelectMonth(idx)}
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
