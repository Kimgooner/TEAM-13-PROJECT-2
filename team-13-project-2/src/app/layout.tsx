import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import AuthNav from "@/components/AuthNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "커피 맛있게 하는 집",
  description: "카페 메뉴 관리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="bg-[#d9c1a3] text-white shadow">
          <nav className="flex justify-between items-center max-w-5xl mx-auto p-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">☕</span>
              <Link href="/" className="text-xl font-bold text-amber-900">
                커피 맛있게 하는 집
              </Link>
            </div>
            <div className="flex gap-4">
              <Link
                href="/menu"
                className="hover:bg-[#8c7051] px-3 py-2 rounded-lg transition-colors"
              >
                메뉴
              </Link>
              <Link
                href="/wishlist"
                className="hover:bg-[#8c7051] px-3 py-2 rounded-lg transition-colors"
              >
                장바구니
              </Link>
              <Link
                href="/admin"
                className="hover:bg-[#8c7051] px-3 py-2 rounded-lg transition-colors"
              >
                관리
              </Link>
              <AuthNav />
            </div>
          </nav>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-[#d9c1a3] text-[#6b4f3b] text-center py-4 mt-10">
          <p className="font-medium">© 2025 커피 맛있게 하는 집</p>
        </footer>
      </body>
    </html>
  );
}
