import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { PageTransition } from "@/components/providers/PageTransition";
import { Noise } from "@/components/providers/Noise";
import { Konami } from "@/components/providers/Konami";
import { InkLoader } from "@/components/providers/InkLoader";
import { CommandPalette } from "@/components/providers/CommandPalette";
import { WeightScrollProvider } from "@/components/providers/WeightScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollRail } from "@/components/layout/ScrollRail";
import { AuroraBackdrop } from "@/components/three/AuroraBackdropClient";
import { createMetadata } from "@/lib/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="grain antialiased">
        <AuroraBackdrop />
        <InkLoader />
        <LenisProvider>
          <Noise />
          <CustomCursor />
          <Konami />
          <CommandPalette />
          <WeightScrollProvider />
          <Header />
          <ScrollRail />
          <main className="relative">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
        <SpeedInsights />
        <Analytics />

        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
