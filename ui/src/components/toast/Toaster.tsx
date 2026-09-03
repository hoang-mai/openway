import { Toaster as SonnerToaster } from "sonner";
import { ToasterProps } from "./types";
import { DEFAULT_TOAST_DURATION } from "./constants";

export default function Toaster({
  position = "top-right",
  visibleToasts = 3,
  expand = false,
  duration = DEFAULT_TOAST_DURATION,
  closeButton = false,
  className = "",
  toastOptions,
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      visibleToasts={visibleToasts}
      expand={expand}
      duration={duration}
      closeButton={closeButton}
      className={`toaster group ${className}`}
      toastOptions={{
        unstyled: true,
        className: "w-full max-w-md pointer-events-auto",
        ...toastOptions,
      }}
      {...props}
    />
  );
}
