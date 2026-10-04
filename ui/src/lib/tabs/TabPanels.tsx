import { TabPanelsProps } from "./types";

export default function TabPanels({ children, className = "", ref, ...props }: TabPanelsProps) {
  return (
    <div ref={ref} className={`w-full ${className}`} {...props}>
      {children}
    </div>
  );
}
