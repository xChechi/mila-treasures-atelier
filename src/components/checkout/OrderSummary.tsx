"use client";

import Image from "next/image";
import { Tag, Gift } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const discountAmount = useCartStore((s) => s.discount);
  const giftWrapFee = useCartStore((s) => s.giftWrapFee);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const promoCode = useCartStore((s) => s.promoCode);
  const giftWrap = useCartStore((s) => s.giftWrap);
  const giftMessage = useCartStore((s) => s.giftMessage);

  return (
    <div className="bg-dark-3/30 border border-gold/10 p-6 relative">
      {/* Frame corners */}
      <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-gold/30" />
      <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-gold/30" />
      <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-gold/30" />
      <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-gold/30" />

      <h2 className="font-cinzel text-lg text-foreground/80 mb-6">Your Order</h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative w-14 h-18 shrink-0 border border-gold/10 overflow-hidden">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-cinzel text-xs text-foreground/70 line-clamp-1">
                {item.product.name}
              </p>
              <p className="font-inter text-[9px] text-foreground/30 tracking-wider uppercase">
                {item.product.category}
              </p>
            </div>
            <p className="font-cinzel text-sm text-gold/70 shrink-0">
              ${item.product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Applied promo */}
      {promoCode && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gold/5 border border-gold/10 mb-4">
          <Tag size={11} className="text-gold/50" />
          <span className="font-inter text-[10px] text-gold-light tracking-wider">{promoCode.code} — {promoCode.label}</span>
        </div>
      )}

      {/* Gift wrap note */}
      {giftWrap && (
        <div className="px-3 py-2 bg-dark-3/30 border border-gold/8 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Gift size={11} className="text-gold/40" />
            <span className="font-inter text-[10px] text-foreground/40 tracking-wider">Gift Wrapped</span>
          </div>
          {giftMessage && (
            <p className="font-inter text-[10px] text-foreground/25 italic pl-5 line-clamp-2">
              &ldquo;{giftMessage}&rdquo;
            </p>
          )}
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-gold/10 pt-4 space-y-3">
        <div className="flex justify-between font-inter text-sm">
          <span className="text-foreground/40">Subtotal</span>
          <span className="text-foreground/60">${subtotal().toFixed(2)}</span>
        </div>
        {discountAmount() > 0 && (
          <div className="flex justify-between font-inter text-sm">
            <span className="text-gold/50">Discount</span>
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
          <span className="text-foreground/50">Free</span>
        </div>
        <div className="border-t border-gold/10 pt-3">
          <div className="flex justify-between">
            <span className="font-cinzel text-base text-foreground/80">Total</span>
            <span className="font-cinzel text-xl text-gold">${totalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
