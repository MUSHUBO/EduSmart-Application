import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    // Database connect
    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: email });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Parent not found" },
        { status: 404 }
      );
    }


    return NextResponse.json({
      success: true,
      message: "Login successful",
      parent: {
        name: `${student.parentFirstName} ${student.parentLastName}`,
        email: student.parentEmail,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error: " + err.message },
      { status: 500 }
    );
  }
}
