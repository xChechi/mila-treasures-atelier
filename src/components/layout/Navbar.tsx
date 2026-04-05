"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";

const ETSY_SHOP = "https://www.etsy.com/shop/MilaTreasuresAtelier";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark-1/90 backdrop-blur-md border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <span className="text-xl lg:text-2xl font-cinzel font-bold tracking-[0.12em] text-gold-light group-hover:text-gold transition-colors duration-300">
                  Mila
                </span>
                <span className="text-xl lg:text-2xl font-cinzel font-light tracking-[0.12em] text-foreground/80 ml-2">
                  Treasures
                </span>
                <span className="block text-[9px] font-inter font-medium tracking-[0.35em] uppercase text-gold/60 mt-0.5">
                  Atelier
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-gold/80 via-gold-light to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative font-inter text-sm tracking-[0.2em] uppercase text-foreground/90 hover:text-gold-light transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* Shop on Etsy CTA */}
              <a
                href={ETSY_SHOP}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 border border-burgundy/60 bg-burgundy/10 hover:bg-burgundy/80 transition-all duration-300"
              >
                <span className="font-inter text-xs tracking-[0.15em] uppercase text-foreground/80 group-hover:text-white transition-colors duration-300">
                  Shop on Etsy
                </span>
                <ExternalLink size={12} className="text-gold/50 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-4">
              <a
                href={ETSY_SHOP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 border border-burgundy/50 bg-burgundy/10"
              >
                <span className="font-inter text-[10px] tracking-[0.15em] uppercase text-foreground/70">Etsy</span>
                <ExternalLink size={10} className="text-gold/50" />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="p-2 text-foreground/90"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-80 bg-dark-2/98 backdrop-blur-xl z-50 border-l border-gold/10 md:hidden"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-foreground/70"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-cinzel text-xl tracking-[0.2em] text-foreground/80 hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <a
                  href={ETSY_SHOP}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 border border-burgundy/60 bg-burgundy/20 font-cinzel text-base tracking-[0.15em] text-foreground/80 hover:text-white transition-colors"
                >
                  Shop on Etsy
                  <ExternalLink size={14} className="text-gold/50" />
                </a>
              </motion.div>
            </div>
            {/* Gothic ornament at bottom */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
              <div className="gothic-divider w-40">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold/40">
                  <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
