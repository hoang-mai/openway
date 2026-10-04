import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  /** Chế độ theme được cấu hình (light, dark, hoặc system) */
  theme: ThemeMode;
  /** Chế độ thực tế hiển thị trên màn hình (light hoặc dark) */
  resolvedTheme: ResolvedTheme;
  /** Hàm thiết lập chế độ theme */
  setTheme: (theme: ThemeMode) => void;
  /** Hàm bật/tắt nhanh giữa light và dark */
  toggleTheme: () => void;
  /** Cờ boolean kiểm tra nhanh giao diện hiện tại có phải là dark hay không */
  isDark: boolean;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Chế độ giao diện mặc định. Mặc định là "light".
   */
  defaultTheme?: ThemeMode;
  /**
   * Khóa lưu trữ trong localStorage. Mặc định là "openway-theme".
   */
  storageKey?: string;
  /**
   * Thuộc tính gán lên thẻ gốc (html). Mặc định là "class" (.dark).
   */
  attribute?: string;
  /**
   * Cho phép lắng nghe thay đổi theme từ hệ điều hành khi mode là "system". Mặc định là true.
   */
  enableSystem?: boolean;
}
