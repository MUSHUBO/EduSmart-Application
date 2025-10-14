import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ success: false, message: "Missing token" }, { status: 401 });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const children = await collection.find({ parentEmail: decoded.parentEmail }).toArray();

    return NextResponse.json({ success: true, data: children });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
