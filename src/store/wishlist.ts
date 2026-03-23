import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  totalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        const items = get().items;
        const exists = items.some((i) => i.id === product.id);
        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isWishlisted: (productId) => get().items.some((i) => i.id === productId),

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.id !== productId) }),

      clearWishlist: () => set({ items: [] }),

      totalItems: () => get().items.length,
    }),
    { name: "gothic-wishlist" }
  )
);
