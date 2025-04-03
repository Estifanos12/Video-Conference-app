import mongoose from "mongoose";

import { MONGO_URI } from "./config";

let cached = global.mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        family: 4,
      });
      console.log("MongoDB connected");
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    cached.promise = null;
    throw error;
  }
};

export const getMongoClient = async () => {
  const conn = await connectDB();
  return conn.connection.getClient().db();
};

global.mongoose = cached;
