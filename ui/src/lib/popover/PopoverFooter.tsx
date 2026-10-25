import { usePopoverContext } from "./context";
import { PopoverFooterProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { cn } from "cn";

export function PopoverFooter({ children, className = "", ...rest }: PopoverFooterProps) {
  const { size } = usePopoverContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <div
      className={cn("border-t border-neutral-100 bg-neutral-50/50", currentSize.footer, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export default PopoverFooter;
