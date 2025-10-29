import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);

    const course = await coursesCollection.findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Server error in GET /api/courses/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}