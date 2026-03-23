"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Product } from "@/data/products";
import ProductGrid from "./ProductGrid";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (products.length === 0) return null;

  return (
    <section ref={ref} className="mt-24 pt-16 border-t border-gold/10">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4"
        >
          You May Also Like
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-cinzel text-2xl sm:text-3xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
        >
          Related Pieces
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>
      </div>
      <ProductGrid products={products} columns={4} />
    </section>
  );
}
