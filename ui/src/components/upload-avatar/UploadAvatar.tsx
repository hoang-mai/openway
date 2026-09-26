import { MouseEvent, KeyboardEvent, useId, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMergeRefs } from "@floating-ui/react";
import LoadingImage from "../skeleton/LoadingImage";
import { UploadAvatarProps } from "./types";
import {
  uploadAvatarDragColorConfig,
  uploadAvatarIconColorConfig,
  uploadAvatarLabelColorConfig,
  uploadAvatarRadiusConfig,
  uploadAvatarSizeConfig,
  uploadAvatarVariantColorConfig,
} from "./constants";
import { normalizeAccept } from "./utils";
import FileContainer from "../file-preview/FileContainer";
import FilePreview from "../file-preview/FilePreview";
import { normalizePreviewFile } from "../file-preview/utils";
import { UploadAvatarCropModal } from "./UploadAvatarCrop";
import AvatarIcon from "../icons/AvatarIcon";
import TrashIcon from "../icons/TrashIcon";
import EyeIcon from "../icons/EyeIcon";
import CropIcon from "../icons/CropIcon";
import Spinner from "../icons/Spinner";
import HelperErrorText from "@/components/common/HelperErrorText";
import { getSafeConfig } from "@/utils/function";
import { PreviewFile } from "@/components/file-preview/types";
import { useLocale } from "@/locale";

