import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "www.focus-realestate.com";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: "Ursula Weinkauff | Focus Group by Local Real Estate",
    description: "Southwest Florida real estate search and local guidance from Ursula Weinkauff and Focus Group by Local Real Estate.",
    icons: { icon: "/assets/focus-logo.png", shortcut: "/assets/focus-logo.png" },
    openGraph: {
      type: "website",
      siteName: "Focus Group by Local Real Estate",
      title: "Ursula Weinkauff | Focus Group by Local Real Estate",
      description: "Search homes and discover communities across Southwest Florida.",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Focus Group — Southwest Florida Real Estate" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Focus Group | Southwest Florida Real Estate",
      description: "Local expertise. Global reach.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
