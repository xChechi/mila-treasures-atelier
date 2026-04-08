"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/products";

function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
        <circle cx="20" cy="20" r="18" fill="#6b1020" />
        <circle cx="20" cy="20" r="16" fill="#8B0000" />
        <circle cx="20" cy="20" r="12" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
        {/* GT initials */}
        <text x="20" y="24" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="10" fontFamily="Cinzel, serif" fontWeight="bold">
          MA
        </text>
        {/* Decorative dots around edge */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 20 + 15 * Math.cos(angle);
          const cy = 20 + 15 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="0.8" fill="rgba(201,168,76,0.2)" />;
        })}
      </svg>
    </div>
  );
}

function ParchmentCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative"
    >
      {/* Parchment background */}
      <div className="relative bg-gradient-to-br from-[#1e1a14] via-[#1a1610] to-[#16130e] border border-[#2a2418]/60 p-8 sm:p-10">
        {/* Aged paper texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

        {/* Burnt/worn edges effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]" />

        {/* Wax seal */}
        <WaxSeal className="absolute -top-4 -right-2 sm:-right-4 z-10" />

        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={13} className="text-gold/60 fill-gold/60" />
          ))}
        </div>

        {/* Quote — handwriting style */}
        <p className="font-playfair text-sm sm:text-base text-[#c4b896]/60 leading-relaxed mb-8 italic">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Divider — ink line */}
        <div className="w-12 h-px bg-gradient-to-r from-[#c4b896]/20 to-transparent mb-4" />

        {/* Author */}
        <p className="font-cinzel text-sm text-[#c4b896]/70">
          {testimonial.name}
        </p>
        <p className="font-inter text-[11px] text-[#c4b896]/30 mt-1">
          {testimonial.location} &middot;{" "}
          <span className="text-gold/30">{testimonial.product}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 bg-dark-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4"
          >
            Words from the Shadows
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
          >
            Collector&apos;s Testimonies
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

        {/* Testimonials — parchment scrolls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <ParchmentCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
