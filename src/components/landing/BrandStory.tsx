"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-dark-1/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-1 via-transparent to-dark-1" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80')",
                }}
              />
              {/* Frame effect */}
              <div className="absolute inset-0 border border-gold/20" />
              <div className="absolute -inset-3 border border-gold/10" />

              {/* Corner ornaments */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold/30" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-gold/30" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-gold/30" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold/30" />
            </div>
          </motion.div>

          {/* Right - Text */}
          <div ref={contentRef}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-inter text-xs tracking-[0.5em] uppercase text-gold/50 mb-6"
            >
              Our Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.03em] text-foreground/90 mb-8 leading-tight"
            >
              Every Piece
              <br />
              <span className="text-shimmer">Tells a Story</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 mb-10"
            >
              <p className="font-inter text-base text-foreground/50 leading-relaxed">
                Born in the heart of Bulgaria, Gothic Treasures began as a
                passion for preserving the dark artistry of European gothic
                craft. Each piece in our collection is handmade by skilled
                artisans who draw inspiration from medieval cathedrals, ancient
                monasteries, and the haunting beauty of Gothic architecture.
              </p>
              <p className="font-inter text-base text-foreground/50 leading-relaxed">
                We believe that home decor should evoke emotion. Our wall
                crosses, gargoyles, mirrors, and candle holders are not mere
                decorations — they are conversation pieces, each carrying
                centuries of artistic tradition into your modern home.
              </p>
              <p className="font-inter text-base text-foreground/50 leading-relaxed">
                Every item is unique. When it&apos;s gone, it&apos;s gone
                forever. That&apos;s the nature of handcrafted art — no two
                pieces are ever truly the same.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-8"
            >
              <div className="text-center">
                <span className="block font-cinzel text-3xl text-gold-light">
                  100+
                </span>
                <span className="font-inter text-xs text-foreground/40 tracking-wider uppercase">
                  Unique Pieces
                </span>
              </div>
              <div className="w-px h-12 bg-foreground/10" />
              <div className="text-center">
                <span className="block font-cinzel text-3xl text-gold-light">
                  BG
                </span>
                <span className="font-inter text-xs text-foreground/40 tracking-wider uppercase">
                  Handmade In
                </span>
              </div>
              <div className="w-px h-12 bg-foreground/10" />
              <div className="text-center">
                <span className="block font-cinzel text-3xl text-gold-light">
                  USA
                </span>
                <span className="font-inter text-xs text-foreground/40 tracking-wider uppercase">
                  Ships To
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
