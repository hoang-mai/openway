import { usePopoverContext } from "./context";
import { PopoverHeaderProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export function PopoverHeader({ children, className = "", ...rest }: PopoverHeaderProps) {
  const { size } = usePopoverContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <h2
      className={["text-neutral-900 border-b border-neutral-100 font-semibold", currentSize.header, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </h2>
  );
}

export default PopoverHeader;
