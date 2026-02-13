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
    router.push(
      `/properties?search=${searchQuery}&type=${listingType}`
    );
  };

  return (
    <section className="relative mt-18 min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Luxury modern home at twilight"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-yellow-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Find Your Dream Property
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Where Every Door
            <br />
            <span className="text-yellow-400">
              Opens Possibility
            </span>
          </h1>

          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Discover exceptional properties across the globe.
            Your perfect home is just a search away.
          </p>
        </motion.div>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl">
            {/* Tabs */}
            {/* <div className="flex gap-1 mb-3 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setListingType("sale")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                  listingType === "sale"
                    ? "bg-black text-white"
                    : "text-gray-600"
                }`}
              >
                Buy
              </button>

              <button
                onClick={() => setListingType("rent")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                  listingType === "rent"
                    ? "bg-black text-white"
                    : "text-gray-600"
                }`}
              >
                Rent
              </button>
            </div> */}

            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by city..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch()
                  }
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              <Button
                onClick={handleSearch}
                className="rounded-xl px-6"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
