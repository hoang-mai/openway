import { useEffect, useEffectEvent, useCallback, useMemo, useRef, useState } from "react";
import { CONFIRM_EXIT_ANIMATION_DURATION } from "./constants";
import { ConfirmContainerProps } from "./types";
import { ConfirmContext } from "./ConfirmContext";

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
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTriggerClose = useCallback(() => {
    if (isExiting || isLoading) return;

    setIsExiting(true);
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }
    exitTimerRef.current = setTimeout(() => {
      setIsExiting(false);
      onClose?.();
    }, CONFIRM_EXIT_ANIMATION_DURATION);
  }, [isExiting, isLoading, onClose]);

  const contextValue = useMemo(
    () => ({
      onClose: handleTriggerClose,
      isLoading,
      size,
      color,
      dialogRef,
    }),
    [handleTriggerClose, isLoading, size, color]
  );

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
    if (!lockScroll) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lockScroll]);

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
    </ConfirmContext.Provider>
  );
}
