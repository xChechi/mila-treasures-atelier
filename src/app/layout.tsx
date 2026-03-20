import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Gothic Treasures | Handcrafted Dark Elegance",
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-dark-1 text-foreground antialiased">
        <GrainOverlay />
        <ScrollProgress />
        <Navbar />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
