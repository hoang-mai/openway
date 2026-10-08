import { KeyboardEvent } from "react";
import UploadIcon from "../icons/UploadIcon";
import Spinner from "../icons/Spinner";
import ResetIcon from "../icons/ResetIcon";
import TrashIcon from "../icons/TrashIcon";
import LoadingImage from "../skeleton/LoadingImage";
import {
  UploadImageDropzoneProps,
} from "./types";
import {
  dropzoneImageHeights,
  uploadImageRadiusConfig,
  uploadImageSizeConfig,
  uploadImageVariantColorConfig,
} from "./constants";
import { getSafeConfig } from "@/utils/function";
import { getFileName } from "@/lib/file-preview/utils";
import { useLocale } from "@/locale";

export default function UploadImageDropzone({
  size = "md",
  color = "primary",
  variant = "outline",
  radius,
  shape = "rectangle",
  objectFit = "contain",
  disabled = false,
  readOnly = false,
  isLoading = false,
  dragStatus = "idle",
  isInvalid = false,
  dropzoneTitle,
  dropzoneDescription,
  icon,
  item,
  onRemove,
  onPreview,
  onTriggerUpload,
  getRootProps,
  className = "",
  describedById,
}: UploadImageDropzoneProps) {
  const uploadLocale = useLocale("upload", {
    dragDropText: typeof dropzoneTitle === "string" ? dropzoneTitle : undefined,
    imageDropzoneDescription: typeof dropzoneDescription === "string" ? dropzoneDescription : undefined,
  });
  const currentSize = getSafeConfig(size, uploadImageSizeConfig, "md");
  const effectiveRadius = getSafeConfig(radius, uploadImageRadiusConfig, "md");

  const activeHeight = shape === "square" ? "aspect-square w-full" : getSafeConfig(size, dropzoneImageHeights, "md");

  const effectiveColor = isInvalid ? "error" : color;
  const variantConfig = variant !== "other" ? getSafeConfig(variant, uploadImageVariantColorConfig, "outline") : null;
  const colorStyles = variantConfig ? getSafeConfig(effectiveColor, variantConfig, "primary") : null;

  const isDragActive = dragStatus === "active";
  const isDragReject = dragStatus === "reject";
  const isDrag = isDragActive;
  const dragStyle = isDragReject
    ? "border-error-500 bg-error-50/50 ring-2 ring-error-500/20 text-error-900"
    : isDrag
      ? colorStyles?.active || "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
      : colorStyles?.idle || "border-neutral-300 bg-neutral-50/50 hover:border-primary-500 hover:bg-primary-50/30";

  const containerClasses = item
    ? `group relative w-full ${activeHeight} ${effectiveRadius} overflow-hidden border-2 transition-colors duration-150 ease-in-out cursor-pointer select-none ${
        isDrag ? "border-dashed " + dragStyle : "border-solid border-neutral-200 hover:border-primary-400"
      } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden ${className}`
    : `group relative w-full ${shape === "square" ? "aspect-square w-full" : currentSize.dropzoneHeight} ${
        currentSize.dropzonePadding
      } ${effectiveRadius} border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors duration-150 ease-in-out cursor-pointer ${dragStyle} ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none bg-neutral-100" : ""
      } focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden ${className}`;

  const itemName = getFileName(item);

  const defaultProps = {
    role: "button",
    "aria-label": item
      ? uploadLocale.uploadedImageAriaLabel
        ? uploadLocale.uploadedImageAriaLabel(itemName)
        : itemName
      : uploadLocale.imageDropzoneAriaLabel,
    "aria-disabled": disabled,
    "aria-invalid": isInvalid,
    "aria-describedby": describedById,
    "aria-busy": isLoading,
    className: containerClasses,
    onClick: () => {
      if (disabled || isLoading) return;
      if (item) {
        onPreview?.();
      }
    },
    onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled || isLoading) return;
      if (e.key === "Enter" || e.key === " ") {
        if (item) {
          e.preventDefault();
          onPreview?.();
        }
      }
    },
  };

  const containerProps = getRootProps ? getRootProps(defaultProps) : defaultProps;

  return (
    <div {...containerProps}>
      {item ? (
        <>
          {/* Uploaded Single Image */}
          <LoadingImage
            src={item}
            alt={itemName}
            fill
            radius={radius ?? "md"}
            objectFit={objectFit}
            preview={false}
            wrapperClassName="w-full h-full"
          />

          {/* Action buttons in top-right corner */}
          {!isLoading && !disabled && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
              {/* Replace / Change Image Button */}
              {!readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTriggerUpload?.();
                  }}
                  aria-label={uploadLocale.replaceImageAriaLabel}
                  title={uploadLocale.replaceImage}
                  className="p-1.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-900/80 text-white backdrop-blur-xs transition-colors shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden"
                  data-testid="dropzone-replace-button"
                >
                  <ResetIcon width={16} height={16} />
                </button>
              )}

              {/* Remove / Delete Image Button */}
              {!readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                  aria-label={uploadLocale.removeImageAriaLabel}
                  title={uploadLocale.removeImage}
                  className="p-1.5 rounded-lg bg-neutral-900/60 hover:bg-error-600 text-white backdrop-blur-xs transition-colors shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:outline-hidden"
                  data-testid="dropzone-remove-button"
                >
                  <TrashIcon width={16} height={16} />
                </button>
              )}
            </div>
          )}

          {/* Loading Spinner Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-neutral-950/60 flex flex-col items-center justify-center text-white z-20">
              <Spinner width={currentSize.iconSize * 0.8} height={currentSize.iconSize * 0.8} className="animate-spin" />
              <span className={`${currentSize.titleSize} font-medium mt-1`}>{uploadLocale.processingImage}</span>
            </div>
          )}

          {/* Drag Overlay */}
          {isDrag && (
            <div className="absolute inset-0 bg-primary-950/50 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20 transition-opacity">
              <UploadIcon width={currentSize.iconSize} height={currentSize.iconSize} className="animate-bounce" />
              <span className={`${currentSize.titleSize} font-medium mt-1`}>{uploadLocale.dropToReplace}</span>
            </div>
          )}
        </>
      ) : isLoading ? (
        <div
          className={`flex flex-col items-center justify-center gap-2 ${colorStyles?.iconColor || "text-primary-600"}`}
        >
          <Spinner width={currentSize.iconSize * 0.8} height={currentSize.iconSize * 0.8} />
          <span className={`${currentSize.titleSize} font-medium`}>{uploadLocale.processingImage}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          {/* Icon */}
          <div className={`transition-colors ${colorStyles?.iconColor || "text-neutral-400 group-hover:text-neutral-600"}`}>
            {icon || <UploadIcon width={currentSize.iconSize} height={currentSize.iconSize} />}
          </div>

          {/* Title */}
          <div
            className={`${currentSize.titleSize} font-medium text-neutral-800 ${
              colorStyles?.titleHover || "group-hover:text-neutral-900"
            } transition-colors`}
          >
            {dropzoneTitle ?? uploadLocale.dragDropText}
          </div>

          {/* Description */}
          <div id={describedById} className={`${currentSize.descSize} text-neutral-600`}>
            {dropzoneDescription ?? uploadLocale.imageDropzoneDescription}
          </div>
        </div>
      )}
    </div>
  );
}
