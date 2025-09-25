import { NextResponse } from "next/server";
import { dbConnect, collectionNames } from "@/library/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect(collectionNames.noticeCollection);
    const data = await collection.find({ department: "academic" }).toArray();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
