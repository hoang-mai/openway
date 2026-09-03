import { ReactNode } from "react";
import { SelectOptionItem, SelectSize, SelectColor, SelectRadius } from "./types";
import { sizeConfig, radiusConfig, optionSelectedColorConfig, optionActiveColorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

import CheckIcon from "@/components/icons/CheckIcon";

export interface SelectOptionProps<TData = unknown> {
  option: SelectOptionItem<TData>;
  isSelected: boolean;
  isActive: boolean;
  size?: SelectSize;
  color?: SelectColor;
  radius?: SelectRadius;
  disabled?: boolean;
  renderOption?: (option: SelectOptionItem<TData>, state: { selected: boolean; active: boolean }) => ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  ref?: (node: HTMLElement | null) => void;
}

export function SelectOption<TData = unknown>({
  option,
  isSelected,
  isActive,
  size = "md",
  color = "primary",
  radius = "md",
  disabled = false,
  renderOption,
  onClick,
  onMouseEnter,
  ref,
}: SelectOptionProps<TData>) {
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const isDisabled = disabled || option.disabled;

  if (renderOption) {
    return (
      <div
        ref={ref}
        role="option"
        tabIndex={-1}
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        data-active={isActive}
        data-selected={isSelected}
        data-value={option.value}
        className={`cursor-pointer select-none transition-colors duration-100 ${
          isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
        onClick={isDisabled ? undefined : onClick}
        onMouseEnter={isDisabled ? undefined : onMouseEnter}
      >
        {renderOption(option, { selected: isSelected, active: isActive })}
      </div>
    );
  }

  const selectedClasses = isSelected
    ? getSafeConfig(color, optionSelectedColorConfig, "primary")
    : "text-neutral-800 hover:bg-neutral-100";

  const activeClasses =
    isActive && !isSelected ? getSafeConfig(color, optionActiveColorConfig, "primary") : "";

  return (
    <div
      ref={ref}
      role="option"
      tabIndex={-1}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      data-active={isActive}
      data-selected={isSelected}
      data-value={option.value}
      className={`group flex items-center justify-between gap-2 select-none cursor-pointer transition-colors duration-100 ${roundedClass} ${currentSize.option} ${selectedClasses} ${activeClasses} ${
        isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
      }`}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={isDisabled ? undefined : onMouseEnter}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {option.icon && <span className="shrink-0 inline-flex items-center text-neutral-400">{option.icon}</span>}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="truncate leading-normal font-normal">{option.label}</span>
          {option.description && (
            <span className="text-[11px] text-neutral-500 truncate font-normal">{option.description}</span>
          )}
        </div>
      </div>

      {isSelected && (
        <span className="shrink-0 flex items-center justify-center text-current" aria-hidden="true">
          <CheckIcon className="size-3.5" />
        </span>
      )}
    </div>
  );
}

export default SelectOption;
