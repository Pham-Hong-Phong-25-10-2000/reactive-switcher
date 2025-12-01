import { Theme, ColorPalette } from "./types";

/**
 * Flattens a nested color palette into CSS variable format
 * @example
 * flattenTheme({ primary: { DEFAULT: '#3b82f6', 500: '#3b82f6' } })
 * // Returns: { '--color-primary-DEFAULT': '#3b82f6', '--color-primary-500': '#3b82f6' }
 */
export const flattenTheme = (
  colors: ColorPalette,
  prefix: string = "--color"
): Record<string, string> => {
  const cssVariables: Record<string, string> = {};

  const traverse = (obj: ColorPalette, currentKey: string) => {
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = currentKey ? `${currentKey}-${key}` : key;

      if (typeof value === "string") {
        cssVariables[`${prefix}-${newKey}`] = value;
      } else {
        traverse(value, newKey);
      }
    });
  };

  traverse(colors, "");
  return cssVariables;
};

/**
 * Creates a CSS string with variables for a theme
 * @param theme - Theme object to convert
 * @param selector - CSS selector (default: ":root")
 */
export const createCssString = (
  theme: Theme,
  selector: string = ":root"
): string => {
  const variables = flattenTheme(theme.colors);

  let cssString = `${selector} {\n`;

  Object.entries(variables).forEach(([key, value]) => {
    cssString += `  ${key}: ${value};\n`;
  });

  if (theme.type) {
    cssString += `  color-scheme: ${theme.type};\n`;
  }

  cssString += "}";
  return cssString;
};

/**
 * Gets the system color scheme preference
 */
export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * Gets theme from localStorage
 */
export const getStoredTheme = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * Saves theme to localStorage
 */
export const setStoredTheme = (key: string, theme: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, theme);
  } catch {
    // localStorage not available
  }
};

/**
 * Removes theme from localStorage
 */
export const removeStoredTheme = (key: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // localStorage not available
  }
};
