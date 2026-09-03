import { useState, useMemo, useCallback } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  useClick,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
} from "@floating-ui/react";
import { PopoverProps, PopoverContextValue } from "./types";
import { PopoverContext } from "./context";

export default function Popover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
  placement = "bottom",
  offset = 8,
  flip = true,
  shift = true,
  size = "md",
  radius = "md",
  color = "neutral",
  disabled = false,
  animated = true,
  animationDuration = 150,
  modal = false,
  closeOnEsc = true,
  closeOnClickOutside = true,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const middleware = useMemo(
    () =>
      [
        offsetMiddleware(offset),
        flip ? flipMiddleware() : undefined,
        shift ? shiftMiddleware({ padding: 8 }) : undefined,
      ].filter(Boolean),
    [offset, flip, shift]
  );

  const {
    refs,
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

  const click = useClick(context, {
    enabled: !disabled && trigger === "click",
  });

  const hover = useHover(context, {
    enabled: !disabled && trigger === "hover",
    delay: { open: 100, close: 150 },
    handleClose: safePolygon(),
  });

  const dismiss = useDismiss(context, {
    escapeKey: closeOnEsc,
    outsidePress: closeOnClickOutside,
  });

  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, dismiss, role]);

  const contextValue: PopoverContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen: handleOpenChange,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
      size,
      radius,
      color,
      disabled,
      animated,
      animationDuration,
      modal,
      computedPlacement,
    }),
    [
      isOpen,
      handleOpenChange,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
      size,
      radius,
      color,
      disabled,
      animated,
      animationDuration,
      modal,
      computedPlacement,
    ]
  );

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
}
