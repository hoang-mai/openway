import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import type { ThemeContextValue } from "./types";

const fallbackThemeContext: ThemeContextValue = {
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
};

/**
 * Hook truy xuất và điều khiển theme trong ứng dụng.
 * Trả về context chứa `theme`, `resolvedTheme`, `setTheme`, `toggleTheme`, và `isDark`.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    return fallbackThemeContext;
  }

  return context;
}
