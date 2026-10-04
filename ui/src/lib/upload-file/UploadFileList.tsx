import UploadFileItemRow from "./UploadFileItemRow";
import { UploadFileListProps } from "./types";
import { getPreviewItemKey } from "./utils";
import { uploadFileSizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

export default function UploadFileList({
  items,
  listType = "list",
  size = "md",
  color = "primary",
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
}: UploadFileListProps) {
  const currentSize = getSafeConfig(size, uploadFileSizeConfig, "md");

  const containerClasses =
    listType === "grid"
      ? `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${currentSize.gap} list-none p-0 m-0 ${className}`
      : `flex flex-col ${currentSize.gap} list-none p-0 m-0 ${className}`;

  if (!items || items.length === 0) return null;

  return (
    <ul aria-label="Danh sách tệp tin đã tải lên" className={containerClasses}>
      {items.map((item, index) => {
        const itemKey = getPreviewItemKey(item, index);
        return (
          <UploadFileItemRow
            key={itemKey}
            item={item}
            index={index}
            listType={listType}
            size={size}
            radius={radius}
            color={color}
            disabled={disabled}
            readOnly={readOnly}
            showPreviewButton={showPreviewButton}
            showDownloadButton={showDownloadButton}
            showRemoveButton={showRemoveButton}
            onRemove={onRemove}
            onPreview={onPreview}
            onDownload={onDownload}
            onRetry={onRetry}
            renderItem={renderItem}
          />
        );
      })}
    </ul>
  );
}
