import { dbConnect } from "@/library/dbConnect";

export async function GET() {
  try {
    
    const collection = await dbConnect("exam");


    const exams = await collection.find().toArray();

 
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
