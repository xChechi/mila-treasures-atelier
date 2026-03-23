"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { categories, type Product } from "@/data/products";

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
}

const inputClass =
  "w-full px-3 py-2.5 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors";
const labelClass = "block font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/30 mb-1.5";

export default function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    shortDescription: "",
    material: "",
    dimensions: "",
    weight: "",
    image: "",
    inStock: true,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price.toString(),
        category: product.categorySlug,
        description: product.description,
        shortDescription: product.shortDescription,
        material: product.material || "",
        dimensions: product.dimensions || "",
        weight: product.weight || "",
        image: product.image,
        inStock: product.inStock,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save — just close
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[85vh] bg-dark-2 border border-gold/10 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-gold/10">
          <h2 className="font-cinzel text-lg text-foreground/85">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-foreground/30 hover:text-foreground/60 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Product Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Nocturne Cathedral Cross"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="189.00"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer py-2.5">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  className="w-4 h-4 accent-gold"
                />
                <span className="font-inter text-sm text-foreground/60">In Stock</span>
              </label>
            </div>
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              placeholder="Brief description for cards"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Detailed product description"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Material</label>
              <input
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                placeholder="Hand-forged iron"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Dimensions</label>
              <input
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                placeholder={'24" H x 14" W'}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Weight</label>
              <input
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="4.2 lbs"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-3 border-t border-gold/10">
            <button
              type="submit"
              className="flex-1 py-3 bg-burgundy hover:bg-burgundy-light text-white font-inter text-xs tracking-[0.15em] uppercase transition-colors"
            >
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gold/15 hover:border-gold/30 text-foreground/40 font-inter text-xs tracking-[0.15em] uppercase transition-all"
            >
              Cancel
            </button>
          </div>

          <p className="font-inter text-[10px] text-foreground/15 text-center">
            This is a demo — changes are not persisted
          </p>
        </form>
      </motion.div>
    </>
  );
}
