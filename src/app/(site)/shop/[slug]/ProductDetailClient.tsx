"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Package, Ruler, Star } from "lucide-react";
import { etsyLink } from "@/lib/etsy";
import type { Product } from "@/data/products";
import type { Review } from "@/data/reviews";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/shop/ProductGallery";
import RelatedProducts from "@/components/shop/RelatedProducts";
import SizeReference from "@/components/shop/SizeReference";
import ProductReviews from "@/components/shop/ProductReviews";
import ShareButtons from "@/components/shop/ShareButtons";
import RecentlyViewed from "@/components/shop/RecentlyViewed";
import EtsyBar from "@/components/shop/EtsyBar";
import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import Link from "next/link";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  reviews: Review[];
  averageRating: number;
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  reviews,
  averageRating,
}: ProductDetailClientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Track recently viewed
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addItem);
  useEffect(() => {
    addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <ProductGallery
              mainImage={product.image}
              images={product.images}
              productName={product.name}
              etsyUrl={product.etsyUrl}
            />
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Category */}
            <p className="font-inter text-[10px] tracking-[0.5em] uppercase text-gold/40 mb-3">
              <Link
                href={`/category/${product.categorySlug}`}
                className="hover:text-gold-light transition-colors"
              >
                {product.category}
              </Link>
            </p>

            {/* Name */}
            <h1 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-4 tracking-wide">
              {product.name}
            </h1>

            {/* Price */}
            <p className="font-cinzel text-2xl text-gold mb-3">
              ${product.price.toFixed(2)}
            </p>

            {/* Star rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(averageRating)
                          ? "text-gold/60 fill-gold/60"
                          : "text-foreground/15"
                      }
                    />
                  ))}
                </div>
                <span className="font-inter text-xs text-foreground/30">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
              <div className="w-1 h-1 rotate-45 bg-gold/30" />
              <div className="flex-1 h-px bg-gradient-to-l from-gold/20 to-transparent" />
            </div>

            {/* Description */}
            <p className="font-inter text-sm text-foreground/50 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs */}
            <div className="space-y-3 mb-8">
              {product.material && (
                <div className="flex items-center gap-3">
                  <Package size={14} className="text-gold/40" />
                  <span className="font-inter text-xs text-foreground/30 tracking-wider uppercase w-24">Material</span>
                  <span className="font-inter text-sm text-foreground/60">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex items-center gap-3">
                  <Ruler size={14} className="text-gold/40" />
                  <span className="font-inter text-xs text-foreground/30 tracking-wider uppercase w-24">Dimensions</span>
                  <span className="font-inter text-sm text-foreground/60">{product.dimensions}</span>
                </div>
              )}
            </div>

            {/* Size Reference */}
            {product.dimensions && <SizeReference dimensions={product.dimensions} />}

            {/* CTA */}
            <div className="mt-auto space-y-4">
              {/* Social proof right above buy button */}
              {reviews.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-2 border-t border-b border-gold/8">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`cta-star-${i}`}
                        size={12}
                        className={
                          i < Math.round(averageRating)
                            ? "text-gold/60 fill-gold/60"
                            : "text-foreground/15"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-inter text-xs text-foreground/40">
                    {averageRating.toFixed(1)} from {reviews.length} {reviews.length === 1 ? "collector" : "collectors"}
                  </span>
                </div>
              )}
              {!product.inStock ? (
                <button
                  disabled
                  className="w-full py-4 bg-dark-3/50 border border-foreground/10 text-foreground/30 font-inter text-sm tracking-[0.15em] uppercase cursor-not-allowed"
                >
                  Sold Out — Claimed
                </button>
              ) : (
                <a
                  href={etsyLink(product.etsyUrl, "product-detail")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-3 transition-colors duration-300"
                >
                  <ExternalLink size={16} />
                  Buy on Etsy
                </a>
              )}

              {/* Unique piece notice */}
              <p className="text-center font-inter text-xs tracking-[0.2em] uppercase text-gold/60">
                One-of-a-kind piece — handcrafted in Bulgaria
              </p>

              {/* Share buttons */}
              <div className="flex justify-center pt-2 border-t border-gold/5">
                <ShareButtons
                  productName={product.name}
                  productUrl={`/shop/${product.slug}`}
                  productImage={product.image}
                  productDescription={product.shortDescription}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <ProductReviews reviews={reviews} averageRating={averageRating} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />

        {/* Recently Viewed */}
        <RecentlyViewed excludeId={product.id} />
      </div>
        <EtsyBar
          productName={product.name}
          price={product.price}
          etsyUrl={product.etsyUrl}
          inStock={product.inStock}
          averageRating={averageRating}
          reviewCount={reviews.length}
        />
    </section>
  );
}
