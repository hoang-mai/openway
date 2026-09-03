import React from "react";
import { useDropdownContext } from "./context";
import { DropdownHeaderProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export function DropdownHeader({ children, className = "", ...rest }: DropdownHeaderProps) {
  const { size } = useDropdownContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <div
      role="presentation"
      className={["font-semibold text-neutral-500 uppercase tracking-wider select-none", currentSize.header, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export default DropdownHeader;
