import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Born in Bulgaria, Gothic Treasures preserves the dark artistry of European gothic craft. Each piece is handmade by skilled artisans inspired by medieval cathedrals.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
