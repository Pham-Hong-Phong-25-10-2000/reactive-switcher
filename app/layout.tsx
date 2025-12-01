import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/packages/theme-switcher/src";
import { themes } from "@/landing/themes";

export const metadata: Metadata = {
  title: "Reactive Switcher - A theme switcher for React apps",
  description:
    "Type-safe, modular, and instant theme switching for React & Tailwind CSS v4. Zero runtime overhead with CSS variables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          themes={themes}
          defaultTheme="light"
          storageKey="reactive-switcher-demo-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
