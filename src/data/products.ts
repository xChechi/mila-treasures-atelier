export type ProductBadge = "new" | "bestseller" | "limited" | "last-one";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  badge?: ProductBadge;
  dimensions?: string;
  material?: string;
  weight?: string;
  etsyUrl: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

const ETSY_SHOP = "https://www.etsy.com/shop/MilaTreasuresAtelier";

// Individual listing URLs (remaining items link to shop until listed)
const ETSY_BOOK_BOX       = "https://www.etsy.com/listing/4464391947/";
const ETSY_FAIRY_TALE     = "https://www.etsy.com/listing/4464398925/";
const ETSY_BAROQUE_FRAME  = "https://www.etsy.com/listing/4464398461/";
const ETSY_HEART_BOX      = "https://www.etsy.com/listing/4464465242/";
const ETSY_CASTLE_MIRROR  = "https://www.etsy.com/listing/4471777010/";
const ETSY_RAVEN_QUEEN    = "https://www.etsy.com/listing/4471791818/";
const ETSY_CHALICE        = "https://www.etsy.com/listing/4476018508/";

export const categories: Category[] = [
  {
    name: "Églomisé Art",
    slug: "eglomise-art",
    description: "Reverse-glass paintings with mirror fragments — an 18th-century French technique where art lives beneath the glass",
    image: "/products/item-8.webp",
    productCount: 4,
  },
  {
    name: "Framed Art & Decor",
    slug: "framed-art",
    description: "Ornate framed pieces and sculptural art objects with hand-applied 3D elements and aged finishes",
    image: "/products/item-3.webp",
    productCount: 2,
  },
  {
    name: "Trinket Boxes",
    slug: "trinket-boxes",
    description: "Handcrafted decorative boxes with sculpted lids — for jewellery, keepsakes, or simply to exist beautifully",
    image: "/products/item-4.webp",
    productCount: 2,
  },
  {
    name: "Sculptures & Decor",
    slug: "sculptures-decor",
    description: "Ceramic figurines, candle holders, and standalone sculptural pieces for gothic altar shelves and dark interiors",
    image: "/products/item-5.webp",
    productCount: 2,
  },
];

