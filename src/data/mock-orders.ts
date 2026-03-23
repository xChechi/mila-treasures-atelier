export interface OrderTimelineEvent {
  status: "confirmed" | "crafting" | "shipped" | "delivered";
  label: string;
  description: string;
  date: string | null;
  completed: boolean;
}

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
  timeline: OrderTimelineEvent[];
}

function buildTimeline(status: "processing" | "shipped" | "delivered", orderDate: string): OrderTimelineEvent[] {
  const d = new Date(orderDate);
  const fmt = (date: Date) => date.toISOString().split("T")[0];

  const craftDate = new Date(d);
  craftDate.setDate(d.getDate() + 1);
  const shipDate = new Date(d);
  shipDate.setDate(d.getDate() + 3);
  const deliverDate = new Date(d);
  deliverDate.setDate(d.getDate() + 14);

  return [
    {
      status: "confirmed",
      label: "Order Confirmed",
      description: "Your order has been received and payment verified",
      date: fmt(d),
      completed: true,
    },
    {
      status: "crafting",
      label: "Handcrafting in Progress",
      description: "Your unique piece is being carefully prepared in our Bulgarian workshop",
      date: status !== "processing" ? fmt(craftDate) : null,
      completed: status !== "processing",
    },
    {
      status: "shipped",
      label: "Shipped from Bulgaria",
      description: "Your treasure has departed our workshop, en route to the USA",
      date: status === "shipped" || status === "delivered" ? fmt(shipDate) : null,
      completed: status === "shipped" || status === "delivered",
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Your gothic treasure has arrived at its new home",
      date: status === "delivered" ? fmt(deliverDate) : null,
      completed: status === "delivered",
    },
  ];
}

const ordersRaw = [
  {
    id: "1",
    orderNumber: "GT-2K7X8A",
    customerName: "Victoria Ashworth",
    customerEmail: "victoria@example.com",
    items: [{ productName: "Nocturne Cathedral Cross", price: 189.0 }],
    total: 189.0,
    status: "delivered" as const,
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
    status: "shipped" as const,
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
    status: "shipped" as const,
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
    status: "processing" as const,
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
    status: "processing" as const,
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
    status: "delivered" as const,
    date: "2026-03-15",
    shippingAddress: "Austin, TX 78701",
  },
];

export const mockOrders: Order[] = ordersRaw.map((o) => ({
  ...o,
  timeline: buildTimeline(o.status, o.date),
}));
