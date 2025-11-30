import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Reactive Switcher - A theme switcher for React apps",
  description: "A simple and customizable theme switcher component for React applications, allowing users to toggle between light and dark modes seamlessly. Easily integrate it into your projects to enhance user experience with dynamic theming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
