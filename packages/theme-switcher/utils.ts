import { Theme, ColorPalette } from "./types";

export const flattenTheme = (
  colors: ColorPalette,
  prefix: string = "--color"
): Record<string, string> => {
  const cssVariables: Record<string, string> = {};

  const traverse = (obj: ColorPalette, currentKey: string) => {
    Object.entries(obj).forEach(([key, value]) => {
      // Eğer key rakamla başlıyorsa (örn: 50, 100) araya tire koyma (primary-500)
      // Eğer key kelimeyse araya tire koy (primary-subtle)
      const newKey = currentKey ? `${currentKey}-${key}` : key;

      if (typeof value === "string") {
        // CSS Variable isimlendirmesi: prefix + key
        // Örn: --color-primary-500
        cssVariables[`${prefix}-${newKey}`] = value;
      } else {
        // Hala obje ise derinlemesine in (Recursion)
        traverse(value, newKey);
      }
    });
  };

  traverse(colors, "");
  return cssVariables;
};


export const createCssString = (theme: Theme): string => {
  const variables = flattenTheme(theme.colors);

  // :root seçicisi içine değişkenleri yazıyoruz.
  // Tailwind v4 bu değişkenleri otomatik algılayacaktır.
  let cssString = ":root {\n";

  Object.entries(variables).forEach(([key, value]) => {
    cssString += `  ${key}: ${value};\n`;
  });

  // Eğer dark mode ise color-scheme özelliğini de ekleyelim
  if (theme.type) {
    cssString += `  color-scheme: ${theme.type};\n`;
  }

  cssString += "}";
  return cssString;
};
