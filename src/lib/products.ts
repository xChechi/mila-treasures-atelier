import { products, categories, type Product, type Category } from "@/data/products";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(
  excludeId: string,
  categorySlug: string,
  limit = 4,
  currentPrice?: number
): Product[] {
  const candidates = products.filter((p) => p.id !== excludeId);

  // Score each candidate: same category + close price = higher score
  const scored = candidates.map((p) => {
    let score = 0;
    // Same category is the strongest signal
    if (p.categorySlug === categorySlug) score += 100;
    // Similar price range (within 30%) adds relevance
    if (currentPrice) {
      const priceDiff = Math.abs(p.price - currentPrice) / currentPrice;
      if (priceDiff <= 0.15) score += 50;
      else if (priceDiff <= 0.30) score += 30;
      else if (priceDiff <= 0.50) score += 10;
    }
    // Prefer in-stock items
    if (p.inStock) score += 20;
    // Small random factor to keep it fresh
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

export function filterProducts(
  items: Product[],
  search: string,
  categorySlug?: string
): Product[] {
  let filtered = items;
  if (categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === categorySlug);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  return filtered;
}
