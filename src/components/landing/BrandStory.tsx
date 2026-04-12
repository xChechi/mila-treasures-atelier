"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { etsyLink, ETSY_SHOP_URL } from "@/lib/etsy";

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
        <Image
          src="https://images.unsplash.com/photo-1560682350-050f2624e7b3?w=1920&q=80"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
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
              <Image
                src="/images/milena-profile.webp"
                alt="Milena, the artist behind Mila Treasures Atelier"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-top"
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
              Meet the Artist
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.03em] text-foreground/90 mb-8 leading-tight"
            >
              Made by Hand,
              <br />
              <span className="text-shimmer">Made with Soul</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 mb-10"
            >
              <p className="font-inter text-base text-foreground/75 leading-relaxed">
                Hi, I&apos;m Milena — a self-taught artist and maker based in Bulgaria.
                I create one-of-a-kind pieces that live at the intersection of dark
                romanticism and handcraft: jewel-toned fantasy goblets, original
                paintings, ornate trinket boxes, and botanical decor.
              </p>
              <p className="font-inter text-base text-foreground/75 leading-relaxed">
                Every piece I make is completely unique. I don&apos;t mass-produce,
                I don&apos;t use molds. Each goblet is hand-painted differently, each
                portrait is a singular original, each box is lined by hand. When
                something sells, it&apos;s gone forever — that&apos;s the nature of
                real handcraft.
              </p>
              <p className="font-inter text-base text-foreground/75 leading-relaxed">
                My newest series incorporates real crushed herbs into painted
                surfaces — part painting, part botanical object. You can find
                everything in my Etsy shop, shipped worldwide from my atelier in
                Bulgaria.
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
                  10+
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
                  WW
                </span>
                <span className="font-inter text-xs text-foreground/40 tracking-wider uppercase">
                  Ships Worldwide
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <a
                href={etsyLink(ETSY_SHOP_URL, "brand-story")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-3.5 border border-burgundy/50 bg-burgundy/10 hover:bg-burgundy/80 transition-all duration-300"
              >
                <span className="font-inter text-sm tracking-[0.15em] uppercase text-foreground/80 group-hover:text-white transition-colors duration-300">
                  Visit Etsy Shop
                </span>
                <ExternalLink size={14} className="text-gold/40 group-hover:text-white transition-colors duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
