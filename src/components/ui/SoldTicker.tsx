"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { X, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

const soldProducts = products.filter((p) => !p.inStock);

function getRandomTime() {
  const options = [
    "12 minutes ago",
    "37 minutes ago",
    "1 hour ago",
    "2 hours ago",
    "3 hours ago",
    "5 hours ago",
    "8 hours ago",
    "yesterday",
  ];
  return options[Math.floor(Math.random() * options.length)];
}

const hiddenPaths = ["/admin", "/cart", "/checkout"];

export default function SoldTicker() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLabel, setTimeLabel] = useState("");

  const shouldHide =
    dismissed || hiddenPaths.some((p) => pathname.startsWith(p)) || soldProducts.length === 0;

  const showNext = useCallback(() => {
    if (shouldHide) return;
    setTimeLabel(getRandomTime());
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % soldProducts.length);
    }, 5000);
  }, [shouldHide]);

  useEffect(() => {
    if (shouldHide) return;

    // First appearance after 6 seconds
    const initial = setTimeout(showNext, 6000);

    // Then every 12 seconds
    const interval = setInterval(showNext, 12000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [shouldHide, showNext]);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("sold-ticker-dismissed");
    if (wasDismissed) setDismissed(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("sold-ticker-dismissed", "1");
  };

  if (shouldHide) return null;

  const product = soldProducts[currentIndex];

  return (
    <AnimatePresence>
      {visible && product && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.4 }}
          className="fixed bottom-6 left-6 z-30 max-w-xs bg-dark-2/95 backdrop-blur-sm border border-gold/15 p-4 shadow-lg"
        >
          <button
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            className="absolute top-2 right-2 p-1 text-foreground/20 hover:text-foreground/50 transition-colors"
          >
            <X size={12} />
          </button>
          <div className="flex items-start gap-3 pr-4">
            <ShoppingBag size={16} className="text-burgundy/70 mt-0.5 shrink-0" />
            <div>
              <p className="font-inter text-xs text-foreground/60 leading-relaxed">
                <span className="text-gold-light/80 font-medium">{product.name}</span>
                {" "}was claimed {timeLabel}
              </p>
              <p className="font-inter text-[10px] text-foreground/25 mt-1">
                Each piece is one-of-a-kind
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
