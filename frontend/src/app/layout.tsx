import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Cup 2026",
  description: "FIFA World Cup 2026 matches, standings, and top scorers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-3xl gap-6 px-6 py-4">
            <Link href="/" className="font-semibold">
             WORLDCUP 2026
            </Link>

            <Link href="/matches" className="text-zinc-600 hover:text-black">
              Matches
            </Link>

            <Link href="/standings" className="text-zinc-600 hover:text-black">
              Standings
            </Link>

            <Link href="/scorers" className="text-zinc-600 hover:text-black">
              Scorers
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
