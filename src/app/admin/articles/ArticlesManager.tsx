"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Save, Loader2, Eye } from "lucide-react";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  date: string;
  read_time: number;
  featured: boolean;
  related_product_slugs: string[];
}

const emptyArticle: Omit<Article, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "Inspiration",
  author: "Mila Treasures Atelier",
  date: new Date().toISOString().split("T")[0],
  read_time: 5,
  featured: false,
  related_product_slugs: [],
};

const categoryOptions = ["Workshop", "Culture", "Inspiration", "Behind the Scenes"];

const inputClass =
  "w-full px-3 py-2 bg-[#111] border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm outline-none transition-colors";
const labelClass = "block font-inter text-xs text-foreground/40 mb-1";

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | (Omit<Article, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [relatedInput, setRelatedInput] = useState("");

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/articles");
    if (res.ok) setArticles(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  const slugify = (title: string) =>
    title.toLowerCase().replace(/[éè]/g, "e").replace(/[àâ]/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const addRelatedProduct = () => {
    if (!relatedInput.trim() || !editing) return;
    setEditing({
      ...editing,
      related_product_slugs: [...editing.related_product_slugs, relatedInput.trim()],
    });
    setRelatedInput("");
  };

  const removeRelatedProduct = (slug: string) => {
    if (!editing) return;
    setEditing({
      ...editing,
      related_product_slugs: editing.related_product_slugs.filter((s) => s !== slug),
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");

    const isNew = !("id" in editing) || !editing.id;
    const method = isNew ? "POST" : "PUT";

    const payload = { ...editing };
    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title);
    }

    const res = await fetch("/api/admin/articles", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditing(null);
      fetchArticles();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;

    const res = await fetch("/api/admin/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) fetchArticles();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-foreground/30">
        <Loader2 size={16} className="animate-spin" /> Loading articles...
      </div>
    );
  }

  // Edit / Create form
  if (editing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-cinzel text-xl text-foreground/90">
            {editing.id ? "Edit Article" : "New Article"}
          </h2>
          <button onClick={() => setEditing(null)} className="text-foreground/30 hover:text-foreground/60">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-inter">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className={labelClass}>Title</label>
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Slug (auto-generated if empty)</label>
              <input
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className={inputClass}
                placeholder={editing.title ? slugify(editing.title) : ""}
              />
            </div>
            <div>
              <label className={labelClass}>Cover Image URL</label>
              <input
                value={editing.cover_image}
                onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
                className={inputClass}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              rows={2}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <label className={labelClass}>Content (Markdown)</label>
            <textarea
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={20}
              className={`${inputClass} resize-y font-mono text-xs`}
            />
            <p className="text-[10px] text-foreground/15 font-inter mt-1">
              Use ## for headings, **bold**, - for lists, same format as existing articles
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className={inputClass}
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Read Time (min)</label>
              <input
                type="number"
                value={editing.read_time}
                onChange={(e) => setEditing({ ...editing, read_time: parseInt(e.target.value) || 5 })}
                className={inputClass}
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="accent-gold"
                />
                <span className="font-inter text-sm text-foreground/50">Featured</span>
              </label>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <label className={labelClass}>Related Product Slugs</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editing.related_product_slugs.map((slug) => (
                <span key={slug} className="flex items-center gap-1 px-2 py-1 bg-gold/10 text-gold/60 text-xs font-inter">
                  {slug}
                  <button onClick={() => removeRelatedProduct(slug)} className="hover:text-red-400">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={relatedInput}
                onChange={(e) => setRelatedInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRelatedProduct())}
                className={inputClass}
                placeholder="e.g. gothic-heart-trinket-box"
              />
              <button
                onClick={addRelatedProduct}
                className="px-3 py-2 border border-gold/10 hover:border-gold/25 text-foreground/40 text-sm transition-colors shrink-0"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gold/8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light disabled:opacity-50 text-white font-inter text-sm tracking-wider uppercase flex items-center gap-2 transition-colors"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save Article"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 border border-gold/10 hover:border-gold/25 text-foreground/40 hover:text-foreground/70 font-inter text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Article list
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-cinzel text-xl text-foreground/90">Journal Articles</h2>
          <p className="font-inter text-sm text-foreground/30">{articles.length} articles</p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyArticle })}
          className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={14} />
          New Article
        </button>
      </div>

      <div className="space-y-2">
        {articles.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 p-4 border border-gold/8 hover:border-gold/15 bg-dark-3/20 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-inter text-sm text-foreground/80 truncate">{a.title}</p>
                {a.featured && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gold/10 text-gold/60 uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              <p className="font-inter text-xs text-foreground/25">
                {a.category} · {a.date} · {a.read_time} min read
              </p>
            </div>
            <div className="flex gap-1">
              <a
                href={`/journal/${a.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/25 hover:text-gold/70 transition-colors"
                title="View"
              >
                <Eye size={14} />
              </a>
              <button
                onClick={() => setEditing(a)}
                className="p-2 text-foreground/25 hover:text-gold/70 transition-colors"
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="p-2 text-foreground/25 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
