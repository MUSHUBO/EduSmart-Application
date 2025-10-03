export async function GET() {
    try {
        const collection = await dbConnect("users");
        const allUser = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ allUser });
        // return allUser;
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
