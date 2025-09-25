import { NextResponse } from "next/server";
import { collectionNames, dbConnect } from "@/library/dbConnect";
export async function GET() {
  try {
    const collection = await dbConnect(collectionNames.classRoutineCollection);
    const data = await collection.find().toArray();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect(collectionNames.classRoutineCollection);

    const newRoutine = {
      class: body.class,
      section: body.section,
      subject: body.subject,
      teacher: body.teacher,
      time: body.time,
      createdAt: new Date(),
    };

    await collection.insertOne(newRoutine);
    return NextResponse.json(newRoutine, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
