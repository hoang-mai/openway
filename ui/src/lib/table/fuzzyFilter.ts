import { rankItem } from "@tanstack/match-sorter-utils";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import type { FilterFn, RowData, TableFeatures } from "@tanstack/react-table";
export type { RankingInfo };

export interface FuzzyFilterMeta {
  itemRank?: RankingInfo;
}

// A features type that carries the filterMeta shape
export type FuzzyFeatures = TableFeatures & { filterMeta: FuzzyFilterMeta };

/**
 * Thuật toán lọc Fuzzy (Fuzzy Filter) sử dụng `@tanstack/match-sorter-utils`.
 *
 * Tính năng:
 * - Chuẩn hóa và so khớp gần đúng (Equal, StartsWith, WordStartsWith, Contains, Acronym, Matches)
 * - Tự động loại bỏ dấu tiếng Việt / diacritics
 * - Không phân biệt chữ hoa / chữ thường (Case-insensitive)
 * - Đính kèm thông tin `RankingInfo` vào metadata qua `addMeta` để hỗ trợ sắp xếp theo độ liên quan
 */
function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const fuzzyFilter: FilterFn<FuzzyFeatures, RowData> = (
  row,
  columnId,
  value,
  addMeta
) => {
  const cellValue = String(row.getValue(columnId) ?? "");
  const query = String(value ?? "");

  // Rank the item with original value
  let itemRank = rankItem(cellValue, query);

  // If not passed, attempt matching with stripped Vietnamese diacritics
  if (!itemRank.passed) {
    const normalizedCell = removeVietnameseTones(cellValue);
    const normalizedQuery = removeVietnameseTones(query);
    itemRank = rankItem(normalizedCell, normalizedQuery);
  }

  // Store the itemRank info
  addMeta?.({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
