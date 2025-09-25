import { NextResponse } from "next/server";
import { collectionNames, dbConnect } from "@/library/dbConnect";
export async function GET() {
  try {
    const collection = await dbConnect(collectionNames.holidayCollection);
    const data = await collection.find().toArray();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect(collectionNamesObj.holidayCollection);

    const newHoliday = {
      name: body.name,
      date: body.date,
      createdAt: new Date(),
    };

    await collection.insertOne(newHoliday);
    return NextResponse.json(newHoliday, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
