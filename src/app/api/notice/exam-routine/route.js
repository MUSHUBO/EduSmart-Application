import { dbConnect } from "@/library/dbConnect";

export async function GET() {
  try {
    // connect to "exam" collection
    const collection = await dbConnect("exam");

    // fetch all exam documents
    const exams = await collection.find().toArray();

    // MongoDB _id needs to be converted to string for JSON
    const formattedExams = exams.map((exam) => ({
      ...exam,
      _id: exam._id.toString(),
    }));

    return Response.json(formattedExams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    return Response.json({ error: "Failed to fetch exams" }, { status: 500 });
  }
}
