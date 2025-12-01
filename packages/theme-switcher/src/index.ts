// Core exports
export { ThemeProvider, useTheme, ThemeContext } from "./provider";

// Component exports
export { ThemeSwitcher, ThemeToggle } from "./components";

// Type exports
export type {
  Theme,
  ThemesConfig,
  ColorPalette,
  ThemeContextType,
  ThemeProviderProps,
} from "./types";

export type {
  ThemeSwitcherProps,
  ThemeSwitcherRenderProps,
  ThemeToggleProps,
} from "./components";

// Utility exports
export {
  flattenTheme,
  createCssString,
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
  removeStoredTheme,
} from "./utils";
