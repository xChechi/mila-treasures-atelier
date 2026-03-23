"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import PageHeader from "@/components/ui/PageHeader";
import ProductGrid from "@/components/shop/ProductGrid";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <PageHeader
          title="Your Wishlist"
          subtitle={`${items.length} ${items.length === 1 ? "Piece" : "Pieces"} Saved`}
        />

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <Heart size={48} className="mx-auto text-foreground/10 mb-6" />
            <p className="font-inter text-foreground/30 mb-2">Your wishlist is empty</p>
            <p className="font-inter text-xs text-foreground/20 mb-8">
              Click the heart on any piece to save it for later
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 border border-gold/20 hover:border-gold/40 text-gold-light/60 hover:text-gold-light font-inter text-sm tracking-[0.15em] uppercase transition-all duration-300"
            >
              Browse Collection
            </Link>
          </motion.div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </section>
  );
}
