import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET: Fetch all events
export async function GET() {
  try {
    const collection = await dbConnect("events");
    const events = await collection.find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST: Add new event
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const details = formData.get("details");
    const location = formData.get("location");
    const fees = formData.get("fees");
    const image = formData.get("image");

   
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    let imagePath = "";
    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, image.name);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${image.name}`;
    }

    const collection = await dbConnect("events");
    const newEvent = {
      title,
      startDate,
      endDate,
      details,
      location,
      fees,
      image: imagePath,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newEvent);
    return NextResponse.json(
      { success: true, message: "Event added successfully!", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add event." },
      { status: 500 }
    );
  }
}
