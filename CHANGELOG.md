# Changelog — Gothic Treasures

## [0.6.0] - 2026-03-23

### Added — Blog / Journal ("Tales from the Workshop")
- **Journal listing page** (`/journal`): Category filter (All, Workshop, Culture, Inspiration, Behind the Scenes), featured post hero card with 2-column layout, post grid with cover images, read times, category tags, gold frame corners, hover effects
- **Article pages** (`/journal/[slug]`): Full-width hero image with dark overlay, breadcrumb navigation, custom markdown renderer (H2/H3, bold, italic, bullet lists with gold dots, block quotes), lead excerpt with gold border, author card, previous/next article navigation, share button
- **5 articles** covering craftsmanship, gothic architecture in decor, Notre-Dame gargoyles, Bulgaria shipping process, and the cross in gothic art (5-8 min reads each)
- **SEO**: Per-article metadata with OG/Twitter cards (type: article), JSON-LD BlogPosting schema, journal routes added to sitemap, canonical URLs
- **Navigation**: "Journal" link added to navbar between Shop and About
- Journal data at `src/data/journal.ts` with helper functions (getPostBySlug, getFeaturedPosts, getPostsByCategory)
- `generateStaticParams()` for SSG on all article pages

## [0.5.0] - 2026-03-23

### Added — Section 7.2: Medium-Effort Features
- **Smart Related Products**: Improved algorithm — prioritizes same category + similar price range (within 15/30/50%), prefers in-stock items, adds randomization for variety. Replaces naive same-category-first approach.
- **Order Tracking Page** (`/order/[id]`): Gothic-themed status timeline with 4 stages (Confirmed → Handcrafting → Shipped → Delivered). Animated pulse on active step, order details card with frame corners. Linked from checkout success page. `generateStaticParams` for SSG, noindex for privacy.
- **Real Reviews System**: 12 reviews across 7 products in `src/data/reviews.ts`. Star ratings on product cards (avg rating + count). Full reviews section on product detail pages with "Collector's Verdicts" heading, individual review cards with verified badges, aggregate rating summary. JSON-LD `aggregateRating` added to product schema for SEO.
- **Currency Preview Toggle**: Client-side USD/EUR/GBP conversion with approximate rates. Globe icon dropdown in navbar. Prices update across product cards and detail pages. Shows original USD in parentheses when non-USD selected. "Approximate rates" disclaimer. Zustand store at `src/store/currency.ts`.
- **Social Sharing**: Pinterest "Pin It" button, copy-link with success feedback, native Web Share API (mobile) on product detail pages. Pinterest-optimized sharing URL with product image and description.
- New components: `ProductReviews`, `ShareButtons`, `CurrencyToggle`
- New stores: `src/store/currency.ts`
- New data: `src/data/reviews.ts` (12 reviews, helper functions)
- Updated mock orders with `timeline` field for order tracking

## [0.4.1] - 2026-03-23

### Added — Quick Wins (UX Enhancements)
- **Wishlist / Save for Later**: Heart icon on product cards + detail page, persists to localStorage via Zustand persist middleware. Wishlist page at `/wishlist` with product grid. Heart icon with count badge in navbar.
- **"CLAIMED" Overlay**: Sold-out products show dramatic dark overlay with rotated "CLAIMED" stamp in burgundy. Price shows strikethrough. Quick action buttons hidden for sold items.
- **Recently Sold Ticker**: Animated notification slides in from bottom-left cycling through sold items with randomized time labels ("2 hours ago"). Dismissible via X button (sessionStorage). Hidden on admin/cart/checkout pages.
- **Size Reference**: Visual wall-scale dimension indicator on product detail pages. Parses dimensions string and renders proportional rectangle on a mini wall silhouette.
- Wishlist Zustand store with localStorage persistence (`src/store/wishlist.ts`)

## [0.4.0] - 2026-03-23

### Added — Phase 6: Admin Dashboard
- **Admin Layout** with sidebar navigation (Dashboard, Products, Orders, Settings), mobile hamburger menu, "View Store" link. Admin hides public Navbar/Footer via CSS.
- **Dashboard** (`/admin`): 4 stats cards (Total Products, In Stock, Sold Out, Revenue), recent orders table, quick actions
- **Products** (`/admin/products`): Full product table with image thumbnails, category, price, stock status. Add/Edit product modal form with all fields. Delete confirmation.
- **Orders** (`/admin/orders`): Orders table with expandable rows showing shipping address, email, item breakdown. Status badges (Processing/Shipped/Delivered) with color coding.
- **Settings** (`/admin/settings`): Store info display, Supabase + Stripe integration placeholders (Coming Soon)
- Mock order data (6 orders) in `src/data/mock-orders.ts`
- Reusable `StatsCard` component, `ProductFormModal` with full product form, `AdminSidebar` with active state highlighting

## [0.3.1] - 2026-03-23

### Added — Phase 5: Polish + Extras
- **Loading skeletons** for shop, product detail, and category pages with gothic frame corners and pulse animations
- **Scroll-to-top** on route navigation (instant reset)
- **Back-to-top button** — floating gothic-styled button appears after 500px scroll, smooth scroll back
- **Skip-to-content** link for keyboard accessibility
- **Focus-visible styles** — gold outline on all interactive elements for keyboard navigation
- **Cart in mobile menu** — cart button with badge count added to mobile slide-in navigation
- **Horizontal scroll** on category filter buttons for mobile screens
- **iOS zoom prevention** — inputs forced to 16px on mobile to prevent auto-zoom
- **Aria-labels** on icon-only buttons (cart, menu toggle, close, back-to-top)
- **Pexels** added to `next.config.ts` remotePatterns
- Deleted unused 3.2MB pexels image from public/images

## [0.3.0] - 2026-03-23

### Added — Phase 4: SEO + Performance
- **Per-page metadata** for all routes via title template (`%s — Gothic Treasures`)
- **Dynamic metadata** (`generateMetadata()`) for product and category pages with unique titles, descriptions, OG/Twitter cards
- **OpenGraph + Twitter** metadata on root layout with branded OG image
- **robots.ts** — programmatic robots.txt (allows all, disallows /admin, /cart, /checkout)
- **sitemap.ts** — programmatic XML sitemap with all static routes, products, and categories
- **JSON-LD structured data** — Organization + WebSite on root, Product schema on product detail pages
- **Custom 404 page** — gothic-styled "Lost in the Shadows" not-found page
- **OG image** (`public/og-image.jpg`) — branded social sharing image
- Canonical URLs on all pages
- Cart/checkout pages set `noindex, nofollow`
- Server layouts for `'use client'` pages to enable metadata exports
- Removed unused old hero image (cathedral-in-moonlight-stockcake.webp)

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
