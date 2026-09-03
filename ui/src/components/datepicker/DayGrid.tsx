import React, { useRef } from "react";
import { DayGridProps } from "./types";
import { datePickerSizeConfig, datePickerColorConfig, datePickerRadiusConfig } from "./constants";
import { resolveLocale } from "./utils";
import { getSafeConfig } from "@/utils/function";

export default function DayGrid({
  days,
  onSelectDate,
  size = "md",
  color = "primary",
  radius,
  locale,
  firstDayOfWeek = 1,
  showWeekNumbers = false,
}: DayGridProps) {
  const loc = resolveLocale(locale);
  const sizeStyles = getSafeConfig(size, datePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, datePickerColorConfig, "primary");
  const radiusClass = getSafeConfig(radius, datePickerRadiusConfig, "lg");

  const gridRef = useRef<HTMLDivElement>(null);

  // Reorder weekdays header according to firstDayOfWeek
  const weekdays = [...loc.weekdaysShort];
  if (firstDayOfWeek === 1) {
    const sun = weekdays.shift()!;
    weekdays.push(sun);
  }

  const hasSelected = days.some((d) => d.isSelected && !d.isDisabled);
  const todayIndex = days.findIndex((d) => d.isToday && !d.isDisabled);
  const firstCurrentMonthIndex = days.findIndex((d) => d.isCurrentMonth && !d.isDisabled);
  const fallbackIndex = firstCurrentMonthIndex !== -1 ? firstCurrentMonthIndex : days.findIndex((d) => !d.isDisabled);

  const focusButton = (targetIndex: number) => {
    const allButtons = gridRef.current?.querySelectorAll<HTMLButtonElement>("button");
    const targetBtn = allButtons?.[targetIndex];
    if (targetBtn && !targetBtn.disabled) {
      targetBtn.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let targetIndex: number | null = null;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      for (let i = currentIndex + 1; i < days.length; i++) {
        if (!days[i]!.isDisabled) {
          targetIndex = i;
          break;
        }
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!days[i]!.isDisabled) {
          targetIndex = i;
          break;
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentIndex + 7 < days.length && !days[currentIndex + 7]!.isDisabled) {
        targetIndex = currentIndex + 7;
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex - 7 >= 0 && !days[currentIndex - 7]!.isDisabled) {
        targetIndex = currentIndex - 7;
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      const rowStart = currentIndex - (currentIndex % 7);
      for (let i = rowStart; i < rowStart + 7 && i < days.length; i++) {
        if (!days[i]!.isDisabled) {
          targetIndex = i;
          break;
        }
      }
    } else if (e.key === "End") {
      e.preventDefault();
      const rowEnd = Math.min(days.length - 1, currentIndex - (currentIndex % 7) + 6);
      for (let i = rowEnd; i >= currentIndex - (currentIndex % 7); i--) {
        if (!days[i]!.isDisabled) {
          targetIndex = i;
          break;
        }
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = days[currentIndex];
      if (item && !item.isDisabled) {
        onSelectDate(item.date);
      }
      return;
    }

    if (targetIndex !== null) {
      focusButton(targetIndex);
    }
  };

  return (
    <div ref={gridRef} role="grid" aria-label={loc.months[days[15]?.month || 0]} className="w-full">
      {/* Weekdays Header */}
      <div role="row" className={`grid ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"} gap-1 mb-1 text-center`}>
        {showWeekNumbers && (
          <div
            role="columnheader"
            aria-label={loc.weekText || "Week"}
            className={`flex items-center justify-center ${sizeStyles.cellSize} text-neutral-400 ${sizeStyles.cellText} font-medium`}
          >
            #
          </div>
        )}
        {weekdays.map((dayName) => (
          <div
            key={dayName}
            role="columnheader"
            aria-label={dayName}
            className={`flex items-center justify-center ${sizeStyles.cellSize} text-neutral-500 ${sizeStyles.cellText} font-medium`}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Days Matrix */}
      <div role="rowgroup" className={`grid ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"} gap-y-1 gap-x-1`}>
        {days.map((dayItem, index) => {
          const isRowStart = index % 7 === 0;

          // Compute cell styles for single date
          let cellStyle = "text-neutral-800 hover:bg-neutral-100";

          if (dayItem.isDisabled) {
            cellStyle = "text-neutral-300 cursor-not-allowed line-through";
          } else if (dayItem.isSelected) {
            cellStyle = `${colorStyles.selected} font-semibold shadow-xs`;
          } else if (!dayItem.isCurrentMonth) {
            cellStyle = "text-neutral-400 hover:bg-neutral-100";
          }

          const todayStyle = dayItem.isToday && !dayItem.isSelected ? `ring-1 ${colorStyles.todayRing} font-bold` : "";
          const formattedDayLabel = `${dayItem.day} ${loc.months[dayItem.month]} ${dayItem.year}`;

          const isTabbable =
            !dayItem.isDisabled &&
            (dayItem.isSelected ||
              (!hasSelected && dayItem.isToday && index === todayIndex) ||
              (!hasSelected && todayIndex === -1 && index === fallbackIndex));

          return (
            <React.Fragment key={dayItem.date.toISOString()}>
              {showWeekNumbers && isRowStart && (
                <div
                  className={`flex items-center justify-center ${sizeStyles.cellSize} text-neutral-400 ${sizeStyles.cellText} text-[10px] font-mono`}
                >
                  W{dayItem.weekNumber}
                </div>
              )}
              <div
                role="gridcell"
                aria-selected={dayItem.isSelected}
                className="flex items-center justify-center"
              >
                <button
                  type="button"
                  disabled={dayItem.isDisabled}
                  tabIndex={isTabbable ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onClick={() => !dayItem.isDisabled && onSelectDate(dayItem.date)}
                  aria-label={formattedDayLabel}
                  aria-current={dayItem.isToday ? "date" : undefined}
                  aria-disabled={dayItem.isDisabled}
                  className={`flex items-center justify-center ${sizeStyles.cellSize} ${sizeStyles.cellText} ${radiusClass} transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${cellStyle} ${todayStyle}`}
                >
                  {dayItem.day}
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
