import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { convId, role, message } = await req.json();

    if (!convId || !message) {
      return NextResponse.json({
        success: false,
        error: "Missing conversation ID or message.",
      });
    }

    const conversationsCollection = await dbConnect("conversations");

    // ✅ Push the new message into the messages array
    const result = await conversationsCollection.updateOne(
      { _id: new ObjectId(convId) },
      { $push: { messages: { role, message, createdAt: new Date() } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({
        success: false,
        error: "Conversation not found or update failed.",
      });
    }

    // ✅ Return updated conversation
    const updatedConversation = await conversationsCollection.findOne({
      _id: new ObjectId(convId),
    });

    return NextResponse.json({
      success: true,
      conversation: updatedConversation,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
