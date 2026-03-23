"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { ShoppingBag, Eye, Check, Heart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { getAverageRating, getReviewCount } from "@/data/reviews";
import { useCurrencyStore, formatPrice } from "@/store/currency";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const isInCart = cartItems.some((i) => i.product.id === product.id);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const wishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const currency = useCurrencyStore((s) => s.currency);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: "easeOut" }}
      className="group perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative"
      >
        {/* Museum spotlight from above */}
        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-32 transition-opacity duration-700 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full h-full bg-gradient-to-b from-amber-200/8 via-amber-100/4 to-transparent blur-md" />
        </div>

        {/* Golden picture frame */}
        <div className="relative bg-dark-3/80 border border-gold/15 group-hover:border-gold/30 transition-all duration-700 shadow-lg group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]">
          {/* Frame corners */}
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/70 transition-colors duration-500" />

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${product.image})`,
                filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(0.85)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-1/90 via-dark-1/20 to-dark-1/30 group-hover:from-dark-1/70 group-hover:via-transparent group-hover:to-transparent transition-all duration-700" />

            {/* Spotlight cone on hover */}
            <div className={`absolute inset-0 bg-radial-[at_50%_0%] from-amber-200/8 via-transparent to-transparent transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`} />

            {/* Wishlist heart */}
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute top-4 left-4 z-10 p-2 transition-all duration-300"
            >
              <Heart
                size={18}
                className={wishlisted ? "fill-burgundy text-burgundy" : "text-foreground/30 hover:text-foreground/60"}
                strokeWidth={1.5}
              />
            </button>

            {/* CLAIMED overlay for sold items */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-dark-1/70 flex items-center justify-center z-[5]">
                <div className="rotate-[-15deg] border-2 border-burgundy/60 px-6 py-2">
                  <span className="font-cinzel text-2xl sm:text-3xl tracking-[0.2em] uppercase text-burgundy/80">
                    Claimed
                  </span>
                </div>
              </div>
            )}

            {/* Quick actions */}
            {product.inStock && (
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex gap-2">
                  {isInCart ? (
                    <div className="flex-1 py-3 bg-dark-3/90 text-gold-light text-xs tracking-[0.15em] uppercase font-inter flex items-center justify-center gap-2 backdrop-blur-sm border border-gold/20">
                      <Check size={14} />
                      In Your Cart
                    </div>
                  ) : (
                    <button
                      onClick={() => addItem(product)}
                      className="flex-1 py-3 bg-burgundy/90 hover:bg-burgundy text-white text-xs tracking-[0.15em] uppercase font-inter flex items-center justify-center gap-2 transition-colors backdrop-blur-sm"
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                  )}
                  <Link
                    href={`/shop/${product.slug}`}
                    className="py-3 px-4 bg-dark-1/80 hover:bg-dark-1 backdrop-blur-sm text-foreground/80 transition-colors flex items-center border border-gold/10"
                  >
                    <Eye size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="p-5 border-t border-gold/10">
            <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-gold/40 mb-2">
              {product.category}
            </p>
            <h3 className="font-cinzel text-base sm:text-lg text-foreground/85 mb-2 group-hover:text-gold-light transition-colors duration-500">
              <Link href={`/shop/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="font-inter text-xs text-foreground/30 mb-3 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
            {/* Star rating */}
            {(() => {
              const avg = getAverageRating(product.id);
              const count = getReviewCount(product.id);
              if (count === 0) return null;
              return (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < Math.round(avg)
                            ? "text-gold/60 fill-gold/60"
                            : "text-foreground/15"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-inter text-[10px] text-foreground/25">
                    ({count})
                  </span>
                </div>
              );
            })()}
            <div className="flex items-center justify-between gap-2">
              <p className={`font-cinzel text-lg shrink-0 ${product.inStock ? "text-gold/80" : "text-foreground/30 line-through"}`}>
                {formatPrice(product.price, currency)}
              </p>
              {product.material && (
                <p className="font-inter text-[9px] text-foreground/20 tracking-wider uppercase truncate hidden sm:block">
                  {product.material}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
