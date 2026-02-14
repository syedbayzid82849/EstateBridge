import { mongoConnect } from "@/lib/mongoConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}

export async function POST(req: NextRequest) {
    try {
        const {client, db } = await mongoConnect();
        const { email, password } = await req.json();

        // find user
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        // generate jwr 
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email, 
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // success
        const res = NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
            },
        );
        return res;
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
