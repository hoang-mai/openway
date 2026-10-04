import { usePopoverContext } from "./context";
import { PopoverBodyProps } from "./types";
import { sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export function PopoverBody({ children, className = "", ...rest }: PopoverBodyProps) {
  const { size } = usePopoverContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <div className={["text-neutral-700", currentSize.body, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}

export default PopoverBody;
