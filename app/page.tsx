"use client";

import { useTheme } from "@/packages/theme-switcher/context";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    // Artık style prop'u yok! bg-background ve text-foreground CSS'ten geliyor.
    <div className="min-h-screen flex flex-col">
      <main className="max-w-4xl mx-auto p-10 space-y-12 w-full flex-1">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Theme Switcher <span className="text-primary">v1.0</span>
          </h1>
          <p className="text-lg opacity-80">
            Aktif Tema:{" "}
            <span className="font-mono font-bold capitalize">{theme}</span>
          </p>
        </div>

        {/* Kontroller */}
        <div className="flex justify-center gap-4 p-6 rounded-2xl bg-surface-100 shadow-sm border border-surface-200">
          {["light", "dark", "ocean"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`
                px-6 py-2.5 rounded-lg font-medium transition-all duration-200
                ${
                  theme === t
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-surface-200 hover:bg-surface-50 text-foreground"
                }
              `}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Renk Paleti Testi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Colors */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Primary Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="space-y-1 text-center group">
                    {/* Dinamik sınıf isimleri için template literal kullanımı */}
                    <div
                      className={`h-12 w-full rounded-md shadow-sm border border-surface-200 bg-primary-${shade}`}
                    />
                    <div className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                      {shade}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Diğer Renkler */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Semantic Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-surface-200 bg-secondary text-secondary-foreground flex justify-between items-center">
                <span>Secondary</span>
                <span className="text-xs opacity-75">Aa</span>
              </div>
              <div className="p-4 rounded-xl border border-surface-200 bg-accent text-accent-foreground flex justify-between items-center">
                <span>Accent</span>
                <span className="text-xs opacity-75">Aa</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
