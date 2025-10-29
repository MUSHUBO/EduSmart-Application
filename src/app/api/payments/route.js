import { NextResponse } from "next/server";
import { collectionNamesObj, dbConnect } from "@/library/dbConnect";

export async function POST(req) {
  try {

    const paymentCollection = await dbConnect(collectionNamesObj.paymentsCollection);
    const paymentRecord = await req.json();

    // Payment record save করো
    const res = await paymentCollection.insertOne({
      ...paymentRecord,
      createdAt: new Date(),
    });

    return NextResponse.json({ insertedId: res.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error saving payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