export default function UploadAvatar({
  size = "md",
  variant = "outline",
  color = "primary",
  shape = "circle",
  radius,
  value,
  defaultValue,
  onChange,
  onRemove,
  onPreview,
  onClear,
  maxSize,
  accept = "image/*",
  crop = true,
  label,
  labelPlacement = "top",
  config,
  helperText,
  errorMessage,
  disabled = false,
  readOnly = false,
  icon,
  name,
  id,
  className = "",
  wrapperClassName = "",
  avatarClassName = "",
  avatarWrapperClassName = "",
  labelClassName = "",
  helperClassName = "",
  ref,
}: UploadAvatarProps) {
  const uploadLocale = useLocale("upload");
  const {
    isRequired = false,
    isInvalid = false,
    isLoading = false,
    showSpinner = false,
    isClearable = false,
    isFullWidth = false,
  } = config ?? {};

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorHelperId = `${inputId}-error-helper`;

  const isControlled = value !== undefined;
  const [internalItem, setInternalItem] = useState<PreviewFile | null>(defaultValue ?? null);
  const currentItem = isControlled ? value ?? null : internalItem;

  const normalized = normalizePreviewFile(currentItem);
  const fileName = normalized.name;

  const [cropData, setCropData] = useState<{
    file?: File;
    imageSrc?: string;
    fileName: string;
    fileType: string;
  } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [srAnnouncement, setSrAnnouncement] = useState<string>("");

  const activeError = errorMessage || validationError;
  const hasError = Boolean(isInvalid || activeError);
  const activeColor = hasError ? "error" : color;

  const currentSize = getSafeConfig(size, uploadAvatarSizeConfig, "md");
  const roundedClass = shape === "circle" ? "rounded-full" : getSafeConfig(radius, uploadAvatarRadiusConfig, "md");

  const variantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(activeColor, getSafeConfig(variant, uploadAvatarVariantColorConfig, "outline"), "primary");

  const iconColorStyle = getSafeConfig(activeColor, uploadAvatarIconColorConfig, "primary");
  const labelColorStyle = hasError
    ? "text-error-600 font-bold"
    : getSafeConfig(activeColor, uploadAvatarLabelColorConfig, "primary");
  const dragActiveStyle = getSafeConfig(activeColor, uploadAvatarDragColorConfig, "primary");

  const updateItem = (newItem: PreviewFile | null) => {
    if (!isControlled) {
      setInternalItem(newItem);
    }
    onChange?.(newItem);
  };

  const isCropActive = crop !== false;
  const cropOptions = typeof crop === "object" ? crop : {};

  const handleOpenCropModal = (options: { file?: File; imageSrc?: string }) => {
    setCropData({
      file: options.file,
      imageSrc: options.imageSrc,
      fileName: fileName || "avatar.png",
      fileType: normalized.type || "image/png",
    });
  };

  const handleRemove = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (disabled || readOnly || isLoading) return;
    if (currentItem) {
      const removedItem = currentItem;
      updateItem(null);
      onRemove?.(removedItem);
      onClear?.();
      setSrAnnouncement(uploadLocale.avatarRemovedSr);
    }
  };

  const handlePreview = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (!currentItem) return;

    setIsPreviewOpen(true);
    onPreview?.(currentItem);
  };

  const handleRecrop = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (!currentItem) return;
    if (normalized.file) {
      handleOpenCropModal({ file: normalized.file });
    } else if (normalized.serverFile?.src) {
      handleOpenCropModal({ imageSrc: normalized.serverFile.src });
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, inputRef } = useDropzone({
    multiple: false,
    maxSize,
    accept: useMemo(() => normalizeAccept(accept), [accept]),
    disabled: disabled || readOnly || isLoading,
    onDropAccepted: ([file]) => {
      if (!file) return;
      setValidationError(null);
      if (isCropActive) {
        handleOpenCropModal({ file });
      } else {
        updateItem(file);
        setSrAnnouncement(uploadLocale.avatarUploadedSr);
      }
    },
    onDropRejected: (rejections) => {
      const err = rejections[0]?.errors[0];
      const msg =
        err?.code === "file-too-large"
          ? uploadLocale.maxSizeError(maxSize ? `${(maxSize / (1024 * 1024)).toFixed(1)}MB` : "")
          : err?.code === "file-invalid-type"
            ? uploadLocale.invalidTypeError
            : err?.message || uploadLocale.invalidTypeError;
      setValidationError(msg);
      setSrAnnouncement(uploadLocale.fileErrorSr(msg));
    },
  });

  const mergedInputRef = useMergeRefs([inputRef, ref]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || readOnly || isLoading) return;
    if (currentItem && (e.key === "Delete" || e.key === "Backspace")) {
      e.preventDefault();
      e.stopPropagation();
      handleRemove();
    }
  };

  // Label Element (Đồng bộ quy chuẩn Label & A11y của Input)
  const renderLabel = () => {
    if (!label) return null;

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-center font-bold transition-colors duration-150 ${currentSize.label} ${labelColorStyle} ${labelClassName}`}
      >
        {label}
        {isRequired && (
          <span className="text-error-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  };

  const inputContainerBase =
    "group/avatar relative flex items-center justify-center transition-colors duration-150 ease-in-out border-2 overflow-hidden select-none";
  const disabledStyles = disabled
    ? "opacity-50"
    : "cursor-pointer";

  const dragStyles = isDragReject
    ? "ring-2 ring-error-500/40 border-error-500 bg-error-50/80"
    : isDragActive
      ? dragActiveStyle
      : "";

  const avatarBoxClasses = [
    inputContainerBase,
    currentSize.avatarSize,
    roundedClass,
    variantStyles,
    disabledStyles,
    dragStyles,
    avatarClassName || avatarWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const isHorizontal = labelPlacement === "left";
  const effectiveWrapperClassName = wrapperClassName || className;

  return (
    <div
      className={`group/field flex ${
        isHorizontal ? "flex-row items-center gap-3" : "flex-col"
      } ${isFullWidth ? "w-full" : "inline-flex"} ${effectiveWrapperClassName}`}
    >
      {/* Hidden File Input (react-dropzone) */}
      <input
        {...getInputProps({
          id: inputId,
          name: name,
          disabled: disabled || isLoading,
          "aria-hidden": true,
          tabIndex: -1,
          className: "hidden",
        })}
        ref={mergedInputRef}
      />

      {/* Screen Reader Live Announcement */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {srAnnouncement}
      </div>

      {/* Label */}
      {renderLabel()}

      {/* Avatar Container & Helpers */}
      <div className={`flex flex-col ${isFullWidth ? "w-full" : ""}`}>
        <div
          {...getRootProps({
            role: "button",
            tabIndex: disabled || isLoading ? -1 : 0,
            "aria-label": "Tải lên ảnh đại diện",
            "aria-disabled": disabled || isLoading,
            "aria-invalid": hasError,
            "aria-required": isRequired,
            "aria-describedby": errorMessage || helperText || validationError ? errorHelperId : undefined,
            "aria-busy": isLoading,
            onKeyDown: handleKeyDown,
            className: avatarBoxClasses,
          })}
        >
          {/* 1. Image present */}
          {currentItem ? (
            <LoadingImage
              src={currentItem}
              alt={fileName || "Avatar"}
              fill
              radius={shape === "circle" ? "full" : radius}
              preview={false}
              className="object-cover"
              wrapperClassName="w-full h-full"
            />
          ) : (
            /* 2. Empty Placeholder Icon */
            <div
              className={`flex flex-col items-center justify-center transition-colors ${iconColorStyle} ${currentSize.iconClass}`}
            >
              {icon || <AvatarIcon width={currentSize.iconSize} height={currentSize.iconSize} />}
            </div>
          )}

          {/* Loading Spinner Overlay */}
          {isLoading && showSpinner && (
            <div
              className="absolute inset-0 bg-neutral-950/60 flex items-center justify-center text-neutral-white z-20"
              role="status"
              aria-label="Đang tải"
            >
              <Spinner width={currentSize.iconSize} height={currentSize.iconSize} className="animate-spin" />
            </div>
          )}

          {/* Hover Action Overlay - ONLY when an image exists and not uploading/disabled */}
          {!isLoading && !disabled && currentItem && (
            <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-neutral-white z-10">
              {/* Preview Button */}
              <button
                type="button"
                onClick={handlePreview}
                aria-label="Xem trước ảnh đại diện"
                title="Xem trước"
                className="p-1 rounded-full text-neutral-white hover:bg-neutral-white/20 focus-visible:ring-2 focus-visible:ring-neutral-white focus-visible:outline-hidden cursor-pointer"
                data-testid="avatar-preview-button"
              >
                <EyeIcon width={14} height={14} />
              </button>

              {/* Crop Button */}
              {isCropActive && !readOnly && (
                <button
                  type="button"
                  onClick={handleRecrop}
                  aria-label="Cắt ảnh đại diện"
                  title="Cắt ảnh"
                  className="p-1 rounded-full text-neutral-white hover:bg-neutral-white/20 focus-visible:ring-2 focus-visible:ring-neutral-white focus-visible:outline-hidden cursor-pointer"
                  data-testid="avatar-crop-button"
                >
                  <CropIcon width={14} height={14} />
                </button>
              )}

              {/* Remove Button (hoặc isClearable) */}
              {(!readOnly || isClearable) && (
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label="Xóa ảnh đại diện"
                  title="Xóa ảnh"
                  className="p-1 rounded-full text-error-300 hover:text-error-200 hover:bg-neutral-white/20 focus-visible:ring-2 focus-visible:ring-error-400 focus-visible:outline-hidden cursor-pointer"
                  data-testid="avatar-remove-button"
                >
                  <TrashIcon width={14} height={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Helper & Error Message Rendering */}
        <HelperErrorText
          id={errorHelperId}
          helperText={helperText}
          errorMessage={activeError}
          sizeClassName={currentSize.helper}
          className={helperClassName}
        />

        {/* Crop Modal */}
        {isCropActive && cropData && (
          <UploadAvatarCropModal
            open={Boolean(cropData)}
            file={cropData.file}
            imageSrc={cropData.imageSrc}
            fileName={cropData.fileName}
            fileType={cropData.fileType}
            aspectRatio={cropOptions.aspectRatio ?? 1}
            cropShape={cropOptions.cropShape ?? (shape === "circle" ? "round" : "rect")}
            showGrid={cropOptions.showGrid ?? true}
            minZoom={cropOptions.minZoom ?? 1}
            maxZoom={cropOptions.maxZoom ?? 4}
            modalTitle={cropOptions.modalTitle || uploadLocale.cropTitle}
            onClose={() => setCropData(null)}
            onApply={(croppedFile: File) => {
              updateItem(croppedFile);
              setSrAnnouncement(uploadLocale.avatarUpdatedSr);
              setCropData(null);
            }}
          />
        )}
        {/* File Preview Modal with FilePreview */}
        {isPreviewOpen && currentItem && (
          <FileContainer
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            file={currentItem}
            title={fileName || "Xem trước ảnh đại diện"}
          >
            <FilePreview
              imageProps={{
                minZoom: 0.5,
                maxZoom: 4,
                toolbarProps: {
                  tools: { rotate: true, flip: true, download: true },
                },
              }}
            />
          </FileContainer>
        )}
      </div>
    </div>
  );
}
