export type ColorPalette = {
  [key: string]: string | ColorPalette;
};

// Bir temanın asgari yapısı
export interface Theme {
  name: string; // "light", "dark", "dracula" vb.
  type?: "light" | "dark"; // Tailwind'in "dark:" sınıfı için ipucu
  colors: ColorPalette; // İç içe renk objesi
}

export type ThemesConfig = {
  [themeName: string]: Theme;
};

export interface ThemeContextType {
  theme: string; // Aktif temanın ismi (örn: 'dark')
  setTheme: (themeName: string) => void;
  toggleTheme: () => void;
  activeThemeObject: Theme; // Aktif temanın tüm verisi
}
