"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="text-center mb-16">
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1 }}
        className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-foreground/90 mb-6"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="flex items-center justify-center gap-3"
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
      </motion.div>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-inter text-sm text-foreground/40 mt-6 max-w-xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
