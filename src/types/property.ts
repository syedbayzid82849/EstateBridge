// src/app/types/properties.ts

export type PropertyType = "villa" | "apartment" | "house" | "condo" | "townhouse" | "office";
export type ListingType = "sale" | "rent";
export type PropertyStatus = "available" | "sold" | "rented" | "pending";

export interface TProperty {
    _id?: string;
    id?: string;
    title: string;
    price: number;
    location: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    area: number; // in square meters or square feet
    image: string;
    type: ListingType;
    propertyType: PropertyType;
    featured: boolean;
    description: string;
    
    amenities: string[];
    yearBuilt: number;
    status?: PropertyStatus;
    userEmail?: string;
    ownerId?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface PropertyFormData {
    title: string;
    price: number;
    location: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: ListingType;
    propertyType: PropertyType;
    featured: boolean;
    description: string;
    amenities: string[];
    yearBuilt: number;
    status?: PropertyStatus;
}

export interface PropertyFilters {
    city?: string;
    type?: ListingType;
    propertyType?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minArea?: number;
    maxArea?: number;
    featured?: boolean;
    status?: PropertyStatus;
}

export interface PropertySearchParams {
    query?: string;
    city?: string;
    type?: ListingType;
    propertyType?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    sort?: "price-asc" | "price-desc" | "date-desc" | "date-asc";
    page?: number;
    limit?: number;
}

export interface PropertyResponse {
    success: boolean;
    property?: TProperty;
    properties?: TProperty[];
    count?: number;
    totalPages?: number;
    currentPage?: number;
    error?: string;
    message?: string;
}

export interface PropertyStats {
    totalProperties: number;
    forSale: number;
    forRent: number;
    featured: number;
    byCity: Record<string, number>;
    byPropertyType: Record<string, number>;
    averagePrice: number;
}