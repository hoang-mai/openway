import React, { cloneElement, isValidElement, MouseEvent, ReactNode, ButtonHTMLAttributes } from "react";
import { usePopoverContext } from "./context";
import { PopoverCloseProps } from "./types";
import { useMergeRefs } from "@floating-ui/react";

interface SlotProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

function Slot({
  children,
  ref: forwardedRef,
  className = "",
  onClick,
  ...props
}: SlotProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const childRef = isValidElement(children)
    ? (children.props as { ref?: React.Ref<HTMLButtonElement> })?.ref
    : undefined;

  const mergedChildRef = useMergeRefs([forwardedRef, childRef]);

  if (!isValidElement<Record<string, unknown>>(children)) {
    return null;
  }

  const childProps = (children.props || {}) as {
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
  };

  return cloneElement(children, {
    ...props,
    ...childProps,
    ref: mergedChildRef,
    className: [childProps.className, className].filter(Boolean).join(" "),
    onClick: (e: MouseEvent<HTMLButtonElement>) => {
      childProps.onClick?.(e);
      onClick?.(e);
    },
  });
}

export function PopoverClose({
  ref: propRef,
  children,
  className = "",
  asChild = false,
  onClick,
  ...rest
}: PopoverCloseProps) {
  const { setIsOpen } = usePopoverContext();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setIsOpen(false);
    }
  };

  if (isValidElement(children) && asChild) {
    return (
      <Slot ref={propRef} className={className} onClick={handleClick} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <button ref={propRef} type="button" className={className} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}

export default PopoverClose;
