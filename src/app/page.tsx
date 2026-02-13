import FeaturedProperties from "@/components/pages/home/FeaturedProperties";
import HeroSection from "@/components/pages/home/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection></HeroSection>
      <FeaturedProperties />
    </div>
  );
}
