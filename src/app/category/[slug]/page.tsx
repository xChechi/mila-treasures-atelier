import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, categories } from "@/data/products";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import CategoryPageClient from "./CategoryPageClient";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.name} — Gothic Treasures`,
      description: category.description,
      images: [{ url: category.image, width: 600, height: 600, alt: category.name }],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);
  const realCount = categoryProducts.length;

  return (
    <CategoryPageClient
      category={category}
      products={categoryProducts}
      productCount={realCount}
    />
  );
}
