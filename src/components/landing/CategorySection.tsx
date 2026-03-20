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
      className="perspective-[1200px]"
    >
      <Link
        href={`/category/${category.slug}`}
        className="group relative block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gothic arch door frame */}
        <div className="relative aspect-[3/5] overflow-hidden">
          {/* Stone wall background */}
          <div className="absolute inset-0 bg-dark-3" />

          {/* The door itself with 3D open effect */}
          <motion.div
            animate={{
              rotateY: isHovered ? -25 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {/* Door surface */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#15120d] to-[#0d0b08]">
              {/* Wood grain texture */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(139,69,19,0.1) 15px, rgba(139,69,19,0.1) 16px)",
              }} />

              {/* Iron arch frame on door */}
              <svg viewBox="0 0 200 340" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Gothic pointed arch */}
                <path
                  d="M20,340 L20,140 Q20,40 100,20 Q180,40 180,140 L180,340"
                  stroke="rgba(201,168,76,0.25)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Inner arch */}
                <path
                  d="M35,340 L35,150 Q35,55 100,35 Q165,55 165,150 L165,340"
                  stroke="rgba(201,168,76,0.12)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Door ring/handle */}
                <circle cx="130" cy="200" r="10" stroke="rgba(201,168,76,0.35)" strokeWidth="2" fill="none" />
                <circle cx="130" cy="190" r="3" fill="rgba(201,168,76,0.25)" />
                {/* Iron studs */}
                {[60, 100, 140, 180, 220, 260, 300].map((y) => (
                  <g key={y}>
                    <circle cx="40" cy={y} r="3" fill="rgba(201,168,76,0.15)" />
                    <circle cx="160" cy={y} r="3" fill="rgba(201,168,76,0.15)" />
                  </g>
                ))}
                {/* Cross detail in arch */}
                <line x1="100" y1="50" x2="100" y2="120" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
                <line x1="70" y1="85" x2="130" y2="85" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
              </svg>

              {/* Category name engraved on door */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-12 px-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent mb-4" />
                <h3 className="font-cinzel text-base sm:text-lg font-semibold tracking-[0.1em] text-gold/50 text-center group-hover:text-gold/70 transition-colors duration-500">
                  {category.name}
                </h3>
                <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/20 mt-2">
                  {category.productCount} Pieces
                </p>
              </div>
            </div>
          </motion.div>

          {/* Warm candlelight spilling out from behind the door */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Light spill from left edge (door opens left) */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-amber-600/15 via-amber-500/8 to-transparent" />
            {/* Warm glow behind door */}
            <div className="absolute inset-0 bg-radial-[at_30%_50%] from-amber-700/12 via-transparent to-transparent" />
          </motion.div>

          {/* Peek inside — category image visible when door opens */}
          <motion.div
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 -z-10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${category.image})`, filter: "brightness(0.4) sepia(0.3) saturate(0.7)" }}
            />
            <div className="absolute inset-0 bg-amber-900/30" />
          </motion.div>

          {/* Enter text on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold/60">
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
      {/* Stone wall texture hint */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px), repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.02) 50px, rgba(255,255,255,0.02) 51px)",
      }} />

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
