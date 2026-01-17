import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "SantehKharkiv | Сантехника и Отопление",
  description: "Интернет-магазин сантехники в Харькове. Трубы, котлы, ванны.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50 text-slate-900`}
        suppressHydrationWarning={true}
      >
        {/* Исправлено flex-grow на grow */}
        <div className="grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}