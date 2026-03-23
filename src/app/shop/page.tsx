"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { filterProducts, sortProducts, type SortOption } from "@/lib/products";
import PageHeader from "@/components/ui/PageHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductGrid from "@/components/shop/ProductGrid";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const filtered = useMemo(() => {
    const results = filterProducts(products, search, activeCategory || undefined);
    return sortProducts(results, sort);
  }, [search, activeCategory, sort]);

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
        />
        <ProductGrid products={filtered} />
      </div>
    </section>
  );
}
