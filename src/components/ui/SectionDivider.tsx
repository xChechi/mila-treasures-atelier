"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-2 overflow-hidden">
      <svg
        viewBox="0 0 1200 80"
        className="w-full h-16 sm:h-20"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left ornamental line */}
        <motion.line
          x1="0" y1="40" x2="480" y2="40"
          stroke="url(#goldGradientLeft)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Left flourish */}
        <motion.path
          d="M480,40 C500,25 520,20 540,30 C530,35 525,40 540,40"
          stroke="#C9A84C"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Center diamond */}
        <motion.path
          d="M590,25 L600,15 L610,25 L600,35 Z"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.7 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ transformOrigin: "600px 25px" }}
        />
        <motion.circle
          cx="600" cy="40" r="2"
          fill="#C9A84C"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.3, delay: 1 }}
        />
        <motion.path
          d="M590,55 L600,65 L610,55 L600,45 Z"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.7 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ transformOrigin: "600px 55px" }}
        />

        {/* Right flourish */}
        <motion.path
          d="M660,40 C675,40 670,35 660,30 C680,20 700,25 720,40"
          stroke="#C9A84C"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Right ornamental line */}
        <motion.line
          x1="720" y1="40" x2="1200" y2="40"
          stroke="url(#goldGradientRight)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldGradientLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="goldGradientRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
