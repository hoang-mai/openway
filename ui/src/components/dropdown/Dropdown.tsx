import React, { useState, useRef, useMemo, useCallback } from "react";
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
  useListNavigation,
  useTypeahead,
  useInteractions,
  safePolygon,
} from "@floating-ui/react";
import { DropdownProps, DropdownContextValue } from "./types";
import { DropdownContext } from "./context";

export default function Dropdown({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
  placement = "bottom-start",
  offset = 4,
  flip = true,
  shift = true,
  size = "md",
  radius = "md",
  color = "primary",
  disabled = false,
  animated = true,
  animationDuration = 150,
  closeOnSelect = true,
}: DropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      if (!nextOpen) {
        setActiveIndex(null);
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

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: isOpen ? setActiveIndex : undefined,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ]);

  const contextValue: DropdownContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen: handleOpenChange,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      elementsRef,
      labelsRef,
      activeIndex,
      setActiveIndex,
      size,
      radius,
      color,
      disabled,
      animated,
      animationDuration,
      closeOnSelect,
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
      getItemProps,
      elementsRef,
      labelsRef,
      activeIndex,
      setActiveIndex,
      size,
      radius,
      color,
      disabled,
      animated,
      animationDuration,
      closeOnSelect,
      computedPlacement,
    ]
  );

  return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
}
