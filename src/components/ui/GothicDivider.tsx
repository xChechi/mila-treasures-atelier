"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GothicDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`relative py-4 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="flex items-center justify-center gap-4"
      >
        {/* Left line */}
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent via-gold/20 to-gold/40" />

        {/* Left flourish */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-gold/30">
          <path d="M0 6C4 6 6 2 12 2C6 2 4 10 0 10" stroke="currentColor" strokeWidth="0.5" />
          <path d="M24 6C20 6 18 2 12 2C18 2 20 10 24 10" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Center diamond */}
        <div className="w-2 h-2 rotate-45 bg-gold/30 border border-gold/20" />

        {/* Right flourish */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-gold/30">
          <path d="M0 6C4 6 6 2 12 2C6 2 4 10 0 10" stroke="currentColor" strokeWidth="0.5" />
          <path d="M24 6C20 6 18 2 12 2C18 2 20 10 24 10" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Right line */}
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent via-gold/20 to-gold/40" />
      </motion.div>
    </div>
  );
}
