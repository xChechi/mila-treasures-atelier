"use client";

import { useState, useMemo, useCallback } from "react";
import type { Product, Category } from "@/data/products";
import { sortProducts, type SortOption } from "@/lib/products";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/shop/ProductGrid";
import QuickViewModal from "@/components/shop/QuickViewModal";

interface CategoryPageClientProps {
  category: Category;
  products: Product[];
  productCount: number;
}

export default function CategoryPageClient({
  category,
  products,
  productCount,
}: CategoryPageClientProps) {
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const handleQuickView = useCallback((product: Product) => setQuickViewProduct(product), []);

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: category.name },
          ]}
        />
        <PageHeader
          title={category.name}
          subtitle={`${productCount} ${productCount === 1 ? "Piece" : "Pieces"}`}
          description={category.description}
        />

        {/* Sort control */}
        <div className="flex justify-end mb-8">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
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

        <ProductGrid products={sorted} onQuickView={handleQuickView} />
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
