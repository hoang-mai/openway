import { getSafeConfig } from "@/utils/function";
import { CollapseContentProps } from "./types";
import { useCollapseContext, useCollapsePanelContext } from "./context";
import { sizeConfig } from "./constants";

export default function CollapseContent({
  destroyInactivePanel: customDestroy,
  children,
  className = "",
  style,
  ref,
  ...props
}: CollapseContentProps) {
  const { size, destroyInactivePanel: globalDestroy } = useCollapseContext();
  const { isActive, headerId, panelId } = useCollapsePanelContext();

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const shouldDestroy = customDestroy ?? globalDestroy;

  return (
    <div
      ref={ref}
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      aria-hidden={!isActive}
      data-state={isActive ? "open" : "closed"}
      className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
      style={style}
      {...props}
    >
      <div className="overflow-hidden">
        {(!shouldDestroy || isActive) && (
          <div className={`${currentSize.content} ${className}`}>{children}</div>
        )}
      </div>
    </div>
  );
}
