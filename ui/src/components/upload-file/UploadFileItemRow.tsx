import { KeyboardEvent } from "react";
import FileIcon from "./FileIcon";
import EyeIcon from "../icons/EyeIcon";
import DownloadIcon from "../icons/DownloadIcon";
import TrashIcon from "../icons/TrashIcon";
import ResetIcon from "../icons/ResetIcon";
import Spinner from "../icons/Spinner";
import { UploadFileItemRowProps } from "./types";
import { uploadFileRadiusConfig, uploadFileSizeConfig } from "./constants";
import { formatBytes } from "../upload-image/utils";
import { getPreviewFileSize, getPreviewItemStatus } from "./utils";
import { getSafeConfig } from "@/utils/function";
import { getFileName } from "@/components/file-preview/utils";

export default function UploadFileItemRow({
  item,
  index,
  listType = "list",
  size = "md",
  radius,
  disabled = false,
  readOnly = false,
  showPreviewButton = true,
  showDownloadButton = true,
  showRemoveButton = true,
  onRemove,
  onPreview,
  onDownload,
  onRetry,
  renderItem,
  className = "",
}: UploadFileItemRowProps) {
  const currentSize = getSafeConfig(size, uploadFileSizeConfig, "md");
  const effectiveRadius = getSafeConfig(radius, uploadFileRadiusConfig, "md");

  const fileName = getFileName(item);
  const fileSize = getPreviewFileSize(item);
  const { status, progress, error } = getPreviewItemStatus(item);

  const isUploading = status === "uploading";
  const isError = status === "error";

  const handleRemove = () => {
    if (disabled || readOnly) return;
    onRemove?.(item, index);
  };

  const handlePreview = () => {
    if (disabled) return;
    onPreview?.(item);
  };

  const handleDownload = () => {
    if (disabled) return;
    onDownload?.(item);
  };

  const handleRetry = () => {
    if (disabled || readOnly) return;
    onRetry?.(item, index);
  };

  if (renderItem) {
    return (
      <li data-testid="upload-file-item" className="list-none w-full">
        {renderItem(item, index, {
          remove: handleRemove,
          preview: handlePreview,
          download: handleDownload,
        })}
      </li>
    );
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (disabled) return;
    if ((e.key === "Delete" || e.key === "Backspace") && !readOnly) {
      e.preventDefault();
      handleRemove();
    }
  };

  if (listType === "grid") {
    return (
      <li
        data-testid="upload-file-item"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-label={`Tệp tin ${fileName}`}
        className={`group relative list-none flex flex-col justify-between p-3 ${effectiveRadius} border border-neutral-200 bg-white hover:border-primary-300 hover:shadow-xs transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden ${
          disabled ? "opacity-50 pointer-events-none bg-neutral-50" : ""
        } ${isError ? "border-error-300 bg-error-50/20" : ""} ${className}`}
      >
        <div className="flex items-start gap-2.5">
          <FileIcon file={item} size={size} />
          <div className="flex-1 min-w-0">
            {onPreview && !disabled ? (
              <button
                type="button"
                title={fileName}
                onClick={handlePreview}
                className={`truncate text-left font-medium text-neutral-800 ${currentSize.fileNameSize} hover:text-primary-600 hover:underline cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-500 rounded-xs block w-full`}
              >
                {fileName}
              </button>
            ) : (
              <p
                title={fileName}
                className={`truncate font-medium text-neutral-800 ${currentSize.fileNameSize}`}
              >
                {fileName}
              </p>
            )}
            <p className={`text-neutral-500 ${currentSize.fileMetaSize}`}>
              {isError ? (
                <span className="text-error-600 font-medium truncate block">{error || "Lỗi tải lên"}</span>
              ) : isUploading ? (
                <span className="text-primary-600 flex items-center gap-1 font-medium">
                  <Spinner width={12} height={12} className="animate-spin inline" />
                  Đang tải... {progress !== undefined ? `${progress}%` : ""}
                </span>
              ) : fileSize !== undefined ? (
                formatBytes(fileSize)
              ) : null}
            </p>
          </div>
        </div>

        {/* Progress Bar for Uploading */}
        {isUploading && progress !== undefined && (
          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-primary-500 h-1.5 rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {/* Card Actions */}
        <div className="flex items-center justify-end gap-1 mt-2.5 pt-2 border-t border-neutral-100">
          {isError && onRetry && !readOnly && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleRetry}
              aria-label={`Thử lại tải lên ${fileName}`}
              title="Thử lại"
              className={`text-neutral-500 hover:text-primary-600 hover:bg-primary-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <ResetIcon width={14} height={14} />
            </button>
          )}

          {showPreviewButton && onPreview && (
            <button
              type="button"
              disabled={disabled}
              onClick={handlePreview}
              aria-label={`Xem trước tệp ${fileName}`}
              title="Xem trước"
              className={`text-neutral-500 hover:text-primary-600 hover:bg-primary-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <EyeIcon width={14} height={14} />
            </button>
          )}

          {showDownloadButton && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleDownload}
              aria-label={`Tải xuống tệp ${fileName}`}
              title="Tải xuống"
              className={`text-neutral-500 hover:text-primary-600 hover:bg-primary-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <DownloadIcon width={14} height={14} />
            </button>
          )}

          {showRemoveButton && !readOnly && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleRemove}
              aria-label={`Xóa tệp ${fileName}`}
              title="Xóa tệp"
              className={`text-neutral-400 hover:text-error-600 hover:bg-error-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <TrashIcon width={14} height={14} />
            </button>
          )}
        </div>
      </li>
    );
  }

  // Default: 'list' row view
  return (
    <li
      data-testid="upload-file-item"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-label={`Tệp tin ${fileName}`}
      className={`group relative list-none flex flex-col w-full ${currentSize.itemPadding} ${effectiveRadius} border border-neutral-200 bg-white hover:border-primary-300 hover:bg-neutral-50/50 transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden ${
        disabled ? "opacity-50 pointer-events-none bg-neutral-50" : ""
      } ${isError ? "border-error-300 bg-error-50/20" : ""} ${className}`}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left: Icon & Name & Meta */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <FileIcon file={item} size={size} />

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {onPreview && !disabled ? (
                <button
                  type="button"
                  title={fileName}
                  onClick={handlePreview}
                  className={`truncate text-left font-medium text-neutral-800 ${currentSize.fileNameSize} hover:text-primary-600 hover:underline cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-500 rounded-xs`}
                >
                  {fileName}
                </button>
              ) : (
                <span
                  title={fileName}
                  className={`truncate font-medium text-neutral-800 ${currentSize.fileNameSize}`}
                >
                  {fileName}
                </span>
              )}
            </div>

            <div className={`flex items-center gap-2 text-neutral-500 ${currentSize.fileMetaSize}`}>
              {isError ? (
                <span className="text-error-600 font-medium truncate">{error || "Lỗi tải lên"}</span>
              ) : isUploading ? (
                <span className="text-primary-600 flex items-center gap-1 font-medium">
                  <Spinner width={12} height={12} className="animate-spin inline" />
                  Đang tải lên... {progress !== undefined ? `${progress}%` : ""}
                </span>
              ) : fileSize !== undefined ? (
                <span>{formatBytes(fileSize)}</span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {isError && onRetry && !readOnly && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleRetry}
              aria-label={`Thử lại tải lên ${fileName}`}
              title="Thử lại"
              className={`text-neutral-500 hover:text-primary-600 hover:bg-primary-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <ResetIcon width={15} height={15} />
            </button>
          )}

          {showPreviewButton && onPreview && (
            <button
              type="button"
              disabled={disabled}
              onClick={handlePreview}
              aria-label={`Xem trước tệp ${fileName}`}
              title="Xem trước"
              className={`text-neutral-500 hover:text-primary-600 hover:bg-primary-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <EyeIcon width={15} height={15} />
            </button>
          )}

          {showDownloadButton && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleDownload}
              aria-label={`Tải xuống tệp ${fileName}`}
              title="Tải xuống"
              className={`text-neutral-500 hover:text-primary-600 hover:bg-primary-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <DownloadIcon width={15} height={15} />
            </button>
          )}

          {showRemoveButton && !readOnly && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleRemove}
              aria-label={`Xóa tệp ${fileName}`}
              title="Xóa tệp"
              className={`text-neutral-400 hover:text-error-600 hover:bg-error-50 ${currentSize.actionButtonPadding} rounded-md transition-colors cursor-pointer`}
            >
              <TrashIcon width={15} height={15} />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar for Uploading in List View */}
      {isUploading && progress !== undefined && (
        <div className="w-full bg-neutral-100 rounded-full h-1 mt-2 overflow-hidden">
          <div
            className="bg-primary-500 h-1 rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </li>
  );
}
