"use client";

import Link from "next/link";
import { Package, CheckCircle, XCircle, DollarSign, Plus, ExternalLink } from "lucide-react";
import { products } from "@/data/products";
import { mockOrders } from "@/data/mock-orders";
import StatsCard from "@/components/admin/StatsCard";

const statusColors = {
  processing: "bg-gold/15 text-gold-light border-gold/20",
  shipped: "bg-blue-900/20 text-blue-300 border-blue-500/20",
  delivered: "bg-green-900/20 text-green-300 border-green-500/20",
};

export default function AdminDashboard() {
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.inStock).length;
  const soldOut = products.filter((p) => !p.inStock).length;
  const revenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-2xl font-semibold text-foreground/90">Dashboard</h1>
          <p className="font-inter text-xs text-foreground/30 mt-1">Welcome back</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2 bg-burgundy hover:bg-burgundy-light text-white font-inter text-xs tracking-[0.1em] uppercase transition-colors"
          >
            <Plus size={14} />
            Add Product
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 border border-gold/15 hover:border-gold/30 text-foreground/40 hover:text-foreground/60 font-inter text-xs tracking-[0.1em] uppercase transition-all"
          >
            <ExternalLink size={14} />
            View Shop
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard title="Total Products" value={totalProducts} icon={Package} />
        <StatsCard title="In Stock" value={inStock} icon={CheckCircle} subtitle={`${Math.round((inStock / totalProducts) * 100)}% available`} />
        <StatsCard title="Sold Out" value={soldOut} icon={XCircle} />
        <StatsCard title="Total Revenue" value={`$${revenue.toLocaleString()}`} icon={DollarSign} subtitle="All time (mock)" />
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-cinzel text-lg text-foreground/80">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="font-inter text-xs text-gold/40 hover:text-gold-light transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Order</th>
                <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Customer</th>
                <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Items</th>
                <th className="text-right py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Total</th>
                <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Status</th>
                <th className="text-right py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gold/5 hover:bg-dark-3/20 transition-colors">
                  <td className="py-3 px-4 font-inter text-sm text-foreground/60">{order.orderNumber}</td>
                  <td className="py-3 px-4 font-inter text-sm text-foreground/60">{order.customerName}</td>
                  <td className="py-3 px-4 font-inter text-sm text-foreground/40">{order.items.length}</td>
                  <td className="py-3 px-4 font-cinzel text-sm text-gold/70 text-right">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-inter text-xs text-foreground/30 text-right">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
