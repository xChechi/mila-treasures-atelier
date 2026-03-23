"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, ShoppingBag, Eye, Users } from "lucide-react";
import { products } from "@/data/products";
import { mockOrders } from "@/data/mock-orders";
import { reviews } from "@/data/reviews";
import StatsCard from "@/components/admin/StatsCard";

// Generate mock daily revenue data for last 30 days
function generateRevenueData() {
  const data = [];
  const now = new Date("2026-03-23");
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    // Simulated revenue with some variation
    const base = 80 + Math.sin(i * 0.5) * 40;
    const spike = i % 7 === 0 ? 120 : 0; // Weekend spikes
    const revenue = Math.round(base + spike + Math.random() * 60);
    const visitors = Math.round(40 + Math.random() * 80);
    data.push({ date: dayLabel, revenue, visitors });
  }
  return data;
}

// Category breakdown from actual products
function getCategoryBreakdown() {
  const cats: Record<string, number> = {};
  products.forEach((p) => {
    cats[p.category] = (cats[p.category] || 0) + 1;
  });
  return Object.entries(cats).map(([name, value]) => ({ name, value }));
}

// Top products by revenue (from mock orders)
function getTopProducts() {
  const productRevenue: Record<string, number> = {};
  mockOrders.forEach((order) => {
    order.items.forEach((item) => {
      productRevenue[item.productName] = (productRevenue[item.productName] || 0) + item.price;
    });
  });
  return Object.entries(productRevenue)
    .map(([name, revenue]) => ({ name: name.length > 20 ? name.slice(0, 20) + "…" : name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

// Conversion funnel mock data
function getFunnelData() {
  return [
    { stage: "Visitors", value: 1420, fill: "#C9A84C" },
    { stage: "Viewed Product", value: 680, fill: "#E8C57A" },
    { stage: "Added to Cart", value: 210, fill: "#8B0000" },
    { stage: "Checkout", value: 95, fill: "#722F37" },
    { stage: "Purchased", value: 62, fill: "#6b1020" },
  ];
}

const PIE_COLORS = ["#C9A84C", "#8B0000", "#722F37", "#8A8D8F"];

const customTooltipStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid rgba(201,168,76,0.2)",
  borderRadius: "0",
  padding: "8px 12px",
  fontSize: "12px",
  color: "rgba(255,255,255,0.7)",
};

export default function AdminAnalytics() {
  const revenueData = useMemo(generateRevenueData, []);
  const categoryData = useMemo(getCategoryBreakdown, []);
  const topProducts = useMemo(getTopProducts, []);
  const funnelData = useMemo(getFunnelData, []);

  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = totalRevenue / mockOrders.length;
  const totalReviews = reviews.length;
  const conversionRate = ((62 / 1420) * 100).toFixed(1);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-semibold text-foreground/90">Analytics</h1>
        <p className="font-inter text-xs text-foreground/30 mt-1">
          Performance overview (mock data)
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          subtitle="Visitors → Purchases"
        />
        <StatsCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(0)}`}
          icon={ShoppingBag}
          subtitle={`${mockOrders.length} orders`}
        />
        <StatsCard
          title="Total Reviews"
          value={totalReviews}
          icon={Eye}
          subtitle="Avg 4.8 stars"
        />
        <StatsCard
          title="Monthly Visitors"
          value="1,420"
          icon={Users}
          subtitle="Last 30 days (mock)"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="relative bg-dark-3/30 border border-gold/8 p-6">
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t border-l border-gold/20" />
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t border-r border-gold/20" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b border-l border-gold/20" />
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b border-r border-gold/20" />

          <h3 className="font-cinzel text-sm text-foreground/60 mb-6 tracking-wider">
            Revenue — Last 30 Days
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.2)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(201,168,76,0.1)" }}
                  interval={6}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.2)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip contentStyle={customTooltipStyle} formatter={(value) => [`$${value}`, "Revenue"]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C9A84C"
                  strokeWidth={1.5}
                  fill="url(#goldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visitors Chart */}
        <div className="relative bg-dark-3/30 border border-gold/8 p-6">
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t border-l border-gold/20" />
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t border-r border-gold/20" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b border-l border-gold/20" />
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b border-r border-gold/20" />

          <h3 className="font-cinzel text-sm text-foreground/60 mb-6 tracking-wider">
            Daily Visitors
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="burgundyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B0000" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8B0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.2)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(201,168,76,0.1)" }}
                  interval={6}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.2)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={customTooltipStyle} formatter={(value) => [value, "Visitors"]} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8B0000"
                  strokeWidth={1.5}
                  fill="url(#burgundyGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="relative bg-dark-3/30 border border-gold/8 p-6">
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t border-l border-gold/20" />
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t border-r border-gold/20" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b border-l border-gold/20" />
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b border-r border-gold/20" />

          <h3 className="font-cinzel text-sm text-foreground/60 mb-6 tracking-wider">
            Top Products by Revenue
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.2)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
                  tickLine={false}
                  axisLine={false}
                  width={130}
                />
                <Tooltip contentStyle={customTooltipStyle} formatter={(value) => [`$${value}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#C9A84C" radius={[0, 2, 2, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown + Funnel */}
        <div className="relative bg-dark-3/30 border border-gold/8 p-6">
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t border-l border-gold/20" />
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t border-r border-gold/20" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b border-l border-gold/20" />
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b border-r border-gold/20" />

          <h3 className="font-cinzel text-sm text-foreground/60 mb-6 tracking-wider">
            Product Categories
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {categoryData.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5"
                  style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                />
                <span className="font-inter text-[10px] text-foreground/30">
                  {cat.name} ({cat.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="relative bg-dark-3/30 border border-gold/8 p-6">
        <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t border-l border-gold/20" />
        <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t border-r border-gold/20" />
        <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b border-l border-gold/20" />
        <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b border-r border-gold/20" />

        <h3 className="font-cinzel text-sm text-foreground/60 mb-6 tracking-wider">
          Conversion Funnel
        </h3>
        <div className="flex items-end justify-center gap-4 sm:gap-8 h-[200px]">
          {funnelData.map((stage, i) => {
            const maxValue = funnelData[0].value;
            const heightPercent = (stage.value / maxValue) * 100;
            const dropRate =
              i > 0
                ? (((funnelData[i - 1].value - stage.value) / funnelData[i - 1].value) * 100).toFixed(0)
                : null;
            return (
              <div key={stage.stage} className="flex flex-col items-center flex-1 max-w-[120px]">
                {dropRate && (
                  <span className="font-inter text-[9px] text-foreground/15 mb-1">
                    -{dropRate}%
                  </span>
                )}
                <div className="w-full relative" style={{ height: `${heightPercent}%`, minHeight: "20px" }}>
                  <div
                    className="absolute inset-0 rounded-t-sm"
                    style={{ backgroundColor: stage.fill, opacity: 0.7 }}
                  />
                </div>
                <p className="font-inter text-[10px] text-foreground/30 mt-2 text-center">
                  {stage.stage}
                </p>
                <p className="font-cinzel text-sm text-foreground/60">
                  {stage.value.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
