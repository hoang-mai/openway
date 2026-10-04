import React from "react";
import { BreadcrumbListProps } from "./types";
import { useBreadcrumbContext } from "./context";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export default function BreadcrumbList({
  children,
  className = "",
  ref,
  ...props
}: BreadcrumbListProps) {
  const { size } = useBreadcrumbContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <ol
      ref={ref}
      className={`flex flex-wrap items-center list-none m-0 p-0 ${currentSize.list} ${className}`.trim()}
      {...props}
    >
      {children}
    </ol>
  );
}
