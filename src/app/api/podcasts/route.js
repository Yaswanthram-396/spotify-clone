import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
  try {
    console.log("Incoming Request:", req.url);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Spotify");
    const audioCollection = db.collection("Podcasts");

    // Fetch all audio from the collection
    const audio = await audioCollection.find({}).toArray();

    console.log("audio Found:", audio.length);

    // Correct way to return JSON response in Next.js API routes
    return new Response(JSON.stringify({ audio }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching audio:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
