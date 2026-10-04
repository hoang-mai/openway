import { useMemo } from "react";
import { FileContainerProps } from "./types";
import { normalizePreviewFile } from "./utils";
import { FileContext } from "./FileContext";
import FilePreview from "./FilePreview";
import Modal from "../modal/Modal";
import ModalContainer from "../modal/ModalContainer";
import ModalHeader from "../modal/ModalHeader";
import ModalBody from "../modal/ModalBody";

/**
 * Component `<FileContainer>`: Hộp thoại bọc Modal Dialog quản lý Backdrop, Top Layer, ESC và Lock Scroll
 * Nhận prop `file` và truyền xuống `<FilePreview />` qua `FileContext`.
 */
export default function FileContainer({
  open = false,
  onClose,
  file,
  title,
  description,
  size = "lg",
  radius = "xl",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockScroll = true,
  className = "",
  overlayClassName = "",
  children,
}: FileContainerProps) {
  const normalized = normalizePreviewFile(file);
  const headerTitle = title ?? normalized?.name;

  const contextValue = useMemo(() => ({ file, headerTitle }), [file, headerTitle]);

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
      lockScroll={lockScroll}
      overlayClassName={overlayClassName}
    >
      <Modal
        size={size}
        radius={radius}
        data-testid="image-preview-modal"
        className={`bg-neutral-white border border-neutral-200 text-neutral-900 shadow-2xl overflow-hidden p-0 ${className}`}
      >
        {(headerTitle || showCloseButton) && (
          <ModalHeader
            title={headerTitle}
            description={description}
            showCloseButton={showCloseButton}
            className="px-5 py-3.5 border-b border-neutral-200 shrink-0"
          />
        )}
        <ModalBody className="p-0 overflow-hidden flex flex-col flex-1 min-h-0">
          <FileContext.Provider value={contextValue}>
            {children ? children : <FilePreview />}
          </FileContext.Provider>
        </ModalBody>
      </Modal>
    </ModalContainer>
  );
}
