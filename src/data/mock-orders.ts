export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: { productName: string; price: number }[];
  total: number;
  status: "processing" | "shipped" | "delivered";
  date: string;
  shippingAddress: string;
}

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "GT-2K7X8A",
    customerName: "Victoria Ashworth",
    customerEmail: "victoria@example.com",
    items: [{ productName: "Nocturne Cathedral Cross", price: 189.0 }],
    total: 189.0,
    status: "delivered",
    date: "2026-03-18",
    shippingAddress: "Portland, OR 97201",
  },
  {
    id: "2",
    orderNumber: "GT-3M9P2B",
    customerName: "Marcus Blackwell",
    customerEmail: "marcus@example.com",
    items: [
      { productName: "Whisperstone Gargoyle", price: 245.0 },
      { productName: "Vesper Iron Candelabra", price: 165.0 },
    ],
    total: 410.0,
    status: "shipped",
    date: "2026-03-20",
    shippingAddress: "Salem, MA 01970",
  },
  {
    id: "3",
    orderNumber: "GT-5R1K4C",
    customerName: "Elena Devereux",
    customerEmail: "elena@example.com",
    items: [{ productName: "Ravenmoor Baroque Mirror", price: 320.0 }],
    total: 320.0,
    status: "shipped",
    date: "2026-03-21",
    shippingAddress: "New Orleans, LA 70112",
  },
  {
    id: "4",
    orderNumber: "GT-8T6W3D",
    customerName: "Sebastian Noir",
    customerEmail: "sebastian@example.com",
    items: [{ productName: "Thornewood Celtic Cross", price: 210.0 }],
    total: 210.0,
    status: "processing",
    date: "2026-03-22",
    shippingAddress: "Brooklyn, NY 11201",
  },
  {
    id: "5",
    orderNumber: "GT-2N4J7E",
    customerName: "Lilith Ravencroft",
    customerEmail: "lilith@example.com",
    items: [
      { productName: "Shadowveil Sconce Pair", price: 145.0 },
      { productName: "Obsidian Arch Mirror", price: 275.0 },
    ],
    total: 420.0,
    status: "processing",
    date: "2026-03-23",
    shippingAddress: "Savannah, GA 31401",
  },
  {
    id: "6",
    orderNumber: "GT-6H2M9F",
    customerName: "Damien Cross",
    customerEmail: "damien@example.com",
    items: [{ productName: "Vesper Iron Candelabra", price: 165.0 }],
    total: 165.0,
    status: "delivered",
    date: "2026-03-15",
    shippingAddress: "Austin, TX 78701",
  },
];
