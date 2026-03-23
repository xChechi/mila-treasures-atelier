"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gold/10">
        <Link href="/admin" className="block">
          <span className="font-cinzel text-lg font-bold tracking-[0.1em] text-gold-light">
            Gothic
          </span>
          <span className="font-cinzel text-lg font-light tracking-[0.1em] text-foreground/60 ml-1.5">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-6 py-3 font-inter text-sm transition-all duration-200 ${
              isActive(item.href)
                ? "text-gold-light bg-gold/5 border-r-2 border-gold/50"
                : "text-foreground/40 hover:text-foreground/70 hover:bg-dark-3/30"
            }`}
          >
            <item.icon size={18} strokeWidth={1.5} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Back to store */}
      <div className="p-4 border-t border-gold/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-2 font-inter text-xs text-foreground/25 hover:text-foreground/50 transition-colors"
        >
          <ExternalLink size={14} />
          View Store
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-56 bg-dark-2 border-r border-gold/8 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-dark-2 border-b border-gold/8 z-40 flex items-center justify-between px-4">
        <Link href="/admin">
          <span className="font-cinzel text-base font-bold tracking-[0.1em] text-gold-light">
            Gothic
          </span>
          <span className="font-cinzel text-base font-light text-foreground/60 ml-1">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="p-2 text-foreground/60"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-56 bg-dark-2 border-r border-gold/8 z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
