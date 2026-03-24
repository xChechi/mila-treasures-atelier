"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowRight, Tag, X, Gift, Check } from "lucide-react";
import { useCartStore, GIFT_WRAP_PRICE } from "@/store/cart";
import PageHeader from "@/components/ui/PageHeader";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal);
  const discountAmount = useCartStore((s) => s.discount);
  const giftWrapFee = useCartStore((s) => s.giftWrapFee);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const promoCode = useCartStore((s) => s.promoCode);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);
  const giftWrap = useCartStore((s) => s.giftWrap);
  const setGiftWrap = useCartStore((s) => s.setGiftWrap);
  const giftMessage = useCartStore((s) => s.giftMessage);
  const setGiftMessage = useCartStore((s) => s.setGiftMessage);

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoFeedback(result);
    if (result.success) setPromoInput("");
    setTimeout(() => setPromoFeedback(null), 3000);
  };

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

                {/* Promo code */}
                <div className="mb-5">
                  {promoCode ? (
                    <div className="flex items-center justify-between px-3 py-2.5 bg-gold/5 border border-gold/15">
                      <div className="flex items-center gap-2">
                        <Tag size={12} className="text-gold/60" />
                        <span className="font-inter text-xs text-gold-light">{promoCode.code}</span>
                        <span className="font-inter text-[10px] text-foreground/30">— {promoCode.label}</span>
                      </div>
                      <button onClick={removePromoCode} className="text-foreground/20 hover:text-burgundy transition-colors" aria-label="Remove promo code">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                          className="flex-1 px-3 py-2.5 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/70 font-inter text-xs placeholder:text-foreground/20 outline-none transition-colors uppercase tracking-wider"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-4 py-2.5 border border-gold/15 hover:border-gold/30 text-foreground/40 hover:text-foreground/60 font-inter text-xs tracking-wider uppercase transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {promoFeedback && (
                        <p className={`font-inter text-[10px] tracking-wider ${promoFeedback.success ? "text-gold/60" : "text-burgundy/70"}`}>
                          {promoFeedback.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Gift wrapping */}
                <div className="mb-6 p-3 border border-gold/8 bg-dark-3/20">
                  <button
                    onClick={() => setGiftWrap(!giftWrap)}
                    className="flex items-center justify-between w-full group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Gift size={14} className={giftWrap ? "text-gold/60" : "text-foreground/20"} />
                      <span className="font-inter text-xs text-foreground/50 group-hover:text-foreground/70 transition-colors">
                        Gift Wrapping
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-inter text-[10px] text-foreground/25">+${GIFT_WRAP_PRICE.toFixed(2)}</span>
                      <div className={`w-4 h-4 border flex items-center justify-center transition-all ${giftWrap ? "border-gold/50 bg-gold/10" : "border-gold/15"}`}>
                        {giftWrap && <Check size={10} className="text-gold/70" />}
                      </div>
                    </div>
                  </button>
                  {giftWrap && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <textarea
                        placeholder="Add a personal message (optional)"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        maxLength={200}
                        rows={3}
                        className="w-full mt-3 px-3 py-2 bg-dark-3/50 border border-gold/10 focus:border-gold/20 text-foreground/60 font-inter text-xs placeholder:text-foreground/15 outline-none transition-colors resize-none"
                      />
                      <p className="font-inter text-[9px] text-foreground/15 mt-1 text-right">
                        {giftMessage.length}/200
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-inter text-sm">
                    <span className="text-foreground/40">
                      Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                    <span className="text-foreground/60">${subtotal().toFixed(2)}</span>
                  </div>
                  {discountAmount() > 0 && (
                    <div className="flex justify-between font-inter text-sm">
                      <span className="text-gold/50">Discount ({promoCode?.label})</span>
                      <span className="text-gold/60">-${discountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  {giftWrap && (
                    <div className="flex justify-between font-inter text-sm">
                      <span className="text-foreground/40">Gift Wrapping</span>
                      <span className="text-foreground/50">${giftWrapFee().toFixed(2)}</span>
                    </div>
                  )}
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
