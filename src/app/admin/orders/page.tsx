"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { mockOrders, type Order } from "@/data/mock-orders";

const statusColors = {
  processing: "bg-gold/15 text-gold-light border-gold/20",
  shipped: "bg-blue-900/20 text-blue-300 border-blue-500/20",
  delivered: "bg-green-900/20 text-green-300 border-green-500/20",
};

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="border-b border-gold/5 hover:bg-dark-3/20 transition-colors cursor-pointer"
      >
        <td className="py-3 px-4 font-inter text-sm text-foreground/60">{order.orderNumber}</td>
        <td className="py-3 px-4">
          <p className="font-inter text-sm text-foreground/60">{order.customerName}</p>
          <p className="font-inter text-[10px] text-foreground/25">{order.customerEmail}</p>
        </td>
        <td className="py-3 px-4 font-inter text-sm text-foreground/40 text-center">{order.items.length}</td>
        <td className="py-3 px-4 font-cinzel text-sm text-gold/70 text-right">${order.total.toFixed(2)}</td>
        <td className="py-3 px-4">
          <span className={`inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase border ${statusColors[order.status]}`}>
            {order.status}
          </span>
        </td>
        <td className="py-3 px-4 font-inter text-xs text-foreground/30 text-right">{order.date}</td>
        <td className="py-3 px-4 text-right">
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block text-foreground/20"
          >
            <ChevronDown size={14} />
          </motion.span>
        </td>
      </tr>
      <AnimatePresence>
        {expanded && (
          <tr>
            <td colSpan={7} className="border-b border-gold/5">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-8 py-4 bg-dark-3/10 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/25 mb-1">Shipping To</p>
                      <p className="font-inter text-sm text-foreground/50">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/25 mb-1">Email</p>
                      <p className="font-inter text-sm text-foreground/50">{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/25 mb-1">Order Date</p>
                      <p className="font-inter text-sm text-foreground/50">{order.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/25 mb-2">Items</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-gold/5 last:border-0">
                        <span className="font-inter text-sm text-foreground/50">{item.productName}</span>
                        <span className="font-cinzel text-sm text-gold/60">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default function AdminOrders() {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-2xl font-semibold text-foreground/90">Orders</h1>
          <p className="font-inter text-xs text-foreground/30 mt-1">
            {mockOrders.length} orders · ${totalRevenue.toLocaleString()} total (mock)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Order</th>
              <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Customer</th>
              <th className="text-center py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Items</th>
              <th className="text-right py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Total</th>
              <th className="text-left py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Status</th>
              <th className="text-right py-3 px-4 font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/25">Date</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
