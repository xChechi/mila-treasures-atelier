"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Upload, X, Save, Loader2 } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  category_slug: string;
  description: string;
  short_description: string;
  image: string;
  images: string[];
  in_stock: boolean;
  featured: boolean;
  badge: string | null;
  dimensions: string | null;
  material: string | null;
  weight: string | null;
  etsy_url: string;
  sort_order: number;
}

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  slug: "",
  price: 0,
  category: "Églomisé Art",
  category_slug: "eglomise-art",
  description: "",
  short_description: "",
  image: "",
  images: [],
  in_stock: true,
  featured: false,
  badge: null,
  dimensions: null,
  material: null,
  weight: null,
  etsy_url: "",
  sort_order: 0,
};

const categoryOptions = [
  { name: "Églomisé Art", slug: "eglomise-art" },
  { name: "Framed Art & Decor", slug: "framed-art" },
  { name: "Trinket Boxes", slug: "trinket-boxes" },
  { name: "Sculptures & Decor", slug: "sculptures-decor" },
];

const badgeOptions = [
  { value: "", label: "None" },
  { value: "new", label: "New" },
  { value: "bestseller", label: "Bestseller" },
  { value: "limited", label: "Limited" },
  { value: "last-one", label: "Last One" },
];

const inputClass =
  "w-full px-3 py-2 bg-[#111] border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm outline-none transition-colors";
const labelClass = "block font-inter text-xs text-foreground/40 mb-1";

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | (Omit<Product, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const slugify = (name: string) =>
    name.toLowerCase().replace(/[éè]/g, "e").replace(/[àâ]/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setEditing({
        ...editing,
        image: editing.image || url,
        images: [...editing.images, url],
      });
    } else {
      const { error } = await res.json();
      setError(error || "Upload failed");
    }
    setUploading(false);
  };

  const removeImage = (url: string) => {
    if (!editing) return;
    const newImages = editing.images.filter((i) => i !== url);
    setEditing({
      ...editing,
      images: newImages,
      image: newImages[0] || "",
    });
  };

  const setMainImage = (url: string) => {
    if (!editing) return;
    setEditing({ ...editing, image: url });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");

    const isNew = !("id" in editing) || !editing.id;
    const method = isNew ? "POST" : "PUT";

    const payload = { ...editing };
    // Auto-generate slug if empty
    if (!payload.slug && payload.name) {
      payload.slug = slugify(payload.name);
    }

    const res = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditing(null);
      fetchProducts();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-foreground/30">
        <Loader2 size={16} className="animate-spin" /> Loading products...
      </div>
    );
  }

  // Editing / Creating form
  if (editing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-cinzel text-xl text-foreground/90">
            {editing.id ? "Edit Product" : "New Product"}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name</label>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug (auto-generated if empty)</label>
              <input
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className={inputClass}
                placeholder={editing.name ? slugify(editing.name) : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Price ($)</label>
              <input
                type="number"
                value={editing.price}
                onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={editing.category_slug}
                onChange={(e) => {
                  const cat = categoryOptions.find((c) => c.slug === e.target.value)!;
                  setEditing({ ...editing, category: cat.name, category_slug: cat.slug });
                }}
                className={inputClass}
              >
                {categoryOptions.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Badge</label>
              <select
                value={editing.badge || ""}
                onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })}
                className={inputClass}
              >
                {badgeOptions.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input
              value={editing.short_description}
              onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={8}
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Images */}
          <div>
            <label className={labelClass}>Images</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {editing.images.map((img) => (
                <div key={img} className="relative group">
                  <Image
                    src={img}
                    alt=""
                    width={96}
                    height={96}
                    className={`w-24 h-24 object-cover border-2 ${
                      img === editing.image ? "border-gold/50" : "border-gold/10"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                    <button
                      onClick={() => setMainImage(img)}
                      className="text-xs text-gold/80 hover:text-gold px-1"
                      title="Set as main"
                    >
                      Main
                    </button>
                    <button
                      onClick={() => removeImage(img)}
                      className="text-red-400 hover:text-red-300"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <label className="w-24 h-24 border border-dashed border-gold/15 hover:border-gold/30 flex flex-col items-center justify-center cursor-pointer transition-colors">
                {uploading ? (
                  <Loader2 size={16} className="animate-spin text-gold/40" />
                ) : (
                  <>
                    <Upload size={16} className="text-gold/30 mb-1" />
                    <span className="text-[10px] text-foreground/20">Upload</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <p className="text-[10px] text-foreground/15 font-inter">
              Click &quot;Main&quot; to set the primary image. Max 5MB per file.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Dimensions</label>
              <input
                value={editing.dimensions || ""}
                onChange={(e) => setEditing({ ...editing, dimensions: e.target.value || null })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Material</label>
              <input
                value={editing.material || ""}
                onChange={(e) => setEditing({ ...editing, material: e.target.value || null })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Weight</label>
              <input
                value={editing.weight || ""}
                onChange={(e) => setEditing({ ...editing, weight: e.target.value || null })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Etsy URL</label>
            <input
              value={editing.etsy_url}
              onChange={(e) => setEditing({ ...editing, etsy_url: e.target.value })}
              className={inputClass}
              placeholder="https://www.etsy.com/listing/..."
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.in_stock}
                onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })}
                className="accent-gold"
              />
              <span className="font-inter text-sm text-foreground/50">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="accent-gold"
              />
              <span className="font-inter text-sm text-foreground/50">Featured</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="font-inter text-sm text-foreground/50">Sort Order</label>
              <input
                type="number"
                value={editing.sort_order}
                onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })}
                className={`${inputClass} w-20`}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gold/8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light disabled:opacity-50 text-white font-inter text-sm tracking-wider uppercase flex items-center gap-2 transition-colors"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save Product"}
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

  // Product list
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-cinzel text-xl text-foreground/90">Products</h2>
          <p className="font-inter text-sm text-foreground/30">{products.length} items</p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyProduct })}
          className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      <div className="space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 border border-gold/8 hover:border-gold/15 bg-dark-3/20 transition-colors"
          >
            {p.image && (
              <Image src={p.image} alt={p.name} width={48} height={48} className="w-12 h-12 object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-inter text-sm text-foreground/80 truncate">{p.name}</p>
                {p.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gold/10 text-gold/60 uppercase tracking-wider">
                    {p.badge}
                  </span>
                )}
                {!p.in_stock && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-400 uppercase tracking-wider">
                    Sold
                  </span>
                )}
              </div>
              <p className="font-inter text-xs text-foreground/25">{p.category} · ${p.price}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setEditing(p)}
                className="p-2 text-foreground/25 hover:text-gold/70 transition-colors"
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
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
