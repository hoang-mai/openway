import React, { useId, useState, ReactNode } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { SliderProps, SliderValue } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import SliderThumb from "./SliderThumb";
import { SliderMarks, SliderStepDots } from "./SliderMarks";
import HelperErrorText from "@/components/common/HelperErrorText";
import { getSafeConfig } from "@/utils/function";

export default function Slider({
  config,
  value: valueProp,
  defaultValue: defaultValueProp,
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 0,
  inverted = false,
  size,
  variant,
  color,
  radius,
  thumbRadius,
  orientation = "horizontal",
  label,
  labelPlacement = "top",
  formatValue,
  showTooltip = "none",
  tooltipPlacement,
  formatTooltip,
  marks = false,
  startContent,
  endContent,
  disabled = false,
  readOnly = false,
  helperText,
  errorMessage,
  name,
  id: idProp,
  onChange,
  onChangeEnd,
  className = "",
  wrapperClassName = "",
  trackWrapperClassName = "",
  trackClassName = "",
  fillerClassName = "",
  thumbClassName = "",
  labelClassName = "",
  valueClassName = "",
  helperClassName = "",
  tooltipClassName = "",
  markClassName = "",
  ref,
}: SliderProps) {
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    showSteps = false,
    showValue = false,
    isFullWidth = true,
  } = config ?? {};

  const generatedId = useId();
  const id = idProp || generatedId;
  const helperId = `${id}-helper`;

  const hasError = Boolean(isInvalid || errorMessage);
  const activeColor = hasError ? "error" : color;

  const isRange = Array.isArray(valueProp ?? defaultValueProp);
  const isControlled = valueProp !== undefined;

  // Internal state tracking for Uncontrolled mode and for label / step dots rendering
  const [internalValue, setInternalValue] = useState<number[]>(() => {
    if (defaultValueProp !== undefined) {
      return Array.isArray(defaultValueProp) ? defaultValueProp : [defaultValueProp];
    }
    return isRange ? [min, max] : [min];
  });

  const normalizedValue = isControlled
    ? Array.isArray(valueProp)
      ? valueProp
      : valueProp !== undefined
        ? [valueProp]
        : undefined
    : undefined;

  const currentValues: [number, number] = isControlled
    ? Array.isArray(valueProp)
      ? [valueProp[0] ?? min, valueProp[1] ?? max]
      : [valueProp ?? min, 0]
    : isRange
      ? [internalValue[0] ?? min, internalValue[1] ?? max]
      : [internalValue[0] ?? min, 0];

  const handleValueChange = (newValues: number[]) => {
    if (disabled || readOnly || isLoading) return;
    if (!isControlled) {
      setInternalValue(newValues);
    }
    const emitVal: SliderValue = isRange
      ? [newValues[0] ?? min, newValues[1] ?? max]
      : (newValues[0] ?? min);
    onChange?.(emitVal);
  };

  const handleValueCommit = (newValues: number[]) => {
    if (disabled || readOnly || isLoading) return;
    const emitVal: SliderValue = isRange
      ? [newValues[0] ?? min, newValues[1] ?? max]
      : (newValues[0] ?? min);
    onChangeEnd?.(emitVal);
  };

  // Resolved Styles via getSafeConfig
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const trackRadiusClass = getSafeConfig(radius, radiusConfig, "full");
  const thumbRadiusClass = getSafeConfig(thumbRadius, radiusConfig, "full");

  const colorConfig =
    variant === "other"
      ? { track: "", filler: "", thumb: "" }
      : getSafeConfig(activeColor, getSafeConfig(variant, variantColorConfig, "filled"), "primary");

  const trackThemeStyles = colorConfig.track;
  const fillerThemeStyles = colorConfig.filler;
  const thumbThemeStyles = colorConfig.thumb;

  // Render Label & Value
  const renderLabel = () => {
    if (!label && !showValue) return null;

    let displayText: ReactNode = "";
    if (formatValue) {
      displayText = formatValue(isRange ? currentValues : currentValues[0]);
    } else if (isRange) {
      displayText = `${currentValues[0]} - ${currentValues[1]}`;
    } else {
      displayText = `${currentValues[0]}`;
    }

    const labelColorStyle = hasError
      ? "text-error-600 font-medium"
      : "text-neutral-900 dark:text-neutral-100";

    return (
      <div className="flex items-center justify-between gap-2 mb-1.5 select-none">
        {label && (
          <label
            htmlFor={`${id}-thumb-0`}
            className={`font-medium ${labelColorStyle} ${
              currentSize.label
            } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${labelClassName}`}
          >
            {label}
            {isRequired && (
              <span className="text-error-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {showValue && (
          <span
            className={`select-none text-neutral-700 dark:text-neutral-300 ${currentSize.value} ${valueClassName}`}
            aria-hidden="true"
          >
            {displayText}
          </span>
        )}
      </div>
    );
  };

  const renderedThumbs = isRange ? [currentValues[0], currentValues[1]] : [currentValues[0]];

  return (
    <div
      ref={ref}
      className={`group/field flex flex-col ${isFullWidth ? "w-full" : "inline-flex"} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${wrapperClassName || className}`}
    >
      {/* Label Placement Top */}
      {labelPlacement === "top" && renderLabel()}

      {/* Main Slider Track Wrapper */}
      <div
        className={`flex items-center ${currentSize.gap} ${
          orientation === "vertical" ? "flex-col h-48" : "flex-row w-full"
        } ${trackWrapperClassName}`}
      >
        {labelPlacement === "left" && renderLabel()}

        {/* Start Content */}
        {startContent && (
          <div
            className="inline-flex shrink-0 items-center justify-center select-none text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
          >
            {startContent}
          </div>
        )}

        {/* Radix Slider Primitive Root */}
        <SliderPrimitive.Root
          min={min}
          max={max}
          step={step}
          minStepsBetweenThumbs={minStepsBetweenThumbs}
          inverted={inverted}
          orientation={orientation}
          disabled={disabled || isLoading || readOnly}
          value={normalizedValue}
          defaultValue={
            defaultValueProp !== undefined
              ? Array.isArray(defaultValueProp)
                ? defaultValueProp
                : [defaultValueProp]
              : undefined
          }
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          className={`relative flex items-center select-none touch-none ${
            orientation === "vertical" ? "flex-col h-full w-auto justify-center" : "w-full h-auto justify-center"
          } ${disabled || readOnly ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {/* Track */}
          <SliderPrimitive.Track
            className={`relative overflow-hidden ${
              orientation === "vertical"
                ? `${currentSize.trackVertical} h-full`
                : `${currentSize.trackHorizontal} w-full`
            } ${trackRadiusClass} ${trackThemeStyles} ${trackClassName}`}
          >
            {/* Step Dots */}
            <SliderStepDots
              showSteps={showSteps}
              min={min}
              max={max}
              step={step}
              orientation={orientation}
              size={size || "md"}
              isRange={isRange}
              currentValues={currentValues}
            />

            {/* Active / Filled Bar */}
            <SliderPrimitive.Range
              className={`absolute ${fillerThemeStyles} ${trackRadiusClass} ${fillerClassName}`}
            />
          </SliderPrimitive.Track>

          {/* Thumbs */}
          {renderedThumbs.map((thumbVal, idx) => {
            const thumbKey = isRange ? (idx === 0 ? `${id}-thumb-min` : `${id}-thumb-max`) : `${id}-thumb-single`;
            return (
              <SliderThumb
                key={thumbKey}
                id={id}
                thumbIdx={idx}
                value={thumbVal}
                orientation={orientation}
                size={size || "md"}
                thumbRadiusClass={thumbRadiusClass}
                thumbThemeStyles={thumbThemeStyles}
                thumbClassName={thumbClassName}
                tooltipClassName={tooltipClassName}
                state={{
                  isLoading,
                  showSpinner,
                  disabled,
                  readOnly,
                  isRequired,
                  isInvalid: hasError,
                  isRange,
                  hasDescription: Boolean(hasError || helperText),
                }}
                label={label}
                helperId={helperId}
                tooltipMode={showTooltip}
                tooltipPlacement={tooltipPlacement}
                formatTooltip={formatTooltip}
              />
            );
          })}
        </SliderPrimitive.Root>

        {/* End Content */}
        {endContent && (
          <div
            className="inline-flex shrink-0 items-center justify-center select-none text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
          >
            {endContent}
          </div>
        )}

        {labelPlacement === "right" && renderLabel()}
      </div>

      {/* Marks */}
      <SliderMarks
        marks={marks}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        size={size || "md"}
        markClassName={markClassName}
      />

      {/* Helper / Error Text */}
      <HelperErrorText
        id={helperId}
        helperText={helperText}
        errorMessage={errorMessage}
        sizeClassName={currentSize.helper}
        className={helperClassName}
      />

      {/* Hidden inputs for Form Integration */}
      {name && (
        <>
          {isRange ? (
            <>
              <input type="hidden" name={`${name}[0]`} value={currentValues[0]} disabled={disabled} />
              <input type="hidden" name={`${name}[1]`} value={currentValues[1]} disabled={disabled} />
            </>
          ) : (
            <input type="hidden" name={name} value={currentValues[0]} disabled={disabled} />
          )}
        </>
      )}
    </div>
  );
}
