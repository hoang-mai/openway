import React, { useMemo } from "react";
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

  const contextValue = useMemo(
    () => ({ disabled, current }),
    [disabled, current]
  );

  return (
    <BreadcrumbItemContext.Provider value={contextValue}>
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
