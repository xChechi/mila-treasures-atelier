import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/cart", "/checkout"],
      },
    ],
    sitemap: "https://milatreasuresatelier.com/sitemap.xml",
  };
}
