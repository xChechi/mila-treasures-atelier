"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      // Direct transform — no spring/delay
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
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
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Main cursor — small golden cross */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className="relative transition-transform duration-150"
          style={{
            width: hovering ? 14 : 10,
            height: hovering ? 14 : 10,
            transform: hovering ? "rotate(45deg)" : "none",
          }}
        >
          <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-gold-light" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold-light" />
        </div>
      </div>

      {/* Subtle glow — small, tight */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: hovering ? 32 : 20,
            height: hovering ? 32 : 20,
            marginLeft: hovering ? -16 : -10,
            marginTop: hovering ? -16 : -10,
            background: `radial-gradient(circle, rgba(201,168,76,${hovering ? 0.12 : 0.06}) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
