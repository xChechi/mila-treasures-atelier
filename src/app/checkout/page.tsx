"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/cart";
import PageHeader from "@/components/ui/PageHeader";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(() =>
    `GT-${Date.now().toString(36).toUpperCase()}`
  );

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {orderPlaced ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 max-w-lg mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={64} className="mx-auto text-gold/60 mb-8" />
              </motion.div>

              <h1 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-4">
                Order Confirmed
              </h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>

              <p className="font-inter text-foreground/40 mb-2">
                Thank you for your order
              </p>
              <p className="font-cinzel text-lg text-gold/70 mb-8">
                {orderNumber}
              </p>

              <p className="font-inter text-xs text-foreground/25 mb-8 leading-relaxed">
                This is a demo order — no payment has been processed.<br />
                In production, you would receive a confirmation email.
              </p>

              <Link
                href="/shop"
                className="inline-block px-10 py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : items.length === 0 && !orderPlaced ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <ShoppingBag size={48} className="mx-auto text-foreground/10 mb-6" />
              <p className="font-inter text-foreground/30 mb-2">Your cart is empty</p>
              <p className="font-inter text-xs text-foreground/20 mb-8">
                Add some pieces to your cart before checking out
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 border border-gold/20 hover:border-gold/40 text-gold-light/60 hover:text-gold-light font-inter text-sm tracking-[0.15em] uppercase transition-all duration-300"
              >
                Browse Collection
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <PageHeader title="Checkout" subtitle="Guest Checkout" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <CheckoutForm onSubmit={handlePlaceOrder} />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-28">
                    <OrderSummary />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
