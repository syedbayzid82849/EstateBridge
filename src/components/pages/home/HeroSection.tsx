"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/properties?search=${searchQuery}&type=${listingType}`);
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg" // Ensure this image is in your public folder
          alt="EstateBridge Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-brightness-75" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Serif Heading - uses Playfair Display from your CSS */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 font-serif">
            Where Every Door
            <br />
            <span className="text-secondary">Opens Possibility</span>
          </h1>

          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-12">
            Discover exceptional properties across the globe. Your perfect home is just a search away.
          </p>
        </motion.div>

        {/* Search box matching the image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/20">
            {/* Buy/Rent Toggle Tabs */}
            <div className="flex w-full mb-2">
              <button
                onClick={() => setListingType("sale")}
                className={`flex-1 py-3 text-sm font-semibold rounded-t-xl transition-all duration-300 ${
                  listingType === "sale"
                    ? "bg-primary text-white"
                    : "text-primary/60 hover:bg-gray-100"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setListingType("rent")}
                className={`flex-1 py-3 text-sm font-semibold rounded-t-xl transition-all duration-300 ${
                  listingType === "rent"
                    ? "bg-primary text-white"
                    : "text-primary/60 hover:bg-gray-100"
                }`}
              >
                Rent
              </button>
            </div>

            {/* Input and Search Button */}
            <div className="flex flex-col md:flex-row items-center gap-3 p-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl w-full">
                <MapPin className="h-5 w-5 text-primary/40 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full bg-transparent outline-none text-primary font-medium placeholder:text-gray-400"
                />
              </div>

              <Button
                onClick={handleSearch}
                className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-primary font-bold px-10 py-6 rounded-xl transition-transform active:scale-95"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section (from the image) */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-white">
          <div>
            <p className="text-3xl font-bold">2,500+</p>
            <p className="text-sm opacity-80 uppercase tracking-widest">Properties</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1,200+</p>
            <p className="text-sm opacity-80 uppercase tracking-widest">Happy Clients</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50+</p>
            <p className="text-sm opacity-80 uppercase tracking-widest">Cities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;