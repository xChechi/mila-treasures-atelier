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
  dimensions?: string;
  material?: string;
  weight?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

// Cross images — dramatic cathedral with glowing cross
const IMG_CROSS = "https://images.unsplash.com/photo-1756080508014-a94fd3c313e5?w=800&q=80";
const IMG_CROSS_CAT = "https://images.unsplash.com/photo-1756080508014-a94fd3c313e5?w=600&q=80";

// Gargoyle images — dark gargoyle statue close-up
const IMG_GARGOYLE = "https://images.unsplash.com/photo-1561084746-f360502e5abe?w=800&q=80";
const IMG_GARGOYLE_CAT = "https://images.unsplash.com/photo-1561084746-f360502e5abe?w=600&q=80";

// Mirror images — dark cathedral interior (ornate arches)
const IMG_MIRROR = "https://images.unsplash.com/photo-1519677053485-abaa6744a08c?w=800&q=80";
const IMG_MIRROR_CAT = "https://images.unsplash.com/photo-1519677053485-abaa6744a08c?w=600&q=80";

// Candle holder images — candles in gothic church
const IMG_CANDLE = "https://images.unsplash.com/photo-1744339700395-fa286ae4c7e6?w=800&q=80";
const IMG_CANDLE_CAT = "https://images.unsplash.com/photo-1744339700395-fa286ae4c7e6?w=600&q=80";

