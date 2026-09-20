import React, { ReactNode } from "react";
import { EllipsisConfig } from "./types";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";

export interface EllipsisToggleProps {
  ellipsis?: boolean | EllipsisConfig;
  isExpanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export default function EllipsisToggle({ ellipsis, isExpanded, onToggle }: EllipsisToggleProps) {
  if (!ellipsis) return null;

  const ellipsisConfig: EllipsisConfig = typeof ellipsis === "object" ? ellipsis : {};
  if (!ellipsisConfig.expandable) return null;

  const defaultSymbol = isExpanded ? "Thu gọn" : "Xem thêm";
  const symbolNode: ReactNode =
    typeof ellipsisConfig.symbol === "function"
      ? ellipsisConfig.symbol(isExpanded)
      : ellipsisConfig.symbol || defaultSymbol;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-0.5 ml-1.5 text-primary-500 hover:text-primary-600 font-medium text-xs hover:underline cursor-pointer select-none transition-colors duration-150 align-baseline group"
    >
      <span>{symbolNode}</span>
      <ChevronDownIcon
        className={`size-3 shrink-0 transition-transform duration-200 ease-out text-current ${
          isExpanded ? "rotate-180" : "rotate-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
