import { ChangeEvent, useEffect, useRef, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImage } from "./cropUtils";
import Modal from "../modal/Modal";
import ModalContainer from "../modal/ModalContainer";
import ModalHeader from "../modal/ModalHeader";
import ModalBody from "../modal/ModalBody";
import ZoomInIcon from "../icons/ZoomInIcon";
import ZoomOutIcon from "../icons/ZoomOutIcon";
import RotateCwIcon from "../icons/RotateCwIcon";
import RotateCcwIcon from "../icons/RotateCcwIcon";
import FlipHorizontalIcon from "../icons/FlipHorizontalIcon";
import ResetIcon from "../icons/ResetIcon";
import UploadIcon from "../icons/UploadIcon";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";
import Spinner from "../icons/Spinner";
import { useLocale } from "../common/OpenWayProvider";

export interface UploadAvatarCropContentProps {
  imageSrc?: string;
  file?: File | null;
  fileName?: string;
  fileType?: string;
  aspectRatio?: number;
  cropShape?: "round" | "rect";
  showGrid?: boolean;
  minZoom?: number;
  maxZoom?: number;
  onApply: (croppedFile: File) => void;
  onCancel?: () => void;
}

export type UploadAvatarCropModalProps = UploadAvatarCropContentProps & {
  open?: boolean;
  modalTitle?: string;
  onClose?: () => void;
};

