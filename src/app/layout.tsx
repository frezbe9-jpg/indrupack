import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "Индивидуальные Решения Упаковки | B2B Производство Гофроупаковки",
    template: "%s | ИРУ Платформа"
  },
  description: "Технологичное производство гофроупаковки от 1000 кв. м. Индивидуальный дизайн FEFCO, быстрая логистика по РФ, личный кабинет клиента.",
  keywords: ["гофроупаковка оптом", "производство коробок", "FEFCO каталог", "гофрокартон производитель"],
  authors: [{ name: "ИРУ Engineering" }],
  openGraph: {
    title: "ИРУ — Индивидуальные Решения Упаковки",
    description: "Промышленная платформа для заказа упаковки. От квиза до отгрузки.",
    type: "website",
    url: "https://iru-pack.ru",
    siteName: "ИРУ Платформа",
  },
  alternates: {
    canonical: "https://iru-pack.ru",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-gray-950 text-gray-100 selection:bg-orange-500/30 font-['Inter',sans-serif]">
        {children}
      </body>
    </html>
  );
}
