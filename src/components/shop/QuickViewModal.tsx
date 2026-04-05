"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ExternalLink, Star, Package, Ruler } from "lucide-react";
import type { Product, ProductBadge } from "@/data/products";
import { getAverageRating, getReviewCount } from "@/data/reviews";

const BADGE_CONFIG: Record<ProductBadge, { label: string; bg: string; text: string }> = {
  new: { label: "New", bg: "bg-gold/90", text: "text-dark-1" },
  bestseller: { label: "Bestseller", bg: "bg-burgundy/90", text: "text-white" },
  limited: { label: "Limited Edition", bg: "bg-gold/20 border border-gold/40", text: "text-gold-light" },
  "last-one": { label: "Last One", bg: "bg-burgundy/80", text: "text-white" },
};

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const avgRating = product ? getAverageRating(product.id) : 0;
  const reviewCount = product ? getReviewCount(product.id) : 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <div className="absolute inset-0 bg-dark-1/85 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-dark-2 border border-gold/15 shadow-2xl"
          >
            <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-2 border-l-2 border-gold/40 z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-2 border-r-2 border-gold/40 z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-2 border-l-2 border-gold/40 z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-2 border-r-2 border-gold/40 z-10" />

            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-20 p-2 text-foreground/30 hover:text-foreground/70 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    filter: "brightness(0.9)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-1/60 via-transparent to-dark-1/20" />

                {!product.inStock && (
                  <div className="absolute inset-0 bg-dark-1/70 flex items-center justify-center">
                    <div className="rotate-[-15deg] border-2 border-burgundy/60 px-6 py-2">
                      <span className="font-cinzel text-2xl tracking-[0.2em] uppercase text-burgundy/80">
                        Claimed
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-6 sm:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-inter text-[9px] tracking-[0.5em] uppercase text-gold/40">
                    {product.category}
                  </p>
                  {product.badge && product.inStock && (
                    <span className={`inline-block px-2 py-0.5 font-inter text-[8px] tracking-[0.1em] uppercase ${BADGE_CONFIG[product.badge].bg} ${BADGE_CONFIG[product.badge].text}`}>
                      {BADGE_CONFIG[product.badge].label}
                    </span>
                  )}
                </div>

                <h2 className="font-cinzel text-xl sm:text-2xl font-semibold text-foreground/90 mb-3 tracking-wide">
                  {product.name}
                </h2>

                <p className="font-cinzel text-xl text-gold mb-2">
                  ${product.price.toFixed(2)}
                </p>

                {reviewCount > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.round(avgRating) ? "text-gold/60 fill-gold/60" : "text-foreground/15"}
                        />
                      ))}
                    </div>
                    <span className="font-inter text-[10px] text-foreground/30">
                      {avgRating.toFixed(1)} ({reviewCount})
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
                  <div className="w-1 h-1 rotate-45 bg-gold/30" />
                  <div className="flex-1 h-px bg-gradient-to-l from-gold/20 to-transparent" />
                </div>

                <p className="font-inter text-sm text-foreground/50 leading-relaxed mb-5 line-clamp-4">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6">
                  {product.material && (
                    <div className="flex items-center gap-3">
                      <Package size={13} className="text-gold/40" />
                      <span className="font-inter text-[10px] text-foreground/30 tracking-wider uppercase w-20">Material</span>
                      <span className="font-inter text-xs text-foreground/60">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center gap-3">
                      <Ruler size={13} className="text-gold/40" />
                      <span className="font-inter text-[10px] text-foreground/30 tracking-wider uppercase w-20">Size</span>
                      <span className="font-inter text-xs text-foreground/60">{product.dimensions}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto space-y-3">
                  {!product.inStock ? (
                    <button
                      disabled
                      className="w-full py-3 bg-dark-3/50 border border-foreground/10 text-foreground/30 font-inter text-xs tracking-[0.15em] uppercase cursor-not-allowed"
                    >
                      Sold Out — Claimed
                    </button>
                  ) : (
                    <a
                      href={product.etsyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="w-full py-3 bg-burgundy hover:bg-burgundy-light text-white font-inter text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Buy on Etsy
                    </a>
                  )}

                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="block text-center py-2 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-gold-light transition-colors"
                  >
                    View Full Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
