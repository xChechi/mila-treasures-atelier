import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://milatreasuresatelier.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mila Treasures Atelier | Handcrafted Dark Elegance",
    template: "%s — Mila Treasures Atelier",
  },
  description:
    "Handcrafted gothic home decor & dark art by Bulgarian artist Milena. One-of-a-kind églomisé mirror art, hand-painted goblets, ornate trinket boxes & original paintings. Shop unique handmade pieces on Etsy.",
  keywords: [
    "handmade gothic decor",
    "églomisé mirror art",
    "gothic home decor",
    "dark art decor",
    "hand-painted goblets",
    "handcrafted trinket boxes",
    "original dark paintings",
    "gothic wall art",
    "dark romanticism decor",
    "unique handmade gifts",
    "bulgarian handmade art",
    "etsy gothic shop",
    "mila treasures atelier",
  ],
  authors: [{ name: "Mila Treasures Atelier" }],
  creator: "Mila Treasures Atelier",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Mila Treasures Atelier",
    title: "Mila Treasures Atelier | Handcrafted Dark Elegance",
    description:
      "Handcrafted gothic home decor & dark art — églomisé mirror art, hand-painted goblets, ornate trinket boxes & original paintings. Made in Bulgaria, shipped worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mila Treasures Atelier — Handcrafted Dark Elegance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mila Treasures Atelier | Handcrafted Dark Elegance",
    description:
      "Handcrafted gothic home decor & dark art — églomisé mirror art, hand-painted goblets, trinket boxes & original paintings by Bulgarian artist Milena.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Mila Treasures Atelier",
                  url: SITE_URL,
                  logo: `${SITE_URL}/og-image.jpg`,
                  description:
                    "Handcrafted gothic home decor, original paintings, and artisan pieces made in Bulgaria by Milena.",
                },
                {
                  "@type": "WebSite",
                  name: "Mila Treasures Atelier",
                  url: SITE_URL,
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-dark-1 text-foreground antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