export const products: Product[] = [
  // ─── Églomisé Art ──────────────────────────────────────────────────────────
  {
    id: "2",
    name: "Dark Fairy Tale Mirror Art",
    slug: "dark-fairy-tale-mirror",
    price: 95,
    category: "Églomisé Art",
    categorySlug: "eglomise-art",
    description: "The witch extends her hand. The apple gleams — crimson and heavy with consequence. Time holds its breath.\n\nThis handcrafted gothic framed artwork captures the darkest beat of a fairy tale you thought you knew. At its heart is an églomisé-inspired mixed media piece: the image is applied to foil and finished with a mirror spray on the reverse, creating a hauntingly luminous surface that shifts and deepens with the light.\n\nThe dramatic black-and-white composition — a hooded crone offering a gleaming apple through a window to an innocent girl, surrounded by barren branches heavy with forbidden fruit — is rendered in selective colour. Only the red apples bleed into full colour, making each one feel like a choice you cannot take back.\n\nThe ornate black wooden frame is decorated with hand-applied 3D resin sculptural elements: baroque rose with scrollwork, grandfather clock figure with aged bronze patina, gothic chapel spire, ornate cross with angel detail, skeletal hand clutching antique keys, and cascading purple bell flowers. Finished in aged matte black with metallic bronze and gold patinas throughout.",
    shortDescription: "Églomisé-inspired framed art — witch offering a crimson apple, ornate 3D sculptural frame with aged bronze patina",
    image: "/products/item-2.webp",
    images: ["/products/item-2.webp"],
    inStock: true,
    featured: true,
    badge: "bestseller",
    material: "Wood frame, resin sculpted elements, églomisé-style foil print, metallic paint",
    etsyUrl: ETSY_FAIRY_TALE,
  },
  {
    id: "7",
    name: "Gothic Gold Leaf Wall Art",
    slug: "gothic-gold-leaf-wall-art",
    price: 35,
    category: "Églomisé Art",
    categorySlug: "eglomise-art",
    description: "She stands at the edge of the world — silhouetted against a burning moon, bats circling overhead, darkness alive around her. Sealed behind genuine gold leaf, she glows from within. This piece does not hang on a wall. It haunts it.\n\nA handmade gothic framed artwork created using the historic 18th-century églomisé technique — one of the most striking and labour-intensive methods in decorative art. Genuine gold leaf is applied behind the print on foil, creating the luminous amber glow that radiates from the piece like a candle held behind glass. No filter, no trick — that warmth is real.\n\nThe ornate baroque frame is hand-finished with 3D resin sculptures: a weeping angel on the upper left, a death queen figure surrounded by skulls on the lower left, blooming roses at the base. Finished in aged verdigris green-bronze with gold dry-brushing throughout.",
    shortDescription: "Woman silhouette against a burning moon — genuine gold leaf églomisé art in an ornate verdigris baroque frame",
    image: "/products/item-7.webp",
    images: ["/products/item-7.webp"],
    inStock: true,
    featured: true,
    badge: "new",
    dimensions: "approx. 10.2 × 8.3 in (26 × 21 cm)",
    material: "Genuine gold leaf, resin sculpted elements, acrylic paint, wood frame",
    etsyUrl: ETSY_SHOP,
  },
  {
    id: "8",
    name: "Haunted Castle Églomisé Mirror",
    slug: "haunted-castle-eglomise-mirror",
    price: 96,
    category: "Églomisé Art",
    categorySlug: "eglomise-art",
    description: "Look closely. The castle glows from somewhere deep inside the glass. The crescent moon hangs still above its towers — but the room around you moves. That flicker you see is real. This piece reflects the living world while holding something older inside it.\n\nA large handmade églomisé mirror artwork — a rare 18th-century French decorative technique in which parts of the mirror's backing are carefully removed and an image is embedded beneath the glass surface. The result is something that cannot be photographed properly: part mirror, part painting, entirely its own thing.\n\nThe gothic castle scene — lit windows, crescent moon, twisted bare trees, stone staircase rising into darkness — lives inside the glass, while your room lives in the mirror around it. The two worlds overlap.\n\nThe wide distressed wood frame is finished in aged silver-gold with handpainted dark undertones.",
    shortDescription: "Large églomisé mirror with castle glowing beneath the glass — part mirror, part painting, entirely its own thing",
    image: "/products/item-8.webp",
    images: ["/products/item-8.webp"],
    inStock: true,
    featured: true,
    badge: "bestseller",
    dimensions: "approx. 15.0 × 13.0 in (38 × 33 cm)",
    material: "Mirror glass, églomisé technique, distressed wood frame",
    etsyUrl: ETSY_CASTLE_MIRROR,
  },
  {
    id: "9",
    name: "Dark Raven Queen Mirror Art",
    slug: "dark-raven-queen-mirror",
    price: 93,
    category: "Églomisé Art",
    categorySlug: "eglomise-art",
    description: "She stands in silence, her dark gown dissolving into feathers while ravens circle like living shadows — frozen beneath hand-aged mirror glass, watching the room with eyes that follow the candlelight. This is not decoration; it is a presence.\n\nThis artwork is created using the églomisé technique — a decorative art form dating back to 18th-century France. Parts of the mirror's reflective backing are carefully removed by hand, and the image of a dark raven queen is embedded beneath the glass surface. The remaining mirror fragments catch real light and merge with the painted figure beneath, creating a layered effect where the queen seems to shift between the real world and her own.\n\nThe wide distressed dark brown wood frame features heavy bronze and gold dry-brushed patina with a deep burgundy wine-red mat — ornate and commanding without overpowering the figure within.",
    shortDescription: "Raven queen frozen beneath hand-aged mirror glass — églomisé technique, distressed frame with burgundy mat",
    image: "/products/item-9.webp",
    images: ["/products/item-9.webp"],
    inStock: true,
    featured: true,
    badge: "new",
    dimensions: "15.0 × 13.0 in (38 × 33 cm)",
    material: "Mirror glass, églomisé technique, distressed wood frame, burgundy mat",
    etsyUrl: ETSY_RAVEN_QUEEN,
  },

  // ─── Framed Art & Decor ─────────────────────────────────────────────────────
  {
    id: "1",
    name: "Gothic Enchantress Art Book",
    slug: "gothic-enchantress-art-book",
    price: 65,
    category: "Framed Art & Decor",
    categorySlug: "framed-art",
    description: "An art object in book form. The cover is decorated entirely by hand — sculpted polymer clay figures emerge from the dark surface: a wide-brimmed enchantress, a gothic lantern, a raven, a castle silhouette glimpsed through the shadows, and a butterfly crowning the composition.\n\nBuilt on a solid hardcover base, the surface is layered with acrylic paint, metallic wax, and bronze patina to create the look of something found in a forgotten library. Every element is hand-applied. No two are alike, and this one will never be made again.\n\nDisplayable upright as a shelf statement piece. Photographed here in a stone kitchen setting — it belongs anywhere the light is low and the shelves are full.",
    shortDescription: "Gothic art book with sculpted polymer clay enchantress, lantern, and raven cover — a dark shelf statement piece",
    image: "/products/item-1.webp",
    images: ["/products/item-1.webp"],
    inStock: true,
    featured: false,
    material: "Wood base, polymer clay, acrylic paint, metallic wax",
    etsyUrl: ETSY_BOOK_BOX,
  },
  {
    id: "3",
    name: "Baroque Castle Frame",
    slug: "baroque-castle-frame",
    price: 86,
    category: "Framed Art & Decor",
    categorySlug: "framed-art",
    description: "A single light burns in the tower window. Stone steps disappear into ivy and shadow. From your wall, this castle doesn't just hang — it watches.\n\nThis is a hand-crafted baroque-style ceramic frame with an oval gothic castle art print at its heart. The frame is intricately cast with raised scrollwork, floral motifs, and botanical detail work that give it the feel of a centuries-old relic. Finished in deep black with aged bronze and gold metallic highlights, the surface carries the worn, layered depth of something found in a forgotten manor.\n\nArtificial moss is hand-applied into the recesses of the frame, completing the look of a castle slowly reclaimed by nature. The print within the oval depicts a gothic manor at dusk — a cobblestone path leading to a towering manor wrapped in mist. Can be displayed freestanding on a shelf or mantelpiece, or hung on a wall.",
    shortDescription: "Baroque ceramic oval frame with gothic castle print — moss-filled recesses, aged bronze and gold patina",
    image: "/products/item-3.webp",
    images: ["/products/item-3.webp"],
    inStock: true,
    featured: false,
    badge: "limited",
    material: "Ceramic, metallic paint, acrylic paint, artificial moss, art print",
    etsyUrl: ETSY_BAROQUE_FRAME,
  },

  // ─── Trinket Boxes ──────────────────────────────────────────────────────────
  {
    id: "4",
    name: "Gothic Heart Trinket Box",
    slug: "gothic-heart-trinket-box",
    price: 40,
    category: "Trinket Boxes",
    categorySlug: "trinket-boxes",
    description: "Somewhere between a relic and a dream, this heart-shaped box holds the weight of dark beauty in your hands. Aged in shadow and crowned with blooms that never decay, it is a piece that whispers of forgotten chambers and treasured secrets.\n\nCrafted from a solid MDF base, the lid is hand-decorated with sculpted polymer clay relief — roses and botanical forms emerging from the surface like something half-reclaimed by nature. Artificial moss and slender plastic branches complete the composition, evoking a haunted garden frozen in time. The interior carries a stamped gold heraldic motif, adding a regal gothic elegance beneath the lid.\n\nFinished using a mixed media technique, the piece layers acrylic and metallic paints to create deep, textured depth — a rich burgundy-brown patina with iridescent green undertones where the moss meets the shadow.",
    shortDescription: "Heart-shaped box with sculpted polymer clay roses and moss — a dark botanical relic for rings and secrets",
    image: "/products/item-4.webp",
    images: ["/products/item-4.webp"],
    inStock: true,
    featured: false,
    dimensions: "6.7 × 6.7 × 1.4 in (17 × 17 × 3.5 cm)",
    material: "MDF wood, polymer clay, artificial moss, acrylic and metallic paint",
    etsyUrl: ETSY_HEART_BOX,
  },
  {
    id: "10",
    name: "Gothic Dragon Trinket Box",
    slug: "gothic-dragon-trinket-box",
    price: 27,
    category: "Trinket Boxes",
    categorySlug: "trinket-boxes",
    description: "A dragon stirs atop a stack of forbidden tomes, claws wrapped around a glowing orb, scales catching the last light of a dying fire. This is not just a box — it's a fragment of a dragon's hoard, frozen in time.\n\nHandmade gothic decorative box featuring a sculpted dragon perched on stacked ancient books, clutching a pearl orb. The dragon has intricately detailed spread wings, textured scales, and a commanding presence that anchors the entire piece.\n\nBuilt on a solid wood base with sculpted resin and polymer clay elements, finished with multiple layers of acrylic paint, metallic wax, and hand-applied teal verdigris patina. The crackle finish on the body reveals warm golden undertones beneath a dark brown surface — every crack and aged detail is deliberate. Four ornate claw-and-scroll feet elevate the box from the surface it rests on.",
    shortDescription: "Dragon perched on forbidden tomes clutching a pearl orb — teal verdigris patina, crackle finish, ornate claw feet",
    image: "/products/item-10.webp",
    images: ["/products/item-10.webp"],
    inStock: true,
    featured: false,
    badge: "new",
    dimensions: "approx. 6.1 × 4.9 in (15.5 × 12.5 cm)",
    material: "Wood, resin, polymer clay, acrylic paint, metallic wax, teal verdigris patina",
    etsyUrl: ETSY_SHOP,
  },

  // ─── Sculptures & Decor ─────────────────────────────────────────────────────
  {
    id: "5",
    name: "Gothic Raven Candle Holder",
    slug: "gothic-raven-candle-holder",
    price: 64,
    category: "Sculptures & Decor",
    categorySlug: "sculptures-decor",
    description: "Where shadow and moss reclaim what candlelight once held — this gothic raven candle holder rises from the dark like a forgotten altar, watching over your space with hollow, knowing eyes.\n\nHandcrafted on a solid wood base, this striking piece is decorated on three sides with richly detailed gothic prints: a dark sorceress surrounded by ravens, a moonlit haunted castle bathed in deep purple light, and a crescent-moon gothic tower shrouded in mist. The fourth side is draped in lush artificial moss cascading to the base, adorned with dried purple blooms, bare wire branches, and delicate cobwebs.\n\nCrowning the piece is a hand-sculpted ceramic raven designed to hold a candle — fully removable to accommodate a taper or cocktail candle in the hollow below. Place a candle inside and watch the printed panels come alive.",
    shortDescription: "Gothic wood candle tower with ceramic raven crown — three printed panels, moss cascade, dried purple blooms",
    image: "/products/item-5.webp",
    images: ["/products/item-5.webp"],
    inStock: true,
    featured: false,
    dimensions: "11.8 × 4.7 × 4.7 in (30 × 12 × 12 cm)",
    material: "Solid wood, ceramic raven, art prints, artificial moss, dried flowers",
    etsyUrl: ETSY_SHOP,
  },
  {
    id: "6",
    name: "Witch Hands Crystal Ball Sculpture",
    slug: "witch-hands-crystal-ball",
    price: 24,
    category: "Sculptures & Decor",
    categorySlug: "sculptures-decor",
    description: "Two skeletal, clawed hands rise from the shadows — each finger arched with quiet menace, crimson-tipped nails catching the light — cradling a smooth orb as if stolen from some forgotten ritual. This is not decoration. This is presence.\n\nA handmade ceramic figurine of two witch hands gripping a crystal ball orb, mounted on an ornate pedestal base adorned with skull motifs, coiling serpents, and baroque scrollwork. Finished in deep matte black with hand-applied metallic gold and bronze accents and dark red gem details.\n\nEvery surface has been painted by hand using high-quality, non-toxic Dora metallic paints — the kind that give a rich, lustrous sheen without looking cheap or plasticky.",
    shortDescription: "Ceramic witch hands cradling a crystal ball — skull pedestal base, matte black with gold and bronze patina",
    image: "/products/item-6.webp",
    images: ["/products/item-6.webp"],
    inStock: true,
    featured: false,
    dimensions: "approx. 4.3 × 3.5 in (11 × 9 cm)",
    material: "Ceramic casting, hand-painted with non-toxic metallic paints",
    etsyUrl: ETSY_SHOP,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sophie M.",
    location: "United Kingdom",
    rating: 5,
    text: "The castle mirror is breathtaking in person. Photos cannot capture how it shifts when you move — part reflection, part painting. I've never owned anything quite like it.",
    product: "Haunted Castle Églomisé Mirror",
  },
  {
    id: 2,
    name: "Isabelle R.",
    location: "United States",
    rating: 5,
    text: "The heart trinket box arrived perfectly packed and it's even more beautiful than in the photos. The moss and polymer clay details are so intricate. It lives on my vanity now.",
    product: "Gothic Heart Trinket Box",
  },
  {
    id: 3,
    name: "Natalia K.",
    location: "Germany",
    rating: 5,
    text: "I bought the raven queen mirror and it stopped everyone in their tracks. The depth of the églomisé effect is unlike anything I've bought online before. Fast shipping from Bulgaria too!",
    product: "Dark Raven Queen Mirror Art",
  },
  {
    id: 4,
    name: "Cassandra W.",
    location: "Canada",
    rating: 5,
    text: "Milena's work is genuinely unlike anything else on Etsy. The dark fairy tale mirror frame is a conversation piece every single time someone visits. Already planning my next order.",
    product: "Dark Fairy Tale Mirror Art",
  },
];
