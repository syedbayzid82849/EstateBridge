export interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: "sale" | "rent";
    propertyType: "house" | "apartment" | "condo" | "villa" | "townhouse";
    featured: boolean;
    description: string;
    amenities: string[];
    yearBuilt: number;
    agent: {
        name: string;
        phone: string;
        image: string;
    };
}

// export const formatPrice = (price: number, type: "sale" | "rent") => {
//     if (type === "rent") {
//         return `$${price.toLocaleString()}/mo`;
//     }
//     return `$${price.toLocaleString()}`;
// };

