import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
    }

    const collection = await dbConnect(collectionNamesObj.userCollection);
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: role } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
