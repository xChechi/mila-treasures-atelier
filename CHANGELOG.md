# Changelog — Gothic Treasures

## [0.2.1] - 2026-03-23

### Added — Phase 3: About + Contact Pages
- **About Page** (`/about`): Parallax hero banner, origin story narrative, 3-column "Our Craft" feature grid (Handcrafted, Unique Materials, One of a Kind), stats bar, Shipping & Returns info with 3 detailed sections (Shipping, Returns, Guarantee)
- **Contact Page** (`/contact`): Contact form (name, email, subject dropdown, message), info sidebar (email, response time, workshop location), FAQ accordion with 4 expandable items, mock submit with animated success state
- Both pages use `gothic-bg` textured background, scroll-triggered animations, gothic frame corners

## [0.2.0] - 2026-03-23

### Added — Phase 2: Full Frontend Pages
- **Shop Page** (`/shop`): Full product grid with search, category filters, and sort (price, name)
- **Product Detail Page** (`/shop/[slug]`): Image gallery with gothic frame, specs table (material, dimensions, weight), 3-state add-to-cart (Add / In Cart / Sold Out), related products section
- **Category Page** (`/category/[slug]`): Filtered product grid by category, breadcrumb navigation, sort controls
- **Cart Page** (`/cart`): Full cart with item management, animated item removal, order summary sidebar, empty state
- **Checkout Page** (`/checkout`): Guest checkout with shipping form (US address format), form validation, order summary, mock order confirmation with animated success state
- **Shared Components:**
  - `ProductCard` — extracted from landing page with 3D tilt, gothic frame, spotlight, "In Cart" state
  - `ProductGrid` — responsive animated grid wrapper
  - `ShopFilters` — search input, category filter buttons, sort dropdown
  - `ProductGallery` — image gallery with gothic frame and thumbnail strip
  - `RelatedProducts` — "You May Also Like" section
  - `Breadcrumb` — animated breadcrumb navigation
  - `PageHeader` — reusable gothic section header with ornament divider
  - `CheckoutForm` — validated shipping form with US states
  - `OrderSummary` — compact cart summary for checkout
- **Data Helpers** (`src/lib/products.ts`): getProductBySlug, getProductsByCategory, getRelatedProducts, getCategoryBySlug, sortProducts, filterProducts
- **next.config.ts**: Added `images.remotePatterns` for Unsplash
- Next.js 16 async params pattern (`await params`) on all dynamic routes
- `generateStaticParams()` for SSG on product and category pages

## [0.1.0] - 2026-03-20

### Added
- Next.js 16 project with TypeScript and App Router
- Tailwind CSS v4 with gothic theme (dark blacks, burgundy, gold, silver)
- Custom fonts: Cinzel, Playfair Display, Inter
- Framer Motion + GSAP for animations
- Zustand for state management (cart store)
- **Landing Page** with 6 atmospheric sections:
  - Hero: Cinematic cathedral background, floating particles, candle flames, parallax scroll, shimmer gold text
  - Featured Products: 4 product cards with gothic frames, hover spotlight, add-to-cart actions
  - Categories: 4 category cards (Wall Crosses, Gargoyles, Mirrors, Candle Holders)
  - Brand Story: Parallax background, ornate image framing, brand stats
  - Testimonials: Gothic-themed review cards with quote styling
  - Newsletter: "Join the Dark Side" email capture
- **Layout Components:**
  - Navbar: Transparent → blur on scroll, gothic branding, mobile slide-in menu
  - Footer: Ornamental gold divider, collection links, company info
  - Cart Drawer: Slide-in cart with item management
- **Page Shells:** /shop, /shop/[slug], /category/[slug], /cart, /checkout, /about, /contact, /admin
- **Global CSS:** Gothic scrollbar, ornamental dividers, candle glow animation, fog drift, floating particles, spotlight hover, gothic frame borders, gold shimmer text, vignette effect
- Mock product data with 8 products and 4 testimonials
