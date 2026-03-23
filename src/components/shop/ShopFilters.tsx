"use client";

import { Search } from "lucide-react";
import { categories } from "@/data/products";
import type { SortOption } from "@/lib/products";

interface ShopFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function ShopFilters({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
}: ShopFiltersProps) {
  return (
    <div className="mb-12 space-y-6">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" />
          <input
            type="text"
            placeholder="Search pieces..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-4 py-3 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/60 font-inter text-sm outline-none transition-colors duration-300 cursor-pointer appearance-none min-w-[180px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          <option value="name-asc">Name: A — Z</option>
          <option value="price-asc">Price: Low — High</option>
          <option value="price-desc">Price: High — Low</option>
        </select>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:overflow-visible sm:pb-0">
        <button
          onClick={() => onCategoryChange("")}
          className={`px-5 py-2 font-inter text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
            activeCategory === ""
              ? "bg-burgundy/80 border-burgundy text-white"
              : "bg-transparent border-gold/15 text-foreground/40 hover:border-gold/30 hover:text-foreground/60"
          }`}
        >
          All Pieces
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-5 py-2 font-inter text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
              activeCategory === cat.slug
                ? "bg-burgundy/80 border-burgundy text-white"
                : "bg-transparent border-gold/15 text-foreground/40 hover:border-gold/30 hover:text-foreground/60"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
