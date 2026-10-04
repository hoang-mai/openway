import { useEffect, useState } from "react";
import { FilePreviewProps } from "./types";
import { normalizePreviewFile, downloadFile } from "./utils";
import { useFileContext } from "./FileContext";
import ImagePreview from "./image-preview/ImagePreview";
import DownloadIcon from "../icons/DownloadIcon";

/**
 * Component `<FilePreview>`: Nhận file và headerTitle qua useFileContext(),
 * tự động xác định loại file và chọn component hiển thị tương ứng.
 */
export default function FilePreview({
  onDownload,
  imageProps,
  className = "",
}: FilePreviewProps) {
  const fileContext = useFileContext();
  const file = fileContext?.file;
  const headerTitle = fileContext?.headerTitle;

  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl("");
      return;
    }

    if (!(file instanceof File)) {
      const normalized = normalizePreviewFile(file);
      setPreviewUrl(normalized.serverFile?.src || "");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const normalized = normalizePreviewFile(file);
  const displayName = (typeof headerTitle === "string" ? headerTitle : "") || normalized.name || "file";

  const handleDownload = () => {
    if (onDownload && file) {
      onDownload(file);
    }
    if (previewUrl) {
      downloadFile(previewUrl, displayName);
    }
  };

  if (normalized.type === "image") {
    return (
      <ImagePreview
        src={previewUrl}
        name={displayName}
        {...imageProps}
      />
    );
  }

  return (
    <div className={`p-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-primary-600">
        <DownloadIcon width={32} height={32} />
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 truncate mb-1" title={displayName}>
        {headerTitle ?? displayName}
      </h3>
      <p className="text-sm text-neutral-500 mb-6">
        Định dạng file chưa hỗ trợ xem trực tiếp. Bạn có thể tải file về để xem.
      </p>

      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-colors shadow-md cursor-pointer"
      >
        <DownloadIcon width={18} height={18} />
        <span>Tải xuống file</span>
      </button>
    </div>
  );
}
