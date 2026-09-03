import { useId, useState } from "react";
import { CollapsibleProps } from "./types";

export default function Collapsible({
  open: openProp,
  defaultOpen = false,
  destroyInactivePanel = false,
  className = "",
  children,
  ref,
  ...props
}: CollapsibleProps) {
  const contentId = useId();

  const isControlled = openProp !== undefined;
  const [internalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? openProp : internalOpen;

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-hidden={!isOpen}
      data-state={isOpen ? "open" : "closed"}
      className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } ${className}`}
      {...props}
    >
      <div className="overflow-hidden">{(!destroyInactivePanel || isOpen) && children}</div>
    </div>
  );
}
