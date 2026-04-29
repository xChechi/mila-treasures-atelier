import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/data";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import CategorySection from "@/components/landing/CategorySection";
import BrandStory from "@/components/landing/BrandStory";
import Testimonials from "@/components/landing/Testimonials";
import Newsletter from "@/components/landing/Newsletter";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Mila Treasures Atelier | Handcrafted Dark Elegance",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <FeaturedProducts products={products} />
      <SectionDivider />
      <CategorySection categories={categories} />
      <SectionDivider />
      <BrandStory />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Newsletter />
    </>
  );
}
