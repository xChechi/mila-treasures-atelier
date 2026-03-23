import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Pieces",
  description:
    "Browse our collection of handcrafted gothic home wall decor — unique crosses, gargoyles, mirrors, and candle holders. Each piece is one-of-a-kind.",
  alternates: { canonical: "/shop" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
