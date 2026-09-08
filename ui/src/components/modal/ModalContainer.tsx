import { useEffect, useEffectEvent, useCallback, useMemo, useRef, useState } from "react";
import { MODAL_EXIT_ANIMATION_DURATION } from "./constants";
import { ModalContainerProps } from "./types";
import { ModalContext } from "./ModalContext";
import Toaster from "../toast/Toaster";

export default function ModalContainer({
  open = false,
  id,
  size,
  isLoading = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockScroll = true,
  overlayClassName = "",
  className = "",
  toaster = true,
  children,
  onClose,
  ...props
}: ModalContainerProps) {
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
    }, MODAL_EXIT_ANIMATION_DURATION);
  }, [isExiting, isLoading, onClose]);

  const contextValue = useMemo(
    () => ({
      onClose: handleTriggerClose,
      isLoading,
      size,
      dialogRef,
    }),
    [handleTriggerClose, isLoading, size]
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
        } catch {
          /* empty */
        }
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open, isExiting]);

  // Lock body scroll khi mở modal
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
   * Vì dialog có hàm onCancel xử lý sự kiện nhất ESC trên window nhưng
   * không thể bắt được ESC trong mọi môi trường và Cypress synthetic tests.
   * Nên chúng ta cần xử lý sự kiện ESC trên window.
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

  const backdropAnimation = isExiting ? "animate-modal-backdrop-out pointer-events-none" : "animate-modal-backdrop-in";

  const dialogAnimation = isExiting ? "animate-modal-out pointer-events-none" : "animate-modal-in";

  return (
    <ModalContext.Provider value={contextValue}>
      <dialog
        id={id}
        ref={dialogRef}
        aria-labelledby="modal-dialog-title"
        aria-describedby="modal-dialog-description"
        onCancel={(e) => {
          e.preventDefault();
          if (closeOnEsc !== false) {
            handleTriggerClose();
          }
        }}
        className={`fixed inset-0 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs border-none m-0 max-w-none max-h-none w-screen h-screen overflow-visible backdrop:bg-transparent ${backdropAnimation} ${overlayClassName}`}
        {...props}
      >
        {toaster !== false && (
          <Toaster
            position="top-right"
            {...(typeof toaster === "object" ? toaster : {})}
          />
        )}
        <div
          aria-hidden="true"
          onClick={handleOverlayClick}
          className="fixed inset-0 -z-10"
        />
        <div className={`w-full flex items-center justify-center pointer-events-none ${dialogAnimation} ${className}`}>
          {children}
        </div>
      </dialog>
    </ModalContext.Provider>
  );
}
