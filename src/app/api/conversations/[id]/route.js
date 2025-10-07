import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const conversationsCollection = await dbConnect("conversations");
    const conversation = await conversationsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!conversation) {
      return NextResponse.json({
        success: false,
        error: "Conversation not found.",
      });
    }

    return NextResponse.json({ success: true, conversation });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
