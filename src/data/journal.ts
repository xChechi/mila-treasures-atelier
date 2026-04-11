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
  relatedProductSlugs?: string[];
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
    relatedProductSlugs: [
      "haunted-castle-eglomise-mirror",
      "dark-raven-queen-mirror",
      "dark-fairy-tale-mirror",
    ],
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
    relatedProductSlugs: [
      "dark-fairy-tale-mirror",
      "gothic-gold-leaf-wall-art",
      "gothic-enchantress-art-book",
    ],
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
    relatedProductSlugs: [
      "gothic-heart-trinket-box",
      "gothic-dragon-trinket-box",
      "gothic-enchantress-art-book",
    ],
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
    relatedProductSlugs: [
      "gothic-dragon-trinket-box",
      "haunted-castle-eglomise-mirror",
      "baroque-castle-frame",
    ],
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
    relatedProductSlugs: [
      "haunted-castle-eglomise-mirror",
      "dark-fairy-tale-mirror",
      "gothic-heart-trinket-box",
      "witch-hands-crystal-ball",
    ],
  },
  {
    id: "6",
    slug: "gothic-home-decor-trends-2026",
    title: "Gothic Home Decor Trends 2026: What's Shifting",
    excerpt:
      "The gothic aesthetic is moving away from mass-produced darkness and toward handmade, story-driven pieces. Here's what's actually changing in 2026 — and what's staying.",
    content: `Every year, design publications announce that "dark interiors are trending." Every year, they act surprised. But 2026 is different — not because gothic decor is suddenly popular (it never stopped being popular), but because what people want from it has changed.

## The Shift Toward Handmade

The biggest trend in gothic home decor isn't a colour or a material — it's provenance. Buyers in 2026 are increasingly uninterested in mass-produced "gothic" items from large retailers. The skull candle holders and factory-stamped wall crosses that flooded the market a few years ago have lost their appeal. They look identical in every home. That's the opposite of what gothic decor is supposed to do.

What's replacing them: one-of-a-kind handmade pieces with visible craftsmanship. Polymer clay sculptures where you can see the artist's fingerprints in the texture. Églomisé mirrors where the glass is hand-scraped, making each one unrepeatable. Pieces that have a story beyond "I found it on a big-box retailer's website."

## Dark Academia Meets Gothic

The dark academia aesthetic — all old books, candlelight, and wood-panelled libraries — has been merging with traditional gothic decor since 2024. In 2026, that merger is complete. The result is spaces that feel learned and atmospheric rather than theatrical.

Think: a sculpted art book displayed on a reading desk alongside real volumes. A baroque castle frame above a shelf of leather-bound classics. An ornate trinket box holding wax seals and fountain pen nibs. The gothic elements serve the room rather than dominating it.

## Églomisé Is Having a Moment

This 18th-century technique — painting behind glass on a mirror surface — has been quietly gaining attention as people discover what it actually looks like in person. Photographs don't capture it. The way an églomisé mirror shifts between reflection and painted scene depending on the light and viewing angle is something you have to experience.

In 2026, églomisé pieces are appearing in interior design features and curated home tours more frequently than at any point in the last decade. The technique's inherent uniqueness — no two pieces can be identical because the mirror fragments differently each time — makes it the antithesis of mass production.

## Colour Palette: Gold and Burgundy Over Silver and Black

Pure black-and-silver gothic is giving way to warmer combinations. Antique gold, aged bronze, deep burgundy, forest green, and teal patinas are the dominant finishes in 2026. These colours feel older, richer, and more connected to historical gothic craft traditions.

The trend reflects a broader move away from "modern gothic" (clean lines, monochrome) and toward "romantic gothic" (ornate details, warm metallics, layered textures). Pieces with hand-applied gold leaf, verdigris patinas, and burgundy accents are leading this shift.

## What's Not Changing

Some things remain constant. Dark walls are still the best backdrop for gothic art. Candlelight is still the ideal light source. And the fundamental appeal of gothic decor — beauty that acknowledges darkness, craft that values the handmade, art that tells a story — is as strong as ever. The trends are just catching up to what collectors have always known.`,
    coverImage:
      "https://images.unsplash.com/photo-1551215717-8bc5f30b21fd?w=1200&q=80",
    category: "Inspiration",
    author: "Mila Treasures Atelier",
    date: "2026-04-10",
    readTime: 6,
    featured: true,
    relatedProductSlugs: [
      "haunted-castle-eglomise-mirror",
      "gothic-gold-leaf-wall-art",
      "baroque-castle-frame",
      "gothic-enchantress-art-book",
    ],
  },
  {
    id: "7",
    slug: "best-gothic-gifts-for-her",
    title: "Best Gothic Gifts for Her: A Guide for the Thoughtful",
    excerpt:
      "She doesn't want another candle from a chain store. Here's how to choose a gothic gift that actually means something — from trinket boxes to mirror art.",
    content: `You know she loves dark aesthetics. Her bookshelves lean toward Brontë and Poe. Her jewellery is silver, her lipstick is dark, and her idea of a perfect evening involves candlelight and silence. So you want to get her something gothic. Something real. Here's where most people go wrong — and how to get it right.

## The Problem with "Gothic Gifts"

Search for "gothic gifts" online and you'll find a wall of mass-produced items: resin skulls, factory-printed tapestries, novelty mugs with bat handles. These items aren't gifts — they're merchandise. They say "I noticed you like dark things" without saying "I understand what you actually value."

The difference between a forgettable gothic gift and one she'll keep forever comes down to craft and intention. A handmade piece carries the weight of the artist's time. A unique piece says you chose something that exists only once.

## For the Collector: Trinket Boxes

A gothic trinket box is the gift that keeps working long after the unboxing. She'll use it daily — for rings before bed, for earrings on a vanity, for small treasures that need a beautiful home.

The Gothic Heart Trinket Box, with its sculpted roses and iridescent green finish, becomes a permanent resident on a nightstand or dressing table. The Gothic Dragon Trinket Box, with its hand-sculpted dragon perched on the lid, appeals to the woman whose gothic taste leans toward the fantastical. Both are hand-painted with metallic patinas that catch candlelight.

The key: trinket boxes are functional luxury. She won't just display it — she'll touch it every day.

## For the Art Lover: Mirror Art and Frames

If she has wall space and a taste for the dramatic, églomisé mirror art is a gift that transforms a room. The Dark Fairy Tale Mirror Art — with its witch, poisoned apple, and baroque frame covered in 3D sculptures — is the kind of piece that stops conversations. The Haunted Castle Églomisé Mirror creates an entire gothic world inside the glass.

These pieces work because they're not just decorative — they're interactive. The mirror elements shift with the light, so the art looks different at every hour. She'll notice new details for months.

## For the Reader: The Art Book

The Gothic Enchantress Art Book is not a book you read — it's a book you display. The sculpted cover, the dark enchantress figure, the raven perched on the spine — it's a piece of gothic sculpture disguised as a tome. For the woman who values the aesthetic of old libraries and forbidden knowledge, it belongs on her shelf between her favourite novels.

## For the Mysterious: Sculptures

The Witch Hands Crystal Ball Sculpture speaks to a specific kind of gothic sensibility — the woman who appreciates the occult aesthetic, the tarot reader, the one whose shelves hold crystals and curiosities. It's a statement piece that works on a desk, a mantelpiece, or a dedicated altar space.

## The Real Gift Guide Rule

The best gothic gift isn't the most expensive or the most dramatic. It's the one that proves you paid attention to her specific shade of darkness. Does she lean toward fairy tales or the occult? Victorian elegance or dark fantasy? Mirrors or objects? The answer to those questions matters more than any price tag.`,
    coverImage:
      "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=1200&q=80",
    category: "Inspiration",
    author: "Mila Treasures Atelier",
    date: "2026-04-13",
    readTime: 6,
    featured: false,
    relatedProductSlugs: [
      "gothic-heart-trinket-box",
      "gothic-dragon-trinket-box",
      "dark-fairy-tale-mirror",
      "gothic-enchantress-art-book",
      "witch-hands-crystal-ball",
    ],
  },
  {
    id: "8",
    slug: "handmade-vs-mass-produced-decor",
    title: "Handmade vs Mass-Produced: What You're Actually Paying For",
    excerpt:
      "A factory frame costs $30. A handmade one costs ten times that. Here's what accounts for the difference — and why it matters more than you think.",
    content: `You can buy a "gothic mirror" from a large online retailer for $35. It arrives in two days. It looks fine. It looks exactly like the one your neighbour bought, and the one in the staged photo of a teenager's bedroom on a social media platform, and the 40,000 other units that rolled off the same production line in the same factory.

Or you can buy an églomisé mirror that took three days to make, where the glass was hand-scraped and the art was painted beneath the surface by a specific person in a specific workshop. It will never look exactly like any other mirror that exists. The price difference is real. So is the difference in what you're holding.

## What Mass Production Actually Means

Mass-produced decor isn't inherently bad. It serves a purpose — it fills spaces affordably. But it's important to understand what you're buying:

**Materials.** Factory items use the cheapest materials that achieve the look: MDF instead of wood, printed decals instead of paint, resin casts from a single mould instead of original sculpture. The item is engineered for cost efficiency, not longevity.

**Labour.** A factory worker might handle hundreds of identical units per shift. The goal is speed and consistency. No piece receives individual attention because individual attention is the enemy of scale.

**Design.** Mass-produced gothic items are designed by committee to appeal to the broadest possible audience. The result is "gothic enough" without being challenging, unusual, or deeply personal. It's darkness with the edges sanded off.

## What Handmade Actually Means

When Milena creates a piece at Mila Treasures Atelier, the process looks nothing like a production line:

**Time.** A single trinket box takes 15-20 hours. A framed art piece with sculpted 3D elements can take 30+. An églomisé mirror requires multiple days of scraping, painting, drying, and finishing. Time is the most expensive ingredient, and handmade work uses it generously.

**Decisions.** Every piece involves hundreds of micro-decisions that a factory never makes. How deep to scrape the mirror. How many petals on this particular rose. Whether the dragon's wing should curve left or right. These decisions make each piece singular.

**Risk.** Handmade work can fail. A mirror can crack during scraping. A polymer clay sculpture can break during baking. A patina finish can go wrong. The price of a handmade piece includes all the pieces that didn't survive the process.

**Skill.** Years of developed technique go into every piece. The ability to hand-scrape glass without shattering it, to sculpt polymer clay at a level of detail that reads as metal, to apply gold leaf so it ages naturally — these skills took years to build and cannot be automated.

## The Real Cost Equation

When you buy a $35 factory mirror, you're paying for materials and shipping. When you buy a handmade églomisé mirror, you're paying for:

- Hours of skilled labour at a living wage
- Materials chosen for quality, not cost savings
- The artist's years of developed expertise
- The uniqueness guarantee — your piece is the only one
- The risk absorbed in the making process

Neither choice is wrong. But they're fundamentally different purchases. One fills a space on your wall. The other puts someone's life's work on your wall.

## The Longevity Question

Mass-produced decor is designed to be replaced. The trends change, the materials degrade, and in three years you're buying another one. Handmade pieces are designed to last — not just physically, but emotionally. A hand-sculpted dragon box doesn't become less interesting after a year. An églomisé mirror doesn't follow trends because it predates them by three centuries.

The most expensive decor is the kind you keep replacing. The most affordable is the kind you keep forever.`,
    coverImage:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
    category: "Culture",
    author: "Mila Treasures Atelier",
    date: "2026-04-17",
    readTime: 7,
    featured: false,
    relatedProductSlugs: [
      "haunted-castle-eglomise-mirror",
      "gothic-dragon-trinket-box",
      "dark-fairy-tale-mirror",
      "gothic-gold-leaf-wall-art",
    ],
  },
  {
    id: "9",
    slug: "how-to-style-dark-academia-room",
    title: "How to Style a Dark Academia Room",
    excerpt:
      "Old books, candlelight, and the feeling of a forgotten library. Here's how to build a dark academia space that feels authentic — not like a costume.",
    content: `Dark academia is the aesthetic of old universities, candlelit libraries, handwritten letters, and the persistent feeling that you should be reading something important. It's tweed and leather and the smell of old paper. When done well, a dark academia room feels like stepping into a 19th-century study. When done poorly, it feels like a stage set.

The difference is authenticity. Here's how to get it right.

## Start with the Walls

Dark academia lives on dark walls. Not black — that tips into gothic territory (which is fine, but it's a different aesthetic). Instead, think:

- **Deep olive green** — the colour of old library walls
- **Warm brown** — leather-chair brown, not chocolate
- **Navy blue** — Oxford and Cambridge blue, deep and serious
- **Burgundy** — but muted, not bright

Matte finishes work best. Glossy dark walls look modern; matte dark walls look old. That distinction matters in dark academia, where everything should feel like it's been there for decades.

## The Bookshelf Is the Centrepiece

No dark academia room works without books — real ones. Not decorative spines bought by the metre, not coffee table books arranged by colour. Actual books you've read or intend to read. Philosophy, classic literature, poetry, history, art theory. The spines should be mismatched and slightly worn.

Between the books, place objects that feel scholarly or curious: an antique magnifying glass, a brass compass, a small sculpture, a curiosity. This is where pieces like the Gothic Enchantress Art Book work beautifully — displayed spine-out among real books, it looks like a recovered grimoire from a forgotten collection.

## Lighting: Warm and Low

Dark academia lighting is warm, low, and layered:

- **Desk lamp** with a warm bulb and a brass or green glass shade
- **Candles** — real or high-quality battery-operated in warm white
- **No overhead lighting** — or at minimum, a dimmer set very low

The goal is pools of light, not uniform illumination. A reading chair should have its own lamp. A desk should have its own lamp. The rest of the room can stay in comfortable shadow.

A Gothic Raven Candle Holder on a desk or mantelpiece serves double duty — it provides the warm candlelight the aesthetic demands while adding a gothic sculptural element that fits the scholarly darkness.

## Furniture: Wood and Leather

Dark academia furniture is heavy, wooden, and preferably old:

- **Desk:** A substantial wooden writing desk, not a minimalist modern one
- **Chair:** Leather armchair, preferably worn, preferably with brass studs
- **Shelving:** Dark wood bookshelves, floor-to-ceiling if possible
- **Side table:** For your tea, your book, your candle

If buying antique furniture isn't feasible, look for solid wood pieces with traditional joinery. The key is weight and substance — dark academia furniture should look like it would take three people to move.

## Art and Objects

Wall art in a dark academia room should feel collected, not coordinated. Pieces acquired over time from different sources, unified by tone rather than matching frames:

- Framed botanical prints or anatomical drawings
- Old maps in ornate frames
- A single dramatic piece — like a Baroque Castle Frame with its sculpted towers and hand-applied gold leaf — as a focal point above the desk
- Small sculptures or curiosities on shelves and surfaces

The Witch Hands Crystal Ball Sculpture works surprisingly well in dark academia contexts — it reads as an alchemist's study object, a curiosity from a cabinet of wonders.

## The Details That Sell It

- **Writing instruments.** A fountain pen and an inkwell on the desk, even if you type everything
- **A globe.** Preferably one that shows old borders
- **Stationery.** Wax seals, thick paper, envelopes
- **Textiles.** A wool throw on the reading chair, a Persian-style rug (dark tones)
- **Music.** Not a decoration, but if there's a record player with classical vinyl, the room completes itself

## The One Rule

Dark academia should feel lived in, not decorated. Every object should look like it belongs to someone who reads too much, stays up too late, and has strong opinions about poetry. If it looks like a catalogue spread, start over.`,
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
    category: "Inspiration",
    author: "Mila Treasures Atelier",
    date: "2026-04-20",
    readTime: 7,
    featured: false,
    relatedProductSlugs: [
      "gothic-enchantress-art-book",
      "gothic-raven-candle-holder",
      "baroque-castle-frame",
      "witch-hands-crystal-ball",
    ],
  },
  {
    id: "10",
    slug: "handmade-gothic-wall-decor-ideas",
    title: "Handmade Gothic Wall Decor Ideas: Beyond the Basics",
    excerpt:
      "You've moved past the mass-produced phase. Here are wall decor ideas for gothic spaces that demand something with actual craft and history behind it.",
    content: `There's a moment in every gothic decorator's journey when the factory-made pieces stop satisfying. The resin gargoyle from the chain store looks flat. The printed canvas of a dark forest feels hollow. You start noticing the seams, the repetition, the feeling that your space looks like everyone else's.

That's when the search for handmade begins. Here are the categories worth exploring — and what to look for in each.

## Églomisé Mirror Art

Églomisé — the technique of painting behind glass on a mirror surface — is the most underrated form of gothic wall art. It's underrated because most people have never seen it in person. Photographs capture maybe 30% of the effect. The real magic is how these pieces change with light and viewing angle, constantly shifting between reflection and painted scene.

For gothic spaces, églomisé pieces like the Haunted Castle Églomisé Mirror or the Dark Raven Queen Mirror Art offer something no other medium can: your room becomes part of the art. The remaining mirror fragments reflect your space around the painted scene, so the gothic world inside the glass and your actual room coexist. Move a candle, and the whole piece transforms.

**What to look for:** Hand-scraped glass (not chemically treated), original painted artwork (not decals), and solid framing. The technique is inherently handmade — if someone is selling "églomisé" at factory prices, it isn't real églomisé.

## Sculpted Frame Art

The frame isn't just a border — in handmade gothic art, the frame is half the piece. When a frame carries hand-sculpted 3D elements — roses, towers, ravens, skeletal hands — it transforms flat art into something sculptural.

The Dark Fairy Tale Mirror Art exemplifies this: the baroque frame features sculpted roses with scrollwork, a grandfather clock frozen in time, a gothic chapel spire, and a skeletal hand clutching antique keys. Each element was individually hand-sculpted in polymer clay, baked, and painted with metallic patinas. The frame alone took longer to create than most entire factory pieces take to manufacture.

**What to look for:** Individually sculpted elements (not mould-cast multiples), hand-applied patina finishes, and secure attachment of 3D elements to the frame.

## Gold Leaf and Metallic Art

Gold leaf application is an ancient decorative technique that adds genuine warmth and luminosity to gothic wall art. Unlike gold-coloured paint, real gold leaf (or quality imitation gold leaf) has a depth and shimmer that shifts with light.

The Gothic Gold Leaf Wall Art demonstrates what the technique can achieve in a gothic context — the metallic surface catches ambient light and candlelight differently, giving the piece a living quality that flat finishes cannot replicate.

**What to look for:** Leaf applied by hand (visible variation in the surface, not uniform like paint), sealed properly to prevent tarnishing, and combined with quality base artwork.

## Gallery Wall Arrangements

A gothic gallery wall follows different rules than a standard one:

**Asymmetry over grid.** Gothic aesthetics resist rigid order. Arrange pieces in an organic cluster rather than a perfect grid.

**Vary the media.** Mix mirrors, framed art, sculptural pieces, and dimensional objects. A Baroque Castle Frame next to an églomisé mirror next to a mounted candle holder creates visual richness that matching frames never achieve.

**Anchor with one large piece.** Choose your most dramatic work as the centre, then build outward with smaller pieces. The large piece should be positioned slightly above eye level — gothic art looks better when you're looking slightly up at it.

**Dark background.** A gallery wall of gothic pieces on a white wall looks like a store display. On a dark wall — charcoal, deep green, burgundy — it looks like a collection.

## The Investment Perspective

Handmade gothic wall decor costs more upfront than mass-produced alternatives. But consider: a handmade églomisé mirror or sculpted frame is a permanent addition to your space. It won't degrade, go out of style, or look identical to thousands of other pieces. In a world of disposable decor, permanence is the real luxury.`,
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    category: "Inspiration",
    author: "Mila Treasures Atelier",
    date: "2026-04-24",
    readTime: 7,
    featured: false,
    relatedProductSlugs: [
      "haunted-castle-eglomise-mirror",
      "dark-raven-queen-mirror",
      "dark-fairy-tale-mirror",
      "gothic-gold-leaf-wall-art",
      "baroque-castle-frame",
    ],
  },
  {
    id: "11",
    slug: "supporting-independent-artists",
    title: "Why Supporting Independent Artists Actually Matters",
    excerpt:
      "It's not just a feel-good slogan. When you buy from an independent artist, the economics, the craft, and the meaning of the object are fundamentally different.",
    content: `"Support independent artists" has become a phrase so common it's almost lost its meaning. It shows up on social media posts, tote bags, and the About pages of shops that may or may not be independent at all. But behind the slogan is something real — a set of economic and creative realities that genuinely matter. Here's what actually changes when you buy from an independent artist instead of a large retailer.

## Where Your Money Goes

When you buy a $50 item from a large online retailer, the breakdown looks roughly like this: raw materials, factory labour (often at poverty wages), shipping, platform fees, warehousing, marketing, and corporate profit. The person who designed the item may have been paid a flat fee years ago. The people who made it were paid by the unit.

When you buy a $50 item from an independent artist, the breakdown is different: materials the artist chose personally, hours of the artist's skilled labour, and platform fees. That's essentially it. There's no corporate layer, no factory markup, no warehouse overhead. The money goes to the person who made the thing.

For a piece from Mila Treasures Atelier, the economics are transparent: materials (polymer clay, mirror glass, paints, gold leaf, frames) and Milena's time. A trinket box that takes 15-20 hours to complete at a fair hourly rate should cost what it costs. The price reflects a person's skilled time, not a corporation's profit margin.

## What You're Actually Buying

A mass-produced gothic candle holder is an object. A handmade Gothic Raven Candle Holder is a decision — someone decided to sculpt that specific raven in that specific pose with those specific feather textures. The object carries intention.

This isn't sentimental. It's practical. Intentional objects are more interesting to live with. They reward closer inspection. They have textures and details that weren't optimised away by a cost engineer. The sculpted dragon on a trinket box has personality because a person gave it personality. A factory mould has efficiency.

## The Skill Preservation Problem

Many traditional craft techniques — églomisé, hand gilding, polymer clay sculpture, metallic patina finishing — survive only because independent artists keep practising them. These techniques aren't taught in most schools. They're not profitable enough for factories to adopt. They exist because individual artists choose to learn them, often through years of self-directed practice.

When these artists can't make a living, the techniques fade. Not dramatically — they just quietly stop being practised. One fewer person knows how to hand-scrape mirror glass. One fewer person can sculpt polymer clay at a professional level. The knowledge doesn't vanish overnight; it erodes.

Buying from artists who practise these techniques is the most direct way to ensure the techniques survive. Not through grants or institutions — through commerce. An artist who can pay rent through their craft will keep practising it.

## The Uniqueness Guarantee

Independent artists make limited quantities by definition. A single artist working by hand cannot produce thousands of units. This constraint, which is a disadvantage in business terms, is an advantage in ownership terms.

When you own a handmade piece, you own something scarce. Not artificially scarce — not a "limited edition" of 10,000 — but genuinely scarce because human hands can only make so many things. The Haunted Castle Églomisé Mirror you hang on your wall is the only one with that exact pattern of mirror fragments, that exact arrangement of painted details. It's unique because the process that made it cannot produce duplicates.

## How to Support Effectively

If you want to support independent artists in a way that actually helps:

**Buy directly or through artist-friendly platforms.** Etsy, despite its flaws, still gives artists more control and a larger share of revenue than most alternatives. Artist websites are even better.

**Pay full price.** Artists set their prices based on real costs. Asking for discounts on handmade work is asking someone to undervalue their skilled time.

**Leave reviews.** On platforms like Etsy, reviews directly affect an artist's visibility. A detailed, honest review is worth more than a tip.

**Share the work.** When you display a piece in your home and someone asks about it, tell them who made it and where to find them. Word of mouth is still the most powerful marketing an independent artist has.

**Be patient.** Handmade means lead time. Custom work takes weeks, not days. Shipping from a small workshop takes longer than shipping from a fulfilment centre. The wait is part of what makes the result different.

## The Real Choice

Every purchase is a vote for the kind of world you want to live in. A world where every home contains the same mass-produced objects from the same factories, or a world where your shelf holds something made by a person whose name you know, whose craft you can see, whose livelihood your purchase directly supports.

That's not a slogan. That's economics.`,
    coverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
    category: "Culture",
    author: "Mila Treasures Atelier",
    date: "2026-04-28",
    readTime: 8,
    featured: false,
    relatedProductSlugs: [
      "gothic-raven-candle-holder",
      "gothic-heart-trinket-box",
      "haunted-castle-eglomise-mirror",
      "gothic-dragon-trinket-box",
    ],
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
