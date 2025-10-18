import { NextResponse } from "next/server";
import OpenAI from "openai";
import jwt from "jsonwebtoken";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) {
      return NextResponse.json({ success: false, message: "Missing token" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { period = "the entire week" } = await req.json();

    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: decoded.parentEmail });

    console.log("Student found:", student);

    if (!student) {
      const demo = `🌟 Demo Weekly Report 🌟  
The student maintained steady concentration throughout ${period}. They balanced academic tasks with healthy social interaction. Encourage continued journaling and breaks to sustain motivation.`;
      return NextResponse.json({ success: true, report: demo, demo: true });
    }


    const metrics = {
      avgFocus: 85,
      participation: 90,
      sleepQuality: "good",
      stressLevel: "moderate",
      moodTrend: [
        { day: "Sun", mood: "Motivated" },
        { day: "Mon", mood: "Energetic" },
        { day: "Tue", mood: "Calm" },
        { day: "Wed", mood: "Focused" },
        { day: "Thu", mood: "Tired" },
    
      ],
    };

    const prompt = `
You are a kind, insightful school counselor. Write a colorful, uplifting **Weekly Mental Health Report** for this student. 
Use friendly emojis, clear section titles (like “🌞 Highlights”, “💡 Suggestions”, “🌈 Overall Mood”), and keep it concise (130–180 words).

Student: ${student.studentFirstName} ${student.studentLastName}
Week Overview: ${period}
Average Focus: ${metrics.avgFocus}%
Participation: ${metrics.participation}%
Sleep Quality: ${metrics.sleepQuality}
Stress Level: ${metrics.stressLevel}
Mood Trend: ${JSON.stringify(metrics.moodTrend)}

Tone: encouraging, emotionally intelligent, positive.
Include 2 short personalized suggestions.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const report = response.choices?.[0]?.message?.content || "No report returned.";

    return NextResponse.json({ success: true, report });
  } catch (err) {
    console.error("Weekly Report Error:", err);
    return NextResponse.json({
      success: true,
      report:
        "🌟 Demo Weekly Report 🌟\nThe student demonstrated great persistence this week! They kept a healthy attitude and worked steadily. Encourage good rest and family time for emotional balance.",
      demo: true,
    });
  }
}
