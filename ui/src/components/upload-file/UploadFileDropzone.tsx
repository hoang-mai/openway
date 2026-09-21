import { KeyboardEvent } from "react";
import UploadIcon from "../icons/UploadIcon";
import Spinner from "../icons/Spinner";
import { UploadFileDropzoneProps } from "./types";
import {
  dropzoneFileHeights,
  uploadFileRadiusConfig,
  uploadFileSizeConfig,
  uploadFileVariantColorConfig,
} from "./constants";
import { getSafeConfig } from "@/utils/function";
import { useLocale } from "../common/OpenWayProvider";

export default function UploadFileDropzone({
  size = "md",
  color = "primary",
  variant = "outline",
  radius,
  shape = "rectangle",
  compact = false,
  disabled = false,
  readOnly = false,
  isLoading = false,
  showSpinner = false,
  dragStatus = "idle",
  isInvalid = false,
  dropzoneTitle,
  dropzoneDescription,
  icon,
  onTriggerUpload,
  getRootProps,
  className = "",
  describedById,
}: UploadFileDropzoneProps) {
  const uploadLocale = useLocale("upload");
  const currentSize = getSafeConfig(size, uploadFileSizeConfig, "md");
  const effectiveRadius = getSafeConfig(radius, uploadFileRadiusConfig, "md");

  const effectiveColor = isInvalid ? "error" : color;
  const variantConfig =
    variant !== "other" ? getSafeConfig(variant, uploadFileVariantColorConfig, "outline") : null;
  const colorStyles = variantConfig ? getSafeConfig(effectiveColor, variantConfig, "primary") : null;

  const defaultTitle = uploadLocale.dragDropText;
  const defaultDesc = uploadLocale.dropzoneDescription;

  const isDragActive = dragStatus === "active";
  const isDragReject = dragStatus === "reject";

  const dragStyle = isDragReject
    ? "border-error-500 bg-error-50/50 ring-2 ring-error-500/20 text-error-900"
    : isDragActive
      ? colorStyles?.active || "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
      : colorStyles?.idle || "border-neutral-300 bg-neutral-50/50 hover:border-primary-500 hover:bg-primary-50/30";

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || isLoading || readOnly) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTriggerUpload?.();
    }
  };

  // Compact Mode
  if (compact) {
    const compactClasses = `group relative w-full ${currentSize.compactMinHeight} ${currentSize.compactPadding} ${effectiveRadius} border-2 border-dashed flex items-center justify-between gap-3 text-left transition-colors duration-150 ease-in-out cursor-pointer select-none ${dragStyle} ${
      disabled || readOnly ? "opacity-50 cursor-not-allowed pointer-events-none bg-neutral-100" : ""
    } focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden ${className}`;

    const defaultCompactProps = {
      role: "button",
      tabIndex: disabled || readOnly ? -1 : 0,
      "aria-label": "Khu vực tải tệp lên thu gọn",
      "aria-disabled": disabled || readOnly,
      "aria-invalid": isInvalid,
      "aria-describedby": describedById,
      "aria-busy": isLoading,
      className: compactClasses,
      onKeyDown: handleKeyDown,
    };

    const rootProps = getRootProps ? getRootProps(defaultCompactProps) : defaultCompactProps;

    return (
      <div {...rootProps}>
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className={`transition-colors shrink-0 ${colorStyles?.iconColor || "text-neutral-400 group-hover:text-neutral-600"}`}>
            {isLoading && showSpinner ? (
              <Spinner width={18} height={18} className="animate-spin text-neutral-600" />
            ) : (
              icon || <UploadIcon width={18} height={18} />
            )}
          </div>
          <span className={`truncate text-neutral-700 font-medium ${currentSize.descSize}`}>
            {dropzoneTitle || uploadLocale.dragDropText}
          </span>
        </div>

        <span
          className={`shrink-0 text-primary-600 group-hover:text-primary-700 font-semibold ${currentSize.descSize}`}
        >
          {uploadLocale.browseButton}
        </span>
      </div>
    );
  }

  // Standard Dropzone Container
  const containerClasses = `group relative w-full ${
    shape === "square"
      ? "aspect-square w-full"
      : getSafeConfig(size, dropzoneFileHeights, "md")
  } ${currentSize.dropzonePadding} ${effectiveRadius} border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors duration-150 ease-in-out cursor-pointer select-none ${dragStyle} ${
    disabled || readOnly ? "opacity-50 cursor-not-allowed pointer-events-none bg-neutral-100" : ""
  } focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden ${className}`;

  const defaultProps = {
    role: "button",
    tabIndex: disabled || readOnly ? -1 : 0,
    "aria-label": "Khu vực kéo thả và tải tệp tin lên",
    "aria-disabled": disabled || readOnly,
    "aria-invalid": isInvalid,
    "aria-describedby": describedById,
    "aria-busy": isLoading,
    className: containerClasses,
    onKeyDown: handleKeyDown,
  };

  const rootProps = getRootProps ? getRootProps(defaultProps) : defaultProps;

  return (
    <div {...rootProps}>
      {isLoading && showSpinner ? (
        <div
          className={`flex flex-col items-center justify-center gap-2 ${
            colorStyles?.iconColor || "text-primary-600"
          }`}
        >
          <Spinner width={currentSize.iconSize * 0.8} height={currentSize.iconSize * 0.8} />
          <span className={`${currentSize.titleSize} font-medium`}>Đang xử lý tệp tin...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          {/* Central Icon */}
          <div className={`transition-colors ${colorStyles?.iconColor || "text-neutral-400 group-hover:text-neutral-600"}`}>
            {icon || <UploadIcon width={currentSize.iconSize} height={currentSize.iconSize} />}
          </div>

          {/* Title */}
          <div
            className={`${currentSize.titleSize} font-medium text-neutral-800 ${
              colorStyles?.titleHover || "group-hover:text-neutral-900"
            } transition-colors`}
          >
            {isLoading ? "Đang xử lý tệp tin..." : (dropzoneTitle ?? defaultTitle)}
          </div>

          {/* Description */}
          <div id={describedById} className={`${currentSize.descSize} text-neutral-500`}>
            {dropzoneDescription ?? defaultDesc}
          </div>
        </div>
      )}
    </div>
  );
}
