"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Hammer, Gem, PackageCheck, Shield, Truck, RotateCcw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

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
    icon: Hammer,
    title: "Handcrafted",
    description:
      "Every piece is shaped by hand using traditional techniques passed down through generations of Bulgarian artisans.",
  },
  {
    icon: Gem,
    title: "Unique Materials",
    description:
      "We work with hand-forged iron, stone composite, dark mahogany, and wrought metal — chosen for authenticity and longevity.",
  },
  {
    icon: PackageCheck,
    title: "One of a Kind",
    description:
      "No molds, no mass production. Each item is a singular creation — when it sells, it's gone forever.",
  },
];

const shippingInfo = [
  {
    icon: Truck,
    title: "Shipping",
    items: [
      "All orders ship from Bulgaria to the USA",
      "Standard delivery: 10–18 business days",
      "Express delivery: 5–8 business days",
      "All items carefully wrapped for transit",
      "Tracking number provided via email",
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns",
    items: [
      "14-day return window from delivery date",
      "Items must be unused and in original packaging",
      "Return shipping is the buyer's responsibility",
      "Refund processed within 5 business days",
      "Damaged-in-transit claims covered fully",
    ],
  },
  {
    icon: Shield,
    title: "Guarantee",
    items: [
      "Every piece inspected before shipping",
      "Photos of your exact item sent before dispatch",
      "Quality guarantee against manufacturing defects",
      "Responsive customer support via email",
      "Secure packaging with insurance included",
    ],
  },
];

export default function AboutPage() {
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
            Est. 2024 — Bulgaria
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.05em] text-foreground/90"
          >
            Our Story
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

      {/* Origin Story */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
                The Beginning
              </p>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-6">
                Every Piece <span className="text-shimmer">Tells a Story</span>
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <p className="font-inter text-base text-foreground/50 leading-relaxed">
                Born in the heart of Bulgaria, Gothic Treasures began as a passion for preserving
                the dark artistry of European gothic craft. Our founder grew up surrounded by the
                ancient churches and medieval architecture of the Balkans — places where stone
                gargoyles still guard cathedral walls and wrought iron candelabras light monastery
                corridors.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="font-inter text-base text-foreground/50 leading-relaxed">
                Each piece in our collection is handmade by skilled artisans who draw
                inspiration from medieval cathedrals, ancient monasteries, and the haunting
                beauty of Gothic architecture. We believe that home decor should evoke
                emotion — our wall crosses, gargoyles, mirrors, and candle holders are not
                mere decorations but conversation pieces, each carrying centuries of artistic
                tradition into your modern home.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="font-inter text-base text-foreground/50 leading-relaxed">
                What sets us apart is our commitment to uniqueness. There are no molds, no
                assembly lines. Every item is a singular creation, shaped by human hands and
                imbued with character that only handcraft can achieve. When a piece sells,
                it&apos;s gone forever — that&apos;s the nature of true artisanal work.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="font-playfair text-lg italic text-gold/50 text-center mt-10">
                &ldquo;We don&apos;t make products. We create heirlooms.&rdquo;
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Craft */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
                The Process
              </p>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-6">
                Our Craft
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
                  {/* Frame corners */}
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
                { value: "100+", label: "Unique Pieces" },
                { value: "BG", label: "Handmade In" },
                { value: "USA", label: "Ships To" },
                { value: "2024", label: "Established" },
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

      {/* Shipping & Returns */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
                Good to Know
              </p>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-6">
                Shipping & Returns
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {shippingInfo.map((section, i) => (
              <AnimatedSection key={section.title} delay={i * 0.15}>
                <div className="relative bg-dark-3/20 border border-gold/8 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <section.icon size={20} className="text-gold/40" strokeWidth={1.5} />
                    <h3 className="font-cinzel text-base text-foreground/75">{section.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold/25 mt-2 shrink-0" />
                        <span className="font-inter text-sm text-foreground/35 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
