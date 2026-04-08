"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Brush, Gem, PackageCheck, ExternalLink } from "lucide-react";
import { ETSY_SHOP_URL, etsyLink } from "@/lib/etsy";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const craftFeatures = [
  {
    icon: Brush,
    title: "All Hand-Painted",
    description:
      "Every piece is painted by hand — no prints, no stencils. Each goblet, portrait, and trinket box is a completely unique original that can never be exactly replicated.",
  },
  {
    icon: Gem,
    title: "Rich Materials",
    description:
      "Jewel-toned metallics, velvet linings, Églomisé glass technique, real crushed botanicals — chosen for depth, beauty, and longevity.",
  },
  {
    icon: PackageCheck,
    title: "One of a Kind",
    description:
      "When a piece sells, it is gone forever. That is the nature of true handcraft. Each item is a singular creation that tells its own story.",
  },
];

export default function AboutPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="relative gothic-bg">
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1560682350-050f2624e7b3?w=1920&q=80')",
              filter: "brightness(0.3) contrast(1.1)",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-1/60 via-transparent to-dark-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-1/40 via-transparent to-dark-1/40" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/50 mb-4"
          >
            The Artist Behind the Atelier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.05em] text-foreground/90"
          >
            Meet Milena
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
                My Story
              </p>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-6">
                Made by Hand, <span className="text-shimmer">Made with Soul</span>
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Portrait */}
            <AnimatedSection delay={0.1}>
              <div className="relative mx-auto max-w-sm lg:max-w-none lg:sticky lg:top-32">
                {/* Frame corners */}
                <div className="absolute -top-[3px] -left-[3px] w-8 h-8 border-t-2 border-l-2 border-gold/40 z-10" />
                <div className="absolute -top-[3px] -right-[3px] w-8 h-8 border-t-2 border-r-2 border-gold/40 z-10" />
                <div className="absolute -bottom-[3px] -left-[3px] w-8 h-8 border-b-2 border-l-2 border-gold/40 z-10" />
                <div className="absolute -bottom-[3px] -right-[3px] w-8 h-8 border-b-2 border-r-2 border-gold/40 z-10" />
                {/* Portrait image */}
                <div className="overflow-hidden border border-gold/15">
                  <div
                    className="w-full aspect-[4/5] bg-cover bg-center bg-top"
                    style={{ backgroundImage: "url('/images/milena-profile.webp')" }}
                  />
                </div>
                {/* Name placard */}
                <div className="mt-4 text-center">
                  <p className="font-cinzel text-sm text-foreground/50 tracking-[0.2em]">Milena</p>
                  <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-gold/35 mt-1">Artist · Bulgaria</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Text */}
            <div className="space-y-6">
              <AnimatedSection delay={0.2}>
                <p className="font-inter text-base text-foreground/50 leading-relaxed">
                  Hi, I&apos;m Milena — a self-taught artist and maker based in Bulgaria. I create
                  one-of-a-kind handmade pieces that sit at the intersection of dark romanticism,
                  fine craft, and personal storytelling. My work spans églomisé mirror art,
                  ornate framed pieces, hand-sculpted trinket boxes, and gothic decor objects.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="font-inter text-base text-foreground/50 leading-relaxed">
                  Everything I make starts with colour and texture. I&apos;m drawn to rich jewel tones —
                  deep crimsons, emerald greens, amethyst purples, midnight blues — layered with
                  metallic golds and aged silvers. Whether I&apos;m painting beneath mirror glass or
                  finishing a sculpted box, I work until the piece has a quality of depth that
                  you only get from human hands and real materials.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <p className="font-inter text-base text-foreground/50 leading-relaxed">
                  My églomisé work uses a rare 18th-century French technique — parts of a
                  mirror&apos;s reflective backing are carefully removed by hand, and an image is
                  embedded beneath the glass surface. The result shifts with the light and the
                  viewer. It cannot be photographed properly. It has to be experienced.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <p className="font-inter text-base text-foreground/50 leading-relaxed">
                  I don&apos;t mass-produce. Every single item in this shop is a complete original —
                  when it sells, it&apos;s gone. I ship everything carefully from my atelier in Bulgaria,
                  worldwide via Etsy.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.6}>
                <div className="pt-4 border-t border-gold/10">
                  <p className="font-playfair text-lg italic text-gold/50">
                    &ldquo;I don&apos;t make products. I create objects that carry a feeling.&rdquo;
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Craft section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
                The Process
              </p>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-6">
                How I Work
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {craftFeatures.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.15}>
                <div className="relative bg-dark-3/30 border border-gold/10 p-8 text-center group hover:border-gold/25 transition-all duration-500">
                  <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-2 border-l-2 border-gold/25 group-hover:border-gold/50 transition-colors duration-500" />
                  <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-2 border-r-2 border-gold/25 group-hover:border-gold/50 transition-colors duration-500" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-2 border-l-2 border-gold/25 group-hover:border-gold/50 transition-colors duration-500" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-2 border-r-2 border-gold/25 group-hover:border-gold/50 transition-colors duration-500" />

                  <feature.icon size={32} className="mx-auto text-gold/40 mb-5" strokeWidth={1.2} />
                  <h3 className="font-cinzel text-lg text-foreground/80 mb-3">{feature.title}</h3>
                  <p className="font-inter text-sm text-foreground/35 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {[
                { value: "10+", label: "Unique Pieces" },
                { value: "BG", label: "Handmade In" },
                { value: "WW", label: "Ships Worldwide" },
                { value: "Etsy", label: "Available On" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center flex items-center gap-8 sm:gap-16">
                  {i > 0 && <div className="w-px h-12 bg-foreground/8 hidden sm:block" />}
                  <div>
                    <span className="block font-cinzel text-3xl text-gold-light">{stat.value}</span>
                    <span className="font-inter text-xs text-foreground/35 tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Etsy CTA */}
      <section className="relative py-24 px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
              Ready to Shop?
            </p>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-semibold text-foreground/90 mb-6">
              Find Everything on Etsy
            </h2>
            <p className="font-inter text-sm text-foreground/40 leading-relaxed mb-8">
              All pieces are available through my Etsy shop — secure checkout, worldwide
              shipping, and each order packed with care from my atelier in Bulgaria.
            </p>
            <a
              href={etsyLink(ETSY_SHOP_URL, "about")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            >
              <ExternalLink size={16} />
              Visit My Etsy Shop
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
