import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function POST(req) {
  try {
    console.log("POST /api/courses called");

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);
    console.log("Collection obtained:", coursesCollection.collectionName);

    const body = await req.json();
    console.log("Request body:", body);

    // Validation
    if (!body.title || !body.instructor) {
      console.log("Validation failed");
      return NextResponse.json(
        { success: false, message: "Title and Instructor required" },
        { status: 400 }
      );
    }

    if (body.price) body.price = Number(body.price);
    body.createdAt = new Date();

    const result = await coursesCollection.insertOne(body);
    console.log("Insert result:", result);

    return NextResponse.json({
      success: true,
      message: "Course added successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Server error in /api/courses:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}