"use client";

import PropertyCard from "@/components/cards/PropertyCard";
import { TProperty } from "@/types/property";
import { useEffect, useState } from "react";

const PropertiesPage: React.FC = () => {
    const [properties, setProperties] = useState<TProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/properties")
            .then((res) => res.json())
            .then((data) => setProperties(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
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
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Properties</h1>

            {properties.length === 0 ? (
                <p className="text-gray-500">No properties available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertiesPage;