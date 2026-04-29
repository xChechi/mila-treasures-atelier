import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import ShopPageClient from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop Handmade Gothic Decor & Dark Art",
  description:
    "Browse unique handcrafted gothic home decor — églomisé mirror art, jewel-toned goblets, ornate trinket boxes, and original dark paintings. One-of-a-kind pieces made in Bulgaria, shipped worldwide via Etsy.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop Handmade Gothic Decor — Mila Treasures Atelier",
    description:
      "Explore our collection of handcrafted gothic art and dark home decor. Each piece is a unique original — when it sells, it's gone forever.",
    url: "/shop",
  },
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}
