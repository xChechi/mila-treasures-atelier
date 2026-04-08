import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Custom Orders & Inquiries",
  description:
    "Get in touch with Mila Treasures Atelier for custom gothic decor orders, shipping questions, or wholesale inquiries. Handmade in Bulgaria, shipped worldwide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Mila Treasures Atelier",
    description:
      "Questions about custom orders, shipping, or our handcrafted gothic decor? We'd love to hear from you.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
