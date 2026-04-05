export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: "Workshop" | "Culture" | "Inspiration" | "Behind the Scenes";
  author: string;
  date: string;
  readTime: number;
  featured: boolean;
}

export const journalPosts: JournalPost[] = [
  {
    id: "1",
    slug: "the-art-of-eglomise",
    title: "The Art of Églomisé: Painting Behind Glass",
    excerpt:
      "An 18th-century French technique where art lives beneath the glass surface, merging with mirror fragments to create something that shifts with the light. Here's how it works.",
    content: `You're looking at a mirror. Then you're looking through it. Then you're not sure which world you're in. That's églomisé — and it's been unsettling people in the most beautiful way since the 1700s.

## What Is Églomisé?

Églomisé (pronounced ay-glo-mee-ZAY) is a decorative technique where parts of a mirror's reflective backing are carefully removed by hand, and an image is painted or applied beneath the glass surface. The result is part mirror, part artwork — a piece where your room and the painted scene coexist in the same frame.

The name comes from Jean-Baptiste Glomy, a French art dealer in the 18th century who popularized the technique, though the method is much older. Ancient Romans decorated gold leaf under glass, and the technique flourished throughout Renaissance Italy before Glomy gave it his name.

## How Milena Uses It

At Mila Treasures Atelier, the traditional technique is adapted for a gothic aesthetic. Each piece begins with a mirror — the reflective surface is hand-scraped in specific areas to create a distressed, aged effect. Then the artwork is applied beneath the glass using foil transfers and specialized mirror spray.

The Haunted Castle Églomisé Mirror, for instance, features a gothic castle scene embedded inside the glass itself. The castle's lit windows, crescent moon, and twisted bare trees live permanently beneath the surface, while the remaining mirror fragments reflect your room around them. The effect cannot be properly photographed — it must be seen in shifting light to understand.

The Dark Raven Queen Mirror Art uses the same approach: the figure of a dark queen with ravens dissolves into the mirror fragments, so she appears to watch the room with eyes that follow the candlelight.

## Why It Matters

In an age when "art" often means a printed canvas from a factory, églomisé is stubbornly handmade. Every piece requires hours of careful scraping, painting, and finishing. One wrong move with the scraper and the entire mirror is ruined.

The technique also produces something genuinely unique — because the mirror fragments break differently each time, no two églomisé pieces can ever be identical. The art and the mirror dance together, and that dance is unrepeatable.

## Living With Églomisé

A few things to know if you're considering an églomisé piece:

- **Light matters.** These pieces change dramatically depending on the light source. Candlelight makes them glow. Daylight makes them shimmer. They are never static.
- **Placement matters.** Hang them where they can catch both direct and ambient light. Opposite a window or near a candle is ideal.
- **They're mirrors too.** The remaining reflective surface is functional — you'll catch glimpses of yourself alongside the painted scene. That's not a flaw; it's the point.`,
    coverImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200&q=80",
    category: "Workshop",
    author: "Mila Treasures Atelier",
    date: "2026-03-20",
    readTime: 5,
    featured: true,
  },
  {
    id: "2",
    slug: "dark-fairy-tales-in-art",
    title: "Dark Fairy Tales: The Art of Beautiful Darkness",
    excerpt:
      "Before Disney softened the edges, fairy tales were dark, strange, and dangerous. That original darkness is what makes them powerful — and what inspires our most striking pieces.",
    content: `The witch extends her hand. The apple gleams — crimson and heavy with consequence. In the original Brothers Grimm version, the queen doesn't just offer a poisoned apple. She visits Snow White three times, each attempt more cunning than the last. The apple is her masterpiece of malice.

This is the world our Dark Fairy Tale Mirror Art inhabits — not the sanitized Disney retelling, but the original stories where forests are genuinely dangerous, magic has a price, and beauty is always entangled with darkness.

## The Original Stories

The fairy tales most people know have been filtered through layers of family-friendly adaptation. The originals are different:

**Snow White** (Grimm, 1812) — The evil queen is forced to dance in red-hot iron shoes at Snow White's wedding until she collapses. The story isn't about a prince's kiss; it's about vanity, obsession, and the price of beauty.

**Sleeping Beauty** (Perrault, 1697) — In earlier versions, the princess isn't woken by a kiss. The story involves abandonment, fire, and a mother-in-law who wants to eat her grandchildren. The thorny hedge that grows around the castle kills multiple princes before the right one arrives.

**The Little Mermaid** (Andersen, 1837) — She doesn't marry the prince. Every step on her new human legs feels like walking on knives. She dissolves into sea foam. The Disney version omits... quite a lot.

## Why Darkness Works in Art

Dark fairy tales resonate because they tell emotional truths that bright, sanitized versions avoid. They acknowledge that the world contains danger, that choices have consequences, that beauty and horror often occupy the same space.

This is exactly what makes them powerful as visual art. The Dark Fairy Tale Mirror Art captures the moment of temptation — the witch's outstretched hand, the gleaming apple, the innocent girl at the window. Only the red apples bleed into full colour against the black-and-white composition. Each apple feels like a choice you cannot take back.

The ornate black frame carries its own narrative through hand-sculpted 3D elements: a baroque rose with scrollwork, a grandfather clock frozen in time, a gothic chapel spire, a skeletal hand clutching antique keys. Every detail belongs to the same dark story.

## The Gothic Fairy Tale Aesthetic

What distinguishes "gothic fairy tale" from other dark aesthetics is its insistence on beauty. Gothic darkness is never ugly — it's beautiful in a way that makes you slightly uneasy. The ornate frames, the metallic patinas, the careful composition — these are not horror pieces. They're fairy tales told honestly.

This is the tradition Mila Treasures Atelier works within. Every piece tells a story that existed long before we learned to soften the endings.`,
    coverImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
    category: "Inspiration",
    author: "Mila Treasures Atelier",
    date: "2026-03-18",
    readTime: 6,
    featured: true,
  },
  {
    id: "3",
    slug: "sculpting-with-polymer-clay",
    title: "Building Worlds in Polymer Clay",
    excerpt:
      "How roses, ravens, dragons, and gothic towers emerge from polymer clay to become the sculpted 3D elements on our frames, boxes, and art books.",
    content: `It starts with a block of polymer clay, a set of sculpting tools, and an image that won't leave your head. Four hours later, a dragon perches on a stack of forbidden tomes, or a baroque rose blooms from the corner of a dark frame. This is how Milena builds the worlds that live on the surface of each piece.

## The Material

Polymer clay is a synthetic modelling material that remains soft and workable at room temperature, then hardens permanently when baked in a standard oven at around 130°C. Unlike natural clay, it doesn't require a kiln, doesn't shrink significantly during curing, and can be worked in extraordinarily fine detail.

For the pieces at Mila Treasures Atelier, polymer clay is the primary sculpting medium for the 3D elements that transform a frame or box from ordinary to extraordinary. The roses on the Gothic Heart Trinket Box, the dragon on the Gothic Dragon Trinket Box, the enchantress and raven on the Gothic Enchantress Art Book — all begin as raw polymer clay.

## The Process

**Armature.** For larger elements like the dragon or the enchantress figure, Milena starts with a wire or foil armature — a rough skeleton that gives the sculpture structural support and keeps it lightweight.

**Rough shaping.** The basic form is built up in layers. At this stage, proportions matter more than detail. A dragon's wing needs to sweep at the right angle. A rose needs the right number of petals to look natural without being botanical.

**Detail work.** This is where the magic happens — and where the hours disappear. Scales are pressed one by one into the dragon's body. Rose petals are thinned at the edges to catch light. The enchantress's flowing robes are textured with fabric-like folds. Sculpting tools, dental picks, and sometimes just fingertips create the textures.

**Baking.** Once the sculpting is complete, the piece goes into the oven. Temperature control is critical — too hot and the clay burns or bubbles; too cool and it remains brittle.

**Finishing.** After baking, each sculpted element is painted with multiple layers of acrylic and metallic paints. The aged bronze patina on the fairy tale frame, the teal verdigris on the dragon box, the iridescent green on the heart box — these finishes transform polymer clay into something that looks like it was forged from metal centuries ago.

## Why Hand-Sculpted Matters

Resin casting from a mould can replicate a shape a thousand times. Hand sculpting cannot. Every dragon Milena sculpts has slightly different wing angles, different claw positions, a different tilt of the head. Every rose has petals that opened differently.

This is not inefficiency — it's the whole point. When you pick up a trinket box and run your finger over the sculpted lid, you're touching something that was shaped specifically for that piece. No mould. No machine. Just hands, tools, and time.`,
    coverImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80",
    category: "Workshop",
    author: "Mila Treasures Atelier",
    date: "2026-03-15",
    readTime: 6,
    featured: false,
  },
  {
    id: "4",
    slug: "from-bulgaria-with-darkness",
    title: "From Bulgaria with Darkness: How We Ship Art",
    excerpt:
      "How a handmade églomisé mirror or sculpted trinket box travels from a workshop in Bulgaria to your shelf — and arrives in perfect condition.",
    content: `Every Mila Treasures Atelier order begins its journey in Bulgaria and ends at a doorstep somewhere in the world. That's potentially thousands of miles, customs checkpoints, and days of transit for pieces that are, by nature, fragile and one-of-a-kind. Here's how we make sure your piece arrives exactly as it left the workshop.

## Why Shipping Handmade Art Is Different

A printed canvas in a standard frame can survive rough handling — it's flat, uniform, and replaceable. Our pieces are none of those things. An églomisé mirror has glass that can crack. A trinket box has sculpted polymer clay elements that can snap. A framed art piece has 3D resin sculptures protruding from the surface. Each piece requires custom protection.

## The Packing Process

**Layer 1 — Soft Wrap.** Each piece is first wrapped in acid-free tissue paper. This protects the painted patina finishes — standard bubble wrap can leave impressions on metallic and acrylic surfaces.

**Layer 2 — Sculpted Element Protection.** Any protruding 3D elements — roses, figures, dragon wings — are individually cushioned with soft foam padding secured with tissue. This is the most time-consuming step and the most important.

**Layer 3 — Rigid Shell.** The wrapped piece goes into a fitted inner box with foam inserts cut to match its exact shape. Not generic packing peanuts — actual contoured padding.

**Layer 4 — Outer Box.** The inner box is placed inside a larger shipping box with shock-absorbing fill between the two layers. This double-box method is the industry standard for shipping art and antiques.

## Customs and Delivery

We ship worldwide through Etsy's Global shipping network. Each piece is declared as handmade decorative art, with photos and descriptions included for customs clearance. Delivery times vary by destination — typically 5-14 business days for international orders.

Every shipment includes tracking, and we photograph each piece before packing so there's never a question about condition at departure.

## Our Track Record

Handmade means irreplaceable. If something arrives damaged despite our precautions, we work with the buyer immediately to resolve it — whether that means repair guidance, partial refund, or in some cases, creating a new piece. But our packing protocol has been refined through many shipments, and damage is extremely rare.

There's something satisfying about tracking a gothic dragon box as it travels from Sofia to someone's shelf in Portland or London. The craft is ancient; the logistics are not.`,
    coverImage:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    category: "Behind the Scenes",
    author: "Mila Treasures Atelier",
    date: "2026-03-12",
    readTime: 5,
    featured: false,
  },
  {
    id: "5",
    slug: "styling-gothic-art-at-home",
    title: "Styling Gothic Art in Your Home",
    excerpt:
      "You don't need a castle. Here's how to display églomisé mirrors, sculpted trinket boxes, and dark framed art in a modern space without it feeling like a theme park.",
    content: `The question we hear most often isn't "do you ship internationally?" — it's "how do I display this without my living room looking like a Halloween store?" Fair question. Here's the answer.

## The Single Statement Rule

The most common mistake in gothic decor is overcrowding. One dramatic piece — a large églomisé mirror, an ornate framed fairy tale scene, a sculptural candle holder — will have ten times the impact of five small items clustered together. Let each piece breathe.

The Haunted Castle Églomisé Mirror, for instance, works best as the sole dramatic element on a wall. The mirror itself catches and reflects light, so it fills the space visually even though it's a single object. Add too much around it and you dilute the effect.

## Dark Walls Are Your Friend

Our pieces are designed against darkness. Deep charcoal, matte black, rich burgundy, dark forest green — these wall colours make the metallic patinas and gold accents sing. A Dark Fairy Tale Mirror Art on a white wall will look striking; on a dark charcoal wall, it will look like it grew there.

If painting an entire room dark feels too bold, try a single accent wall behind the piece. Even a deep navy or charcoal panel creates the contrast these works need.

## Light Is Everything

Gothic art lives and dies by lighting. Here's what works:

**Candlelight** is the ideal companion. The flickering light makes metallic patinas shimmer and gives églomisé pieces their distinctive shifting quality. Even battery-operated candles in warm white create this effect.

**Accent lighting** — a small picture light above a framed piece, or an angled desk lamp below a mirror — creates dramatic shadows across sculpted 3D elements.

**Avoid overhead fluorescents.** They flatten everything. Gothic art needs directional light that creates shadows and depth.

## Unexpected Placements

Not everything needs to hang on a wall:

- **Trinket boxes** live beautifully on vanity tables, bookshelves, and beside tables. The Gothic Heart Trinket Box looks striking on a dark wood surface with a single candle nearby.
- **Art books** like the Gothic Enchantress Art Book belong on a shelf spine-out as a conversation piece, or displayed upright on a stand.
- **Small sculptures** like the Witch Hands Crystal Ball work as bookends, mantelpiece anchors, or desk companions.

## Mixing Gothic with Modern

Gothic art doesn't require a gothic room. Some of the most striking displays we've seen from customers place a single ornate piece against clean, minimal surroundings. A dark églomisé mirror above a mid-century modern console. A sculpted trinket box on a Scandinavian-style shelf. The contrast between the ornate and the minimal makes both look better.

The rule is simple: let the piece be the drama. Everything else can be quiet.`,
    coverImage:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&q=80",
    category: "Inspiration",
    author: "Mila Treasures Atelier",
    date: "2026-03-08",
    readTime: 5,
    featured: false,
  },
];

export function getPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): JournalPost[] {
  return journalPosts.filter((p) => p.featured);
}

export function getPostsByCategory(category: string): JournalPost[] {
  return journalPosts.filter((p) => p.category === category);
}
