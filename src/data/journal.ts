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
    slug: "the-ancient-art-of-iron-forging",
    title: "The Ancient Art of Iron Forging",
    excerpt:
      "Step inside our Bulgarian workshop where centuries-old blacksmithing techniques meet dark romantic vision. Every cross, every candelabra begins with fire.",
    content: `The forge glows at 1,200°C. In the dimly lit workshop nestled in the Rhodope Mountains of Bulgaria, master blacksmith Dimitar draws a length of iron from the coals. This is where every Gothic Treasures piece begins — not with a sketch or a CAD model, but with fire and hammer.

## A Craft Unchanged by Time

The techniques we use date back to the 13th century, when itinerant blacksmiths traveled between monasteries and cathedrals across Europe, creating the ornamental ironwork that still adorns these sacred spaces today. Our workshop preserves these methods not out of nostalgia, but because hand-forged iron has a character that no machine can replicate.

Each hammer strike leaves its mark — subtle variations in texture that catch the light differently, creating the living quality that collectors notice immediately. A machine-pressed cross is uniform and lifeless. A hand-forged cross tells the story of its creation.

## The Process

A single wall cross takes between 3 and 5 days to complete:

**Day 1 — Drawing the Iron.** The raw stock is heated until it reaches a bright orange. At this temperature, the iron becomes malleable enough to shape but retains enough resistance to hold the form as it cools. The main arms of the cross are drawn out first, establishing proportions that will guide every subsequent step.

**Day 2-3 — Tracery and Detail.** This is where artistry meets endurance. The Gothic tracery patterns — those intricate interlocking arches and cusps you see in cathedral windows — are formed by splitting, scrolling, and riveting separate pieces of iron. A single trefoil detail requires heating, splitting, scrolling, and filing. The Nocturne Cathedral Cross has over forty individual tracery elements.

**Day 4 — Assembly and Finishing.** The components are fire-welded together (no modern arc welding), then the entire piece goes through multiple rounds of filing and wire-brushing to refine the surface. Finally, the patina is applied — our signature weathered bronze finish uses a chemical process that accelerates decades of natural aging into hours.

**Day 5 — Quality Check.** Every piece is inspected under raking light to ensure symmetry, surface quality, and structural integrity. Roughly one in five pieces is rejected at this stage and returned to the forge.

## Why It Matters

In an age of mass production, choosing handcrafted means choosing imperfection — and that's precisely the point. Each Gothic Treasures piece is unique not just because we say so, but because the process makes it physically impossible to create two identical works. The hammer doesn't lie.

When you hang one of our crosses on your wall, you're not just displaying decor. You're preserving a craft that has survived wars, industrial revolutions, and the relentless pressure of "good enough." That feels worth protecting.`,
    coverImage:
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1200&q=80",
    category: "Workshop",
    author: "Gothic Treasures",
    date: "2026-03-20",
    readTime: 6,
    featured: true,
  },
  {
    id: "2",
    slug: "gothic-architecture-in-home-decor",
    title: "Gothic Architecture in Home Decor: A Guide",
    excerpt:
      "From pointed arches to ribbed vaults, learn how to bring the grandeur of medieval cathedrals into your living space without turning your home into a theme park.",
    content: `Gothic architecture is one of the most misunderstood aesthetics in interior design. Mention "gothic decor" and most people picture either a teenager's bedroom plastered with band posters or a haunted house. The reality — when done well — is something far more refined: a sense of vertical drama, rich materiality, and the interplay of light and shadow that made medieval cathedrals the most awe-inspiring buildings in human history.

## The Key Elements

### Pointed Arches
The pointed arch is the DNA of Gothic architecture. Unlike the rounded Roman arch, it directs the eye upward, creating a sense of aspiration and grandeur. In home decor, you can incorporate this through:

- **Mirrors** with pointed-arch frames (our Obsidian Arch Mirror is specifically designed for this)
- **Doorway treatments** with ogee or lancet arch moldings
- **Wall shelving** with arched niches
- **Window film** with Gothic tracery patterns for existing windows

### Ribbed Vaults and Tracery
Cathedral ceilings feature intricate ribbed vaults and window tracery — those elaborate stone patterns that fill Gothic windows. At home scale:

- **Wall crosses** with tracery details bring this pattern to any room
- **Ceiling medallions** with Gothic quatrefoil designs
- **Decorative screens** or room dividers with tracery cutouts

### Light and Shadow
Perhaps the most powerful element. Gothic spaces are defined by dramatic contrasts — pools of candlelight against deep shadow, filtered light through colored glass. This is the easiest element to replicate at home:

- **Candelabras and sconces** create the authentic flickering light
- **Dark walls** (charcoal, deep burgundy, or black) establish the shadow
- **Metallic accents** (aged gold, bronze, iron) catch and reflect light
- **Layered lighting** at different heights creates depth

## The Rules of Gothic Elegance

**Less is more.** A single dramatic piece — a large iron cross, an ornate mirror, a five-arm candelabra — will have far more impact than a room stuffed with gothic trinkets. Let each piece breathe.

**Material matters.** Gothic elegance demands real materials: iron, stone, wood, glass. Plastic molded to look like stone will always look like plastic. Our pieces use hand-forged iron, stone composite, and real mahogany precisely because the material IS the aesthetic.

**Dark doesn't mean dreary.** A gothic room needs warmth — candles (real or high-quality LED), warm metallic tones, plush textiles in deep jewel tones. Think of a candlelit cathedral, not a dungeon.

**Respect the architecture.** Gothic elements work best in rooms with some height. A 7-foot ceiling with a 4-foot cross will feel oppressive. Scale your pieces to your space, and use vertical elements (tall mirrors, sconces placed high) to draw the eye upward.

## Getting Started

If you're new to gothic decor, start with a single statement piece and build around it. A wall cross or mirror establishes the vocabulary; candle holders reinforce the atmosphere; a gargoyle adds character. Within a few well-chosen pieces, you'll have a space that feels like stepping into a private chapel — contemplative, dramatic, and entirely your own.`,
    coverImage:
      "https://images.unsplash.com/photo-1519677053485-abaa6744a08c?w=1200&q=80",
    category: "Inspiration",
    author: "Gothic Treasures",
    date: "2026-03-18",
    readTime: 7,
    featured: true,
  },
  {
    id: "3",
    slug: "the-gargoyles-of-notre-dame",
    title: "The Gargoyles of Notre-Dame: Guardians in Stone",
    excerpt:
      "Gargoyles have watched over humanity for 800 years. We explore the history, symbolism, and enduring fascination with these stone guardians — and why they belong in your home.",
    content: `High above the streets of Paris, perched on the balustrade of Notre-Dame, a chimera gazes across the city with an expression somewhere between boredom and menace. It has been sitting there since the 1860s — placed during Viollet-le-Duc's famous restoration — yet it looks like it has been watching since the beginning of time. That's the power of the gargoyle.

## Gargoyle vs. Grotesque

First, a distinction that will make you the most interesting person at your next dinner party: technically, a gargoyle is a carved figure that serves as a water spout, directing rainwater away from a building's masonry. The word comes from the French "gargouille," meaning throat. If a carved figure doesn't channel water, it's properly called a grotesque or a chimera.

In common usage — and in our product line — "gargoyle" covers all of these. We're not here to be pedantic; we're here to be atmospheric.

## A Brief History

Gargoyles appeared on buildings as early as ancient Egypt and Greece, but they reached their artistic peak during the Gothic period (12th-16th centuries). Medieval masons carved them for three reasons:

**Practical:** Directing rainwater away from walls to prevent erosion of the mortar between stones.

**Spiritual:** The church taught that gargoyles served as guardians, warding off evil spirits. Their frightening appearance was intentional — they were meant to scare demons away from sacred spaces.

**Artistic:** Gargoyles gave masons creative freedom. While the rest of a cathedral followed strict iconographic rules, gargoyles could be fantastical, humorous, or satirical. Some depict monks in unflattering poses. Others show mythical beasts. A few are clearly just masons having fun.

## Symbolism

The gargoyle occupies a fascinating symbolic space — it sits on the boundary between the sacred and the profane, the natural and the supernatural. A gargoyle is:

- A **protector** (warding off evil)
- A **reminder** (of the monsters that await the unfaithful)
- A **work of art** (expressing the mason's individual vision)
- A **practical tool** (managing water drainage)

This blend of function and meaning is exactly what makes gargoyles so compelling in home decor. They're not purely decorative; they carry weight and story.

## Why Collectors Love Them

Our Whisperstone Gargoyle is consistently one of our best-selling pieces, and the reason is simple: gargoyles have personality. A cross is beautiful but serene. A mirror is elegant but passive. A gargoyle has attitude. It watches. It judges. It protects.

Placed on a bookshelf, mantelpiece, or wall bracket, a gargoyle creates a focal point that draws the eye and invites conversation. It's the piece that guests notice first and ask about. "Where did you find that?" is the question every collector wants to hear.

## Choosing Your Guardian

When selecting a gargoyle for your home, consider:

- **Pose:** Crouching gargoyles suggest vigilance. Winged gargoyles suggest power. Contemplative chimeras (like Notre-Dame's famous "Le Stryge") suggest wisdom.
- **Scale:** A gargoyle should be large enough to command attention but not so large that it overwhelms the space. 10-14 inches is ideal for most rooms.
- **Material:** Stone composite (like our pieces) develops a natural patina over time, making it look more authentic with age.
- **Placement:** Gargoyles look best at height — on shelves, brackets, or atop bookcases. They were designed to look down, and they're most effective in that position.

Whichever guardian you choose, you're participating in an 800-year tradition of placing sentinels at the boundaries of your personal space. There's something deeply satisfying about that.`,
    coverImage:
      "https://images.unsplash.com/photo-1561084746-f360502e5abe?w=1200&q=80",
    category: "Culture",
    author: "Gothic Treasures",
    date: "2026-03-15",
    readTime: 8,
    featured: false,
  },
  {
    id: "4",
    slug: "from-bulgaria-with-darkness",
    title: "From Bulgaria with Darkness: Our Shipping Journey",
    excerpt:
      "How a handcrafted iron cross travels 5,000 miles from a mountain workshop in Bulgaria to your wall in America — and arrives in perfect condition.",
    content: `Every Gothic Treasures order begins its journey in the Rhodope Mountains of southern Bulgaria and ends at a doorstep somewhere in the United States. That's roughly 5,000 miles, multiple customs checkpoints, and 10-14 days of transit. Here's how we make sure your one-of-a-kind piece arrives in the same condition it left our workshop.

## The Packing Process

Handcrafted iron and stone pieces are fragile in ways that might surprise you. A gargoyle's outstretched wing, a cross's tracery detail, a candelabra's curved arm — these are points of vulnerability that require specific protection.

**Layer 1 — Soft Wrap.** Each piece is first wrapped in acid-free tissue paper to protect the patina finish. Standard bubble wrap can leave marks on bronze and iron finishes, so we avoid it in direct contact.

**Layer 2 — Custom Foam.** We cut custom foam inserts for each piece. Not generic packing peanuts — actual shaped foam that cradles the exact contours of the item. This is labor-intensive but eliminates the shifting that causes transit damage.

**Layer 3 — Inner Box.** The foam-cradled piece goes into a sturdy inner carton with additional padding.

**Layer 4 — Outer Shell.** The inner box is placed inside a larger outer box with shock-absorbing fill between the two. This double-box method is the industry standard for shipping art and antiques.

## The Route

Our packages travel from the workshop to Sofia, Bulgaria's capital, where they enter the international shipping network. We use DHL Express for most orders — their handling standards for fragile goods are consistently the best we've tested.

**Sofia → Leipzig** (DHL European hub) → **Cincinnati** (DHL Americas hub) → **Local delivery.** Total transit time: 7-10 business days, with customs clearance typically adding 1-2 days.

## Customs and Duties

All Gothic Treasures pieces ship DDP (Delivered Duty Paid), which means we handle all customs paperwork and import duties. The price you see at checkout is the price you pay — no surprise fees at delivery. This costs us more per shipment, but we believe surprise charges are antithetical to a premium experience.

## Our Damage Rate

In over 200 shipments, we've had exactly three damage incidents — a 1.5% rate. In all three cases, we shipped a replacement at no cost within 48 hours. Each incident led to a specific improvement in our packing protocol.

We photograph every piece before it ships, so if there's ever a question about transit damage versus pre-existing condition, we have documentation.

## Tracking Your Order

Every order receives a tracking number within 24 hours of shipment. You can follow your piece from Sofia to your door on our order tracking page. We also send email updates at each major milestone: shipped, cleared customs, out for delivery.

There's something satisfying about watching a medieval-inspired gargoyle navigate 21st-century logistics. Eight hundred years ago, it would have been carved on-site. Today, it crosses continents. The craft is ancient; the delivery is not.`,
    coverImage:
      "https://images.unsplash.com/photo-1744339700395-fa286ae4c7e6?w=1200&q=80",
    category: "Behind the Scenes",
    author: "Gothic Treasures",
    date: "2026-03-12",
    readTime: 5,
    featured: false,
  },
  {
    id: "5",
    slug: "the-meaning-of-the-cross-in-gothic-art",
    title: "The Meaning of the Cross in Gothic Art",
    excerpt:
      "Beyond religion: how the cross evolved from a symbol of faith into one of the most powerful decorative motifs in art history.",
    content: `The cross is arguably the most recognized symbol in Western civilization. But in Gothic art, it transcends its religious origins to become something more complex — a symbol of aspiration, craftsmanship, and the human desire to create beauty from raw materials.

## From Symbol to Art Object

In early Christianity, the cross was a symbol of suffering and salvation. It was revered but rarely adorned. The Gothic period changed this. As cathedrals rose across Europe in the 12th and 13th centuries, the cross became a canvas for artistic expression.

Gothic craftsmen didn't just make crosses — they made crosses that soared. They added tracery, the intricate stone or metalwork patterns inspired by the cathedral windows they were building. They added floral motifs, geometric patterns, and narrative scenes. The cross became a frame for creativity.

This is the tradition we work within at Gothic Treasures. Our wall crosses are artistic objects first — they happen to take the form of a cross, but their purpose is to bring beauty, drama, and craftsmanship into your space.

## Tracery: The Language of Gothic Design

The word "tracery" comes from the French "tracer," to draw. In architecture, tracery refers to the ornamental stone or ironwork that fills the upper part of Gothic windows. There are two main types:

**Plate tracery** (early Gothic) — simple geometric openings cut through a flat stone surface. Think of a rose window with distinct circular holes.

**Bar tracery** (high Gothic) — slender stone bars forming complex, flowing patterns. This is the tracery most people picture when they think of Gothic architecture — the lace-like networks of pointed arches, quatrefoils, and mouchettes.

Our crosses use bar tracery patterns adapted from specific cathedrals. The Nocturne Cathedral Cross references the west window of Notre-Dame de Paris. The Thornewood Celtic Cross blends Gothic tracery with Celtic knotwork from the Iona tradition.

## The Cross in Your Home

A wall cross — whether you're religious or not — makes a powerful decorative statement for several reasons:

**Symmetry.** The cross is inherently balanced, creating a natural focal point.

**Verticality.** It draws the eye upward, making rooms feel taller.

**Material contrast.** Dark iron or stone against a painted wall creates the kind of dramatic contrast that interior designers call "tension."

**Historical depth.** Every cross carries centuries of artistic tradition. It's not just a decoration; it's a conversation with history.

Whether you see a cross as a spiritual symbol, an art object, or simply a beautifully crafted piece of ironwork, it has earned its place on walls across the world. We're honored to continue making them.`,
    coverImage:
      "https://images.unsplash.com/photo-1756080508014-a94fd3c313e5?w=1200&q=80",
    category: "Culture",
    author: "Gothic Treasures",
    date: "2026-03-08",
    readTime: 6,
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
