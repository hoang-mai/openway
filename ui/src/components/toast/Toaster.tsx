import { useEffect, useRef } from "react";
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
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = popoverRef.current;
    if (!el || typeof el.showPopover !== "function") return;

    try {
      el.showPopover();
    } catch {
      /* empty */
    }

    // Khi có Toast mới xuất hiện, re-promote popover lên đỉnh của Top Layer
    // để đảm bảo luôn hiển thị trên cả các dialog mở sau Toaster
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          try {
            el.hidePopover();
            el.showPopover();
          } catch {
            /* empty */
          }
          break;
        }
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={popoverRef}
      popover="manual"
      className="fixed inset-0 m-0 p-0 border-none bg-transparent max-w-none max-h-none w-screen h-screen pointer-events-none overflow-visible backdrop:bg-transparent backdrop:pointer-events-none"
    >
      <SonnerToaster
        position={position}
        visibleToasts={visibleToasts}
        expand={expand}
        duration={duration}
        closeButton={closeButton}
        className={`toaster group pointer-events-auto ${className}`}
        toastOptions={{
          unstyled: true,
          className: "w-full max-w-md pointer-events-auto",
          ...toastOptions,
        }}
        {...props}
      />
    </div>
  );
}
