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
  limit = 4
): Product[] {
  const sameCategory = products.filter(
    (p) => p.categorySlug === categorySlug && p.id !== excludeId
  );
  const others = products.filter(
    (p) => p.categorySlug !== categorySlug && p.id !== excludeId
  );
  return [...sameCategory, ...others].slice(0, limit);
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
