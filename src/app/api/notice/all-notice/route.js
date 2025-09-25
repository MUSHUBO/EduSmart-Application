// src/app/api/notice/route.js
export async function GET(req) {
  try {
    const department = req.nextUrl.searchParams.get("department");
    const collection = await dbConnect("notices");

    let query = {};
    if (department) query.department = department;

    const notices = await collection.find(query).sort({ date: -1 }).toArray();
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
