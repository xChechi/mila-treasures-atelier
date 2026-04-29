import {
  getProducts,
  getProductBySlug as fetchProductBySlug,
  type Product,
} from "@/lib/data";
import { categories as staticCategories, type Category } from "@/data/products";

export type { Product, Category };

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return fetchProductBySlug(slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return staticCategories.find((c) => c.slug === slug);
}

export async function getRelatedProducts(
  excludeId: string,
  categorySlug: string,
  limit = 4,
  currentPrice?: number
): Promise<Product[]> {
  const all = await getProducts();
  const candidates = all.filter((p) => p.id !== excludeId);

  const scored = candidates.map((p) => {
    let score = 0;
    if (p.categorySlug === categorySlug) score += 100;
    if (currentPrice) {
      const priceDiff = Math.abs(p.price - currentPrice) / currentPrice;
      if (priceDiff <= 0.15) score += 50;
      else if (priceDiff <= 0.30) score += 30;
      else if (priceDiff <= 0.50) score += 10;
    }
    if (p.inStock) score += 20;
    score += Math.random() * 5;
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.product);
}

export type SortOption = "price-asc" | "price-desc" | "name-asc";

export function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export interface FilterOptions {
  search: string;
  categorySlug?: string;
  material?: string;
  inStockOnly?: boolean;
  priceMin?: number;
  priceMax?: number;
}

export function filterProducts(
  items: Product[],
  searchOrOptions: string | FilterOptions,
  categorySlug?: string
): Product[] {
  const opts: FilterOptions = typeof searchOrOptions === "string"
    ? { search: searchOrOptions, categorySlug }
    : searchOrOptions;

  let filtered = items;

  if (opts.categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === opts.categorySlug);
  }
  if (opts.search.trim()) {
    const q = opts.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (opts.material) {
    filtered = filtered.filter((p) => p.material === opts.material);
  }
  if (opts.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }
  if (opts.priceMin !== undefined) {
    filtered = filtered.filter((p) => p.price >= opts.priceMin!);
  }
  if (opts.priceMax !== undefined) {
    filtered = filtered.filter((p) => p.price <= opts.priceMax!);
  }
  return filtered;
}

export function getUniqueMaterials(items: Product[]): string[] {
  const materials = new Set<string>();
  items.forEach((p) => { if (p.material) materials.add(p.material); });
  return Array.from(materials).sort();
}

export function getPriceRange(items: Product[]): { min: number; max: number } {
  const prices = items.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
