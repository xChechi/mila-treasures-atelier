import type { Metadata } from "next";
import { getJournalPosts } from "@/lib/data";
import JournalPageClient from "./JournalPageClient";

export const metadata: Metadata = {
  title: "Journal — Gothic Art, Craft Techniques & Dark Decor Inspiration",
  description:
    "Explore the stories behind handmade gothic decor — églomisé techniques, dark art inspiration, and behind-the-scenes from a Bulgarian artisan's workshop.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal — Mila Treasures Atelier",
    description:
      "Stories from the workshop: églomisé art techniques, gothic decor inspiration, and the craft behind handmade dark elegance.",
    url: "/journal",
  },
};

export default async function JournalPage() {
  const posts = await getJournalPosts();
  return <JournalPageClient posts={posts} />;
}
