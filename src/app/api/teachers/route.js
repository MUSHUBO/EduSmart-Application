import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

// Add New Teacher
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect(collectionNamesObj.teacherCollection);

    const newTeacher = {
      ...body,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newTeacher);

    return NextResponse.json({
      success: true,
      message: "Teacher added successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error adding teacher:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Get All Teachers
export async function GET() {
  try {
    const collection = await dbConnect(collectionNamesObj.teacherCollection);
    const allTeachers = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: allTeachers,
    });
  } catch (error) {
    console.error("GET teachers error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
