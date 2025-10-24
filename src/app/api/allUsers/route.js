import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect(collectionNamesObj.userCollection);

    // Fetch all users, sorted by creation date descending
    const allUsers = await collection.find({}).sort({ createdAt: -1 }).toArray();
    // console.log(allUsers)
    return NextResponse.json({
      success: true,
      users: allUsers, // match frontend key
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
