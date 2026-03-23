import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import BackToTop from "@/components/ui/BackToTop";
import SoldTicker from "@/components/ui/SoldTicker";
import PageTransition from "@/components/ui/PageTransition";

const SITE_URL = "https://gothictreasures.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gothic Treasures | Handcrafted Dark Elegance",
    template: "%s — Gothic Treasures",
  },
  description:
    "Unique handmade gothic home wall decor — crosses, gargoyles, mirrors, candle holders. Crafted in Bulgaria, shipped to the USA.",
  keywords: [
    "gothic decor",
    "wall cross",
    "gargoyle",
    "gothic mirror",
    "candle holder",
    "handmade",
    "dark home decor",
    "gothic wall art",
    "handcrafted decor",
  ],
  authors: [{ name: "Gothic Treasures" }],
  creator: "Gothic Treasures",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Gothic Treasures",
    title: "Gothic Treasures | Handcrafted Dark Elegance",
    description:
      "Unique handmade gothic home wall decor — crosses, gargoyles, mirrors, candle holders. Crafted in Bulgaria, shipped to the USA.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gothic Treasures — Handcrafted Dark Elegance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gothic Treasures | Handcrafted Dark Elegance",
    description:
      "Unique handmade gothic home wall decor — crosses, gargoyles, mirrors, candle holders.",
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
                  name: "Gothic Treasures",
                  url: SITE_URL,
                  logo: `${SITE_URL}/og-image.jpg`,
                  description:
                    "Handcrafted gothic home wall decor — unique crosses, gargoyles, mirrors, and candle holders. Made in Bulgaria, shipped to the USA.",
                },
                {
                  "@type": "WebSite",
                  name: "Gothic Treasures",
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
        <CartDrawer />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <BackToTop />
        <SoldTicker />
      </body>
    </html>
  );
}
