import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const teacherId = formData.get("teacherId");
    const attachmentUrl = formData.get("attachmentUrl");

    if (!title || !description || !dueDate || !teacherId) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const assignment = {
      title,
      description,
      dueDate,
      teacherId,
      attachmentUrl: attachmentUrl || "",
      createdAt: new Date(),
    };

    const collection = await dbConnect("assignments");
    await collection.insertOne(assignment);

    return NextResponse.json({ message: "Assignment saved successfully." });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
}
}
