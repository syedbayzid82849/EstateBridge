"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";

const FeaturedProperties = () => {
    const featured = properties.filter((p) => p.featured).slice(0, 4);

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-accent font-semibold text-sm tracking-widest uppercase">
                        Handpicked For You
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                        Featured Properties
                    </h2>

                    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                        Explore our curated selection of premium properties in the most sought-after locations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((property, i) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            index={i}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" asChild className="rounded-xl">
                        <Link href="/properties" className="flex items-center gap-2">
                            View All Properties
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;
