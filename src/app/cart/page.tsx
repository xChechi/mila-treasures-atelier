"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import PageHeader from "@/components/ui/PageHeader";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice);

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <PageHeader title="Your Cart" />

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <ShoppingBag size={48} className="mx-auto text-foreground/10 mb-6" />
            <p className="font-inter text-foreground/30 mb-2">Your cart is empty</p>
            <p className="font-inter text-xs text-foreground/20 mb-8">
              Discover unique handcrafted pieces in our collection
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 border border-gold/20 hover:border-gold/40 text-gold-light/60 hover:text-gold-light font-inter text-sm tracking-[0.15em] uppercase transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-1">
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-6 pb-4 border-b border-gold/10 font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/20">
                <span>Product</span>
                <span className="w-24 text-right">Price</span>
                <span className="w-10" />
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 sm:gap-6 py-6 border-b border-gold/5"
                  >
                    {/* Image */}
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="relative w-20 h-24 sm:w-24 sm:h-32 shrink-0 border border-gold/10 overflow-hidden group"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-gold/40 mb-1">
                        {item.product.category}
                      </p>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-cinzel text-sm sm:text-base text-foreground/80 hover:text-gold-light transition-colors duration-300 line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.material && (
                        <p className="font-inter text-xs text-foreground/20 mt-1 hidden sm:block">
                          {item.product.material}
                        </p>
                      )}
                      {/* Mobile price */}
                      <p className="font-cinzel text-sm text-gold/70 mt-2 sm:hidden">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Desktop price */}
                    <p className="font-cinzel text-base text-gold/70 w-24 text-right hidden sm:block">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-foreground/20 hover:text-burgundy transition-colors duration-300"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-dark-3/30 border border-gold/10 p-6 sticky top-28"
              >
                {/* Frame corners */}
                <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-gold/30" />
                <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-gold/30" />
                <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-gold/30" />
                <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-gold/30" />

                <h2 className="font-cinzel text-lg text-foreground/80 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-inter text-sm">
                    <span className="text-foreground/40">
                      Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                    <span className="text-foreground/60">${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-inter text-sm">
                    <span className="text-foreground/40">Shipping</span>
                    <span className="text-foreground/40 text-xs italic">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gold/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-cinzel text-base text-foreground/80">Total</span>
                    <span className="font-cinzel text-xl text-gold">${totalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/shop"
                  className="block text-center mt-4 font-inter text-xs text-foreground/30 hover:text-gold-light/60 tracking-wider uppercase transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
