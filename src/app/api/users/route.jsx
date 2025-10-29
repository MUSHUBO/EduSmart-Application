import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";


export async function POST(req) {
  try {
    console.log("POST /api/users called");

    const usersCollection = await dbConnect(collectionNamesObj.userCollection);
    const body = await req.json();

    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name, Email, and Password required" },
        { status: 400 }
      );
    }

    // already exist check
    const existing = await usersCollection.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    body.createdAt = new Date();

    const result = await usersCollection.insertOne(body);

    return NextResponse.json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Server error in POST /api/user:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("GET /api/users called (fetch users)");

    const usersCollection = await dbConnect(collectionNamesObj.userCollection);
    const users = await usersCollection.find().toArray();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Server error in GET /api/user:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}



