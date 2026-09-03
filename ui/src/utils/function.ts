import { rankItem, compareItems } from "@tanstack/match-sorter-utils";

/**
 * Lấy cấu hình tương ứng theo `key` từ đối tượng `configMap` (sizeConfig, radiusConfig, variantConfig, colorConfig...),
 * nếu `key` không hợp lệ hoặc không tồn tại trong `configMap`, sẽ trả về giá trị an toàn của `fallbackKey`.
 *
 * @param key - Khóa được truyền vào (size, radius, variant... có thể undefined, null hoặc chuỗi bất kỳ)
 * @param configMap - Đối tượng ánh xạ cấu hình
 * @param fallbackKey - Khóa dự phòng khi không tìm thấy (fallback an toàn)
 * @returns Cấu hình tương ứng của khóa đó
 */
export function getSafeConfig<TConfig, TKey extends PropertyKey = string>(
  key: TKey | undefined | null,
  configMap: Record<TKey, TConfig>,
  fallbackKey: TKey
): TConfig {
  if (key != null && Object.prototype.hasOwnProperty.call(configMap, key)) {
    return configMap[key];
  }
  return configMap[fallbackKey];
}

/**
 * Lọc và xếp hạng danh sách phần tử theo từ khóa tìm kiếm (Fuzzy Search qua @tanstack/match-sorter-utils).
 *
 * @param items - Danh sách các phần tử cần lọc
 * @param query - Từ khóa tìm kiếm
 * @param fields - Một trường hoặc danh sách các trường (hoặc hàm accessor) để so khớp
 * @returns Danh sách phần tử khớp, đã được sắp xếp theo độ tương quan cao nhất
 */
export function rankAndFilterItems<T>(
  items: T[],
  query: string,
  fields?: (keyof T | string | ((item: T) => string | undefined | null))[] | (keyof T | string)
): T[] {
  const keyword = query.trim();
  if (!keyword || !items.length) {
    return items;
  }

  const fieldsArray = fields ? (Array.isArray(fields) ? fields : [fields]) : [];
  const accessors: ((item: T) => string)[] = [];

  if (fieldsArray.length > 0) {
    for (const field of fieldsArray) {
      if (typeof field === "function") {
        accessors.push((item: T) => {
          const res = field(item);
          return res != null ? String(res) : "";
        });
      } else {
        accessors.push((item: T) => {
          const record = item as Record<string, unknown>;
          const val = record[field as string];
          if (val != null) return String(val);
          if (record.data && typeof record.data === "object") {
            const dataVal = (record.data as Record<string, unknown>)[field as string];
            if (dataVal != null) return String(dataVal);
          }
          return "";
        });
      }
    }
  } else {
    // Mặc định: kiểm tra trường 'label', 'value' nếu là object, hoặc ép kiểu string
    accessors.push((item: T) => {
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return record.label != null
          ? String(record.label)
          : record.value != null
            ? String(record.value)
            : "";
      }
      return item != null ? String(item) : "";
    });
  }

  const ranked: { item: T; info: ReturnType<typeof rankItem> }[] = [];
  for (const item of items) {
    const info = rankItem(item, keyword, { accessors });
    if (info.passed) {
      ranked.push({ item, info });
    }
  }

  ranked.sort((a, b) => compareItems(a.info, b.info));
  return ranked.map((r) => r.item);
}
