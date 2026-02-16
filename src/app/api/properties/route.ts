import { mongoConnect } from "@/lib/mongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { client, db } = await mongoConnect();
        const properties = await db.collection("properties").find({}).toArray();
        const formattedProperties = properties.map((property) => ({
            id: property._id.toString(),
            title: property.title,
            price: property.price,
            location: property.location,
            city: property.city,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area,
            image: property.image,
            type: property.type,
            propertyType: property.propertyType,
            featured: property.featured,
            description: property.description,
            amenities: property.amenities,
            yearBuilt: property.yearBuilt,
            status: property.status,
            ownerId: property.ownerId,
            createdAt: property.createdAt?.toISOString(),
            updatedAt: property.updatedAt?.toISOString(),
        }));
        // client.close();
        return NextResponse.json(formattedProperties, {
            status: 200,
        });
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch properties" }), { status: 500 });
    }
}


