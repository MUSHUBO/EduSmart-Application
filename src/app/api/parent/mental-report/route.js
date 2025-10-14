import { NextResponse } from "next/server";
import OpenAI from "openai";
import jwt from "jsonwebtoken";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ success:false, message: "Missing token" }, { status: 401 });
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: decoded.parentEmail });
    if (!student) return NextResponse.json({ success:false, message:"Student not found" }, { status:404 });

    
    const avgFocus = 82;
    const participation = 78;
    const late = 2;
    const moodSamples = [{day:"Mon", mood:"focused"},{day:"Tue", mood:"stressed"},{day:"Wed",mood:"happy"}];

    const prompt = `
You are a compassionate school counselor assistant. Write a short mental health insight report (100-160 words) for this student's parent.
Student: ${student.studentFirstName} ${student.studentLastName}
Focus Score: ${avgFocus}
Participation: ${participation}%
Late submissions: ${late}
Recent moods: ${JSON.stringify(moodSamples)}

Include: 1. short summary, 2. one main observation, 3. two practical suggestions (positive tone).
`;
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400
    });

    const report = response.choices?.[0]?.message?.content || "No report returned.";
    return NextResponse.json({ success: true, report });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success:false, message: err.message }, { status: 500 });
  }
}
