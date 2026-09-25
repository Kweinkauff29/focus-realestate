import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { sitePath } from "./site-path";

const productionOrigin = "https://ursulaweinkauff.com";

export const metadata: Metadata = {
  metadataBase: new URL(productionOrigin),
  title: "Ursula Weinkauff | Focus Group by Local Real Estate",
  description: "Southwest Florida real estate search and local guidance from Ursula Weinkauff and Focus Group by Local Real Estate.",
  icons: { icon: sitePath("/assets/focus-logo.png"), shortcut: sitePath("/assets/focus-logo.png") },
  openGraph: {
    type: "website",
    siteName: "Focus Group by Local Real Estate",
    title: "Ursula Weinkauff | Focus Group by Local Real Estate",
    description: "Search homes and discover communities across Southwest Florida.",
    url: productionOrigin,
    images: [{ url: `${productionOrigin}/og.png`, width: 1200, height: 630, alt: "Focus Group — Southwest Florida Real Estate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Group | Southwest Florida Real Estate",
    description: "Local expertise. Global reach.",
    images: [`${productionOrigin}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const assetStyles = {
    "--hero-background-image": `url("${sitePath("/assets/hero-southwest-florida.jpg")}")`,
    "--article-background-image": `url("${sitePath("/assets/fort-myers-beach.jpg")}")`,
    "--footer-background-image": `url("${sitePath("/assets/footer-home.jpg")}")`,
  } as CSSProperties;

  return <html lang="en"><body style={assetStyles}>{children}</body></html>;
}
