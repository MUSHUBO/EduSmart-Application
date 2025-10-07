import { dbConnect, collectionNamesObj } from "@/library/dbConnect";

export async function GET() {
    try {
        const collection = await dbConnect(collectionNamesObj.userCollection);
        const allUser = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({
            success: true,
            data: allUser,
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
