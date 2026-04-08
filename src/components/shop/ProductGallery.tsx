"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { etsyLink } from "@/lib/etsy";

interface ProductGalleryProps {
  mainImage: string;
  images: string[];
  productName: string;
  etsyUrl: string;
}

export default function ProductGallery({ mainImage, images, productName, etsyUrl }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [mainImage];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image with gothic frame — click goes to Etsy listing */}
      <a href={etsyLink(etsyUrl, "product-gallery")} target="_blank" rel="noopener noreferrer" className="relative bg-dark-3/50 border border-gold/15 overflow-hidden group cursor-pointer block">
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

          {/* Etsy hint on hover */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-dark-1/60 backdrop-blur-sm border border-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <ExternalLink size={12} className="text-gold/60" />
            <span className="font-inter text-[9px] tracking-[0.15em] uppercase text-foreground/40">View on Etsy</span>
          </div>
        </div>
      </a>

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
