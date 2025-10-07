import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

// ✅ POST (already done)
export async function POST(req) {
  try {
    console.log("POST /api/courses called");

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);
    const body = await req.json();

    // Validation
    if (!body.title || !body.instructor) {
      return NextResponse.json(
        { success: false, message: "Title and Instructor required" },
        { status: 400 }
      );
    }

    if (body.price) body.price = Number(body.price);
    body.createdAt = new Date();

    const result = await coursesCollection.insertOne(body);

    return NextResponse.json({
      success: true,
      message: "Course added successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Server error in POST /api/courses:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ GET 6 (newly added)
export async function GET() {
  try {
    console.log("GET /api/courses/limited called");

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);

    // Fetch only 6 latest courses
    const courses = await coursesCollection
      .find()
      .sort({ createdAt: -1 }) // newest first
      .limit(6)
      .toArray();

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Server error in GET /api/courses/limited:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}