import HeroSection from "@/components/landing/HeroSection";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import CategorySection from "@/components/landing/CategorySection";
import BrandStory from "@/components/landing/BrandStory";
import Testimonials from "@/components/landing/Testimonials";
import Newsletter from "@/components/landing/Newsletter";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <FeaturedProducts />
      <SectionDivider />
      <CategorySection />
      <SectionDivider />
      <BrandStory />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Newsletter />
    </>
  );
}
