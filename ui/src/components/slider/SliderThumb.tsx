import React, { ReactNode, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { SliderOrientation, SliderSize, SliderTooltipMode, SliderTooltipPlacement } from "./types";
import { sizeConfig } from "./constants";
import Tooltip from "@/components/tooltip/Tooltip";
import Spinner from "@/components/icons/Spinner";
import { getSafeConfig } from "@/utils/function";

export interface SliderThumbState {
  isLoading?: boolean;
  showSpinner?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  isRange?: boolean;
  hasDescription?: boolean;
}

export interface SliderThumbProps {
  id: string;
  thumbIdx: number;
  value: number;
  orientation: SliderOrientation;
  size: SliderSize;
  thumbRadiusClass: string;
  thumbThemeStyles: string;
  thumbClassName?: string;
  tooltipClassName?: string;
  state?: SliderThumbState;
  label?: ReactNode;
  helperId?: string;
  tooltipMode?: SliderTooltipMode;
  tooltipPlacement?: SliderTooltipPlacement;
  formatTooltip?: (value: number) => ReactNode;
}

export default function SliderThumb({
  id,
  thumbIdx,
  value,
  orientation,
  size,
  thumbRadiusClass,
  thumbThemeStyles,
  thumbClassName = "",
  tooltipClassName = "",
  state,
  label,
  helperId,
  tooltipMode = "none",
  tooltipPlacement,
  formatTooltip,
}: SliderThumbProps) {
  const {
    isLoading = false,
    showSpinner = false,
    disabled = false,
    readOnly = false,
    isRequired = false,
    isInvalid = false,
    isRange = false,
    hasDescription = false,
  } = state ?? {};

  const currentSize = getSafeConfig(size, sizeConfig, "md");

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Xác định trạng thái hiển thị tooltip
  let isTooltipOpen: boolean | undefined = undefined;
  if (tooltipMode === "always") {
    isTooltipOpen = true;
  } else if (tooltipMode === "active") {
    isTooltipOpen = isDragging || isFocused;
  } else if (tooltipMode === "hover") {
    isTooltipOpen = isHovered || isDragging || isFocused;
  } else if (tooltipMode === "none") {
    isTooltipOpen = false;
  }

  const defaultPlacement = tooltipPlacement || (orientation === "vertical" ? "right" : "top");
  const formattedTooltipContent = formatTooltip ? formatTooltip(value) : value.toString();

  const valueText =
    typeof formattedTooltipContent === "string" || typeof formattedTooltipContent === "number"
      ? String(formattedTooltipContent)
      : undefined;

  const thumbNode = (
    <SliderPrimitive.Thumb
      id={`${id}-thumb-${thumbIdx}`}
      tabIndex={disabled || isLoading ? -1 : 0}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      aria-readonly={readOnly}
      aria-required={isRequired}
      aria-invalid={isInvalid}
      aria-errormessage={isInvalid ? helperId : undefined}
      aria-describedby={hasDescription ? helperId : undefined}
      aria-valuetext={valueText}
      aria-orientation={orientation}
      aria-label={
        typeof label === "string"
          ? `${label} ${isRange ? (thumbIdx === 0 ? "minimum" : "maximum") : ""}`
          : `Slider ${isRange ? (thumbIdx === 0 ? "min" : "max") : ""}`
      }
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      className={`block relative z-10 select-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/25 transition-transform duration-100 ease-out ${
        disabled || readOnly
          ? "cursor-not-allowed opacity-60 shadow-none"
          : "cursor-grab active:cursor-grabbing hover:scale-105"
      } ${currentSize.thumb} ${thumbRadiusClass} ${thumbThemeStyles} ${
        isDragging && !disabled && !isLoading ? "scale-110 ring-4 ring-primary-500/20" : ""
      } ${thumbClassName}`}
    >
      {isLoading && showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center p-0.5" aria-hidden="true">
          <Spinner className="size-full animate-spin text-current" />
        </div>
      )}
    </SliderPrimitive.Thumb>
  );

  if (tooltipMode !== "none") {
    return (
      <Tooltip
        content={formattedTooltipContent}
        placement={defaultPlacement}
        open={isTooltipOpen}
        size={currentSize.tooltipSize}
        className={tooltipClassName}
        disabled={disabled || isLoading}
      >
        {thumbNode}
      </Tooltip>
    );
  }

  return thumbNode;
}
