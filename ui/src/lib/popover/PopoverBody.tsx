import { usePopoverContext } from "./context";
import { PopoverBodyProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { cn } from "cn";

export function PopoverBody({ children, className = "", ...rest }: PopoverBodyProps) {
  const { size } = usePopoverContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <div className={cn("text-neutral-700", currentSize.body, className)} {...rest}>
      {children}
    </div>
  );
}

export default PopoverBody;
