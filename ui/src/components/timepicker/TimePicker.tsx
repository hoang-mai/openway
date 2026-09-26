import { useState, useId, KeyboardEvent, MouseEvent, ReactNode } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  useDismiss,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";
import { TimePickerProps } from "./types";
import TimeView from "./TimeView";
import TimePickerTrigger from "./TimePickerTrigger";
import { formatTime, getDefaultFormat, parseTimeToDate } from "./utils";
import {
  timePickerRadiusConfig,
  timePickerSizeConfig,
  timePickerVariantStyles,
  labelColorConfig,
} from "./constants";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { DEFAULT_Z_INDEX } from "@/constants";
import { getSafeConfig } from "@/utils/function";
import { useFloatingPortalRoot } from "@/hooks/useFloatingPortalRoot";
import { useLocale } from "@/locale";

export default function TimePicker({
  ref,
  value: controlledValue,
  defaultValue,
  onChange,
  format = "HH:mm:ss",
  displayFormat: customDisplayFormat,
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
  helperText,
  errorMessage,
  name,
  id,
  autoComplete,
  onClear,
  placement = "bottom-start",
  disabled = false,
  readOnly = false,
  portalRoot,
  config,
  className = "",
  wrapperClassName = "",
  inputWrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  popoverClassName = "",
}: TimePickerProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = true,
    isFullWidth = true,
    closeOnSelect = false,
  } = config ?? {};

  const timePickerLocale = useLocale("timePicker");
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;
  const popoverId = `${inputId}-popover`;

  const defaultFmt = getDefaultFormat(use12Hours, showSeconds);
  const resolvedFormat = format || defaultFmt;
  const baseDisplayFormat = customDisplayFormat || resolvedFormat;

  const isControlled = controlledValue !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(() => parseTimeToDate(defaultValue));
  const selectedTime = isControlled ? parseTimeToDate(controlledValue) : internalDate;
  const formattedValue = selectedTime ? formatTime(selectedTime, baseDisplayFormat) : "";

  const [isOpen, setIsOpen] = useState(false);

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
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context);

  const effectivePortalRoot = useFloatingPortalRoot({
    portalRoot,
    reference,
  });

  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  // Style configs
  const sizeStyles = getSafeConfig(size, timePickerSizeConfig, "md");
  const radiusClass = getSafeConfig(radius, timePickerRadiusConfig, "lg");
  const variantClass =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, timePickerVariantStyles, "outline"), "primary");

  const hasValue = Boolean(selectedTime);

  const handleTimeSelect = (time: Date | null) => {
    if (!isControlled) {
      setInternalDate(time);
    }
    const formattedOutput = time ? formatTime(time, resolvedFormat) : "";
    onChange?.(formattedOutput);

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
      setInternalDate(null);
    }
    onChange?.(null);
    onClear?.();
  };

  const defaultPlaceholder = placeholder || baseDisplayFormat;

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
    "group/field group/timepicker relative flex",
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
        <TimePickerTrigger
          setReference={setReference}
          getReferenceProps={getReferenceProps}
          isOpen={isOpen}
          isLoading={isLoading}
          containerClasses={containerClasses}
          isFloating={isFloating}
          renderLabel={renderLabel}
          ref={ref}
          inputId={inputId}
          name={name}
          formattedValue={formattedValue}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          defaultPlaceholder={defaultPlaceholder}
          popoverId={popoverId}
          isRequired={isRequired}
          hasError={hasError}
          errorHelperId={errorHelperId}
          errorMessage={errorMessage}
          helperText={helperText}
          inputClasses={inputClasses}
          showSpinner={showSpinner}
          renderIconWrapper={renderIconWrapper}
          isClearable={isClearable}
          clearText={timePickerLocale.clearText}
          hasValue={hasValue}
          iconSizeClass={sizeStyles.icon}
          onToggleOpen={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
        />

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
                className={popoverClassName}
              >
                <TimeView
                  value={selectedTime}
                  onChange={handleTimeSelect}
                  ariaLabel={typeof label === "string" ? `${label} selector` : "Time selector"}
                  use12Hours={use12Hours}
                  showSeconds={showSeconds}
                  hourStep={hourStep}
                  minuteStep={minuteStep}
                  secondStep={secondStep}
                  minTime={minTime}
                  maxTime={maxTime}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                  disabledSeconds={disabledSeconds}
                  size={size}
                  color={color}
                  radius={radius}
                />
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
