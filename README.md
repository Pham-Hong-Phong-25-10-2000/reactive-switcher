<p align="center">
	<img src="./public/logo/Logo.png" alt="Reactive Switcher Logo" width="180" />
</p>

# Reactive Switcher

Tema değiştirme ve yönetimi için modern, esnek ve kolay entegre edilebilen bir Next.js paketi.

## Özellikler

- React Context ile tema yönetimi
- Kendi temalarınızı tanımlama ve kolayca değiştirme
- Hafif ve performanslı
- Next.js ile tam uyumlu

## Kurulum

```bash
pnpm add @poyrazavsever/theme-switcher
# veya
npm install @poyrazavsever/theme-switcher
# veya
yarn add @poyrazavsever/theme-switcher
```

## Kullanım

Ana dosyanızda ThemeProvider ile uygulamanızı sarmalayın:

```tsx
import { ThemeProvider } from "@poyrazavsever/theme-switcher";

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

Tema değiştirmek için context’i kullanın:

```tsx
import { useTheme } from "@poyrazavsever/theme-switcher";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Temayı Değiştir
    </button>
  );
};
```

## Paket Yapısı

- `context.tsx`: Tema context ve provider
- `my-theme.ts`: Varsayılan ve özel tema tanımları
- `types.ts`: Tip tanımlamaları
- `utils.ts`: Yardımcı fonksiyonlar

## Geliştirme

Projeyi başlatmak için:

```bash
pnpm dev
# veya
npm run dev
# veya
yarn dev
```

Uygulama [localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Katkı

Katkı sağlamak için pull request gönderebilirsiniz. Sorularınız için issue açabilirsiniz.

## Lisans

MIT
