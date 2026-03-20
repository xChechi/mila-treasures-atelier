"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

function FloatingEmbers() {
  const embers = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 15,
    size: 1 + Math.random() * 3,
    opacity: 0.15 + Math.random() * 0.4,
    drift: (Math.random() - 0.5) * 60,
    color: Math.random() > 0.6 ? "rgba(232, 197, 122, VAR)" : "rgba(201, 168, 76, VAR)",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color.replace("VAR", String(p.opacity)),
            boxShadow: `0 0 ${p.size * 3}px ${p.color.replace("VAR", String(p.opacity * 0.5))}`,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-dark-1"
    >
      {/* Background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('/images/cathedral-in-moonlight-stockcake.webp')",
            filter: "grayscale(0.7) sepia(0.4) brightness(0.85) contrast(1.1)",
          }}
        />
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-1/90" />
        {/* Thin top edge fade for navbar blend */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-1/40 to-transparent" />
      </motion.div>

      {/* Floating embers */}
      <FloatingEmbers />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.4)] pointer-events-none" />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 [text-shadow:_0_2px_20px_rgba(0,0,0,0.8),_0_4px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Small intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-inter text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold/50 mb-8"
        >
          Handcrafted Dark Elegance
        </motion.p>

        {/* Main title — letter by letter reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-[0.08em] leading-[0.9]"
          >
            <span className="text-shimmer inline-block">Gothic</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light tracking-[0.15em] text-foreground/80"
          >
            Treasures
          </motion.h1>
        </div>

        {/* Gothic ornamental divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={loaded ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="my-8 flex items-center gap-4"
        >
          <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold/40">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" fill="currentColor" />
          </svg>
          <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="font-playfair text-lg sm:text-xl text-foreground/50 italic max-w-xl mb-12"
        >
          Where darkness meets artistry. Unique wall decor pieces forged in the
          shadows of European workshops.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/shop"
            className="group relative px-10 py-4 overflow-hidden border border-burgundy/60"
          >
            <span className="relative z-10 font-inter text-sm tracking-[0.2em] uppercase text-white group-hover:text-white transition-colors">
              Explore Collection
            </span>
            <div className="absolute inset-0 bg-burgundy/80 group-hover:bg-burgundy transition-colors duration-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
          </Link>
          <Link
            href="/about"
            className="group px-10 py-4 border border-gold/20 hover:border-gold/50 transition-all duration-500"
          >
            <span className="font-inter text-sm tracking-[0.2em] uppercase text-gold-light/60 group-hover:text-gold-light transition-colors duration-300">
              Our Story
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fog transition */}
      <motion.div
        style={{ opacity: fogOpacity }}
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-1 via-dark-1/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-1 to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/25">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-gold/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
