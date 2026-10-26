import { ViewTransition } from "react";
import { TabPanelsProps } from "./types";
import { useTabsContext } from "./context";
import { cn } from "cn";

export default function TabPanels({
  children,
  className = "",
  transitionClassName = "auto",
  ref,
  ...props
}: TabPanelsProps) {
  const { animated } = useTabsContext();

  return (
    <ViewTransition default={animated ? transitionClassName : "none"}>
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </ViewTransition>
  );
}
