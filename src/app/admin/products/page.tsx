"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { products, type Product } from "@/data/products";
import ProductFormModal from "@/components/admin/ProductFormModal";

export default function AdminProducts() {
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-2xl font-semibold text-foreground/90">Products</h1>
          <p className="font-inter text-xs text-foreground/30 mt-1">{products.length} total pieces</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-burgundy hover:bg-burgundy-light text-white font-inter text-xs tracking-[0.1em] uppercase transition-colors"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* Products table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25 w-16" />
              <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Name</th>
              <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Category</th>
              <th className="text-right py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Price</th>
              <th className="text-center py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Status</th>
              <th className="text-right py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gold/5 hover:bg-dark-3/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="relative w-10 h-12 border border-gold/10 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="font-inter text-sm text-foreground/70">{product.name}</p>
                  <p className="font-inter text-[10px] text-foreground/25 mt-0.5">{product.slug}</p>
                </td>
                <td className="py-3 px-4 font-inter text-xs text-foreground/40">{product.category}</td>
                <td className="py-3 px-4 font-cinzel text-sm text-gold/70 text-right">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-center">
                  {product.inStock ? (
                    <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase border bg-green-900/20 text-green-300 border-green-500/20">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase border bg-red-900/15 text-red-300/70 border-red-500/15">
                      Sold Out
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setEditProduct(product); setShowForm(true); }}
                      aria-label={`Edit ${product.name}`}
                      className="p-2 text-foreground/25 hover:text-gold-light transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => alert(`Delete "${product.name}"? (Demo — no action taken)`)}
                      aria-label={`Delete ${product.name}`}
                      className="p-2 text-foreground/25 hover:text-burgundy transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductFormModal
            product={editProduct}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
