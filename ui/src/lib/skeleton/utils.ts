export const toStyle = (val: string | number | undefined): string | number | undefined =>
  typeof val === "number" ? val : val;

export const getSourceKey = (s: unknown): string | unknown => {
  if (!s) return "";
  if (typeof s === "string") return s;
  if (typeof File !== "undefined" && s instanceof File) {
    return `${s.name}-${s.size}-${s.lastModified}`;
  }
  if (typeof Blob !== "undefined" && s instanceof Blob) {
    return `${s.size}-${s.type}`;
  }
  if (typeof s === "object" && "src" in s && typeof (s as { src: unknown }).src === "string") {
    return (s as { src: string }).src;
  }
  return s;
};