import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) return; // unique items, no duplicates
        set({ items: [...items, { product, quantity: 1 }] });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),

      setCartOpen: (open) => set({ isOpen: open }),

      totalItems: () => get().items.length,

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price, 0),
    }),
    {
      name: "gothic-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
