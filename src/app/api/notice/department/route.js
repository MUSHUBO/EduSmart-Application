import { NextResponse } from "next/server";
import { dbConnect } from "@/library/dbConnect";

export async function GET(req) {
  try {
    const collection = await dbConnect("notices");

    const noticesByDepartment = await collection
      .aggregate([
        {
          $group: {
            _id: "$department",
            notices: { $push: "$$ROOT" }, 
          },
        },
        { $sort: { "_id": 1 } }, 
      ])
      .toArray();

    
    const result = {};
    noticesByDepartment.forEach((group) => {
      result[group._id] = group.notices.sort(
        (a, b) => new Date(b.date) - new Date(a.date) 
      );
    });

    console.log("Grouped Notices:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
