import { DateRangeHeaderProps } from "./types";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import DoubleChevronLeftIcon from "../icons/DoubleChevronLeftIcon";
import DoubleChevronRightIcon from "../icons/DoubleChevronRightIcon";
import { dateRangePickerSizeConfig, dateRangePickerColorConfig } from "./constants";
import { resolveLocale } from "../datepicker/utils";
import { getSafeConfig } from "@/utils/function";

export default function DateRangeHeader({
  month1,
  month2,
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
}: DateRangeHeaderProps) {
  const loc = resolveLocale(locale);
  const sizeStyles = getSafeConfig(size, dateRangePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, dateRangePickerColorConfig, "primary");

  // Title Month 1
  const monthName1 = loc.months[month1.getMonth()];
  const year1 = month1.getFullYear();
  const startDecade1 = Math.floor(year1 / 10) * 10;
  const endDecade1 = startDecade1 + 9;

  let title1 = `${monthName1} ${year1}`;
  if (view === "months") title1 = `${year1}`;
  if (view === "years") title1 = `${startDecade1} - ${endDecade1}`;

  // Title Month 2
  const monthName2 = loc.months[month2.getMonth()];
  const year2 = month2.getFullYear();
  const startDecade2 = Math.floor(year2 / 10) * 10;
  const endDecade2 = startDecade2 + 9;

  let title2 = `${monthName2} ${year2}`;
  if (view === "months") title2 = `${year2}`;
  if (view === "years") title2 = `${startDecade2} - ${endDecade2}`;

  const handleTitleClick = () => {
    if (view === "days") onViewChange("months");
    else if (view === "months") onViewChange("years");
    else if (view === "years") onViewChange("days");
  };

  const handlePrev = () => {
    if (view === "days") {
      onPrevMonth();
    } else if (view === "months") {
      onPrevYear();
    } else if (view === "years") {
      if (onPrevDecade) {
        onPrevDecade();
      } else {
        onPrevYear();
      }
    }
  };

  const handleNext = () => {
    if (view === "days") {
      onNextMonth();
    } else if (view === "months") {
      onNextYear();
    } else if (view === "years") {
      if (onNextDecade) {
        onNextDecade();
      } else {
        onNextYear();
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-2 py-1.5 border-b border-neutral-200">
      {/* Cụm nút lùi bên trái */}
      <div className="flex items-center space-x-0.5">
        {view === "days" && (
          <button
            type="button"
            onClick={onPrevYear}
            aria-label="Năm trước"
            className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer`}
          >
            <DoubleChevronLeftIcon width={14} height={14} />
          </button>
        )}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Tháng trước"
          className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer`}
        >
          <ChevronLeftIcon width={sizeStyles.iconSize} height={sizeStyles.iconSize} />
        </button>
      </div>

      {/* 2 Tiêu đề hiển thị ở giữa tương ứng cho 2 cột tháng */}
      <div className="grid grid-cols-2 flex-1 text-center divide-x divide-transparent px-2">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleTitleClick}
            aria-label="Đổi chế độ xem lịch"
            className={`font-semibold text-neutral-800 hover:${colorStyles.activeText} hover:bg-neutral-100 rounded-md px-2 py-1 transition-colors cursor-pointer ${sizeStyles.headerText}`}
          >
            {title1}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleTitleClick}
            aria-label="Đổi chế độ xem lịch"
            className={`font-semibold text-neutral-800 hover:${colorStyles.activeText} hover:bg-neutral-100 rounded-md px-2 py-1 transition-colors cursor-pointer ${sizeStyles.headerText}`}
          >
            {title2}
          </button>
        </div>
      </div>

      {/* Cụm nút tiến bên phải */}
      <div className="flex items-center space-x-0.5">
        <button
          type="button"
          onClick={handleNext}
          aria-label="Tháng tiếp theo"
          className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer`}
        >
          <ChevronRightIcon width={sizeStyles.iconSize} height={sizeStyles.iconSize} />
        </button>
        {view === "days" && (
          <button
            type="button"
            onClick={onNextYear}
            aria-label="Năm tiếp theo"
            className={`flex items-center justify-center ${sizeStyles.headerButtonSize} rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer`}
          >
            <DoubleChevronRightIcon width={14} height={14} />
          </button>
        )}
      </div>
    </div>
  );
}
