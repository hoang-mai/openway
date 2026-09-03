import React, { cloneElement, isValidElement, ReactNode, HTMLAttributes } from "react";
import { usePopoverContext } from "./context";
import { PopoverTriggerProps } from "./types";
import { useMergeRefs } from "@floating-ui/react";

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  disabled?: boolean;
}

function Slot({
  children,
  ref: forwardedRef,
  disabled,
  className = "",
  ...props
}: SlotProps & { ref?: React.Ref<HTMLElement> }) {
  const childRef = isValidElement(children)
    ? (children.props as { ref?: React.Ref<HTMLElement> })?.ref
    : undefined;

  const mergedChildRef = useMergeRefs([forwardedRef, childRef]);

  if (!isValidElement<Record<string, unknown>>(children)) {
    return null;
  }

  const childProps = (children.props || {}) as {
    className?: string;
    disabled?: boolean;
    [key: string]: unknown;
  };

  return cloneElement(children, {
    ...props,
    ...childProps,
    ref: mergedChildRef,
    disabled: disabled ? true : childProps.disabled,
    className: [childProps.className, className].filter(Boolean).join(" "),
  });
}

export function PopoverTrigger({
  ref: propRef,
  children,
  className = "",
  asChild = false,
  ...rest
}: PopoverTriggerProps) {
  const { refs, getReferenceProps, isOpen, disabled } = usePopoverContext();
  const mergedRef = useMergeRefs([refs.setReference, propRef]);

  const triggerProps = getReferenceProps({
    ...rest,
    "aria-expanded": isOpen,
    "aria-haspopup": "dialog",
    className,
  });

  if (isValidElement(children) && (asChild || true)) {
    return (
      <Slot ref={mergedRef} disabled={disabled} {...triggerProps}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={mergedRef}
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={className}
      {...triggerProps}
    >
      {children}
    </button>
  );
}

export default PopoverTrigger;
