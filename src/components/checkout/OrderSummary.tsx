"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);

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

      {/* Totals */}
      <div className="border-t border-gold/10 pt-4 space-y-3">
        <div className="flex justify-between font-inter text-sm">
          <span className="text-foreground/40">Subtotal</span>
          <span className="text-foreground/60">${totalPrice().toFixed(2)}</span>
        </div>
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
