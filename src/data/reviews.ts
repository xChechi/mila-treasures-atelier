export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  // ─── Product 1: Gothic Enchantress Art Book ─────────────────────────────────
  {
    id: "r1",
    productId: "1",
    author: "Cassandra M.",
    location: "United Kingdom",
    rating: 5,
    text: "This is genuinely unlike anything I've ever owned. The sculpted cover feels ancient — like something that should be locked away in a forbidden library. Packed beautifully, arrived from Bulgaria in 9 days.",
    date: "2026-03-18",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "Lena V.",
    location: "Germany",
    rating: 5,
    text: "The butterfly and the enchantress on the cover are incredibly detailed. It sits on my shelf and everyone who comes over asks about it. Worth every cent.",
    date: "2026-02-27",
    verified: true,
  },

  // ─── Product 2: Dark Fairy Tale Mirror Art ───────────────────────────────────
  {
    id: "r3",
    productId: "2",
    author: "Sophie R.",
    location: "United States",
    rating: 5,
    text: "The photos don't do it justice. That mirror effect — the way the light plays through it — is something you have to see in person. My favourite piece I own.",
    date: "2026-03-20",
    verified: true,
  },
  {
    id: "r4",
    productId: "2",
    author: "Natalie K.",
    location: "Canada",
    rating: 5,
    text: "The 3D frame elements are astonishing up close. The grandfather clock, the skeletal hand — every detail is intentional. Milena is a true artist.",
    date: "2026-03-05",
    verified: true,
  },
  {
    id: "r5",
    productId: "2",
    author: "Isabelle D.",
    location: "France",
    rating: 4,
    text: "Absolutely beautiful piece. The selective colour on the red apples gives it a life that black and white couldn't. Only giving 4 stars because one of the resin flowers had a tiny chip on arrival — Milena responded immediately and offered a solution.",
    date: "2026-02-14",
    verified: true,
  },

  // ─── Product 3: Baroque Castle Frame ────────────────────────────────────────
  {
    id: "r6",
    productId: "3",
    author: "Monika B.",
    location: "Poland",
    rating: 5,
    text: "The moss in the frame recesses makes it look like it's been hanging in a manor for a century. The oval castle print is gorgeous. Very heavy — feels like quality.",
    date: "2026-03-12",
    verified: true,
  },
  {
    id: "r7",
    productId: "3",
    author: "Theresa L.",
    location: "Australia",
    rating: 5,
    text: "I ordered this as a gift and my friend cried when she opened it. The ceramic frame texture is incredible and it photographs beautifully in candlelight.",
    date: "2026-02-22",
    verified: true,
  },

  // ─── Product 4: Gothic Heart Trinket Box ────────────────────────────────────
  {
    id: "r8",
    productId: "4",
    author: "Elisa F.",
    location: "Italy",
    rating: 5,
    text: "Sits on my vanity and I reach for it every morning. The polymer clay roses feel almost real. The gold heraldic stamp inside the lid is such a lovely surprise.",
    date: "2026-03-15",
    verified: true,
  },
  {
    id: "r9",
    productId: "4",
    author: "Raven S.",
    location: "United States",
    rating: 5,
    text: "Perfect size for rings and small jewellery. The moss and branch details give it that haunted garden feel. Shipped securely and arrived in perfect condition.",
    date: "2026-03-01",
    verified: true,
  },
  {
    id: "r10",
    productId: "4",
    author: "Clara N.",
    location: "Netherlands",
    rating: 4,
    text: "Really beautiful box. The burgundy-brown patina is deep and rich. Would love a slightly larger version — but this one is still perfect on my dresser.",
    date: "2026-02-10",
    verified: true,
  },

  // ─── Product 5: Gothic Raven Candle Holder ──────────────────────────────────
  {
    id: "r11",
    productId: "5",
    author: "Astrid H.",
    location: "Sweden",
    rating: 5,
    text: "When you light a candle inside this, the three panels glow like stained glass. The moss cascades beautifully. One of those pieces that makes a room feel like a completely different world.",
    date: "2026-03-22",
    verified: true,
  },
  {
    id: "r12",
    productId: "5",
    author: "Jo W.",
    location: "United Kingdom",
    rating: 5,
    text: "The ceramic raven is the most charming thing. It sits on top looking absolutely furious and I love it. Candle flickers beautifully through the printed panels.",
    date: "2026-02-18",
    verified: true,
  },

  // ─── Product 6: Witch Hands Crystal Ball ────────────────────────────────────
  {
    id: "r13",
    productId: "6",
    author: "Petra M.",
    location: "Czech Republic",
    rating: 5,
    text: "The metallic paint on this is extraordinary — deep matte black with gold and bronze highlights that catch every angle of light. It sits on my altar and gets compliments from everyone.",
    date: "2026-03-10",
    verified: true,
  },
  {
    id: "r14",
    productId: "6",
    author: "Tara B.",
    location: "Ireland",
    rating: 5,
    text: "Absolutely obsessed. The skull motifs on the pedestal, the serpent coils — every surface is detailed. For the price this is exceptional quality.",
    date: "2026-02-28",
    verified: true,
  },
  {
    id: "r15",
    productId: "6",
    author: "Kim A.",
    location: "United States",
    rating: 4,
    text: "Great little sculpture. The crimson nail tips are a very nice touch. A fraction heavier than I expected from ceramic but that just makes it feel more substantial.",
    date: "2026-02-05",
    verified: true,
  },

  // ─── Product 7: Gothic Gold Leaf Wall Art ───────────────────────────────────
  {
    id: "r16",
    productId: "7",
    author: "Vivienne C.",
    location: "France",
    rating: 5,
    text: "That amber glow behind the silhouette is real — no filter. I've been staring at it for weeks. The weeping angel on the frame corner is incredibly detailed for its size.",
    date: "2026-03-25",
    verified: true,
  },
  {
    id: "r17",
    productId: "7",
    author: "Hannah P.",
    location: "United States",
    rating: 5,
    text: "The verdigris green-bronze frame is stunning. It looks like something you'd find in an antique shop for ten times the price. Milena's craftsmanship is on another level.",
    date: "2026-03-08",
    verified: true,
  },

  // ─── Product 8: Haunted Castle Églomisé Mirror ──────────────────────────────
  {
    id: "r18",
    productId: "8",
    author: "Diana V.",
    location: "Romania",
    rating: 5,
    text: "I genuinely gasped when I unwrapped it. The castle is inside the glass — you can't take a photo that captures it. My whole room is reflected around it. It's alive.",
    date: "2026-03-28",
    verified: true,
  },
  {
    id: "r19",
    productId: "8",
    author: "Marta O.",
    location: "Spain",
    rating: 5,
    text: "The most unique piece of art I own. The églomisé technique creates depth that photographs cannot show. The wide silver-gold frame is bold and perfectly matches.",
    date: "2026-03-15",
    verified: true,
  },
  {
    id: "r20",
    productId: "8",
    author: "Claire F.",
    location: "Belgium",
    rating: 5,
    text: "Bought this after seeing someone post it online and I don't regret it for a second. Expensive but absolutely worth it. Ships beautifully from Bulgaria.",
    date: "2026-02-20",
    verified: true,
  },

  // ─── Product 9: Dark Raven Queen Mirror Art ─────────────────────────────────
  {
    id: "r21",
    productId: "9",
    author: "Sigrid T.",
    location: "Norway",
    rating: 5,
    text: "She watches the room with such presence. The mirror fragments around her face catch candlelight in a way that makes her look like she's breathing. Extraordinary work.",
    date: "2026-03-20",
    verified: true,
  },
  {
    id: "r22",
    productId: "9",
    author: "Bianca L.",
    location: "Brazil",
    rating: 5,
    text: "The burgundy mat inside the frame adds a richness that elevates the whole piece. The églomisé effect is exactly as described — layered, luminous, impossible to photograph.",
    date: "2026-03-02",
    verified: true,
  },

  // ─── Product 10: Gothic Dragon Trinket Box ──────────────────────────────────
  {
    id: "r23",
    productId: "10",
    author: "Freya N.",
    location: "Denmark",
    rating: 5,
    text: "The teal verdigris patina and the crackle finish together look like a relic from a dragon's actual hoard. The claw feet are an inspired touch. My partner immediately tried to steal it.",
    date: "2026-03-18",
    verified: true,
  },
  {
    id: "r24",
    productId: "10",
    author: "James O.",
    location: "United Kingdom",
    rating: 5,
    text: "Bought for my D&D collection. The dragon clutching the pearl orb is exquisitely detailed — scales, wings, claws — all hand-painted. Exceptional for the price.",
    date: "2026-03-05",
    verified: true,
  },
  {
    id: "r25",
    productId: "10",
    author: "Ana C.",
    location: "Portugal",
    rating: 4,
    text: "Really lovely box. The dragon is the star — beautifully sculpted and painted. I wish the box interior was lined in velvet but the exterior is stunning.",
    date: "2026-02-15",
    verified: true,
  },
];

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getReviewsByProduct(productId);
  if (productReviews.length === 0) return 0;
  return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
}

export function getReviewCount(productId: string): number {
  return reviews.filter((r) => r.productId === productId).length;
}
