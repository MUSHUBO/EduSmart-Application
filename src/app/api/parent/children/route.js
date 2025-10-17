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


    if (!children.length) {
      const demo = [
        { _id: 1, studentFirstName: "Arif", studentLastName: "Hasan", grade: "Grade 6" },
        { _id: 2, studentFirstName: "Mim", studentLastName: "Akter", grade: "Grade 8" },
      ];
      return NextResponse.json({ success: true, data: demo });
    }

    return NextResponse.json({ success: true, data: children });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
