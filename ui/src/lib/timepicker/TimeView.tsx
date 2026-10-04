import { useMemo } from "react";
import { TimePeriod, TimeViewProps } from "./types";
import { timePickerSizeConfig, timeViewRadiusConfig } from "./constants";
import {
  checkIsDisabled,
  createDateWithTime,
  formatTime,
  getDefaultFormat,
  padZero,
  parseTimeToDate,
} from "./utils";
import { getSafeConfig } from "@/utils/function";
import { useLocale } from "@/locale";
import TimeColumn from "./TimeColumn";

/**
 * Component hiển thị bảng điều khiển chọn thời gian dạng lưới các cột cuộn (Giờ, Phút, Giây, AM/PM)
 * Có thể sử dụng độc lập (Standalone) hoặc bên trong Popover của TimePicker/TimeRangePicker.
 */
export default function TimeView({
  value,
  onChange,
  ariaLabel = "Time selector",
  use12Hours = false,
  showSeconds = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  minTime: customMinTime,
  maxTime: customMaxTime,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  size = "md",
  color = "primary",
  radius,
  className = "",
}: TimeViewProps) {
  const timePickerLocale = useLocale("timePicker");
  const minTime = useMemo(() => parseTimeToDate(customMinTime), [customMinTime]);
  const maxTime = useMemo(() => parseTimeToDate(customMaxTime), [customMaxTime]);

  const defaultFormat = getDefaultFormat(use12Hours, showSeconds);

  const radiusClass = getSafeConfig(radius, timeViewRadiusConfig, "lg");
  const sizeStyles = getSafeConfig(size, timePickerSizeConfig, "md");

  // Current values
  const currentHour24 = value ? value.getHours() : 0;
  const currentHour12 = currentHour24 % 12 === 0 ? 12 : currentHour24 % 12;
  const currentMinute = value ? value.getMinutes() : 0;
  const currentSecond = value ? value.getSeconds() : 0;
  const currentPeriod: TimePeriod = currentHour24 >= 12 ? "PM" : "AM";

  // Generate Hour items
  const hourItems = useMemo(() => {
    const items = [];
    if (use12Hours) {
      for (let h = 1; h <= 12; h += hourStep) {
        const corresponding24 =
          currentPeriod === "PM" ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h;

        const disabled = checkIsDisabled(
          "hour",
          corresponding24,
          currentHour24,
          currentMinute,
          minTime,
          maxTime,
          disabledHours,
          disabledMinutes,
          disabledSeconds
        );

        items.push({
          value: h,
          label: padZero(h),
          disabled,
        });
      }
    } else {
      for (let h = 0; h < 24; h += hourStep) {
        const disabled = checkIsDisabled(
          "hour",
          h,
          currentHour24,
          currentMinute,
          minTime,
          maxTime,
          disabledHours,
          disabledMinutes,
          disabledSeconds
        );

        items.push({
          value: h,
          label: padZero(h),
          disabled,
        });
      }
    }
    return items;
  }, [
    use12Hours,
    hourStep,
    currentPeriod,
    currentHour24,
    currentMinute,
    minTime,
    maxTime,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
  ]);

  // Generate Minute items
  const minuteItems = useMemo(() => {
    const items = [];
    for (let m = 0; m < 60; m += minuteStep) {
      const disabled = checkIsDisabled(
        "minute",
        m,
        currentHour24,
        currentMinute,
        minTime,
        maxTime,
        disabledHours,
        disabledMinutes,
        disabledSeconds
      );

      items.push({
        value: m,
        label: padZero(m),
        disabled,
      });
    }
    return items;
  }, [
    minuteStep,
    currentHour24,
    currentMinute,
    minTime,
    maxTime,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
  ]);

  // Generate Second items
  const secondItems = useMemo(() => {
    if (!showSeconds) return [];
    const items = [];
    for (let s = 0; s < 60; s += secondStep) {
      const disabled = checkIsDisabled(
        "second",
        s,
        currentHour24,
        currentMinute,
        minTime,
        maxTime,
        disabledHours,
        disabledMinutes,
        disabledSeconds
      );

      items.push({
        value: s,
        label: padZero(s),
        disabled,
      });
    }
    return items;
  }, [
    showSeconds,
    secondStep,
    currentHour24,
    currentMinute,
    minTime,
    maxTime,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
  ]);

  // Period items (AM / PM)
  const periodItems = useMemo(
    () => [
      { value: "AM", label: "AM" },
      { value: "PM", label: "PM" },
    ],
    []
  );

  // Handlers for selecting units
  const handleHourSelect = (val: number | string) => {
    let hourNum = Number(val);
    if (use12Hours) {
      if (currentPeriod === "PM" && hourNum < 12) hourNum += 12;
      if (currentPeriod === "AM" && hourNum === 12) hourNum = 0;
    }
    const newDate = createDateWithTime(hourNum, currentMinute, currentSecond);
    onChange?.(newDate);
  };

  const handleMinuteSelect = (val: number | string) => {
    const minuteNum = Number(val);
    const newDate = createDateWithTime(currentHour24, minuteNum, currentSecond);
    onChange?.(newDate);
  };

  const handleSecondSelect = (val: number | string) => {
    const secondNum = Number(val);
    const newDate = createDateWithTime(currentHour24, currentMinute, secondNum);
    onChange?.(newDate);
  };

  const handlePeriodSelect = (val: number | string) => {
    const p = val as TimePeriod;
    let newHour = currentHour24;
    if (p === "AM" && newHour >= 12) {
      newHour -= 12;
    } else if (p === "PM" && newHour < 12) {
      newHour += 12;
    }
    const newDate = createDateWithTime(newHour, currentMinute, currentSecond);
    onChange?.(newDate);
  };

  const placeholderHeader = showSeconds ? "--:--:--" : "--:--";

  return (
    <div
      aria-label={ariaLabel}
      className={`inline-flex flex-col bg-neutral-white border border-neutral-200/80 shadow-xl overflow-hidden select-none ${radiusClass} ${className}`}
    >
      {/* Header with currently selected time */}
      <div className="flex items-center justify-center px-4 py-2 border-b border-neutral-200 bg-neutral-50/50">
        <span className={`text-neutral-700 tracking-wider font-mono ${sizeStyles.headerText}`}>
          {value ? formatTime(value, defaultFormat) : placeholderHeader}
        </span>
      </div>

      {/* Columns Container */}
      <div className={`flex divide-x divide-neutral-200 ${sizeStyles.panelPadding}`}>
        {/* Hours Column */}
        <TimeColumn
          ariaLabel={timePickerLocale.hours}
          items={hourItems}
          selectedValue={use12Hours ? currentHour12 : value ? currentHour24 : null}
          onSelect={handleHourSelect}
          size={size}
          color={color}
          radius={radius}
        />

        {/* Minutes Column */}
        <TimeColumn
          ariaLabel={timePickerLocale.minutes}
          items={minuteItems}
          selectedValue={value ? currentMinute : null}
          onSelect={handleMinuteSelect}
          size={size}
          color={color}
          radius={radius}
        />

        {/* Seconds Column */}
        {showSeconds && (
          <TimeColumn
            ariaLabel={timePickerLocale.seconds}
            items={secondItems}
            selectedValue={value ? currentSecond : null}
            onSelect={handleSecondSelect}
            size={size}
            color={color}
            radius={radius}
          />
        )}

        {/* Period (AM/PM) Column */}
        {use12Hours && (
          <TimeColumn
            ariaLabel={timePickerLocale.period}
            items={periodItems}
            selectedValue={value ? currentPeriod : null}
            onSelect={handlePeriodSelect}
            size={size}
            color={color}
            radius={radius}
          />
        )}
      </div>
    </div>
  );
}
