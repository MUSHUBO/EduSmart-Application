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

    // 1️⃣ Save the user's message first
    if (role === "person") {
      await conversationsCollection.updateOne(
        { _id: new ObjectId(convId) },
        { $push: { messages: { role, message, createdAt: new Date() } } }
      );
    }

    let aiMessage = null;

    // 2️⃣ Call OpenRouter only if the role is "person"
    if (role === "person") {
      const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // server-side
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are Mithu, a friendly and knowledgeable tutor. Answer the students questions clearly and helpfully.",
            },
            { role: "user", content: message },
          ],
        }),
      });

      const aiData = await aiRes.json();
      console.log(aiData)
      aiMessage =
        aiData?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      // 3️⃣ Save the assistant message
      await conversationsCollection.updateOne(
        { _id: new ObjectId(convId) },
        { $push: { messages: { role: "assistant", message: aiMessage, createdAt: new Date() } } }
      );
    }

    // ✅ Return updated conversation
    const updatedConversation = await conversationsCollection.findOne({
      _id: new ObjectId(convId),
    });

    return NextResponse.json({
      success: true,
      conversation: updatedConversation,
      aiMessage, // optional: return AI response separately if needed
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
