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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does shipping take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard shipping from Bulgaria to the USA takes 10–18 business days. Express shipping is available for 5–8 business days. All orders include tracking and insurance.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept custom orders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We work with our artisans to create custom pieces based on your vision. Contact us with your idea and we'll provide a quote and timeline. Custom orders typically take 4–6 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What is your return policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a 14-day return window from the delivery date. Items must be unused and in original packaging. Return shipping is the buyer's responsibility. Refunds are processed within 5 business days.",
      },
    },
    {
      "@type": "Question",
      name: "Are the products really one-of-a-kind?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Every piece is handcrafted individually — no molds, no mass production. Even if we create something similar, no two pieces are ever identical. Once a piece sells, it's gone forever.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
