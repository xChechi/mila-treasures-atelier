import { notFound } from "next/navigation";
import { products, categories } from "@/data/products";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import CategoryPageClient from "./CategoryPageClient";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
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
