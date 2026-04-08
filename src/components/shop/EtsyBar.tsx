"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { etsyLink } from "@/lib/etsy";

interface EtsyBarProps {
  productName: string;
  price: number;
  etsyUrl: string;
  inStock: boolean;
  averageRating: number;
  reviewCount: number;
}

export default function EtsyBar({
  productName,
  price,
  etsyUrl,
  inStock,
  averageRating,
  reviewCount,
}: EtsyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!inStock) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-dark-2/95 backdrop-blur-md border-t border-gold/15 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="hidden sm:block min-w-0">
              <p className="font-cinzel text-sm text-foreground/80 truncate">
                {productName}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-cinzel text-base text-gold">
                  ${price.toFixed(2)}
                </span>
                {reviewCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-gold/60 fill-gold/60" />
                    <span className="font-inter text-[10px] text-foreground/30">
                      {averageRating.toFixed(1)} ({reviewCount})
                    </span>
                  </span>
                )}
              </div>
            </div>

            <a
              href={etsyLink(etsyUrl, "sticky-bar")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-burgundy hover:bg-burgundy-light text-white font-inter text-xs tracking-[0.15em] uppercase transition-colors duration-300 shrink-0"
            >
              <ExternalLink size={14} />
              Buy on Etsy
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
