import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
    const { id } = params;

    try {
        const booksCollection = await dbConnect(collectionNamesObj.bookCollection);
        const review = await req.json();

        const updateResult = await booksCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $push: {
                    rating: review.rating,
                    comments: { comment: review.comment, createdAt: new Date() },
                },
            }
        );

        if (updateResult.modifiedCount === 1) {
            return NextResponse.json({
                success: true,
                message: "Review added successfully!",
                data: review,
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Book not found or review not added" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Server error in PATCH /api/books/[id]/review:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
