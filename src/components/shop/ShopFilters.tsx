"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/data/products";
import type { Product } from "@/lib/data";
import { type SortOption, getUniqueMaterials, getPriceRange } from "@/lib/products";

interface ShopFiltersProps {
  products: Product[];
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  material: string;
  onMaterialChange: (material: string) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function ShopFilters({
  products,
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  material,
  onMaterialChange,
  inStockOnly,
  onInStockChange,
  priceRange,
  onPriceRangeChange,
}: ShopFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const allMaterials = getUniqueMaterials(products);
  const { min: PRICE_MIN, max: PRICE_MAX } = getPriceRange(products);

  const hasActiveFilters = material !== "" || inStockOnly || priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX;

  const clearAllFilters = () => {
    onMaterialChange("");
    onInStockChange(false);
    onPriceRangeChange([PRICE_MIN, PRICE_MAX]);
  };

  return (
    <div className="mb-12 space-y-6">
      {/* Search + Sort + Advanced toggle row */}
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

        {/* Advanced filters toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-3 border font-inter text-xs tracking-[0.1em] uppercase flex items-center gap-2 transition-all duration-300 ${
            showAdvanced || hasActiveFilters
              ? "bg-gold/10 border-gold/30 text-gold-light"
              : "bg-dark-3/50 border-gold/10 text-foreground/40 hover:border-gold/20 hover:text-foreground/60"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
          )}
        </button>

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
          className={`px-5 py-2 font-inter text-xs tracking-[0.15em] uppercase transition-all duration-300 border whitespace-nowrap ${
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
            className={`px-5 py-2 font-inter text-xs tracking-[0.15em] uppercase transition-all duration-300 border whitespace-nowrap ${
              activeCategory === cat.slug
                ? "bg-burgundy/80 border-burgundy text-white"
                : "bg-transparent border-gold/15 text-foreground/40 hover:border-gold/30 hover:text-foreground/60"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Advanced filters panel */}
      {showAdvanced && (
        <div className="p-5 bg-dark-3/30 border border-gold/10 space-y-5">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-foreground/30">
              Refine Results
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="font-inter text-[10px] tracking-[0.15em] uppercase text-burgundy/70 hover:text-burgundy flex items-center gap-1 transition-colors"
              >
                <X size={10} />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Price range */}
            <div className="space-y-3">
              <label className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={5}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onPriceRangeChange([Math.min(val, priceRange[1] - 5), priceRange[1]]);
                  }}
                  className="w-full accent-gold/60 h-1 bg-dark-4 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold/80 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={5}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onPriceRangeChange([priceRange[0], Math.max(val, priceRange[0] + 5)]);
                  }}
                  className="w-full accent-gold/60 h-1 bg-dark-4 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold/80 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between">
                  <span className="font-inter text-xs text-foreground/40">
                    {`$${priceRange[0]}`}
                  </span>
                  <span className="font-inter text-xs text-foreground/40">
                    {`$${priceRange[1]}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Material */}
            <div className="space-y-3">
              <label className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">
                Material
              </label>
              <select
                value={material}
                onChange={(e) => onMaterialChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/60 font-inter text-xs outline-none transition-colors duration-300 cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="">All Materials</option>
                {allMaterials.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* In Stock toggle */}
            <div className="space-y-3">
              <label className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">
                Availability
              </label>
              <button
                onClick={() => onInStockChange(!inStockOnly)}
                className={`w-full px-3 py-2.5 border font-inter text-xs tracking-[0.1em] transition-all duration-300 ${
                  inStockOnly
                    ? "bg-burgundy/20 border-burgundy/40 text-burgundy-light"
                    : "bg-dark-3/50 border-gold/10 text-foreground/40 hover:border-gold/20"
                }`}
              >
                {inStockOnly ? "In Stock Only" : "All (Including Claimed)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
