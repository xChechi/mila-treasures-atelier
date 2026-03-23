import { create } from "zustand";

export type Currency = "USD" | "EUR" | "GBP";

interface CurrencyState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

// Approximate exchange rates (static — no API call needed)
const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
};

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "\u20AC",
  GBP: "\u00A3",
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "USD",
  setCurrency: (currency) => set({ currency }),
}));

export function convertPrice(usdPrice: number, currency: Currency): number {
  return usdPrice * RATES[currency];
}

export function formatPrice(usdPrice: number, currency: Currency): string {
  const converted = convertPrice(usdPrice, currency);
  return `${SYMBOLS[currency]}${converted.toFixed(2)}`;
}

export function getCurrencySymbol(currency: Currency): string {
  return SYMBOLS[currency];
}
