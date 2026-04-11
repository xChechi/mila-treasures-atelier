import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tales from the Workshop",
  description:
    "Stories of craftsmanship, gothic culture, and the art of creating handmade dark elegance. From our Bulgarian workshop to your walls.",
  alternates: { canonical: "/journal" },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
