import { NextResponse } from "next/server";
import OpenAI from "openai";
import jwt from "jsonwebtoken";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ success:false, message:"Missing token" }, { status:401 });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: decoded.parentEmail });

    if (!student) return NextResponse.json({ success:false, message:"Student not found" }, { status:404 });

    const avgFocus = 82;
    const participation = 78;
    const late = 2;
    const moods = [{day:"Mon", mood:"focused"}, {day:"Tue", mood:"stressed"}, {day:"Wed", mood:"happy"}];

    const prompt = `
You are a kind and professional counselor. 
Write a 120-word summary report for the parent of ${student.studentFirstName} ${student.studentLastName}.
Focus Score: ${avgFocus}, Participation: ${participation}%, Late Submissions: ${late}, Recent moods: ${JSON.stringify(moods)}.
Include:
1. Brief summary.
2. Key emotional observation.
3. Two actionable parenting tips.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    return NextResponse.json({
      success: true,
      report: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("Report Error:", err);
    return NextResponse.json({ success:false, message: err.message }, { status:500 });
  }
}
