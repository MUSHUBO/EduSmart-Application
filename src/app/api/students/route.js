import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function POST(req) {
    try {
        const body = await req.json();
        const collection = await dbConnect(collectionNamesObj.studentCollection);

        // Add createdAt timestamp (optional)
        const newStudent = {
            ...body,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newStudent);

        return NextResponse.json({
            success: true,
            message: "Student added successfully!",
            data: result,
        });
    } catch (error) {
        console.error("Error adding student:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}



export async function GET() {
    try {
        const collection = await dbConnect(collectionNamesObj.studentCollection);
        const allStudents = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ success: true, data: allStudents });
    } catch (error) {
        console.error("GET students error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}