export function UploadAvatarCropContent({
  imageSrc: initialImageSrc = "",
  file,
  fileName: initialFileName = "avatar-cropped.png",
  fileType: initialFileType = "image/png",
  aspectRatio = 1,
  cropShape = "round",
  showGrid = true,
  minZoom = 1,
  maxZoom = 4,
  onApply,
  onCancel,
}: UploadAvatarCropContentProps) {
  const uploadLocale = useLocale("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(file ?? null);
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const fileNameRef = useRef(file?.name || initialFileName);
  const fileTypeRef = useRef(file?.type || initialFileType);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const croppedAreaPixelsRef = useRef<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const handleZoomIn = () => setZoom((prev) => Math.min(maxZoom, Math.round((prev + 0.2) * 10) / 10));
  const handleZoomOut = () => setZoom((prev) => Math.max(minZoom, Math.round((prev - 0.2) * 10) / 10));
  const handleRotateCw = () => setRotation((prev) => (prev + 90) % 360);
  const handleRotateCcw = () => setRotation((prev) => (prev - 90 + 360) % 360);
  const handleFlipHorizontal = () => setIsFlipped((prev) => !prev);
  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setIsFlipped(false);
  };

  const handleChangeImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleNewFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      fileNameRef.current = newFile.name;
      fileTypeRef.current = newFile.type || "image/png";
      setSelectedFile(newFile);
      handleReset();
    }
  };

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    croppedAreaPixelsRef.current = croppedAreaPixels;
  };

  const handleSave = async () => {
    if (!croppedAreaPixelsRef.current) return;
    try {
      setIsProcessing(true);
      const croppedFile = await getCroppedImage(
        imageSrc,
        croppedAreaPixelsRef.current,
        rotation,
        isFlipped,
        fileNameRef.current,
        fileTypeRef.current
      );
      onApply(croppedFile);
    } catch (err) {
      console.error("Error cropping avatar:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onCancel?.();
  };

  const toolbarBtnClass =
    "p-1.5 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0";

  return (
    <div className="flex flex-col w-full select-none" data-testid="upload-avatar-crop-modal">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
        onChange={handleNewFileSelected}
      />

      <div className="relative w-full h-80 md:h-95 bg-neutral-950 overflow-hidden select-none">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspectRatio}
          cropShape={cropShape}
          showGrid={showGrid}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={handleCropComplete}
          classes={{
            mediaClassName: isFlipped ? "scale-x-[-1]" : "",
          }}
          style={{
            containerStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
            },
          }}
        />
      </div>

      <div className="w-full flex items-center justify-center py-2.5 px-3 bg-neutral-white border-t border-neutral-200 overflow-x-auto ui-scrollbar">
        <div className="inline-flex items-center flex-nowrap shrink-0 gap-1 bg-neutral-50 border border-neutral-200 rounded-full px-2.5 py-1 shadow-xs text-neutral-700">
          {/* 1. Chọn ảnh khác */}
          <button
            type="button"
            onClick={handleChangeImageClick}
            aria-label="Chọn ảnh khác"
            title="Chọn ảnh khác"
            className={`${toolbarBtnClass} text-neutral-700 hover:text-primary-600`}
            data-testid="avatar-crop-change-image-button"
          >
            <UploadIcon width={16} height={16} />
          </button>

          <div className="w-px h-3.5 bg-neutral-300 my-auto mx-0.5 shrink-0" />

          {/* 2. Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= minZoom}
            aria-label="Thu nhỏ"
            title="Thu nhỏ (-)"
            className={toolbarBtnClass}
          >
            <ZoomOutIcon width={16} height={16} />
          </button>

          {/* 3. Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= maxZoom}
            aria-label="Phóng to"
            title="Phóng to (+)"
            className={toolbarBtnClass}
          >
            <ZoomInIcon width={16} height={16} />
          </button>

          {/* 4. Rotate CCW */}
          <button
            type="button"
            onClick={handleRotateCcw}
            title="Xoay ngược chiều kim đồng hồ"
            aria-label="Xoay ngược chiều kim đồng hồ"
            className={toolbarBtnClass}
          >
            <RotateCcwIcon width={16} height={16} />
          </button>

          {/* 5. Rotate CW */}
          <button
            type="button"
            onClick={handleRotateCw}
            title="Xoay theo chiều kim đồng hồ"
            aria-label="Xoay theo chiều kim đồng hồ"
            className={toolbarBtnClass}
          >
            <RotateCwIcon width={16} height={16} />
          </button>

          {/* 6. Flip Horizontal */}
          <button
            type="button"
            onClick={handleFlipHorizontal}
            title="Lật ngang"
            aria-label="Lật ngang"
            className={toolbarBtnClass}
          >
            <FlipHorizontalIcon width={16} height={16} />
          </button>

          {/* 7. Reset */}
          <button
            type="button"
            onClick={handleReset}
            title={uploadLocale.reset}
            aria-label={uploadLocale.reset}
            className={toolbarBtnClass}
          >
            <ResetIcon width={16} height={16} />
          </button>

          <div className="w-px h-3.5 bg-neutral-300 my-auto mx-0.5 shrink-0" />

          {/* 8. Cancel / Close */}
          <button
            type="button"
            onClick={handleClose}
            aria-label={uploadLocale.cropCancel}
            title={uploadLocale.cropCancel}
            className={`${toolbarBtnClass} text-neutral-500 hover:text-error-600`}
            data-testid="avatar-crop-cancel-button"
          >
            <CloseIcon width={16} height={16} />
          </button>

          {/* 9. Xác nhận */}
          <button
            type="button"
            onClick={handleSave}
            disabled={isProcessing}
            aria-label={uploadLocale.cropConfirm}
            title={uploadLocale.cropConfirm}
            className="p-1.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white shadow-xs transition-colors active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden shrink-0"
            data-testid="avatar-crop-apply-button"
          >
            {isProcessing ? <Spinner width={16} height={16} /> : <CheckIcon width={16} height={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function UploadAvatarCropModal({
  open = true,
  modalTitle: modalTitleProp,
  onClose,
  onCancel,
  onApply,
  ...restProps
}: UploadAvatarCropModalProps) {
  const uploadLocale = useLocale("upload");
  const modalTitle = modalTitleProp ?? uploadLocale.cropTitle;
  const handleClose = () => {
    onCancel?.();
    onClose?.();
  };

  const handleApply = (croppedFile: File) => {
    onApply(croppedFile);
    onClose?.();
  };

  return (
    <ModalContainer
      open={open}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      onClose={handleClose}
    >
      <Modal
        size="lg"
        radius="xl"
        className="bg-neutral-white border border-neutral-200 shadow-2xl overflow-hidden p-0"
      >
        <ModalHeader
          title={
            <span className="font-semibold text-neutral-900" data-testid="avatar-crop-modal-title">
              {modalTitle}
            </span>
          }
          className="px-5 py-3.5 border-b border-neutral-200"
          showCloseButton
        />
        <ModalBody className="p-0 overflow-hidden">
          <UploadAvatarCropContent {...restProps} onApply={handleApply} onCancel={handleClose} />
        </ModalBody>
      </Modal>
    </ModalContainer>
  );
}
