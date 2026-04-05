"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

const ETSY_SHOP = "https://www.etsy.com/shop/MilaTreasuresAtelier";

const footerLinks = {
  shop: [
    { label: "Églomisé Art", href: "/shop?category=eglomise-art" },
    { label: "Framed Art & Decor", href: "/shop?category=framed-art" },
    { label: "Trinket Boxes", href: "/shop?category=trinket-boxes" },
    { label: "Sculptures & Decor", href: "/shop?category=sculptures-decor" },
  ],
  company: [
    { label: "About Milena", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Journal", href: "/journal" },
    { label: "Shop on Etsy", href: ETSY_SHOP, external: true },
  ],
};

function WroughtIronGate() {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 120"
        className="w-full h-20 sm:h-24"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="0" y="55" width="1200" height="2" fill="rgba(201,168,76,0.12)" />
        <rect x="0" y="60" width="1200" height="1" fill="rgba(201,168,76,0.06)" />
        {[0, 150, 300, 450, 600, 750, 900, 1050].map((x) => (
          <g key={x}>
            <path
              d={`M${x + 15},56 L${x + 15},25 Q${x + 15},5 ${x + 75},5 Q${x + 135},5 ${x + 135},25 L${x + 135},56`}
              stroke="rgba(201,168,76,0.1)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d={`M${x + 30},56 L${x + 30},30 Q${x + 30},12 ${x + 75},12 Q${x + 120},12 ${x + 120},30 L${x + 120},56`}
              stroke="rgba(201,168,76,0.06)"
              strokeWidth="1"
              fill="none"
            />
            <line x1={x + 55} y1="56" x2={x + 55} y2="15" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" />
            <line x1={x + 75} y1="56" x2={x + 75} y2="8" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />
            <line x1={x + 95} y1="56" x2={x + 95} y2="15" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" />
            <path d={`M${x + 75},8 L${x + 72},3 L${x + 75},0 L${x + 78},3 Z`} fill="rgba(201,168,76,0.1)" />
          </g>
        ))}
        <circle cx="600" cy="56" r="6" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
        <circle cx="600" cy="56" r="2" fill="rgba(201,168,76,0.1)" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-1/50 to-transparent pointer-events-none" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-dark-1">
      <WroughtIronGate />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h3 className="font-cinzel text-xl font-bold tracking-[0.12em] text-gold-light/80 mb-1">
                Mila Treasures
              </h3>
              <p className="font-inter text-[9px] tracking-[0.35em] uppercase text-gold/30 mb-4">Atelier</p>
            </Link>
            <p className="font-inter text-sm text-foreground/35 leading-relaxed max-w-xs mb-5">
              Handcrafted one-of-a-kind pieces — jewel-toned goblets, original
              paintings, ornate trinket boxes, and botanical decor. Made with
              love in Bulgaria.
            </p>
            <a
              href={ETSY_SHOP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-inter tracking-[0.15em] uppercase text-gold/50 hover:text-gold-light transition-colors duration-300"
            >
              Visit Etsy Shop
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-gold/50 mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-foreground/35 hover:text-gold-light/70 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-gold/50 mb-6">
              Studio
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-inter text-sm text-foreground/35 hover:text-gold-light/70 transition-colors duration-300"
                    >
                      {link.label}
                      <ExternalLink size={10} className="opacity-50" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-foreground/35 hover:text-gold-light/70 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-foreground/20">
            &copy; {new Date().getFullYear()} Mila Treasures Atelier. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-inter text-xs text-foreground/20">
              Handcrafted in Bulgaria
            </span>
            <span className="text-gold/15">|</span>
            <span className="font-inter text-xs text-foreground/20">
              Ships Worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
