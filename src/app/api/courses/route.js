import { NextResponse } from "next/server";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";
import nodemailer from "nodemailer";

// GET 6 (newly added)
export async function GET() {
  try {
    console.log("GET /api/courses/limited called");

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);

    // Fetch only 6 latest courses
    const courses = await coursesCollection
      .find()
      .sort({ createdAt: -1 }) // newest first
      .limit(6)
      .toArray();

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Server error in GET /api/courses/limited:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}



export async function POST(req) {
  try {
    // console.log("POST /api/courses called");

    const coursesCollection = await dbConnect(collectionNamesObj.courseCollection);
    const userCollection = await dbConnect(collectionNamesObj.userCollection);
    const body = await req.json();

    // Validation
    if (!body.title || !body.instructor) {
      return NextResponse.json(
        { success: false, message: "Title and Instructor required" },
        { status: 400 }
      );
    }

    //  Prepare and insert course
    body.createdAt = new Date();
    const result = await coursesCollection.insertOne(body);

    //  Get all user emails
    const users = await userCollection.find({}, { projection: { email: 1 } }).toArray();
    const emailList = users.map((u) => u.email).filter(Boolean);

    // console.log(` Sending mail to ${emailList.length} users...`);

    //  Setup Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //  Send emails to all users
    await Promise.all(
      emailList.map((email) =>
        transporter.sendMail({
          from: `"EduSmart" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `New Course Added: ${body.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #2563eb;"> New Course Available!</h2>
              <p><strong>Course:</strong> ${body.title}</p>
              <p><strong>Instructor:</strong> ${body.instructor}</p>
              ${body.description ? `<p>${body.description}</p>` : ""}
              <a href="${process.env.NEXTAUTH_URL}/allCourses"
                style="display:inline-block;margin-top:10px;background:#2563eb;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">
                View Course
              </a>
            </div>
          `,
        })
      )
    );

    console.log("All emails sent successfully!");

    return NextResponse.json({
      success: true,
      message: "Course added & emails sent!",
      data: result,
    });
  } catch (error) {
    console.error("Error in /api/courses:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
