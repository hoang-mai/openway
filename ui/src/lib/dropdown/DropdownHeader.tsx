import React from "react";
import { useDropdownContext } from "./context";
import { DropdownHeaderProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { cn } from "cn";

export function DropdownHeader({ children, className = "", ...rest }: DropdownHeaderProps) {
  const { size } = useDropdownContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <div
      role="presentation"
      className={cn("font-semibold text-neutral-500 uppercase tracking-wider select-none", currentSize.header, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export default DropdownHeader;
