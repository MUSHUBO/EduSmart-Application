import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";

export async function GET(req) {
  try {
    // Get the query params
    const { searchParams } = new URL(req.url);
    const creator = searchParams.get("creator"); // e.g., /api/conversations/all?creator=email@example.com

    if (!creator) {
      return NextResponse.json({ success: false, error: "Creator is required" });
    }

    const conversationsCollection = await dbConnect("conversations");
    const conversations = await conversationsCollection
      .find({ creator })
      .toArray();

    return NextResponse.json({ success: true, conversations });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
