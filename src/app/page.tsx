import FeaturedProperties from "@/components/pages/home/FeaturedProperties";
import HeroSection from "@/components/pages/home/HeroSection";
import { Navbar } from "@/components/pages/home/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection></HeroSection>
      <FeaturedProperties />
    </div>
  );
}
