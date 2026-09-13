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
import { DatePickerProps, CalendarView } from "./types";
import Calendar from "./Calendar";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import CloseIcon from "../icons/CloseIcon";
import Spinner from "../icons/Spinner";
import { formatDate, toDate, getAdaptiveViewFormat } from "./utils";
import { datePickerRadiusConfig, datePickerSizeConfig, datePickerVariantStyles } from "./constants";
import HelperErrorText from "@/components/common/HelperErrorText";
import FieldLabel from "@/components/common/FieldLabel";
import { DEFAULT_Z_INDEX } from "@/constants";
import { getSafeConfig } from "@/utils/function";
import { useFloatingPortalRoot } from "@/hooks/useFloatingPortalRoot";

export default function DatePicker({
  ref,
  value: controlledValue,
  defaultValue,
  onChange,
  format = "DD/MM/YYYY",
  displayFormat: customDisplayFormat,
  defaultView = "days",
  locale = "vi",
  firstDayOfWeek = 1,
  minDate,
  maxDate,
  isDateDisabled,
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
  viewTabs = ["days", "months", "years"],
  view: controlledView,
  onViewChange,
  onClear,
  placement = "bottom-start",
  disabled = false,
  readOnly = false,
  portal = true,
  portalRoot,
  config,
  className = "",
  wrapperClassName = "",
  inputWrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  popoverClassName = "",
}: DatePickerProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = true,
    isFullWidth = true,
    showWeekNumbers = false,
    showViewTabs = false,
    closeOnSelect = true,
  } = config ?? {};
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;
  const popoverId = `${inputId}-popover`;

  const isControlledView = controlledView !== undefined;
  const [internalView, setInternalView] = useState<CalendarView>(defaultView);
  const activeView = isControlledView ? controlledView : internalView;

  const baseDisplayFormat = customDisplayFormat || format;
  const currentDisplayFormat = useMemo(() => {
    return getAdaptiveViewFormat(baseDisplayFormat, activeView);
  }, [baseDisplayFormat, activeView]);

  const isControlled = controlledValue !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(() => toDate(defaultValue, format));
  const selectedDate = isControlled ? toDate(controlledValue, format) : internalDate;
  const formattedValue = selectedDate ? formatDate(selectedDate, currentDisplayFormat, locale) : "";

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
  const sizeStyles = getSafeConfig(size, datePickerSizeConfig, "md");
  const radiusClass = getSafeConfig(radius, datePickerRadiusConfig, "lg");
  const variantClass =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, datePickerVariantStyles, "outline"), "primary");

  const hasValue = Boolean(selectedDate);

  const handleViewChange = (mode: CalendarView) => {
    if (!isControlledView) {
      setInternalView(mode);
    }
    onViewChange?.(mode);
  };

  const handleDateSelect = (date: Date | null) => {
    if (!isControlled) {
      setInternalDate(date);
    }
    const formattedOutput = date ? formatDate(date, format, locale) : "";
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

  const defaultPlaceholder = placeholder || currentDisplayFormat;

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
    "group/field group/datepicker relative flex",
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

  if (!portal) {
    return (
      <div className={className}>
        <Calendar
          bordered={false}
          value={selectedDate}
          onChange={handleDateSelect}
          view={activeView}
          onViewChange={handleViewChange}
          minDate={minDate}
          maxDate={maxDate}
          isDateDisabled={isDateDisabled}
          locale={locale}
          firstDayOfWeek={firstDayOfWeek}
          showWeekNumbers={showWeekNumbers}
          size={size}
          color={color}
          radius={radius}
          showViewTabs={showViewTabs}
          viewTabs={viewTabs}
        />
      </div>
    );
  }

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
                aria-label="Xóa ngày"
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
                className={popoverClassName}
              >
                <Calendar
                  value={selectedDate}
                  onChange={handleDateSelect}
                  view={activeView}
                  onViewChange={handleViewChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  isDateDisabled={isDateDisabled}
                  locale={locale}
                  firstDayOfWeek={firstDayOfWeek}
                  showWeekNumbers={showWeekNumbers}
                  size={size}
                  color={color}
                  radius={radius}
                  showViewTabs={showViewTabs}
                  viewTabs={viewTabs}
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
