import React from "react";
import { DropdownGroupProps } from "./types";
import { DropdownHeader } from "./DropdownHeader";

export function DropdownGroup({ children, label, className = "", ...rest }: DropdownGroupProps) {
  return (
    <div role="group" className={["flex flex-col", className].filter(Boolean).join(" ")} {...rest}>
      {label && <DropdownHeader>{label}</DropdownHeader>}
      {children}
    </div>
  );
}

export default DropdownGroup;
