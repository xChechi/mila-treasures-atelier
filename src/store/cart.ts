import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number; // percentage (0-100)
  label: string;
}

// Mock promo codes
const PROMO_CODES: Record<string, PromoCode> = {
  GOTHIC10: { code: "GOTHIC10", discount: 10, label: "10% Off" },
  DARK15: { code: "DARK15", discount: 15, label: "15% Off" },
  WELCOME20: { code: "WELCOME20", discount: 20, label: "20% Welcome Discount" },
};

const GIFT_WRAP_PRICE = 12.00;

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  promoCode: PromoCode | null;
  giftWrap: boolean;
  giftMessage: string;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  setGiftWrap: (enabled: boolean) => void;
  setGiftMessage: (message: string) => void;
  totalItems: () => number;
  subtotal: () => number;
  discount: () => number;
  giftWrapFee: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      giftWrap: false,
      giftMessage: "",

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) return; // unique items, no duplicates
        set({ items: [...items, { product, quantity: 1 }] });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      clearCart: () => set({ items: [], promoCode: null, giftWrap: false, giftMessage: "" }),

      toggleCart: () => set({ isOpen: !get().isOpen }),

      setCartOpen: (open) => set({ isOpen: open }),

      applyPromoCode: (code) => {
        const normalized = code.trim().toUpperCase();
        const promo = PROMO_CODES[normalized];
        if (!promo) {
          return { success: false, message: "Invalid promo code" };
        }
        if (get().promoCode?.code === normalized) {
          return { success: false, message: "Code already applied" };
        }
        set({ promoCode: promo });
        return { success: true, message: `${promo.label} applied!` };
      },

      removePromoCode: () => set({ promoCode: null }),

      setGiftWrap: (enabled) => set({ giftWrap: enabled }),

      setGiftMessage: (message) => set({ giftMessage: message }),

      totalItems: () => get().items.length,

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price, 0),

      discount: () => {
        const promo = get().promoCode;
        if (!promo) return 0;
        return get().subtotal() * (promo.discount / 100);
      },

      giftWrapFee: () => get().giftWrap ? GIFT_WRAP_PRICE : 0,

      totalPrice: () =>
        get().subtotal() - get().discount() + get().giftWrapFee(),
    }),
    {
      name: "gothic-cart",
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        giftWrap: state.giftWrap,
        giftMessage: state.giftMessage,
      }),
    }
  )
);

export { GIFT_WRAP_PRICE };
