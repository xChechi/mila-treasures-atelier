import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Milena — The Artist Behind the Atelier",
  description:
    "Meet Milena, a self-taught Bulgarian artist creating one-of-a-kind gothic home decor. Églomisé mirror art, hand-painted goblets, and sculpted trinket boxes — all handcrafted with rare 18th-century techniques.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Milena — Mila Treasures Atelier",
    description:
      "Self-taught artist in Bulgaria crafting unique gothic decor, églomisé mirror art, and dark home accessories using 18th-century French techniques.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
