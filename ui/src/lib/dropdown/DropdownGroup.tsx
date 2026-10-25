import React from "react";
import { DropdownGroupProps } from "./types";
import { DropdownHeader } from "./DropdownHeader";
import { cn } from "cn";

export function DropdownGroup({ children, label, className = "", ...rest }: DropdownGroupProps) {
  return (
    <div role="group" className={cn("flex flex-col", className)} {...rest}>
      {label && <DropdownHeader>{label}</DropdownHeader>}
      {children}
    </div>
  );
}

export default DropdownGroup;
