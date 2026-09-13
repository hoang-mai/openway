import { useState, useId, useMemo, KeyboardEvent, MouseEvent, ReactNode } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";
import { DateTimeRange, DateTimeRangePickerProps } from "./types";
import Calendar from "../datepicker/Calendar";
import TimeView from "../timepicker/TimeView";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import CloseIcon from "../icons/CloseIcon";
import Spinner from "../icons/Spinner";
import { combineDateTime, formatDateTime, getDefaultDateTimeFormat, toDateTime } from "./utils";
import {
  dateTimeRangePickerSizeConfig,
  dateTimeRangePickerButtonColorConfig,
} from "./constants";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { DEFAULT_Z_INDEX } from "@/constants";
import { getSafeConfig } from "@/utils/function";
import { CalendarView } from "../datepicker/types";
import { dateRangeCalendarRadiusConfig, dateRangePickerRadiusConfig, dateRangePickerVariantStyles } from "@/components/daterangepicker/constants";
import { useFloatingPortalRoot } from "@/hooks/useFloatingPortalRoot";

/**
 * Component DateTimeRangePicker - Ô chọn khoảng Ngày & Giờ (Start - End) chuyên nghiệp theo Design System.
 * Hỗ trợ giao diện chuyển bước (Stepped View) giúp popover nhỏ gọn, không bị tràn màn hình.
 */
