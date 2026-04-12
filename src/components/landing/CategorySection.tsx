"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";

// Real gothic door photos from Unsplash (verified)
const doorImages = [
  "https://images.unsplash.com/photo-1683538503472-62b01680f11a?w=600&q=80", // pointed arch wooden door with studs
  "https://images.unsplash.com/photo-1749131826389-723f6f83af9a?w=600&q=80", // aged ornate iron-studded door
  "https://images.unsplash.com/photo-1632046890795-10091ef84679?w=600&q=80", // gothic stone arch entrance
  "https://images.unsplash.com/photo-1678313695469-c24aad90386e?w=600&q=80", // gothic church door with pointed arch
];

function GothicDoorCard({
  category,
  doorImage,
  index,
}: {
  category: (typeof categories)[0];
  doorImage: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group relative block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/5] overflow-hidden">
          {/* Door photograph — clearly visible by default */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              filter: isHovered
                ? "brightness(1.15) contrast(1.1) saturate(1.05)"
                : "brightness(0.75) contrast(1.05) saturate(0.9)",
            }}
          >
            <Image
              src={doorImage}
              alt={category.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center"
            />
          </div>

          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_10px_rgba(0,0,0,0.4)]" />

          {/* Bottom gradient for text readability only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Golden light glow from door cracks on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Glow around the door edges */}
            <div className="absolute inset-[15%] rounded-sm shadow-[0_0_40px_8px_rgba(201,168,76,0.12),0_0_80px_20px_rgba(201,168,76,0.06)]" />
            {/* Warm light from within */}
            <div className="absolute inset-0 bg-radial-[at_50%_40%] from-amber-700/10 via-transparent to-transparent" />
          </motion.div>

          {/* Ornate gold corner accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />

          {/* Category name and count — bottom overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
            <div className="w-8 h-px bg-gradient-to-r from-gold/30 to-transparent mb-3 group-hover:w-12 transition-all duration-500" />
            <h3 className="font-cinzel text-base sm:text-lg font-semibold tracking-[0.08em] text-foreground/80 group-hover:text-gold-light transition-colors duration-500">
              {category.name}
            </h3>
            <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/25 mt-1.5 group-hover:text-foreground/40 transition-colors duration-500">
              {category.productCount} Pieces
            </p>

            {/* ENTER text — fades in on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
              transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
              className="mt-4"
            >
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold/50 group-hover:text-gold/70 transition-colors">
                Enter &rarr;
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategorySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 30%, #1a1816 0%, #111010 40%, #0a0a0a 100%)" }}>
      {/* Gothic stone wall texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(201,168,76,0.03) 30px, rgba(201,168,76,0.02) 31px), repeating-linear-gradient(0deg, transparent, transparent 25px, rgba(201,168,76,0.02) 25px, rgba(201,168,76,0.015) 26px)",
      }} />
      {/* Damask-like subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0L48 16L64 16L52 28L56 44L40 36L24 44L28 28L16 16L32 16Z' fill='%23C9A84C' opacity='0.3'/%3E%3C/svg%3E\")",
        backgroundSize: "80px 80px",
      }} />
      {/* Vignette for depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_60px_rgba(0,0,0,0.5)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4"
          >
            Choose Your Path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
          >
            The Chambers
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>
        </div>

        {/* Gothic door cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {categories.map((category, i) => (
            <GothicDoorCard
              key={category.slug}
              category={category}
              doorImage={doorImages[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
