import { NextResponse } from "next/server";


export async function POST(req) {
  const data = await req.json();

  console.log("Form Data:", data);

  return NextResponse.json({ success: true, message: "Form received!" });
}
