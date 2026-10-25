import { TabPanelProps } from "./types";
import { useTabsContext } from "./context";
import { cn } from "cn";

export default function TabPanel({
  value,
  children,
  className = "",
  destroyInactiveTabPane: itemDestroy,
  ref,
  ...props
}: TabPanelProps) {
  const { activeKey, destroyInactiveTabPane: contextDestroy } = useTabsContext();

  const isActive = activeKey === value;
  const shouldDestroy = itemDestroy ?? contextDestroy;

  if (shouldDestroy && !isActive) {
    return null;
  }

  const tabId = `tab-${value}`;
  const panelId = `tabpanel-${value}`;

  const classes = cn("focus-visible:outline-hidden", !isActive && "hidden", className);

  return (
    <div
      ref={ref}
      id={panelId}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={tabId}
      hidden={!isActive}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
}
