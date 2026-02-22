"use client";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TProperty } from "@/types/property";
import Image from "next/image";

interface PropertyCardProps {
    property: TProperty;
    index?: number;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <Link href={`/properties/${property.id}`} className="block">
            <Card className="group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-lg">

                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={property?.image || "/placeholder.jpg"}
                        alt={property?.title || "Property Image" }
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <Badge>
                            For {property.type === "sale" ? "Sale" : "Rent"}
                        </Badge>

                        {property.featured && (
                            <Badge variant="secondary">
                                Featured
                            </Badge>
                        )}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 right-3 rounded-lg bg-background/90 px-3 py-1 text-lg font-semibold backdrop-blur">
                        ${(property.price ?? 0).toLocaleString()}
                    </div>
                </div>

                {/* Content */}
                <CardContent className="p-5 space-y-3">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-primary line-clamp-1">
                        {property.title}
                    </h3>

                    <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm line-clamp-1">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            {property.bedrooms} Beds
                        </div>

                        <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            {property.bathrooms} Baths
                        </div>

                        <div className="flex items-center gap-1">
                            <Maximize className="h-4 w-4" />
                            {property.area} sqft
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default PropertyCard;
