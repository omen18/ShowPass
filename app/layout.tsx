import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";

import AppProviders from "@/components/shared/AppProviders";
import AuthBootstrap from "@/components/shared/AuthBootstrap";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Yash Raj Sharan",
  description: "India's #1 multi-service platform. Book movies, hotels, trains, flights, food, stays and city experiences — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="antialiased">
        <AppProviders>
          <AuthBootstrap>{children}</AuthBootstrap>
        </AppProviders>
      </body>
    </html>
  );
}
