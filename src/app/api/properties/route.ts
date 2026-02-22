import { mongoConnect } from "@/lib/mongoConnect";
import { TProperty } from "@/types/property";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { db } = await mongoConnect();
        const properties = await db.collection("properties").find({}).toArray();

        // ✅ _id → id convert + price fallback
        const formattedProperties = properties.map((property) => ({
            ...property,
            id: property?._id.toString(),
            _id: property?._id.toString(),
            price: property?.price ?? property?.price_usd ?? 0,
        }));

        return NextResponse.json(formattedProperties, { status: 200 });
    } catch (error) {
        console.error("Error fetching properties:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch properties" }),
            { status: 500 }
        );
    }
}

// Post request handler for creating a new property (for admin users)
export async function POST(req: NextRequest) {
    try {
        const { db } = await mongoConnect();
        const propertyData: TProperty = await req.json();

        // Validation
        if (!propertyData.title || !propertyData.price || !propertyData.location || !propertyData.city) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create property document for MongoDB
        const propertyDocument = {
            title: propertyData.title,
            price: propertyData.price,
            location: propertyData.location,
            city: propertyData.city,
            bedrooms: propertyData.bedrooms,
            bathrooms: propertyData.bathrooms,
            area: propertyData.area,
            image: propertyData.image,
            type: propertyData.type,
            propertyType: propertyData.propertyType,
            featured: propertyData.featured || false,
            description: propertyData.description,
            amenities: propertyData.amenities || [],
            yearBuilt: propertyData.yearBuilt,
            ownerId: propertyData.ownerId,
            status: "available" as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Insert into MongoDB
        const result = await db.collection("properties").insertOne(propertyDocument);

        // ✅ Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Property created successfully",
                propertyId: result.insertedId.toString(),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json(
            { error: "Failed to create property" },
            { status: 500 }
        );
    }
}