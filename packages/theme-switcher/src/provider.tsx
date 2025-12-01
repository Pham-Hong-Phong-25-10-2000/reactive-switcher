"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ThemesConfig, ThemeContextType, ThemeProviderProps } from "./types";
import {
  createCssString,
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
} from "./utils";

// Create context with undefined default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Script to prevent flash on page load
const ThemeScript = ({
  storageKey,
  defaultTheme,
  enableSystem,
  themes,
  attribute,
}: {
  storageKey: string;
  defaultTheme: string;
  enableSystem: boolean;
  themes: string[];
  attribute: "class" | "data-theme";
}) => {
  const scriptContent = `
    (function() {
      try {
        var storageKey = '${storageKey}';
        var defaultTheme = '${defaultTheme}';
        var enableSystem = ${enableSystem};
        var themes = ${JSON.stringify(themes)};
        var attribute = '${attribute}';
        
        var stored = localStorage.getItem(storageKey);
        var theme = stored || defaultTheme;
        
        if (theme === 'system' && enableSystem) {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        if (!themes.includes(theme)) {
          theme = defaultTheme;
        }
        
        var d = document.documentElement;
        
        if (attribute === 'class') {
          // Remove existing theme classes
          themes.forEach(function(t) { d.classList.remove(t); });
          d.classList.add(theme);
          
          // Handle dark class for Tailwind
          if (theme === 'dark' || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            d.classList.add('dark');
          } else {
            d.classList.remove('dark');
          }
        } else {
          d.setAttribute('data-theme', theme);
        }
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: scriptContent }}
      suppressHydrationWarning
    />
  );
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themes,
  defaultTheme = "light",
  selector = ":root",
  styleId = "reactive-switcher-styles",
  storageKey = "reactive-switcher-theme",
  enableStorage = true,
  enableSystem = true,
  attribute = "class",
}) => {
  const themeNames = useMemo(() => Object.keys(themes), [themes]);

  // Initialize theme state
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window === "undefined") return defaultTheme;
    if (enableStorage) {
      const stored = getStoredTheme(storageKey);
      if (stored && (themeNames.includes(stored) || stored === "system")) {
        return stored;
      }
    }
    return defaultTheme;
  });

  // Track system theme
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
    typeof window === "undefined" ? "light" : getSystemTheme()
  );

  // Resolve actual theme (handle 'system' option)
  const resolvedTheme = useMemo(() => {
    if (theme === "system" && enableSystem) {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme, enableSystem]);

  // Get active theme object
  const activeThemeObject = useMemo(() => {
    return (
      themes[resolvedTheme] || themes[defaultTheme] || Object.values(themes)[0]
    );
  }, [themes, resolvedTheme, defaultTheme]);

  // Set theme function
  const setTheme = useCallback(
    (themeName: string) => {
      if (themeName === "system" && enableSystem) {
        setThemeState("system");
        if (enableStorage) {
          setStoredTheme(storageKey, "system");
        }
        return;
      }

      if (themes[themeName]) {
        setThemeState(themeName);
        if (enableStorage) {
          setStoredTheme(storageKey, themeName);
        }
      } else {
        console.warn(`[reactive-switcher] Theme '${themeName}' not found.`);
      }
    },
    [themes, enableStorage, storageKey, enableSystem]
  );

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    const currentIndex = themeNames.indexOf(resolvedTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setTheme(themeNames[nextIndex]);
  }, [themeNames, resolvedTheme, setTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [enableSystem]);

  // Apply theme CSS variables
  useEffect(() => {
    if (!activeThemeObject) return;

    // Create CSS string
    const cssString = createCssString(activeThemeObject, selector);

    // Find or create style tag
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.setAttribute("id", styleId);
      document.head.appendChild(styleTag);
    }

    // Inject CSS
    styleTag.innerHTML = cssString;

    // Handle HTML element classes/attributes
    if (selector === ":root") {
      const html = document.documentElement;

      if (attribute === "class") {
        // Remove existing theme classes
        themeNames.forEach((t) => html.classList.remove(t));
        html.classList.add(resolvedTheme);

        // Tailwind dark mode class
        if (activeThemeObject.type === "dark") {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      } else {
        html.setAttribute("data-theme", resolvedTheme);
      }
    }
  }, [
    activeThemeObject,
    selector,
    styleId,
    attribute,
    resolvedTheme,
    themeNames,
  ]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      activeThemeObject,
      themes: themeNames,
      systemTheme,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      activeThemeObject,
      themeNames,
      systemTheme,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeScript
        storageKey={storageKey}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}
        themes={themeNames}
        attribute={attribute}
      />
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "[reactive-switcher] useTheme must be used within a ThemeProvider"
    );
  }
  return context;
};

export { ThemeContext };
