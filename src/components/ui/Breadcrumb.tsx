"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Breadcrumb"
      className="mb-8"
    >
      <ol className="flex items-center gap-1.5 font-inter text-xs text-foreground/30">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={10} className="text-foreground/15" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gold-light transition-colors duration-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/50">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
