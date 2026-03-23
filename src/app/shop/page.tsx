"use client";

import { useState, useMemo, useCallback } from "react";
import { products, type Product } from "@/data/products";
import { filterProducts, sortProducts, getPriceRange, type SortOption } from "@/lib/products";
import PageHeader from "@/components/ui/PageHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductGrid from "@/components/shop/ProductGrid";
import QuickViewModal from "@/components/shop/QuickViewModal";
import RecentlyViewed from "@/components/shop/RecentlyViewed";

const { min: PRICE_MIN, max: PRICE_MAX } = getPriceRange(products);

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [material, setMaterial] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);

  const filtered = useMemo(() => {
    const results = filterProducts(products, {
      search,
      categorySlug: activeCategory || undefined,
      material: material || undefined,
      inStockOnly,
      priceMin: priceRange[0] > PRICE_MIN ? priceRange[0] : undefined,
      priceMax: priceRange[1] < PRICE_MAX ? priceRange[1] : undefined,
    });
    return sortProducts(results, sort);
  }, [search, activeCategory, sort, material, inStockOnly, priceRange]);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <PageHeader
          title="The Collection"
          subtitle="All Pieces"
          description="Each piece is handcrafted and entirely unique — when it's gone, it's gone forever."
        />
        <ShopFilters
          search={search}
          onSearchChange={setSearch}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sort={sort}
          onSortChange={setSort}
          material={material}
          onMaterialChange={setMaterial}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
        <ProductGrid products={filtered} onQuickView={handleQuickView} />

        <RecentlyViewed />
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
