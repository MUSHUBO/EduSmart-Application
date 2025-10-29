import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";

export async function GET(req) {
  try {
    const classValue = req.nextUrl.searchParams.get("class");
    const collection = await dbConnect("exam");

    let query = {};
    if (classValue) query.class = classValue;

    const exams = await collection.find(query).sort({ date: -1 }).toArray();
    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("exam");

    if (!body.title || !body.date || !body.class) {
      return NextResponse.json(
        { message: "Missing required fields: title, date, class" },
        { status: 400 }
      );
    }

    const newExam = {
      title: body.title,
      date: body.date,
      class: body.class, 
      download: body.download || "",
      view: body.view || "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newExam);

    return NextResponse.json(
      {
        message: "Exam added successfully",
        exam: { ...newExam, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding exam:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
