import { isValidElement, ReactNode } from "react";

/**
 * Hàm đệ quy trích xuất chuỗi văn bản thuần từ ReactNode để phục vụ tính năng Copy & Edit
 */
export function extractTextFromNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromNode).join("");
  if (isValidElement(node) && node.props && typeof node.props === "object") {
    const props = node.props as { children?: ReactNode };
    if (props.children) {
      return extractTextFromNode(props.children);
    }
  }
  return "";
}
