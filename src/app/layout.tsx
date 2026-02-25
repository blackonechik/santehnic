import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Сантехник Москва | Выезд за 30 минут | Гарантия до 3 лет",
  description: "Профессиональный сантехник в Москве. Выезд на дом за 30 минут. Устранение засоров, замена труб, установка сантехники. Гарантия качества. Работаю 24/7.",
  keywords: "сантехник москва, сантехнические услуги, вызов сантехника, сантехник на дом, устранение засоров, замена труб",
  authors: [{ name: "Сантехник Москва" }],
  openGraph: {
    title: "Сантехник Москва | Выезд за 30 минут",
    description: "Профессиональные сантехнические услуги в Москве. Гарантия качества, честные цены.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
