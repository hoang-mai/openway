import { FloatingPortal, FloatingFocusManager, useMergeRefs } from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";
import { usePopoverContext } from "./context";
import { PopoverContentProps } from "./types";
import { sizeConfig, radiusConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { DEFAULT_Z_INDEX } from "@/constants";
import { useFloatingPortalRoot } from "@/hooks/useFloatingPortalRoot";

export function PopoverContent({
  ref: propRef,
  children,
  className = "",
  style,
  minWidth,
  maxWidth,
  zIndex = DEFAULT_Z_INDEX.POPOVER,
  portalRoot,
  ...rest
}: PopoverContentProps) {
  const {
    isOpen,
    refs,
    elements,
    floatingStyles,
    context,
    getFloatingProps,
    size,
    radius,
    animated,
    animationDuration,
    modal,
    computedPlacement,
  } = usePopoverContext();

  const mergedRef = useMergeRefs([refs.setFloating, propRef]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: animationDuration,
    animated,
  });

  const effectivePortalRoot = useFloatingPortalRoot({
    portalRoot,
    reference: elements.reference,
  });

  if (!isMounted) {
    return null;
  }

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const baseClasses =
    "bg-neutral-white shadow-xl outline-none focus:outline-none flex flex-col border-2 border-neutral-200";

  const contentClassNames = [baseClasses, currentSize.container, roundedClass, className].filter(Boolean).join(" ");

  const content = (
    <FloatingFocusManager context={context} modal={modal}>
      <div
        ref={mergedRef}
        style={{
          ...floatingStyles,
          ...(animated ? transitionStyles : {}),
          minWidth,
          maxWidth,
          zIndex,
          ...style,
        }}
        className={contentClassNames}
        data-state={isOpen ? "open" : "closed"}
        data-placement={computedPlacement}
        {...getFloatingProps(rest)}
      >
        {children}
      </div>
    </FloatingFocusManager>
  );

  return <FloatingPortal root={effectivePortalRoot}>{content}</FloatingPortal>;
}

export default PopoverContent;
