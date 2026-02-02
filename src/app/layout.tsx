import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/shared";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HitungPajak - Tools Perpajakan Indonesia Gratis",
  description:
    "Kalkulator pajak online gratis untuk PPh 21, PPh 23, PPh Final, PPh Badan, dan PPN. Hitung pajak Anda dengan mudah dan akurat.",
  keywords: [
    "kalkulator pajak",
    "PPh 21",
    "PPh 23",
    "PPh Final",
    "PPN",
    "pajak Indonesia",
    "hitung pajak online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
