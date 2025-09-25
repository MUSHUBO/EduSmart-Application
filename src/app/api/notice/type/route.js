import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";


export async function GET(req) {
  try {
    const type = req.nextUrl.searchParams.get("type"); 
    const collection = await dbConnect("academic");

    let query = {};
    if (type) {
      query.type = type;
    }

    const academics = await collection.find(query).sort({ createdAt: -1 }).toArray();
    console.log("Fetched Academics:", academics);

    return NextResponse.json(academics);
  } catch (error) {
    console.error("Error fetching academic data:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("academic");

    if (!body.type) {
      return NextResponse.json(
        { message: "Missing required field: type" },
        { status: 400 }
      );
    }

    const newAcademic = {
      type: body.type,       
      download: body.download || "",
      view: body.view || "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newAcademic);

    return NextResponse.json(
      { 
        message: "Academic notice added successfully", 
        academic: { ...newAcademic, _id: result.insertedId } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating academic data:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
