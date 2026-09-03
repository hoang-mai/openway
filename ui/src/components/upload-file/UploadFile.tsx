import { useId, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import UploadIcon from "../icons/UploadIcon";
import FileContainer from "../file-preview/FileContainer";
import { downloadFile, getFileName } from "../file-preview/utils";
import HelperErrorText from "@/components/common/HelperErrorText";
import UploadFileDropzone from "./UploadFileDropzone";
import UploadFileList from "./UploadFileList";
import { UploadFileProps } from "./types";
import { uploadFileLabelColorConfig, uploadFileSizeConfig } from "./constants";
import { formatBytes, normalizeInitialValues } from "../upload-image/utils";
import { normalizeAccept } from "./utils";
import { getSafeConfig } from "@/utils/function";
import { PreviewFile } from "@/components/file-preview/types";

export default function UploadFile({
  value,
  defaultValue,
  onChange,
  onRemove,
  onPreview,
  onDownload,
  onRetry,
  maxCount,
  maxSize,
  minSize,
  accept,
  beforeUpload,
  viewMode = "dropzone",
  listType = "list",
  shape = "rectangle",
  size = "md",
  color = "primary",
  variant = "outline",
  radius,
  label,
  labelClassName = "",
  helperText,
  errorMessage,
  disabled = false,
  readOnly = false,
  dropzoneTitle,
  dropzoneDescription,
  buttonText = "Tải tệp lên",
  icon,
  renderItem,
  className = "",
  dropzoneClassName = "",
  listClassName = "",
  previewClassName = "",
  helperClassName = "",
  config,
}: UploadFileProps) {
  const {
    isRequired = false,
    isInvalid: isInvalidConfig = false,
    isLoading = false,
    showSpinner = false,
    multiple = false,
    showFileList = true,
    showPreviewButton = true,
    showDownloadButton = true,
    showRemoveButton = true,
  } = config ?? {};

  const generatedId = useId();
  const inputId = `${generatedId}-input`;
  const errorHelperId = `${generatedId}-error-helper`;

  // Controlled vs Uncontrolled State
  const isControlled = value !== undefined;
  const [internalItems, setInternalItems] = useState<PreviewFile[]>(() =>
    normalizeInitialValues(defaultValue)
  );
  const currentItems = useMemo(
    () => (isControlled ? normalizeInitialValues(value) : internalItems),
    [isControlled, value, internalItems]
  );

  // Internal validation error and preview modal state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<PreviewFile | null>(null);

  // Screen Reader live announcement
  const [srAnnouncement, setSrAnnouncement] = useState<string>("");

  const currentSize = getSafeConfig(size, uploadFileSizeConfig, "md");
  const effectiveRadius = radius ?? "md";
  const isInvalid = Boolean(isInvalidConfig || errorMessage || validationError);
  const activeErrorMessage = errorMessage || validationError;
  const activeColor = isInvalid ? "error" : color;
  const labelColorStyle = isInvalid
    ? "text-error-600"
    : getSafeConfig(activeColor, uploadFileLabelColorConfig, "primary");

  const effectiveMaxCount = maxCount ?? (multiple ? undefined : 1);

  const updateItems = (newItems: PreviewFile[]) => {
    if (!isControlled) {
      setInternalItems(newItems);
    }
    onChange?.(newItems);
  };

  const normalizedAccept = useMemo(() => normalizeAccept(accept), [accept]);

  // react-dropzone integration
  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    multiple,
    maxSize,
    minSize,
    accept: normalizedAccept,
    disabled: disabled || readOnly || isLoading,
    noClick: viewMode === "button",
    noKeyboard: viewMode === "button",
    onDropAccepted: async (acceptedFiles) => {
      if (disabled || readOnly) return;
      setValidationError(null);

      if (acceptedFiles.length === 0) return;

      let allowedFiles = acceptedFiles;
      const currentCount = currentItems.length;

      if (effectiveMaxCount !== undefined) {
        if (!multiple) {
          const firstFile = acceptedFiles[0];
          if (!firstFile) return;
          allowedFiles = [firstFile];
        } else {
          const remainingSlots = effectiveMaxCount - currentCount;
          if (remainingSlots <= 0) {
            const err = `Số lượng tệp đã đạt tối đa (${effectiveMaxCount} tệp)`;
            setValidationError(err);
            setSrAnnouncement(err);
            return;
          }
          allowedFiles = acceptedFiles.slice(0, remainingSlots);
        }
      }

      // Execute beforeUpload hook
      const results = await Promise.all(
        allowedFiles.map(async (file) => {
          if (beforeUpload) {
            try {
              const result = await beforeUpload(file);
              if (result === false || typeof result === "string") {
                const err =
                  typeof result === "string" ? result : `Tệp ${file.name} đã bị từ chối`;
                return { file: null, error: err };
              }
            } catch (err: unknown) {
              const errMsg =
                err instanceof Error ? err.message : `Không thể xử lý tệp ${file.name}`;
              return { file: null, error: errMsg };
            }
          }
          return { file, error: null };
        })
      );

      const newValidFiles: File[] = [];
      for (const res of results) {
        if (res.error) {
          setValidationError(res.error);
          setSrAnnouncement(`Lỗi: ${res.error}`);
        } else if (res.file) {
          newValidFiles.push(res.file);
        }
      }

      if (newValidFiles.length > 0) {
        const finalItems: PreviewFile[] = !multiple
          ? newValidFiles
          : [...currentItems, ...newValidFiles];
        updateItems(finalItems);
        setSrAnnouncement(
          `Đã thêm ${newValidFiles.length} tệp tin. Tổng cộng: ${finalItems.length} tệp.`
        );
      }
    },
    onDropRejected: (rejections) => {
      const firstError = rejections[0]?.errors[0];
      if (!firstError) return;

      let msg = firstError.message || "Tệp không hợp lệ";
      if (firstError.code === "file-too-large") {
        msg = `Kích thước tệp vượt quá giới hạn cho phép (${formatBytes(maxSize || 0)})`;
      } else if (firstError.code === "file-too-small") {
        msg = `Kích thước tệp nhỏ hơn giới hạn tối thiểu (${formatBytes(minSize || 0)})`;
      } else if (firstError.code === "file-invalid-type") {
        const acceptStr =
          typeof accept === "string" ? accept : Object.keys(accept || {}).join(", ");
        msg = `Định dạng tệp không được hỗ trợ. Các định dạng cho phép: ${acceptStr}`;
      } else if (firstError.code === "too-many-files") {
        msg = `Số lượng tệp vượt quá giới hạn cho phép (${effectiveMaxCount} tệp)`;
      }

      setValidationError(msg);
      setSrAnnouncement(`Lỗi tệp: ${msg}`);
    },
  });

  const handleRemove = (item: PreviewFile, index: number) => {
    if (disabled || readOnly) return;
    const newItems = currentItems.filter((_, i) => i !== index);
    updateItems(newItems);
    onRemove?.(item, index);
    setSrAnnouncement(`Đã xóa tệp tin ${getFileName(item)}`);
  };

  const handleOpenPreview = (item: PreviewFile) => {
    setPreviewItem(item);
    onPreview?.(item);
  };

  const handleDownload = (item: PreviewFile) => {
    onDownload?.(item);

    const fileName = getFileName(item);

    if (item instanceof File) {
      const url = URL.createObjectURL(item);
      downloadFile(url, item.name);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }

    if (typeof item === "string") {
      downloadFile(item, fileName);
      return;
    }

    if (typeof item === "object" && item && typeof item.src === "string") {
      downloadFile(item.src, item.name || fileName);
    }
  };

  const effectiveListClassName = previewClassName || listClassName;

  return (
    <div className={`group/field relative flex flex-col w-full ${className}`}>
      {/* Hidden File Input (react-dropzone) */}
      <input
        {...getInputProps({
          id: inputId,
          disabled: disabled || isLoading,
          "aria-hidden": true,
          tabIndex: -1,
          className: "hidden",
        })}
      />

      {/* Screen Reader Live Region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {srAnnouncement}
      </div>

      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block font-medium transition-colors duration-150 ${currentSize.labelSize} ${labelColorStyle} ${labelClassName}`}
        >
          {label}
          {isRequired && (
            <span className="text-error-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Content depending on viewMode */}
      <div className="flex flex-col gap-3">
        {viewMode === "dropzone" && (
          <UploadFileDropzone
            size={size}
            color={color}
            variant={variant}
            radius={effectiveRadius}
            shape={shape}
            disabled={disabled}
            readOnly={readOnly}
            isLoading={isLoading}
            showSpinner={showSpinner}
            dragStatus={isDragReject ? "reject" : isDragActive ? "active" : "idle"}
            isInvalid={isInvalid}
            dropzoneTitle={dropzoneTitle}
            dropzoneDescription={dropzoneDescription}
            icon={icon}
            onTriggerUpload={open}
            getRootProps={getRootProps}
            className={dropzoneClassName}
            describedById={activeErrorMessage || helperText ? errorHelperId : undefined}
          />
        )}

        {viewMode === "compact" && (
          <UploadFileDropzone
            size={size}
            color={color}
            variant={variant}
            radius={effectiveRadius}
            compact={true}
            disabled={disabled}
            readOnly={readOnly}
            isLoading={isLoading}
            showSpinner={showSpinner}
            dragStatus={isDragReject ? "reject" : isDragActive ? "active" : "idle"}
            isInvalid={isInvalid}
            dropzoneTitle={dropzoneTitle}
            dropzoneDescription={dropzoneDescription}
            icon={icon}
            onTriggerUpload={open}
            getRootProps={getRootProps}
            className={dropzoneClassName}
            describedById={activeErrorMessage || helperText ? errorHelperId : undefined}
          />
        )}

        {viewMode === "button" && (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size={currentSize.buttonSize}
              color={isInvalid ? "error" : color === "neutral" ? "secondary" : color}
              variant={variant === "other" ? "filled" : variant}
              radius={radius}
              disabled={
                disabled ||
                readOnly ||
                isLoading ||
                (effectiveMaxCount !== undefined && currentItems.length >= effectiveMaxCount)
              }
              isLoading={isLoading}
              showSpinner={showSpinner}
              onClick={open}
              leftIcon={
                <UploadIcon
                  width={currentSize.iconSize * 0.5}
                  height={currentSize.iconSize * 0.5}
                />
              }
              aria-label={"Tải tệp lên"}
            >
              {buttonText}
            </Button>
          </div>
        )}

        {/* Uploaded File List: Render 1 lần duy nhất dùng chung cho mọi viewMode */}
        {showFileList && currentItems.length > 0 && (
          <UploadFileList
            items={currentItems}
            listType={listType}
            size={size}
            color={color}
            variant={variant}
            radius={effectiveRadius}
            disabled={disabled}
            readOnly={readOnly}
            maxCount={effectiveMaxCount}
            showPreviewButton={showPreviewButton}
            showDownloadButton={showDownloadButton}
            showRemoveButton={showRemoveButton}
            onRemove={handleRemove}
            onPreview={handleOpenPreview}
            onDownload={handleDownload}
            onRetry={onRetry}
            renderItem={renderItem}
            className={effectiveListClassName}
          />
        )}
      </div>

      {/* Helper text & Error message with smooth transition */}
      <HelperErrorText
        id={errorHelperId}
        helperText={helperText}
        errorMessage={isInvalid ? activeErrorMessage : undefined}
        sizeClassName={currentSize.helperSize}
        className={helperClassName}
      />

      {/* File Preview Modal */}
      {previewItem && (
        <FileContainer
          open={Boolean(previewItem)}
          onClose={() => setPreviewItem(null)}
          file={previewItem}
        />
      )}
    </div>
  );
}
