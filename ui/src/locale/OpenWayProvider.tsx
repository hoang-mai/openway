import React, { createContext, useContext, useMemo, ReactNode } from "react";
import type { OpenWayLocale } from "./types";
import { enUS } from "./enUS";

/**
 * Context quản lý cấu hình ngôn ngữ toàn cục cho OpenWay UI
 */
export const OpenWayContext = createContext<OpenWayLocale>(enUS);

/**
 * Props cho component OpenWayProvider
 */
export interface OpenWayProviderProps {
  /** Các phần tử con bên trong ứng dụng */
  children: ReactNode;
  /** Cấu hình ngôn ngữ muốn áp dụng (mặc định là enUS) */
  locale?: OpenWayLocale;
}

/**
 * Provider cấp phát cấu hình ngôn ngữ quốc tế cho toàn bộ components OpenWay UI
 *
 * @example
 * ```tsx
 * import { OpenWayProvider, viVN } from "@openway/ui/locale";
 *
 * export default function App({ children }) {
 *   return (
 *     <OpenWayProvider locale={viVN}>
 *       {children}
 *     </OpenWayProvider>
 *   );
 * }
 * ```
 */
export function OpenWayProvider({ children, locale = enUS }: OpenWayProviderProps) {
  // Gộp với enUS phòng trường hợp đối tượng locale truyền vào bị thiếu thuộc tính
  const mergedLocale = useMemo(() => {
    if (!locale) return enUS;
    return {
      ...enUS,
      ...locale,
      confirm: { ...enUS.confirm, ...locale.confirm },
      table: { ...enUS.table, ...locale.table },
      empty: { ...enUS.empty, ...locale.empty },
      checkbox: { ...enUS.checkbox, ...locale.checkbox },
      radio: { ...enUS.radio, ...locale.radio },
      select: { ...enUS.select, ...locale.select },
      upload: { ...enUS.upload, ...locale.upload },
      datePicker: { ...enUS.datePicker, ...locale.datePicker },
      timePicker: { ...enUS.timePicker, ...locale.timePicker },
      mutation: { ...enUS.mutation, ...locale.mutation },
    };
  }, [locale]);

  return (
    <OpenWayContext.Provider value={mergedLocale}>
      {children}
    </OpenWayContext.Provider>
  );
}

/**
 * Hook truy xuất đối tượng OpenWayLocale hiện hành trong Context
 */
export function useOpenWayContext(): OpenWayLocale {
  const context = useContext(OpenWayContext);
  return context || enUS;
}

/**
 * Hook nội bộ giúp components lấy cấu hình ngôn ngữ theo từng namespace,
 * đồng thời ưu tiên props truyền trực tiếp tại component.
 *
 * Thứ tự ưu tiên: Prop truyền trực tiếp > Provider Context > Default Locale (enUS)
 *
 * @param componentKey Tên namespace của component trong OpenWayLocale
 * @param overrides Các thuộc tính được truyền trực tiếp qua component props
 */
export function useLocale<K extends keyof OpenWayLocale>(
  componentKey: K,
  overrides?: Partial<OpenWayLocale[K]>
): OpenWayLocale[K] {
  const contextLocale = useOpenWayContext();
  const baseConfig = contextLocale[componentKey];

  return useMemo(() => {
    if (!overrides) {
      return baseConfig;
    }

    // Loại bỏ các giá trị undefined để không ghi đè giá trị mặc định
    const cleanOverrides: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(overrides)) {
      if (value !== undefined) {
        cleanOverrides[key] = value;
      }
    }

    if (typeof baseConfig === "object" && baseConfig !== null) {
      return {
        ...baseConfig,
        ...cleanOverrides,
      };
    }

    return baseConfig;
  }, [baseConfig, overrides]);
}
