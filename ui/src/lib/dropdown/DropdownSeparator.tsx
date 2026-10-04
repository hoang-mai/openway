import React from "react";
import { DropdownSeparatorProps } from "./types";

export function DropdownSeparator({ className = "", ...rest }: DropdownSeparatorProps) {
  return <hr className={["-mx-1 my-1 h-px border-0 bg-neutral-200", className].filter(Boolean).join(" ")} {...rest} />;
}

export default DropdownSeparator;
