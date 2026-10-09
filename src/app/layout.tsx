import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { getSettings } from "@/lib/data";
import { graph, localBusinessLd, organizationLd, websiteLd } from "@/lib/jsonLd";
import { site, siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { description } = await getSettings();
  const base = siteUrl();
  return {
    metadataBase: new URL(base),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
    description,
    openGraph: {
      title: site.name,
      description,
      type: "website",
      url: base,
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: site.name, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f2ec" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={graph(organizationLd(settings), websiteLd(settings), localBusinessLd(settings))} />
      </head>
      <body>{children}</body>
    </html>
  );
}
