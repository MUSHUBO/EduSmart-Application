import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";
export async function GET(req) {
  try {
   
    const department = req.nextUrl.searchParams.get("department");

    const collection = await dbConnect("notices");

    let query = {};
    if (department) {
      query.department = department;
    }

    const notices = await collection.find(query).sort({ date: -1 }).toArray();
    console.log("Fetched Notices:", notices);

    return NextResponse.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("notices");

    if (!body.title || !body.date || !body.department) {
      return NextResponse.json(
        { message: "Missing required fields: title, date, department" },
        { status: 400 }
      );
    }

    const newNotice = {
      title: body.title,
      date: body.date,
      department: body.department, 
      download: body.download || "",
      view: body.view || "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newNotice);

    return NextResponse.json(
      { message: "Notice added successfully", notice: { ...newNotice, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
