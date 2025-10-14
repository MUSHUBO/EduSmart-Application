import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ success: false, message: "Missing token" }, { status: 401 });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const collection = await dbConnect(collectionNamesObj.studentCollection);
    const student = await collection.findOne({ parentEmail: decoded.parentEmail });
    if (!student) return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });

    // DEMO data generation (randomized-ish but stable enough for preview)
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const base = [25, 40, 60, 35, 85, 75, 55];
    const moodTrend = days.map((d,i) => ({ day: d, mood: Math.max(10, Math.min(100, base[i] + Math.floor(Math.random()*11-5))) }));
    const focusScore = Math.floor(Math.random()*20) + 75;
    const allEmotions = ["Happy","Focused","Curious","Tired","Stressed","Relaxed","Confident","Playful"];
    const emotions = allEmotions.sort(()=>0.5-Math.random()).slice(0,3);
    const weeklySummaries = [
      "Maintained steady participation and showed strong curiosity in science.",
      "Improved focus midweek; mild stress before math quiz.",
      "Consistent submissions and cheerful engagement.",
      "Slight fatigue midweek but confidence improved by weekend.",
      "Great engagement during group sessions; continue small breaks."
    ];
    const weeklySummary = weeklySummaries[Math.floor(Math.random()*weeklySummaries.length)];

    return NextResponse.json({
      success: true,
      data: {
        studentBasic: { _id: student._id, studentFirstName: student.studentFirstName, studentLastName: student.studentLastName },
        moodTrend, focusScore, emotions, weeklySummary
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
