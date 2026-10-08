import LoadingImage from "../skeleton/LoadingImage";
import EyeIcon from "../icons/EyeIcon";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import { UploadImageListProps } from "./types";
import { uploadImageRadiusConfig, uploadImageSizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { getFileName } from "@/lib/file-preview/utils";
import { useLocale } from "@/locale";

export default function UploadImageList({
  items,
  size,
  radius,
  objectFit = "cover",
  disabled,
  readOnly,
  maxCount,
  onRemove,
  onPreview,
  onTriggerUpload,
  renderItem,
  showAddButton = true,
  className = "",
}: UploadImageListProps) {
  const uploadLocale = useLocale("upload");
  const currentSize = getSafeConfig(size, uploadImageSizeConfig, "md");
  const activeRadius = getSafeConfig(radius, uploadImageRadiusConfig, "md");
  const canAddMore = !maxCount || items.length < maxCount;

  return (
    <ul
      aria-label={uploadLocale.imageListAriaLabel}
      className={`flex flex-wrap items-center list-none p-0 m-0 ${currentSize.gap} ${className}`}
    >
      {items.map((item, index) => {
        const itemName = getFileName(item);
        const itemKey =
          typeof item === "object" && item && "id" in item && item.id
            ? String(item.id)
            : item instanceof File
              ? `${item.name}-${item.size}-${item.lastModified}`
              : typeof item === "string"
                ? item
                : (item as { src?: string })?.src || itemName;

        if (renderItem) {
          return (
            <li key={itemKey} data-testid="upload-image-item" className="list-none">
              {renderItem(item, index, {
                remove: () => onRemove(item, index),
                preview: () => onPreview(item),
              })}
            </li>
          );
        }

        return (
          <li
            key={itemKey}
            data-testid="upload-image-item"
            tabIndex={disabled ? -1 : 0}
            aria-label={uploadLocale.imageAriaLabel ? uploadLocale.imageAriaLabel(itemName) : itemName}
            onKeyDown={(e) => {
              if (disabled || readOnly) return;
              if (e.key === "Delete" || e.key === "Backspace") {
                e.preventDefault();
                onRemove(item, index);
              }
            }}
            className={`group relative list-none ${currentSize.thumbnailSize} ${activeRadius} border-2 overflow-hidden flex items-center justify-center bg-neutral-100 border-neutral-200 transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden`}
          >
            <LoadingImage
              src={item}
              alt={itemName}
              width={80}
              height={80}
              radius={radius}
              objectFit={objectFit}
              unoptimized
              preview={false}
              className="w-full h-full"
              wrapperClassName="w-full h-full"
            />

            {/* Overlay Actions */}
            {!disabled && (
              <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-1.5 p-1">
                {onPreview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(item);
                    }}
                    aria-label={uploadLocale.previewFileAriaLabel ? uploadLocale.previewFileAriaLabel(itemName) : itemName}
                    title={uploadLocale.preview}
                    className="p-1 rounded-md text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-hidden transition-colors cursor-pointer"
                  >
                    <EyeIcon width={16} height={16} />
                  </button>
                )}

                {!readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item, index);
                    }}
                    aria-label={uploadLocale.removeFileAriaLabel ? uploadLocale.removeFileAriaLabel(itemName) : itemName}
                    title={uploadLocale.removeImage}
                    className="p-1 rounded-md text-error-300 hover:text-error-200 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-error-400 focus-visible:outline-hidden transition-colors cursor-pointer"
                  >
                    <TrashIcon width={16} height={16} />
                  </button>
                )}
              </div>
            )}
          </li>
        );
      })}

      {/* Add Button (+) in Grid */}
      {showAddButton && canAddMore && !readOnly && (
        <li className="list-none">
          <button
            type="button"
            disabled={disabled}
            onClick={onTriggerUpload}
            aria-label={uploadLocale.addImageAriaLabel}
            title={uploadLocale.addImage}
            className={`${currentSize.thumbnailSize} ${activeRadius} border-2 border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 flex flex-col items-center justify-center transition-colors duration-150 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden`}
          >
            <PlusIcon width={currentSize.iconSize * 0.5} height={currentSize.iconSize * 0.5} />
          </button>
        </li>
      )}
    </ul>
  );
}
