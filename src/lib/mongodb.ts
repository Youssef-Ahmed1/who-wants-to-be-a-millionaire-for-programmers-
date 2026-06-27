// src/lib/mongodb.ts
import mongoose from "mongoose";

// We read the secret from the .env.local file!
const MONGODB_URI:any = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Next.js runs in a serverless environment.
// We use a global variable to cache our connection so we don't crash MongoDB!
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If we already have a connection, just return it instantly!
  if (cached.conn) {
    return cached.conn;
  }

  // If we don't, create a new connection promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("🔥 Successfully connected to MongoDB!");
      return mongoose;
    });
  }

  // Wait for the connection to finish, cache it, and return it
  cached.conn = await cached.promise;
  return cached.conn;
}
