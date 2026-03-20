"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { ShoppingBag, Eye } from "lucide-react";

const featured = products.filter((p) => p.featured);

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group"
    >
      <div className="relative overflow-hidden bg-dark-3 gothic-frame">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-1 via-dark-1/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Spotlight effect on hover */}
          <div className="absolute inset-0 bg-radial-[at_50%_30%] from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick actions */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex gap-2">
              <button
                onClick={() => addItem(product)}
                disabled={!product.inStock}
                className="flex-1 py-3 bg-burgundy/90 hover:bg-burgundy text-white text-xs tracking-[0.15em] uppercase font-inter flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={14} />
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </button>
              <Link
                href={`/shop/${product.slug}`}
                className="py-3 px-4 bg-dark-1/80 hover:bg-dark-1 text-foreground/80 transition-colors flex items-center"
              >
                <Eye size={14} />
              </Link>
            </div>
          </div>

          {/* Sold out badge */}
          {!product.inStock && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-dark-1/80 border border-foreground/20 text-foreground/60 text-[10px] tracking-[0.2em] uppercase font-inter">
              Sold Out
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">
            {product.category}
          </p>
          <h3 className="font-cinzel text-lg text-foreground/90 mb-2 group-hover:text-gold-light transition-colors duration-300">
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="font-inter text-xs text-foreground/40 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
          <p className="font-cinzel text-lg text-gold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 bg-dark-1">
      {/* Atmospheric top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-2/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-inter text-xs tracking-[0.5em] uppercase text-gold/50 mb-4"
          >
            Curated Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
          >
            Featured Pieces
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/shop"
            className="inline-block px-10 py-4 border border-gold/25 hover:border-gold/50 text-gold-light/70 hover:text-gold-light font-inter text-sm tracking-[0.2em] uppercase transition-all duration-300 group"
          >
            View All Pieces
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
