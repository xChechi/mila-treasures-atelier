import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.categorySlug);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
