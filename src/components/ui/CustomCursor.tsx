"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [x, y, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Main cursor - golden cross */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      >
        {/* Cross shape */}
        <motion.div
          animate={{
            scale: hovering ? 1.8 : 1,
            rotate: hovering ? 45 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="relative w-5 h-5"
        >
          <div className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-gold-light" />
          <div className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-gold-light" />
        </motion.div>
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <motion.div
          animate={{
            scale: hovering ? 2.5 : 1,
            opacity: hovering ? 0.15 : 0.08,
          }}
          transition={{ duration: 0.4 }}
          className="w-20 h-20 rounded-full bg-gold/20 blur-xl"
        />
      </motion.div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
