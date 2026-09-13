import { useEffect, useEffectEvent, useCallback, useMemo, useRef, useState } from "react";
import { CONFIRM_EXIT_ANIMATION_DURATION } from "./constants";
import { ConfirmContainerProps } from "./types";
import { ConfirmContext } from "./ConfirmContext";
import { PortalRootContext } from "@/components/portal/PortalRootContext";

export default function ConfirmContainer({
  open = false,
  size = "md",
  color = "warning",
  isLoading = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockScroll = true,
  overlayClassName = "",
  className = "",
  children,
  onClose,
  ...props
}: ConfirmContainerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const prevOpenRef = useRef(open);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Phản ứng khi prop `open` thay đổi
  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;

    if (wasOpen && !open) {
      // Khi chuyển từ true sang false: kích hoạt exit animation trong 250ms
      setIsExiting(true);
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
      exitTimerRef.current = setTimeout(() => {
        setIsExiting(false);
      }, CONFIRM_EXIT_ANIMATION_DURATION);
    } else if (!wasOpen && open) {
      // Nếu mở lại trong khi đang exit animation: hủy timer và khôi phục
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
      setIsExiting(false);
    }
  }, [open]);

  const handleTriggerClose = useCallback(() => {
    if (isExiting || isLoading) return;
    onClose?.();
  }, [isExiting, isLoading, onClose]);

  const contextValue = useMemo(
    () => ({
      onClose: handleTriggerClose,
      isLoading,
      size,
      color,
    }),
    [handleTriggerClose, isLoading, size, color]
  );

  const portalRoot = useMemo(() => dialogRef, []);

  // Clear timeout exit khi unmount
  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  // Mở / đóng dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open || isExiting) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch { /* empty */ }
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open, isExiting]);

  // Lock body scroll khi mở dialog
  useEffect(() => {
    if (!lockScroll || (!open && !isExiting)) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lockScroll, open, isExiting]);

  /**
   * Xử lý sự kiện javascript gọi phím ESC
   * Bắt sự kiện ESC trên window qua useEffectEvent.
   */
  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (!open || closeOnEsc === false) return;

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      handleTriggerClose();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!open && !isExiting) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      handleTriggerClose();
    }
  };

  const backdropAnimation = isExiting
    ? "animate-confirm-backdrop-out pointer-events-none"
    : "animate-confirm-backdrop-in";

  const dialogAnimation = isExiting ? "animate-confirm-out pointer-events-none" : "animate-confirm-in";

  return (
    <ConfirmContext.Provider value={contextValue}>
      <PortalRootContext.Provider value={portalRoot}>
        <dialog
          ref={dialogRef}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          onCancel={(e) => {
            e.preventDefault();
            if (closeOnEsc !== false) {
              handleTriggerClose();
            }
          }}
          className={`fixed inset-0 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs border-none m-0 max-w-none max-h-none w-screen h-screen overflow-visible backdrop:bg-transparent ${backdropAnimation} ${overlayClassName}`}
          {...props}
        >
          <div aria-hidden="true" onClick={handleOverlayClick} className="fixed inset-0 -z-10" />
          <div className={`w-full flex items-center justify-center pointer-events-none ${dialogAnimation} ${className}`}>
            {children}
          </div>
        </dialog>
      </PortalRootContext.Provider>
    </ConfirmContext.Provider>
  );
}
