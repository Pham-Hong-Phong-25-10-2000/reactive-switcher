"use client";

import React, { useCallback, useMemo } from "react";
import { useTheme } from "./provider";

// ============================================
// THEME SWITCHER - Button Component
// ============================================

export interface ThemeSwitcherProps {
  /** Custom class name for the container */
  className?: string;
  /** Show theme labels */
  showLabels?: boolean;
  /** Custom labels for themes */
  labels?: Record<string, string>;
  /** Include system option */
  includeSystem?: boolean;
  /** Custom icons for themes */
  icons?: Record<string, React.ReactNode>;
  /** Render as dropdown instead of buttons */
  variant?: "buttons" | "dropdown" | "toggle";
  /** Custom render function for complete control */
  children?: (props: ThemeSwitcherRenderProps) => React.ReactNode;
}

export interface ThemeSwitcherRenderProps {
  theme: string;
  resolvedTheme: string;
  themes: string[];
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  systemTheme: "light" | "dark";
}

/**
 * Ready-to-use theme switcher component
 * Can be used with default styles or completely customized
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = "",
  showLabels = true,
  labels = {},
  includeSystem = true,
  icons = {},
  variant = "buttons",
  children,
}) => {
  const { theme, resolvedTheme, themes, setTheme, toggleTheme, systemTheme } =
    useTheme();

  // Build available options
  const options = useMemo(() => {
    const opts = [...themes];
    if (includeSystem && !opts.includes("system")) {
      opts.push("system");
    }
    return opts;
  }, [themes, includeSystem]);

  // Get label for a theme
  const getLabel = useCallback(
    (themeName: string) => {
      if (labels[themeName]) return labels[themeName];
      return themeName.charAt(0).toUpperCase() + themeName.slice(1);
    },
    [labels]
  );

  // Default icons
  const defaultIcons: Record<string, React.ReactNode> = {
    light: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    dark: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
    system: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  };

  // Get icon for a theme
  const getIcon = useCallback(
    (themeName: string) => {
      if (icons[themeName]) return icons[themeName];
      return defaultIcons[themeName] || null;
    },
    [icons]
  );

  // If custom render function provided
  if (children) {
    return (
      <>
        {children({
          theme,
          resolvedTheme,
          themes: options,
          setTheme,
          toggleTheme,
          systemTheme,
        })}
      </>
    );
  }

  // Toggle variant - simple button that cycles through themes
  if (variant === "toggle") {
    return (
      <button
        onClick={toggleTheme}
        className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${className}`}
        aria-label={`Current theme: ${resolvedTheme}. Click to toggle.`}
      >
        {getIcon(resolvedTheme)}
        {showLabels && <span>{getLabel(resolvedTheme)}</span>}
      </button>
    );
  }

  // Dropdown variant
  if (variant === "dropdown") {
    return (
      <div className={`relative inline-block ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="appearance-none bg-transparent border rounded-lg px-3 py-2 pr-8 cursor-pointer focus:outline-none focus:ring-2"
          aria-label="Select theme"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {getLabel(opt)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Default buttons variant
  return (
    <div className={`inline-flex gap-1 ${className}`} role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setTheme(opt)}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
            theme === opt
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-surface-100"
          }`}
          role="radio"
          aria-checked={theme === opt}
          aria-label={getLabel(opt)}
        >
          {getIcon(opt)}
          {showLabels && <span>{getLabel(opt)}</span>}
        </button>
      ))}
    </div>
  );
};

// ============================================
// THEME TOGGLE - Simple Toggle Component
// ============================================

export interface ThemeToggleProps {
  /** Class name for the button */
  className?: string;
  /** Size of the toggle */
  size?: "sm" | "md" | "lg";
  /** Light theme icon */
  lightIcon?: React.ReactNode;
  /** Dark theme icon */
  darkIcon?: React.ReactNode;
}

/**
 * Simple light/dark toggle component
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  size = "md",
  lightIcon,
  darkIcon,
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const defaultLightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconSizes[size]}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );

  const defaultDarkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconSizes[size]}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex items-center justify-center rounded-lg transition-colors hover:bg-surface-100 ${sizeClasses[size]} ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? darkIcon || defaultDarkIcon : lightIcon || defaultLightIcon}
    </button>
  );
};
