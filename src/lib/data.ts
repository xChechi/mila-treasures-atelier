import { getSupabase } from "./supabase";
import {
  products as staticProducts,
  categories as staticCategories,
  type Product as StaticProduct,
  type Category,
} from "@/data/products";
import {
  journalPosts as staticPosts,
  type JournalPost as StaticJournalPost,
} from "@/data/journal";

// Re-export types used across the app
export type { Category };
export type { StaticProduct as Product };
export type { StaticJournalPost as JournalPost };

// ─── Supabase → static type mappers ──────────────────────────────────────────

function mapProduct(row: Record<string, unknown>): StaticProduct {
  return {
    id: String(row.id),
    name: row.name as string,
    slug: row.slug as string,
    price: Number(row.price),
    category: row.category as string,
    categorySlug: row.category_slug as string,
    description: row.description as string,
    shortDescription: row.short_description as string,
    image: row.image as string,
    images: (row.images as string[]) || [],
    inStock: row.in_stock as boolean,
    featured: row.featured as boolean,
    badge: (row.badge as StaticProduct["badge"]) || undefined,
    dimensions: (row.dimensions as string) || undefined,
    material: (row.material as string) || undefined,
    weight: (row.weight as string) || undefined,
    etsyUrl: row.etsy_url as string,
  };
}

function mapPost(row: Record<string, unknown>): StaticJournalPost {
  return {
    id: String(row.id),
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    coverImage: row.cover_image as string,
    category: row.category as StaticJournalPost["category"],
    author: row.author as string,
    date: row.date as string,
    readTime: row.read_time as number,
    featured: row.featured as boolean,
    relatedProductSlugs: (row.related_product_slugs as string[]) || [],
  };
}

function mapCategory(row: Record<string, unknown>): Category {
  return {
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    image: row.image as string,
    productCount: row.product_count as number,
  };
}

// ─── Check if Supabase is configured ─────────────────────────────────────────

function getClient() {
  return getSupabase();
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<StaticProduct[]> {
  const sb = getClient();
  if (!sb) return staticProducts;

  try {
    const { data, error } = await sb
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return staticProducts;
    return data.map(mapProduct);
  } catch {
    return staticProducts;
  }
}

export async function getCategories(): Promise<Category[]> {
  const sb = getClient();
  if (!sb) return staticCategories;

  try {
    const { data, error } = await sb
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return staticCategories;
    return data.map(mapCategory);
  } catch {
    return staticCategories;
  }
}

// ─── Journal Posts ───────────────────────────────────────────────────────────

export async function getJournalPosts(): Promise<StaticJournalPost[]> {
  const sb = getClient();
  if (!sb) return staticPosts;

  try {
    const { data, error } = await sb
      .from("journal_posts")
      .select("*")
      .order("date", { ascending: false });

    if (error || !data?.length) return staticPosts;
    return data.map(mapPost);
  } catch {
    return staticPosts;
  }
}

// ─── Single-item lookups ────────────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<StaticProduct | undefined> {
  const sb = getClient();
  if (!sb) return staticProducts.find((p) => p.slug === slug);

  try {
    const { data, error } = await sb
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return staticProducts.find((p) => p.slug === slug);
    return mapProduct(data);
  } catch {
    return staticProducts.find((p) => p.slug === slug);
  }
}

export async function getJournalPostBySlug(slug: string): Promise<StaticJournalPost | undefined> {
  const sb = getClient();
  if (!sb) return staticPosts.find((p) => p.slug === slug);

  try {
    const { data, error } = await sb
      .from("journal_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return staticPosts.find((p) => p.slug === slug);
    return mapPost(data);
  } catch {
    return staticPosts.find((p) => p.slug === slug);
  }
}
