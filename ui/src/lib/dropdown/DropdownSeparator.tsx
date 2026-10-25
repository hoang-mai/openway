import React from "react";
import { DropdownSeparatorProps } from "./types";
import { cn } from "cn";

export function DropdownSeparator({ className = "", ...rest }: DropdownSeparatorProps) {
  return <hr className={cn("-mx-1 my-1 h-px border-0 bg-neutral-200", className)} {...rest} />;
}

export default DropdownSeparator;
