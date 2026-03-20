"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  shop: [
    { label: "Wall Crosses", href: "/category/wall-crosses" },
    { label: "Gargoyles & Sculptures", href: "/category/gargoyles-sculptures" },
    { label: "Gothic Mirrors", href: "/category/gothic-mirrors" },
    { label: "Candle Holders", href: "/category/candle-holders" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping Info", href: "/about" },
    { label: "Returns", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-dark-1 border-t border-gold/10">
      {/* Gothic ornamental divider */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h3 className="font-cinzel text-2xl font-bold tracking-[0.15em] text-gold-light mb-4">
                Gothic Treasures
              </h3>
            </Link>
            <p className="font-inter text-sm text-foreground/50 leading-relaxed max-w-xs">
              Handcrafted gothic home decor, shipped from our workshop in
              Bulgaria to doorsteps across the United States. Every piece tells
              a story of dark elegance.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-cinzel text-sm tracking-[0.3em] uppercase text-gold/80 mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-foreground/50 hover:text-gold-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-cinzel text-sm tracking-[0.3em] uppercase text-gold/80 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-foreground/50 hover:text-gold-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Gothic Treasures. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-inter text-xs text-foreground/30">
              Handcrafted in Bulgaria
            </span>
            <span className="text-gold/20">|</span>
            <span className="font-inter text-xs text-foreground/30">
              Ships to USA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
