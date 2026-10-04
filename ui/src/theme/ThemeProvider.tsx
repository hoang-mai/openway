import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  ResolvedTheme,
  ThemeContextValue,
  ThemeMode,
  ThemeProviderProps,
} from "./types";

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function subscribeSystemTheme(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSystemThemeSnapshot(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
}

function getSystemThemeServerSnapshot(): ResolvedTheme {
  return "light";
}

function noopSubscribe() {
  return () => {};
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "openway-theme",
  attribute = "class",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(storageKey) as ThemeMode | null;
        if (stored === "light" || stored === "dark" || stored === "system") {
          return stored;
        }
      } catch {
        // Tránh throw error nếu localStorage bị chặn (private mode / iframe sandbox)
      }
    }
    return defaultTheme;
  });

  // Sử dụng useSyncExternalStore để đồng bộ với theme hệ điều hành
  // Loại bỏ hoàn toàn useEffect + setState đồng bộ, tránh cascading renders và lỗi SSR tearing
  const systemTheme = useSyncExternalStore(
    enableSystem ? subscribeSystemTheme : noopSubscribe,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot
  );

  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === "system") {
      return enableSystem ? systemTheme : "light";
    }
    return theme;
  }, [theme, enableSystem, systemTheme]);

  // Cập nhật DOM root element
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [resolvedTheme, attribute]);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch {
          // Bỏ qua nếu localStorage không khả dụng
        }
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const isDark = resolvedTheme === "dark";

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      isDark,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
