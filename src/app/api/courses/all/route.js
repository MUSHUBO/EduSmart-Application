import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("GET /api/courses/all called");

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);

    // fetch all courses sorted by newest first
    const courses = await coursesCollection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching all courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses", error: error.message },
      { status: 500 }
    );
  }
}