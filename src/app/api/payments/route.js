import { NextResponse } from "next/server";
import { collectionNamesObj, dbConnect } from "@/library/dbConnect";

export async function POST(req) {
  try {
    const paymentCollection = await dbConnect(collectionNamesObj.paymentsCollection);
    const paymentRecord = await req.json();

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


export async function GET(req) {
  try {
    const paymentCollection = await dbConnect(collectionNamesObj.paymentsCollection);
    const email = req.nextUrl.searchParams.get("email");

    let payments;

    if (email) {
      payments = await paymentCollection
        .find({ userEmail: email })
        .sort({ createdAt: -1 })
        .toArray();
    } else {
      payments = await paymentCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    }

    return NextResponse.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Server error in GET /api/payments:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
