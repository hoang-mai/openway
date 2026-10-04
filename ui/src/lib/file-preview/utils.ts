import { FileType, PreviewFile, ServerFile } from "./types";
import { IMAGE_EXTENSIONS, PDF_EXTENSIONS, VIDEO_EXTENSIONS, AUDIO_EXTENSIONS, DOCUMENT_EXTENSIONS } from "./constants";

export function getFileName(input?: PreviewFile | string | null): string {
  if (!input) return "";

  // 1. ServerFile: nếu có trường name thì ưu tiên trả về name, nếu không có thì trích xuất từ src (URL)
  if (typeof input === "object" && !(input instanceof Blob)) {
    if (input.name) return input.name;
    if (input.src) return getFileName(input.src);
    return "";
  }

  // 2. Browser File object: trả về tên file
  if (input instanceof File) {
    return input.name || "";
  }

  // 3. Chuỗi URL hoặc đường dẫn file
  if (typeof input === "string") {
    const cleanPath = input.split("?")[0]?.split("#")[0] || "";
    const fullName = cleanPath.split("/").pop() || cleanPath.split("\\").pop() || "";
    const lastDotIndex = fullName.lastIndexOf(".");
    if (lastDotIndex <= 0) return fullName;
    return fullName.slice(0, lastDotIndex);
  }

  return "";
}

export function getFileExtension(filenameOrSrc: string = ""): string {
  const cleanPath = filenameOrSrc.split("?")[0]?.split("#")[0] || "";
  const dotIndex = cleanPath.lastIndexOf(".");
  if (dotIndex === -1) return "";
  return cleanPath.slice(dotIndex + 1).toLowerCase();
}

export function getFileType(filenameOrSrc: string = ""): FileType {
  const ext = getFileExtension(filenameOrSrc);
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (PDF_EXTENSIONS.includes(ext)) return "pdf";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  if (AUDIO_EXTENSIONS.includes(ext)) return "audio";
  if (DOCUMENT_EXTENSIONS.includes(ext)) return "document";

  return "other";
}


export function isServerFile(val: unknown): val is ServerFile {
  if (!val || typeof val !== "object" || val instanceof Blob) return false;
  if ("height" in val && "width" in val && typeof (val as { height: unknown }).height === "number") {
    return false;
  }
  return "src" in val || "name" in val || "id" in val;
}

export function normalizePreviewFile(input?: PreviewFile | null): {
  file: File | undefined;
  serverFile: ServerFile | undefined;
  name: string;
  type: FileType;
} {
  if (!input) {
    return {
      name: "file",
      type: "other" as FileType,
      file: undefined,
      serverFile: undefined,
    };
  }

  if (typeof input === "string") {
    const filename = getFileName(input) || "file";
    return {
      name: filename,
      type: getFileType(input),
      file: undefined,
      serverFile: { src: input, name: filename },
    };
  }

  if (input instanceof File) {
    return {
      name: getFileName(input.name),
      type: getFileType(input.name),
      file: input,
      serverFile: undefined,
    };
  }

  const name = input.name ?? getFileName(input?.src);
  let type: FileType = "other";

  if (input?.src?.startsWith("data:image/")) {
    type = "image";
  } else if (input?.src?.startsWith("data:video/")) {
    type = "video";
  } else if (input?.src?.startsWith("data:audio/")) {
    type = "audio";
  } else if (input?.src?.startsWith("data:application/pdf")) {
    type = "pdf";
  } else if (input?.name) {
    type = getFileType(input.name);
  }

  if (type === "other" && input?.src) {
    type = getFileType(input.src);
  }

  return {
    name,
    type,
    file: undefined,
    serverFile: input,
  };
}

export function downloadFile(src: string, filename?: string): void {
  if (!src) return;
  const link = document.createElement("a");
  link.href = src;
  const cleanPath = src.split("?")[0]?.split("#")[0] || "";
  const fallbackFullName = cleanPath.split("/").pop() || cleanPath.split("\\").pop() || "download";
  link.download = filename || fallbackFullName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    try {
      document.body.removeChild(link);
    } catch {
      // Ignore
    }
  }, 100);
}
