import { usePopoverContext } from "./context";
import { PopoverHeaderProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { cn } from "cn";

export function PopoverHeader({ children, className = "", ...rest }: PopoverHeaderProps) {
  const { size } = usePopoverContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <h2
      className={cn("text-neutral-900 border-b border-neutral-100 font-semibold", currentSize.header, className)}
      {...rest}
    >
      {children}
    </h2>
  );
}

export default PopoverHeader;
