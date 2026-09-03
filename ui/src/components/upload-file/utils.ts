import type { Accept } from "react-dropzone";
import type { FileCategory } from "./types";
import { FILE_EXTENSIONS_MAP } from "./constants";
import { getFileExtension, getFileName } from "../file-preview/utils";
import { PreviewFile, ServerFile } from "@/components/file-preview/types";

/**
 * Lấy dung lượng tệp tin (bytes)
 */
export function getPreviewFileSize(item?: PreviewFile | null): number | undefined {
  if (!item) return undefined;
  if (item instanceof File) return item.size;
  if (typeof item === "object" && item !== null && "size" in item) {
    const size = (item as { size?: unknown }).size;
    if (typeof size === "number") return size;
  }
  return undefined;
}

/**
 * Trích xuất trạng thái tải lên, tiến trình % và lỗi từ ServerFile
 */
export function getPreviewItemStatus(item?: PreviewFile | null): {
  status: "idle" | "uploading" | "success" | "error";
  progress?: number;
  error?: string;
} {
  if (!item || typeof item !== "object" || item instanceof File) {
    return { status: "idle" };
  }

  const serverFile = item as ServerFile;
  const rawStatus = typeof serverFile.status === "string" ? serverFile.status : undefined;
  const progress = typeof serverFile.progress === "number" ? serverFile.progress : undefined;
  const error = typeof serverFile.error === "string" ? serverFile.error : undefined;

  let status: "idle" | "uploading" | "success" | "error" = "idle";
  if (rawStatus === "uploading" || (progress !== undefined && progress >= 0 && progress < 100)) {
    status = "uploading";
  } else if (rawStatus === "error" || error) {
    status = "error";
  } else if (rawStatus === "success" || rawStatus === "done" || (progress !== undefined && progress >= 100)) {
    status = "success";
  }

  return { status, progress, error };
}

/**
 * Phân loại định dạng tệp tin dựa trên phần mở rộng hoặc MIME type
 */
export function getFileCategory(itemOrName?: PreviewFile | string | null): FileCategory {
  if (!itemOrName) return "other";

  let fileName = "";
  let mimeType = "";

  if (typeof itemOrName === "string") {
    fileName = itemOrName;
  } else if (itemOrName instanceof File) {
    fileName = itemOrName.name;
    mimeType = itemOrName.type;
  } else if (typeof itemOrName === "object") {
    fileName = itemOrName.name || (typeof itemOrName.src === "string" ? itemOrName.src : "");
    if (typeof itemOrName.type === "string") {
      mimeType = itemOrName.type;
    }
  }

  const ext = getFileExtension(fileName);

  // Kiểm tra trước theo phần mở rộng
  if (ext) {
    for (const [category, extensions] of Object.entries(FILE_EXTENSIONS_MAP)) {
      if (extensions.includes(ext)) {
        return category as FileCategory;
      }
    }
  }

  // Fallback sang MIME type
  if (mimeType) {
    if (mimeType === "application/pdf") return "pdf";
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("audio/")) return "audio";
    if (mimeType.startsWith("video/")) return "video";
    if (
      mimeType.includes("word") ||
      mimeType.includes("document") ||
      mimeType === "application/msword"
    ) {
      return "word";
    }
    if (
      mimeType.includes("excel") ||
      mimeType.includes("spreadsheet") ||
      mimeType === "text/csv"
    ) {
      return "excel";
    }
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) {
      return "powerpoint";
    }
    if (
      mimeType.includes("zip") ||
      mimeType.includes("compressed") ||
      mimeType.includes("archive") ||
      mimeType === "application/x-tar"
    ) {
      return "archive";
    }
    if (mimeType.startsWith("text/")) return "text";
  }

  return "other";
}

/**
 * Khởi tạo khóa duy nhất cho từng mục tệp tin trong danh sách
 */
export function getPreviewItemKey(item: PreviewFile, index: number): string {
  if (typeof item === "object" && item && "id" in item && item.id != null) {
    return String(item.id);
  }
  if (item instanceof File) {
    return `${item.name}-${item.size}-${item.lastModified}-${index}`;
  }
  if (typeof item === "string") {
    return `${item}-${index}`;
  }
  return `${getFileName(item)}-${index}`;
}

/**
 * Chuẩn hóa cấu hình accept cho react-dropzone đa định dạng tài liệu
 */
export function normalizeAccept(accept?: string | Accept): Accept | undefined {
  if (!accept) return undefined;
  if (typeof accept === "object") return accept;

  const result: Accept = {};
  const tokens = accept.split(",").map((t) => t.trim()).filter(Boolean);

  const commonMimeMap: Record<string, string> = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".csv": "text/csv",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".zip": "application/zip",
    ".rar": "application/vnd.rar",
    ".7z": "application/x-7z-compressed",
    ".tar": "application/x-tar",
    ".gz": "application/gzip",
    ".txt": "text/plain",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
  };

  for (const token of tokens) {
    if (token.startsWith(".")) {
      const ext = token.toLowerCase();
      const mime = commonMimeMap[ext] || "application/octet-stream";
      result[mime] = [...(result[mime] || []), ext];
    } else {
      if (!result[token]) {
        result[token] = [];
      }
    }
  }

  return result;
}
