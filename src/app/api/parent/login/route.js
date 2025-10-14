import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });

    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: email });
    if (!student) return NextResponse.json({ success: false, message: "Parent not found" }, { status: 404 });

    const token = jwt.sign({ parentEmail: email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      parent: { name: `${student.parentFirstName} ${student.parentLastName}`, email: student.parentEmail },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
