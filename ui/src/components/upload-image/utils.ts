import { PreviewFile } from "@/components/file-preview/types";

export function formatBytes(bytes?: number, decimals: number = 1): string {
  if (!bytes || !+bytes) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function normalizeInitialValues(raw?: PreviewFile[] | PreviewFile | null): PreviewFile[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter((item): item is PreviewFile => Boolean(item));
  return [raw];
}
