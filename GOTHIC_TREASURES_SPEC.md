# Gothic Treasures — Full Project Specification

## Overview
Handmade Gothic Home Wall Decor Ecommerce — a premium online shop for unique, handcrafted gothic home decor pieces. Each item is one-of-a-kind, made in Bulgaria and shipped to the USA.

## Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger
- **State:** Zustand
- **UI:** Custom components (shadcn/ui style), Lucide icons
- **Backend:** Supabase (Phase 2) — PostgreSQL, Auth, Storage
- **Payments:** Stripe (Phase 2)
- **Deployment:** Vercel

## Design Direction
- **Aesthetic:** Dark gothic elegance — NOT horror. Think cathedral atmosphere, candlelit galleries, dark romanticism
- **Theme:** Dark only — no light mode
- **Colors:** Deep blacks (#0a0a0a, #111, #1a1a1a), burgundy (#8B0000, #722F37), antique gold (#C9A84C, #E8C57A), aged silver (#8A8D8F), candlelight (#E8C57A)
- **Fonts:** Cinzel (serif headers), Playfair Display (accents), Inter (body)
- **Atmosphere:** Scroll-driven animations, parallax, floating particles, candle glow effects, gothic ornamental dividers

## Product Model
- Each piece is UNIQUE — stock is 0 (sold) or 1 (available)
- No variants, no sizes, no colors — each product is a single SKU
- 4 categories: Wall Crosses, Gargoyles & Sculptures, Gothic Mirrors, Candle Holders
- Target: 30-100 products at scale

## Business Rules
- **Currency:** USD
- **Language:** English only
- **Checkout:** Guest only — no customer accounts/registration
- **Shipping:** Bulgaria → USA
- **Payments:** Stripe (Phase 2)

## Resolved Questions
- Domain: TBD (build locally first)
- No product variants — binary stock (available / sold)
- Guest checkout only
- No i18n needed
- US shipping address format

## Phases
1. **Phase 1:** Foundation + stunning landing page + page shells (CURRENT)
2. **Phase 2:** Full shop, product pages, cart, checkout (Supabase + Stripe)
3. **Phase 3:** Admin dashboard, order management, analytics
4. **Phase 4:** SEO, performance, launch prep
