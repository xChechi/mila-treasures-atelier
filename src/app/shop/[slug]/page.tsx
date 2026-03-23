import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getReviewsByProduct, getAverageRating } from "@/data/reviews";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} — Gothic Treasures`,
      description: product.shortDescription,
      images: [{ url: product.image, width: 800, height: 1067, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Gothic Treasures`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.categorySlug, 4, product.price);
  const productReviews = getReviewsByProduct(product.id);
  const avgRating = getAverageRating(product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
    material: product.material,
    brand: { "@type": "Brand", name: "Gothic Treasures" },
    ...(productReviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: productReviews.length,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={related} reviews={productReviews} averageRating={avgRating} />
    </>
  );
}
