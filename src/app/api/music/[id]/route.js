// import { ObjectId } from "mongodb";
// import clientPromise from "@/app/lib/mongodb";

// export async function GET(req, { params }) {
//   if (req.method !== "GET") {
//     return new Response(JSON.stringify({ error: "Method not allowed" }), {
//       status: 405,
//     });
//   }

//   const { id } = params; // Get file ID from params
//   if (!id) {
//     return new Response(JSON.stringify({ error: "File ID is required" }), {
//       status: 400,
//     });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("music");
//     const bucket = new GridFSBucket(db);

//     const stream = bucket.openDownloadStream(new ObjectId(id));

//     return new Response(stream, {
//       headers: {
//         "Content-Type": "audio/mpeg",
//         "Content-Disposition": `inline; filename="music.mp3"`,
//       },
//     });
//   } catch (error) {
//     console.error("Error retrieving file:", error);
//     return new Response(JSON.stringify({ error: "Error retrieving file" }), {
//       status: 500,
//     });
//   }
// }

import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

export async function GET(req, context) {
  const { id } = context.params; // Correct way to extract params in Next.js API

  if (!id) {
    return new Response(JSON.stringify({ error: "File ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("music");
    const bucket = new GridFSBucket(db);

    const stream = bucket.openDownloadStream(new ObjectId(id));

    // Convert Node.js stream to Web Stream
    const readableStream = Readable.toWeb(stream);

    return new Response(readableStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `inline; filename="music.mp3"`,
      },
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    return new Response(JSON.stringify({ error: "Error retrieving file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
