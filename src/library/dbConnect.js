import { MongoClient, ServerApiVersion } from "mongodb"


export const collectionNamesObj = {
  userCollection: "users",
  courseCollection: "courses",
  studentCollection: "students",
  teacherCollection: "teachers",
  coursesFeedbackCollection: "courseFeedback",
  bookCollection: "books",
};


let cachedClient = null;

export async function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URL
  const dbName = process.env.DB_NAME

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await cachedClient.connect();

  }

  return cachedClient.db(dbName).collection(collectionName);
}