"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 12,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold/30"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function CandleFlame({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="candle-glow">
        <div className="w-1 h-8 bg-gradient-to-t from-amber-800 via-amber-600 to-amber-400 rounded-full mx-auto" />
        <div className="w-3 h-6 bg-gradient-to-t from-amber-600/0 via-amber-500/40 to-amber-300/80 rounded-full mx-auto -mt-4 blur-[2px]" />
        <div className="w-8 h-8 bg-amber-500/10 rounded-full mx-auto -mt-6 blur-xl" />
        <div className="w-16 h-16 bg-amber-500/5 rounded-full mx-auto -mt-12 blur-2xl" />
      </div>
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
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-dark-1"
    >
      {/* Background layers */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        {/* Cathedral background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-1/70 via-dark-1/50 to-dark-1" />
        {/* Burgundy tint */}
        <div className="absolute inset-0 bg-burgundy/10 mix-blend-multiply" />
      </motion.div>

      {/* Fog layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="fog-layer absolute bottom-0 left-0 right-0 h-64 opacity-30"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.9), transparent)",
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Candle flames on sides */}
      <div className="absolute bottom-24 left-[10%] hidden lg:block">
        <CandleFlame />
      </div>
      <div className="absolute bottom-24 right-[10%] hidden lg:block">
        <CandleFlame />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Small intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-inter text-xs tracking-[0.5em] uppercase text-gold/60 mb-8"
        >
          Handcrafted Dark Elegance
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] leading-tight"
        >
          <span className="text-shimmer">Gothic</span>
          <br />
          <span className="text-foreground/90 font-light">Treasures</span>
        </motion.h1>

        {/* Gothic ornamental divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={loaded ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.3 }}
          className="my-8 flex items-center gap-4"
        >
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gold/50"
          >
            <path
              d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z"
              fill="currentColor"
            />
          </svg>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-playfair text-lg sm:text-xl text-foreground/60 italic max-w-xl mb-12"
        >
          Where darkness meets artistry. Unique wall decor pieces forged in the
          shadows of European workshops.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/shop"
            className="group relative px-10 py-4 bg-burgundy/90 hover:bg-burgundy text-white font-inter text-sm tracking-[0.2em] uppercase transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-burgundy-light to-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <Link
            href="/about"
            className="px-10 py-4 border border-gold/30 hover:border-gold/60 text-gold-light/80 hover:text-gold-light font-inter text-sm tracking-[0.2em] uppercase transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
