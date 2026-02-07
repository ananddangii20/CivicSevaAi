import React from "react"
import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatBot from "@/components/global/ChatBot";


const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "CivicSeva AI - Civic Assistant",
  description:
    "AI-powered civic assistance platform for reporting issues, finding government schemes, and accessing public services",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <ChatBot />
      </body>
    </html>
  );
}
