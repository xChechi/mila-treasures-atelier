"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-2 border-l border-gold/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <h2 className="font-cinzel text-lg tracking-[0.15em] text-gold-light">
                Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag
                    size={48}
                    className="text-foreground/20 mb-4"
                    strokeWidth={1}
                  />
                  <p className="font-inter text-foreground/40 mb-2">
                    Your cart is empty
                  </p>
                  <p className="font-inter text-sm text-foreground/25">
                    Discover our handcrafted gothic treasures
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 p-3 bg-dark-3/50 rounded border border-foreground/5"
                    >
                      <div
                        className="w-20 h-20 rounded bg-cover bg-center flex-shrink-0"
                        style={{
                          backgroundImage: `url(${item.product.image})`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-cinzel text-sm text-foreground/90 truncate">
                          {item.product.name}
                        </h3>
                        <p className="font-inter text-xs text-foreground/40 mt-1">
                          {item.product.category}
                        </p>
                        <p className="font-inter text-sm text-gold mt-2">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-foreground/30 hover:text-burgundy transition-colors self-start"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-foreground/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-inter text-sm text-foreground/60">
                    Total
                  </span>
                  <span className="font-cinzel text-xl text-gold-light">
                    ${totalPrice().toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-3 bg-burgundy hover:bg-burgundy-light text-white text-center font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
