import React from "react";
import { BreadcrumbItemProps } from "./types";
import { useBreadcrumbContext, BreadcrumbItemContext } from "./context";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import BreadcrumbPage from "./BreadcrumbPage";

export default function BreadcrumbItem({
  current = false,
  disabled = false,
  className = "",
  children,
  ref,
  ...props
}: BreadcrumbItemProps) {
  const { size } = useBreadcrumbContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <BreadcrumbItemContext.Provider value={{ disabled, current }}>
      <li
        ref={ref}
        className={`inline-flex items-center shrink-0 ${currentSize.item} ${
          disabled ? "opacity-50 pointer-events-none" : ""
        } ${className}`.trim()}
        aria-current={current ? "page" : undefined}
        {...props}
      >
        {current && typeof children === "string" ? (
          <BreadcrumbPage>{children}</BreadcrumbPage>
        ) : (
          children
        )}
      </li>
    </BreadcrumbItemContext.Provider>
  );
}
