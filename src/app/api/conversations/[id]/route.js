import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";
import { ObjectId } from "mongodb";

// ... (Your existing GET function) ...
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

// DELETE a single conversation by ID
export async function DELETE(req, context) {
  try {
    // 1. Extract the ID from the URL parameters
    const { id } = await context.params; // 2. Validate the ID to ensure it's a valid MongoDB ObjectId format

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid conversation ID format.",
        },
        { status: 400 }
      );
    } // 3. Connect to the database and get the collection

    const conversationsCollection = await dbConnect("conversations"); // 4. Attempt to delete the conversation

    const result = await conversationsCollection.deleteOne({
      _id: new ObjectId(id),
    }); // 5. Check if a document was actually deleted

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Conversation not found or already deleted.",
        },
        { status: 404 }
      );
    } // 6. Return success response

    return NextResponse.json({
      success: true,
      message: `Conversation with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred during deletion.",
      },
      { status: 500 }
    );
  }
}

// Rename a single conversation
export async function PATCH(req, context) {
  try {
    // 1. Extract the ID from the URL parameters
    const { id } = await context.params; // 2. Parse the request body to get the new title
    const body = await req.json();
    const { title: newTitle } = body; // 3. Basic validation

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid conversation ID format.",
        },
        { status: 400 }
      );
    }

    if (
      !newTitle ||
      typeof newTitle !== "string" ||
      newTitle.trim().length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid title is required for renaming.",
        },
        { status: 400 }
      );
    } // 4. Connect to the database and get the collection

    const conversationsCollection = await dbConnect("conversations"); // 5. Update the conversation document
    const result = await conversationsCollection.updateOne(
      { _id: new ObjectId(id) }, // Filter: Find the conversation by ID
      { $set: { title: newTitle.trim() } } // Update: Set the new title
    ); // 6. Check if a document was modified

    if (result.modifiedCount === 0) {
      // This could mean the ID wasn't found or the title was identical
      if (result.matchedCount === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Conversation not found.",
          },
          { status: 404 }
        );
      } // If matched but not modified, the title was likely the same, still success for the user's intent
      return NextResponse.json({
        success: true,
        message: "Title not changed (new title was identical to old title).",
      });
    } // 7. Return success response

    return NextResponse.json({
      success: true,
      message: `Conversation ID ${id} renamed successfully.`,
      newTitle: newTitle.trim(),
    });
  } catch (error) {
    console.error("Error renaming conversation:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred during renaming.",
      },
      { status: 500 }
    );
  }
}
