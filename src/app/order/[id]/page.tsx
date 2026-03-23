import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockOrders } from "@/data/mock-orders";
import OrderTrackingClient from "./OrderTrackingClient";

export function generateStaticParams() {
  return mockOrders.map((o) => ({ id: o.orderNumber }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const order = mockOrders.find((o) => o.orderNumber === id);
  if (!order) return {};

  return {
    title: `Order ${order.orderNumber}`,
    robots: { index: false, follow: false },
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = mockOrders.find((o) => o.orderNumber === id);

  if (!order) notFound();

  return <OrderTrackingClient order={order} />;
}
