import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journalPosts, getPostBySlug } from "@/data/journal";
import JournalArticleClient from "./JournalArticleClient";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: `${post.title} — Mila Treasures Atelier`,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Mila Treasures Atelier`,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Find adjacent posts for navigation
  const currentIndex = journalPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < journalPosts.length - 1 ? journalPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? journalPosts[currentIndex - 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Mila Treasures Atelier",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalArticleClient post={post} prevPost={prevPost} nextPost={nextPost} />
    </>
  );
}
