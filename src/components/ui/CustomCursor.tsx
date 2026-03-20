"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("[role='button']") || t.tagName === "INPUT" || t.tagName === "TEXTAREA") {
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
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="relative"
          style={{
            width: hovering ? 30 : 22,
            height: hovering ? 30 : 22,
            transition: "width 0.15s, height 0.15s, transform 0.15s",
            transform: hovering ? "rotate(45deg)" : "none",
          }}
        >
          <div className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-gold/90" />
          <div className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-gold/90" />
        </div>
      </div>
      <style jsx global>{`
        @media (pointer: fine) { * { cursor: none !important; } }
      `}</style>
    </>
  );
}
