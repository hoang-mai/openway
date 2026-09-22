import { HTMLAttributes, ReactNode, Ref } from "react";
import { getSafeConfig } from "@/utils/function";
import { calloutColorConfig } from "./constants";
import LightbulbIcon from "@/components/icons/LightbulbIcon";

export interface CalloutViewProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  icon?: ReactNode;
  color?: string;
  className?: string;
  children?: ReactNode;
}

export default function CalloutView({
  ref,
  icon = <LightbulbIcon className="size-5 text-current" />,
  color = "default",
  className = "",
  children,
  ...restProps
}: CalloutViewProps) {
  const colorClass = getSafeConfig(color, calloutColorConfig, "default");

  return (
    <div
      ref={ref}
      className={`ui-callout flex items-start gap-3 p-3.5 sm:p-4 rounded-md border text-sm transition-colors duration-150 ${colorClass} ${className}`.trim()}
      {...restProps}
    >
      {icon && (
        <span
          className="shrink-0 leading-tight select-none flex items-center justify-center pt-0.5"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0 leading-relaxed">{children}</div>
    </div>
  );
}
