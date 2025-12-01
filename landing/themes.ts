import { ThemesConfig } from "../packages/theme-switcher/src";

/**
 * Theme configurations for the landing page
 * These are the example themes that showcase the library
 */
export const themes: ThemesConfig = {
  light: {
    name: "light",
    type: "light",
    colors: {
      background: "#ffffff",
      foreground: "#0f172a",
      primary: {
        DEFAULT: "#3b82f6",
        foreground: "#ffffff",
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554",
      },
      secondary: {
        DEFAULT: "#64748b",
        foreground: "#ffffff",
      },
      accent: {
        DEFAULT: "#f43f5e",
        foreground: "#ffffff",
      },
      surface: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
      },
    },
  },
  dark: {
    name: "dark",
    type: "dark",
    colors: {
      background: "#020617",
      foreground: "#f8fafc",
      primary: {
        DEFAULT: "#60a5fa",
        foreground: "#0f172a",
        50: "#172554",
        100: "#1e3a8a",
        200: "#1e40af",
        300: "#1d4ed8",
        400: "#2563eb",
        500: "#3b82f6",
        600: "#60a5fa",
        700: "#93c5fd",
        800: "#bfdbfe",
        900: "#dbeafe",
        950: "#eff6ff",
      },
      secondary: {
        DEFAULT: "#94a3b8",
        foreground: "#0f172a",
      },
      accent: {
        DEFAULT: "#fb7185",
        foreground: "#0f172a",
      },
      surface: {
        50: "#0f172a",
        100: "#1e293b",
        200: "#334155",
        300: "#475569",
      },
    },
  },
  ocean: {
    name: "ocean",
    type: "dark",
    colors: {
      background: "#042f2e",
      foreground: "#ccfbf1",
      primary: {
        DEFAULT: "#2dd4bf",
        foreground: "#042f2e",
        50: "#042f2e",
        100: "#115e59",
        200: "#0f766e",
        300: "#0d9488",
        400: "#14b8a6",
        500: "#2dd4bf",
        600: "#5eead4",
        700: "#99f6e4",
        800: "#ccfbf1",
        900: "#f0fdfa",
        950: "#f0fdfa",
      },
      secondary: {
        DEFAULT: "#134e4a",
        foreground: "#ccfbf1",
      },
      accent: {
        DEFAULT: "#facc15",
        foreground: "#422006",
      },
      surface: {
        50: "#115e59",
        100: "#0f766e",
        200: "#0d9488",
        300: "#14b8a6",
      },
    },
  },
};
