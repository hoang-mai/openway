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
import { TimeRange, TimeRangePickerProps } from "./types";
import TimeView from "../timepicker/TimeView";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import CloseIcon from "../icons/CloseIcon";
import Spinner from "../icons/Spinner";
import { formatTime, getDefaultFormat, parseTimeToDate } from "../timepicker/utils";
import {
  timeRangePickerRadiusConfig,
  timeRangePickerSizeConfig,
  timeRangePickerVariantStyles,
  timeRangeViewRadiusConfig,
  labelColorConfig,
} from "./constants";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { DEFAULT_Z_INDEX } from "@/constants";
import { getSafeConfig } from "@/utils/function";
import { useFloatingPortalRoot } from "@/hooks/useFloatingPortalRoot";

/**
 * Component TimeRangePicker - Ô chọn khoảng thời gian (Start Time - End Time) chuyên nghiệp theo Design System.
 * Hỗ trợ giao diện 2 bảng chọn song song, linh hoạt định dạng, nhãn tuỳ biến, và WAI-ARIA combobox.
 */
export default function TimeRangePicker({
  ref,
  value: controlledValue,
  defaultValue,
  onChange,
  format: customFormat,
  displayFormat: customDisplayFormat,
  separator = " - ",
  startLabel = "Thời gian bắt đầu",
  endLabel = "Thời gian kết thúc",
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
}: TimeRangePickerProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = true,
    isFullWidth = true,
    closeOnSelect = false,
  } = config ?? {};

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;
  const popoverId = `${inputId}-popover`;

  const defaultFmt = getDefaultFormat(use12Hours, showSeconds);
  const resolvedFormat = customFormat || defaultFmt;
  const resolvedDisplayFormat = customDisplayFormat || resolvedFormat;

  const isControlled = controlledValue !== undefined;
  const [internalRange, setInternalRange] = useState<TimeRange>(() => {
    const raw = defaultValue;
    if (raw && Array.isArray(raw)) {
      return [parseTimeToDate(raw[0]), parseTimeToDate(raw[1])];
    }
    return [null, null];
  });

  const selectedRange: TimeRange =
    isControlled && controlledValue && Array.isArray(controlledValue)
      ? [parseTimeToDate(controlledValue[0]), parseTimeToDate(controlledValue[1])]
      : internalRange;

  const startText = selectedRange[0]
    ? formatTime(selectedRange[0], resolvedDisplayFormat)
    : "";
  const endText = selectedRange[1]
    ? formatTime(selectedRange[1], resolvedDisplayFormat)
    : "";

  const formattedValue = useMemo(() => {
    if (startText && endText) {
      return `${startText}${separator}${endText}`;
    }
    if (startText) {
      return `${startText}${separator}`;
    }
    return "";
  }, [startText, endText, separator]);

  const [isOpen, setIsOpen] = useState(false);

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
  const sizeStyles = getSafeConfig(size, timeRangePickerSizeConfig, "md");
  const radiusClass = getSafeConfig(radius, timeRangePickerRadiusConfig, "lg");
  const menuRadiusClass = getSafeConfig(radius, timeRangeViewRadiusConfig, "lg");
  const variantClass =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, timeRangePickerVariantStyles, "outline"), "primary");

  const hasValue = Boolean(selectedRange[0] || selectedRange[1]);

  // Handlers
  const handleStartTimeSelect = (date: Date) => {
    const newRange: TimeRange = [date, selectedRange[1]];
    if (!isControlled) {
      setInternalRange(newRange);
    }
    const fStart = formatTime(date, resolvedFormat);
    const fEnd = selectedRange[1] ? formatTime(selectedRange[1], resolvedFormat) : "";
    onChange?.([fStart, fEnd]);
  };

  const handleEndTimeSelect = (date: Date) => {
    const newRange: TimeRange = [selectedRange[0], date];
    if (!isControlled) {
      setInternalRange(newRange);
    }
    const fStart = selectedRange[0] ? formatTime(selectedRange[0], resolvedFormat) : "";
    const fEnd = formatTime(date, resolvedFormat);
    onChange?.([fStart, fEnd]);

    if (closeOnSelect) {
      setIsOpen(false);
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
      : `${resolvedDisplayFormat}${separator}${resolvedDisplayFormat}`);

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
      colorConfig={labelColorConfig}
      isOpen={isOpen && !isLoading}
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
    "group/field group/timerangepicker relative flex",
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
    isFullWidth ? "w-full" : "w-auto",
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

  return (
    <div
      className={fieldWrapperClasses}
      data-state={isOpen && !isLoading ? "open" : "closed"}
    >
      {/* Label (Top / Left) */}
      {!isFloating && renderLabel()}

      <div className={`flex flex-col ${isFullWidth ? "w-full" : ""}`}>
        {/* Input container */}
        <div
          ref={setReference}
          {...getReferenceProps()}
          data-state={isOpen && !isLoading ? "open" : "closed"}
          aria-expanded={isOpen && !isLoading}
          className={containerClasses}
        >
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
                aria-label="Xóa khoảng thời gian"
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
                className={`flex flex-row bg-neutral-white border border-neutral-200/80 shadow-xl divide-x divide-neutral-200 overflow-hidden select-none ${menuRadiusClass} ${popoverClassName}`}
              >
                {/* Start Time panel */}
                <div className="flex flex-col">
                  <div className="px-3 py-1.5 bg-neutral-50 text-xs font-semibold text-neutral-600 border-b border-neutral-200 text-center">
                    {startLabel}
                  </div>
                  <TimeView
                    value={selectedRange[0]}
                    onChange={handleStartTimeSelect}
                    ariaLabel={startLabel}
                    use12Hours={use12Hours}
                    showSeconds={showSeconds}
                    hourStep={hourStep}
                    minuteStep={minuteStep}
                    secondStep={secondStep}
                    minTime={minTime}
                    maxTime={selectedRange[1] || maxTime}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                    disabledSeconds={disabledSeconds}
                    size={size}
                    color={color}
                    radius={radius}
                    className="border-none shadow-none"
                  />
                </div>

                {/* End Time panel */}
                <div className="flex flex-col">
                  <div className="px-3 py-1.5 bg-neutral-50 text-xs font-semibold text-neutral-600 border-b border-neutral-200 text-center">
                    {endLabel}
                  </div>
                  <TimeView
                    value={selectedRange[1]}
                    onChange={handleEndTimeSelect}
                    ariaLabel={endLabel}
                    use12Hours={use12Hours}
                    showSeconds={showSeconds}
                    hourStep={hourStep}
                    minuteStep={minuteStep}
                    secondStep={secondStep}
                    minTime={selectedRange[0] || minTime}
                    maxTime={maxTime}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                    disabledSeconds={disabledSeconds}
                    size={size}
                    color={color}
                    radius={radius}
                    className="border-none shadow-none"
                  />
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
