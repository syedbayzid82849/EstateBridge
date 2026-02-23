import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params : { params: { id: string } }) {
    const id = await params.params.id;
    console.log("[id]:", id);
    try {
        const { db, client } = await mongoConnect();
        const property = await db.collection("properties").findOne({_id:new ObjectId(id)});
        const response = new Response(JSON.stringify(property), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        return response;    


    } catch (error) {
        console.error("Error fetching property:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}