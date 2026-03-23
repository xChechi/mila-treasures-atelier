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
  {
    id: "r1",
    productId: "1",
    author: "Victoria Ashworth",
    location: "Portland, OR",
    rating: 5,
    text: "The Nocturne Cathedral Cross is absolutely breathtaking. The craftsmanship is unlike anything I've seen in mass-produced decor. It's become the centerpiece of my living room.",
    date: "2026-03-10",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "Damien Cross",
    location: "Austin, TX",
    rating: 5,
    text: "Stunning ironwork. The tracery patterns catch the light beautifully. Arrived well-packaged from Bulgaria in just 10 days.",
    date: "2026-03-05",
    verified: true,
  },
  {
    id: "r3",
    productId: "1",
    author: "Isolde Mortem",
    location: "Asheville, NC",
    rating: 4,
    text: "Beautiful cross with incredible detail. The bronze patina gives it an authentically aged look. Only wish it was slightly larger.",
    date: "2026-02-28",
    verified: true,
  },
  {
    id: "r4",
    productId: "2",
    author: "Marcus Blackwell",
    location: "Salem, MA",
    rating: 5,
    text: "I've been collecting gothic decor for over a decade, and Gothic Treasures is on another level. The Whisperstone Gargoyle has such incredible detail — it genuinely looks like it was pulled from a medieval cathedral.",
    date: "2026-03-12",
    verified: true,
  },
  {
    id: "r5",
    productId: "2",
    author: "Raven Nightshade",
    location: "Chicago, IL",
    rating: 5,
    text: "This gargoyle is magnificent. The stone composite feels genuinely ancient. My friends all thought it was a real antique.",
    date: "2026-03-01",
    verified: true,
  },
  {
    id: "r6",
    productId: "3",
    author: "Elena Devereux",
    location: "New Orleans, LA",
    rating: 5,
    text: "The Ravenmoor Mirror transformed my entryway completely. The hand-carved raven details are exquisite. Shipping from Bulgaria was faster than expected.",
    date: "2026-03-14",
    verified: true,
  },
  {
    id: "r7",
    productId: "3",
    author: "Carmilla Vesper",
    location: "San Francisco, CA",
    rating: 4,
    text: "Gorgeous mirror with wonderful baroque detailing. The gold leaf accents add a luxurious touch. Heavier than expected — make sure you have proper wall anchors.",
    date: "2026-02-20",
    verified: true,
  },
  {
    id: "r8",
    productId: "4",
    author: "Sebastian Noir",
    location: "Brooklyn, NY",
    rating: 5,
    text: "The Vesper Candelabra creates the most incredible atmosphere when lit. The shadows it casts are like living art on the walls. Worth every penny.",
    date: "2026-03-08",
    verified: true,
  },
  {
    id: "r9",
    productId: "4",
    author: "Lilith Ravencroft",
    location: "Savannah, GA",
    rating: 5,
    text: "Absolutely love this candelabra. The wrought iron is substantial and well-made. Creates the perfect gothic ambiance in my reading room.",
    date: "2026-02-25",
    verified: true,
  },
  {
    id: "r10",
    productId: "5",
    author: "Morticia Graves",
    location: "Philadelphia, PA",
    rating: 5,
    text: "The Celtic knotwork on this cross is mesmerizing. The aged stone finish looks like it's been hanging in a cathedral for centuries.",
    date: "2026-03-15",
    verified: true,
  },
  {
    id: "r11",
    productId: "7",
    author: "Ophelia Darke",
    location: "Nashville, TN",
    rating: 5,
    text: "These sconces are the perfect size for my hallway. The pointed arch design is elegant without being overwhelming. Love that they come as a pair.",
    date: "2026-03-11",
    verified: true,
  },
  {
    id: "r12",
    productId: "8",
    author: "Constantine Shade",
    location: "Denver, CO",
    rating: 4,
    text: "A stunning piece. The hammered iron frame has beautiful texture. The arch shape makes any room feel like a cathedral. Wish they had a smaller version too.",
    date: "2026-03-06",
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
