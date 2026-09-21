import React, { ReactNode, Ref } from "react";
import Spinner from "../icons/Spinner";
import CloseIcon from "../icons/CloseIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";

export interface TimePickerTriggerProps {
  setReference: (node: HTMLElement | null) => void;
  getReferenceProps: () => Record<string, unknown>;
  isOpen: boolean;
  isLoading: boolean;
  containerClasses: string;
  isFloating?: boolean;
  renderLabel?: () => ReactNode;
  ref?: Ref<HTMLInputElement>;
  inputId: string;
  name?: string;
  formattedValue: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  defaultPlaceholder?: string;
  popoverId: string;
  isRequired?: boolean;
  hasError?: boolean;
  errorHelperId?: string;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  inputClasses: string;
  showSpinner?: boolean;
  renderIconWrapper: (iconNode: ReactNode) => ReactNode;
  isClearable?: boolean;
  clearText: string;
  hasValue: boolean;
  iconSizeClass: string;
  onToggleOpen: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TimePickerTrigger({
  setReference,
  getReferenceProps,
  isOpen,
  isLoading,
  containerClasses,
  isFloating,
  renderLabel,
  ref,
  inputId,
  name,
  formattedValue,
  disabled,
  readOnly,
  autoComplete,
  defaultPlaceholder,
  popoverId,
  isRequired,
  hasError,
  errorHelperId,
  errorMessage,
  helperText,
  inputClasses,
  showSpinner,
  renderIconWrapper,
  isClearable,
  clearText,
  hasValue,
  iconSizeClass,
  onToggleOpen,
  onKeyDown,
  onClear,
}: TimePickerTriggerProps) {
  return (
    <div
      ref={setReference}
      {...getReferenceProps()}
      data-state={isOpen && !isLoading ? "open" : "closed"}
      className={containerClasses}
    >
      {isFloating && renderLabel?.()}

      <input
        ref={ref}
        id={inputId}
        name={name}
        type="text"
        value={formattedValue}
        onClick={() => !disabled && !readOnly && !isLoading && onToggleOpen()}
        onKeyDown={onKeyDown}
        readOnly={true}
        autoComplete={autoComplete}
        placeholder={defaultPlaceholder}
        disabled={disabled || isLoading}
        role="combobox"
        aria-expanded={isOpen && !isLoading}
        aria-haspopup="dialog"
        aria-controls={popoverId}
        aria-required={isRequired}
        aria-invalid={hasError}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        aria-describedby={helperText || errorMessage ? errorHelperId : undefined}
        aria-errormessage={errorMessage ? errorHelperId : undefined}
        className={inputClasses}
      />

      {/* Right actions: Spinner, Clear, ChevronDown Icon */}
      <div className="flex items-center space-x-1.5 pr-2.5 shrink-0">
        {isLoading && showSpinner && (
          <div className="flex items-center justify-center shrink-0">
            {renderIconWrapper(<Spinner />)}
          </div>
        )}

        {!isLoading && isClearable && !disabled && !readOnly && (
          <button
            type="button"
            onClick={onClear}
            aria-label={clearText}
            tabIndex={hasValue ? 0 : -1}
            aria-hidden={!hasValue}
            className={`inline-flex items-center justify-center shrink-0 text-neutral-400 hover:text-neutral-600 active:scale-95 transition-opacity duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current rounded-full ${iconSizeClass} ${
              hasValue ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <CloseIcon className="size-full" />
          </button>
        )}

        <div
          aria-hidden="true"
          className={`inline-flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-transform duration-200 ease-in-out cursor-pointer ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {renderIconWrapper(<ChevronDownIcon className="size-full" />)}
        </div>
      </div>
    </div>
  );
}
