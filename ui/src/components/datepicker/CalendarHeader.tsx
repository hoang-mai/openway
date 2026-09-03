import React from "react";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import DoubleChevronLeftIcon from "../icons/DoubleChevronLeftIcon";
import DoubleChevronRightIcon from "../icons/DoubleChevronRightIcon";
import { CalendarHeaderProps } from "./types";
import { datePickerSizeConfig, datePickerColorConfig } from "./constants";
import { resolveLocale } from "./utils";
import { getSafeConfig } from "@/utils/function";

export default function CalendarHeader({
  currentMonth,
  view,
  onViewChange,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onPrevDecade,
  onNextDecade,
  size = "md",
  color = "primary",
  locale,
  showMonthButtons = true,
}: CalendarHeaderProps) {
  const loc = resolveLocale(locale);
  const sizeStyles = getSafeConfig(size, datePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, datePickerColorConfig, "primary");

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Decade range
  const decadeStart = Math.floor(year / 10) * 10;
  const decadeEnd = decadeStart + 9;

  const handleTitleClick = () => {
    if (view === "days") {
      onViewChange("months");
    } else if (view === "months") {
      onViewChange("years");
    } else if (view === "years") {
      onViewChange("days");
    }
  };

  const handlePrev = () => {
    if (view === "years") {
      if (onPrevDecade) {
        onPrevDecade();
      } else {
        onPrevYear();
      }
    } else if (view === "months") {
      onPrevYear();
    } else {
      onPrevMonth();
    }
  };

  const handleNext = () => {
    if (view === "years") {
      if (onNextDecade) {
        onNextDecade();
      } else {
        onNextYear();
      }
    } else if (view === "months") {
      onNextYear();
    } else {
      onNextMonth();
    }
  };

  const getTitle = () => {
    if (view === "years") {
      return `${decadeStart} - ${decadeEnd}`;
    }
    if (view === "months") {
      return `${year}`;
    }
    return `${loc.months[month]} ${year}`;
  };

  return (
    <div className="flex items-center justify-between px-1 pb-1.5 border-b border-neutral-200">
      <div className="flex items-center space-x-0.5">
        {/* Double Prev (Year/Decade) */}
        {view === "days" && (
          <button
            type="button"
            onClick={onPrevYear}
            aria-label="Năm trước"
            className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors`}
          >
            <DoubleChevronLeftIcon width={14} height={14} />
          </button>
        )}

        {/* Single Prev */}
        {showMonthButtons && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Tháng trước"
            className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors`}
          >
            <ChevronLeftIcon width={14} height={14} />
          </button>
        )}
      </div>

      {/* Center Title View Switcher */}
      <button
        type="button"
        onClick={handleTitleClick}
        className={`${sizeStyles.headerText} px-2 py-1 rounded-md text-neutral-800 hover:bg-neutral-100 hover:${colorStyles.activeText} transition-colors cursor-pointer`}
      >
        {getTitle()}
      </button>

      <div className="flex items-center space-x-0.5">
        {/* Single Next */}
        {showMonthButtons && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Tháng tiếp theo"
            className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors`}
          >
            <ChevronRightIcon width={14} height={14} />
          </button>
        )}

        {/* Double Next (Year/Decade) */}
        {view === "days" && (
          <button
            type="button"
            onClick={onNextYear}
            aria-label="Năm tiếp theo"
            className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors`}
          >
            <DoubleChevronRightIcon width={14} height={14} />
          </button>
        )}
      </div>
    </div>
  );
}
