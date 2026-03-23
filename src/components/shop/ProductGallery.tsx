"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ProductGalleryProps {
  mainImage: string;
  images: string[];
  productName: string;
}

export default function ProductGallery({ mainImage, images, productName }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [mainImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const openLightbox = () => {
    resetZoom();
    setLightboxOpen(true);
  };

  // Keyboard + scroll handlers
  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.5, 4));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.5, 1));
      if (e.key === "0") resetZoom();
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => {
        const next = z + (e.deltaY < 0 ? 0.25 : -0.25);
        const clamped = Math.max(1, Math.min(4, next));
        if (clamped === 1) setPan({ x: 0, y: 0 });
        return clamped;
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    lightboxRef.current?.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, resetZoom]);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handleMouseUp = () => { isDragging.current = false; };

  return (
    <div className="space-y-4">
      {/* Main image with gothic frame */}
      <div className="relative bg-dark-3/50 border border-gold/15 overflow-hidden group cursor-zoom-in" onClick={openLightbox}>
        {/* Frame corners */}
        <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-2 border-l-2 border-gold/40 z-10" />
        <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-2 border-r-2 border-gold/40 z-10" />
        <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-2 border-l-2 border-gold/40 z-10" />
        <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-2 border-r-2 border-gold/40 z-10" />

        <div className="relative aspect-[3/4]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={allImages[activeIndex]}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.3)] pointer-events-none" />

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-dark-1/60 backdrop-blur-sm border border-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <ZoomIn size={12} className="text-gold/60" />
            <span className="font-inter text-[9px] tracking-[0.15em] uppercase text-foreground/40">Click to zoom</span>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 border overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? "border-gold/50 shadow-[0_0_10px_rgba(201,168,76,0.15)]"
                  : "border-gold/10 opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-dark-1/95 backdrop-blur-md flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? (isDragging.current ? "grabbing" : "grab") : "zoom-in" }}
            onClick={(e) => {
              if (e.target === lightboxRef.current && zoom === 1) setLightboxOpen(false);
            }}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.5, 4))}
                className="p-2.5 bg-dark-3/80 border border-gold/15 text-foreground/40 hover:text-foreground/70 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => {
                  setZoom((z) => {
                    const next = Math.max(z - 0.5, 1);
                    if (next === 1) setPan({ x: 0, y: 0 });
                    return next;
                  });
                }}
                className="p-2.5 bg-dark-3/80 border border-gold/15 text-foreground/40 hover:text-foreground/70 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={resetZoom}
                className="p-2.5 bg-dark-3/80 border border-gold/15 text-foreground/40 hover:text-foreground/70 transition-colors"
                aria-label="Reset zoom"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 bg-dark-3/80 border border-gold/15 text-foreground/40 hover:text-foreground/70 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={16} />
              </button>
            </div>

            {/* Zoom level indicator */}
            {zoom > 1 && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-dark-3/80 border border-gold/15">
                <span className="font-inter text-xs text-foreground/40">{Math.round(zoom * 100)}%</span>
              </div>
            )}

            {/* Image */}
            <motion.div
              animate={{ scale: zoom, x: pan.x, y: pan.y }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[80vw] h-[80vh] max-w-4xl pointer-events-none select-none"
            >
              <Image
                src={allImages[activeIndex]}
                alt={productName}
                fill
                className="object-contain"
                sizes="80vw"
                quality={95}
                draggable={false}
              />
            </motion.div>

            {/* Thumbnails at bottom */}
            {allImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveIndex(i); resetZoom(); }}
                    className={`relative w-14 h-14 border overflow-hidden transition-all duration-300 ${
                      i === activeIndex
                        ? "border-gold/50 shadow-[0_0_10px_rgba(201,168,76,0.15)]"
                        : "border-gold/10 opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${productName} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Keyboard hints */}
            <div className="absolute bottom-6 right-4 z-20 flex gap-3">
              <span className="font-inter text-[9px] text-foreground/20 tracking-wider">Scroll to zoom</span>
              <span className="font-inter text-[9px] text-foreground/20 tracking-wider">ESC to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
