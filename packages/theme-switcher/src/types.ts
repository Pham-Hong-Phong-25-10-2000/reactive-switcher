/**
 * Color palette type supporting nested color objects
 * @example
 * {
 *   primary: {
 *     DEFAULT: '#3b82f6',
 *     foreground: '#ffffff',
 *     50: '#eff6ff',
 *     500: '#3b82f6',
 *   }
 * }
 */
export type ColorPalette = {
  [key: string]: string | ColorPalette;
};

/**
 * Theme configuration object
 */
export interface Theme {
  /** Unique theme name (e.g., "light", "dark", "ocean") */
  name: string;
  /** Theme type for Tailwind's dark mode class strategy */
  type?: "light" | "dark";
  /** Nested color palette object */
  colors: ColorPalette;
}

/**
 * Collection of themes keyed by theme name
 */
export type ThemesConfig = {
  [themeName: string]: Theme;
};

/**
 * Theme context value returned by useTheme hook
 */
export interface ThemeContextType {
  /** Current active theme name */
  theme: string;
  /** Resolved theme name (actual theme when 'system' is selected) */
  resolvedTheme: string;
  /** Set theme by name */
  setTheme: (themeName: string) => void;
  /** Toggle to next theme in the list */
  toggleTheme: () => void;
  /** Active theme object with all properties */
  activeThemeObject: Theme;
  /** List of all available theme names */
  themes: string[];
  /** System preference ('light' | 'dark') */
  systemTheme: "light" | "dark";
}

/**
 * Props for ThemeProvider component
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Theme configurations object */
  themes: ThemesConfig;
  /** Default theme name to use initially */
  defaultTheme?: string;
  /** CSS selector for scoped theming (default: ":root") */
  selector?: string;
  /** Unique ID for style tag (default: "reactive-switcher-styles") */
  styleId?: string;
  /** Storage key for localStorage (default: "reactive-switcher-theme") */
  storageKey?: string;
  /** Enable localStorage persistence (default: true) */
  enableStorage?: boolean;
  /** Enable system theme detection (default: true) */
  enableSystem?: boolean;
  /** Attribute to set on html element (default: "class") */
  attribute?: "class" | "data-theme";
}
