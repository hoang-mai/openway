import React, { cloneElement, isValidElement, useState, ReactNode, HTMLAttributes } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";
import { TooltipProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig, arrowColorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { DEFAULT_Z_INDEX } from "@/constants";
import { useModalContext } from "@/components/modal/ModalContext";
import { useConfirmContext } from "@/components/confirm/ConfirmContext";

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
  const childRef = isValidElement(children) ? (children.props as { ref?: React.Ref<HTMLElement> })?.ref : undefined;

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

export default function Tooltip({
  content,
  children,
  placement = "top",
  variant,
  color,
  size,
  radius,
  hasArrow = true,
  offset = 8,
  flip = true,
  shift = true,
  delay = { open: 200, close: 150 },
  disabled = false,
  animated = true,
  animationDuration = 150,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className = "",
  arrowClassName = "",
  zIndex = DEFAULT_Z_INDEX.TOOLTIP,
  portal = true,
  portalRoot,
}: TooltipProps) {
  const modalContext = useModalContext();
  const confirmContext = useConfirmContext();

  const effectivePortalRoot = portalRoot ?? modalContext?.dialogRef ?? confirmContext?.dialogRef;

  const [open, setOpen] = useState(defaultOpen);
  const [arrowRef, setArrowRef] = useState<SVGSVGElement | null>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const middleware = [
    offsetMiddleware(offset),
    flip ? flipMiddleware() : undefined,
    shift ? shiftMiddleware({ padding: 8 }) : undefined,
    hasArrow ? arrowMiddleware({ element: arrowRef }) : undefined,
  ].filter(Boolean);

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
    placement: computedPlacement,
  } = useFloating({
    placement,
    open: isOpen && !disabled,
    onOpenChange: handleOpenChange,
    whileElementsMounted: autoUpdate,
    transform: false,
    middleware,
  });

  const hover = useHover(context, {
    move: false,
    delay,
    enabled: !disabled,
  });
  const focus = useFocus(context, {
    enabled: !disabled,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: animationDuration,
    animated,
  });

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const variantStyles =
    variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, variantColorConfig, "filled"), "neutral");

  const arrowColorClass =
    variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, arrowColorConfig, "filled"), "neutral");

  const classNames = [
    "select-none pointer-events-none max-w-xs break-words",
    currentSize.box,
    roundedClass,
    variantStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const triggerProps = getReferenceProps();

  const tooltipContent = isMounted && !disabled && content && (
    <div
      ref={setFloating}
      style={{
        ...floatingStyles,
        ...(animated ? transitionStyles : {}),
        zIndex,
      }}
      className={classNames}
      data-state={isOpen ? "open" : "closed"}
      data-placement={computedPlacement}
      {...getFloatingProps()}
    >
      {content}
      {hasArrow && (
        <FloatingArrow
          ref={setArrowRef}
          context={context}
          width={currentSize.arrowWidth}
          height={currentSize.arrowHeight}
          strokeWidth={variant === "outline" || variant === "soft" ? 1 : 0}
          className={[arrowColorClass, arrowClassName].filter(Boolean).join(" ")}
        />
      )}
    </div>
  );

  return (
    <>
      {isValidElement(children) ? (
        <Slot ref={setReference} disabled={disabled} {...triggerProps}>
          {children}
        </Slot>
      ) : (
        <span ref={setReference} {...triggerProps}>
          {children}
        </span>
      )}
      {portal ? (
        <FloatingPortal root={effectivePortalRoot}>{tooltipContent}</FloatingPortal>
      ) : (
        tooltipContent
      )}
    </>
  );
}