export default function DateTimeRangePicker({
  ref,
  value: controlledValue,
  defaultValue,
  onChange,
  format: customFormat,
  displayFormat: customDisplayFormat,
  separator = " - ",
  startLabel = "Thời gian bắt đầu",
  endLabel = "Thời gian kết thúc",
  layout = "side-by-side",
  locale = "vi",
  defaultView = "days",
  firstDayOfWeek = 1,
  minDate,
  maxDate,
  isDateDisabled,
  viewTabs,
  use12Hours = false,
  showSeconds = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  minTime,
  maxTime,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  size = "md",
  variant = "outline",
  color = "primary",
  radius,
  label,
  labelPlacement = "floating",
  placeholder,
  placeholders,
  helperText,
  errorMessage,
  name,
  id,
  autoComplete,
  disabled = false,
  readOnly = false,
  portal = true,
  portalRoot,
  config,
  onClear,
  placement = "bottom-start",
  className = "",
  wrapperClassName = "",
  inputWrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  popoverClassName = "",
}: DateTimeRangePickerProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = true,
    isFullWidth = true,
    closeOnSelect = false,
    showWeekNumbers = false,
    showViewTabs = false,
  } = config ?? {};

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;
  const popoverId = `${inputId}-popover`;

  const defaultFmt = getDefaultDateTimeFormat(use12Hours, showSeconds);
  const resolvedFormat = customFormat || defaultFmt;
  const baseDisplayFormat = customDisplayFormat || resolvedFormat;

  const isControlled = controlledValue !== undefined;
  const [internalRange, setInternalRange] = useState<DateTimeRange>(() => {
    const raw = defaultValue;
    if (raw && Array.isArray(raw)) {
      return [toDateTime(raw[0], resolvedFormat), toDateTime(raw[1], resolvedFormat)];
    }
    return [null, null];
  });

  const selectedRange: DateTimeRange =
    isControlled
      ? controlledValue && Array.isArray(controlledValue)
        ? [toDateTime(controlledValue[0], resolvedFormat), toDateTime(controlledValue[1], resolvedFormat)]
        : [null, null]
      : internalRange;

  const [activeStep, setActiveStep] = useState<"start" | "end">("start");
  const [activeView, setActiveView] = useState<CalendarView>(defaultView);
  const [isOpen, setIsOpen] = useState(false);

  const startText = selectedRange[0] ? formatDateTime(selectedRange[0], baseDisplayFormat, locale) : "";
  const endText = selectedRange[1] ? formatDateTime(selectedRange[1], baseDisplayFormat, locale) : "";

  const formattedValue = useMemo(() => {
    if (startText && endText) {
      return `${startText}${separator}${endText}`;
    }
    if (startText) {
      return `${startText}${separator}`;
    }
    return "";
  }, [startText, endText, separator]);

  // Floating UI setup
  const {
    refs: { setReference, setFloating },
    elements: { reference },
    floatingStyles,
    context,
  } = useFloating({
    placement,
    open: isOpen && !disabled && !readOnly && !isLoading,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    transform: false,
    middleware: [offsetMiddleware(6), flipMiddleware(), shiftMiddleware({ padding: 8 })],
  });

  const dismiss = useDismiss(context, {
    escapeKey: true,
    outsidePress: true,
  });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context);

  const effectivePortalRoot = useFloatingPortalRoot({
    portalRoot,
    reference,
  });

  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  // Style configs
  const sizeStyles = getSafeConfig(size, dateTimeRangePickerSizeConfig, "md");
  const radiusClass = getSafeConfig(radius, dateRangePickerRadiusConfig, "lg");
  const menuRadiusClass = getSafeConfig(radius, dateRangeCalendarRadiusConfig, "lg");
  const buttonColorStyle = getSafeConfig(activeColor, dateTimeRangePickerButtonColorConfig, "primary");
  const variantClass =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, dateRangePickerVariantStyles, "outline"), "primary");

  const hasValue = Boolean(selectedRange[0] || selectedRange[1]);

  // Handlers
  const emitChange = (newRange: DateTimeRange) => {
    if (!isControlled) {
      setInternalRange(newRange);
    }
    const fStart = newRange[0] ? formatDateTime(newRange[0], resolvedFormat, locale) : "";
    const fEnd = newRange[1] ? formatDateTime(newRange[1], resolvedFormat, locale) : "";
    onChange?.(fStart || fEnd ? [fStart, fEnd] : null);

    if (closeOnSelect && newRange[0] && newRange[1]) {
      setIsOpen(false);
    }
  };

  const handleCalendarChange = (newDate: Date) => {
    if (activeStep === "start") {
      const combined = combineDateTime(newDate, selectedRange[0] || new Date());
      let nextEnd = selectedRange[1];
      if (nextEnd && combined && combined.getTime() > nextEnd.getTime()) {
        nextEnd = null;
      }
      emitChange([combined, nextEnd]);
    } else {
      const combined = combineDateTime(newDate, selectedRange[1] || selectedRange[0] || new Date());
      emitChange([selectedRange[0], combined]);
    }
  };

  const handleTimeChange = (newTime: Date | null) => {
    if (!newTime) return;
    if (activeStep === "start") {
      const combined = combineDateTime(selectedRange[0] || new Date(), newTime);
      let nextEnd = selectedRange[1];
      if (nextEnd && combined && combined.getTime() > nextEnd.getTime()) {
        nextEnd = null;
      }
      emitChange([combined, nextEnd]);
    } else {
      const combined = combineDateTime(selectedRange[1] || selectedRange[0] || new Date(), newTime);
      emitChange([selectedRange[0], combined]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly || isLoading) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isControlled) {
      setInternalRange([null, null]);
    }
    onChange?.(null);
    onClear?.();
  };

  const defaultPlaceholder =
    placeholder ||
    (placeholders
      ? `${placeholders[0]}${separator}${placeholders[1]}`
      : `${baseDisplayFormat}${separator}${baseDisplayFormat}`);

  const isFloating = labelPlacement === "floating";
  const isHorizontal = labelPlacement === "left";

  // Label Element
  const renderLabel = () => (
    <FieldLabel
      htmlFor={inputId}
      label={label}
      isRequired={isRequired}
      isFloating={isFloating}
      size={size}
      color={activeColor}
      hasError={hasError}
      cursor="pointer"
      className={labelClassName}
    />
  );

  const renderIconWrapper = (iconNode: ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 text-neutral-400 leading-none select-none ${sizeStyles.icon}`}
      aria-hidden="true"
    >
      {iconNode}
    </span>
  );

  const hasFloatingLabel = isFloating && Boolean(label);

  const fieldWrapperClasses = [
    "group/field group/datetimerangepicker relative flex",
    isHorizontal ? "flex-row items-center gap-3" : "flex-col",
    hasFloatingLabel ? "pt-2" : "",
    isFullWidth ? "w-full" : "inline-flex",
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "group/input relative flex items-center transition-all duration-150 ease-in-out border select-none cursor-pointer",
    sizeStyles.inputHeight,
    radiusClass,
    variantClass,
    disabled ? "opacity-50" : "",
    isFullWidth ? "w-full" : sizeStyles.minWidth || "min-w-80",
    inputWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "w-full h-full bg-transparent outline-none border-none text-neutral-800 placeholder-neutral-400 cursor-pointer select-none caret-transparent focus:outline-none",
    sizeStyles.inputText,
    sizeStyles.inputPadding,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const currentStepDate = activeStep === "start" ? selectedRange[0] : selectedRange[1];

  return (
    <div className={fieldWrapperClasses}>
      {/* Label (Top / Left) */}
      {!isFloating && renderLabel()}

      <div className={`flex flex-col ${isFullWidth ? "w-full" : ""}`}>
        {/* Input container */}
        <div ref={setReference} {...getReferenceProps()} className={containerClasses}>
          {isFloating && renderLabel()}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            value={formattedValue}
            onClick={() => !disabled && !readOnly && !isLoading && setIsOpen((prev) => !prev)}
            onKeyDown={handleKeyDown}
            readOnly={true}
            autoComplete={autoComplete}
            placeholder={defaultPlaceholder}
            disabled={disabled || isLoading}
            role="combobox"
            aria-expanded={isOpen && !isLoading}
            aria-haspopup="dialog"
            aria-controls={popoverId}
            aria-required={isRequired}
            aria-invalid={hasError}
            aria-busy={isLoading}
            aria-disabled={disabled || isLoading}
            aria-describedby={helperText || errorMessage ? errorHelperId : undefined}
            aria-errormessage={errorMessage ? errorHelperId : undefined}
            className={inputClasses}
          />

          {/* Right actions: Spinner, Clear, ChevronDown Icon */}
          <div className="flex items-center space-x-1.5 pr-2.5 shrink-0">
            {isLoading && showSpinner && (
              <div className="flex items-center justify-center shrink-0">{renderIconWrapper(<Spinner />)}</div>
            )}

            {!isLoading && isClearable && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Xóa khoảng ngày giờ"
                tabIndex={hasValue ? 0 : -1}
                aria-hidden={!hasValue}
                className={`inline-flex items-center justify-center shrink-0 text-neutral-400 hover:text-neutral-600 active:scale-95 transition-opacity duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current rounded-full ${sizeStyles.icon} ${
                  hasValue ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <CloseIcon className="size-full" />
              </button>
            )}

            <div
              aria-hidden="true"
              className={`inline-flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-transform duration-200 ease-in-out cursor-pointer ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {renderIconWrapper(<ChevronDownIcon className="size-full" />)}
            </div>
          </div>
        </div>

        {/* Floating UI Portal */}
        {isMounted && (
          <FloatingPortal root={effectivePortalRoot}>
            <FloatingFocusManager context={context} modal={false} returnFocus={true}>
              <div
                ref={setFloating}
                id={popoverId}
                style={{
                  ...floatingStyles,
                  ...transitionStyles,
                  zIndex: DEFAULT_Z_INDEX.PICKER,
                }}
                {...getFloatingProps()}
                className={`flex flex-col bg-neutral-white border border-neutral-200/80 shadow-xl overflow-hidden select-none ${menuRadiusClass} ${popoverClassName}`}
              >
                {/* Central Picker Panel (Calendar + TimeView for Active Step) */}
                <div
                  className={`flex ${
                    layout === "stacked"
                      ? "flex-col divide-y divide-neutral-200"
                      : "flex-row divide-x divide-neutral-200"
                  }`}
                >
                  {/* Calendar Panel */}
                  <div className="flex flex-col">
                    <Calendar
                      key={`calendar-step-${activeStep}`}
                      value={currentStepDate}
                      onChange={handleCalendarChange}
                      view={activeView}
                      onViewChange={setActiveView}
                      minDate={activeStep === "end" ? selectedRange[0] || minDate : minDate}
                      maxDate={activeStep === "start" ? selectedRange[1] || maxDate : maxDate}
                      isDateDisabled={isDateDisabled}
                      locale={locale}
                      firstDayOfWeek={firstDayOfWeek}
                      showWeekNumbers={showWeekNumbers}
                      size={size}
                      color={color}
                      radius={radius}
                      showViewTabs={showViewTabs}
                      viewTabs={viewTabs}
                      className="border-none shadow-none rounded-none"
                    />
                  </div>

                  {/* Time Panel */}
                  <div className="flex flex-col justify-center items-center p-1 bg-neutral-50/50">
                    <TimeView
                      key={`timeview-step-${activeStep}`}
                      value={currentStepDate || selectedRange[0]}
                      onChange={handleTimeChange}
                      ariaLabel={activeStep === "start" ? `${startLabel} time` : `${endLabel} time`}
                      use12Hours={use12Hours}
                      showSeconds={showSeconds}
                      hourStep={hourStep}
                      minuteStep={minuteStep}
                      secondStep={secondStep}
                      minTime={activeStep === "end" ? selectedRange[0] || minTime : minTime}
                      maxTime={activeStep === "start" ? selectedRange[1] || maxTime : maxTime}
                      disabledHours={disabledHours}
                      disabledMinutes={disabledMinutes}
                      disabledSeconds={disabledSeconds}
                      size={size}
                      color={color}
                      radius={radius}
                      className="border-none shadow-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Bottom Step Switching & Action Buttons */}
                <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-3 py-2">
                  <div className="flex items-center space-x-2">
                    {/* Button Quay lại Bắt đầu */}
                    <button
                      type="button"
                      onClick={() => setActiveStep("start")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                        activeStep === "start"
                          ? buttonColorStyle.activeStep
                          : "bg-neutral-white border-neutral-300 hover:bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      ← {startLabel}
                    </button>

                    {/* Button Chuyển sang Kết thúc */}
                    <button
                      type="button"
                      onClick={() => setActiveStep("end")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                        activeStep === "end"
                          ? buttonColorStyle.activeStep
                          : "bg-neutral-white border-neutral-300 hover:bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {endLabel} →
                    </button>
                  </div>

                  {/* Nút Áp dụng / Hoàn tất */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${buttonColorStyle.applyButton}`}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}

        {/* Helper / Error text with animation */}
        <HelperErrorText
          id={errorHelperId}
          helperText={helperText}
          errorMessage={errorMessage}
          sizeClassName={sizeStyles.helper}
          className={helperClassName}
        />
      </div>
    </div>
  );
}
