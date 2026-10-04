import React from "react";
import { BreadcrumbPageProps } from "./types";
import { useBreadcrumbContext } from "./context";
import {
  currentPageColorConfig,
  radiusConfig,
  sizeConfig,
} from "./constants";
import { getSafeConfig } from "@/utils/function";

export default function BreadcrumbPage({
  children,
  startIcon,
  endIcon,
  badge,
  className = "",
  ref,
  ...props
}: BreadcrumbPageProps) {
  const { size, color, radius, variant } = useBreadcrumbContext();

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const currentColorClass = getSafeConfig(
    color,
    currentPageColorConfig,
    "neutral"
  );

  let variantStyle = "";
  if (variant === "solid") {
    variantStyle = "bg-neutral-100/90 shadow-xs";
  } else if (variant === "bordered") {
    variantStyle = "border border-neutral-200/90 bg-neutral-50/60 shadow-xs";
  }

  return (
    <span
      ref={ref}
      aria-current="page"
      className={`inline-flex items-center max-w-70 sm:max-w-105 md:max-w-none cursor-default select-none font-medium transition-colors ${currentSize.page} ${roundedClass} ${currentColorClass} ${variantStyle} ${className}`.trim()}
      {...props}
    >
      {startIcon && (
        <span
          className={`inline-flex shrink-0 items-center justify-center ${currentSize.icon}`}
          aria-hidden="true"
        >
          {startIcon}
        </span>
      )}
      <span className="truncate">{children}</span>
      {endIcon && (
        <span
          className={`inline-flex shrink-0 items-center justify-center ${currentSize.icon}`}
          aria-hidden="true"
        >
          {endIcon}
        </span>
      )}
      {badge && (
        <span className={`inline-flex shrink-0 items-center ${currentSize.badge}`}>
          {badge}
        </span>
      )}
    </span>
  );
}
