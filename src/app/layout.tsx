import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/ui/PageTransition";

const SITE_URL = "https://milatreasuresatelier.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mila Treasures Atelier | Handcrafted Dark Elegance",
    template: "%s — Mila Treasures Atelier",
  },
  description:
    "Unique handmade gothic home decor, original paintings, jewel-toned goblets, and artisan trinket boxes. Crafted in Bulgaria by Milena, available on Etsy.",
  keywords: [
    "gothic decor",
    "handmade goblets",
    "original paintings",
    "trinket boxes",
    "églomisé portraits",
    "handmade",
    "dark home decor",
    "gothic art",
    "etsy shop",
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
      "Unique handmade gothic home decor, original paintings, jewel-toned goblets, and artisan trinket boxes. Crafted in Bulgaria, shipped worldwide.",
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
      "Unique handmade gothic home decor, original paintings, jewel-toned goblets, and artisan trinket boxes.",
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
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <GrainOverlay />
        <ScrollProgress />
        <ScrollToTop />
        <CustomCursor />
        <Navbar />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
