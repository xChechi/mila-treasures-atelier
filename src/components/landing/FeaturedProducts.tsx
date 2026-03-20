"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { ShoppingBag, Eye } from "lucide-react";

const featured = products.filter((p) => p.featured);

function GalleryProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const addItem = useCartStore((s) => s.addItem);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: "easeOut" }}
      className="group perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative"
      >
        {/* Museum spotlight from above */}
        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-32 transition-opacity duration-700 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full h-full bg-gradient-to-b from-amber-200/8 via-amber-100/4 to-transparent blur-md" />
        </div>

        {/* Golden picture frame */}
        <div className="relative bg-dark-3/80 border border-gold/15 group-hover:border-gold/30 transition-all duration-700 shadow-lg group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]">
          {/* Frame corners - ornate */}
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${product.image})`,
                filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(0.85)",
              }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-1/90 via-dark-1/20 to-dark-1/30 group-hover:from-dark-1/70 group-hover:via-transparent group-hover:to-transparent transition-all duration-700" />

            {/* Spotlight cone on hover */}
            <div className={`absolute inset-0 bg-radial-[at_50%_0%] from-amber-200/8 via-transparent to-transparent transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} />

            {/* Quick actions */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className="flex gap-2">
                <button
                  onClick={() => addItem(product)}
                  disabled={!product.inStock}
                  className="flex-1 py-3 bg-burgundy/90 hover:bg-burgundy text-white text-xs tracking-[0.15em] uppercase font-inter flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                >
                  <ShoppingBag size={14} />
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </button>
                <Link
                  href={`/shop/${product.slug}`}
                  className="py-3 px-4 bg-dark-1/80 hover:bg-dark-1 backdrop-blur-sm text-foreground/80 transition-colors flex items-center border border-gold/10"
                >
                  <Eye size={14} />
                </Link>
              </div>
            </div>

            {/* Sold out badge */}
            {!product.inStock && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-dark-1/80 border border-foreground/20 text-foreground/50 text-[10px] tracking-[0.2em] uppercase font-inter backdrop-blur-sm">
                Sold Out
              </div>
            )}
          </div>

          {/* Product info — museum placard style */}
          <div className="p-5 border-t border-gold/10">
            <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-gold/40 mb-2">
              {product.category}
            </p>
            <h3 className="font-cinzel text-base sm:text-lg text-foreground/85 mb-2 group-hover:text-gold-light transition-colors duration-500">
              <Link href={`/shop/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="font-inter text-xs text-foreground/30 mb-3 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between gap-2">
              <p className="font-cinzel text-lg text-gold/80 shrink-0">
                ${product.price.toFixed(2)}
              </p>
              {product.material && (
                <p className="font-inter text-[9px] text-foreground/20 tracking-wider uppercase truncate hidden sm:block">
                  {product.material}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 bg-dark-1">
      {/* Dark wall texture background */}
      <div className="absolute inset-0 gothic-atmosphere opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div ref={sectionRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4"
          >
            Curated Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
          >
            Featured Pieces
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>
        </div>

        {/* Product grid — gallery style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featured.map((product, i) => (
            <GalleryProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <Link
            href="/shop"
            className="inline-block px-10 py-4 border border-gold/20 hover:border-gold/40 text-gold-light/60 hover:text-gold-light font-inter text-sm tracking-[0.2em] uppercase transition-all duration-500 group"
          >
            View All Pieces
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
