"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ThemesConfig, ThemeContextType } from "./types";
import { createCssString } from "./utils";

// Context'i oluşturuyoruz
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  themes: ThemesConfig;
  defaultTheme: string;
  selector?: string; // YENİ: CSS değişkenlerinin uygulanacağı seçici
  styleId?: string; // YENİ: Style etiketinin benzersiz ID'si
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themes,
  defaultTheme,
  selector = ":root", // Varsayılan olarak tüm sayfayı etkiler
  styleId = "react-theme-switcher-styles", // Varsayılan ID
}) => {
  // 1. State: Aktif tema ismi
  const [theme, setThemeState] = useState<string>(defaultTheme);

  // Güvenli tema değiştirme fonksiyonu
  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setThemeState(themeName);
    } else {
      console.warn(`Theme '${themeName}' not found in configuration.`);
    }
  };

  // Basit toggle fonksiyonu
  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  // 2. Effect: Tema değiştiğinde CSS'i güncelle
  useEffect(() => {
    const activeThemeObject = themes[theme];
    if (!activeThemeObject) return;

    // a. CSS stringini oluştur (selector ile)
    const cssString = createCssString(activeThemeObject, selector);

    // b. <style> etiketini bul veya oluştur (styleId ile)
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.setAttribute("id", styleId);
      document.head.appendChild(styleTag);
    }

    // c. Yeni CSS değişkenlerini enjekte et
    styleTag.innerHTML = cssString;

    // d. Tailwind 'darkMode: class' stratejisi (Sadece global ise HTML'e class ekle)
    if (selector === ":root") {
      const html = document.documentElement;
      if (activeThemeObject.type === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, [theme, themes, selector, styleId]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    activeThemeObject: themes[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 3. Custom Hook: Context'i kullanmak için
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
