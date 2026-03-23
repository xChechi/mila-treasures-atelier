"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Check, Package, Ruler, Scale } from "lucide-react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/shop/ProductGallery";
import RelatedProducts from "@/components/shop/RelatedProducts";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const cartItems = useCartStore((s) => s.items);
  const isInCart = cartItems.some((i) => i.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
    setCartOpen(true);
  };

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
            <p className="font-cinzel text-2xl text-gold mb-6">
              ${product.price.toFixed(2)}
            </p>

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
              {product.weight && (
                <div className="flex items-center gap-3">
                  <Scale size={14} className="text-gold/40" />
                  <span className="font-inter text-xs text-foreground/30 tracking-wider uppercase w-24">Weight</span>
                  <span className="font-inter text-sm text-foreground/60">{product.weight}</span>
                </div>
              )}
            </div>

            {/* Stock status + Add to cart */}
            <div className="mt-auto space-y-4">
              {!product.inStock ? (
                <button
                  disabled
                  className="w-full py-4 bg-dark-3/50 border border-foreground/10 text-foreground/30 font-inter text-sm tracking-[0.15em] uppercase cursor-not-allowed"
                >
                  Sold Out
                </button>
              ) : isInCart ? (
                <Link
                  href="/cart"
                  className="w-full py-4 bg-dark-3/80 border border-gold/20 text-gold-light font-inter text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:border-gold/40 transition-colors duration-300"
                >
                  <Check size={16} />
                  In Your Cart — View Cart
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              )}

              {/* Unique piece notice */}
              <p className="text-center font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/20">
                One-of-a-kind piece — handcrafted in Bulgaria
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </section>
  );
}
