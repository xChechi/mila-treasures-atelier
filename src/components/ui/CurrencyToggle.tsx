"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe } from "lucide-react";
import { useCurrencyStore, type Currency } from "@/store/currency";

const currencies: { code: Currency; label: string; symbol: string }[] = [
  { code: "USD", label: "USD", symbol: "$" },
  { code: "EUR", label: "EUR", symbol: "\u20AC" },
  { code: "GBP", label: "GBP", symbol: "\u00A3" },
];

export default function CurrencyToggle() {
  const [open, setOpen] = useState(false);
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  const current = currencies.find((c) => c.code === currency)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change currency"
        className="flex items-center gap-1.5 px-3 py-1.5 text-foreground/60 hover:text-gold-light transition-colors duration-300 font-inter text-xs tracking-wider"
      >
        <Globe size={14} className="text-gold/40" />
        <span>{current.symbol} {current.code}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 bg-dark-2/98 backdrop-blur-md border border-gold/15 shadow-xl z-50 min-w-[120px]"
          >
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left font-inter text-xs tracking-wider flex items-center gap-2 transition-colors ${
                  currency === c.code
                    ? "text-gold bg-gold/5"
                    : "text-foreground/50 hover:text-gold-light hover:bg-gold/5"
                }`}
              >
                <span className="w-4 text-center">{c.symbol}</span>
                <span>{c.label}</span>
                {currency === c.code && (
                  <span className="ml-auto w-1.5 h-1.5 bg-gold/60 rounded-full" />
                )}
              </button>
            ))}
            <div className="px-4 py-2 border-t border-gold/5">
              <p className="font-inter text-[9px] text-foreground/15 leading-relaxed">
                Approximate rates. All prices charged in USD.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
