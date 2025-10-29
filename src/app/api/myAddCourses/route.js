import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email query parameter is required." },
        { status: 400 }
      );
    }

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);

    const courses = await coursesCollection
      .find({ gmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    if (!courses.length) {
      return NextResponse.json({
        success: true,
        message: "No courses found for this teacher.",
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Server error in GET /api/myAddCourses:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
