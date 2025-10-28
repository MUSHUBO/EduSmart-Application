import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";
import nodemailer from "nodemailer";

//  --- GET: Get all books ---
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

//  --- POST: Add a new book ---
export async function POST(req) {
  try {
    console.log("POST /api/books called");

    const booksCollection = await dbConnect(collectionNamesObj.bookCollection);
    const userCollection = await dbConnect(collectionNamesObj.userCollection);
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

    // Duplicate check
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

    // Insert new book
    body.createdAt = new Date();
    const result = await booksCollection.insertOne(body);

    //  Get all user emails
    const users = await userCollection.find({}, { projection: { email: 1 } }).toArray();
    const emailList = users.map((u) => u.email).filter(Boolean);

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send emails to all users
    await Promise.all(
      emailList.map((email) =>
        transporter.sendMail({
          from: `"EduSmart Library" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `New Book Added: ${body.name} in library`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #16a34a;">New Book Available!</h2>
              <img src="${body.photoUrl}" alt="${body.name}" style="max-width: 200px; border-radius: 8px;"/>
              <p><strong>Book:</strong> ${body.name}</p>
              <p><strong>Edition:</strong> ${body.edition}</p>
              <p><strong>Publisher:</strong> ${body.publisher}</p>
              <p><strong>Category:</strong> ${body.category}</p>
              ${body.description ? `<p>${body.description}</p>` : ""}
              <a href="${process.env.NEXTAUTH_URL}/library"
                style="display:inline-block;margin-top:10px;background:#16a34a;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">
                View Book
              </a>
            </div>
          `,
        })
      )
    );

    console.log("All book notification emails sent!");

    return NextResponse.json({
      success: true,
      message: "Book added & emails sent!",
      data: result,
    });
  } catch (error) {
    console.error(" Error in POST /api/books:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
