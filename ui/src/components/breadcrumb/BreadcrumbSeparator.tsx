import React from "react";
import { BreadcrumbSeparatorProps } from "./types";
import { useBreadcrumbContext } from "./context";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import ChevronRightIcon from "../icons/ChevronRightIcon";

export default function BreadcrumbSeparator({
  children,
  className = "",
  ref,
  ...props
}: BreadcrumbSeparatorProps) {
  const { size, separator } = useBreadcrumbContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  const defaultContent = separator ?? (
    <ChevronRightIcon
      aria-hidden="true"
      className={currentSize.separator}
    />
  );

  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={`inline-flex items-center select-none shrink-0 ${className}`}
      {...props}
    >
      {children ?? defaultContent}
    </li>
  );
}
