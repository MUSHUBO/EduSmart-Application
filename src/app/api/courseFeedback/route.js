import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

// 🔵 POST new feedback
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect(collectionNamesObj.coursesFeedbackCollection);

    // Validate required fields
    if (!body.userName || !body.userEmail || !body.comment || !body.rating) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Add createdAt timestamp
    const newFeedback = {
      ...body,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newFeedback);

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// 🟢 GET all feedback
export async function GET() {
  try {
    const collection = await dbConnect(collectionNamesObj.coursesFeedbackCollection);
    const allFeedbacks = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: allFeedbacks });
  } catch (error) {
    console.error("GET feedback error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
