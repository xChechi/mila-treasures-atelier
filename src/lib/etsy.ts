export const ETSY_SHOP_URL = "https://www.etsy.com/shop/MilaTreasuresAtelier";

export function etsyLink(url: string, source: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}ref=milasite&utm_source=milasite&utm_medium=web&utm_campaign=${encodeURIComponent(source)}`;
}
