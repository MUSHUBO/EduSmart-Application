import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

// GET books by Gmail query
export async function GET(req) {
  try {
    console.log("GET /api/books called");

    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email query parameter is required." },
        { status: 400 }
      );
    }

    const booksCollection = await dbConnect(collectionNamesObj.bookCollection);

    const books = await booksCollection
      .find({ gmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    if (!books.length) {
      return NextResponse.json({
        success: true,
        message: "No books found for this teacher.",
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
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
