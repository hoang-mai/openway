import { useState, useMemo } from "react";
import { CalendarProps, CalendarView } from "./types";
import CalendarHeader from "./CalendarHeader";
import DayGrid from "./DayGrid";
import MonthGrid from "./MonthGrid";
import YearGrid from "./YearGrid";
import Tabs from "../tabs/Tabs";
import TabList from "../tabs/TabList";
import Tab from "../tabs/Tab";
import { generateCalendarGrid, resolveLocale, toDate } from "./utils";
import { calendarRadiusConfig, datePickerSizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export default function Calendar({
  value: selectedDate,
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
}: CalendarProps) {
  const sizeStyles = getSafeConfig(size, datePickerSizeConfig, "md");
  const radiusClass = getSafeConfig(radius, calendarRadiusConfig, "lg");

  // gridMode controls the current grid (DayGrid / MonthGrid / YearGrid)
  // view controls the Tab mode (the target selection: days -> DD/MM/YYYY, months -> MM/YYYY, years -> YYYY)
  const [gridMode, setGridMode] = useState<CalendarView>(view);
  const [prevView, setPrevView] = useState<CalendarView>(view);

  if (view !== prevView) {
    setPrevView(view);
    setGridMode(view);
  }

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const base = selectedDate || new Date();
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
    onViewChange?.(nextView);
  };

  // Month navigation handlers
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

  // Month / Year selection handlers
  const handleSelectMonth = (monthIndex: number) => {
    const updated = new Date(currentMonth.getFullYear(), monthIndex, 1);
    setCurrentMonth(updated);
    if (view === "months") {
      onChange?.(updated);
    } else {
      setGridMode("days");
    }
  };

  const handleSelectYear = (yr: number) => {
    const updated = new Date(yr, currentMonth.getMonth(), 1);
    setCurrentMonth(updated);
    if (view === "years") {
      onChange?.(updated);
    } else if (view === "months") {
      setGridMode("months");
    } else {
      setGridMode("months");
    }
  };

  // Pre-calculated days grid for single date
  const parsedMin = toDate(minDate);
  const parsedMax = toDate(maxDate);

  const daysGrid = useMemo(
    () =>
      generateCalendarGrid(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        firstDayOfWeek,
        selectedDate,
        parsedMin,
        parsedMax,
        isDateDisabled
      ),
    [currentMonth, firstDayOfWeek, selectedDate, parsedMin, parsedMax, isDateDisabled]
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

      {/* Calendar Body */}
      <div className={`${sizeStyles.calendarPadding} min-w-70`}>
        <CalendarHeader
          currentMonth={currentMonth}
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
          showMonthButtons={true}
        />

        {gridMode === "days" && (
          <DayGrid
            days={daysGrid}
            onSelectDate={(date) => onChange?.(date)}
            size={size}
            color={color}
            radius={radius}
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
            showWeekNumbers={showWeekNumbers}
          />
        )}

        {gridMode === "months" && (
          <MonthGrid
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onSelectMonth={handleSelectMonth}
            size={size}
            color={color}
            radius={radius}
            locale={locale}
          />
        )}

        {gridMode === "years" && (
          <YearGrid
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onSelectYear={handleSelectYear}
            size={size}
            color={color}
            radius={radius}
          />
        )}
      </div>
    </div>
  );
}
