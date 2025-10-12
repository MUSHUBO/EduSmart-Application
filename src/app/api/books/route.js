import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

// 📚 --- GET: Get all books ---
export async function GET() {
    try {
        console.log("GET /api/books called");

        const booksCollection = await dbConnect(collectionNamesObj.bookCollection);
        const books = await booksCollection.find().sort({ createdAt: -1 }).toArray();

        return NextResponse.json({
            success: true,
            message: "Books fetched successfully!",
            data: books,
        });
    } catch (error) {
        console.error("Server error in GET /api/books:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

// 📝 --- POST: Add a new book ---
export async function POST(req) {
    try {
        console.log("POST /api/books called");

        const booksCollection = await dbConnect(collectionNamesObj.bookCollection);
        const body = await req.json();

        // Required fields validation
        const requiredFields = [
            "photoUrl",
            "name",
            "rating",
            "comments",
            "edition",
            "category",
            "class",
            "publisher",
            "country",
            "language",
            "description",
            "pdfDriveUrl",
        ];

        const missing = requiredFields.filter((f) => !body[f]);
        if (missing.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Missing required fields: ${missing.join(", ")}`,
                },
                { status: 400 }
            );
        }

        // Duplicate check (same name + edition)
        const existing = await booksCollection.findOne({
            name: body.name,
            edition: body.edition,
        });

        if (existing) {
            return NextResponse.json(
                { success: false, message: "Book with same name & edition already exists" },
                { status: 400 }
            );
        }

        body.createdAt = new Date();

        const result = await booksCollection.insertOne(body);

        return NextResponse.json({
            success: true,
            message: "Book information saved successfully!",
            data: result,
        });
    } catch (error) {
        console.error("Server error in POST /api/books:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
