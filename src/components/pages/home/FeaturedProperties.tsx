"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/cards/PropertyCard";

const FeaturedProperties = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'http://localhost:3000/api/properties'
            );

            if (!response.ok) throw new Error('Failed to fetch properties');

            const data = await response.json();

            // ✅ Shudhu 6 ta featured property show korbe
            const featuredOnly = data.filter((property: any) => property.featured);
            setFeatured(featuredOnly.slice(0, 6)); // ⭐ Ekhane limit add korchi

        } catch (err: any) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

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

                {/* Loading State - 6 ta skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-muted h-64 rounded-xl"></div>
                                <div className="mt-4 space-y-2">
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-4 bg-muted rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12 text-red-500">
                        Error loading properties: {error}
                    </div>
                )}

                {/* Properties Grid */}
                {!loading && !error && (
                    <>
                        {featured.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No featured properties available
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featured.map((property, i) => (
                                    <PropertyCard
                                        key={property._id || property.id}
                                        property={property}
                                        index={i}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

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