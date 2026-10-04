
/**
 * Giới hạn giá trị nằm trong khoảng [min, max]
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Tính tỷ lệ phần trăm (0 - 100) của một giá trị trong khoảng [min, max]
 */
export function getPercentage(val: number, min: number, max: number): number {
  if (max <= min) return 0;
  return clamp(((val - min) / (max - min)) * 100, 0, 100);
}
