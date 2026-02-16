import { mongoConnect } from "@/lib/mongoConnect";
import { TProperty } from "@/types/property";
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
            userEmail: propertyData.userEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: "available" as const,
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