export const categories: Category[] = [
  {
    name: "Wall Crosses",
    slug: "wall-crosses",
    description: "Handcrafted gothic crosses that transform any wall into a sacred space",
    image: IMG_CROSS_CAT,
    productCount: 8,
  },
  {
    name: "Gargoyles & Sculptures",
    slug: "gargoyles-sculptures",
    description: "Guardian figures and dark sculptures carved with ancient artistry",
    image: IMG_GARGOYLE_CAT,
    productCount: 6,
  },
  {
    name: "Gothic Mirrors",
    slug: "gothic-mirrors",
    description: "Ornate mirrors framed in dark elegance and baroque grandeur",
    image: IMG_MIRROR_CAT,
    productCount: 5,
  },
  {
    name: "Candle Holders",
    slug: "candle-holders",
    description: "Cast iron and wrought metal holders for an authentic gothic ambiance",
    image: IMG_CANDLE_CAT,
    productCount: 7,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Nocturne Cathedral Cross",
    slug: "nocturne-cathedral-cross",
    price: 189.00,
    category: "Wall Crosses",
    categorySlug: "wall-crosses",
    description: "A stunning hand-forged iron cross inspired by 13th-century cathedral architecture. Each piece features intricate Gothic tracery patterns with a weathered bronze patina finish. The cross measures 24 inches tall and makes a commanding centerpiece for any wall.",
    shortDescription: "Hand-forged iron cross with Gothic tracery and bronze patina",
    image: IMG_CROSS,
    images: [IMG_CROSS],
    inStock: true,
    featured: true,
    dimensions: '24" H x 14" W x 2" D',
    material: "Hand-forged iron",
    weight: "4.2 lbs",
  },
  {
    id: "2",
    name: "Whisperstone Gargoyle",
    slug: "whisperstone-gargoyle",
    price: 245.00,
    category: "Gargoyles & Sculptures",
    categorySlug: "gargoyles-sculptures",
    description: "This masterfully sculpted gargoyle draws inspiration from Notre-Dame's guardians. Hand-cast in a special stone composite that develops a natural aged patina over time. Perched on a decorative shelf bracket, it watches over your space with timeless vigilance.",
    shortDescription: "Hand-cast stone gargoyle inspired by Notre-Dame",
    image: IMG_GARGOYLE,
    images: [IMG_GARGOYLE],
    inStock: true,
    featured: true,
    dimensions: '12" H x 8" W x 10" D',
    material: "Stone composite",
    weight: "6.8 lbs",
  },
  {
    id: "3",
    name: "Ravenmoor Baroque Mirror",
    slug: "ravenmoor-baroque-mirror",
    price: 320.00,
    category: "Gothic Mirrors",
    categorySlug: "gothic-mirrors",
    description: "An exquisite oval mirror framed in hand-carved dark mahogany with baroque scrollwork. The frame features intertwined ravens and thorned vines, finished in antique black with gold leaf accents. A true statement piece that brings dark elegance to any room.",
    shortDescription: "Baroque mirror with raven and vine motifs",
    image: IMG_MIRROR,
    images: [IMG_MIRROR],
    inStock: true,
    featured: true,
    dimensions: '36" H x 24" W x 3" D',
    material: "Dark mahogany",
    weight: "8.5 lbs",
  },
  {
    id: "4",
    name: "Vesper Iron Candelabra",
    slug: "vesper-iron-candelabra",
    price: 165.00,
    category: "Candle Holders",
    categorySlug: "candle-holders",
    description: "A dramatic five-arm wall candelabra forged from wrought iron with a matte black finish. Inspired by medieval monastery fixtures, each arm curves gracefully and holds a standard taper candle. When lit, it casts mesmerizing shadows that dance across your walls.",
    shortDescription: "Five-arm wrought iron wall candelabra",
    image: IMG_CANDLE,
    images: [IMG_CANDLE],
    inStock: true,
    featured: true,
    dimensions: '18" H x 22" W x 8" D',
    material: "Wrought iron",
    weight: "5.1 lbs",
  },
  {
    id: "5",
    name: "Thornewood Celtic Cross",
    slug: "thornewood-celtic-cross",
    price: 210.00,
    category: "Wall Crosses",
    categorySlug: "wall-crosses",
    description: "A magnificent Celtic cross combining Gothic and Celtic artistry. Hand-carved from dark resin stone with intricate knotwork patterns. The aged stone finish gives it an authentically ancient appearance.",
    shortDescription: "Celtic-Gothic fusion cross with intricate knotwork",
    image: IMG_CROSS,
    images: [],
    inStock: true,
    featured: false,
    dimensions: '28" H x 16" W x 2.5" D',
    material: "Resin stone",
    weight: "5.0 lbs",
  },
  {
    id: "6",
    name: "Grimwatch Sentinel",
    slug: "grimwatch-sentinel",
    price: 285.00,
    category: "Gargoyles & Sculptures",
    categorySlug: "gargoyles-sculptures",
    description: "A brooding sentinel gargoyle with outstretched wings, designed to mount on a wall or shelf. This imposing guardian features extraordinary detail in every feather and scale.",
    shortDescription: "Winged sentinel gargoyle with extraordinary detail",
    image: IMG_GARGOYLE,
    images: [],
    inStock: false,
    featured: false,
    dimensions: '14" H x 18" W x 12" D',
    material: "Stone composite",
    weight: "9.2 lbs",
  },
  {
    id: "7",
    name: "Shadowveil Sconce Pair",
    slug: "shadowveil-sconce-pair",
    price: 145.00,
    category: "Candle Holders",
    categorySlug: "candle-holders",
    description: "A matching pair of Gothic wall sconces in blackened iron. Each features a pointed arch design reminiscent of cathedral windows, with a drip-catching base for taper candles.",
    shortDescription: "Pair of Gothic arch wall sconces in blackened iron",
    image: IMG_CANDLE,
    images: [],
    inStock: true,
    featured: false,
    dimensions: '14" H x 6" W x 5" D (each)',
    material: "Blackened iron",
    weight: "2.8 lbs (pair)",
  },
  {
    id: "8",
    name: "Obsidian Arch Mirror",
    slug: "obsidian-arch-mirror",
    price: 275.00,
    category: "Gothic Mirrors",
    categorySlug: "gothic-mirrors",
    description: "A tall pointed-arch mirror with a hammered iron frame finished in obsidian black. The Gothic arch shape evokes cathedral windows, creating a dramatic focal point.",
    shortDescription: "Pointed-arch mirror with hammered iron frame",
    image: IMG_MIRROR,
    images: [],
    inStock: true,
    featured: false,
    dimensions: '48" H x 24" W x 2" D',
    material: "Hammered iron",
    weight: "12.0 lbs",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Victoria Ashworth",
    location: "Portland, OR",
    rating: 5,
    text: "The Nocturne Cathedral Cross is absolutely breathtaking. The craftsmanship is unlike anything I've seen in mass-produced decor. It's become the centerpiece of my living room.",
    product: "Nocturne Cathedral Cross",
  },
  {
    id: 2,
    name: "Marcus Blackwell",
    location: "Salem, MA",
    rating: 5,
    text: "I've been collecting gothic decor for over a decade, and Gothic Treasures is on another level. The Whisperstone Gargoyle has such incredible detail — it genuinely looks like it was pulled from a medieval cathedral.",
    product: "Whisperstone Gargoyle",
  },
  {
    id: 3,
    name: "Elena Devereux",
    location: "New Orleans, LA",
    rating: 5,
    text: "The Ravenmoor Mirror transformed my entryway completely. The hand-carved raven details are exquisite. Shipping from Bulgaria was faster than expected and it arrived in perfect condition.",
    product: "Ravenmoor Baroque Mirror",
  },
  {
    id: 4,
    name: "Sebastian Noir",
    location: "Brooklyn, NY",
    rating: 5,
    text: "The Vesper Candelabra creates the most incredible atmosphere when lit. The shadows it casts are like living art on the walls. Worth every penny.",
    product: "Vesper Iron Candelabra",
  },
];
