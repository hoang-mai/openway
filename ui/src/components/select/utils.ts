import type { ReactNode } from "react";
import { SelectOptionItem, SelectFilterField } from "./types";

/**
 * Khởi tạo một Map từ danh sách options để tra cứu nhanh theo value (O(1)).
 * Hữu ích cho việc lưu trữ lịch sử options (historical options) khi dữ liệu bị lọc bởi search.
 *
 * @param options - Danh sách các SelectOptionItem
 * @returns Map với key là value của option và value là chính SelectOptionItem đó
 */
export function createOptionsMap<TData = unknown>(
  options: SelectOptionItem<TData>[]
): Map<string | number, SelectOptionItem<TData>> {
  const map = new Map<string | number, SelectOptionItem<TData>>();
  options.forEach((opt) => {
    map.set(opt.value, opt);
  });
  return map;
}

/**
 * Lấy thông tin chi tiết của một option đã chọn (dùng cho Single Select).
 * Nếu không tìm thấy trong options hiện tại, sẽ tìm trong historicalOptions hoặc fallback về object cơ bản.
 *
 * @param value - Giá trị value của option đang chọn
 * @param options - Danh sách options hiện tại
 * @param historicalOptions - Map lưu trữ lịch sử options trước đó (tuỳ chọn)
 * @returns SelectOptionItem tương ứng hoặc null nếu value rỗng
 */
export function getSelectedOption<TData = unknown>(
  value: string | number | null | undefined,
  options: SelectOptionItem<TData>[],
  historicalOptions?: Map<string | number, SelectOptionItem<TData>>
): SelectOptionItem<TData> | null {
  if (value === null || value === undefined) return null;

  return (
    options.find((o) => o.value === value) ||
    historicalOptions?.get(value) || {
      value,
      label: String(value),
    }
  );
}

/**
 * Lấy danh sách các option đã chọn (dùng cho Multi Select).
 * Duyệt qua mảng values và tìm option tương ứng trong options hoặc historicalOptions, có fallback an toàn.
 *
 * @param values - Mảng các giá trị đã chọn
 * @param options - Danh sách options hiện tại
 * @param historicalOptions - Map lưu trữ lịch sử options trước đó (tuỳ chọn)
 * @returns Mảng các SelectOptionItem tương ứng
 */
export function getSelectedOptions<TData = unknown>(
  values: (string | number)[],
  options: SelectOptionItem<TData>[],
  historicalOptions?: Map<string | number, SelectOptionItem<TData>>
): SelectOptionItem<TData>[] {
  return values.map((val) => {
    return (
      options.find((o) => o.value === val) ||
      historicalOptions?.get(val) || {
        value: val,
        label: String(val),
      }
    );
  });
}

/**
 * Tính toán danh sách các tag được hiển thị và số lượng tag bị ẩn dựa theo maxTagCount.
 *
 * @param selectedOptions - Mảng các option đã chọn
 * @param maxTagCount - Số lượng tag tối đa hiển thị (tuỳ chọn)
 * @returns Object gồm visibleTags (các tag được hiển thị) và hiddenTagCount (số lượng tag còn lại)
 */
export function getVisibleTags<TData = unknown>(
  selectedOptions: SelectOptionItem<TData>[],
  maxTagCount?: number
): { visibleTags: SelectOptionItem<TData>[]; hiddenTagCount: number } {
  const visibleTags =
    maxTagCount && maxTagCount > 0 ? selectedOptions.slice(0, maxTagCount) : selectedOptions;
  const hiddenTagCount =
    maxTagCount && maxTagCount > 0 ? Math.max(0, selectedOptions.length - maxTagCount) : 0;

  return { visibleTags, hiddenTagCount };
}


/**
 * Định dạng giá trị của bộ lọc để hiển thị tóm tắt trên Badge Chip của menu bộ lọc.
 *
 * @param field - Cấu hình trường bộ lọc
 * @param val - Giá trị hiện tại của bộ lọc
 * @param historicalOptionLabels - Map lưu trữ lịch sử nhãn của các option đã chọn (dùng cho server mode)
 * @returns Chuỗi văn bản hiển thị tóm tắt
 */
export function formatFilterBadgeValue(
  field: SelectFilterField<unknown>,
  val: unknown,
  historicalOptionLabels?: Map<string | number, ReactNode>
): string {
  if (val === undefined || val === null || val === "") {
    return "Chưa nhập";
  }

  if (val instanceof Date) {
    return val.toLocaleDateString("vi-VN");
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "Chưa chọn";
    // Date range
    if (field.type === "date-range" || val[0] instanceof Date || val[1] instanceof Date) {
      const formatPart = (d: unknown) => {
        if (!d) return "";
        if (d instanceof Date) return d.toLocaleDateString("vi-VN");
        return String(d);
      };
      const start = formatPart(val[0]);
      const end = formatPart(val[1]);
      return start && end ? `${start} - ${end}` : start || end || "Chưa chọn";
    }
    // Checkbox group / Options (multi-select / select)
    const getOptionLabel = (item: unknown) => {
      if (field.type === "checkbox-group" && field.options && field.options.length > 0) {
        const found = field.options.find((o) => String(o.value) === String(item));
        if (found) return String(found.label);
      }
      if (historicalOptionLabels) {
        const cached =
          historicalOptionLabels.get(String(item)) ??
          historicalOptionLabels.get(item as string | number);
        if (cached !== undefined && cached !== null) return String(cached);
      }
      return String(item);
    };

    if (val.length === 1) {
      return getOptionLabel(val[0]);
    }

    const firstLabel = getOptionLabel(val[0]);
    return `${firstLabel}, +${val.length - 1}`;
  }

  return String(val);
}
