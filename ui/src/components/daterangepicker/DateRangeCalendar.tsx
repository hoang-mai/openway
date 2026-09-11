import { useState, useMemo } from "react";
import { DateRangeCalendarProps } from "./types";
import DateRangeHeader from "./DateRangeHeader";
import DateRangeDayGrid from "./DateRangeDayGrid";
import DateRangeMonthGrid from "./DateRangeMonthGrid";
import DateRangeYearGrid from "./DateRangeYearGrid";
import Tabs from "../tabs/Tabs";
import TabList from "../tabs/TabList";
import Tab from "../tabs/Tab";
import { generateRangeCalendarGrid } from "./utils";
import { resolveLocale, toDate } from "../datepicker/utils";
import { dateRangeCalendarRadiusConfig, dateRangePickerSizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { CalendarView } from "../datepicker/types";

export default function DateRangeCalendar({
  value,
  onChange,
  view = "days",
  onViewChange,
  minDate,
  maxDate,
  isDateDisabled,
  locale = "vi",
  firstDayOfWeek = 1,
  showWeekNumbers = false,
  showViewTabs = false,
  viewTabs = ["days", "months", "years"],
  size = "md",
  color = "primary",
  radius,
  className = "",
  bordered = true,
}: DateRangeCalendarProps) {
  const sizeStyles = getSafeConfig(size, dateRangePickerSizeConfig, "md");
  const radiusClass = getSafeConfig(radius, dateRangeCalendarRadiusConfig, "lg");

  const [gridMode, setGridMode] = useState<CalendarView>(view);
  const [prevView, setPrevView] = useState<CalendarView>(view);

  if (view !== prevView) {
    setPrevView(view);
    setGridMode(view);
  }

  // Range passed from DateRangePicker
  const parsedRangeStart = value ? value[0] : null;
  const parsedRangeEnd = value ? value[1] : null;

  // Current navigation month (defaults to range start or today)
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const base = parsedRangeStart || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  // Tabs
  const loc = resolveLocale(locale);
  const tabItems = useMemo(() => {
    const tabLabels = loc.viewTabs || {
      days: "Ngày",
      months: "Tháng",
      years: "Năm",
    };
    return (viewTabs || ["days", "months", "years"]).map((v) => ({
      key: v,
      label: tabLabels[v] || v,
    }));
  }, [viewTabs, loc.viewTabs]);

  const handleTabChange = (key: string | number) => {
    const nextView = key as CalendarView;
    setGridMode(nextView);
    setRangeSelectionStart(null);
    onViewChange?.(nextView);
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(next);
  };

  const handlePrevYear = () => {
    const prev = new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1);
    setCurrentMonth(prev);
  };

  const handleNextYear = () => {
    const next = new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1);
    setCurrentMonth(next);
  };

  const handlePrevDecade = () => {
    const prev = new Date(currentMonth.getFullYear() - 10, currentMonth.getMonth(), 1);
    setCurrentMonth(prev);
  };

  const handleNextDecade = () => {
    const next = new Date(currentMonth.getFullYear() + 10, currentMonth.getMonth(), 1);
    setCurrentMonth(next);
  };

  // Range selection logic
  const [rangeSelectionStart, setRangeSelectionStart] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleSelectDate = (date: Date) => {
    if (!rangeSelectionStart) {
      // Step 1: Chọn ngày bắt đầu
      setRangeSelectionStart(date);
      onChange?.([date, null]);
    } else {
      // Step 2: Chọn ngày kết thúc và hoàn tất range
      let start = rangeSelectionStart;
      let end = date;
      if (date.getTime() < start.getTime()) {
        start = date;
        end = rangeSelectionStart;
      }
      setRangeSelectionStart(null);
      onChange?.([start, end]);
    }
  };

  const handleSelectMonthForYear = (targetYear: number, monthIndex: number) => {
    const selectedDateObj = new Date(targetYear, monthIndex, 1);
    setCurrentMonth(selectedDateObj);
    if (view === "months") {
      if (!rangeSelectionStart) {
        setRangeSelectionStart(selectedDateObj);
        onChange?.([selectedDateObj, null]);
      } else {
        let start = rangeSelectionStart;
        let end = selectedDateObj;
        if (selectedDateObj.getTime() < start.getTime()) {
          start = selectedDateObj;
          end = rangeSelectionStart;
        }
        setRangeSelectionStart(null);
        onChange?.([start, end]);
      }
    } else {
      setGridMode("days");
    }
  };

  const handleSelectYear = (yr: number) => {
    const selectedDateObj = new Date(yr, 0, 1);
    setCurrentMonth(selectedDateObj);
    if (view === "years") {
      if (!rangeSelectionStart) {
        setRangeSelectionStart(selectedDateObj);
        onChange?.([selectedDateObj, null]);
      } else {
        let start = rangeSelectionStart;
        let end = selectedDateObj;
        if (selectedDateObj.getTime() < start.getTime()) {
          start = selectedDateObj;
          end = rangeSelectionStart;
        }
        setRangeSelectionStart(null);
        onChange?.([start, end]);
      }
    } else if (view === "months") {
      setGridMode("months");
    } else {
      setGridMode("months");
    }
  };

  // Min/Max dates
  const parsedMin = toDate(minDate);
  const parsedMax = toDate(maxDate);

  // Panels calculation (Month 1 and Month 2)
  const month1 = currentMonth;
  const month2 = useMemo(() => {
    if (gridMode === "months") {
      return new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1);
    }
    if (gridMode === "years") {
      return new Date(currentMonth.getFullYear() + 10, currentMonth.getMonth(), 1);
    }
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }, [currentMonth, gridMode]);

  // Current visual selection range
  const currentRangeStart = rangeSelectionStart || parsedRangeStart;
  const currentRangeEnd = rangeSelectionStart ? null : parsedRangeEnd;

  const daysMonth1 = useMemo(
    () =>
      generateRangeCalendarGrid(
        month1.getFullYear(),
        month1.getMonth(),
        firstDayOfWeek,
        currentRangeStart,
        currentRangeEnd,
        hoveredDate,
        parsedMin,
        parsedMax,
        isDateDisabled
      ),
    [month1, firstDayOfWeek, currentRangeStart, currentRangeEnd, hoveredDate, parsedMin, parsedMax, isDateDisabled]
  );

  const daysMonth2 = useMemo(
    () =>
      generateRangeCalendarGrid(
        month2.getFullYear(),
        month2.getMonth(),
        firstDayOfWeek,
        currentRangeStart,
        currentRangeEnd,
        hoveredDate,
        parsedMin,
        parsedMax,
        isDateDisabled
      ),
    [month2, firstDayOfWeek, currentRangeStart, currentRangeEnd, hoveredDate, parsedMin, parsedMax, isDateDisabled]
  );

  return (
    <div
      className={`inline-flex flex-col ${
        bordered ? "border-2 border-neutral-200 bg-neutral-white shadow-xl" : "border-0 shadow-none bg-transparent"
      } ${radiusClass} overflow-hidden select-none ${className}`}
    >
      {/* View Switcher Tabs (Days / Months / Years) */}
      {showViewTabs && tabItems.length > 0 && (
        <div className="px-2.5 py-1.5 border-b border-neutral-200">
          <Tabs
            activeKey={view}
            onChange={handleTabChange}
            size="sm"
            variant="solid"
            color={color}
            fullWidth={true}
            className="gap-0!"
          >
            <TabList className="p-0.5">
              {tabItems.map((item) => (
                <Tab key={item.key} value={item.key} className="py-1 px-2 text-xs">
                  {item.label}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
      )}

      {/* 1. Unified Header Spanning Across Both Months */}
      <DateRangeHeader
        month1={month1}
        month2={month2}
        view={gridMode}
        onViewChange={setGridMode}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
        onPrevDecade={handlePrevDecade}
        onNextDecade={handleNextDecade}
        size={size}
        color={color}
        locale={locale}
      />

      {/* 2. Two Month Panels Side by Side */}
      <div className="flex flex-row divide-x divide-neutral-200">
        {/* Month 1 Panel */}
        <div className={`${sizeStyles.calendarPadding} min-w-70`}>
          {gridMode === "days" && (
            <DateRangeDayGrid
              days={daysMonth1}
              onSelectDate={handleSelectDate}
              onHoverDate={setHoveredDate}
              size={size}
              color={color}
              radius={radius}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              showWeekNumbers={showWeekNumbers}
            />
          )}

          {gridMode === "months" && (
            <DateRangeMonthGrid
              currentMonth={month1}
              onSelectMonth={(mIdx) => handleSelectMonthForYear(month1.getFullYear(), mIdx)}
              size={size}
              color={color}
              radius={radius}
              locale={locale}
              rangeStart={currentRangeStart}
              rangeEnd={currentRangeEnd}
              hoveredDate={hoveredDate}
              onHoverMonth={setHoveredDate}
            />
          )}

          {gridMode === "years" && (
            <DateRangeYearGrid
              currentMonth={month1}
              onSelectYear={handleSelectYear}
              size={size}
              color={color}
              radius={radius}
              rangeStart={currentRangeStart}
              rangeEnd={currentRangeEnd}
              hoveredDate={hoveredDate}
              onHoverYear={setHoveredDate}
            />
          )}
        </div>

        {/* Month 2 Panel */}
        <div className={`${sizeStyles.calendarPadding} min-w-70`}>
          {gridMode === "days" && (
            <DateRangeDayGrid
              days={daysMonth2}
              onSelectDate={handleSelectDate}
              onHoverDate={setHoveredDate}
              size={size}
              color={color}
              radius={radius}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              showWeekNumbers={showWeekNumbers}
            />
          )}

          {gridMode === "months" && (
            <DateRangeMonthGrid
              currentMonth={month2}
              onSelectMonth={(mIdx) => handleSelectMonthForYear(month2.getFullYear(), mIdx)}
              size={size}
              color={color}
              radius={radius}
              locale={locale}
              rangeStart={currentRangeStart}
              rangeEnd={currentRangeEnd}
              hoveredDate={hoveredDate}
              onHoverMonth={setHoveredDate}
            />
          )}

          {gridMode === "years" && (
            <DateRangeYearGrid
              currentMonth={month2}
              onSelectYear={handleSelectYear}
              size={size}
              color={color}
              radius={radius}
              rangeStart={currentRangeStart}
              rangeEnd={currentRangeEnd}
              hoveredDate={hoveredDate}
              onHoverYear={setHoveredDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
