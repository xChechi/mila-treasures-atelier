"use client";

import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import Link from "next/link";
import { Clock } from "lucide-react";

interface RecentlyViewedProps {
  excludeId?: string;
}

export default function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const items = useRecentlyViewedStore((s) => s.items);
  const filtered = excludeId ? items.filter((i) => i.id !== excludeId) : items;

  if (filtered.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-gold/8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Clock size={16} className="text-gold/40" />
        <h2 className="font-cinzel text-lg sm:text-xl text-foreground/60 tracking-wider">
          Recently Viewed
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/15 to-transparent" />
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group flex-shrink-0 w-40 sm:w-48"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden border border-gold/10 group-hover:border-gold/25 transition-all duration-500 mb-3">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${product.image})`,
                  filter: "brightness(0.8)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-1/70 via-transparent to-dark-1/20" />

              {!product.inStock && (
                <div className="absolute inset-0 bg-dark-1/60 flex items-center justify-center">
                  <span className="font-cinzel text-xs tracking-[0.15em] uppercase text-burgundy/70">
                    Claimed
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <p className="font-cinzel text-xs sm:text-sm text-foreground/60 group-hover:text-gold-light transition-colors duration-300 line-clamp-1 mb-1">
              {product.name}
            </p>
            <p className={`font-cinzel text-xs ${product.inStock ? "text-gold/60" : "text-foreground/25 line-through"}`}>
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
