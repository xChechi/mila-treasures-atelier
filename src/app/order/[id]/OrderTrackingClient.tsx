"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Clock, Package, Truck, Home, ArrowLeft } from "lucide-react";
import type { Order, OrderTimelineEvent } from "@/data/mock-orders";
import Breadcrumb from "@/components/ui/Breadcrumb";

const statusIcons = {
  confirmed: CheckCircle,
  crafting: Package,
  shipped: Truck,
  delivered: Home,
};

function TimelineStep({
  event,
  index,
  isLast,
}: {
  event: OrderTimelineEvent;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = statusIcons[event.status];
  const isCurrent = event.completed && !isLast;
  const isPending = !event.completed;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative flex gap-6"
    >
      {/* Vertical line + icon */}
      <div className="flex flex-col items-center">
        <div
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
            event.completed
              ? "border-gold/60 bg-gold/10"
              : "border-foreground/10 bg-dark-3/50"
          }`}
        >
          {event.completed ? (
            <Icon size={20} className="text-gold/80" />
          ) : (
            <Clock size={20} className="text-foreground/20" />
          )}
          {/* Glow on completed */}
          {event.completed && (
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-md" />
          )}
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="w-px flex-1 min-h-[60px] relative overflow-hidden">
            <div
              className={`absolute inset-0 ${
                event.completed
                  ? "bg-gradient-to-b from-gold/40 to-gold/10"
                  : "bg-gradient-to-b from-foreground/10 to-foreground/5"
              }`}
            />
            {/* Animated pulse on active step */}
            {isCurrent && (
              <motion.div
                className="absolute w-full h-4 bg-gradient-to-b from-gold/60 to-transparent"
                animate={{ y: ["0%", "1500%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 ${isLast ? "pb-0" : ""}`}>
        <h3
          className={`font-cinzel text-lg tracking-wide mb-1 ${
            event.completed ? "text-foreground/90" : "text-foreground/30"
          }`}
        >
          {event.label}
        </h3>
        <p
          className={`font-inter text-sm leading-relaxed mb-2 ${
            event.completed ? "text-foreground/50" : "text-foreground/20"
          }`}
        >
          {event.description}
        </p>
        {event.date ? (
          <p className="font-inter text-xs text-gold/50 tracking-wider">
            {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        ) : (
          <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/15">
            Pending
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function OrderTrackingClient({ order }: { order: Order }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  const statusLabel =
    order.status === "processing"
      ? "In Progress"
      : order.status === "shipped"
      ? "On Its Way"
      : "Delivered";

  const statusColor =
    order.status === "processing"
      ? "text-gold/70 border-gold/30 bg-gold/5"
      : order.status === "shipped"
      ? "text-blue-400/70 border-blue-400/30 bg-blue-400/5"
      : "text-emerald-400/70 border-emerald-400/30 bg-emerald-400/5";

  return (
    <section className="relative min-h-screen gothic-bg">
      <div className="relative pt-32 pb-20 px-6 lg:px-8 max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: `Order ${order.orderNumber}` },
          ]}
        />

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-[10px] tracking-[0.6em] uppercase text-gold/40 mb-4">
            Order Tracking
          </p>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-semibold text-foreground/90 mb-4">
            {order.orderNumber}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <span
            className={`inline-block px-4 py-1.5 border text-xs tracking-[0.15em] uppercase font-inter ${statusColor}`}
          >
            {statusLabel}
          </span>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-xl mx-auto mb-16">
          {order.timeline.map((event, i) => (
            <TimelineStep
              key={event.status}
              event={event}
              index={i}
              isLast={i === order.timeline.length - 1}
            />
          ))}
        </div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative bg-dark-3/50 border border-gold/10 p-8 sm:p-10 max-w-xl mx-auto"
        >
          {/* Frame corners */}
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-gold/30" />
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-gold/30" />
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-gold/30" />
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-gold/30" />

          <h2 className="font-cinzel text-lg text-foreground/80 mb-6 tracking-wide">
            Order Details
          </h2>

          <div className="space-y-4 mb-6">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gold/5 last:border-0"
              >
                <span className="font-inter text-sm text-foreground/60">
                  {item.productName}
                </span>
                <span className="font-cinzel text-sm text-gold/60">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gold/10">
            <span className="font-inter text-xs tracking-[0.15em] uppercase text-foreground/30">
              Total
            </span>
            <span className="font-cinzel text-xl text-gold/80">
              ${order.total.toFixed(2)}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-gold/5">
            <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/20 mb-1">
              Shipping To
            </p>
            <p className="font-inter text-sm text-foreground/40">
              {order.shippingAddress}
            </p>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-inter text-sm text-foreground/30 hover:text-gold-light transition-colors duration-300 tracking-wider"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
