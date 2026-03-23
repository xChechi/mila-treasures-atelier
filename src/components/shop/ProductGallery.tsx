"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  mainImage: string;
  images: string[];
  productName: string;
}

export default function ProductGallery({ mainImage, images, productName }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [mainImage];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image with gothic frame */}
      <div className="relative bg-dark-3/50 border border-gold/15 overflow-hidden">
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
    </div>
  );
}
