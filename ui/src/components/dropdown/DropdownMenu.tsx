import React from "react";
import { FloatingPortal, FloatingList, useMergeRefs } from "@floating-ui/react";
import { useFloatingTransition } from "@/hooks/useFloatingTransition";
import { useDropdownContext } from "./context";
import { DropdownMenuProps } from "./types";
import { sizeConfig, radiusConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { DEFAULT_Z_INDEX } from "@/constants";
import { useFloatingPortalRoot } from "@/hooks/useFloatingPortalRoot";

export default function DropdownMenu({
  ref: propRef,
  children,
  className = "",
  style,
  minWidth,
  zIndex = DEFAULT_Z_INDEX.DROPDOWN,
  portalRoot,
  ...rest
}: DropdownMenuProps) {
  const {
    isOpen,
    refs,
    elements,
    floatingStyles,
    context,
    getFloatingProps,
    elementsRef,
    labelsRef,
    size,
    radius,
    animated,
    animationDuration,
    computedPlacement,
  } = useDropdownContext();

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

  const menuClassNames = [
    "bg-neutral-white border-2 border-neutral-200 shadow-lg outline-none focus:outline-none flex flex-col",
    currentSize.menu,
    roundedClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FloatingPortal root={effectivePortalRoot}>
      <div
        ref={mergedRef}
        style={{
          ...floatingStyles,
          ...(animated ? transitionStyles : {}),
          minWidth: minWidth,
          zIndex,
          ...style,
        }}
        className={menuClassNames}
        data-state={isOpen ? "open" : "closed"}
        data-placement={computedPlacement}
        {...getFloatingProps(rest)}
      >
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {children}
        </FloatingList>
      </div>
    </FloatingPortal>
  );
}
