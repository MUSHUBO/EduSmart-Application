import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";

export async function POST(req) {
  try {
    const { creator } = await req.json(); // data sent from client
    const conversationsCollection = await dbConnect("conversations");

    const result = await conversationsCollection.insertOne({
      creator,
      title: "",
      messages: [],
      createdAt: new Date(),
    });
    const newConversation = await conversationsCollection.findOne({
      _id: result.insertedId,
    });

    return NextResponse.json({ success: true, conversation: newConversation });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE() {
  try {
    const conversationsCollection = await dbConnect("conversations");

    // Delete all documents
    const result = await conversationsCollection.deleteMany({});

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
