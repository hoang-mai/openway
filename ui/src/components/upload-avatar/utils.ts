import type { Accept } from "react-dropzone";

export function normalizeAccept(accept?: string | Accept): Accept | undefined {
  if (!accept) return undefined;
  if (typeof accept === "object") return accept;

  const result: Accept = {};
  const tokens = accept.split(",").map((t) => t.trim()).filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith(".")) {
      const ext = token.toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg") {
        result["image/jpeg"] = [...(result["image/jpeg"] || []), ext];
      } else if (ext === ".png") {
        result["image/png"] = [...(result["image/png"] || []), ext];
      } else if (ext === ".webp") {
        result["image/webp"] = [...(result["image/webp"] || []), ext];
      } else if (ext === ".gif") {
        result["image/gif"] = [...(result["image/gif"] || []), ext];
      } else if (ext === ".svg") {
        result["image/svg+xml"] = [...(result["image/svg+xml"] || []), ext];
      } else {
        result["application/octet-stream"] = [...(result["application/octet-stream"] || []), ext];
      }
    } else {
      if (!result[token]) {
        result[token] = [];
      }
    }
  }

  return result;
}
