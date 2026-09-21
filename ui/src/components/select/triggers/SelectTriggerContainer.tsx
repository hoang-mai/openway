import React, { ReactNode } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import Spinner from "@/components/icons/Spinner";

export interface SelectTriggerContainerProps {
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  isOpen: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  showSpinner?: boolean;
  showClear?: boolean;
  onClear?: (e: React.MouseEvent) => void;
  startContent?: ReactNode;
  endContent?: ReactNode;
  triggerRef: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  roundedClass: string;
  currentSize: { trigger: string; gap: string; icon: string };
  variantStyle: string;
  className?: string;
  children: ReactNode;
}

export function SelectTriggerContainer({
  id,
  ariaLabel,
  ariaLabelledBy,
  isOpen,
  disabled = false,
  isLoading = false,
  showSpinner = false,
  showClear = false,
  onClear,
  startContent,
  endContent,
  triggerRef,
  getReferenceProps,
  onClick,
  onKeyDown,
  roundedClass,
  currentSize,
  variantStyle,
  className = "",
  children,
}: SelectTriggerContainerProps) {
  const statusStyles = disabled
    ? "opacity-60 cursor-not-allowed bg-neutral-100 pointer-events-none"
    : "cursor-pointer";

  return (
    <div
      ref={triggerRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={id ? `${id}-listbox` : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={disabled ? -1 : 0}
      data-state={isOpen ? "open" : "closed"}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...getReferenceProps({
        id,
        onClick,
        onKeyDown,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "data-state": isOpen ? "open" : "closed",
        className: `group relative flex items-center justify-between transition-all duration-150 ease-in-out border select-none ${roundedClass} ${
          currentSize.trigger
        } ${currentSize.gap} ${variantStyle} ${statusStyles} ${className}`,
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
      })}
    >
      {startContent && <span className="shrink-0 inline-flex items-center text-neutral-400">{startContent}</span>}

      {children}

      <div className="shrink-0 flex items-center gap-1.5 ml-1 text-neutral-400">
        {isLoading && showSpinner && <Spinner className={`${currentSize.icon} animate-spin text-current`} />}

        {showClear && !isLoading && (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();
              onClear?.(e);
            }}
            className="hover:text-neutral-600 transition-colors p-0.5 rounded-full hover:bg-neutral-100"
          >
            <CloseIcon className="size-3.5" />
          </button>
        )}

        {endContent}

        <span className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">
          <ChevronDownIcon className={currentSize.icon} />
        </span>
      </div>
    </div>
  );
}

export default SelectTriggerContainer;
