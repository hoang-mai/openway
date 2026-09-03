import { useId, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import UploadIcon from "../icons/UploadIcon";
import { UploadImageProps } from "./types";
import { uploadImageLabelColorConfig, uploadImageSizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { formatBytes, normalizeInitialValues } from "./utils";
import { normalizeAccept } from "../upload-file/utils";
import { getFileName } from "@/components/file-preview";
import FileContainer from "../file-preview/FileContainer";
import HelperErrorText from "@/components/common/HelperErrorText";
import UploadImageDropzone from "./UploadImageDropzone";
import UploadImageList from "./UploadImageList";
import { PreviewFile } from "@/components/file-preview/types";

export default function UploadImage({
  value,
  defaultValue,
  onChange,
  onRemove,
  onPreview,
  multiple = false,
  maxCount,
  maxSize,
  accept = "image/*",
  beforeUpload,
  viewMode = "dropzone",
  shape = "rectangle",
  objectFit,
  size = "md",
  color = "primary",
  variant = "outline",
  radius,
  label,
  isRequired = false,
  labelClassName = "",
  helperText,
  errorMessage,
  isInvalid: isInvalidProp,
  disabled = false,
  readOnly = false,
  isLoading = false,
  dropzoneTitle,
  dropzoneDescription,
  icon,
  buttonText = "Tải ảnh lên",
  renderItem,
  className = "",
  dropzoneClassName = "",
  previewClassName = "",
  helperClassName = "",
}: UploadImageProps) {
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

  // Internal validation error
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<PreviewFile | null>(null);

  // Live announcement for Screen Readers
  const [srAnnouncement, setSrAnnouncement] = useState<string>("");

  const currentSize = getSafeConfig(size, uploadImageSizeConfig, "md");
  const effectiveRadius = radius ?? "md";
  const isInvalid = Boolean(isInvalidProp || errorMessage || validationError);
  const activeErrorMessage = errorMessage || validationError;
  const activeColor = isInvalid ? "error" : color;
  const labelColorStyle = isInvalid
    ? "text-error-600"
    : getSafeConfig(activeColor, uploadImageLabelColorConfig, "primary");

  const effectiveMaxCount = maxCount ?? (multiple ? undefined : 1);
  const isSingleMode = !multiple || effectiveMaxCount === 1;
  const singleItem = isSingleMode && currentItems.length === 1 ? currentItems[0] : null;

  const updateItems = (newItems: PreviewFile[]) => {
    if (!isControlled) {
      setInternalItems(newItems);
    }
    onChange?.(newItems);
  };

  const normalizedAccept = useMemo(() => normalizeAccept(accept), [accept]);

  const isSingleItemInDropzone = viewMode === "dropzone" && Boolean(singleItem);

  // react-dropzone integration
  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    multiple,
    maxSize,
    accept: normalizedAccept,
    disabled: disabled || readOnly || isLoading,
    noClick: viewMode !== "dropzone" || isSingleItemInDropzone,
    noKeyboard: viewMode !== "dropzone" || isSingleItemInDropzone,
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
            const err = `Maximum allowed image count reached (${effectiveMaxCount} images)`;
            setValidationError(err);
            setSrAnnouncement(err);
            return;
          }
          allowedFiles = acceptedFiles.slice(0, remainingSlots);
        }
      }

      const results = await Promise.all(
        allowedFiles.map(async (file) => {
          if (beforeUpload) {
            try {
              const result = await beforeUpload(file);
              if (result === false || typeof result === "string") {
                const err = typeof result === "string" ? result : `File ${file.name} was rejected`;
                return { file: null, error: err };
              }
            } catch (err: unknown) {
              const errMsg = err instanceof Error ? err.message : `Không thể xử lý tệp ${file.name}`;
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
        const finalItems: PreviewFile[] = !multiple ? newValidFiles : [...currentItems, ...newValidFiles];
        updateItems(finalItems);
        setSrAnnouncement(`Tải lên thành công ${newValidFiles.length} hình ảnh. Tổng cộng: ${finalItems.length}.`);
      }
    },
    onDropRejected: (rejections) => {
      const firstError = rejections[0]?.errors[0];
      if (!firstError) return;

      let msg = firstError.message || "Tệp không hợp lệ";
      if (firstError.code === "file-too-large") {
        msg = `Kích thước tệp vượt quá giới hạn tối đa (${formatBytes(maxSize || 0)})`;
      } else if (firstError.code === "file-invalid-type") {
        const acceptStr = typeof accept === "string" ? accept : Object.keys(accept || {}).join(", ");
        msg = `Định dạng tệp không hợp lệ. Các định dạng được hỗ trợ: ${acceptStr}`;
      } else if (firstError.code === "too-many-files") {
        msg = `Số lượng hình ảnh vượt quá giới hạn cho phép (${effectiveMaxCount} hình ảnh)`;
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
    setSrAnnouncement(`Đã xóa hình ảnh ${getFileName(item)}`);
  };

  const handleOpenPreview = (item: PreviewFile) => {
    setPreviewItem(item);
    onPreview?.(item);
  };

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
          <>
            <UploadImageDropzone
              size={size}
              color={color}
              variant={variant}
              radius={effectiveRadius}
              shape={shape}
              objectFit={objectFit}
              disabled={disabled}
              readOnly={readOnly}
              isLoading={isLoading}
              dragStatus={isDragReject ? "reject" : isDragActive ? "active" : "idle"}
              isInvalid={isInvalid}
              dropzoneTitle={dropzoneTitle}
              dropzoneDescription={dropzoneDescription}
              icon={icon}
              item={singleItem}
              onRemove={() => singleItem && handleRemove(singleItem, 0)}
              onPreview={() => singleItem && handleOpenPreview(singleItem)}
              getRootProps={getRootProps}
              onTriggerUpload={open}
              className={dropzoneClassName}
              describedById={activeErrorMessage || helperText ? errorHelperId : undefined}
            />

            {/* List preview for Dropzone mode when multiple is true and items exist */}
            {!isSingleMode && currentItems.length > 0 && (
              <UploadImageList
                items={currentItems}
                size={size}
                color={color}
                variant={variant}
                radius={effectiveRadius}
                objectFit={objectFit}
                disabled={disabled}
                readOnly={readOnly}
                maxCount={effectiveMaxCount}
                onRemove={handleRemove}
                onPreview={handleOpenPreview}
                onTriggerUpload={open}
                renderItem={renderItem}
                showAddButton={false}
                className={previewClassName}
              />
            )}
          </>
        )}

        {viewMode === "card-grid" && (
          <div {...getRootProps({ className: "w-full focus-visible:outline-hidden" })}>
            <UploadImageList
              items={currentItems}
              size={size}
              color={color}
              variant={variant}
              radius={effectiveRadius}
              objectFit={objectFit}
              disabled={disabled}
              readOnly={readOnly}
              maxCount={effectiveMaxCount}
              onRemove={handleRemove}
              onPreview={handleOpenPreview}
              onTriggerUpload={open}
              renderItem={renderItem}
              showAddButton={true}
              className={previewClassName}
            />
          </div>
        )}

        {viewMode === "button" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                size={size}
                color={isInvalid ? "error" : color === "neutral" ? "secondary" : color}
                variant={variant === "other" ? "filled" : variant}
                radius={radius}
                disabled={
                  disabled || readOnly || (effectiveMaxCount !== undefined && currentItems.length >= effectiveMaxCount)
                }
                onClick={open}
                leftIcon={<UploadIcon width={currentSize.iconSize * 0.5} height={currentSize.iconSize * 0.5} />}
                aria-label={"Tải ảnh lên"}
              >
                {buttonText}
              </Button>
            </div>

            {currentItems.length > 0 && (
              <UploadImageList
                items={currentItems}
                size={size}
                color={color}
                variant={variant}
                radius={effectiveRadius}
                objectFit={objectFit}
                disabled={disabled}
                readOnly={readOnly}
                maxCount={effectiveMaxCount}
                onRemove={handleRemove}
                onPreview={handleOpenPreview}
                onTriggerUpload={open}
                renderItem={renderItem}
                showAddButton={false}
                className={previewClassName}
              />
            )}
          </div>
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
