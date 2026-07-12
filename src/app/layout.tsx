import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "Индивидуальные Решения Упаковки | Гофроупаковка под заказ",
    template: "%s | ИРУ"
  },
  description: "Производство и поставка гофроупаковки и картонных коробок от 1000 кв. м. Разработка индивидуальных конструкций FEFCO, флексопечать, доставка по РФ.",
  keywords: ["гофроупаковка", "картонные коробки", "FEFCO", "гофрокартон", "производство упаковки"],
  openGraph: {
    title: "Индивидуальные Решения Упаковки",
    description: "Надежная упаковка для вашего бизнеса под заказ.",
    type: "website",
    locale: "ru_RU",
    url: "https://iru-pack.ru",
    siteName: "ИРУ",
  },
  robots: {
    index: true,
    follow: true,
  },
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
