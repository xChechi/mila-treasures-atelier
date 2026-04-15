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

// Individual listing URLs
const ETSY_BOOK_BOX       = "https://www.etsy.com/listing/4464391947/";
const ETSY_FAIRY_TALE     = "https://www.etsy.com/listing/4464398925/";
const ETSY_BAROQUE_FRAME  = "https://www.etsy.com/listing/4464398461/";
const ETSY_HEART_BOX      = "https://www.etsy.com/listing/4464465242/";
const ETSY_CASTLE_MIRROR  = "https://www.etsy.com/listing/4471777010/";
const ETSY_RAVEN_QUEEN    = "https://www.etsy.com/listing/4471791818/";


export const categories: Category[] = [
  {
    name: "Églomisé Art",
    slug: "eglomise-art",
    description: "Reverse-glass paintings with mirror fragments — an 18th-century French technique where art lives beneath the glass",
    image: "/products/item-8.webp",
    productCount: 3,
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
    productCount: 1,
  },
  {
    name: "Sculptures & Decor",
    slug: "sculptures-decor",
    description: "Ceramic figurines, candle holders, and standalone sculptural pieces for gothic altar shelves and dark interiors",
    image: "/products/item-5.webp",
    productCount: 0,
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

  // ─── Sculptures & Decor ─────────────────────────────────────────────────────
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
