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

    const { period = "this week" } = await req.json();

    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: decoded.parentEmail });

    if (!student) {
  
      const demo = `Demo Report: ${student?.studentFirstName || "Student"} showed steady focus.`;
      return NextResponse.json({ success: true, report: demo });
    }

  
    const avgFocus = 82;
    const participation = 78;
    const late = 2;
    const moodSamples = [{day:"Mon", mood:"focused"},{day:"Tue", mood:"stressed"},{day:"Wed", mood:"happy"}];

    const prompt = `
You are a compassionate school counselor assistant. Write a clear 120-160 word mental health insight report for this student's parent.
Student: ${student.studentFirstName} ${student.studentLastName}
Period: ${period}
Focus Score: ${avgFocus}
Participation: ${participation}%
Late Submissions: ${late}
Recent moods: ${JSON.stringify(moodSamples)}
Include a short summary, one major observation, and two practical suggestions in a calm, positive tone.
`;

    
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const report = response.choices?.[0]?.message?.content || "No report returned.";

    return NextResponse.json({ success: true, report });
  } catch (err) {
    console.error("Mental Report Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
