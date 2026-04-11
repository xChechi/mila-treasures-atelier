import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/ui/PageTransition";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <GrainOverlay />
      <ScrollProgress />
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
