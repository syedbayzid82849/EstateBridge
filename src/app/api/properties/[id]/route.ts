import { mongoConnect } from "@/lib/mongoConnect";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log("[id]:", id);

    if (!ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ error: "Invalid property ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const { db } = await mongoConnect();

        const property = await db
            .collection("properties")
            .findOne({ _id: new ObjectId(id) });

        if (!property) {
            return new Response(JSON.stringify({ error: "Property not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(property), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching property:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}