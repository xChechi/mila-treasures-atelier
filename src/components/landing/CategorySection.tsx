"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${category.image})` }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-dark-1/60 group-hover:bg-dark-1/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-1 via-transparent to-transparent" />

        {/* Border glow on hover */}
        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-gold/50 mb-3">
            {category.productCount} Pieces
          </p>
          <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-foreground/90 group-hover:text-gold-light transition-colors duration-300 mb-2">
            {category.name}
          </h3>
          <p className="font-inter text-sm text-foreground/40 mb-4 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-gold/60 group-hover:text-gold transition-colors duration-300">
            <span className="font-inter text-xs tracking-[0.2em] uppercase">
              Explore
            </span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Top corner ornament */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gold/30"
          >
            <path
              d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategorySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 bg-dark-2">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="font-inter text-xs tracking-[0.5em] uppercase text-gold/50 mb-4"
          >
            Browse by Category
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
          >
            Our Collections
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

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
