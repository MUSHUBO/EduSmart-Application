import { dbConnect } from "@/library/dbConnect";

export async function GET() {
  try {
    const noticesCol = await dbConnect("notices");
    const eventsCol = await dbConnect("events");
    const examsCol = await dbConnect("exam");

    const noticeCount = await noticesCol.countDocuments();
    const eventCount = await eventsCol.countDocuments();
    const examCount = await examsCol.countDocuments();


    const totalStudents = 1250;

    return new Response(
      JSON.stringify({
        students: totalStudents,
        notices: noticeCount,
        events: eventCount,
        achievements: examCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
