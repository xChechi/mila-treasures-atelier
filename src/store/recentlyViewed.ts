import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

const MAX_ITEMS = 8;

interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items.filter((i) => i.id !== product.id);
        set({ items: [product, ...items].slice(0, MAX_ITEMS) });
      },

      clearAll: () => set({ items: [] }),
    }),
    { name: "gothic-recently-viewed" }
  )
);
