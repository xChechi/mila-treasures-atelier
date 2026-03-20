"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/products";

function GothicDoor({
  category,
  index,
}: {
  category: (typeof categories)[0];
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
        <div className="relative aspect-[3/5] overflow-hidden" style={{ perspective: "1200px" }}>
          {/* Stone wall background behind the door */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#181614] to-[#0e0c0a]">
            {/* Stone texture */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px), repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)",
            }} />
          </div>

          {/* Warm light spilling from behind door when open */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute inset-0 pointer-events-none z-[1]"
          >
            <div className="absolute inset-y-[10%] left-[8%] w-1/2 bg-radial-[at_0%_50%] from-amber-600/20 via-amber-700/8 to-transparent" />
            <div className="absolute inset-0 bg-radial-[at_30%_50%] from-amber-800/10 via-transparent to-transparent" />
          </motion.div>

          {/* Product peek behind door */}
          <motion.div
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="absolute inset-0 z-[2]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${category.image})`, filter: "brightness(0.35) sepia(0.4) saturate(0.6)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 via-transparent to-dark-1/80" />
          </motion.div>

          {/* The door panel — swings inward on hover */}
          <motion.div
            animate={{
              rotateY: isHovered ? -35 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            className="absolute inset-0 z-[5]"
          >
            {/* Door surface with wood grain depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1c1812] via-[#171310] to-[#100e0a] shadow-[inset_-2px_0_8px_rgba(0,0,0,0.5)]">
              {/* Wood grain vertical lines */}
              <div className="absolute inset-0 opacity-[0.08]" style={{
                backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(139,69,19,0.15) 8px, rgba(139,69,19,0.08) 10px, transparent 10px, transparent 20px)",
              }} />
              {/* Wood grain horizontal bands */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,69,19,0.1) 60px, rgba(139,69,19,0.05) 62px)",
              }} />

              {/* Gothic pointed arch frame */}
              <svg viewBox="0 0 200 340" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Outer arch */}
                <path
                  d="M25,335 L25,145 Q25,45 100,22 Q175,45 175,145 L175,335"
                  stroke="rgba(201,168,76,0.2)"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* Inner arch */}
                <path
                  d="M38,335 L38,152 Q38,58 100,38 Q162,58 162,152 L162,335"
                  stroke="rgba(201,168,76,0.1)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Horizontal bands (iron straps) */}
                <line x1="25" y1="120" x2="175" y2="120" stroke="rgba(201,168,76,0.08)" strokeWidth="3" />
                <line x1="25" y1="200" x2="175" y2="200" stroke="rgba(201,168,76,0.08)" strokeWidth="3" />
                <line x1="25" y1="280" x2="175" y2="280" stroke="rgba(201,168,76,0.08)" strokeWidth="3" />

                {/* Iron studs on straps */}
                {[120, 200, 280].map((y) => (
                  <g key={y}>
                    <circle cx="45" cy={y} r="3.5" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />
                    <circle cx="45" cy={y} r="1.5" fill="rgba(201,168,76,0.08)" />
                    <circle cx="155" cy={y} r="3.5" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />
                    <circle cx="155" cy={y} r="1.5" fill="rgba(201,168,76,0.08)" />
                  </g>
                ))}

                {/* Door ring / handle — glows on hover */}
                <circle
                  cx="140" cy="195" r="11"
                  stroke={isHovered ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.2)"}
                  strokeWidth="2"
                  fill="none"
                  style={{ transition: "stroke 0.5s" }}
                />
                <circle cx="140" cy="184" r="3.5" fill={isHovered ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"} style={{ transition: "fill 0.5s" }} />

                {/* Keyhole */}
                <ellipse cx="140" cy="215" rx="3" ry="5" fill={isHovered ? "rgba(232,197,122,0.4)" : "rgba(201,168,76,0.1)"} style={{ transition: "fill 0.6s" }} />

                {/* Cross detail in the arch peak */}
                <line x1="100" y1="50" x2="100" y2="105" stroke="rgba(201,168,76,0.1)" strokeWidth="1.5" />
                <line x1="75" y1="78" x2="125" y2="78" stroke="rgba(201,168,76,0.1)" strokeWidth="1.5" />
              </svg>

              {/* Category name engraved on door */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8 px-4 z-10">
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-3" />
                <h3 className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.1em] text-gold/40 text-center group-hover:text-gold/60 transition-colors duration-500">
                  {category.name}
                </h3>
                <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-foreground/15 mt-2">
                  {category.productCount} Pieces
                </p>
              </div>

              {/* Door edge shadow — gives 3D depth when opening */}
              <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* "Enter" text — fades in after door starts opening */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.3, delay: isHovered ? 0.45 : 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10] pointer-events-none"
          >
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold/50">
              Enter &rarr;
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategorySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 bg-dark-2 overflow-hidden">
      {/* Stone wall texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px), repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.02) 50px, rgba(255,255,255,0.02) 51px)",
      }} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
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

        {/* Gothic doors grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, i) => (
            <GothicDoor key={category.slug} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
