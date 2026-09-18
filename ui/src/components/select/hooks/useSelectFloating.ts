import { useRef, CSSProperties, RefObject } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useInteractions,
  Placement,
  FloatingContext,
  ExtendedRefs,
} from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";

export interface UseSelectFloatingOptions {
  placement?: Placement;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
  animated?: boolean;
  animationDuration?: number;
  activeIndex: number | null;
  onNavigate: (index: number | null) => void;
}

export interface UseSelectFloatingReturn {
  refs: ExtendedRefs<HTMLElement>;
  elements: FloatingContext["elements"];
  floatingStyles: CSSProperties;
  transitionStyles: CSSProperties;
  isMounted: boolean;
  context: FloatingContext;
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  elementsRef: RefObject<(HTMLElement | null)[]>;
}

export function useSelectFloating({
  placement = "bottom-start",
  isOpen,
  onOpenChange,
  disabled = false,
  readOnly = false,
  isLoading = false,
  animated = true,
  animationDuration = 150,
  activeIndex,
  onNavigate,
}: UseSelectFloatingOptions): UseSelectFloatingReturn {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const isInteractive = !disabled && !readOnly;

  const { refs, elements, floatingStyles, context } = useFloating<HTMLElement>({
    placement,
    open: isOpen && isInteractive,
    onOpenChange: (nextOpen) => {
      if (isInteractive && (!isLoading || isOpen || !nextOpen)) {
        onOpenChange(nextOpen);
      }
    },
    whileElementsMounted: autoUpdate,
    transform: false,
    middleware: [offsetMiddleware(4), flipMiddleware(), shiftMiddleware({ padding: 8 })],
  });

  const click = useClick(context, {
    enabled: isInteractive && (!isLoading || isOpen),
  });

  const dismiss = useDismiss(context, {
    outsidePress: (event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-select-filter-popover]")) {
        return false;
      }
      return true;
    },
  });
  const role = useRole(context, { role: "listbox" });

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate,
    loop: true,
    virtual: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role, listNavigation]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: animationDuration,
    animated,
  });

  return {
    refs,
    elements,
    floatingStyles,
    transitionStyles,
    isMounted,
    context,
    getReferenceProps,
    getFloatingProps,
    elementsRef,
  };
}
