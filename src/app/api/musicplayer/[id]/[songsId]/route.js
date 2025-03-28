// import { ObjectId } from "mongodb";
// import jwt from "jsonwebtoken";
// import clientPromise from "@/app/lib/mongodb";

// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// export async function GET(req, { params: { id, songsId } }) {
//   console.log("Fetching specific song...");

//   try {
//     // Extract Authorization header
//     const authHeader =
//       req.headers.get("authorization") || req.headers.get("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       jwt.verify(token, SECRET_KEY);
//     } catch (error) {
//       return new Response(JSON.stringify({ message: "Invalid Token" }), {
//         status: 403,
//       });
//     }

//     console.log("Album ID:", id, "Song ID:", songsId);

//     const client = await clientPromise;
//     const db = client.db("Spotify");

//     // Ensure ID is an ObjectId if stored as ObjectId in MongoDB
//     const album = await db
//       .collection("Albums")
//       .findOne({ _id: new ObjectId(id) });

//     if (!album) {
//       return new Response(JSON.stringify({ message: "Album not found" }), {
//         status: 404,
//       });
//     }

//     // Ensure Album field exists and is an array
//     if (!album.Album || !Array.isArray(album.Album)) {
//       return new Response(
//         JSON.stringify({ message: "No songs available in album" }),
//         { status: 404 }
//       );
//     }

//     // Find song in Album array
//     const song = album.Album.find((s) => s.id?.toString() === songsId);

//     if (!song) {
//       return new Response(JSON.stringify({ message: "Song not found" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify({ song }), { status: 200 });
//   } catch (error) {
//     console.error("Server Error:", error);
//     return new Response(JSON.stringify({ message: "Server Error" }), {
//       status: 500,
//     });
//   }
// }

import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  try {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  } catch {
    return false;
  }
};

export async function GET(req, { params: { id, songsId } }) {
  console.log("Fetching specific song/episode...");

  try {
    // Extract Authorization header
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return new Response(JSON.stringify({ message: "Invalid Token" }), {
        status: 403,
      });
    }

    console.log("Album/Podcast ID:", id, "Song/Episode ID:", songsId);

    const client = await clientPromise;
    const db = client.db("Spotify");

    // Collections to search in
    const collections = ["Albums", "Podcasts"];
    let item = null; // This will hold the album or podcast
    let song = null; // This will hold the specific song/episode

    // Search in both Albums and Podcasts collections
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      console.log(`🔍 Searching in collection: ${collectionName}`);

      // Query to find the album/podcast by id
      const query = isValidObjectId(id)
        ? { $or: [{ _id: new ObjectId(id) }, { id }] }
        : { id };

      item = await collection.findOne(query);

      if (item) {
        console.log(`🎵 Found in collection: ${collectionName}`);

        // Ensure the Album field exists and is an array
        if (!item.Album || !Array.isArray(item.Album)) {
          return new Response(
            JSON.stringify({ message: "No songs/episodes available" }),
            { status: 404 }
          );
        }

        // Find the specific song/episode in the Album array
        // Note: songsId is likely a string or number, not an ObjectId
        song = item.Album.find((s) => s.id.toString() === songsId);

        if (song) {
          // Add the collection name to the response for clarity
          song.collection = collectionName;
          break;
        }
      }
    }

    if (!item) {
      return new Response(
        JSON.stringify({ message: "Album/Podcast not found" }),
        {
          status: 404,
        }
      );
    }

    if (!song) {
      return new Response(
        JSON.stringify({ message: "Song/Episode not found" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ song }), { status: 200 });
  } catch (error) {
    console.error("Server Error:", error.message);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      {
        status: 500,
      }
    );
  }
}
